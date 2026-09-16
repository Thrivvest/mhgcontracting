/**
 * POST /api/contact/availability
 *
 * Step 2 of the contact form. The lead has already been created by
 * POST /api/contact (which returns its GHL contactId). Here the lead tells us
 * when they are free for a callback, and we attach those windows to the
 * existing contact. Shahzeb calls them at one of those times. This is
 * deliberately NOT a booking calendar: no appointment is created.
 *
 * On the GHL contact this writes: the Preferred Call Times custom field, a
 * timeline note, a `callback-requested` tag, and a task due at the start of
 * the first window they picked.
 *
 * Env vars:
 *   GHL_API_KEY                    - Private integration key (shared with /api/contact)
 *   GHL_LOCATION_ID                - GHL location ID
 *   GHL_FIELD_PREFERRED_CALL_TIMES - Custom field ID for "Preferred Call Times"
 *   N8N_WEBHOOK_AVAILABILITY       - Webhook for the follow-up email to the team
 *   GHL_TASK_ASSIGNEE_ID           - GHL user the callback task is assigned to (optional)
 */

import { NextRequest, NextResponse } from "next/server";

const ROUTE_VERSION = "availability-v2-2026-09-16";
const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";

const MAX_WINDOWS = 3;
const MAX_WINDOW_LENGTH = 60;

/** Start hour (America/New_York) of each block id the form offers. */
const BLOCK_START_HOUR: Record<string, number> = {
  morning: 9,
  afternoon: 12,
  late: 15,
};

interface AvailabilityPayload {
  contactId?: string;
  /** Raw values from the form, e.g. "2026-09-16|morning". Drives the task due date. */
  windowKeys?: string[];
  /** Human readable versions, e.g. "Wed Sep 16, Morning (9am - 12pm)". */
  windows?: string[];
  first_name?: string;
  last_name?: string;
  phone?: string;
  project_type?: string;
}

// Per IP: 20 updates per 5 min. Looser than /api/contact since this only ever
// touches a contact the same visitor just created.
const rateMap = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const window = 5 * 60 * 1000;
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + window });
    return true;
  }
  if (entry.count >= 20) return false;
  entry.count++;
  return true;
}

function cleanList(input: unknown): string[] {
  return Array.isArray(input)
    ? input
        .filter((v): v is string => typeof v === "string")
        .map((v) => v.trim())
        .filter(Boolean)
        .slice(0, MAX_WINDOWS)
        .map((v) => v.slice(0, MAX_WINDOW_LENGTH))
    : [];
}

/**
 * The instant when the America/New_York clock reads `hour` on `dayKey`.
 * Probing the offset this way keeps it correct across the DST change, which a
 * hardcoded -04:00 would not.
 */
function easternIso(dayKey: string, hour: number): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dayKey)) return null;
  const guess = new Date(`${dayKey}T${String(hour).padStart(2, "0")}:00:00Z`);
  if (Number.isNaN(guess.getTime())) return null;
  const asEastern = new Date(guess.toLocaleString("en-US", { timeZone: "America/New_York" }));
  const asUtc = new Date(guess.toLocaleString("en-US", { timeZone: "UTC" }));
  return new Date(guess.getTime() + (asUtc.getTime() - asEastern.getTime())).toISOString();
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  let body: AvailabilityPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const contactId = typeof body.contactId === "string" ? body.contactId.trim() : "";
  const windows = cleanList(body.windows);
  const windowKeys = cleanList(body.windowKeys);

  if (!contactId || windows.length === 0) {
    return NextResponse.json({ error: "Missing contactId or windows." }, { status: 400 });
  }

  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    console.warn(`[${ROUTE_VERSION}] GHL credentials not configured - logging only.`, windows);
    return NextResponse.json({ success: true, mode: "dev" });
  }

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    Version: GHL_API_VERSION,
  };

  const summary = windows.join("; ");
  const leadName = `${body.first_name ?? ""} ${body.last_name ?? ""}`.trim();

  const ghlCall = async (label: string, url: string, method: string, payload: unknown) => {
    try {
      const res = await fetch(url, { method, headers, body: JSON.stringify(payload) });
      if (!res.ok) console.error(`[${ROUTE_VERSION}] ${label} failed ${res.status}:`, await res.text());
      return res.ok;
    } catch (err) {
      console.error(`[${ROUTE_VERSION}] ${label} threw:`, err);
      return false;
    }
  };

  // ── Custom field: the structured home for the windows ───────────────────────
  const fieldId = process.env.GHL_FIELD_PREFERRED_CALL_TIMES;
  if (fieldId) {
    await ghlCall("custom field", `${GHL_API_BASE}/contacts/${contactId}`, "PUT", {
      customFields: [{ id: fieldId, field_value: summary }],
    });
  } else {
    console.warn(`[${ROUTE_VERSION}] GHL_FIELD_PREFERRED_CALL_TIMES not set, note only`);
  }

  // ── Note: visible in the contact timeline ──────────────────────────────────
  await ghlCall("note", `${GHL_API_BASE}/contacts/${contactId}/notes`, "POST", {
    body: `Available for a call: ${summary}`,
  });

  // ── Tag: filterable in GHL and available as an automation trigger ──────────
  await ghlCall("tag", `${GHL_API_BASE}/contacts/${contactId}/tags`, "POST", {
    tags: ["callback-requested"],
  });

  // ── Task: due at the start of the first window, so it surfaces on its own ──
  const [firstDay, firstBlock] = (windowKeys[0] ?? "").split("|");
  const dueDate = firstBlock ? easternIso(firstDay, BLOCK_START_HOUR[firstBlock] ?? 9) : null;
  if (dueDate) {
    // Unassigned tasks only show on the contact record. Assigning it puts the
    // task in that user's own task list, which is where it actually gets seen.
    const assignee = process.env.GHL_TASK_ASSIGNEE_ID;
    await ghlCall("task", `${GHL_API_BASE}/contacts/${contactId}/tasks`, "POST", {
      title: `Call ${leadName || "website lead"}${body.phone ? ` at ${body.phone}` : ""}`,
      body: `Lead asked for a callback. Windows they gave: ${summary}`,
      dueDate,
      completed: false,
      ...(assignee ? { assignedTo: assignee } : {}),
    });
  }

  // ── Follow-up email to Shahzeb + Shahmi, threaded under the lead email ─────
  const webhook = process.env.N8N_WEBHOOK_AVAILABILITY;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactId,
          windows,
          summary,
          first_name: body.first_name,
          last_name: body.last_name,
          phone: body.phone,
          project_type: body.project_type,
        }),
      });
    } catch (err) {
      console.error(`[${ROUTE_VERSION}] availability webhook failed:`, err);
    }
  }

  console.log(`[${ROUTE_VERSION}] availability saved for ${contactId}: ${summary}`);
  return NextResponse.json({ success: true });
}

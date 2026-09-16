/**
 * POST /api/contact/availability
 *
 * Step 2 of the contact form. The lead has already been created by
 * POST /api/contact (which returns its GHL contactId). Here the lead tells us
 * when they are free for a callback, and we attach those windows to the
 * existing contact. Shahzeb calls them at one of those times. This is
 * deliberately NOT a booking calendar: no appointment is created.
 *
 * Env vars:
 *   GHL_API_KEY                    - Private integration key (shared with /api/contact)
 *   GHL_LOCATION_ID                - GHL location ID
 *   GHL_FIELD_PREFERRED_CALL_TIMES - Custom field ID for "Preferred Call Times" (optional)
 *   N8N_WEBHOOK_AVAILABILITY       - Optional webhook so the team gets an email update
 */

import { NextRequest, NextResponse } from "next/server";

const ROUTE_VERSION = "availability-v1-2026-09-15";
const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";

const MAX_WINDOWS = 3;
const MAX_WINDOW_LENGTH = 60;

interface AvailabilityPayload {
  contactId?: string;
  windows?: string[];
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
  const windows = Array.isArray(body.windows)
    ? body.windows
        .filter((w): w is string => typeof w === "string")
        .map((w) => w.trim())
        .filter(Boolean)
        .slice(0, MAX_WINDOWS)
        .map((w) => w.slice(0, MAX_WINDOW_LENGTH))
    : [];

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

  // ── Write the windows onto the contact ──────────────────────────────────────
  // The custom field is the structured home for this. If it is not configured
  // yet, the note below still carries the information, so the lead is never lost.
  const fieldId = process.env.GHL_FIELD_PREFERRED_CALL_TIMES;
  if (fieldId) {
    try {
      const res = await fetch(`${GHL_API_BASE}/contacts/${contactId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ customFields: [{ id: fieldId, field_value: summary }] }),
      });
      if (!res.ok) {
        console.error(`[${ROUTE_VERSION}] GHL custom field update failed ${res.status}:`, await res.text());
      }
    } catch (err) {
      console.error(`[${ROUTE_VERSION}] GHL custom field update threw:`, err);
    }
  } else {
    console.warn(`[${ROUTE_VERSION}] GHL_FIELD_PREFERRED_CALL_TIMES not set, note only`);
  }

  // ── Note on the contact, so it is visible in the GHL timeline ───────────────
  try {
    const res = await fetch(`${GHL_API_BASE}/contacts/${contactId}/notes`, {
      method: "POST",
      headers,
      body: JSON.stringify({ body: `Available for a call: ${summary}` }),
    });
    if (!res.ok) {
      console.error(`[${ROUTE_VERSION}] GHL note failed ${res.status}:`, await res.text());
    }
  } catch (err) {
    console.error(`[${ROUTE_VERSION}] GHL note threw:`, err);
  }

  // ── Optional email nudge to the team ────────────────────────────────────────
  const webhook = process.env.N8N_WEBHOOK_AVAILABILITY;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactId, windows, summary }),
      });
    } catch (err) {
      console.error(`[${ROUTE_VERSION}] availability webhook failed:`, err);
    }
  }

  console.log(`[${ROUTE_VERSION}] availability saved for ${contactId}: ${summary}`);
  return NextResponse.json({ success: true });
}

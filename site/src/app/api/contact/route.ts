/**
 * POST /api/contact
 *
 * Server-side proxy for contact form submissions → GoHighLevel CRM.
 * Keeps GHL credentials off the client. Adds rate limiting + validation.
 *
 * Env vars required:
 *   GHL_API_KEY          — Private integration key
 *   GHL_LOCATION_ID      — GHL location ID
 *   GHL_FIELD_*          — Custom field IDs (see .env.local)
 *   GHL_PIPELINE_ID        — Pipeline ID
 *   GHL_STAGE_NEW_LEAD_ID  — First stage ID
 *   N8N_WEBHOOK_NEW_LEAD   — n8n webhook URL for new lead email notification
 */

import { NextRequest, NextResponse } from "next/server";

// Force rebuild — cache bust 2026-03-30
const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";

interface ContactPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  project_type?: string;
  project_address?: string;
  timeline?: string;
  message?: string;
  source?: string;
}

// ── Rate limiting (per IP: 10 submissions per 5 min) ────────────────────────
const rateMap = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const window = 5 * 60 * 1000;
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + window });
    return true;
  }
  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

// ── Normalize phone to E.164 (required by GHL) ───────────────────────────────
function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return `+${digits}`; // best effort for international
}

// ── Build tag list from project type ─────────────────────────────────────────
function buildTags(projectType?: string): string[] {
  const tags = ["website-lead"];
  if (projectType) {
    tags.push(projectType.toLowerCase().replace(/[\s/]+/g, "-").replace(/[^a-z0-9-]/g, ""));
  }
  return tags.filter(Boolean);
}

export async function POST(req: NextRequest) {
  // Rate limit
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  // Parse
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Validate required fields
  const { first_name, last_name, email, phone } = body;
  if (!first_name || !last_name || !email || !phone) {
    return NextResponse.json(
      { error: "Missing required fields: first_name, last_name, email, phone." },
      { status: 400 }
    );
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    console.warn("GHL credentials not configured — logging submission only.");
    console.log("Form submission:", body);
    return NextResponse.json({ success: true, mode: "dev" });
  }

  // ── Build GHL contact payload ───────────────────────────────────────────────
  const customFields: Array<{ id: string; field_value: string }> = [];

  if (body.project_type && process.env.GHL_FIELD_PROJECT_TYPE) {
    customFields.push({ id: process.env.GHL_FIELD_PROJECT_TYPE, field_value: body.project_type });
  }
  if (body.project_address && process.env.GHL_FIELD_PROJECT_ADDRESS) {
    customFields.push({ id: process.env.GHL_FIELD_PROJECT_ADDRESS, field_value: body.project_address });
  }
  if (body.timeline && process.env.GHL_FIELD_TIMELINE) {
    customFields.push({ id: process.env.GHL_FIELD_TIMELINE, field_value: body.timeline });
  }
  if (body.message && process.env.GHL_FIELD_PROJECT_NOTES) {
    customFields.push({ id: process.env.GHL_FIELD_PROJECT_NOTES, field_value: body.message });
  }

  const sourceLabel = body.source ?? "mhgcon.com Contact Form";
  if (process.env.GHL_FIELD_LEAD_SOURCE) {
    customFields.push({ id: process.env.GHL_FIELD_LEAD_SOURCE, field_value: sourceLabel });
  }

  const ghlPayload: Record<string, unknown> = {
    firstName: first_name,
    lastName: last_name,
    email,
    phone: normalizePhone(phone),
    locationId,
    source: sourceLabel,
    tags: buildTags(body.project_type),
    customFields,
  };

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    Version: GHL_API_VERSION,
  };

  // ── Step 1: Upsert contact in GHL (creates or updates if duplicate) ────────
  let contactId: string;
  try {
    console.log(`GHL upsert request for ${first_name} ${last_name} — phone: ${normalizePhone(phone)}, email: ${email}`);

    const res = await fetch(`${GHL_API_BASE}/contacts/upsert`, {
      method: "POST",
      headers,
      body: JSON.stringify(ghlPayload),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error(`GHL upsert API error ${res.status}:`, JSON.stringify(data));
      return NextResponse.json(
        { error: "CRM submission failed. Please call us directly." },
        { status: 502 }
      );
    }

    contactId = data?.contact?.id;
    const isNew = data?.new === true;
    console.log(`GHL contact ${isNew ? "created" : "updated"}: ${contactId} — ${first_name} ${last_name}`);
  } catch (err) {
    console.error("GHL contact upsert failed:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }

  // ── Step 2: Create opportunity in pipeline at "New Lead" stage ──────────────
  const pipelineId = process.env.GHL_PIPELINE_ID;
  const stageId = process.env.GHL_STAGE_NEW_LEAD_ID;

  if (pipelineId && stageId && contactId) {
    try {
      const oppName = `${first_name} ${last_name}${body.project_type ? ` — ${body.project_type}` : ""}`;
      const oppRes = await fetch(`${GHL_API_BASE}/opportunities/`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          pipelineId,
          pipelineStageId: stageId,
          locationId,
          contactId,
          name: oppName,
          status: "open",
          source: sourceLabel,
        }),
      });

      if (!oppRes.ok) {
        const errText = await oppRes.text();
        console.error(`GHL opportunity API error ${oppRes.status}:`, errText);
        // Non-fatal — contact was still created successfully
      } else {
        const oppData = await oppRes.json();
        console.log(`GHL opportunity created: ${oppData?.opportunity?.id} in pipeline "New Lead"`);
      }
    } catch (err) {
      console.error("GHL opportunity creation failed:", err);
      // Non-fatal
    }
  }

  // ── Step 3: Fire n8n notification webhook (non-blocking) ───────────────────
  const n8nWebhook = process.env.N8N_WEBHOOK_NEW_LEAD;
  if (n8nWebhook) {
    fetch(n8nWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, contactId }),
    }).catch((err) => console.error("n8n webhook fire failed:", err));
    // Intentionally not awaited — don't block the response
  }

  return NextResponse.json({ success: true, contactId });
}

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { hasSession } from "@/lib/session";

// Allowed status values — keeps the pipeline consistent.
const STATUSES = [
  "New",
  "Ready",
  "Sent",
  "Follow-up",
  "Interested",
  "Converted",
  "Not interested",
];

// POST /api/leads/update — update one lead.
// Body: { id, status?, notes?, next_followup?, message_draft? }
export async function POST(request: NextRequest) {
  if (!(await hasSession())) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const id = body.id;
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Lead id is required" }, { status: 400 });
  }

  // Build the update object only from fields that were actually sent.
  const update: Record<string, unknown> = {};

  if (typeof body.status === "string") {
    if (!STATUSES.includes(body.status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 },
      );
    }
    update.status = body.status;
  }
  if (typeof body.notes === "string") update.notes = body.notes;
  if (typeof body.message_draft === "string")
    update.message_draft = body.message_draft;
  if (typeof body.next_followup === "string" || body.next_followup === null)
    update.next_followup = body.next_followup || null;

  if (Object.keys(update).length === 0) {
    return NextResponse.json(
      { error: "Nothing to update" },
      { status: 400 },
    );
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("leads")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("update lead error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, lead: data });
}

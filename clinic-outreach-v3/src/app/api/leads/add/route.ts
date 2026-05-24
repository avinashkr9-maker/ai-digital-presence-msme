import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { hasSession } from "@/lib/session";

// POST /api/leads/add  — insert one lead.
// Body: JSON with at least { business_name }. Other fields optional.
export async function POST(request: NextRequest) {
  // Only a logged-in admin can write leads.
  if (!(await hasSession())) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.business_name || typeof body.business_name !== "string") {
    return NextResponse.json(
      { error: "business_name is required" },
      { status: 400 },
    );
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("leads")
    .insert({
      business_name: body.business_name,
      category: body.category ?? "Clinic",
      phone: body.phone ?? null,
      city: body.city ?? null,
      locality: body.locality ?? null,
      address: body.address ?? null,
      website: body.website ?? null,
      has_website: body.has_website ?? false,
      source: body.source ?? "Manual",
      score: body.score ?? 0,
      priority: body.priority ?? "Medium",
      status: body.status ?? "New",
      message_draft: body.message_draft ?? null,
      notes: body.notes ?? null,
    })
    .select()
    .single();

  if (error) {
    console.error("add lead error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, lead: data });
}

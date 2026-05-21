import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const place = String(body?.place || "").trim();
  const category = String(body?.category || "Clinic").trim();
  const keyword = String(body?.keyword || "").trim();
  const limit = Math.max(1, Math.min(50, Number(body?.limit || 20)));

  if (!place) {
    return NextResponse.json({ ok: false, error: "missing_place" }, { status: 400 });
  }

  if (!process.env.APIFY_TOKEN) {
    return NextResponse.json(
      {
        ok: false,
        error: "missing_apify_token",
        note: "Keep APIFY_TOKEN in server env only. Do not expose it to the browser.",
      },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    ready: false,
    note: "Server-side lead finder route scaffolded. Next step is wiring the Apify actor call here.",
    requested: { place, category, keyword, limit },
  });
}

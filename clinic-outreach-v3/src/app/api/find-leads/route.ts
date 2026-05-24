import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { hasSession } from "@/lib/session";

// Apify Google Maps scraper actor.
const APIFY_ACTOR = "compass~crawler-google-places";

// Scraping can take a few minutes — allow a long server timeout.
export const maxDuration = 300;

type ApifyPlace = {
  title?: string;
  phone?: string;
  phoneUnformatted?: string;
  website?: string;
  city?: string;
  neighborhood?: string;
  street?: string;
  address?: string;
  totalScore?: number;
  reviewsCount?: number;
  categoryName?: string;
};

// Score a lead 0-100: a clinic with a phone, no website, and decent reviews
// is the ideal target.
function scoreLead(p: ApifyPlace): { score: number; priority: string } {
  let score = 0;
  if (p.phone || p.phoneUnformatted) score += 40; // reachable
  if (!p.website) score += 35; // the actual opportunity
  if ((p.reviewsCount ?? 0) >= 10) score += 15; // established business
  if ((p.totalScore ?? 0) >= 4) score += 10; // good reputation
  const priority = score >= 75 ? "Hot" : score >= 55 ? "High" : "Medium";
  return { score, priority };
}

export async function POST(request: NextRequest) {
  // Only a logged-in admin can run the finder.
  if (!(await hasSession())) {
    return NextResponse.json({ ok: false, error: "Not authorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const place = String(body?.place || "").trim();
  const category = String(body?.category || "Clinic").trim();
  const limit = Math.max(1, Math.min(50, Number(body?.limit || 20)));

  if (!place) {
    return NextResponse.json({ ok: false, error: "Please enter a city or area" }, { status: 400 });
  }

  const token = process.env.APIFY_TOKEN;
  if (!token) {
    return NextResponse.json(
      { ok: false, error: "APIFY_TOKEN is not set in server environment" },
      { status: 500 },
    );
  }

  // Run the Apify actor synchronously and get dataset items back in one call.
  let places: ApifyPlace[] = [];
  try {
    const runUrl = `https://api.apify.com/v2/acts/${APIFY_ACTOR}/run-sync-get-dataset-items?token=${token}`;
    const apifyRes = await fetch(runUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searchStringsArray: [`${category} in ${place}`],
        maxCrawledPlacesPerSearch: limit,
        language: "en",
        skipClosedPlaces: true,
      }),
    });

    if (!apifyRes.ok) {
      const detail = await apifyRes.text();
      console.error("Apify error:", apifyRes.status, detail.slice(0, 300));
      return NextResponse.json(
        { ok: false, error: `Apify request failed (${apifyRes.status})` },
        { status: 502 },
      );
    }
    places = (await apifyRes.json()) as ApifyPlace[];
  } catch (err) {
    console.error("Apify fetch failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not reach Apify. Check token and try again." },
      { status: 502 },
    );
  }

  // Keep only the ideal targets: has a phone, has NO website.
  const targets = places.filter((p) => {
    const hasPhone = Boolean(p.phone || p.phoneUnformatted);
    const hasWebsite = Boolean(p.website);
    return hasPhone && !hasWebsite;
  });

  if (targets.length === 0) {
    return NextResponse.json({
      ok: true,
      scraped: places.length,
      matched: 0,
      inserted: 0,
      note: "No clinics without a website found in this search. Try another area.",
    });
  }

  // Build rows for Supabase.
  const rows = targets.map((p) => {
    const { score, priority } = scoreLead(p);
    return {
      business_name: p.title || "Unknown clinic",
      category: p.categoryName || category,
      phone: p.phone || p.phoneUnformatted || null,
      city: p.city || place,
      locality: p.neighborhood || null,
      address: p.address || p.street || null,
      website: null,
      has_website: false,
      source: "Apify Google Maps",
      score,
      priority,
      status: "New",
    };
  });

  // Avoid duplicates: skip phones already in the table.
  const supabase = getSupabaseAdmin();
  const phones = rows.map((r) => r.phone).filter(Boolean) as string[];
  const { data: existing } = await supabase
    .from("leads")
    .select("phone")
    .in("phone", phones);
  const existingPhones = new Set((existing ?? []).map((e) => e.phone));
  const freshRows = rows.filter((r) => !r.phone || !existingPhones.has(r.phone));

  if (freshRows.length === 0) {
    return NextResponse.json({
      ok: true,
      scraped: places.length,
      matched: targets.length,
      inserted: 0,
      note: "All matching clinics are already in your leads table.",
    });
  }

  const { data: inserted, error } = await supabase
    .from("leads")
    .insert(freshRows)
    .select();

  if (error) {
    console.error("insert error:", error.message);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    scraped: places.length,
    matched: targets.length,
    inserted: inserted?.length ?? 0,
    skipped_duplicates: targets.length - freshRows.length,
  });
}

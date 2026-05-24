import { getSupabaseAdmin, type Lead } from "@/lib/supabase";

// Fetch all leads, newest first.
export async function getLeads(): Promise<Lead[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getLeads error:", error.message);
    return [];
  }
  return (data ?? []) as Lead[];
}

// Compute the four dashboard stat numbers from the leads list.
export function computeStats(leads: Lead[]) {
  const today = new Date().toISOString().slice(0, 10);
  return {
    fresh: leads.filter((l) => l.status === "New").length,
    queue: leads.filter((l) => l.status === "Ready").length,
    followToday: leads.filter((l) => l.next_followup === today).length,
    interested: leads.filter((l) => l.status === "Interested").length,
  };
}

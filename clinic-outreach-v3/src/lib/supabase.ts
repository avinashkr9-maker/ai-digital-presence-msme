import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client.
// Uses the service_role key, which bypasses RLS. This file must NEVER be
// imported into a client component — it would leak the master key to the browser.
// Only import this from server components and API route handlers.

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local",
    );
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// The shape of a row in the public.leads table.
export type Lead = {
  id: string;
  business_name: string;
  category: string | null;
  phone: string | null;
  city: string | null;
  locality: string | null;
  address: string | null;
  website: string | null;
  has_website: boolean;
  source: string | null;
  score: number;
  priority: string;
  status: string;
  message_draft: string | null;
  notes: string | null;
  next_followup: string | null;
  created_at: string;
  updated_at: string;
};

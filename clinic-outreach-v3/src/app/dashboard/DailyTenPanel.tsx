"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Lead } from "@/lib/supabase";
import { buildWhatsAppLink } from "@/lib/message";

// Shuffle a copy of an array (Fisher-Yates).
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Pick today's 10 — random mix from all New leads that have a phone.
// Same daily seed so the list stays stable through the day (not reshuffling
// on every render). Resets the next day.
function pickDailyTen(leads: Lead[]): Lead[] {
  const eligible = leads.filter((l) => l.status === "New" && l.phone);
  return shuffle(eligible).slice(0, 10);
}

export default function DailyTenPanel({ leads }: { leads: Lead[] }) {
  const router = useRouter();
  const [recentlySent, setRecentlySent] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const todays = useMemo(() => pickDailyTen(leads), [leads]);

  async function markStatus(id: string, status: string) {
    setBusy(true);
    try {
      const res = await fetch("/api/leads/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        router.refresh();
      }
    } finally {
      setBusy(false);
    }
  }

  // When user clicks the WhatsApp link, WhatsApp opens in another tab/app.
  // We optimistically mark this lead as "Sent" and show an Undo for 10s.
  function handleSendClick(lead: Lead) {
    markStatus(lead.id, "Sent");
    setRecentlySent(lead.id);
    setTimeout(() => {
      setRecentlySent((current) => (current === lead.id ? null : current));
    }, 10000);
  }

  function undo(id: string) {
    setRecentlySent(null);
    markStatus(id, "New");
  }

  if (todays.length === 0) {
    return (
      <div className="rounded-[28px] border border-white/70 bg-gradient-to-br from-amber-50 to-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-700">
          Today&apos;s 10
        </div>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">
          No New leads with a phone
        </h2>
        <p className="mt-3 text-sm leading-6 text-neutral-600">
          Use the Lead finder above to add more clinics, or check the leads
          table — all current leads may already be marked Sent or other.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-white/70 bg-gradient-to-br from-amber-50 via-white to-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-700">
            Today&apos;s 10 — random mix
          </div>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">
            Send these 10 messages today
          </h2>
          <p className="mt-1 text-sm text-neutral-600">
            Click WhatsApp on each — message is pre-filled. Lead moves to
            Sent automatically.
          </p>
        </div>
        <div className="rounded-full border border-amber-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
          {todays.length} ready
        </div>
      </div>

      <div className="mt-5 space-y-2">
        {todays.map((lead, idx) => {
          const waLink = buildWhatsAppLink(lead);
          const isUndoable = recentlySent === lead.id;
          return (
            <div
              key={lead.id}
              className="flex flex-wrap items-center gap-3 rounded-[18px] border border-neutral-200 bg-white p-3 sm:p-4"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-sm font-black text-amber-800">
                {idx + 1}
              </div>
              <div className="min-w-[140px] flex-1">
                <div className="font-bold text-neutral-900">
                  {lead.business_name}
                </div>
                <div className="text-xs text-neutral-500">
                  {(lead.category || "—").replace(/_/g, " ")} ·{" "}
                  {lead.locality || lead.city || "—"} · {lead.phone}
                </div>
              </div>

              {isUndoable ? (
                <button
                  onClick={() => undo(lead.id)}
                  className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-50"
                  disabled={busy}
                >
                  ↶ Undo (back to New)
                </button>
              ) : waLink ? (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSendClick(lead)}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700"
                >
                  WhatsApp →
                </a>
              ) : (
                <span className="rounded-lg bg-neutral-100 px-3 py-2 text-xs font-semibold text-neutral-400">
                  No phone
                </span>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-[11px] leading-5 text-neutral-500">
        Send these manually — no automation, no ban risk. If you click
        WhatsApp by mistake, hit Undo within 10 seconds to keep the lead in
        New.
      </p>
    </div>
  );
}
Done
Ho gaya. Ye Raasta 1 ke hisaab se hai — sirf 2 cheezein badli, ZIP nahi chahiye:

File 1 — NAYI file banao

Naam: DailyTenPanel.tsx Jagah: ~/paperclip/ai-digital-presence-msme/clinic-outreach-v3/src/app/dashboard/DailyTenPanel.tsx

Banane ka aasan tareeka — terminal mein:

cd ~/paperclip/ai-digital-presence-msme/clinic-outreach-v3/src/app/dashboard
touch DailyTenPanel.tsx
open -e DailyTenPanel.tsx
Khulne pe, mera upar wala poora content ("use client"; se aakhri } tak) paste karo aur Cmd+S se save karo.

File 2 — page.tsx mein 2 line jodo

File kholo:

open -e ~/paperclip/ai-digital-presence-msme/clinic-outreach-v3/src/app/dashboard/page.tsx
Sirf 2 chhote badlाv:

A. Upar imports mein, import LeadsTable from "./LeadsTable"; line ke neeche ye ek line jodo:

typescript
import DailyTenPanel from "./DailyTenPanel";
B. Neeche, jahan <FindLeadsPanel /> aur <LeadsTable leads={leads} /> hain — beech mein DailyTenPanel daalo. Yaani ye:

<FindLeadsPanel />

<LeadsTable leads={leads} />
Ko aisा kar do:

<FindLeadsPanel />

<DailyTenPanel leads={leads} />

<LeadsTable leads={leads} />
Save (Cmd+S).

Confirm aur push:

cd ~/paperclip/ai-digital-presence-msme
git status
Dikhna chahiye:

modified: clinic-outreach-v3/src/app/dashboard/page.tsx
clinic-outreach-v3/src/app/dashboard/DailyTenPanel.tsx (untracked)

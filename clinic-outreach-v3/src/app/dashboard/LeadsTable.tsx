"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Lead } from "@/lib/supabase";
import { buildWhatsAppLink, buildWhatsAppMessage } from "@/lib/message";

const STATUSES = [
  "New",
  "Ready",
  "Sent",
  "Follow-up",
  "Interested",
  "Converted",
  "Not interested",
];

// Color hint per status.
function statusTone(status: string): string {
  switch (status) {
    case "New":
      return "bg-emerald-50 text-emerald-800 border-emerald-200";
    case "Sent":
      return "bg-sky-50 text-sky-800 border-sky-200";
    case "Follow-up":
      return "bg-amber-50 text-amber-800 border-amber-200";
    case "Interested":
      return "bg-violet-50 text-violet-800 border-violet-200";
    case "Converted":
      return "bg-green-100 text-green-900 border-green-300";
    case "Not interested":
      return "bg-neutral-100 text-neutral-500 border-neutral-200";
    default:
      return "bg-neutral-50 text-neutral-700 border-neutral-200";
  }
}

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  const router = useRouter();
  const [openId, setOpenId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");

  async function update(id: string, fields: Record<string, unknown>) {
    setBusyId(id);
    try {
      const res = await fetch("/api/leads/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...fields }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        alert(data.error || "Update failed");
      } else {
        router.refresh();
      }
    } catch {
      alert("Network error");
    } finally {
      setBusyId(null);
    }
  }

  const shown =
    filter === "All" ? leads : leads.filter((l) => l.status === filter);

  return (
    <div className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">
            All leads
          </div>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">
            Your clinic pipeline
          </h2>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-semibold outline-none"
        >
          <option value="All">All ({leads.length})</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s} ({leads.filter((l) => l.status === s).length})
            </option>
          ))}
        </select>
      </div>

      {shown.length === 0 ? (
        <div className="mt-5 rounded-[22px] border border-dashed border-neutral-300 bg-neutral-50 px-6 py-12 text-center">
          <div className="text-lg font-bold text-neutral-700">
            No leads here
          </div>
          <p className="mt-2 text-sm text-neutral-500">
            Use the lead finder above to add clinics, or pick another filter.
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {shown.map((lead) => {
            const waLink = buildWhatsAppLink(lead);
            const isOpen = openId === lead.id;
            const busy = busyId === lead.id;
            return (
              <div
                key={lead.id}
                className="rounded-[20px] border border-neutral-200 bg-white"
              >
                <div className="flex flex-wrap items-center gap-3 p-4">
                  <div className="min-w-[160px] flex-1">
                    <div className="font-bold text-neutral-900">
                      {lead.business_name}
                    </div>
                    <div className="text-xs text-neutral-500">
                      {lead.locality || lead.city || "—"}
                      {lead.phone ? ` · ${lead.phone}` : ""}
                      {` · score ${lead.score}`}
                    </div>
                  </div>

                  <select
                    value={lead.status}
                    disabled={busy}
                    onChange={(e) =>
                      update(lead.id, { status: e.target.value })
                    }
                    className={`rounded-lg border px-2.5 py-1.5 text-xs font-bold ${statusTone(
                      lead.status,
                    )}`}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                  {waLink ? (
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
                    >
                      WhatsApp
                    </a>
                  ) : (
                    <span className="rounded-lg bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-400">
                      No phone
                    </span>
                  )}

                  <button
                    onClick={() => setOpenId(isOpen ? null : lead.id)}
                    className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-bold text-neutral-600 hover:bg-neutral-50"
                  >
                    {isOpen ? "Close" : "Details"}
                  </button>
                </div>

                {isOpen ? (
                  <div className="border-t border-neutral-100 bg-neutral-50/60 p-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-500">
                          Follow-up date
                        </label>
                        <input
                          type="date"
                          defaultValue={lead.next_followup || ""}
                          onBlur={(e) =>
                            update(lead.id, {
                              next_followup: e.target.value || null,
                            })
                          }
                          className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-500">
                          Notes
                        </label>
                        <input
                          type="text"
                          defaultValue={lead.notes || ""}
                          placeholder="e.g. Asked to call back Monday"
                          onBlur={(e) =>
                            update(lead.id, { notes: e.target.value })
                          }
                          className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-500">
                        WhatsApp message draft
                      </label>
                      <textarea
                        defaultValue={
                          lead.message_draft || buildWhatsAppMessage(lead)
                        }
                        rows={5}
                        onBlur={(e) =>
                          update(lead.id, { message_draft: e.target.value })
                        }
                        className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm leading-6 outline-none"
                      />
                      <p className="mt-1.5 text-xs text-neutral-500">
                        Edit and click away to save. The WhatsApp button uses
                        this message.
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

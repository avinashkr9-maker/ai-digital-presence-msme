import { redirect } from "next/navigation";
import { hasSession } from "@/lib/session";
import { getLeads, computeStats } from "@/lib/leads";
import FindLeadsPanel from "./FindLeadsPanel";
import LeadsTable from "./LeadsTable";
import DailyTenPanel from "./DailyTenPanel";

// Always fetch fresh data on each visit.
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  if (!(await hasSession())) {
    redirect("/login");
  }

  const leads = await getLeads();
  const s = computeStats(leads);

  const stats = [
    { label: "Fresh leads", value: String(s.fresh), tone: "from-emerald-50 to-white text-emerald-900" },
    { label: "Queue ready", value: String(s.queue), tone: "from-sky-50 to-white text-sky-900" },
    { label: "Follow-ups today", value: String(s.followToday), tone: "from-amber-50 to-white text-amber-900" },
    { label: "Interested", value: String(s.interested), tone: "from-violet-50 to-white text-violet-900" },
  ];

  return (
    <main className="min-h-screen px-4 py-6 text-neutral-900 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <section className="rounded-[34px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(246,244,238,0.92))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.08)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-800 shadow-sm">
                Outreach control room
              </div>
              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[0.95] tracking-[-0.05em] sm:text-5xl">
                Your clinic outreach, in one place.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
                Live data from your Supabase leads table. Find clinics, draft messages, track every follow-up.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[420px]">
              <div className="rounded-2xl border border-neutral-200 bg-neutral-950 px-4 py-4 text-white shadow-[0_18px_30px_rgba(0,0,0,0.15)]">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">Total leads</div>
                <div className="mt-2 text-lg font-black tracking-[-0.03em]">{leads.length}</div>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-4 shadow-sm">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400">Database</div>
                <div className="mt-2 text-lg font-black tracking-[-0.03em]">Supabase live</div>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-4 shadow-sm">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400">Mode</div>
                <div className="mt-2 text-lg font-black tracking-[-0.03em]">Private ops</div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className={`rounded-[26px] border border-white/70 bg-gradient-to-br ${item.tone} p-5 shadow-[0_18px_40px_rgba(0,0,0,0.05)]`}>
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">{item.label}</div>
                <div className="mt-4 text-4xl font-black tracking-[-0.05em]">{item.value}</div>
              </div>
            ))}
          </div>

          <FindLeadsPanel />
<DailyTenPanel leads={leads} />

          <LeadsTable leads={leads} />
        </section>

        <section className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className={`rounded-[26px] border border-white/70 bg-gradient-to-br ${item.tone} p-5 shadow-[0_18px_40px_rgba(0,0,0,0.05)]`}>
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">{item.label}</div>
                <div className="mt-4 text-4xl font-black tracking-[-0.05em]">{item.value}</div>
              </div>
            ))}
          </div>

          <FindLeadsPanel />

          <div className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">All leads</div>
                <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">Your clinic pipeline</h2>
              </div>
              <div className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
                {leads.length} total
              </div>
            </div>

            {leads.length === 0 ? (
              <div className="mt-5 rounded-[22px] border border-dashed border-neutral-300 bg-neutral-50 px-6 py-12 text-center">
                <div className="text-lg font-bold text-neutral-700">No leads yet</div>
                <p className="mt-2 text-sm text-neutral-500">
                  Once the lead finder is wired, scraped clinics will appear here.
                </p>
              </div>
            ) : (
              <div className="mt-5 overflow-x-auto rounded-[22px] border border-neutral-200">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="bg-neutral-50 text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                    <tr>
                      <th className="px-4 py-3">Clinic</th>
                      <th className="px-4 py-3">Priority</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Area</th>
                      <th className="px-4 py-3">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-t border-neutral-100 bg-white">
                        <td className="px-4 py-4 font-semibold text-neutral-900">{lead.business_name}</td>
                        <td className="px-4 py-4 font-medium text-neutral-700">{lead.priority}</td>
                        <td className="px-4 py-4 font-medium text-neutral-700">{lead.status}</td>
                        <td className="px-4 py-4 font-medium text-neutral-700">{lead.locality || lead.city || "—"}</td>
                        <td className="px-4 py-4 font-medium text-neutral-700">{lead.phone || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

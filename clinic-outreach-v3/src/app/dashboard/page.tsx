import { redirect } from "next/navigation";
import { hasSession } from "@/lib/session";

const stats = [
  { label: "Fresh leads", value: "128", tone: "from-emerald-50 to-white text-emerald-900" },
  { label: "Queue ready", value: "34", tone: "from-sky-50 to-white text-sky-900" },
  { label: "Follow-ups today", value: "11", tone: "from-amber-50 to-white text-amber-900" },
  { label: "Interested", value: "7", tone: "from-violet-50 to-white text-violet-900" },
];

const leads = [
  ["Health First Clinic", "Hot", "Ready", "Sector 56", "No website"],
  ["SkinGlow Clinic", "High", "Sent", "DLF Phase 4", "Follow-up tomorrow"],
  ["Dental Square", "High", "Demo Requested", "Sector 31", "Good response"],
  ["CareOne Clinic", "Medium", "Interested", "Palam Vihar", "Needs custom demo"],
];

export default async function DashboardPage() {
  if (!(await hasSession())) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen px-4 py-6 text-neutral-900 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <section className="rounded-[34px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(246,244,238,0.92))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.08)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-800 shadow-sm">
                Protected dashboard shell
              </div>
              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[0.95] tracking-[-0.05em] sm:text-5xl">
                Modern outreach control room for Dikhao.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
                This is the direction: login first, premium dashboard after auth, and all secret actions handled on the server side.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[420px]">
              <div className="rounded-2xl border border-neutral-200 bg-neutral-950 px-4 py-4 text-white shadow-[0_18px_30px_rgba(0,0,0,0.15)]">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">Lead source</div>
                <div className="mt-2 text-lg font-black tracking-[-0.03em]">Apify → server route</div>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-4 shadow-sm">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400">Auth</div>
                <div className="mt-2 text-lg font-black tracking-[-0.03em]">Supabase next</div>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-4 shadow-sm">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400">Mode</div>
                <div className="mt-2 text-lg font-black tracking-[-0.03em]">Private ops</div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((item) => (
                <div key={item.label} className={`rounded-[26px] border border-white/70 bg-gradient-to-br ${item.tone} p-5 shadow-[0_18px_40px_rgba(0,0,0,0.05)]`}>
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">{item.label}</div>
                  <div className="mt-4 text-4xl font-black tracking-[-0.05em]">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">Queue preview</div>
                  <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">Today’s best clinics</h2>
                </div>
                <div className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
                  UI shell only
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-[22px] border border-neutral-200">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="bg-neutral-50 text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                    <tr>
                      <th className="px-4 py-3">Clinic</th>
                      <th className="px-4 py-3">Priority</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Area</th>
                      <th className="px-4 py-3">Signal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead[0]} className="border-t border-neutral-100 bg-white">
                        {lead.map((cell) => (
                          <td key={cell} className="px-4 py-4 font-medium text-neutral-800">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] border border-white/70 bg-[linear-gradient(145deg,rgba(21,21,21,0.98),rgba(33,54,49,0.98))] p-6 text-white shadow-[0_24px_60px_rgba(0,0,0,0.16)]">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-300">Next build priorities</div>
              <h3 className="mt-3 text-3xl font-black tracking-[-0.05em]">What comes after this shell</h3>
              <div className="mt-5 space-y-3 text-sm leading-7 text-white/72">
                <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4">Supabase auth and protected layouts</div>
                <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4">Server-side Apify route for safe lead finding</div>
                <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4">Real CRM tables, filters, and lead detail drawer</div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">Security stance</div>
              <h3 className="mt-2 text-2xl font-black tracking-[-0.04em]">Frontend should not hold sensitive tokens.</h3>
              <p className="mt-3 text-sm leading-7 text-neutral-600">
                That is why the real version keeps Apify server-side. Login screen helps UX and access control, but backend secrecy is what actually protects the token.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

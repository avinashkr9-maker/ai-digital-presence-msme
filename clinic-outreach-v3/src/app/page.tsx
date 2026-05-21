import Link from "next/link";
import { redirect } from "next/navigation";
import { hasSession } from "@/lib/session";

export default async function Home() {
  if (await hasSession()) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen px-6 py-10 text-neutral-900">
      <div className="mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-between rounded-[32px] border border-white/70 bg-white/70 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.08)] backdrop-blur xl:p-12">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-900/10 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-800 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-700" /> Dikhao CRM V3
        </div>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-6xl">
              Login-first CRM for clinic outreach, built to feel like a real product.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-600 sm:text-lg">
              Next.js app shell, protected dashboard flow, and server-side lead finding are now the right path.
              This keeps outreach ops clean while hiding the important stuff behind a proper app boundary.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/login"
                className="rounded-full bg-emerald-800 px-6 py-3 text-sm font-bold text-white shadow-[0_18px_30px_rgba(11,123,107,0.24)] transition hover:bg-emerald-900"
              >
                Open login
              </Link>
              <Link
                href="/dashboard"
                className="rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-bold text-neutral-900 transition hover:border-emerald-200 hover:text-emerald-800"
              >
                Preview protected shell
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/80 bg-[linear-gradient(135deg,rgba(18,18,18,0.96),rgba(22,63,55,0.96))] p-6 text-white shadow-[0_24px_50px_rgba(0,0,0,0.16)]">
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-300">Product direction</div>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">Hosted app over static HTML hacks</h2>
            <div className="mt-6 grid gap-3">
              {[
                "Login screen first",
                "Protected dashboard after auth",
                "Apify stays server-side",
                "Supabase becomes the real app backend",
              ].map((item, index) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/8 px-4 py-4">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">0{index + 1}</div>
                  <div className="mt-1 text-sm font-semibold text-white/90">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

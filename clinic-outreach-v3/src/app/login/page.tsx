type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;
  const errorMessage =
    error === "invalid"
      ? "Incorrect passcode. Please try again."
      : error === "not_configured"
        ? "Login is not configured. Set LOGIN_PASSCODE and SESSION_SECRET in environment variables."
        : "";

  return (
    <main className="min-h-screen px-6 py-10 text-neutral-900">
      <div className="mx-auto grid min-h-[88vh] max-w-6xl gap-8 rounded-[34px] border border-white/70 bg-white/70 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.08)] backdrop-blur lg:grid-cols-[0.95fr_1.05fr] xl:p-12">
        <section className="flex flex-col justify-between rounded-[28px] bg-[linear-gradient(160deg,rgba(11,123,107,0.96),rgba(8,90,78,0.98))] p-8 text-white shadow-[0_24px_60px_rgba(11,123,107,0.24)]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/80">
              Dikhao access gate
            </div>
            <h1 className="mt-6 text-4xl font-black leading-[0.95] tracking-[-0.05em] sm:text-5xl">
              Private operations only.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/75 sm:text-base">
              This is the login-first direction for the hosted CRM. Right now this uses a temporary passcode gate.
              Next step is replacing it with Supabase auth and role-based dashboard access.
            </p>
          </div>

          <div className="grid gap-3">
            {[
              "Clinic lead finder",
              "Outreach queue",
              "Follow-up control",
              "Protected server routes",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/8 px-4 py-4 text-sm font-semibold text-white/88">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center rounded-[28px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,246,240,0.95))] p-6 sm:p-8">
          <div className="w-full max-w-md">
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-500">Sign in</div>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-neutral-950">Open the CRM safely.</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-600">
              For now use the temporary passcode login. In the real hosted version this becomes email login with Supabase auth.
            </p>

            {errorMessage ? (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-800">
                {errorMessage}
              </div>
            ) : null}

            <form action="/api/auth/demo-login" method="post" className="mt-8 space-y-4">
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                  Admin email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="boss@dikhao.in"
                  className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm outline-none transition focus:border-emerald-300"
                />
              </div>
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                  Passcode
                </label>
                <input
                  type="password"
                  name="passcode"
                  placeholder="Enter temporary passcode"
                  className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm outline-none transition focus:border-emerald-300"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-2xl bg-neutral-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-neutral-800"
              >
                Continue to dashboard
              </button>
            </form>

            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-7 text-amber-900">
              Temporary dev gate only. Next iteration: Supabase auth, protected layouts, and real session checks.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

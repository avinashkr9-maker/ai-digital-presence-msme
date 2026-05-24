"use client";

import Link from "next/link";

export default function PartnersClient() {
  return (
    <>
      <style>{CSS}</style>

      <nav className="pt-nav">
        <Link className="pt-logo" href="/">
          Dikh<span>ao</span>
        </Link>
        <div className="pt-nav-links">
          <Link href="/">Home</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/demo">Live demo</Link>
        </div>
        <Link className="pt-nav-cta" href="/demo">
          Try Free
        </Link>
      </nav>

      <header className="pt-hero">
        <p className="pt-tag">CA Partner Program</p>
        <h1>
          Turn your client list into <span>recurring income.</span>
        </h1>
        <p className="pt-hero-sub">
          Your clients already trust you. Most of them have no website and no
          Google presence. Offer them Dikhao — and earn a commission every
          single month, for as long as they stay.
        </p>
        <a href="#join" className="pt-btn solid big">
          Become a partner
        </a>
      </header>

      <section className="pt-stats">
        <div className="pt-stat">
          <div className="pt-stat-num">20%</div>
          <div className="pt-stat-label">Recurring commission, every month</div>
        </div>
        <div className="pt-stat">
          <div className="pt-stat-num">50+</div>
          <div className="pt-stat-label">Typical MSME clients per CA firm</div>
        </div>
        <div className="pt-stat">
          <div className="pt-stat-num">₹0</div>
          <div className="pt-stat-label">Cost to join — no investment needed</div>
        </div>
      </section>

      <section className="pt-section">
        <p className="pt-tag center">How it works</p>
        <h2 className="pt-h2">Three simple steps.</h2>
        <div className="pt-steps">
          <div className="pt-step">
            <div className="pt-step-no">1</div>
            <h3>Join the program</h3>
            <p>
              Sign up as a Dikhao partner. It is free, and takes only a few
              minutes. You get your own partner dashboard.
            </p>
          </div>
          <div className="pt-step">
            <div className="pt-step-no">2</div>
            <h3>Add your clients</h3>
            <p>
              Recommend Dikhao to clients who need a digital presence. Add
              them from your dashboard, or send them a ready onboarding link.
            </p>
          </div>
          <div className="pt-step">
            <div className="pt-step-no">3</div>
            <h3>Earn every month</h3>
            <p>
              Earn 20% recurring commission on every client&apos;s
              subscription — paid out monthly, for as long as they remain
              active.
            </p>
          </div>
        </div>
      </section>

      <section className="pt-earnings">
        <div className="pt-earnings-inner">
          <p className="pt-tag" style={{ color: "var(--amber)" }}>
            Earnings example
          </p>
          <h2>What 50 clients can earn you.</h2>
          <p className="pt-earn-line">
            If 50 clients are on the Growth plan (₹699/month), your 20%
            commission is approximately{" "}
            <strong>₹6,990 every month</strong> — around{" "}
            <strong>₹83,000 a year</strong> in recurring income, with no extra
            work after onboarding.
          </p>
          <p className="pt-earn-note">
            Actual earnings depend on the number of clients and the plans they
            choose. This is an illustrative example, not a guarantee.
          </p>
        </div>
      </section>

      <section className="pt-section">
        <p className="pt-tag center">White-label option</p>
        <h2 className="pt-h2">Offer it under your own brand.</h2>
        <p className="pt-section-sub">
          Prefer to present the service as your own? The white-label Agency
          plan lets your firm manage up to 20 businesses from a single
          dashboard, under your own branding. See the{" "}
          <Link href="/pricing" className="pt-inline-link">
            Agency plan on the pricing page
          </Link>
          .
        </p>
      </section>

      <section className="pt-faq">
        <p className="pt-tag center">FAQ for CAs</p>
        <h2 className="pt-h2">Common questions.</h2>
        <div className="pt-faq-list">
          <details className="pt-faq-item">
            <summary>Does it cost anything to join?</summary>
            <p>
              No. Joining the partner program is completely free. There is no
              investment, no minimum commitment, and no joining fee.
            </p>
          </details>
          <details className="pt-faq-item">
            <summary>How and when is commission paid?</summary>
            <p>
              Commission is calculated monthly on the active subscriptions of
              clients you referred, and paid out to your registered bank
              account on a regular payout schedule.
            </p>
          </details>
          <details className="pt-faq-item">
            <summary>Do I need technical knowledge?</summary>
            <p>
              No. Dikhao does all the technical work. Your role is simply to
              recommend the service to clients who would benefit and help them
              get started.
            </p>
          </details>
          <details className="pt-faq-item">
            <summary>How long do I keep earning on a client?</summary>
            <p>
              You earn the recurring commission for as long as that client
              stays subscribed to Dikhao. It is genuine recurring income, not
              a one-time referral fee.
            </p>
          </details>
        </div>
      </section>

      <section className="pt-join" id="join">
        <h2>Ready to start earning?</h2>
        <p>
          Partner signup opens soon. Reach out on WhatsApp to be added to the
          early partner list and get onboarded first.
        </p>
        <a
          href="https://wa.me/919504404077?text=Hi%2C%20I%20am%20a%20CA%20and%20want%20to%20join%20the%20Dikhao%20partner%20program."
          target="_blank"
          rel="noopener noreferrer"
          className="pt-btn solid big"
        >
          Contact us on WhatsApp
        </a>
      </section>

      <footer className="pt-footer">
        <div className="pt-footer-inner">
          <Link className="pt-logo" href="/">
            Dikh<span>ao</span>
          </Link>
          <div className="pt-footer-links">
            <Link href="/">Home</Link>
            <Link href="/demo">Live demo</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/partners">CA partners</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/login">Team login</Link>
          </div>
        </div>
        <p className="pt-footer-bottom">© 2026 Dikhao. Made in India 🇮🇳</p>
      </footer>
    </>
  );
}

const CSS = `
.pt-nav, .pt-hero, .pt-stats, .pt-section, .pt-earnings, .pt-faq, .pt-join, .pt-footer {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}
:root {
  --teal: #0B7B6B; --teal-dark: #085a4e; --teal-light: #E6F4F1;
  --amber: #E8951A; --ink: #141414; --ink-2: #4A4A4A;
  --ink-3: #888; --border: #E2E0D8;
}
.pt-nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 6vw; border-bottom: 1px solid var(--border);
  background: #fff; position: sticky; top: 0; z-index: 50;
}
.pt-logo {
  font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800;
  font-size: 24px; color: var(--teal); text-decoration: none;
  letter-spacing: -0.5px;
}
.pt-logo span { color: var(--amber); }
.pt-nav-links { display: flex; gap: 28px; }
.pt-nav-links a {
  color: var(--ink-2); text-decoration: none; font-size: 15px; font-weight: 500;
}
.pt-nav-links a:hover { color: var(--teal); }
.pt-nav-cta {
  background: var(--teal); color: #fff; text-decoration: none;
  padding: 10px 20px; border-radius: 10px; font-weight: 600; font-size: 14px;
}
.pt-nav-cta:hover { background: var(--teal-dark); }

.pt-btn {
  display: inline-block; text-decoration: none; padding: 12px 24px;
  border-radius: 10px; font-weight: 600; font-size: 15px; cursor: pointer;
}
.pt-btn.solid { background: var(--teal); color: #fff; }
.pt-btn.solid:hover { background: var(--teal-dark); }
.pt-btn.big { padding: 15px 34px; font-size: 16px; }

.pt-tag {
  text-transform: uppercase; letter-spacing: 2px; font-size: 12px;
  font-weight: 700; color: var(--teal); margin-bottom: 12px;
}
.pt-tag.center { text-align: center; }

.pt-hero {
  text-align: center; padding: 72px 6vw 48px;
  background: radial-gradient(ellipse 70% 55% at 50% 0%, #C2E0DA 0%, transparent 70%);
}
.pt-hero h1 {
  font-family: 'Bricolage Grotesque', sans-serif; font-size: 46px;
  font-weight: 800; color: var(--ink); letter-spacing: -1.6px;
  margin: 0; line-height: 1.08;
}
.pt-hero h1 span { color: var(--teal); }
.pt-hero-sub {
  max-width: 580px; margin: 18px auto 28px; color: var(--ink-2);
  font-size: 17px; line-height: 1.6;
}

.pt-stats {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
  max-width: 880px; margin: -24px auto 0; padding: 0 6vw;
}
.pt-stat {
  background: #fff; border: 1px solid var(--border); border-radius: 16px;
  padding: 26px 20px; text-align: center;
}
.pt-stat-num {
  font-family: 'Bricolage Grotesque', sans-serif; font-size: 38px;
  font-weight: 800; color: var(--teal); letter-spacing: -1px;
}
.pt-stat-label { font-size: 13px; color: var(--ink-2); margin-top: 6px; }

.pt-section { max-width: 960px; margin: 0 auto; padding: 64px 6vw 0; }
.pt-h2 {
  font-family: 'Bricolage Grotesque', sans-serif; font-size: 32px;
  font-weight: 800; color: var(--ink); letter-spacing: -1px;
  text-align: center; margin: 4px 0 0;
}
.pt-section-sub {
  max-width: 580px; margin: 14px auto 0; text-align: center;
  font-size: 15px; color: var(--ink-2); line-height: 1.7;
}
.pt-inline-link { color: var(--teal); font-weight: 600; }

.pt-steps {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
  margin-top: 32px;
}
.pt-step {
  background: #fff; border: 1px solid var(--border); border-radius: 16px;
  padding: 26px 22px;
}
.pt-step-no {
  width: 38px; height: 38px; border-radius: 10px; background: var(--teal-light);
  color: var(--teal); font-weight: 800; font-size: 18px;
  display: flex; align-items: center; justify-content: center;
}
.pt-step h3 {
  font-family: 'Bricolage Grotesque', sans-serif; font-size: 18px;
  font-weight: 700; color: var(--ink); margin: 14px 0 6px;
}
.pt-step p { font-size: 14px; color: var(--ink-2); line-height: 1.6; margin: 0; }

.pt-earnings { padding: 64px 6vw 0; }
.pt-earnings-inner {
  max-width: 760px; margin: 0 auto;
  background: linear-gradient(145deg, #151515, #213631);
  border-radius: 22px; padding: 40px; color: #fff;
}
.pt-earnings-inner h2 {
  font-family: 'Bricolage Grotesque', sans-serif; font-size: 28px;
  font-weight: 800; margin: 4px 0 14px; letter-spacing: -0.6px;
}
.pt-earn-line { font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.85); margin: 0; }
.pt-earn-line strong { color: #fff; }
.pt-earn-note { font-size: 13px; color: rgba(255,255,255,0.55); margin-top: 14px; }

.pt-faq { max-width: 720px; margin: 0 auto; padding: 64px 6vw 0; }
.pt-faq-list { margin-top: 28px; }
.pt-faq-item {
  border: 1px solid var(--border); border-radius: 12px;
  padding: 4px 20px; margin-bottom: 12px; background: #fff;
}
.pt-faq-item summary {
  cursor: pointer; font-weight: 600; font-size: 15px; color: var(--ink);
  padding: 14px 0; list-style: none;
}
.pt-faq-item summary::-webkit-details-marker { display: none; }
.pt-faq-item summary::after { content: "+"; float: right; color: var(--teal); font-weight: 800; }
.pt-faq-item[open] summary::after { content: "−"; }
.pt-faq-item p { margin: 0 0 16px; color: var(--ink-2); font-size: 14px; line-height: 1.7; }

.pt-join { text-align: center; padding: 72px 6vw; margin-top: 64px; background: var(--teal); }
.pt-join h2 {
  font-family: 'Bricolage Grotesque', sans-serif; font-size: 32px;
  font-weight: 800; color: #fff; letter-spacing: -1px; margin: 0 0 12px;
}
.pt-join p {
  max-width: 480px; margin: 0 auto 24px; color: rgba(255,255,255,0.85);
  font-size: 15px; line-height: 1.6;
}
.pt-join .pt-btn.solid { background: var(--amber); }
.pt-join .pt-btn.solid:hover { background: #cc7d0a; }

.pt-footer { background: #141414; color: #fff; padding: 40px 6vw 28px; }
.pt-footer-inner {
  max-width: 960px; margin: 0 auto; display: flex;
  justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;
}
.pt-footer .pt-logo { color: #fff; }
.pt-footer-links { display: flex; gap: 20px; flex-wrap: wrap; }
.pt-footer-links a {
  color: rgba(255,255,255,0.7); text-decoration: none; font-size: 14px;
}
.pt-footer-links a:hover { color: #fff; }
.pt-footer-bottom {
  max-width: 960px; margin: 24px auto 0; padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.1); font-size: 13px;
  color: rgba(255,255,255,0.5);
}

@media (max-width: 760px) {
  .pt-nav-links { display: none; }
  .pt-hero h1 { font-size: 32px; }
  .pt-stats { grid-template-columns: 1fr; max-width: 360px; }
  .pt-steps { grid-template-columns: 1fr; }
  .pt-earnings-inner { padding: 28px; }
  .pt-join h2 { font-size: 26px; }
}
`;

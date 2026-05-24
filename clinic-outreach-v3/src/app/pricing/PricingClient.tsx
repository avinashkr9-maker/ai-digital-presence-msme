"use client";

import { useState } from "react";
import Link from "next/link";

type Plan = {
  tier: string;
  monthly: number;
  blurb: string;
  features: string[];
  popular?: boolean;
  cta: string;
};

const PLANS: Plan[] = [
  {
    tier: "Starter",
    monthly: 299,
    blurb: "Get found online with the essentials.",
    features: [
      "5-page professional website",
      "Google My Business listing",
      "Mobile-friendly design",
      "Business analytics dashboard",
      "WhatsApp support",
    ],
    cta: "Get started",
  },
  {
    tier: "Growth",
    monthly: 699,
    blurb: "Everything you need to win local customers.",
    popular: true,
    features: [
      "Everything in Starter",
      "WhatsApp Business catalog",
      "8 social media posts / month",
      "Google review collection",
      "WhatsApp auto-reply bot",
      "Monthly performance report",
    ],
    cta: "Start with Growth",
  },
  {
    tier: "Pro",
    monthly: 1499,
    blurb: "For businesses ready to grow aggressively.",
    features: [
      "Everything in Growth",
      "Google & Meta Ads management",
      "30 social posts / month",
      "Competitor analysis",
      "Dedicated account manager",
      "Priority WhatsApp support",
    ],
    cta: "Get started",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is there a setup fee?",
    a: "No. There are no setup fees and no contracts. You pay a simple monthly subscription and can cancel anytime.",
  },
  {
    q: "How long does it take to go live?",
    a: "Your website and WhatsApp catalog are ready in about 10 minutes. Your Google listing can take 3 to 14 days because Google verifies every new business — we set this expectation clearly during setup.",
  },
  {
    q: "Can I change or cancel my plan?",
    a: "Yes. You can upgrade, downgrade, or cancel anytime from your dashboard. Changes apply from your next billing cycle.",
  },
  {
    q: "Do I need any technical skills?",
    a: "None at all. You answer a few simple questions about your business and Dikhao builds everything for you. If you can use WhatsApp, you can use Dikhao.",
  },
  {
    q: "What if I am a CA firm or digital agency?",
    a: "We have a white-label Agency plan at Rs 4,999 per month that lets you manage up to 20 businesses under one dashboard. See the partner program for details.",
  },
];

export default function PricingClient() {
  const [annual, setAnnual] = useState(false);

  // Annual billing shown as 2 months free (pay for 10).
  function priceFor(monthly: number) {
    if (!annual) return monthly;
    return Math.round((monthly * 10) / 12);
  }

  return (
    <>
      <style>{CSS}</style>

      <nav className="pp-nav">
        <Link className="pp-logo" href="/">
          Dikh<span>ao</span>
        </Link>
        <div className="pp-nav-links">
          <Link href="/">Home</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/demo">Live demo</Link>
        </div>
        <Link className="pp-nav-cta" href="/demo">
          Try Free
        </Link>
      </nav>

      <header className="pp-head">
        <p className="pp-tag">Pricing</p>
        <h1>Less than a chai per day.</h1>
        <p className="pp-sub">
          No setup fees. No contracts. Cancel anytime. Pick a plan that fits
          your business today — upgrade whenever you grow.
        </p>

        <div className="pp-toggle" role="group" aria-label="Billing period">
          <button
            className={!annual ? "active" : ""}
            onClick={() => setAnnual(false)}
          >
            Monthly
          </button>
          <button
            className={annual ? "active" : ""}
            onClick={() => setAnnual(true)}
          >
            Annual <span className="pp-save">2 months free</span>
          </button>
        </div>
      </header>

      <section className="pp-grid">
        {PLANS.map((p) => (
          <div key={p.tier} className={`pp-card ${p.popular ? "popular" : ""}`}>
            {p.popular ? <div className="pp-badge">Most Popular</div> : null}
            <p className="pp-tier">{p.tier}</p>
            <div className="pp-amount">
              ₹{priceFor(p.monthly).toLocaleString("en-IN")}
            </div>
            <p className="pp-period">
              per month{annual ? ", billed annually" : ""}
            </p>
            <p className="pp-blurb">{p.blurb}</p>
            <div className="pp-divider" />
            <ul className="pp-features">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Link
              href="/demo"
              className={`pp-plan-btn ${p.popular ? "solid" : "outline"}`}
            >
              {p.cta}
            </Link>
          </div>
        ))}
      </section>

      <section className="pp-agency">
        <div className="pp-agency-inner">
          <div>
            <p className="pp-tier" style={{ color: "var(--amber)" }}>
              Agency · White-label
            </p>
            <h3>₹4,999 / month — manage 20 businesses</h3>
            <p>
              Built for CA firms and digital agencies. Offer digital presence
              to every client under your own brand, from one dashboard, and
              earn recurring commission.
            </p>
          </div>
          <Link href="/partners" className="pp-plan-btn solid">
            See partner program
          </Link>
        </div>
      </section>

      <section className="pp-faq">
        <p className="pp-tag">FAQ</p>
        <h2>Questions, answered.</h2>
        <div className="pp-faq-list">
          {FAQS.map((f) => (
            <details key={f.q} className="pp-faq-item">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="pp-cta">
        <h2>
          Be found. Be chosen.
          <br />
          Start today.
        </h2>
        <Link href="/demo" className="pp-plan-btn solid big">
          See your website in 30 seconds →
        </Link>
      </section>

      <footer className="pp-footer">
        <div className="pp-footer-inner">
          <Link className="pp-logo" href="/">
            Dikh<span>ao</span>
          </Link>
          <div className="pp-footer-links">
            <Link href="/">Home</Link>
            <Link href="/demo">Live demo</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/partners">CA partners</Link>
            <Link href="/login">Team login</Link>
          </div>
        </div>
        <p className="pp-footer-bottom">© 2026 Dikhao. Made in India 🇮🇳</p>
      </footer>
    </>
  );
}

const CSS = `
.pp-nav, .pp-head, .pp-grid, .pp-agency, .pp-faq, .pp-cta, .pp-footer {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}
:root {
  --teal: #0B7B6B; --teal-dark: #085a4e; --teal-light: #E6F4F1;
  --amber: #E8951A; --off-white: #F7F6F2; --ink: #141414;
  --ink-2: #4A4A4A; --ink-3: #888; --border: #E2E0D8;
}
.pp-nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 6vw; border-bottom: 1px solid var(--border);
  background: #fff; position: sticky; top: 0; z-index: 50;
}
.pp-logo {
  font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800;
  font-size: 24px; color: var(--teal); text-decoration: none;
  letter-spacing: -0.5px;
}
.pp-logo span { color: var(--amber); }
.pp-nav-links { display: flex; gap: 28px; }
.pp-nav-links a {
  color: var(--ink-2); text-decoration: none; font-size: 15px; font-weight: 500;
}
.pp-nav-links a:hover { color: var(--teal); }
.pp-nav-cta {
  background: var(--teal); color: #fff; text-decoration: none;
  padding: 10px 20px; border-radius: 10px; font-weight: 600; font-size: 14px;
}
.pp-nav-cta:hover { background: var(--teal-dark); }

.pp-head {
  text-align: center; padding: 64px 6vw 32px;
  background: radial-gradient(ellipse 70% 50% at 50% 0%, #C2E0DA 0%, transparent 70%);
}
.pp-tag {
  text-transform: uppercase; letter-spacing: 2px; font-size: 12px;
  font-weight: 700; color: var(--teal); margin-bottom: 12px;
}
.pp-head h1 {
  font-family: 'Bricolage Grotesque', sans-serif; font-size: 44px;
  font-weight: 800; color: var(--ink); letter-spacing: -1.5px; margin: 0;
}
.pp-sub {
  max-width: 560px; margin: 16px auto 0; color: var(--ink-2);
  font-size: 16px; line-height: 1.6;
}
.pp-toggle {
  display: inline-flex; margin-top: 28px; background: #fff;
  border: 1px solid var(--border); border-radius: 12px; padding: 4px;
}
.pp-toggle button {
  border: none; background: transparent; padding: 10px 22px;
  border-radius: 9px; font-size: 14px; font-weight: 600; cursor: pointer;
  color: var(--ink-2); font-family: inherit; display: flex;
  align-items: center; gap: 8px;
}
.pp-toggle button.active { background: var(--teal); color: #fff; }
.pp-save {
  background: var(--amber); color: #fff; font-size: 10px; font-weight: 700;
  padding: 3px 7px; border-radius: 20px;
}
.pp-toggle button.active .pp-save { background: #fff; color: var(--amber); }

.pp-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
  max-width: 980px; margin: 24px auto 0; padding: 24px 6vw 0;
}
.pp-card {
  background: #fff; border: 1px solid var(--border); border-radius: 18px;
  padding: 28px 24px; position: relative;
}
.pp-card.popular {
  border: 2px solid var(--teal);
  box-shadow: 0 20px 50px rgba(11,123,107,0.16);
}
.pp-badge {
  position: absolute; top: -13px; left: 50%; transform: translateX(-50%);
  background: var(--teal); color: #fff; font-size: 11px; font-weight: 700;
  padding: 5px 14px; border-radius: 20px; white-space: nowrap;
}
.pp-tier {
  font-weight: 700; font-size: 15px; color: var(--ink); margin: 4px 0 0;
}
.pp-amount {
  font-family: 'Bricolage Grotesque', sans-serif; font-size: 40px;
  font-weight: 800; color: var(--ink); margin-top: 8px; letter-spacing: -1px;
}
.pp-period { font-size: 13px; color: var(--ink-3); margin: 2px 0 0; }
.pp-blurb { font-size: 14px; color: var(--ink-2); margin: 10px 0 0; line-height: 1.5; }
.pp-divider { height: 1px; background: var(--border); margin: 18px 0; }
.pp-features { list-style: none; padding: 0; margin: 0; }
.pp-features li {
  font-size: 14px; color: var(--ink-2); padding: 7px 0 7px 26px;
  position: relative;
}
.pp-features li::before {
  content: "✓"; position: absolute; left: 0; color: var(--teal);
  font-weight: 800;
}
.pp-plan-btn {
  display: inline-block; width: 100%; text-align: center; margin-top: 20px;
  padding: 12px 18px; border-radius: 10px; font-weight: 600; font-size: 14px;
  text-decoration: none; box-sizing: border-box; cursor: pointer;
}
.pp-plan-btn.solid { background: var(--teal); color: #fff; }
.pp-plan-btn.solid:hover { background: var(--teal-dark); }
.pp-plan-btn.outline {
  background: #fff; color: var(--teal); border: 1.5px solid var(--teal);
}
.pp-plan-btn.outline:hover { background: var(--teal-light); }
.pp-plan-btn.big { width: auto; padding: 15px 32px; font-size: 16px; }

.pp-agency { padding: 48px 6vw 0; }
.pp-agency-inner {
  max-width: 980px; margin: 0 auto;
  background: linear-gradient(145deg, #151515, #213631);
  border-radius: 22px; padding: 36px; color: #fff;
  display: flex; align-items: center; justify-content: space-between;
  gap: 28px; flex-wrap: wrap;
}
.pp-agency-inner h3 {
  font-family: 'Bricolage Grotesque', sans-serif; font-size: 26px;
  font-weight: 800; margin: 8px 0; letter-spacing: -0.5px;
}
.pp-agency-inner p { color: rgba(255,255,255,0.72); font-size: 15px; max-width: 460px; line-height: 1.6; margin: 0; }
.pp-agency-inner .pp-plan-btn { width: auto; white-space: nowrap; }

.pp-faq { max-width: 720px; margin: 0 auto; padding: 64px 6vw 0; text-align: center; }
.pp-faq h2 {
  font-family: 'Bricolage Grotesque', sans-serif; font-size: 32px;
  font-weight: 800; color: var(--ink); letter-spacing: -1px; margin: 6px 0 0;
}
.pp-faq-list { margin-top: 28px; text-align: left; }
.pp-faq-item {
  border: 1px solid var(--border); border-radius: 12px;
  padding: 4px 20px; margin-bottom: 12px; background: #fff;
}
.pp-faq-item summary {
  cursor: pointer; font-weight: 600; font-size: 15px; color: var(--ink);
  padding: 14px 0; list-style: none;
}
.pp-faq-item summary::-webkit-details-marker { display: none; }
.pp-faq-item summary::after { content: "+"; float: right; color: var(--teal); font-weight: 800; }
.pp-faq-item[open] summary::after { content: "−"; }
.pp-faq-item p {
  margin: 0 0 16px; color: var(--ink-2); font-size: 14px; line-height: 1.7;
}

.pp-cta { text-align: center; padding: 72px 6vw; margin-top: 64px; background: var(--teal); }
.pp-cta h2 {
  font-family: 'Bricolage Grotesque', sans-serif; font-size: 34px;
  font-weight: 800; color: #fff; letter-spacing: -1px; margin: 0 0 24px;
}
.pp-cta .pp-plan-btn.solid {
  background: var(--amber); color: #fff;
}
.pp-cta .pp-plan-btn.solid:hover { background: #cc7d0a; }

.pp-footer { background: #141414; color: #fff; padding: 40px 6vw 28px; }
.pp-footer-inner {
  max-width: 980px; margin: 0 auto; display: flex;
  justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;
}
.pp-footer .pp-logo { color: #fff; }
.pp-footer-links { display: flex; gap: 22px; flex-wrap: wrap; }
.pp-footer-links a {
  color: rgba(255,255,255,0.7); text-decoration: none; font-size: 14px;
}
.pp-footer-links a:hover { color: #fff; }
.pp-footer-bottom {
  max-width: 980px; margin: 24px auto 0; padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.1); font-size: 13px;
  color: rgba(255,255,255,0.5);
}

@media (max-width: 760px) {
  .pp-nav-links { display: none; }
  .pp-head h1 { font-size: 32px; }
  .pp-grid { grid-template-columns: 1fr; max-width: 380px; }
  .pp-agency-inner { padding: 26px; }
  .pp-cta h2 { font-size: 26px; }
}
`;

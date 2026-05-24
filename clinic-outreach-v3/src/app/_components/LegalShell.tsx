"use client";

import Link from "next/link";
import type { ReactNode } from "react";

// Shared shell for legal pages (Privacy, Terms) — consistent nav, footer, styling.
export default function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <style>{CSS}</style>

      <nav className="lg-nav">
        <Link className="lg-logo" href="/">
          Dikh<span>ao</span>
        </Link>
        <div className="lg-nav-links">
          <Link href="/">Home</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/demo">Live demo</Link>
        </div>
        <Link className="lg-nav-cta" href="/demo">
          Try Free
        </Link>
      </nav>

      <main className="lg-main">
        <p className="lg-tag">Legal</p>
        <h1>{title}</h1>
        <p className="lg-updated">Last updated: {updated}</p>

        <div className="lg-review-note">
          <strong>Note:</strong> This document is a working draft. Before
          public launch, the registered legal entity name and official
          contact email must be filled in, and the refund terms reviewed.
        </div>

        <div className="lg-body">{children}</div>
      </main>

      <footer className="lg-footer">
        <div className="lg-footer-inner">
          <Link className="lg-logo" href="/">
            Dikh<span>ao</span>
          </Link>
          <div className="lg-footer-links">
            <Link href="/">Home</Link>
            <Link href="/demo">Live demo</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/partners">CA partners</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/login">Team login</Link>
          </div>
        </div>
        <p className="lg-footer-bottom">© 2026 Dikhao. Made in India 🇮🇳</p>
      </footer>
    </>
  );
}

const CSS = `
.lg-nav, .lg-main, .lg-footer {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}
:root {
  --teal: #0B7B6B; --teal-dark: #085a4e; --teal-light: #E6F4F1;
  --amber: #E8951A; --ink: #141414; --ink-2: #4A4A4A;
  --ink-3: #888; --border: #E2E0D8;
}
.lg-nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 6vw; border-bottom: 1px solid var(--border);
  background: #fff; position: sticky; top: 0; z-index: 50;
}
.lg-logo {
  font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800;
  font-size: 24px; color: var(--teal); text-decoration: none;
  letter-spacing: -0.5px;
}
.lg-logo span { color: var(--amber); }
.lg-nav-links { display: flex; gap: 28px; }
.lg-nav-links a {
  color: var(--ink-2); text-decoration: none; font-size: 15px; font-weight: 500;
}
.lg-nav-links a:hover { color: var(--teal); }
.lg-nav-cta {
  background: var(--teal); color: #fff; text-decoration: none;
  padding: 10px 20px; border-radius: 10px; font-weight: 600; font-size: 14px;
}
.lg-nav-cta:hover { background: var(--teal-dark); }

.lg-main { max-width: 760px; margin: 0 auto; padding: 56px 6vw 40px; }
.lg-tag {
  text-transform: uppercase; letter-spacing: 2px; font-size: 12px;
  font-weight: 700; color: var(--teal); margin-bottom: 10px;
}
.lg-main h1 {
  font-family: 'Bricolage Grotesque', sans-serif; font-size: 38px;
  font-weight: 800; color: var(--ink); letter-spacing: -1.2px; margin: 0;
}
.lg-updated { color: var(--ink-3); font-size: 14px; margin: 10px 0 0; }
.lg-review-note {
  margin: 24px 0 8px; background: #FEF4E6; border: 1px solid #F3D9AE;
  border-radius: 12px; padding: 14px 18px; font-size: 14px;
  color: #7a5512; line-height: 1.6;
}
.lg-body { margin-top: 16px; }
.lg-body h2 {
  font-family: 'Bricolage Grotesque', sans-serif; font-size: 21px;
  font-weight: 700; color: var(--ink); margin: 32px 0 10px;
  letter-spacing: -0.4px;
}
.lg-body p, .lg-body li {
  font-size: 15px; line-height: 1.75; color: var(--ink-2);
}
.lg-body ul { padding-left: 22px; margin: 8px 0; }
.lg-body li { margin-bottom: 6px; }
.lg-placeholder {
  background: var(--teal-light); color: var(--teal-dark);
  padding: 1px 7px; border-radius: 5px; font-weight: 600; font-size: 14px;
}

.lg-footer { background: #141414; color: #fff; padding: 40px 6vw 28px; margin-top: 48px; }
.lg-footer-inner {
  max-width: 760px; margin: 0 auto; display: flex;
  justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;
}
.lg-footer .lg-logo { color: #fff; }
.lg-footer-links { display: flex; gap: 20px; flex-wrap: wrap; }
.lg-footer-links a {
  color: rgba(255,255,255,0.7); text-decoration: none; font-size: 14px;
}
.lg-footer-links a:hover { color: #fff; }
.lg-footer-bottom {
  max-width: 760px; margin: 24px auto 0; padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.1); font-size: 13px;
  color: rgba(255,255,255,0.5);
}

@media (max-width: 760px) {
  .lg-nav-links { display: none; }
  .lg-main h1 { font-size: 28px; }
}
`;

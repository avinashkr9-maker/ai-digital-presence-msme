"use client";

import { useEffect, useRef } from "react";

// Dikhao homepage — converted from the original landing HTML.
// Markup and styles preserved exactly. The in-page demo form was replaced
// with a CTA button linking to the full /demo page.

const HOME_HTML = `

<!-- NAV -->
<nav>
  <a class="nav-logo" href="#">Dikh<span>ao</span></a>
  <div class="nav-links">
    <a href="#how">How it works</a>
    <a href="#features">Features</a>
    <a href="#pricing">Pricing</a>
    <a href="/demo">Live demo</a>
  </div>
  <a class="nav-cta" href="/demo">Try Free</a>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-badge">
    <div class="hero-badge-dot"></div>
    Now live — Gurugram, Delhi & Jaipur
  </div>
  <h1>Your business deserves to be <span class="highlight">found online</span></h1>
  <p class="hero-hindi">"Aapka business Google par dikhna chahiye."</p>
  <p class="hero-sub">Dikhao builds your complete digital presence — website, Google listing, WhatsApp catalog — in under 10 minutes. AI-powered. No tech skills needed.</p>
  <div class="hero-actions">
    <a href="/demo" class="btn-primary">See your website in 30 seconds →</a>
    <a href="#how" class="btn-secondary">How it works</a>
  </div>
  <div class="hero-trust">
    <p>Trusted by local businesses across India</p>
    <div class="trust-logos">
      <span class="trust-item">Dr. Sharma Clinic</span>
      <span class="trust-item">·</span>
      <span class="trust-item">Sunrise Tutorials</span>
      <span class="trust-item">·</span>
      <span class="trust-item">Mehta & Associates</span>
      <span class="trust-item">·</span>
      <span class="trust-item">Glow Beauty Studio</span>
    </div>
  </div>
</section>

<!-- STATS -->
<div class="stats-strip">
  <div class="stat-item"><div class="stat-num">63M+</div><div class="stat-label">MSMEs with no online presence</div></div>
  <div class="stat-item"><div class="stat-num">10 min</div><div class="stat-label">Time to go fully live</div></div>
  <div class="stat-item"><div class="stat-num">₹299</div><div class="stat-label">Starting price per month</div></div>
  <div class="stat-item"><div class="stat-num">4-in-1</div><div class="stat-label">Website · GMB · WhatsApp · Social</div></div>
</div>

<!-- PROBLEM -->
<section class="problem">
  <div class="problem-inner">
    <p class="problem-tag">The problem</p>
    <h2>Your customers are searching.<br>They're not finding you.</h2>
    <div class="problem-grid reveal">
      <div class="prob-card">
        <div class="prob-icon">🔍</div>
        <h3>You're invisible on Google</h3>
        <p>When a patient searches "clinic near me" or a parent searches "tutor in Gurugram" — <span class="prob-highlight">you don't show up</span>. Your competitor does. Every day, you lose customers you never knew you had.</p>
      </div>
      <div class="prob-card">
        <div class="prob-icon">💸</div>
        <h3>Agencies are too expensive</h3>
        <p>A digital marketing agency charges <span class="prob-highlight">₹15,000–₹50,000/month</span>. That's not a budget most local businesses can justify. So nothing gets done. And the problem gets worse every year.</p>
      </div>
      <div class="prob-card">
        <div class="prob-icon">😓</div>
        <h3>DIY tools are too complex</h3>
        <p>Wix, WordPress, Google — all require <span class="prob-highlight">hours of learning</span> you don't have. You're busy running your business. You shouldn't need to become a tech expert just to be found online.</p>
      </div>
    </div>
  </div>
</section>

<!-- HOW IT WORKS -->
<section class="how" id="how">
  <div class="how-inner">
    <p class="section-tag">How it works</p>
    <h2 class="section-h2">Live in 10 minutes.<br>Seriously.</h2>
    <p class="section-sub">Answer 10 simple questions. Dikhao's AI does the rest — automatically, instantly, perfectly.</p>
    <div class="steps reveal">
      <div class="step-card">
        <div class="step-num">1</div>
        <h3>Tell us about your business</h3>
        <p>Enter your business name, category, location, phone, and a brief description. No design skills, no technical knowledge — just your business details.</p>
        <span class="step-time">⏱ 2 minutes</span>
      </div>
      <div class="step-card">
        <div class="step-num">2</div>
        <h3>AI builds everything</h3>
        <p>Dikhao instantly generates your website, writes your Google listing, sets up your WhatsApp catalog, and creates your first month of social media posts.</p>
        <span class="step-time">⏱ 30 seconds</span>
      </div>
      <div class="step-card">
        <div class="step-num">3</div>
        <h3>Go live & get found</h3>
        <p>Your digital presence is live. Customers find you on Google, visit your website, WhatsApp you directly. You start getting inquiries — without lifting another finger.</p>
        <span class="step-time">⏱ Within 7 days</span>
      </div>
    </div>
  </div>
</section>

<!-- FEATURES -->
<section class="features" id="features">
  <div class="features-inner">
    <p class="section-tag">What you get</p>
    <h2 class="section-h2">Everything. In one place.</h2>
    <p class="section-sub">Four powerful tools, built automatically by AI, managed in one simple dashboard.</p>
    <div class="features-grid reveal">
      <div class="feat-card featured">
        <div class="feat-icon">🌐</div>
        <h3>Professional Website</h3>
        <p>A beautiful 5-page website — Home, About, Services, Gallery, and Contact — designed for your specific business type. Mobile-first, fast-loading, and instantly shareable.</p>
        <span class="feat-tag">Live in 2 minutes</span>
      </div>
      <div class="feat-card">
        <div class="feat-icon">📍</div>
        <h3>Google My Business Listing</h3>
        <p>Your business appears on Google Maps and Google Search when local customers are looking. AI writes the perfect description, adds your hours, category, and location — automatically.</p>
        <span class="feat-tag">Show up on Google</span>
      </div>
      <div class="feat-card">
        <div class="feat-icon">💬</div>
        <h3>WhatsApp Business Catalog</h3>
        <p>Your services, prices, and photos in a professional WhatsApp catalog. Auto-replies set up for common questions. Customers can reach you in one tap — the way they prefer.</p>
        <span class="feat-tag">India's #1 channel</span>
      </div>
      <div class="feat-card">
        <div class="feat-icon">📱</div>
        <h3>Monthly Social Media Content</h3>
        <p>30 ready-made social posts per month — written specifically for your business category, in Hindi and English. Post them yourself or let us auto-schedule. Never run out of content again.</p>
        <span class="feat-tag">30 posts/month</span>
      </div>
    </div>
  </div>
</section>

<!-- LIVE DEMO -->
<section class="demo-section" id="demo">
  <div class="demo-inner">
    <p class="section-tag">Live demo</p>
    <h2 class="section-h2">See it yourself.</h2>
    <p class="section-sub" style="margin: 0 auto 0">Enter your business details and watch Dikhao generate your complete website, Google listing and WhatsApp catalog — in 30 seconds.</p>
    <div class="demo-box reveal" style="text-align:center;">
      <h3>Your website, in 30 seconds &#128640;</h3>
      <p>Fill in 4 simple details — see exactly what Dikhao would build for your business. Free, no signup.</p>
      <a href="/demo" class="btn-demo" style="display:inline-block;text-decoration:none;margin-top:8px;">See your website in 30 seconds &#8594;</a>
    </div>
  </div>
</section>

<!-- PRICING -->
<section class="pricing" id="pricing">
  <div class="pricing-inner">
    <p class="section-tag">Pricing</p>
    <h2 class="section-h2">Less than a chai per day.</h2>
    <p class="section-sub">No setup fees. No contracts. Cancel anytime. Start free for 14 days.</p>
    <div class="pricing-grid reveal">
      <div class="price-card">
        <p class="price-tier">Starter</p>
        <div class="price-amount">₹299</div>
        <p class="price-period">per month</p>
        <div class="price-divider"></div>
        <ul class="price-features">
          <li>5-page professional website</li>
          <li>Google My Business listing</li>
          <li>Mobile-friendly design</li>
          <li>Business analytics dashboard</li>
          <li>WhatsApp support</li>
        </ul>
        <button class="btn-plan btn-plan-outline">Get started free</button>
      </div>
      <div class="price-card popular">
        <div class="popular-badge">⭐ Most Popular</div>
        <p class="price-tier">Growth</p>
        <div class="price-amount">₹699</div>
        <p class="price-period">per month</p>
        <div class="price-divider"></div>
        <ul class="price-features">
          <li>Everything in Starter</li>
          <li>WhatsApp Business catalog</li>
          <li>8 social media posts/month</li>
          <li>Google review collection</li>
          <li>WhatsApp auto-reply bot</li>
          <li>Monthly performance report</li>
        </ul>
        <button class="btn-plan btn-plan-solid">Start 14-day free trial</button>
      </div>
      <div class="price-card">
        <p class="price-tier">Pro</p>
        <div class="price-amount">₹1,499</div>
        <p class="price-period">per month</p>
        <div class="price-divider"></div>
        <ul class="price-features">
          <li>Everything in Growth</li>
          <li>Google & Meta Ads management</li>
          <li>30 social posts/month</li>
          <li>Competitor analysis</li>
          <li>Dedicated account manager</li>
          <li>Priority WhatsApp support</li>
        </ul>
        <button class="btn-plan btn-plan-outline">Get started free</button>
      </div>
    </div>
    <p style="text-align:center;margin-top:24px;font-size:13px;color:var(--ink-tertiary)">CA firm or digital agency? <a href="#" style="color:var(--teal);font-weight:600">See our white-label plan →</a></p>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="testimonials">
  <div class="testimonials-inner">
    <p class="section-tag">What businesses say</p>
    <h2 class="section-h2">Real results. Real businesses.</h2>
    <div class="testimonials-grid reveal">
      <div class="testi-card">
        <div class="testi-stars">★★★★★</div>
        <p class="testi-text">"Pehle mahine mein 14 nayi inquiries aayi sirf Google se. Mujhe ek bhi phone nahi karna pada — sab kuch khud ho gaya."</p>
        <div class="testi-author">
          <div class="testi-avatar">DS</div>
          <div>
            <div class="testi-name">Dr. Deepak Sharma</div>
            <div class="testi-role">General Physician, Gurugram</div>
          </div>
        </div>
      </div>
      <div class="testi-card">
        <div class="testi-stars">★★★★★</div>
        <p class="testi-text">"Set up in literally 8 minutes. My students' parents can now find me on Google, see my results, and WhatsApp me directly. Admissions are up 40% this quarter."</p>
        <div class="testi-author">
          <div class="testi-avatar">PV</div>
          <div>
            <div class="testi-name">Priya Verma</div>
            <div class="testi-role">Maths Tutor, Noida</div>
          </div>
        </div>
      </div>
      <div class="testi-card">
        <div class="testi-stars">★★★★★</div>
        <p class="testi-text">"I recommend Dikhao to every MSME client in my CA practice. For ₹699/month they get what agencies charge ₹20,000 for. It's a no-brainer recommendation."</p>
        <div class="testi-author">
          <div class="testi-avatar">RM</div>
          <div>
            <div class="testi-name">Rajesh Mehta</div>
            <div class="testi-role">Chartered Accountant, Jaipur</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta-section">
  <h2>Be found. Be chosen.<br>Start today.</h2>
  <p class="hindi">"Aaj se aapka business online."</p>
  <p>Join thousands of Indian businesses already growing with Dikhao.</p>
  <div class="cta-price">14-day free trial · No credit card · Cancel anytime</div><br>
  <a href="/demo" class="btn-cta">Get your free digital presence →</a>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-inner">
    <div class="footer-top">
      <div class="footer-brand">
        <a class="footer-logo" href="#">Dikh<span>ao</span></a>
        <p>India ka apna AI digital presence platform. Built for every MSME that deserves to be found online.</p>
      </div>
      <div class="footer-col">
        <h4>Product</h4>
        <a href="#">Features</a>
        <a href="#">Pricing</a>
        <a href="/demo">Live demo</a>
        <a href="#">CA partners</a>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <a href="#">About</a>
        <a href="#">Blog</a>
        <a href="#">Careers</a>
        <a href="#">Contact</a>
      </div>
      <div class="footer-col">
        <h4>Support</h4>
        <a href="#">Help center</a>
        <a href="#">WhatsApp us</a>
        <a href="#">Privacy policy</a>
        <a href="#">Terms of use</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 Dikhao. Made in India 🇮🇳</p>
      <div class="footer-lang">
        <a href="#">English</a>
        <a href="#">हिंदी</a>
      </div>
    </div>
  </div>
</footer>


`;

const HOME_CSS = `
:root {
  --teal: #0B7B6B;
  --teal-dark: #085a4e;
  --teal-light: #E6F4F1;
  --teal-mid: #C2E0DA;
  --amber: #E8951A;
  --amber-light: #FEF4E6;
  --off-white: #F7F6F2;
  --white: #FFFFFF;
  --ink: #141414;
  --ink-secondary: #4A4A4A;
  --ink-tertiary: #888;
  --border: #E2E0D8;
  --radius: 16px;
  --radius-sm: 10px;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'DM Sans', sans-serif;
  background: var(--off-white);
  color: var(--ink);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* NAV */
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 5vw; height: 64px;
  background: rgba(247,246,242,0.88);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
}
.nav-logo {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 22px; font-weight: 800;
  color: var(--teal); letter-spacing: -0.5px;
  text-decoration: none;
}
.nav-logo span { color: var(--amber); }
.nav-links { display: flex; align-items: center; gap: 32px; }
.nav-links a {
  font-size: 14px; font-weight: 500; color: var(--ink-secondary);
  text-decoration: none; transition: color .2s;
}
.nav-links a:hover { color: var(--teal); }
.nav-cta {
  background: var(--teal); color: #fff;
  font-size: 14px; font-weight: 600;
  padding: 9px 22px; border-radius: 50px;
  text-decoration: none; transition: background .2s, transform .15s;
  border: none; cursor: pointer;
}
.nav-cta:hover { background: var(--teal-dark); transform: translateY(-1px); }

/* HERO */
.hero {
  min-height: 100vh;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center;
  padding: 120px 5vw 80px;
  position: relative; overflow: hidden;
}
.hero-bg {
  position: absolute; inset: 0; z-index: 0;
  background: radial-gradient(ellipse 80% 60% at 50% 0%, #C2E0DA 0%, transparent 70%),
              radial-gradient(ellipse 40% 40% at 80% 80%, #FEF4E6 0%, transparent 60%);
}
.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--white); border: 1px solid var(--border);
  border-radius: 50px; padding: 6px 16px 6px 8px;
  font-size: 13px; font-weight: 500; color: var(--teal);
  margin-bottom: 28px; position: relative; z-index: 1;
  animation: fadeUp .6s ease both;
}
.hero-badge-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--teal); animation: pulse 2s infinite;
}
@keyframes pulse {
  0%,100% { opacity: 1; transform: scale(1); }
  50% { opacity: .6; transform: scale(1.3); }
}
.hero h1 {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(42px, 6vw, 82px);
  font-weight: 800; line-height: 1.05;
  letter-spacing: -2px; color: var(--ink);
  max-width: 860px; margin: 0 auto 12px;
  position: relative; z-index: 1;
  animation: fadeUp .7s .1s ease both;
}
.hero h1 .highlight {
  color: var(--teal); position: relative; display: inline-block;
}
.hero h1 .highlight::after {
  content: ''; position: absolute; bottom: 4px; left: 0; right: 0;
  height: 4px; background: var(--amber); border-radius: 2px;
}
.hero-hindi {
  font-size: 18px; color: var(--ink-secondary); font-style: italic;
  margin-bottom: 20px; position: relative; z-index: 1;
  animation: fadeUp .7s .2s ease both;
}
.hero-sub {
  font-size: clamp(16px, 2vw, 19px); color: var(--ink-secondary);
  max-width: 560px; line-height: 1.65;
  margin: 0 auto 40px; position: relative; z-index: 1;
  animation: fadeUp .7s .25s ease both;
}
.hero-actions {
  display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;
  position: relative; z-index: 1;
  animation: fadeUp .7s .35s ease both;
}
.btn-primary {
  background: var(--teal); color: #fff;
  font-size: 16px; font-weight: 600;
  padding: 14px 32px; border-radius: 50px;
  text-decoration: none; border: none; cursor: pointer;
  transition: all .2s; box-shadow: 0 4px 20px rgba(11,123,107,.25);
}
.btn-primary:hover { background: var(--teal-dark); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(11,123,107,.35); }
.btn-secondary {
  background: transparent; color: var(--ink);
  font-size: 16px; font-weight: 500;
  padding: 14px 28px; border-radius: 50px;
  text-decoration: none; border: 1.5px solid var(--border);
  cursor: pointer; transition: all .2s;
}
.btn-secondary:hover { border-color: var(--teal); color: var(--teal); background: var(--teal-light); }
.hero-trust {
  margin-top: 56px; position: relative; z-index: 1;
  animation: fadeUp .7s .45s ease both;
}
.hero-trust p { font-size: 13px; color: var(--ink-tertiary); margin-bottom: 14px; }
.trust-logos {
  display: flex; align-items: center; justify-content: center; gap: 28px; flex-wrap: wrap;
}
.trust-item {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 15px; font-weight: 700; color: #ccc; letter-spacing: -0.3px;
}

/* STATS STRIP */
.stats-strip {
  background: var(--teal); padding: 28px 5vw;
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 1px; border-top: 1px solid var(--teal-dark);
}
.stat-item {
  text-align: center; padding: 8px 16px;
  border-right: 1px solid rgba(255,255,255,.15);
}
.stat-item:last-child { border-right: none; }
.stat-num {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 32px; font-weight: 800; color: #fff; line-height: 1;
}
.stat-label { font-size: 13px; color: rgba(255,255,255,.7); margin-top: 4px; }

/* PROBLEM SECTION */
.problem {
  padding: 100px 5vw;
  background: var(--ink);
  color: var(--white);
}
.problem-inner { max-width: 1100px; margin: 0 auto; }
.problem-tag {
  display: inline-block; font-size: 12px; font-weight: 600;
  letter-spacing: .1em; text-transform: uppercase;
  color: var(--amber); margin-bottom: 20px;
}
.problem h2 {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(32px, 4.5vw, 56px);
  font-weight: 800; line-height: 1.1; letter-spacing: -1.5px;
  max-width: 700px; margin-bottom: 48px;
}
.problem-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: #333; border-radius: var(--radius); overflow: hidden; }
.prob-card {
  background: #1a1a1a; padding: 32px 28px;
  transition: background .2s;
}
.prob-card:hover { background: #222; }
.prob-icon { font-size: 32px; margin-bottom: 16px; }
.prob-card h3 {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 20px; font-weight: 700; margin-bottom: 10px; color: #fff;
}
.prob-card p { font-size: 14px; color: #999; line-height: 1.65; }
.prob-highlight { color: var(--amber); font-weight: 600; }

/* HOW IT WORKS */
.how {
  padding: 100px 5vw;
  background: var(--off-white);
}
.how-inner { max-width: 1100px; margin: 0 auto; }
.section-tag {
  display: inline-block; font-size: 12px; font-weight: 600;
  letter-spacing: .1em; text-transform: uppercase;
  color: var(--teal); margin-bottom: 16px;
}
.section-h2 {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(30px, 4vw, 50px);
  font-weight: 800; line-height: 1.1; letter-spacing: -1.5px;
  margin-bottom: 14px; color: var(--ink);
}
.section-sub {
  font-size: 17px; color: var(--ink-secondary); line-height: 1.6;
  max-width: 500px; margin-bottom: 64px;
}
.steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; position: relative; }
.steps::before {
  content: ''; position: absolute;
  top: 36px; left: calc(16.67% + 24px); right: calc(16.67% + 24px);
  height: 2px;
  background: repeating-linear-gradient(90deg, var(--teal-mid) 0, var(--teal-mid) 8px, transparent 8px, transparent 16px);
}
.step-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 32px 28px;
  position: relative;
  transition: transform .2s, box-shadow .2s;
}
.step-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,.08); }
.step-num {
  width: 48px; height: 48px; border-radius: 50%;
  background: var(--teal); color: #fff;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 20px; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 24px; position: relative; z-index: 1;
}
.step-card h3 {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 20px; font-weight: 700; margin-bottom: 10px;
}
.step-card p { font-size: 14px; color: var(--ink-secondary); line-height: 1.65; }
.step-time {
  margin-top: 20px; display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; font-weight: 600; color: var(--teal);
  background: var(--teal-light); padding: 5px 12px; border-radius: 50px;
}

/* FEATURES */
.features {
  padding: 100px 5vw;
  background: var(--white);
}
.features-inner { max-width: 1100px; margin: 0 auto; }
.features-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 56px; }
.feat-card {
  border: 1px solid var(--border); border-radius: var(--radius);
  padding: 36px 32px; position: relative; overflow: hidden;
  transition: border-color .2s, transform .2s;
}
.feat-card:hover { border-color: var(--teal); transform: translateY(-3px); }
.feat-card.featured { border-color: var(--teal); background: var(--teal-light); }
.feat-icon {
  width: 48px; height: 48px; border-radius: 12px;
  background: var(--teal-light); display: flex; align-items: center; justify-content: center;
  font-size: 22px; margin-bottom: 20px;
}
.feat-card.featured .feat-icon { background: rgba(11,123,107,.15); }
.feat-card h3 {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 20px; font-weight: 700; margin-bottom: 10px;
}
.feat-card p { font-size: 14px; color: var(--ink-secondary); line-height: 1.65; margin-bottom: 16px; }
.feat-tag {
  font-size: 12px; font-weight: 600; color: var(--teal);
  background: var(--teal-light); padding: 4px 12px; border-radius: 50px;
  display: inline-block;
}

/* DEMO SECTION */
.demo-section {
  padding: 100px 5vw;
  background: var(--off-white);
}
.demo-inner { max-width: 760px; margin: 0 auto; text-align: center; }
.demo-box {
  background: var(--white); border: 1px solid var(--border);
  border-radius: 24px; padding: 48px 40px;
  box-shadow: 0 24px 80px rgba(0,0,0,.06);
  margin-top: 48px;
}
.demo-box h3 {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 26px; font-weight: 800; margin-bottom: 8px;
}
.demo-box p { font-size: 15px; color: var(--ink-secondary); margin-bottom: 32px; }
.demo-form { display: flex; flex-direction: column; gap: 14px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.demo-input {
  width: 100%; padding: 14px 18px;
  background: var(--off-white); border: 1.5px solid var(--border);
  border-radius: var(--radius-sm); font-size: 15px;
  font-family: 'DM Sans', sans-serif; color: var(--ink);
  transition: border-color .2s, box-shadow .2s; outline: none;
}
.demo-input:focus { border-color: var(--teal); box-shadow: 0 0 0 4px rgba(11,123,107,.1); }
.demo-select {
  width: 100%; padding: 14px 18px;
  background: var(--off-white); border: 1.5px solid var(--border);
  border-radius: var(--radius-sm); font-size: 15px;
  font-family: 'DM Sans', sans-serif; color: var(--ink);
  appearance: none; outline: none; cursor: pointer;
  transition: border-color .2s;
}
.demo-select:focus { border-color: var(--teal); }
.btn-demo {
  background: var(--teal); color: #fff;
  font-size: 16px; font-weight: 600;
  padding: 15px 32px; border-radius: 50px;
  border: none; cursor: pointer;
  transition: all .2s; width: 100%;
  box-shadow: 0 4px 20px rgba(11,123,107,.25);
  font-family: 'DM Sans', sans-serif;
}
.btn-demo:hover { background: var(--teal-dark); transform: translateY(-2px); }
.demo-result {
  display: none; margin-top: 28px; text-align: left;
  background: var(--teal-light); border: 1.5px solid var(--teal-mid);
  border-radius: var(--radius); padding: 24px;
}
.demo-result.show { display: block; animation: fadeUp .4s ease; }
.demo-result h4 {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 16px; font-weight: 700; color: var(--teal); margin-bottom: 12px;
}
.demo-result p { font-size: 13.5px; color: var(--ink-secondary); line-height: 1.65; margin-bottom: 8px; }
.demo-result p:last-child { margin-bottom: 0; }

/* PRICING */
.pricing {
  padding: 100px 5vw;
  background: var(--white);
}
.pricing-inner { max-width: 1100px; margin: 0 auto; }
.pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 56px; }
.price-card {
  border: 1px solid var(--border); border-radius: var(--radius);
  padding: 36px 32px; position: relative;
  transition: transform .2s, box-shadow .2s;
}
.price-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,.08); }
.price-card.popular {
  border-color: var(--teal); background: var(--ink); color: white;
}
.popular-badge {
  position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
  background: var(--amber); color: var(--ink);
  font-size: 12px; font-weight: 700; padding: 5px 16px;
  border-radius: 50px; white-space: nowrap;
}
.price-tier { font-size: 13px; font-weight: 600; color: var(--ink-tertiary); text-transform: uppercase; letter-spacing: .08em; margin-bottom: 12px; }
.price-card.popular .price-tier { color: rgba(255,255,255,.5); }
.price-amount {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 42px; font-weight: 800; line-height: 1; margin-bottom: 4px;
}
.price-period { font-size: 13px; color: var(--ink-tertiary); margin-bottom: 24px; }
.price-card.popular .price-period { color: rgba(255,255,255,.5); }
.price-divider { height: 1px; background: var(--border); margin-bottom: 24px; }
.price-card.popular .price-divider { background: rgba(255,255,255,.15); }
.price-features { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }
.price-features li {
  font-size: 14px; color: var(--ink-secondary);
  display: flex; align-items: flex-start; gap: 10px; line-height: 1.4;
}
.price-card.popular .price-features li { color: rgba(255,255,255,.75); }
.price-features li::before {
  content: '✓'; color: var(--teal); font-weight: 700;
  flex-shrink: 0; margin-top: 1px;
}
.price-card.popular .price-features li::before { color: var(--amber); }
.btn-plan {
  width: 100%; padding: 14px; border-radius: 50px;
  font-size: 15px; font-weight: 600; cursor: pointer;
  border: none; transition: all .2s;
  font-family: 'DM Sans', sans-serif;
}
.btn-plan-outline {
  background: transparent; color: var(--teal);
  border: 1.5px solid var(--teal);
}
.btn-plan-outline:hover { background: var(--teal-light); }
.btn-plan-solid { background: var(--amber); color: var(--ink); }
.btn-plan-solid:hover { background: #d4870f; transform: translateY(-1px); }

/* TESTIMONIALS */
.testimonials {
  padding: 100px 5vw;
  background: var(--off-white);
}
.testimonials-inner { max-width: 1100px; margin: 0 auto; }
.testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 56px; }
.testi-card {
  background: var(--white); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 32px 28px;
}
.testi-stars { color: var(--amber); font-size: 16px; margin-bottom: 16px; letter-spacing: 2px; }
.testi-text { font-size: 15px; line-height: 1.7; color: var(--ink-secondary); margin-bottom: 24px; font-style: italic; }
.testi-author { display: flex; align-items: center; gap: 12px; }
.testi-avatar {
  width: 44px; height: 44px; border-radius: 50%;
  background: var(--teal-mid); display: flex; align-items: center; justify-content: center;
  font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: 16px; color: var(--teal);
}
.testi-name { font-size: 14px; font-weight: 600; color: var(--ink); }
.testi-role { font-size: 12px; color: var(--ink-tertiary); }

/* CTA SECTION */
.cta-section {
  padding: 100px 5vw;
  background: var(--teal);
  text-align: center; position: relative; overflow: hidden;
}
.cta-section::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse 60% 80% at 50% 100%, rgba(232,149,26,.2) 0%, transparent 70%);
}
.cta-section * { position: relative; z-index: 1; }
.cta-section h2 {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(32px, 5vw, 60px);
  font-weight: 800; color: #fff; letter-spacing: -1.5px;
  margin-bottom: 12px; line-height: 1.1;
}
.cta-section .hindi { font-size: 18px; color: rgba(255,255,255,.7); font-style: italic; margin-bottom: 20px; }
.cta-section p { font-size: 18px; color: rgba(255,255,255,.8); margin-bottom: 40px; max-width: 500px; margin-left: auto; margin-right: auto; }
.cta-price {
  display: inline-block; background: rgba(255,255,255,.15);
  border: 1px solid rgba(255,255,255,.25); border-radius: 50px;
  padding: 8px 20px; font-size: 14px; color: rgba(255,255,255,.9);
  margin-bottom: 32px;
}
.btn-cta {
  background: var(--amber); color: var(--ink);
  font-size: 17px; font-weight: 700;
  padding: 16px 40px; border-radius: 50px;
  border: none; cursor: pointer; text-decoration: none;
  display: inline-block;
  transition: all .2s;
  box-shadow: 0 8px 32px rgba(232,149,26,.4);
}
.btn-cta:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(232,149,26,.5); }

/* FOOTER */
footer {
  background: var(--ink); padding: 56px 5vw 32px;
}
.footer-inner { max-width: 1100px; margin: 0 auto; }
.footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px; }
.footer-brand p { font-size: 14px; color: #888; line-height: 1.65; margin-top: 12px; max-width: 280px; }
.footer-logo {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 24px; font-weight: 800; color: #fff; text-decoration: none;
}
.footer-logo span { color: var(--amber); }
.footer-col h4 { font-size: 13px; font-weight: 600; color: #fff; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 16px; }
.footer-col a { display: block; font-size: 14px; color: #888; text-decoration: none; margin-bottom: 10px; transition: color .2s; }
.footer-col a:hover { color: #fff; }
.footer-bottom {
  border-top: 1px solid #2a2a2a; padding-top: 24px;
  display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;
}
.footer-bottom p { font-size: 13px; color: #555; }
.footer-lang {
  display: flex; gap: 16px;
}
.footer-lang a { font-size: 13px; color: #555; text-decoration: none; }
.footer-lang a:hover { color: #888; }

/* ANIMATIONS */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.reveal {
  opacity: 0; transform: translateY(24px);
  transition: opacity .6s ease, transform .6s ease;
}
.reveal.visible { opacity: 1; transform: translateY(0); }

/* RESPONSIVE */
@media (max-width: 768px) {
  .nav-links { display: none; }
  .stats-strip { grid-template-columns: 2fr 2fr; }
  .stat-item:nth-child(2) { border-right: none; }
  .problem-grid { grid-template-columns: 1fr; }
  .steps { grid-template-columns: 1fr; }
  .steps::before { display: none; }
  .features-grid { grid-template-columns: 1fr; }
  .form-row { grid-template-columns: 1fr; }
  .pricing-grid { grid-template-columns: 1fr; }
  .testimonials-grid { grid-template-columns: 1fr; }
  .footer-top { grid-template-columns: 1fr 1fr; }
}
`;

const HOME_JS = `
// Scroll reveal animation
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(r => observer.observe(r));
`;

export default function HomeClient() {
  const mountRef = useRef(false);

  useEffect(() => {
    if (mountRef.current) return;
    mountRef.current = true;
    const s = document.createElement("script");
    s.textContent = HOME_JS;
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HOME_CSS }} />
      <div dangerouslySetInnerHTML={{ __html: HOME_HTML }} />
    </>
  );
}

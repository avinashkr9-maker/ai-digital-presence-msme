"use client";

import { useEffect, useRef } from "react";

// Dikhao live demo — converted from the original standalone HTML page.
// The markup, styles, and generator logic are preserved exactly so the
// demo behaves identically. The generator runs fully client-side using
// built-in templates (no external API needed).

const DEMO_HTML = `

<nav>
  <a class="logo" href="/">Dikh<span>ao</span></a>
  <a class="back" href="/">← Back to home</a>
</nav>

<div class="page">
  <!-- FORM -->
  <div class="form-panel">
    <h1>See your business online in 30 seconds</h1>
    <p class="sub">Enter your business details — our AI builds your complete digital presence instantly.</p>

    <div class="field">
      <label>Business name *</label>
      <input id="f-name" type="text" placeholder="e.g. Dr. Sharma Clinic" />
    </div>
    <div class="field">
      <label>Business type *</label>
      <select id="f-category">
        <option value="">Select category</option>
        <option value="clinic">Clinic / Doctor</option>
        <option value="dental">Dental Clinic</option>
        <option value="tutor">Tuition / Coaching Center</option>
        <option value="salon">Salon / Beauty Studio</option>
        <option value="ca">CA / Accountant</option>
        <option value="gym">Gym / Fitness Center</option>
        <option value="restaurant">Restaurant / Café</option>
        <option value="boutique">Boutique / Clothing</option>
        <option value="pharmacy">Medical Store / Pharmacy</option>
        <option value="lawyer">Lawyer / Law Firm</option>
        <option value="mechanic">Auto Mechanic / Garage</option>
        <option value="other">Other</option>
      </select>
    </div>
    <div class="field">
      <label>City *</label>
      <input id="f-city" type="text" placeholder="e.g. Gurugram" />
    </div>
    <div class="field">
      <label>Phone number</label>
      <input id="f-phone" type="tel" placeholder="e.g. 98100 00000" />
    </div>
    <div class="field">
      <label>Anything special about your business? <span style="color:var(--ink3);font-weight:400">(optional)</span></label>
      <textarea id="f-about" placeholder="e.g. 15 years experience, open on Sundays, home visits available..."></textarea>
    </div>

    <button class="btn-generate" id="gen-btn" onclick="generate()">
      Generate my digital presence →
    </button>
    <p class="trust">No signup needed · <span>100% free demo</span> · Powered by AI</p>
  </div>

  <!-- PREVIEW -->
  <div class="preview-panel">
    <div class="preview-empty" id="empty-state">
      <div class="icon">✨</div>
      <h3>Your website will appear here</h3>
      <p>Fill in your business details on the left and click generate — your complete digital presence will be ready in under 30 seconds.</p>
    </div>

    <div class="loading-wrap" id="loading-state">
      <div class="spinner"></div>
      <p style="font-size:15px;font-weight:500;color:var(--ink)">Building your digital presence...</p>
      <p style="font-size:13px;color:var(--ink3);margin-top:6px">Our AI is writing copy, designing your site, and setting up your listings</p>
      <div class="loading-steps">
        <div class="lstep active" id="ls1"><div class="lstep-dot"></div>Generating website content</div>
        <div class="lstep" id="ls2"><div class="lstep-dot"></div>Writing Google listing</div>
        <div class="lstep" id="ls3"><div class="lstep-dot"></div>Setting up WhatsApp catalog</div>
        <div class="lstep" id="ls4"><div class="lstep-dot"></div>Finalising your preview</div>
      </div>
    </div>

    <div class="site-preview" id="preview-state">
      <div class="preview-tabs">
        <div class="ptab active" onclick="showTab('website',this)">🌐 Website</div>
        <div class="ptab" onclick="showTab('gmb',this)">📍 Google listing</div>
        <div class="ptab" onclick="showTab('whatsapp',this)">💬 WhatsApp</div>
      </div>

      <!-- WEBSITE TAB -->
      <div id="tab-website">
        <div class="browser-bar">
          <div class="browser-dots">
            <div class="browser-dot b-red"></div>
            <div class="browser-dot b-yellow"></div>
            <div class="browser-dot b-green"></div>
          </div>
          <div class="url-bar" id="url-bar">yourname.dikhao.in</div>
        </div>

        <div id="site-hero-section" class="site-hero">
          <div style="display:inline-block;background:var(--teal-l);color:var(--teal);font-size:12px;font-weight:600;padding:4px 12px;border-radius:50px;margin-bottom:12px" id="site-badge"></div>
          <div class="site-name" id="site-name"></div>
          <div class="site-tagline" id="site-tagline"></div>
          <div>
            <a class="site-btn" href="#">Book appointment</a>
            <a class="site-btn-outline" href="#">Learn more</a>
          </div>
        </div>

        <div class="site-section">
          <div class="site-section-title">Our Services</div>
          <div class="services-grid" id="services-grid"></div>
        </div>

        <div class="site-section" style="background:var(--teal-l)">
          <div class="site-section-title">About Us</div>
          <p class="about-text" id="about-text"></p>
        </div>

        <div class="site-section">
          <div class="site-section-title">Contact Us</div>
          <div id="contact-info"></div>
        </div>

        <div class="site-footer">
          <div class="site-footer-name" id="footer-name"></div>
          <div class="site-footer-tag">Made with Dikhao ✦</div>
        </div>
      </div>

      <!-- GMB TAB -->
      <div id="tab-gmb" class="gmb-preview">
        <p style="font-size:12px;color:var(--ink3);margin-bottom:12px">How you'll appear on Google Search & Maps</p>
        <div class="gmb-card">
          <div class="gmb-biz-name" id="gmb-name"></div>
          <div class="gmb-cat" id="gmb-cat"></div>
          <div class="gmb-stars">★★★★★ <span style="font-size:13px;color:var(--ink3);font-family:'DM Sans'">New listing</span></div>
          <div class="gmb-row"><span class="gmb-icon">📍</span><span id="gmb-address"></span></div>
          <div class="gmb-row"><span class="gmb-icon">📞</span><span id="gmb-phone"></span></div>
          <div class="gmb-row"><span class="gmb-icon">🌐</span><span id="gmb-website" style="color:var(--teal)"></span></div>
          <div class="gmb-hours" id="gmb-hours"></div>
          <button class="gmb-btn">Get directions</button>
        </div>
        <div style="margin-top:16px;background:var(--off);border-radius:var(--r-sm);padding:14px;font-size:13px;color:var(--ink2)">
          <strong style="color:var(--ink)">AI-written description:</strong><br>
          <span id="gmb-desc" style="line-height:1.6;display:block;margin-top:6px"></span>
        </div>
      </div>

      <!-- WHATSAPP TAB -->
      <div id="tab-whatsapp" class="wa-preview">
        <p style="font-size:12px;color:var(--ink3);margin-bottom:12px">Your WhatsApp Business auto-reply message</p>
        <div class="wa-card">
          <div class="wa-header">
            <div class="wa-avatar" id="wa-avatar"></div>
            <div>
              <div class="wa-biz-name" id="wa-biz-name"></div>
              <div class="wa-status">Business account · Usually replies instantly</div>
            </div>
          </div>
          <div style="font-size:11px;color:#888;text-align:center;margin-bottom:12px">Today</div>
          <div class="wa-bubble">
            <div id="wa-message"></div>
            <div class="wa-time">Now ✓✓</div>
          </div>
        </div>
        <div style="margin-top:16px;background:var(--off);border-radius:var(--r-sm);padding:14px">
          <p style="font-size:13px;font-weight:600;color:var(--ink);margin-bottom:8px">WhatsApp catalog includes:</p>
          <div id="wa-services" style="font-size:13px;color:var(--ink2);line-height:1.8"></div>
        </div>
      </div>

      <div class="copy-section">
        <button class="copy-btn" onclick="copyDetails()">📋 Copy all details</button>
        <button class="signup-btn" onclick="openActivation()">✨ Activate this website</button>
      </div>

      <div class="activation-card" id="activation-card">
        <h3>Your preview is ready to go live</h3>
        <p>This demo shows how your business can look online. The next step is activation, where we turn this preview into your live digital presence.</p>
        <div class="activation-points">
          <div class="activation-point"><strong>Starter · ₹299/month</strong><br>Website + Google listing support</div>
          <div class="activation-point"><strong>Growth · ₹699/month</strong><br>Website + WhatsApp catalog + monthly content</div>
          <div class="activation-point"><strong>Fast setup</strong><br>Built from your preview details with simple final polish</div>
          <div class="activation-point"><strong>Best next step</strong><br>Share this preview and confirm activation</div>
        </div>
        <div class="activation-actions">
          <a class="activate-btn" id="activate-whatsapp" href="#" target="_blank" rel="noopener">Activate on WhatsApp</a>
          <a class="activate-btn" style="background:var(--amber);color:var(--ink)" href="/pricing">View Plans</a>
        </div>
        <div class="plan-note">Use WhatsApp activation for the pilot stage, then move the customer into payment and final setup.</div>
      </div>
    </div>
  </div>
</div>


`;

const DEMO_CSS = `
:root{
  --teal:#0B7B6B;--teal-d:#085a4e;--teal-l:#E6F4F1;--teal-m:#C2E0DA;
  --amber:#E8951A;--amber-l:#FEF4E6;
  --off:#F7F6F2;--white:#fff;--ink:#141414;--ink2:#4A4A4A;--ink3:#888;
  --border:#E2E0D8;--r:14px;--r-sm:8px;
}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans',sans-serif;background:var(--off);color:var(--ink);-webkit-font-smoothing:antialiased;min-height:100vh}
/* NAV */
nav{display:flex;align-items:center;justify-content:space-between;padding:0 5vw;height:60px;background:rgba(247,246,242,.92);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:50}
.logo{font-family:'Bricolage Grotesque',sans-serif;font-size:20px;font-weight:800;color:var(--teal);text-decoration:none}.logo span{color:var(--amber)}
.back{font-size:13px;color:var(--ink2);text-decoration:none;display:flex;align-items:center;gap:5px;transition:color .2s}.back:hover{color:var(--teal)}
/* LAYOUT */
.page{max-width:1200px;margin:0 auto;padding:48px 5vw 80px;display:grid;grid-template-columns:400px 1fr;gap:40px;align-items:start}
/* FORM PANEL */
.form-panel{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:32px;position:sticky;top:80px}
.form-panel h1{font-family:'Bricolage Grotesque',sans-serif;font-size:24px;font-weight:800;letter-spacing:-.5px;margin-bottom:6px;line-height:1.2}
.form-panel .sub{font-size:13.5px;color:var(--ink2);margin-bottom:28px;line-height:1.5}
.field{margin-bottom:16px}
label{display:block;font-size:12px;font-weight:500;color:var(--ink2);margin-bottom:6px;letter-spacing:.02em}
input,select,textarea{width:100%;padding:11px 14px;background:var(--off);border:1.5px solid var(--border);border-radius:var(--r-sm);font-size:14px;font-family:'DM Sans',sans-serif;color:var(--ink);outline:none;transition:border-color .2s,box-shadow .2s}
input:focus,select:focus,textarea:focus{border-color:var(--teal);box-shadow:0 0 0 3px rgba(11,123,107,.1)}
textarea{resize:vertical;min-height:80px}
select{appearance:none;cursor:pointer;background-image:url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center}
.btn-generate{width:100%;background:var(--teal);color:#fff;font-size:15px;font-weight:600;padding:13px;border-radius:50px;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;box-shadow:0 4px 16px rgba(11,123,107,.25);margin-top:8px}
.btn-generate:hover{background:var(--teal-d);transform:translateY(-1px)}
.btn-generate:disabled{background:#aaa;cursor:not-allowed;transform:none;box-shadow:none}
.trust{margin-top:20px;text-align:center;font-size:12px;color:var(--ink3)}.trust span{color:var(--teal);font-weight:500}
/* PREVIEW PANEL */
.preview-panel{min-height:500px}
.preview-empty{background:var(--white);border:1.5px dashed var(--border);border-radius:var(--r);padding:80px 32px;text-align:center}
.preview-empty .icon{font-size:48px;margin-bottom:16px;opacity:.3}
.preview-empty h3{font-family:'Bricolage Grotesque',sans-serif;font-size:20px;font-weight:700;color:var(--ink);margin-bottom:8px}
.preview-empty p{font-size:14px;color:var(--ink3);max-width:300px;margin:0 auto;line-height:1.6}
/* LOADING */
.loading-wrap{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:60px 32px;text-align:center;display:none}
.loading-wrap.show{display:block}
.spinner{width:40px;height:40px;border:3px solid var(--teal-m);border-top-color:var(--teal);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto 20px}
@keyframes spin{to{transform:rotate(360deg)}}
.loading-steps{display:flex;flex-direction:column;gap:10px;max-width:280px;margin:20px auto 0;text-align:left}
.lstep{display:flex;align-items:center;gap:10px;font-size:13px;color:var(--ink3);transition:color .4s}
.lstep.done{color:var(--teal)}.lstep.active{color:var(--ink);font-weight:500}
.lstep-dot{width:7px;height:7px;border-radius:50%;background:var(--border);flex-shrink:0;transition:background .4s}
.lstep.done .lstep-dot{background:var(--teal)}.lstep.active .lstep-dot{background:var(--amber);animation:pulse 1s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
/* WEBSITE PREVIEW */
.site-preview{background:var(--white);border:1px solid var(--border);border-radius:var(--r);overflow:hidden;display:none}
.site-preview.show{display:block;animation:fadeUp .5s ease}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.browser-bar{background:#F0EEEA;border-bottom:1px solid var(--border);padding:10px 16px;display:flex;align-items:center;gap:10px}
.browser-dots{display:flex;gap:5px}.browser-dot{width:11px;height:11px;border-radius:50%}
.b-red{background:#FF5F57}.b-yellow{background:#FFBD2E}.b-green{background:#28C840}
.url-bar{flex:1;background:var(--white);border:1px solid var(--border);border-radius:5px;padding:5px 12px;font-size:12px;color:var(--ink3);font-family:monospace}
/* SITE SECTIONS */
.site-hero{padding:48px 32px;text-align:center;position:relative}
.site-name{font-family:'Bricolage Grotesque',sans-serif;font-size:28px;font-weight:800;letter-spacing:-.5px;margin-bottom:8px;line-height:1.2}
.site-tagline{font-size:15px;color:var(--ink2);margin-bottom:20px;line-height:1.5;max-width:480px;margin-left:auto;margin-right:auto}
.site-btn{display:inline-block;background:var(--teal);color:#fff;font-size:14px;font-weight:600;padding:11px 24px;border-radius:50px;text-decoration:none;margin-right:8px}
.site-btn-outline{display:inline-block;border:1.5px solid var(--border);color:var(--ink);font-size:14px;font-weight:500;padding:10px 22px;border-radius:50px;text-decoration:none}
.site-section{padding:36px 32px;border-top:1px solid var(--border)}
.site-section-title{font-family:'Bricolage Grotesque',sans-serif;font-size:18px;font-weight:700;margin-bottom:16px}
.services-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.svc-card{background:var(--off);border-radius:var(--r-sm);padding:16px}
.svc-name{font-size:14px;font-weight:600;color:var(--ink);margin-bottom:4px}
.svc-desc{font-size:12px;color:var(--ink2);line-height:1.5}
.svc-price{font-size:13px;font-weight:600;color:var(--teal);margin-top:6px}
.about-text{font-size:14px;color:var(--ink2);line-height:1.7}
.contact-row{display:flex;align-items:center;gap:10px;margin-bottom:10px;font-size:13.5px;color:var(--ink2)}
.contact-row svg{flex-shrink:0;opacity:.5}
.site-footer{background:var(--ink);padding:20px 32px;display:flex;justify-content:space-between;align-items:center}
.site-footer-name{font-family:'Bricolage Grotesque',sans-serif;font-size:15px;font-weight:700;color:#fff}
.site-footer-tag{font-size:12px;color:#666}
/* TABS */
.preview-tabs{display:flex;gap:6px;padding:16px 16px 0;background:var(--off);border-bottom:1px solid var(--border)}
.ptab{font-size:12px;font-weight:500;padding:7px 14px;border-radius:var(--r-sm) var(--r-sm) 0 0;cursor:pointer;color:var(--ink3);border:1px solid transparent;transition:all .2s;background:transparent}
.ptab.active{background:var(--white);color:var(--teal);border-color:var(--border);border-bottom-color:var(--white)}
/* GMB PREVIEW */
.gmb-preview{padding:24px;display:none}
.gmb-preview.show{display:block}
.gmb-card{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:20px;max-width:360px}
.gmb-biz-name{font-family:'Bricolage Grotesque',sans-serif;font-size:20px;font-weight:700;margin-bottom:4px}
.gmb-cat{font-size:13px;color:var(--ink3);margin-bottom:10px}
.gmb-stars{color:var(--amber);font-size:16px;letter-spacing:2px;margin-bottom:10px}
.gmb-row{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:var(--ink2);margin-bottom:8px;line-height:1.4}
.gmb-icon{color:var(--ink3);flex-shrink:0;margin-top:1px}
.gmb-hours{background:var(--off);border-radius:6px;padding:10px 12px;font-size:13px;color:var(--ink2);margin-top:10px}
.gmb-btn{width:100%;margin-top:12px;background:var(--teal);color:#fff;border:none;border-radius:50px;padding:10px;font-size:13px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif}
/* WHATSAPP PREVIEW */
.wa-preview{padding:24px;display:none}
.wa-preview.show{display:block}
.wa-card{background:#E8F5E2;border-radius:var(--r);padding:20px;max-width:380px}
.wa-header{background:#075E54;color:#fff;border-radius:var(--r-sm) var(--r-sm) 0 0;padding:14px 16px;display:flex;align-items:center;gap:12px;margin:-20px -20px 16px}
.wa-avatar{width:40px;height:40px;border-radius:50%;background:#128C7E;display:flex;align-items:center;justify-content:center;font-family:'Bricolage Grotesque',sans-serif;font-weight:700;color:#fff;font-size:16px;flex-shrink:0}
.wa-biz-name{font-size:15px;font-weight:600}
.wa-status{font-size:11px;opacity:.7}
.wa-bubble{background:#fff;border-radius:0 12px 12px 12px;padding:12px 14px;font-size:13.5px;line-height:1.6;color:var(--ink);box-shadow:0 1px 2px rgba(0,0,0,.08);max-width:320px;margin-bottom:8px}
.wa-time{font-size:11px;color:var(--ink3);text-align:right;margin-top:4px}
/* COPY BTN */
.copy-section{padding:16px;border-top:1px solid var(--border);display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.copy-btn{display:flex;align-items:center;gap:6px;background:var(--teal);color:#fff;border:none;border-radius:50px;padding:9px 18px;font-size:13px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s}
.copy-btn:hover{background:var(--teal-d)}
.signup-btn{display:flex;align-items:center;gap:6px;background:var(--amber);color:var(--ink);border:none;border-radius:50px;padding:9px 18px;font-size:13px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s}
.signup-btn:hover{filter:brightness(.95)}
.activation-card{margin-top:18px;background:linear-gradient(135deg,#fff,#FEF4E6);border:1px solid #f1ddb7;border-radius:var(--r);padding:22px;display:none}
.activation-card.show{display:block;animation:fadeUp .4s ease}
.activation-card h3{font-family:'Bricolage Grotesque',sans-serif;font-size:22px;font-weight:800;margin-bottom:8px;line-height:1.2}
.activation-card p{font-size:14px;color:var(--ink2);line-height:1.65;margin-bottom:14px}
.activation-points{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px}
.activation-point{background:#fff;border:1px solid var(--border);border-radius:12px;padding:12px;font-size:13px;color:var(--ink2)}
.activation-actions{display:flex;gap:10px;flex-wrap:wrap}
.activate-btn{display:inline-flex;align-items:center;gap:6px;background:var(--teal);color:#fff;border:none;border-radius:50px;padding:12px 18px;font-size:14px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;text-decoration:none}
.activate-btn:hover{background:var(--teal-d)}
.plan-note{font-size:12px;color:var(--ink3)}
/* RESPONSIVE */
@media(max-width:860px){.page{grid-template-columns:1fr;gap:24px}.form-panel{position:static}}


/* ============================================================
   ENHANCED PREVIEW — makes the generated site look like a
   real, polished website instead of a flat form result.
   ============================================================ */

.site-preview {
  box-shadow: 0 30px 70px rgba(0,0,0,0.16);
  border: 1px solid #d8d6cf !important;
}

/* HERO — gradient, depth, decorative glow */
.site-hero {
  padding: 64px 36px 56px !important;
  background:
    radial-gradient(ellipse 70% 80% at 50% 0%, rgba(11,123,107,0.14) 0%, transparent 70%),
    radial-gradient(ellipse 50% 60% at 85% 100%, rgba(232,149,26,0.12) 0%, transparent 70%),
    linear-gradient(180deg, #ffffff 0%, #f7f6f2 100%) !important;
  border-bottom: 1px solid #ececec;
}
#site-badge {
  background: #fff !important;
  border: 1px solid rgba(11,123,107,0.25);
  box-shadow: 0 4px 14px rgba(11,123,107,0.10);
  letter-spacing: 0.3px;
}
.site-name {
  font-size: 38px !important;
  background: linear-gradient(135deg, #141414 0%, #0B7B6B 130%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.site-tagline { font-size: 16px !important; max-width: 440px !important; }
.site-btn {
  box-shadow: 0 8px 22px rgba(11,123,107,0.32);
  padding: 13px 28px !important;
  transition: transform .15s ease;
}
.site-btn:hover { transform: translateY(-2px); }
.site-btn-outline { background: #fff !important; }

/* SECTIONS — more breathing room, soft headings */
.site-section { padding: 44px 36px !important; }
.site-section-title {
  font-size: 22px !important;
  position: relative;
  display: inline-block;
  padding-bottom: 10px;
  margin-bottom: 22px !important;
}
.site-section-title::after {
  content: "";
  position: absolute;
  left: 0; bottom: 0;
  width: 38px; height: 3px;
  background: #E8951A;
  border-radius: 2px;
}

/* SERVICE CARDS — real cards: white, shadow, icon, hover lift */
.services-grid { gap: 16px !important; }
.svc-card {
  background: #fff !important;
  border: 1px solid #ececec;
  border-radius: 14px !important;
  padding: 22px 20px !important;
  box-shadow: 0 6px 18px rgba(0,0,0,0.05);
  transition: transform .16s ease, box-shadow .16s ease;
  position: relative;
}
.svc-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 30px rgba(0,0,0,0.10);
}
.svc-card::before {
  content: "";
  display: block;
  width: 38px; height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(11,123,107,0.14), rgba(11,123,107,0.06));
  margin-bottom: 12px;
}
.svc-name { font-size: 15px !important; }
.svc-desc { font-size: 12.5px !important; }
.svc-price {
  display: inline-block;
  margin-top: 10px !important;
  background: rgba(11,123,107,0.08);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px !important;
}

/* ABOUT — softer block */
.about-text {
  font-size: 14.5px !important;
  background: #fff;
  border-radius: 12px;
  padding: 20px 22px;
  border: 1px solid #e6f0ee;
}

/* CONTACT rows — cleaner */
.contact-row {
  background: #fff;
  border: 1px solid #ececec;
  border-radius: 10px;
  padding: 11px 14px;
  margin-bottom: 8px;
  display: flex; align-items: center; gap: 10px;
  font-size: 13.5px;
}

/* FOOTER — richer */
.site-footer {
  background: linear-gradient(135deg, #141414, #213631) !important;
  color: #fff;
  padding: 32px !important;
  text-align: center;
}
.site-footer-name {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 20px; font-weight: 800; color: #fff;
}
.site-footer-tag { color: rgba(255,255,255,0.6); font-size: 13px; margin-top: 4px; }

@media (max-width: 560px) {
  .site-hero { padding: 44px 22px 38px !important; }
  .site-name { font-size: 28px !important; }
  .site-section { padding: 32px 22px !important; }
  .services-grid { grid-template-columns: 1fr !important; }
}


/* ============================================================
   CATEGORY THEMES — preview re-themes itself by data-cat.
   Each category gets its own accent colour & hero mood.
   ============================================================ */

/* default accent vars on the preview */
#preview-state { --acc: #0B7B6B; --acc-soft: rgba(11,123,107,0.12); }

/* --- per category accent --- */
#preview-state[data-cat="clinic"]     { --acc:#0B7B6B; --acc-soft:rgba(11,123,107,0.12); }
#preview-state[data-cat="dental"]     { --acc:#0E8AA8; --acc-soft:rgba(14,138,168,0.12); }
#preview-state[data-cat="tutor"]      { --acc:#2563EB; --acc-soft:rgba(37,99,235,0.12); }
#preview-state[data-cat="salon"]      { --acc:#C2185B; --acc-soft:rgba(194,24,91,0.12); }
#preview-state[data-cat="ca"]         { --acc:#1E3A5F; --acc-soft:rgba(30,58,95,0.12); }
#preview-state[data-cat="gym"]        { --acc:#E8951A; --acc-soft:rgba(232,149,26,0.14); }
#preview-state[data-cat="restaurant"] { --acc:#C0392B; --acc-soft:rgba(192,57,43,0.12); }
#preview-state[data-cat="boutique"]   { --acc:#7B2D8E; --acc-soft:rgba(123,45,142,0.12); }
#preview-state[data-cat="pharmacy"]   { --acc:#159957; --acc-soft:rgba(21,153,87,0.12); }
#preview-state[data-cat="lawyer"]     { --acc:#3E2723; --acc-soft:rgba(62,39,35,0.12); }
#preview-state[data-cat="mechanic"]   { --acc:#37474F; --acc-soft:rgba(55,71,79,0.12); }
#preview-state[data-cat="other"]      { --acc:#0B7B6B; --acc-soft:rgba(11,123,107,0.12); }

/* hero glow uses the accent */
#preview-state[data-cat] .site-hero {
  background:
    radial-gradient(ellipse 70% 80% at 50% 0%, var(--acc-soft) 0%, transparent 70%),
    radial-gradient(ellipse 50% 60% at 85% 100%, var(--acc-soft) 0%, transparent 70%),
    linear-gradient(180deg, #ffffff 0%, #f7f6f2 100%) !important;
}
/* badge + name gradient + underline + price chip + icon all follow accent */
#preview-state[data-cat] #site-badge {
  color: var(--acc) !important;
  border-color: var(--acc) !important;
}
#preview-state[data-cat] .site-name {
  background: linear-gradient(135deg, #141414 0%, var(--acc) 130%);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}
#preview-state[data-cat] .site-section-title::after { background: var(--acc); }
#preview-state[data-cat] .svc-card::before {
  background: linear-gradient(135deg, var(--acc-soft), var(--acc-soft));
}
#preview-state[data-cat] .svc-price {
  color: var(--acc) !important;
  background: var(--acc-soft);
}
#preview-state[data-cat] .site-btn {
  background: var(--acc) !important;
  box-shadow: 0 8px 22px var(--acc-soft);
}
#preview-state[data-cat] .about-text { border-color: var(--acc-soft); }
#preview-state[data-cat] .site-footer {
  background: linear-gradient(135deg, #141414, var(--acc)) !important;
}

/* category-specific hero button label (swaps the "Book appointment" text) */
#preview-state[data-cat] .site-btn { font-size: 0 !important; }
#preview-state[data-cat] .site-btn::after { font-size: 14px; }
#preview-state[data-cat="clinic"]     .site-btn::after { content: "Book Appointment"; }
#preview-state[data-cat="dental"]     .site-btn::after { content: "Book Appointment"; }
#preview-state[data-cat="tutor"]      .site-btn::after { content: "Enquire Now"; }
#preview-state[data-cat="salon"]      .site-btn::after { content: "Book a Slot"; }
#preview-state[data-cat="ca"]         .site-btn::after { content: "Get a Consultation"; }
#preview-state[data-cat="gym"]        .site-btn::after { content: "Start Free Trial"; }
#preview-state[data-cat="restaurant"] .site-btn::after { content: "See Menu"; }
#preview-state[data-cat="boutique"]   .site-btn::after { content: "Visit Store"; }
#preview-state[data-cat="pharmacy"]   .site-btn::after { content: "Order on WhatsApp"; }
#preview-state[data-cat="lawyer"]     .site-btn::after { content: "Book Consultation"; }
#preview-state[data-cat="mechanic"]   .site-btn::after { content: "Book a Service"; }
#preview-state[data-cat="other"]      .site-btn::after { content: "Contact Us"; }

/* keep the outline button's label intact (only style the solid one above) */
#preview-state[data-cat] .site-btn-outline { font-size: 14px !important; }
`;

const DEMO_JS = `
let generatedData = null;

const categoryMeta = {
  clinic: {
    label: 'Medical Clinic',
    badge: city => \`Trusted Clinic in \${city}\`,
    tagline: city => \`Professional consultation and patient-friendly care for families in \${city}.\`,
    hours: 'Mon-Sat: 9:00 AM - 7:00 PM\\nSunday: By appointment',
    services: [
      ['General Consultation', 'Professional consultation for day-to-day health concerns.', 'Call for pricing'],
      ['Fever and Cold Care', 'Quick support for common illness and seasonal symptoms.', 'Call for pricing'],
      ['Health Checkup', 'Basic health guidance and routine checkup support.', 'Call for pricing'],
      ['Follow-up Visit', 'Easy follow-up care for returning patients.', 'Call for pricing']
    ],
    waServices: ['General Consultation', 'Fever and Cold Care', 'Health Checkup', 'Follow-up Visit', 'Appointment Support']
  },
  dental: {
    label: 'Dental Clinic',
    badge: city => \`Trusted Dental Care in \${city}\`,
    tagline: city => \`Gentle dental care, clean treatment, and easy appointment support in \${city}.\`,
    hours: 'Mon-Sat: 10:00 AM - 8:00 PM\\nSunday: Closed',
    services: [
      ['Dental Consultation', 'Clear guidance for dental issues and oral care needs.', 'Call for pricing'],
      ['Tooth Cleaning', 'Routine cleaning and preventive dental care support.', 'Call for pricing'],
      ['Root Canal Support', 'Comfort-focused treatment planning and follow-up.', 'Call for pricing'],
      ['Smile and Filling Care', 'Basic restorative and smile improvement services.', 'Call for pricing']
    ],
    waServices: ['Dental Consultation', 'Tooth Cleaning', 'Root Canal Support', 'Smile Care', 'Appointment Booking']
  },
  tutor: {
    label: 'Coaching Center',
    badge: city => \`Trusted Coaching in \${city}\`,
    tagline: city => \`Better learning, stronger basics, and confident student progress in \${city}.\`,
    hours: 'Mon-Sat: 8:00 AM - 8:00 PM\\nSunday: Limited batches',
    services: [
      ['School Tuition', 'Clear teaching support for school subjects and revision.', 'Call for pricing'],
      ['Exam Preparation', 'Structured guidance for boards and competitive exams.', 'Call for pricing'],
      ['Small Batch Learning', 'Focused attention in smaller student groups.', 'Call for pricing'],
      ['Doubt Clearing', 'Regular practice and concept strengthening support.', 'Call for pricing']
    ],
    waServices: ['School Tuition', 'Exam Preparation', 'Small Batches', 'Doubt Sessions', 'Admission Enquiry']
  },
  salon: {
    label: 'Salon & Beauty Studio',
    badge: city => \`Professional Salon in \${city}\`,
    tagline: city => \`Beauty, grooming, and self-care services that help you look and feel your best.\`,
    hours: 'Mon-Sat: 10:00 AM - 8:00 PM\\nSunday: By appointment',
    services: [
      ['Haircut and Styling', 'Fresh cuts and styling support for everyday and special looks.', 'Call for pricing'],
      ['Facial and Skin Care', 'Skin care services for regular beauty and glow support.', 'Call for pricing'],
      ['Bridal and Event Makeup', 'Makeup services for special days and celebrations.', 'Call for pricing'],
      ['Hair Treatment', 'Support for common hair care and treatment needs.', 'Call for pricing']
    ],
    waServices: ['Haircut and Styling', 'Facial and Skin Care', 'Bridal Makeup', 'Hair Treatment', 'Appointment Booking']
  },
  ca: {
    label: 'CA Firm',
    badge: city => \`Trusted CA Firm in \${city}\`,
    tagline: city => \`Simple tax, GST, and compliance support for individuals and businesses in \${city}.\`,
    hours: 'Mon-Sat: 10:00 AM - 7:00 PM\\nSunday: Closed',
    services: [
      ['Income Tax Filing', 'Reliable ITR support for individuals and business owners.', 'Call for pricing'],
      ['GST Support', 'Registration, return filing, and practical GST help.', 'Call for pricing'],
      ['Business Compliance', 'Clear support for recurring filing and compliance needs.', 'Call for pricing'],
      ['Bookkeeping Assistance', 'Basic financial organization support for MSMEs.', 'Call for pricing']
    ],
    waServices: ['Income Tax Filing', 'GST Support', 'Business Compliance', 'Bookkeeping Help', 'Consultation Request']
  },
  gym: {
    label: 'Gym & Fitness',
    badge: city => \`Fitness Support in \${city}\`,
    tagline: city => \`A motivating fitness space for strength, stamina, and better daily routine.\`,
    hours: 'Mon-Sat: 6:00 AM - 10:00 PM\\nSunday: 7:00 AM - 1:00 PM',
    services: [
      ['General Fitness Training', 'Workout support for everyday fitness and consistency.', 'Call for pricing'],
      ['Weight Loss Support', 'Structured fitness guidance for better routine and results.', 'Call for pricing'],
      ['Strength Training', 'Focused support for strength and stamina building.', 'Call for pricing'],
      ['Personal Training', 'One-to-one support for specific fitness goals.', 'Call for pricing']
    ],
    waServices: ['General Fitness', 'Weight Loss Support', 'Strength Training', 'Personal Training', 'Membership Enquiry']
  },
  restaurant: {
    label: 'Restaurant',
    badge: city => \`Popular Restaurant in \${city}\`,
    tagline: city => \`Fresh food, easy ordering, and a better dining presence for local customers.\`,
    hours: 'Daily: 11:00 AM - 11:00 PM',
    services: [
      ['Dine-in Experience', 'Comfortable dining with quality food and service.', 'Call for pricing'],
      ['Takeaway Orders', 'Quick takeaway support for busy customers.', 'Call for pricing'],
      ['Family Meals', 'Meal options for families and groups.', 'Call for pricing'],
      ['Special Menu Items', 'Category-specific food highlights and chef specials.', 'Call for pricing']
    ],
    waServices: ['Dine-in', 'Takeaway', 'Special Menu', 'Table Booking', 'Order Enquiry']
  },
  boutique: {
    label: 'Boutique',
    badge: city => \`Fashion Boutique in \${city}\`,
    tagline: city => \`Curated fashion, easy WhatsApp support, and a more polished local brand presence.\`,
    hours: 'Mon-Sat: 11:00 AM - 8:00 PM\\nSunday: Closed',
    services: [
      ['Ethnic Wear', 'Curated traditional and festive outfit collections.', 'Call for pricing'],
      ['Casual and Occasion Wear', 'Fashion pieces for everyday and special events.', 'Call for pricing'],
      ['Personal Styling Help', 'Friendly support for choosing the right look.', 'Call for pricing'],
      ['New Arrivals', 'Fresh collection highlights and seasonal fashion updates.', 'Call for pricing']
    ],
    waServices: ['Ethnic Wear', 'Occasion Wear', 'Styling Help', 'New Arrivals', 'Collection Enquiry']
  },
  pharmacy: {
    label: 'Medical Store',
    badge: city => \`Trusted Medical Store in \${city}\`,
    tagline: city => \`Easy medicine availability checks and dependable local support in \${city}.\`,
    hours: 'Daily: 8:00 AM - 10:00 PM',
    services: [
      ['Medicine Availability', 'Support for common prescription and OTC medicine needs.', 'Call for pricing'],
      ['Health Essentials', 'Daily-use wellness and care products.', 'Call for pricing'],
      ['Prescription Support', 'Quick response for basic prescription queries.', 'Call for pricing'],
      ['Home Delivery Enquiry', 'Delivery support availability based on location.', 'Call for pricing']
    ],
    waServices: ['Medicine Availability', 'Health Essentials', 'Prescription Support', 'Delivery Enquiry', 'Store Contact']
  },
  lawyer: {
    label: 'Law Firm',
    badge: city => \`Trusted Legal Support in \${city}\`,
    tagline: city => \`Professional legal guidance and client support in a clear and reliable format.\`,
    hours: 'Mon-Sat: 10:00 AM - 7:00 PM\\nSunday: By appointment',
    services: [
      ['Legal Consultation', 'Initial consultation for common legal concerns.', 'Call for pricing'],
      ['Documentation Support', 'Help with basic legal document and notice needs.', 'Call for pricing'],
      ['Property and Civil Matters', 'Guidance for local dispute and property-related issues.', 'Call for pricing'],
      ['Client Follow-up', 'Reliable communication for ongoing legal support.', 'Call for pricing']
    ],
    waServices: ['Legal Consultation', 'Documentation Support', 'Property Matters', 'Civil Support', 'Appointment Request']
  },
  mechanic: {
    label: 'Auto Garage',
    badge: city => \`Trusted Auto Service in \${city}\`,
    tagline: city => \`Reliable vehicle service and repair support for local customers in \${city}.\`,
    hours: 'Mon-Sat: 9:00 AM - 8:00 PM\\nSunday: Closed',
    services: [
      ['Vehicle Inspection', 'Quick inspection and issue identification support.', 'Call for pricing'],
      ['Repair and Maintenance', 'Routine repair and maintenance service guidance.', 'Call for pricing'],
      ['Oil and Service Check', 'Basic service support for smoother performance.', 'Call for pricing'],
      ['Emergency Assistance', 'Fast response for urgent vehicle support requests.', 'Call for pricing']
    ],
    waServices: ['Vehicle Inspection', 'Repair Support', 'Service Check', 'Emergency Help', 'Garage Contact']
  },
  other: {
    label: 'Business',
    badge: city => \`Trusted Business in \${city}\`,
    tagline: city => \`A simple and professional digital presence that helps customers discover and contact your business.\`,
    hours: 'Mon-Sat: 10:00 AM - 7:00 PM\\nSunday: By appointment',
    services: [
      ['Core Service', 'A clear service block for your main offer.', 'Call for pricing'],
      ['Customer Support', 'Simple customer assistance and enquiry flow.', 'Call for pricing'],
      ['Special Service', 'Highlight an important value-added service.', 'Call for pricing'],
      ['Follow-up Help', 'Support that helps customers stay engaged.', 'Call for pricing']
    ],
    waServices: ['Core Service', 'Customer Support', 'Special Service', 'Follow-up Help', 'Business Enquiry']
  }
};

function showTab(tab, el) {
  document.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('tab-website').style.display = tab === 'website' ? 'block' : 'none';
  document.getElementById('tab-gmb').classList.toggle('show', tab === 'gmb');
  document.getElementById('tab-whatsapp').classList.toggle('show', tab === 'whatsapp');
}

function stepProgress(step) {
  const steps = ['ls1','ls2','ls3','ls4'];
  steps.forEach((id, i) => {
    const el = document.getElementById(id);
    el.classList.remove('active','done');
    if (i < step) el.classList.add('done');
    else if (i === step) el.classList.add('active');
  });
}

function capitalizeText(text) {
  return (text || '').replace(/\\s+/g, ' ').trim();
}

function buildGeneratedContent({ name, cat, city, phone, about }) {
  const meta = categoryMeta[cat] || categoryMeta.other;
  const aboutLead = about ? \`\${capitalizeText(about)}. \` : '';
  const services = meta.services.map(([serviceName, desc, price]) => ({ name: serviceName, desc, price }));
  return {
    badge: meta.badge(city),
    tagline: meta.tagline(city),
    services,
    about: \`\${aboutLead}\${name} is a trusted \${meta.label.toLowerCase()} serving people in \${city}. The business is presented online in a professional and approachable way so customers can understand the services clearly and contact the team without confusion. This preview shows how a stronger digital presence can make the business look more credible and easier to choose.\`,
    hours: meta.hours,
    gmbDescription: \`\${name} is a trusted \${meta.label.toLowerCase()} in \${city}. Customers can quickly understand the services, location, and contact details, making it easier to discover and reach the business online.\`,
    whatsappMessage: \`🙏 Namaskar! Welcome to \${name}.\\n\\nThank you for contacting us. We are happy to help you with your enquiry.\\n\\n\${phone ? \`You can also call us on \${phone}.\` : 'Please share your requirement and we will get back to you shortly.'}\`,
    waServices: meta.waServices
  };
}

async function generate() {
  const name = document.getElementById('f-name').value.trim();
  const cat = document.getElementById('f-category').value;
  const city = document.getElementById('f-city').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const about = document.getElementById('f-about').value.trim();

  if (!name || !cat || !city) {
    alert('Please fill in business name, type, and city.');
    return;
  }

  const btn = document.getElementById('gen-btn');
  btn.disabled = true;
  btn.textContent = 'Generating...';
  document.getElementById('empty-state').style.display = 'none';
  document.getElementById('preview-state').classList.remove('show');
  document.getElementById('loading-state').classList.add('show');

  const catLabel = (categoryMeta[cat] || categoryMeta.other).label;

  // Apply the category theme to the preview (re-themes hero, buttons, accents).
  document.getElementById('preview-state').setAttribute('data-cat', cat || 'other');

  let step = 0;
  const stepTimer = setInterval(() => {
    if (step < 3) {
      step++;
      stepProgress(step);
    }
  }, 900);

  try {
    await new Promise(resolve => setTimeout(resolve, 2400));
    const result = buildGeneratedContent({ name, cat, city, phone, about });
    clearInterval(stepTimer);
    stepProgress(4);
    generatedData = { name, catLabel, city, phone, result };
    setTimeout(() => renderPreview(name, catLabel, city, phone, result), 400);
  } catch (err) {
    clearInterval(stepTimer);
    console.error(err);
    const fallback = buildGeneratedContent({ name, cat, city, phone, about });
    generatedData = { name, catLabel, city, phone, result: fallback };
    renderPreview(name, catLabel, city, phone, fallback);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Regenerate →';
  }
}

function renderPreview(name, catLabel, city, phone, d) {
  document.getElementById('loading-state').classList.remove('show');

  // URL
  const slug = name.toLowerCase().replace(/\\s+/g, '').replace(/[^a-z0-9]/g, '');
  document.getElementById('url-bar').textContent = slug + '.dikhao.in';

  // Website
  document.getElementById('site-badge').textContent = d.badge;
  document.getElementById('site-name').textContent = name;
  document.getElementById('site-tagline').textContent = d.tagline;
  document.getElementById('about-text').textContent = d.about;
  document.getElementById('footer-name').textContent = name;

  // Services
  const sg = document.getElementById('services-grid');
  sg.innerHTML = '';
  (d.services || []).forEach(s => {
    sg.innerHTML += \`<div class="svc-card"><div class="svc-name">\${s.name}</div><div class="svc-desc">\${s.desc}</div><div class="svc-price">\${s.price}</div></div>\`;
  });

  // Contact
  const ci = document.getElementById('contact-info');
  ci.innerHTML = '';
  if (phone) ci.innerHTML += \`<div class="contact-row"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.98 1.18 2 2 0 012.96 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>\${phone}</div>\`;
  ci.innerHTML += \`<div class="contact-row"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>\${city}, India</div>\`;
  ci.innerHTML += \`<div class="contact-row"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>\${d.hours.replace('\\n','<br>')}</div>\`;

  // GMB
  document.getElementById('gmb-name').textContent = name;
  document.getElementById('gmb-cat').textContent = catLabel + ' · ' + city;
  document.getElementById('gmb-address').textContent = city + ', India';
  document.getElementById('gmb-phone').textContent = phone || 'Add phone number';
  document.getElementById('gmb-website').textContent = slug + '.dikhao.in';
  document.getElementById('gmb-hours').innerHTML = \`<strong>Hours:</strong> \${d.hours.replace('\\n','<br>')}\`;
  document.getElementById('gmb-desc').textContent = d.gmbDescription;

  // WhatsApp
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  document.getElementById('wa-avatar').textContent = initials;
  document.getElementById('wa-biz-name').textContent = name;
  document.getElementById('wa-message').innerHTML = d.whatsappMessage.replace(/\\n/g, '<br>');
  const ws = document.getElementById('wa-services');
  ws.innerHTML = (d.waServices || []).map(s => \`✓ \${s}\`).join('<br>');

  // Show
  document.getElementById('preview-state').classList.add('show');
  document.getElementById('tab-website').style.display = 'block';
  document.getElementById('tab-gmb').classList.remove('show');
  document.getElementById('tab-whatsapp').classList.remove('show');
  document.querySelectorAll('.ptab').forEach((t, i) => t.classList.toggle('active', i === 0));

  const msg = encodeURIComponent(\`Hi, I generated a Dikhao preview for \${name} in \${city}. I want to activate this website. Category: \${catLabel}.\`);
  document.getElementById('activate-whatsapp').href = \`https://wa.me/919504404077?text=\${msg}\`;
  document.getElementById('activation-card').classList.add('show');
}

function openActivation() {
  const card = document.getElementById('activation-card');
  card.classList.add('show');
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function copyDetails() {
  if (!generatedData) return;
  const { name, catLabel, city, phone, result: d } = generatedData;
  const slug = name.toLowerCase().replace(/\\s+/g, '').replace(/[^a-z0-9]/g, '');
  const text = \`DIKHAO — DIGITAL PRESENCE PREVIEW\\n\\nBusiness: \${name}\\nType: \${catLabel}\\nCity: \${city}\\nWebsite: \${slug}.dikhao.in\\n\\nTAGLINE:\\n\${d.tagline}\\n\\nABOUT:\\n\${d.about}\\n\\nGOOGLE LISTING DESCRIPTION:\\n\${d.gmbDescription}\\n\\nWHATSAPP AUTO-REPLY:\\n\${d.whatsappMessage}\\n\\nSERVICES:\\n\${(d.services||[]).map(s=>\`• \${s.name} — \${s.price}\`).join('\\n')}\`;
  navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard!')).catch(() => alert('Copy failed — please select and copy manually.'));
}
`;

export default function DemoClient() {
  const mountRef = useRef(false);

  useEffect(() => {
    if (mountRef.current) return;
    mountRef.current = true;
    // Run the original demo script once, after the markup is in the DOM.
    const s = document.createElement("script");
    s.textContent = DEMO_JS;
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: DEMO_CSS }} />
      <div dangerouslySetInnerHTML={{ __html: DEMO_HTML }} />
    </>
  );
}

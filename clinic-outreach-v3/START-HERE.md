# Dikhao — Full App (Website + Working CRM)

## Public pages (login nahi chahiye)
- /          Homepage
- /demo      Demo page
- /pricing   Pricing
- /partners  CA Partner Program
- /privacy   Privacy Policy
- /terms     Terms of Service

## Private (login zaroori)
- /login     Team login
- /dashboard CRM

## Chalao
   npm install
   npm run dev
   http://localhost:3000

## CRM ab kya karta hai (/dashboard)
1. Lead finder — city + category daal kar clinics dhoondho (Apify)
2. Har lead ki row mein:
   - STATUS dropdown — New / Ready / Sent / Follow-up / Interested /
     Converted / Not interested. Badalte hi Supabase mein save.
   - WhatsApp button — seedha us clinic ke number pe WhatsApp khole,
     message pehle se bhara hua.
   - Details button — kholo to: follow-up date, notes, aur editable
     WhatsApp message draft. Edit karke bahar click karo -> save.
3. Filter — status ke hisaab se leads chhaanto.
4. Stats upar — Fresh / Ready / Follow-ups today / Interested.

## Workflow
Find leads -> har clinic ka WhatsApp message dekho/edit karo ->
WhatsApp button dabao -> message bhejo -> status "Sent" karo ->
reply aaye to "Interested", follow-up date set karo. Sab track hota hai.

## .env.local (sirf CRM ke liye) — 6 vars
   LOGIN_PASSCODE, SESSION_SECRET, APIFY_TOKEN,
   NEXT_PUBLIC_SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY

## Launch se pehle
Privacy/Terms ke placeholder bharo: legal entity name, support email,
refund terms. Razorpay/Google approval ke liye zaroori.

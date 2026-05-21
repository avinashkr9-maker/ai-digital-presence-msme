# Dikhao Outreach CRM V2 Setup

This is the cleaner internal software version.

## What it improves
- shared lead database instead of browser-only data
- cleaner lead detail view
- quick status changes
- notes history per lead
- one-click WhatsApp open
- CSV import and export

## Files
- `clinic-outreach-v2.html`
- `supabase-schema.sql`
- `supabase-config.example.js`

## Setup in 10 minutes

### 1. Create Supabase project
- Go to Supabase
- Create a new project
- Wait until it is ready

### 2. Run SQL schema
- Open SQL Editor
- Paste `supabase-schema.sql`
- Run it

This creates:
- `crm_leads`
- `crm_lead_activities`

### 3. Get project credentials
From Supabase project settings copy:
- anon public key

The project URL is already prefilled in the app:
- `https://hawdlljwbjgdnjlqniqn.supabase.co`

### 4. Best setup method: local private config file
- Copy `supabase-config.example.js`
- Rename it to `supabase-config.local.js`
- Paste your anon key there
- Keep workspace slug as `dikhao-clinics`
- Open `clinic-outreach-v2.html` in browser

### 5. Fallback manual method
- Open `clinic-outreach-v2.html` in browser
- Click `Supabase setup`
- Paste the anon key
- keep the prefilled project URL unless you want to switch projects
- Keep workspace slug as `dikhao-clinics` unless you want separate workspaces
- Click `Save and connect`

### 6. Start using
- import CSV leads
- or add leads manually
- click a lead name to open detail panel
- change statuses inline
- copy outreach or follow-up messages
- open WhatsApp directly
- save notes in the activity timeline

## Recommended first workflow
- start with Gurugram clinics
- import 20 to 30 leads first
- work from `Outreach Queue`
- check `Follow-ups Today` daily
- mark `Interested`, `Demo Requested`, or `Converted` as replies come in

## Hosting
This file is static HTML, so you can host it on:
- GitHub Pages
- Netlify
- Vercel static
- any simple hosting

## Important note
Current SQL policy is wide open for anon access because this is an internal MVP for speed.
That is okay for fast internal testing, but for proper production you should later add auth and tighter RLS.

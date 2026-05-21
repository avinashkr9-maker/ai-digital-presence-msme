# Dikhao Outreach CRM V2 Setup

This is the cleaner internal software version.

## What it improves
- shared lead database instead of browser-only data
- cleaner lead detail view
- quick status changes
- notes history per lead
- one-click WhatsApp open
- Apify-based auto lead finder
- CSV import and export

## Files
- `clinic-outreach-v2.html`
- `supabase-schema.sql`
- `supabase-config.example.js`
- `backend/server.js`
- `backend/.env.example`

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
From Apify copy:
- Apify API token

The project URL is already prefilled in the app:
- `https://hawdlljwbjgdnjlqniqn.supabase.co`

The Supabase anon key is already baked into this workspace build.

### 4. Best setup method: private backend for Apify
- Open `backend/.env.example`
- copy it to `backend/.env`
- paste your Apify API token there
- in `backend/`, run `npm install`
- then run `npm start`
- keep that backend running on `http://localhost:8787`
- open `clinic-outreach-v2.html` in browser

### 5. Workspace settings
- Open `clinic-outreach-v2.html` in browser
- Supabase URL and anon key are already baked in
- keep workspace slug as `dikhao-clinics` unless you want separate workspaces
- use the settings modal only if you want to change the workspace

### 6. Start using
- use the lead finder with place + business type to pull leads automatically through the private backend
- or import CSV leads
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

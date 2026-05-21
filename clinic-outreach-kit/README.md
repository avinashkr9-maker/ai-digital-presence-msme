# Clinic Outreach Kit

This folder now has both the simple V1 local tool and the better V2 shared CRM direction.

## Files
- `clinic-outreach-app.html` -> V1 local browser-only outreach software
- `clinic-outreach-v2.html` -> V2 shared CRM-ready internal software
- `supabase-schema.sql` -> database schema for V2
- `supabase-config.example.js` -> private config template for easiest setup
- `V2-SETUP.md` -> V2 setup guide
- `CLINIC-OUTREACH-APPS-SCRIPT.js` -> Google Sheets version if needed later
- `CLINIC-OUTREACH-SHEET-SETUP.md` -> setup guide for sheet workflow
- `clinic-raw-leads-template.csv` -> sample import template

## Fastest use
### If you want simplest local version
1. Open `clinic-outreach-app.html`
2. Click `Load sample lead`
3. Import your CSV
4. Work from `Outreach Queue`

### If you want the better real internal software
1. Create Supabase project
2. Run `supabase-schema.sql`
3. Open `clinic-outreach-v2.html`
4. Copy `supabase-config.example.js` to `supabase-config.local.js`
5. Add the anon key and Google Places API key there
6. Open the app and use the lead finder or import CSV
7. Start managing leads

## Why V2 is better
- shared database instead of one browser only
- lead detail panel
- notes and activity history
- better status workflow
- direct WhatsApp open links
- built-in lead finder from place + business type
- still static and easy to host

## Best for now
Use `clinic-outreach-v2.html` as the main direction.

## Important note
V1 is local-storage only.
V2 is the better internal CRM path and should be hosted after Supabase setup.

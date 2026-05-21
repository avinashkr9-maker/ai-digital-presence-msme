# Clinic Outreach Kit

This folder now has both the simple V1 local tool and the better V2 shared CRM direction.

## Files
- `clinic-outreach-app.html` -> V1 local browser-only outreach software
- `clinic-outreach-v2.html` -> V2 shared CRM-ready internal software
- `supabase-schema.sql` -> database schema for V2
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
4. Add Supabase URL + anon key
5. Start importing and managing leads

## Why V2 is better
- shared database instead of one browser only
- lead detail panel
- notes and activity history
- better status workflow
- direct WhatsApp open links
- still static and easy to host

## Best for now
Use `clinic-outreach-v2.html` as the main direction.

## Important note
V1 is local-storage only.
V2 is the better internal CRM path and should be hosted after Supabase setup.

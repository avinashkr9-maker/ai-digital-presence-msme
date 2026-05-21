# Clinic Outreach Kit

This folder now has a simple internal web app so you do not need to manage everything in Google Sheets.

## Files
- `clinic-outreach-app.html` -> internal outreach software
- `CLINIC-OUTREACH-APPS-SCRIPT.js` -> Google Sheets version if needed later
- `CLINIC-OUTREACH-SHEET-SETUP.md` -> setup guide for sheet workflow
- `clinic-raw-leads-template.csv` -> sample import template

## Fastest use
1. Open `clinic-outreach-app.html`
2. Click `Load sample lead` to test
3. Import your CSV from Apify or paste CSV text
4. Use `Outreach Queue` to work leads
5. Use `Follow-ups Today` every day
6. Export CSV anytime for backup

## What the app does
- stores leads in browser local storage
- auto-scores leads
- shows outreach-ready queue
- tracks sent status
- calculates follow-up dates
- shows due follow-ups
- tracks converted leads

## Best for v1
Use Chrome on laptop/desktop.

## Important note
Data is saved locally in the same browser. If you switch browsers or clear browser storage, the data will be gone unless you export CSV.

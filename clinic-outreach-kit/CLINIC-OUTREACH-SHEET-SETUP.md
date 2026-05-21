# Dikhao Clinic Outreach — Phase 1 Setup

This is the fastest working setup for Gurugram clinic outreach.

## What this gives you
- Raw clinic leads drop into one sheet
- Every lead gets auto-scored
- Outreach-ready clinics appear in a queue
- Follow-ups due today appear in a separate tab
- Converted leads can be moved into their own tab

## Tabs created automatically
1. Raw Leads
2. Scored Leads
3. Outreach Queue
4. Follow-up Today
5. Converted Leads

## Raw Leads columns
Use these exact columns:
- Lead ID
- Business Name
- Category
- Address
- Phone
- Website
- Maps URL
- Rating
- Reviews Count
- City
- Locality
- Source
- Standalone Flag
- Simple Offer Flag
- Notes
- Imported At

## What to put in the two manual flags
### Standalone Flag
Use `Yes` if it looks like an independent clinic and not a major hospital chain.

### Simple Offer Flag
Use `Yes` if the clinic offer is straightforward enough to explain in one line, for example:
- Dental clinic
- Skin clinic
- Eye clinic
- General physician clinic
- Physiotherapy clinic

## Scoring logic
Each lead gets 1 point for:
- phone exists
- no website
- category contains clinic
- standalone flag is yes
- simple offer flag is yes

## Priority bands
- 5 = Hot
- 4 = High
- 3 = Medium
- 0 to 2 = Low

## Outreach-ready rule
A lead becomes `Ready for Outreach = YES` when:
- it has a phone number
- category is clinic
- total score is 3 or higher

## Outreach Queue columns
- Lead ID
- Business Name
- Phone
- Locality
- Priority
- First Message Draft
- Status
- First Sent Date
- Follow-up 1 Date
- Follow-up 2 Date
- Last Updated
- Notes

## Recommended status values
Use these exact values where possible:
- Ready
- Sent
- Follow-up 1 Sent
- Follow-up 2 Sent
- Replied
- Interested
- Demo Requested
- Converted
- Not Interested
- Do Not Contact

## Follow-up timing
- Follow-up 1 = 2 days after first sent date
- Follow-up 2 = 5 days after first sent date

## Human workflow
1. Paste Apify leads into `Raw Leads`
2. Set `Standalone Flag` and `Simple Offer Flag`
3. Run `Dikhao Outreach -> Refresh scoring + queues`
4. Open `Outreach Queue`
5. Copy message and send manually on WhatsApp
6. Update `Status`
7. Add `First Sent Date` when first message is sent
8. Open `Follow-up Today` every day and clear due follow-ups

## Best starting filter
Start with:
- City = Gurugram
- Priority = Hot or High
- Website blank

## Apps Script install
1. Open a new Google Sheet
2. Extensions -> Apps Script
3. Paste everything from `CLINIC-OUTREACH-APPS-SCRIPT.js`
4. Save
5. Reload the Google Sheet
6. Click `Dikhao Outreach -> Setup sheets`
7. Paste/import your lead data into `Raw Leads`
8. Click `Dikhao Outreach -> Refresh scoring + queues`

## Apify import recommendation
For now keep it simple:
- export Apify results as CSV
- paste or import into `Raw Leads`
- map city to `Gurugram` where relevant
- if website is missing, leave it blank

## Important note
The script preserves outreach statuses and sent dates when you refresh, so you can keep rescoring as new raw leads come in.

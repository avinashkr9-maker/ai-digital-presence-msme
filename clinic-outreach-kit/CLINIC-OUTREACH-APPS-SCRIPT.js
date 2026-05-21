const SHEET_NAMES = {
  raw: 'Raw Leads',
  scored: 'Scored Leads',
  outreach: 'Outreach Queue',
  followUp: 'Follow-up Today',
  converted: 'Converted Leads'
};

const RAW_HEADERS = [
  'Lead ID',
  'Business Name',
  'Category',
  'Address',
  'Phone',
  'Website',
  'Maps URL',
  'Rating',
  'Reviews Count',
  'City',
  'Locality',
  'Source',
  'Standalone Flag',
  'Simple Offer Flag',
  'Notes',
  'Imported At'
];

const SCORED_HEADERS = [
  ...RAW_HEADERS,
  'Phone Score',
  'No Website Score',
  'Clinic Score',
  'Standalone Score',
  'Simple Offer Score',
  'Priority Score',
  'Priority Band',
  'Ready for Outreach',
  'Scored At'
];

const OUTREACH_HEADERS = [
  'Lead ID',
  'Business Name',
  'Phone',
  'Locality',
  'Priority',
  'First Message Draft',
  'Status',
  'First Sent Date',
  'Follow-up 1 Date',
  'Follow-up 2 Date',
  'Last Updated',
  'Notes'
];

const FOLLOW_UP_HEADERS = [
  'Lead ID',
  'Business Name',
  'Phone',
  'Locality',
  'Priority',
  'Status',
  'Due Follow-up',
  'Suggested Message',
  'First Sent Date',
  'Follow-up 1 Date',
  'Follow-up 2 Date',
  'Notes'
];

const CONVERTED_HEADERS = [
  'Lead ID',
  'Business Name',
  'Phone',
  'City',
  'Locality',
  'Converted On',
  'Offer Shown',
  'Next Step',
  'Notes'
];

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Dikhao Outreach')
    .addItem('1. Setup sheets', 'setupSheets')
    .addItem('2. Refresh scoring + queues', 'refreshAll')
    .addItem('3. Move converted leads', 'moveConvertedLeads')
    .addToUi();
}

function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ensureSheet(ss, SHEET_NAMES.raw, RAW_HEADERS);
  ensureSheet(ss, SHEET_NAMES.scored, SCORED_HEADERS);
  ensureSheet(ss, SHEET_NAMES.outreach, OUTREACH_HEADERS);
  ensureSheet(ss, SHEET_NAMES.followUp, FOLLOW_UP_HEADERS);
  ensureSheet(ss, SHEET_NAMES.converted, CONVERTED_HEADERS);
  formatDateColumns(ss);
  seedExampleRow(ss.getSheetByName(SHEET_NAMES.raw));
}

function refreshAll() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const rawSheet = ensureSheet(ss, SHEET_NAMES.raw, RAW_HEADERS);
  const scoredSheet = ensureSheet(ss, SHEET_NAMES.scored, SCORED_HEADERS);
  const outreachSheet = ensureSheet(ss, SHEET_NAMES.outreach, OUTREACH_HEADERS);
  const followUpSheet = ensureSheet(ss, SHEET_NAMES.followUp, FOLLOW_UP_HEADERS);

  const rawRows = getRows(rawSheet, RAW_HEADERS);
  const scoredRows = rawRows
    .filter(row => row['Business Name'])
    .map(scoreLeadRow);

  writeObjects(scoredSheet, SCORED_HEADERS, scoredRows);
  refreshOutreachQueue(outreachSheet, scoredRows);
  refreshFollowUpToday(followUpSheet, outreachSheet);
  formatDateColumns(ss);
}

function moveConvertedLeads() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const outreachSheet = ensureSheet(ss, SHEET_NAMES.outreach, OUTREACH_HEADERS);
  const convertedSheet = ensureSheet(ss, SHEET_NAMES.converted, CONVERTED_HEADERS);
  const scoredSheet = ensureSheet(ss, SHEET_NAMES.scored, SCORED_HEADERS);

  const outreachRows = getRows(outreachSheet, OUTREACH_HEADERS);
  const scoredRows = getRows(scoredSheet, SCORED_HEADERS);
  const scoredByLeadId = keyBy(scoredRows, 'Lead ID');

  const convertedRows = outreachRows
    .filter(row => String(row.Status).toLowerCase() === 'converted')
    .map(row => ({
      'Lead ID': row['Lead ID'],
      'Business Name': row['Business Name'],
      'Phone': row['Phone'],
      'City': scoredByLeadId[row['Lead ID']] ? scoredByLeadId[row['Lead ID']].City : '',
      'Locality': row['Locality'],
      'Converted On': new Date(),
      'Offer Shown': '30-second demo',
      'Next Step': '',
      'Notes': row['Notes'] || ''
    }));

  if (!convertedRows.length) {
    return;
  }

  const existing = getRows(convertedSheet, CONVERTED_HEADERS);
  const merged = dedupeByLeadId(existing.concat(convertedRows));
  writeObjects(convertedSheet, CONVERTED_HEADERS, merged);
}

function refreshOutreachQueue(outreachSheet, scoredRows) {
  const existingRows = getRows(outreachSheet, OUTREACH_HEADERS);
  const existingByLeadId = keyBy(existingRows, 'Lead ID');

  const refreshed = scoredRows
    .filter(row => String(row['Ready for Outreach']).toUpperCase() === 'YES')
    .map(row => {
      const existing = existingByLeadId[row['Lead ID']] || {};
      const firstSentDate = parseSheetDate(existing['First Sent Date']);
      const followUp1Date = firstSentDate || existing['Follow-up 1 Date']
        ? addDays(firstSentDate || parseSheetDate(existing['First Sent Date']), 2)
        : '';
      const followUp2Date = firstSentDate || existing['Follow-up 2 Date']
        ? addDays(firstSentDate || parseSheetDate(existing['First Sent Date']), 5)
        : '';

      return {
        'Lead ID': row['Lead ID'],
        'Business Name': row['Business Name'],
        'Phone': row['Phone'],
        'Locality': row['Locality'],
        'Priority': row['Priority Band'],
        'First Message Draft': existing['First Message Draft'] || buildFirstMessage(row['Business Name']),
        'Status': existing['Status'] || 'Ready',
        'First Sent Date': existing['First Sent Date'] || '',
        'Follow-up 1 Date': followUp1Date || '',
        'Follow-up 2 Date': followUp2Date || '',
        'Last Updated': new Date(),
        'Notes': existing['Notes'] || row['Notes'] || ''
      };
    });

  writeObjects(outreachSheet, OUTREACH_HEADERS, refreshed);
}

function refreshFollowUpToday(followUpSheet, outreachSheet) {
  const rows = getRows(outreachSheet, OUTREACH_HEADERS);
  const today = stripTime(new Date());

  const followUps = rows
    .filter(row => {
      const status = String(row.Status || '').toLowerCase();
      if (['converted', 'not interested', 'do not contact'].includes(status)) {
        return false;
      }

      const f1 = parseSheetDate(row['Follow-up 1 Date']);
      const f2 = parseSheetDate(row['Follow-up 2 Date']);
      return (f1 && stripTime(f1).getTime() <= today.getTime()) ||
        (f2 && stripTime(f2).getTime() <= today.getTime());
    })
    .map(row => {
      const f1 = parseSheetDate(row['Follow-up 1 Date']);
      const f2 = parseSheetDate(row['Follow-up 2 Date']);
      const dueType = f1 && stripTime(f1).getTime() <= today.getTime() && !statusIncludes(row.Status, 'follow-up 1 sent')
        ? 'Follow-up 1'
        : 'Follow-up 2';

      return {
        'Lead ID': row['Lead ID'],
        'Business Name': row['Business Name'],
        'Phone': row['Phone'],
        'Locality': row['Locality'],
        'Priority': row['Priority'],
        'Status': row['Status'],
        'Due Follow-up': dueType,
        'Suggested Message': buildFollowUpMessage(row['Business Name'], dueType),
        'First Sent Date': row['First Sent Date'],
        'Follow-up 1 Date': row['Follow-up 1 Date'],
        'Follow-up 2 Date': row['Follow-up 2 Date'],
        'Notes': row['Notes'] || ''
      };
    });

  writeObjects(followUpSheet, FOLLOW_UP_HEADERS, followUps);
}

function scoreLeadRow(row) {
  const businessName = row['Business Name'] || '';
  const category = String(row['Category'] || '').toLowerCase();
  const website = String(row['Website'] || '').trim();
  const phone = String(row['Phone'] || '').trim();
  const standaloneFlag = normalizeYesNo(row['Standalone Flag']);
  const simpleOfferFlag = normalizeYesNo(row['Simple Offer Flag']);

  const phoneScore = phone ? 1 : 0;
  const noWebsiteScore = website ? 0 : 1;
  const clinicScore = category.includes('clinic') ? 1 : 0;
  const standaloneScore = standaloneFlag === 'YES' ? 1 : 0;
  const simpleOfferScore = simpleOfferFlag === 'YES' ? 1 : 0;
  const priorityScore = phoneScore + noWebsiteScore + clinicScore + standaloneScore + simpleOfferScore;
  const priorityBand = getPriorityBand(priorityScore);
  const readyForOutreach = priorityScore >= 3 && phoneScore === 1 && clinicScore === 1 ? 'YES' : 'NO';

  return {
    ...row,
    'Lead ID': row['Lead ID'] || buildLeadId(row),
    'Phone Score': phoneScore,
    'No Website Score': noWebsiteScore,
    'Clinic Score': clinicScore,
    'Standalone Score': standaloneScore,
    'Simple Offer Score': simpleOfferScore,
    'Priority Score': priorityScore,
    'Priority Band': priorityBand,
    'Ready for Outreach': readyForOutreach,
    'Scored At': new Date()
  };
}

function buildLeadId(row) {
  const city = String(row.City || 'city').replace(/[^a-z0-9]/gi, '').slice(0, 4).toUpperCase();
  const name = String(row['Business Name'] || 'lead').replace(/[^a-z0-9]/gi, '').slice(0, 6).toUpperCase();
  return [city || 'CITY', name || 'LEAD', Utilities.getUuid().slice(0, 6).toUpperCase()].join('-');
}

function getPriorityBand(score) {
  if (score >= 5) return 'Hot';
  if (score >= 4) return 'High';
  if (score >= 3) return 'Medium';
  return 'Low';
}

function buildFirstMessage(businessName) {
  const greetingName = cleanBusinessNameForGreeting(businessName);
  return [
    `Hello Doctor,`,
    ``,
    `${greetingName ? greetingName + ' is' : 'Your clinic is'} already being searched on Google, but without a strong website and clear online presence, many potential patients move on to other clinics.`,
    ``,
    `I am building a simple AI-powered tool that creates a clinic website, Google listing support, and WhatsApp contact flow in a very easy way.`,
    ``,
    `Would you like to see a quick 30-second demo? It is completely free.`
  ].join('\n');
}

function buildFollowUpMessage(businessName, dueType) {
  const clinicName = cleanBusinessNameForGreeting(businessName) || 'your clinic';

  if (dueType === 'Follow-up 1') {
    return [
      `Hello Doctor,`,
      ``,
      `Just following up on my earlier note about a quick 30-second demo for ${clinicName}.`,
      ``,
      `It shows how your clinic can look better on Google and convert more patient interest into WhatsApp enquiries.`,
      ``,
      `Happy to share it whenever convenient.`
    ].join('\n');
  }

  return [
    `Hello Doctor,`,
    ``,
    `One last follow-up from my side. I made this for clinics that want a simple online presence without any technical work.`,
    ``,
    `If you want, I can send a free 30-second demo for ${clinicName}.`
  ].join('\n');
}

function cleanBusinessNameForGreeting(name) {
  return String(name || '').trim();
}

function ensureSheet(ss, name, headers) {
  const sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  const currentHeaders = sheet.getLastRow() > 0
    ? sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), headers.length)).getValues()[0]
    : [];

  const mismatch = headers.some((header, index) => currentHeaders[index] !== header);
  if (sheet.getLastRow() === 0 || mismatch) {
    sheet.clear();
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    styleHeader(sheet, headers.length);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function styleHeader(sheet, headerCount) {
  sheet.getRange(1, 1, 1, headerCount)
    .setFontWeight('bold')
    .setBackground('#111827')
    .setFontColor('#ffffff');
  sheet.autoResizeColumns(1, headerCount);
}

function seedExampleRow(sheet) {
  if (sheet.getLastRow() > 1) return;
  const example = [[
    'GURG-HEALT-000001',
    'Health First Clinic',
    'Clinic',
    'Sector 56, Gurugram',
    '9898989898',
    '',
    'https://maps.google.com/example',
    4.4,
    37,
    'Gurugram',
    'Sector 56',
    'Apify',
    'Yes',
    'Yes',
    'Seed example row',
    new Date()
  ]];
  sheet.getRange(2, 1, 1, example[0].length).setValues(example);
}

function getRows(sheet, headers) {
  if (sheet.getLastRow() < 2) return [];
  const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length).getValues();
  return values.map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });
}

function writeObjects(sheet, headers, rows) {
  sheet.clearContents();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  styleHeader(sheet, headers.length);
  sheet.setFrozenRows(1);

  if (!rows.length) {
    return;
  }

  const values = rows.map(row => headers.map(header => row[header] !== undefined ? row[header] : ''));
  sheet.getRange(2, 1, values.length, headers.length).setValues(values);
  sheet.autoResizeColumns(1, headers.length);
}

function formatDateColumns(ss) {
  [
    [SHEET_NAMES.raw, ['Imported At']],
    [SHEET_NAMES.scored, ['Imported At', 'Scored At']],
    [SHEET_NAMES.outreach, ['First Sent Date', 'Follow-up 1 Date', 'Follow-up 2 Date', 'Last Updated']],
    [SHEET_NAMES.followUp, ['First Sent Date', 'Follow-up 1 Date', 'Follow-up 2 Date']],
    [SHEET_NAMES.converted, ['Converted On']]
  ].forEach(([sheetName, columns]) => {
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) return;
    const headerMap = getHeaderMap(sheet);
    columns.forEach(columnName => {
      const colIndex = headerMap[columnName];
      if (!colIndex || sheet.getMaxRows() < 2) return;
      sheet.getRange(2, colIndex, Math.max(sheet.getMaxRows() - 1, 1), 1).setNumberFormat('yyyy-mm-dd');
    });
  });
}

function getHeaderMap(sheet) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  return headers.reduce((acc, header, index) => {
    acc[header] = index + 1;
    return acc;
  }, {});
}

function keyBy(rows, key) {
  return rows.reduce((acc, row) => {
    acc[row[key]] = row;
    return acc;
  }, {});
}

function dedupeByLeadId(rows) {
  const map = {};
  rows.forEach(row => {
    map[row['Lead ID']] = row;
  });
  return Object.keys(map).map(key => map[key]);
}

function addDays(date, days) {
  if (!date) return '';
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function parseSheetDate(value) {
  if (!value) return null;
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value)) {
    return value;
  }
  const parsed = new Date(value);
  return isNaN(parsed) ? null : parsed;
}

function stripTime(date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function normalizeYesNo(value) {
  const normalized = String(value || '').trim().toUpperCase();
  return ['YES', 'Y', 'TRUE', '1'].includes(normalized) ? 'YES' : 'NO';
}

function statusIncludes(status, search) {
  return String(status || '').toLowerCase().includes(search.toLowerCase());
}

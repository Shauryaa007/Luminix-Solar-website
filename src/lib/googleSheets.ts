import { google } from 'googleapis';

export interface ConsultationLeadPayload {
  name: string;
  mobile: string;
  city?: string | null;
  pincode?: string | null;
  scheme?: string | null;
  propertyType?: string | null;
  businessType?: string | null;
  selectionMode?: string | null;
  monthlyBill?: string | null;
  capacity?: string | null;
  panelCompany?: string | null;
  panelCompanyOther?: string | null;
  systemType?: string | null;
  requirement?: string | null;
  source?: string | null;
}

export interface AppendLeadResult {
  success: boolean;
  skipped?: boolean;
  method?: 'webhook' | 'service_account';
  error?: string;
}

/**
 * 16 comprehensive columns covering every single field present in the form
 * for either PM Surya Ghar (PMSG) or PMFME scheme.
 */
export const SHEET_HEADERS = [
  'Timestamp (IST)',
  'Full Name',
  'Mobile Number',
  'City',
  'PIN Code',
  'Scheme',
  'Property Type',
  'Business Type',
  'Selection Mode',
  'Monthly Electricity Bill',
  'System Capacity',
  'System Type',
  'Preferred Solar Brand',
  'Custom Brand (If Other)',
  'Customer Notes / Requirement',
  'Lead Source',
];

/**
 * Converts text to standard Title Case (Capitalizing Each Word),
 * handling snake_case/kebab-case while preserving acronyms like PM, PMSG, PMFME, PIN, kW.
 * Note: Does NOT apply to user requirement notes (which are preserved as typed).
 */
export function formatStandardText(text?: string | null): string {
  if (!text || typeof text !== 'string') return '-';
  const clean = text.trim();
  if (!clean || clean === 'N/A' || clean === 'None' || clean === '-') return '-';

  return clean
    .replace(/[_-]+/g, ' ')
    .split(/\s+/)
    .map((word) => {
      const upper = word.toUpperCase();
      if (['PM', 'PMSG', 'PMFME', 'PIN', 'KW', 'IST'].includes(upper)) {
        return upper === 'KW' ? 'kW' : upper;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

/**
 * Builds the structured array of cells representing one submission row.
 */
export function buildLeadRowValues(lead: ConsultationLeadPayload): string[] {
  // Format submission timestamp in Indian Standard Time (IST)
  const timestamp = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date());

  const schemeName =
    lead.scheme === 'PMFME'
      ? 'PMFME (Food Processing 35% Subsidy)'
      : 'PM Surya Ghar (PMSG)';

  const isPmsg = lead.scheme !== 'PMFME';
  const isPmfme = lead.scheme === 'PMFME';

  const propertyType = isPmsg && lead.propertyType ? formatStandardText(lead.propertyType) : '-';
  const businessType = isPmfme && lead.businessType ? formatStandardText(lead.businessType) : '-';
  const selectionMode = isPmsg && lead.selectionMode ? formatStandardText(lead.selectionMode) : (isPmfme ? 'Capacity' : '-');
  const monthlyBill = isPmsg && lead.monthlyBill ? lead.monthlyBill.trim() : '-';
  const capacity = lead.capacity ? lead.capacity.trim() : '-';
  const systemType = isPmsg && lead.systemType ? formatStandardText(lead.systemType) : (isPmfme ? 'Commercial / Captive' : '-');
  
  const preferredBrand = formatStandardText(lead.panelCompany || 'Any / Best Recommended');
  const customBrand = lead.panelCompanyOther ? formatStandardText(lead.panelCompanyOther) : '-';

  return [
    timestamp,
    formatStandardText(lead.name),
    lead.mobile,
    formatStandardText(lead.city),
    lead.pincode || 'N/A',
    schemeName,
    propertyType,
    businessType,
    selectionMode,
    monthlyBill,
    capacity,
    systemType,
    preferredBrand,
    customBrand,
    lead.requirement ? lead.requirement.trim() : 'None', // Preserved exactly as typed
    formatStandardText(lead.source || 'Website Form'),
  ];
}

/**
 * Appends a lead row to Google Sheets.
 * Supports two integration modes:
 * 1. Google Apps Script Webhook URL (GOOGLE_SHEET_WEBHOOK_URL) - easiest, zero GCP credential setup.
 * 2. Google Service Account (GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID) - direct GCP Sheets API v4.
 */
export async function appendLeadToGoogleSheet(
  lead: ConsultationLeadPayload
): Promise<AppendLeadResult> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const rowValues = buildLeadRowValues(lead);

  // ---------------------------------------------------------------------------
  // Option A: Google Apps Script Webhook (Priority if provided)
  // ---------------------------------------------------------------------------
  if (webhookUrl && webhookUrl.trim().startsWith('http')) {
    try {
      const isPmsg = lead.scheme !== 'PMFME';
      const isPmfme = lead.scheme === 'PMFME';

      const standardizedLead = {
        name: formatStandardText(lead.name),
        mobile: lead.mobile,
        city: formatStandardText(lead.city),
        pincode: lead.pincode || 'N/A',
        scheme: isPmfme ? 'PMFME (Food Processing 35% Subsidy)' : 'PM Surya Ghar (PMSG)',
        propertyType: isPmsg && lead.propertyType ? formatStandardText(lead.propertyType) : '-',
        businessType: isPmfme && lead.businessType ? formatStandardText(lead.businessType) : '-',
        selectionMode: isPmsg && lead.selectionMode ? formatStandardText(lead.selectionMode) : (isPmfme ? 'Capacity' : '-'),
        monthlyBill: isPmsg && lead.monthlyBill ? lead.monthlyBill.trim() : '-',
        capacity: lead.capacity ? lead.capacity.trim() : '-',
        systemType: isPmsg && lead.systemType ? formatStandardText(lead.systemType) : (isPmfme ? 'Commercial / Captive' : '-'),
        panelCompany: formatStandardText(lead.panelCompany || 'Any / Best Recommended'),
        panelCompanyOther: lead.panelCompanyOther ? formatStandardText(lead.panelCompanyOther) : '-',
        requirement: lead.requirement ? lead.requirement.trim() : 'None', // Preserved verbatim
        source: formatStandardText(lead.source || 'Website Form'),
      };

      const response = await fetch(webhookUrl.trim(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          headers: SHEET_HEADERS,
          rowValues,
          lead: standardizedLead,
          secretKey: process.env.GOOGLE_SHEET_SECRET_KEY || 'luminix_secret_leads_2026',
        }),
      });

      if (!response.ok) {
        throw new Error(`Webhook returned HTTP status ${response.status}`);
      }

      return { success: true, method: 'webhook' };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error('[Google Sheets Webhook] Failed to append row:', errorMsg);
      if (!clientEmail || !rawKey || !spreadsheetId) {
        return { success: false, method: 'webhook', error: errorMsg };
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Option B: Google Cloud Service Account (Google Sheets API v4)
  // ---------------------------------------------------------------------------
  if (!clientEmail || !rawKey || !spreadsheetId) {
    console.warn(
      '[Google Sheets] Skipped sync: No Google Sheets credentials configured (GOOGLE_SHEET_WEBHOOK_URL or GOOGLE_SHEET_ID + Service Account).'
    );
    return { success: false, skipped: true };
  }

  try {
    const privateKey = rawKey.includes('\\n')
      ? rawKey.replace(/\\n/g, '\n')
      : rawKey;

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const sheetName = process.env.GOOGLE_SHEET_NAME || 'Sheet1';

    // Check if header row exists in the target sheet
    try {
      const existingHeaders = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${sheetName}!A1:P1`,
      });

      if (!existingHeaders.data.values || existingHeaders.data.values.length === 0) {
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `${sheetName}!A1:P1`,
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [SHEET_HEADERS],
          },
        });
      }
    } catch (headerErr) {
      console.warn('[Google Sheets] Note during header check:', headerErr);
    }

    // Append the new lead row
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:P`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowValues],
      },
    });

    return { success: true, method: 'service_account' };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('[Google Sheets Service Account] Failed to append row:', errorMsg);
    return { success: false, method: 'service_account', error: errorMsg };
  }
}

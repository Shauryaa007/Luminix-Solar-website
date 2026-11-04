import { google } from 'googleapis';

export interface ConsultationLeadPayload {
  name: string;
  mobile: string;
  email?: string | null;
  city?: string | null;
  monthlyBill: string;
  propertyType: string;
  requirement?: string | null;
  source?: string;
}

export interface AppendLeadResult {
  success: boolean;
  skipped?: boolean;
  error?: string;
}

/**
 * Appends a consultation lead row to Google Sheets using a Google Service Account.
 * Requires GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_SHEET_ID in environment variables.
 * Gracefully skips if credentials are not configured, so local dev or missing envs never crash the app.
 */
export async function appendLeadToGoogleSheet(
  lead: ConsultationLeadPayload
): Promise<AppendLeadResult> {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!clientEmail || !rawKey || !spreadsheetId) {
    console.warn(
      '[Google Sheets] Skipped sync: GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, or GOOGLE_SHEET_ID is missing in environment variables.'
    );
    return { success: false, skipped: true };
  }

  try {
    // Normalize private key formatting: converts literal "\n" strings into real newlines
    const privateKey = rawKey.includes('\\n')
      ? rawKey.replace(/\\n/g, '\n')
      : rawKey;

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Format submission timestamp in Indian Standard Time (IST)
    const timestamp = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date());

    const rowValues = [
      timestamp,
      lead.name,
      lead.mobile,
      lead.email || 'N/A',
      lead.city || 'N/A',
      lead.monthlyBill,
      lead.propertyType,
      lead.requirement || 'N/A',
      lead.source || 'Website Hero Form',
    ];

    const sheetName = process.env.GOOGLE_SHEET_NAME || 'Sheet1';

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:I`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowValues],
      },
    });

    return { success: true };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('[Google Sheets] Failed to append lead row:', errorMsg);
    return { success: false, error: errorMsg };
  }
}


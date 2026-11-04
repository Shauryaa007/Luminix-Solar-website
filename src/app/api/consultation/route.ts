import { NextRequest, NextResponse } from 'next/server';
import { appendLeadToGoogleSheet } from '@/lib/googleSheets';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, mobile, email, city, monthlyBill, propertyType, requirement, source } = body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid full name.' },
        { status: 400 }
      );
    }

    // Validate 10-digit Indian mobile number
    const sanitizedMobile = typeof mobile === 'string' ? mobile.replace(/\D/g, '') : '';
    if (!/^[6-9]\d{9}$/.test(sanitizedMobile)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 10-digit Indian mobile number.' },
        { status: 400 }
      );
    }

    if (!monthlyBill || typeof monthlyBill !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Please select your monthly electricity bill.' },
        { status: 400 }
      );
    }

    if (!propertyType || typeof propertyType !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Please select your property type.' },
        { status: 400 }
      );
    }

    const leadData = {
      name: name.trim(),
      mobile: sanitizedMobile,
      email: typeof email === 'string' && email.trim() ? email.trim() : null,
      city: typeof city === 'string' && city.trim() ? city.trim() : null,
      monthlyBill: monthlyBill.trim(),
      propertyType: propertyType.trim(),
      requirement: typeof requirement === 'string' && requirement.trim() ? requirement.trim() : null,
      source: typeof source === 'string' && source.trim() ? source.trim() : 'hero_section',
    };

    // Append lead to Google Sheets
    const sheetResult = await appendLeadToGoogleSheet(leadData);

    if (!sheetResult.success && !sheetResult.skipped) {
      console.error('[Consultation API] Google Sheets error:', sheetResult.error);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your solar consultation request has been received.',
        lead: {
          id: `lead_${Date.now()}`,
          ...leadData,
          createdAt: new Date().toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error handling /api/consultation POST:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const isSheetConfigured = Boolean(
    process.env.GOOGLE_SHEET_ID &&
    process.env.GOOGLE_CLIENT_EMAIL &&
    process.env.GOOGLE_PRIVATE_KEY
  );

  return NextResponse.json({
    status: 'online',
    service: 'Luminix Solar Consultation API',
    googleSheetsConnected: isSheetConfigured,
    timestamp: new Date().toISOString(),
  });
}

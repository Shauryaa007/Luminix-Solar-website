import { NextRequest, NextResponse } from 'next/server';
import { appendLeadToGoogleSheet } from '@/lib/googleSheets';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      mobile,
      email,
      city,
      pincode,
      scheme = 'PMSG',
      panelCompany,
      panelCompanyOther,
      monthlyBill,
      capacity,
      selectionMode,
      systemType,
      propertyType,
      businessType,
      requirement,
      source,
    } = body;

    // 1. Validate full name (mandatory)
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid full name (minimum 2 characters).' },
        { status: 400 }
      );
    }

    // 2. Validate 10-digit Indian mobile number (mandatory)
    const sanitizedMobile = typeof mobile === 'string' ? mobile.replace(/\D/g, '') : '';
    if (!/^[6-9]\d{9}$/.test(sanitizedMobile)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 10-digit Indian mobile number.' },
        { status: 400 }
      );
    }

    // 3. Validate City (mandatory)
    if (!city || typeof city !== 'string' || !city.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please enter your city.' },
        { status: 400 }
      );
    }

    // 4. Validate Pincode (mandatory 6-digit)
    const sanitizedPincode = typeof pincode === 'string' ? pincode.trim() : '';
    if (!/^\d{6}$/.test(sanitizedPincode)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 6-digit PIN code.' },
        { status: 400 }
      );
    }

    // 5. Validate Panel Company (mandatory)
    if (!panelCompany || typeof panelCompany !== 'string' || !panelCompany.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please select your preferred panel company.' },
        { status: 400 }
      );
    }

    if (
      panelCompany === 'OTHERS' &&
      (!panelCompanyOther || typeof panelCompanyOther !== 'string' || !panelCompanyOther.trim())
    ) {
      return NextResponse.json(
        { success: false, error: 'Please specify your preferred panel company name.' },
        { status: 400 }
      );
    }

    // 6. Validate Scheme-specific mandatory fields
    if (scheme === 'PMSG') {
      if (!systemType || typeof systemType !== 'string' || !systemType.trim()) {
        return NextResponse.json(
          { success: false, error: 'Please select a system type (On-Grid, Off-Grid, or Hybrid).' },
          { status: 400 }
        );
      }
      if (!propertyType || typeof propertyType !== 'string' || !propertyType.trim()) {
        return NextResponse.json(
          { success: false, error: 'Please select your property type.' },
          { status: 400 }
        );
      }
      if (selectionMode === 'capacity') {
        if (!capacity || typeof capacity !== 'string' || !capacity.trim()) {
          return NextResponse.json(
            { success: false, error: 'Please specify your required system capacity.' },
            { status: 400 }
          );
        }
      } else {
        if (!monthlyBill || typeof monthlyBill !== 'string' || !monthlyBill.trim()) {
          return NextResponse.json(
            { success: false, error: 'Please specify your monthly electricity bill.' },
            { status: 400 }
          );
        }
      }
    } else {
      // PMFME Scheme
      if (!businessType || typeof businessType !== 'string' || !businessType.trim()) {
        return NextResponse.json(
          { success: false, error: 'Please enter your business type (e.g. Flour Mill / Bakery).' },
          { status: 400 }
        );
      }
      if (!capacity || typeof capacity !== 'string' || !capacity.trim()) {
        return NextResponse.json(
          { success: false, error: 'Please specify your required system capacity.' },
          { status: 400 }
        );
      }
    }

    // Resolve panel brand
    const resolvedPanelCompany =
      panelCompany === 'OTHERS' && panelCompanyOther
        ? `Other: ${panelCompanyOther.trim()}`
        : panelCompany || 'Not specified';

    // Resolve location (City + Pincode)
    const resolvedLocation = [
      typeof city === 'string' && city.trim() ? city.trim() : null,
      typeof pincode === 'string' && pincode.trim() ? `PIN: ${pincode.trim()}` : null,
    ]
      .filter(Boolean)
      .join(', ');

    // Resolve bill or capacity
    const resolvedBillOrCapacity =
      scheme === 'PMFME'
        ? `Capacity: ${capacity || 'Not specified'}`
        : selectionMode === 'capacity'
        ? `Capacity: ${capacity || 'Not specified'}`
        : monthlyBill || (capacity ? `Capacity: ${capacity}` : 'Not specified');

    // Resolve property or business type
    const resolvedPropertyOrBusiness =
      scheme === 'PMFME'
        ? businessType ? `Business: ${businessType.trim()}` : 'Food Processing'
        : propertyType || 'Residential';

    // Combine notes with scheme details
    const schemeNotes = [
      `Scheme: ${scheme === 'PMFME' ? 'PMFME (Micro Food Processing 35% Subsidy)' : 'PM Surya Ghar (PMSG)'}`,
      `Panel Company: ${resolvedPanelCompany}`,
      systemType ? `System: ${systemType}` : null,
      requirement ? `Note: ${requirement.trim()}` : null,
    ]
      .filter(Boolean)
      .join(' | ');

    const leadData = {
      name: name.trim(),
      mobile: sanitizedMobile,
      email: typeof email === 'string' && email.trim() ? email.trim() : null,
      city: resolvedLocation || null,
      monthlyBill: resolvedBillOrCapacity,
      propertyType: resolvedPropertyOrBusiness,
      requirement: schemeNotes,
      source: typeof source === 'string' && source.trim() ? source.trim() : 'website_form',
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

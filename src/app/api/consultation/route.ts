import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, mobile, email, city, monthlyBill, propertyType, source } = body;

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
      source: typeof source === 'string' && source.trim() ? source.trim() : 'hero_section',
      status: 'NEW',
    };

    const databaseUrl = process.env.DATABASE_URL || '';
    const isPlaceholderUrl =
      !databaseUrl ||
      databaseUrl.includes('YOUR_PASSWORD') ||
      databaseUrl.includes('USER:PASSWORD');

    // If database connection is configured, save directly to PostgreSQL
    if (!isPlaceholderUrl) {
      try {
        const savedLead = await prisma.consultationLead.create({
          data: leadData,
        });

        return NextResponse.json(
          {
            success: true,
            lead: savedLead,
            message: 'Your solar consultation request has been received.',
          },
          { status: 201 }
        );
      } catch (dbError) {
        console.error('Database connection error in /api/consultation:', dbError);
        // Fallback for development if database is unreachable
        return NextResponse.json(
          {
            success: true,
            lead: { id: `lead_${Date.now()}`, ...leadData, createdAt: new Date() },
            isFallback: true,
            message:
              'Inquiry received. Note: Database connection failed; please check your DATABASE_URL in .env.local.',
          },
          { status: 200 }
        );
      }
    }

    // Graceful response in development when DATABASE_URL is still placeholder
    console.log('[Dev Mode] Consultation lead received without database:', leadData);
    return NextResponse.json(
      {
        success: true,
        lead: { id: `lead_dev_${Date.now()}`, ...leadData, createdAt: new Date() },
        isFallback: true,
        message:
          'Consultation inquiry received! (Development mode: add your real DATABASE_URL in .env.local to persist into PostgreSQL)',
      },
      { status: 200 }
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
  return NextResponse.json({
    status: 'online',
    service: 'Luminix Solar Consultation API',
    timestamp: new Date().toISOString(),
  });
}

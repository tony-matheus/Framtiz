import { NextResponse } from 'next/server';
import { serverAnalyticsService } from '@/lib/services/analytics/analytics-service';
import { validateAnalyticsInput } from '@/lib/schemas/analytics-schemas';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the incoming analytics data
    const validatedData = validateAnalyticsInput(body);

    // Track the page view
    const analytics = await serverAnalyticsService.trackPageView(validatedData);

    return NextResponse.json(analytics, { status: 201 });
  } catch (error) {
    console.error('Error tracking analytics:', error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

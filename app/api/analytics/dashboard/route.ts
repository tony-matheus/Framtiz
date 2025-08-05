import { NextResponse } from 'next/server';
import { serverAuthService } from '@/lib/services/auth/server-auth-service';
import { serverAnalyticsService } from '@/lib/services/analytics/analytics-service';
import { validateDashboardOptions } from '@/lib/schemas/analytics-schemas';

export async function GET(request: Request) {
  try {
    // Check if user is admin
    const isAdmin = await serverAuthService.isAdmin();

    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);

    // Extract and validate query parameters
    const timePeriod = searchParams.get('time_period') || '1d';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const options = {
      time_period: timePeriod as '1d' | '7d' | '30d',
      page,
      limit,
    };

    // Validate the options
    const validatedOptions = validateDashboardOptions(options);

    // Get dashboard data
    const dashboardData = await serverAnalyticsService.getDashboardData(
      validatedOptions
    );

    return NextResponse.json(dashboardData, { status: 200 });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

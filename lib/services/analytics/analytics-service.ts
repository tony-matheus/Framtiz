import { SupabaseClient } from '@supabase/supabase-js';
import { createServerSupabaseClient } from '../../supabase/server';
import {
  AnalyticsInput,
  DashboardOptions,
  DashboardData,
  BlogAnalytics,
  TimeSeriesData,
  GeographicData,
  DeviceData,
  validateAnalyticsInput,
  validateDashboardOptions,
} from '../../schemas/analytics-schemas';

export type Analytics = {
  id: string;
  page: string;
  referrer: string;
  user_agent: string;
  country: string;
  device: string;
  from: string;
  metadata: Record<string, unknown>;
  created_at: string;
};

export const trackPageView = async (
  supabaseClient: SupabaseClient,
  analyticsData: AnalyticsInput
): Promise<Analytics> => {
  const validatedData = validateAnalyticsInput(analyticsData);

  const { data, error } = await supabaseClient
    .from('analytics')
    .insert({
      ...validatedData,
      metadata: validatedData.metadata || {},
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw new Error(
      `Error tracking page view: ${error.message || error.details}`
    );
  }

  return data as Analytics;
};

export const getDashboardData = async (
  supabaseClient: SupabaseClient,
  options: DashboardOptions
): Promise<DashboardData> => {
  const validatedOptions = validateDashboardOptions(options);
  const { time_period } = validatedOptions;

  const now = new Date();
  const startDate = new Date();

  switch (time_period) {
    case '1d':
      startDate.setDate(now.getDate() - 1);
      break;
    case '7d':
      startDate.setDate(now.getDate() - 7);
      break;
    case '30d':
      startDate.setDate(now.getDate() - 30);
      break;
  }

  const startDateISO = startDate.toISOString();
  const endDateISO = now.toISOString();

  const { count: totalVisitors, error: totalError } = await supabaseClient
    .from('analytics')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', startDateISO)
    .lte('created_at', endDateISO);

  if (totalError) {
    throw new Error(
      `Error fetching total visitors: ${
        totalError.message || totalError.details
      }`
    );
  }

  const { data: topBlogsData, error: topBlogsError } = await supabaseClient
    .from('analytics')
    .select('page, created_at, metadata')
    .gte('created_at', startDateISO)
    .lte('created_at', endDateISO)
    .like('page', '/blog/%')
    .order('created_at', { ascending: false });

  if (topBlogsError) {
    throw new Error(
      `Error fetching top blogs: ${
        topBlogsError.message || topBlogsError.details
      }`
    );
  }

  const blogVisits = new Map<
    string,
    { count: number; last_visited: string; metadata: Record<string, unknown> }
  >();
  topBlogsData?.forEach((record) => {
    const slug = record.page.replace('/blog/', '');
    const existing = blogVisits.get(slug);
    if (existing) {
      existing.count++;
      if (record.created_at > existing.last_visited) {
        existing.last_visited = record.created_at;
      }
    } else {
      blogVisits.set(slug, {
        count: 1,
        last_visited: record.created_at,
        metadata: record.metadata,
      });
    }
  });

  const topBlogs: BlogAnalytics[] = Array.from(blogVisits.entries())
    .map(([slug, data]) => ({
      slug,
      title: (data.metadata.title ?? slug) as string,
      visit_count: data.count,
      last_visited: data.last_visited,
      metadata: data.metadata,
    }))
    .sort((a, b) => b.visit_count - a.visit_count)
    .slice(0, 2);

  const { data: geoData, error: geoError } = await supabaseClient
    .from('analytics')
    .select('country')
    .gte('created_at', startDateISO)
    .lte('created_at', endDateISO)
    .not('country', 'is', null);

  if (geoError) {
    throw new Error(
      `Error fetching geographic data: ${geoError.message || geoError.details}`
    );
  }

  const geoCounts = new Map<string, number>();
  geoData?.forEach((record) => {
    const country = record.country || 'Unknown';
    geoCounts.set(country, (geoCounts.get(country) || 0) + 1);
  });

  const geographic_data: GeographicData[] = Array.from(geoCounts.entries())
    .map(([country, visit_count]) => ({ country, visit_count }))
    .sort((a, b) => b.visit_count - a.visit_count);

  const { data: deviceData, error: deviceError } = await supabaseClient
    .from('analytics')
    .select('device')
    .gte('created_at', startDateISO)
    .lte('created_at', endDateISO)
    .not('device', 'is', null);

  if (deviceError) {
    throw new Error(
      `Error fetching device data: ${
        deviceError.message || deviceError.details
      }`
    );
  }

  const deviceCounts = new Map<string, number>();
  deviceData?.forEach((record) => {
    const device = record.device || 'Unknown';
    deviceCounts.set(device, (deviceCounts.get(device) || 0) + 1);
  });

  const device_data: DeviceData[] = Array.from(deviceCounts.entries())
    .map(([device_type, visit_count]) => ({ device_type, visit_count }))
    .sort((a, b) => b.visit_count - a.visit_count);

  const { data: timeSeriesData, error: timeSeriesError } = await supabaseClient
    .from('analytics')
    .select('created_at')
    .gte('created_at', startDateISO)
    .lte('created_at', endDateISO)
    .order('created_at', { ascending: true });

  if (timeSeriesError) {
    throw new Error(
      `Error fetching time series data: ${
        timeSeriesError.message || timeSeriesError.details
      }`
    );
  }

  const dailyCounts = new Map<string, number>();
  timeSeriesData?.forEach((record) => {
    const date = new Date(record.created_at).toISOString().split('T')[0];
    dailyCounts.set(date, (dailyCounts.get(date) || 0) + 1);
  });

  const time_series_data: TimeSeriesData[] = Array.from(dailyCounts.entries())
    .map(([date, page_views]) => ({ date, page_views }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const blogs_table: BlogAnalytics[] = Array.from(blogVisits.entries())
    .map(([slug, data]) => ({
      slug,
      title: (data.metadata.title ?? slug) as string,
      visit_count: data.count,
      last_visited: data.last_visited,
    }))
    .sort((a, b) => b.visit_count - a.visit_count);

  return {
    total_visitors: totalVisitors || 0,
    top_blogs: topBlogs,
    blogs_table,
    geographic_data,
    device_data,
    time_series_data,
  };
};

export const serverAnalyticsService = {
  async trackPageView(analyticsData: AnalyticsInput): Promise<Analytics> {
    const supabase = await createServerSupabaseClient();
    return await trackPageView(supabase, analyticsData);
  },

  async getDashboardData(options: DashboardOptions): Promise<DashboardData> {
    const supabase = await createServerSupabaseClient();
    return await getDashboardData(supabase, options);
  },
};

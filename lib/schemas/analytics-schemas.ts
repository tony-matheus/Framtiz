import { z } from 'zod';

export const AnalyticsInputSchema = z.object({
  page: z.string().min(1, 'Page URL is required'),
  referrer: z.string().optional().default(''),
  user_agent: z.string().optional().default(''),
  country: z.string().optional().default('Unknown'),
  device: z.string().optional().default('Unknown'),
  from: z.string().optional().default(''),
  metadata: z.record(z.any()).optional().default({}),
});

export const DashboardOptionsSchema = z.object({
  time_period: z.enum(['1d', '7d', '30d'], {
    errorMap: () => ({ message: 'Time period must be 1d, 7d, or 30d' }),
  }),
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(10),
});

export const BlogAnalyticsSchema = z.object({
  slug: z.string(),
  title: z.string(),
  visit_count: z.number().min(0),
  last_visited: z.string(),
});

export const TimeSeriesDataSchema = z.object({
  date: z.string(),
  page_views: z.number().min(0),
});

export const GeographicDataSchema = z.object({
  country: z.string(),
  visit_count: z.number().min(0),
});

export const DeviceDataSchema = z.object({
  device_type: z.string(),
  visit_count: z.number().min(0),
});

export const DashboardDataSchema = z.object({
  total_visitors: z.number().min(0),
  top_blogs: z.array(BlogAnalyticsSchema),
  blogs_table: z.array(BlogAnalyticsSchema),
  geographic_data: z.array(GeographicDataSchema),
  device_data: z.array(DeviceDataSchema),
  time_series_data: z.array(TimeSeriesDataSchema),
});

export type AnalyticsInput = z.infer<typeof AnalyticsInputSchema>;
export type DashboardOptions = z.infer<typeof DashboardOptionsSchema>;
export type BlogAnalytics = z.infer<typeof BlogAnalyticsSchema>;
export type TimeSeriesData = z.infer<typeof TimeSeriesDataSchema>;
export type GeographicData = z.infer<typeof GeographicDataSchema>;
export type DeviceData = z.infer<typeof DeviceDataSchema>;
export type DashboardData = z.infer<typeof DashboardDataSchema>;

export const validateAnalyticsInput = (data: unknown): AnalyticsInput => {
  return AnalyticsInputSchema.parse(data);
};

export const validateDashboardOptions = (data: unknown): DashboardOptions => {
  return DashboardOptionsSchema.parse(data);
};

export const validateDashboardData = (data: unknown): DashboardData => {
  return DashboardDataSchema.parse(data);
};

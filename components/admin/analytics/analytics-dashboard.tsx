'use client';

import { useAnalyticsDashboard } from '@/hooks/analytics/use-analytics-dashboard';
import { AnalyticsErrorBoundary } from './error-boundary';
import TimeFilter from './time-filter';
import TopBlogsSection from './top-blogs-section';
import MetricsCards from './metrics-cards';
import BlogsTable from './blogs-table';
import AnalyticsSkeleton from './analytics-skeleton';
import AnalyticsErrorState from './analytics-error-state';
import EmptyState from '../empty-state';

export default function AnalyticsDashboard() {
  return (
    <AnalyticsErrorBoundary>
      <AnalyticsDashboardContent />
    </AnalyticsErrorBoundary>
  );
}

function AnalyticsDashboardContent() {
  const {
    data,
    isLoading,
    isError,
    error,
    timePeriod,
    setTimePeriod,
    refetch,
  } = useAnalyticsDashboard();

  if (isLoading) return <AnalyticsSkeleton />;

  if (isError)
    return (
      <AnalyticsErrorState errorMessage={error?.message} onRetry={refetch} />
    );

  if (!data) return <EmptyState title='No analytics data available' />;

  return (
    <div className='space-y-6'>
      {/* Time Filter */}
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='font-mono text-xl text-slate-100'>
            ANALYTICS_OVERVIEW
          </h2>
          <p className='text-sm text-slate-400'>
            Track visitor behavior and content performance
          </p>
        </div>
        <TimeFilter
          timePeriod={timePeriod}
          onTimePeriodChange={setTimePeriod}
        />
      </div>

      {/* Top Blogs Section */}
      <TopBlogsSection blogs={data.top_blogs} />

      {/* Metrics Cards */}
      <MetricsCards
        totalVisitors={data.total_visitors}
        geographicData={data.geographic_data}
        deviceData={data.device_data}
      />

      {/* Charts Section */}
      {/* <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'> */}
      {/* Page Views Over Time */}
      {/* <PageViewsChart data={data.time_series_data} /> */}

      {/* Geographic Distribution */}
      {/* <GeographicChart data={data.geographic_data} /> */}
      {/* </div> */}

      {/* Blogs Table */}
      <BlogsTable blogs={data.blogs_table} />
      {/* Device Distribution */}
      {/* <DeviceChart data={data.device_data} /> */}
    </div>
  );
}

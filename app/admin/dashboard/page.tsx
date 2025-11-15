'use client';

import AnalyticsDashboard from '@/components/admin/analytics/analytics-dashboard';
import TimeFilter from '@/components/admin/analytics/time-filter';
import { useAnalyticsDashboard } from '@/hooks/analytics/use-analytics-dashboard';

export default function DashboardPage() {
  const {
    data,
    isLoading,
    isError,
    error,
    timePeriod,
    setTimePeriod,
    refetch,
  } = useAnalyticsDashboard();

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
      <AnalyticsDashboard
        isLoading={isLoading}
        isError={isError}
        error={error}
        data={data}
        refetch={refetch}
      />
    </div>
  );
}

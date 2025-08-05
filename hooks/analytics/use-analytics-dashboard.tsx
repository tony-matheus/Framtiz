'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  DashboardOptions,
  DashboardData,
} from '@/lib/schemas/analytics-schemas';

interface UseAnalyticsDashboardProps {
  timePeriod?: '1d' | '7d' | '30d';
  initialPage?: number;
  limit?: number;
}

interface UseAnalyticsDashboardResult {
  data: DashboardData | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  timePeriod: '1d' | '7d' | '30d';
  setTimePeriod: (period: '1d' | '7d' | '30d') => void;
  refetch: () => void;
}

// Query key for analytics dashboard data
const analyticsDashboardQueryKey = (options: DashboardOptions) => [
  'analytics-dashboard',
  options.time_period,
  options.page,
  options.limit,
];

// Fetch function for analytics dashboard data
const fetchAnalyticsDashboard = async (
  options: DashboardOptions
): Promise<DashboardData> => {
  const params = new URLSearchParams({
    time_period: options.time_period,
    page: options.page?.toString() || '1',
    limit: options.limit?.toString() || '10',
  });

  const response = await fetch(`/api/analytics/dashboard?${params}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || `HTTP ${response.status}: ${response.statusText}`
    );
  }

  return response.json();
};

export const useAnalyticsDashboard = ({
  timePeriod = '1d',
  initialPage = 1,
  limit = 10,
}: UseAnalyticsDashboardProps = {}): UseAnalyticsDashboardResult => {
  const [currentTimePeriod, setCurrentTimePeriod] = useState<
    '1d' | '7d' | '30d'
  >(timePeriod);

  const options: DashboardOptions = {
    time_period: currentTimePeriod,
    page: initialPage,
    limit,
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: analyticsDashboardQueryKey(options),
    queryFn: () => fetchAnalyticsDashboard(options),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false, // Prevent unnecessary refetches
    refetchOnMount: false, // Use cached data when component mounts
  });

  const setTimePeriod = (period: '1d' | '7d' | '30d') => {
    setCurrentTimePeriod(period);
  };

  return {
    data,
    isLoading,
    isError,
    error: error as Error | null,
    timePeriod: currentTimePeriod,
    setTimePeriod,
    refetch,
  };
};

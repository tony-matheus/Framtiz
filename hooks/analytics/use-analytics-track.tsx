import { AnalyticsInput } from '@/lib/schemas/analytics-schemas';

import { AnyUseMutationOptions, useMutation } from '@tanstack/react-query';
import axios from 'axios';

async function trackAnalytics(input: AnalyticsInput) {
  const { data } = await axios.post('/api/analytics/track', input);

  return data;
}

export const useAnalyticsTrack = (options?: AnyUseMutationOptions) =>
  useMutation({
    mutationFn: trackAnalytics,
    onSuccess: options?.onSuccess,
  });

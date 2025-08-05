'use client';

import usePageTracker from '@/hooks/use-page-tracker';

type PageTrackerProps = {
  page?: string;
  referrer?: string;
  userAgent?: string;
  country?: string;
  device?: string;
  from?: string;
  metadata?: Record<string, unknown>;
};

export default function PageTracker({
  page,
  referrer,
  userAgent,
  country,
  device,
  from,
  metadata = {},
}: PageTrackerProps) {
  usePageTracker({
    page,
    referrer,
    userAgent,
    country,
    device,
    from,
    metadata,
  });

  return null;
}

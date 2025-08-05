import { isAnalyticsAvailable } from '@/lib/services/analytics/analytics-error-handler';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useAnalyticsTrack } from './analytics/use-analytics-track';

type PageTrackerProps = {
  page?: string;
  referrer?: string;
  userAgent?: string;
  country?: string;
  device?: string;
  from?: string;
  metadata?: Record<string, unknown>;
};

export default function usePageTracker({
  page,
  referrer,
  userAgent,
  country,
  device,
  from,
  metadata = {},
}: PageTrackerProps) {
  const pathname = usePathname();
  const wasTracked = useRef(false);
  const { mutate: trackAnalytics } = useAnalyticsTrack();

  const detectDevice = (currentUserAgent: string): string => {
    const ua = currentUserAgent.toLowerCase();
    if (
      ua.includes('mobile') ||
      ua.includes('android') ||
      ua.includes('iphone')
    ) {
      return 'mobile';
    }
    if (ua.includes('tablet') || ua.includes('ipad')) {
      return 'tablet';
    }
    return 'desktop';
  };

  const getCountry = (): string => {
    try {
      return navigator.language.split('-')[1]?.toUpperCase() || 'Unknown';
    } catch {
      return 'Unknown';
    }
  };

  const getSource = (currentReferrer: string): string => {
    if (currentReferrer) {
      try {
        const url = new URL(currentReferrer);
        return url.hostname;
      } catch {
        return 'direct';
      }
    }
    return 'direct';
  };

  useEffect(() => {
    if (!wasTracked.current) {
      const trackPageView = async () => {
        if (!isAnalyticsAvailable()) {
          return;
        }

        const currentPage = page ?? pathname;

        const currentReferrer = referrer ?? document.referrer;
        const currentUserAgent = userAgent ?? navigator.userAgent;

        const analyticsData = {
          page: currentPage,
          referrer: currentReferrer,
          user_agent: currentUserAgent,
          country: country ?? getCountry(),
          device: device ?? detectDevice(currentUserAgent),
          from: from ?? getSource(currentReferrer),
          metadata: {
            ...metadata,
            screen_width: window.screen.width,
            screen_height: window.screen.height,
            viewport_width: window.innerWidth,
            viewport_height: window.innerHeight,
            language: navigator.language,
            timestamp: new Date().toISOString(),
          },
        };

        trackAnalytics(analyticsData);
        wasTracked.current = true;
      };

      trackPageView();
    }
  }, [
    pathname,
    page,
    referrer,
    userAgent,
    country,
    device,
    from,
    metadata,
    trackAnalytics,
    wasTracked,
  ]);

  return null;
}

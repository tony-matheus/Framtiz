'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  handleAnalyticsError,
  isAnalyticsAvailable,
} from '@/lib/services/analytics/analytics-error-handler';

interface PageTrackerProps {
  page?: string;
  referrer?: string;
  userAgent?: string;
  country?: string;
  device?: string;
  from?: string;
  metadata?: Record<string, unknown>;
}

export default function PageTracker({
  page,
  referrer,
  userAgent,
  country,
  device,
  from,
  metadata = {},
}: PageTrackerProps) {
  const pathname = usePathname();

  useEffect(() => {
    const trackPageView = async () => {
      if (!isAnalyticsAvailable()) {
        return;
      }

      const currentPage = page || pathname;

      try {
        const currentReferrer = referrer || document.referrer;

        const currentUserAgent = userAgent || navigator.userAgent;

        const detectDevice = (): string => {
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

        const currentDevice = device || detectDevice();

        const getCountry = (): string => {
          try {
            return navigator.language.split('-')[1]?.toUpperCase() || 'Unknown';
          } catch {
            return 'Unknown';
          }
        };

        const currentCountry = country || getCountry();

        const getSource = (): string => {
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

        const currentFrom = from || getSource();

        const analyticsData = {
          page: currentPage,
          referrer: currentReferrer,
          user_agent: currentUserAgent,
          country: currentCountry,
          device: currentDevice,
          from: currentFrom,
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

        const response = await fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(analyticsData),
        });

        if (!response.ok) {
          handleAnalyticsError(
            new Error(`HTTP ${response.status}: ${response.statusText}`),
            {
              page: currentPage,
              responseStatus: response.status,
            }
          );
        }
      } catch (error) {
        handleAnalyticsError(error, {
          page: currentPage,
          action: 'trackPageView',
        });
      }
    };

    trackPageView();
  }, [pathname, page, referrer, userAgent, country, device, from, metadata]);

  return null;
}

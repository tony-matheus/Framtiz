'use client';

import { useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface TrackPageViewOptions {
  page?: string;
  referrer?: string;
  userAgent?: string;
  country?: string;
  device?: string;
  from?: string;
  metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface UseTrackPageViewResult {
  trackPageView: (options?: TrackPageViewOptions) => Promise<void>;
  trackCurrentPage: () => Promise<void>;
}

export const useTrackPageView = (): UseTrackPageViewResult => {
  const pathname = usePathname();

  const trackPageView = useCallback(
    async (options: TrackPageViewOptions = {}) => {
      try {
        // Get current page URL
        const currentPage = options.page || pathname;

        // Get referrer from document if not provided
        const currentReferrer = options.referrer || document.referrer;

        // Get user agent from navigator if not provided
        const currentUserAgent = options.userAgent || navigator.userAgent;

        // Detect device type
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

        const currentDevice = options.device || detectDevice();

        // Get country from navigator language if not provided
        const getCountry = (): string => {
          try {
            return navigator.language.split('-')[1]?.toUpperCase() || 'Unknown';
          } catch {
            return 'Unknown';
          }
        };

        const currentCountry = options.country || getCountry();

        // Get source if not provided
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

        const currentFrom = options.from || getSource();

        // Prepare analytics data
        const analyticsData = {
          page: currentPage,
          referrer: currentReferrer,
          user_agent: currentUserAgent,
          country: currentCountry,
          device: currentDevice,
          from: currentFrom,
          metadata: {
            ...options.metadata,
            screen_width: window.screen.width,
            screen_height: window.screen.height,
            viewport_width: window.innerWidth,
            viewport_height: window.innerHeight,
            language: navigator.language,
            timestamp: new Date().toISOString(),
          },
        };

        // Send analytics data to API
        const response = await fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(analyticsData),
        });

        if (!response.ok) {
          console.warn('Analytics tracking failed:', response.statusText);
        }
      } catch (error) {
        // Silently fail to not affect user experience
        console.warn('Analytics tracking error:', error);
      }
    },
    [pathname]
  );

  const trackCurrentPage = useCallback(async () => {
    await trackPageView();
  }, [trackPageView]);

  return {
    trackPageView,
    trackCurrentPage,
  };
};

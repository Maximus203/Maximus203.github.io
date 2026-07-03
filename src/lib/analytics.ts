'use client';

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

// Analytics event types
export type AnalyticsEvent =
  | 'cv_download'
  | 'contact_modal_open'
  | 'contact_form_submit'
  | 'language_change'
  | 'tool_launch';

// Check if analytics is enabled (only in production, no localhost)
const isAnalyticsEnabled = (): boolean => {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname;
  // Disable on localhost, 127.0.0.1, and preview deployments
  return hostname !== 'localhost' && hostname !== '127.0.0.1' && !hostname.includes('localhost');
};

// Send a custom event to Plausible (never used for pageviews — see sendPageview)
const sendEvent = (event: AnalyticsEvent, props?: Record<string, string | number | boolean>) => {
  if (!isAnalyticsEnabled()) {
    // Log in development for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', event, props);
    }
    return;
  }

  // Plausible API - using window.plausible
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(event, { props });
  } else if (typeof window !== 'undefined' && (window as any).umami) {
    // Umami fallback
    (window as any).umami.track(event, props);
  }
};

// Send a real Plausible pageview (not a custom event). script.manual.js
// disables auto-tracking entirely, so this drives every pageview ourselves —
// including the first, since App Router navigation never triggers a full
// reload the standard auto-tracking script would otherwise see.
const sendPageview = (url: string) => {
  if (!isAnalyticsEnabled()) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] pageview', url);
    }
    return;
  }

  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible('pageview', { u: url });
  } else if (typeof window !== 'undefined' && (window as any).umami) {
    (window as any).umami.track();
  }
};

// Track page views automatically
export function usePageViewTracking() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    sendPageview(window.location.origin + pathname);
  }, [pathname]);
}

// Analytics component - tracks page views automatically
export function Analytics() {
  usePageViewTracking();
  return null; // This component doesn't render anything
}

// Convenience functions for manual event tracking
export const analytics = {
  trackCvDownload: (language: string) => {
    sendEvent('cv_download', { language });
  },

  trackContactModalOpen: (language: string) => {
    sendEvent('contact_modal_open', { language });
  },

  trackLanguageChange: (fromLang: string, toLang: string) => {
    sendEvent('language_change', { from: fromLang, to: toLang });
  },

  trackToolLaunch: (toolName: string, language: string) => {
    sendEvent('tool_launch', { tool: toolName, language });
  },

  trackContactFormSubmit: (success: boolean, language: string) => {
    sendEvent('contact_form_submit', { success, language });
  },
};

// Custom hook for tracking CV download
export function useCvDownloadTracking(language: string) {
  return useCallback(() => {
    analytics.trackCvDownload(language);
  }, [language]);
}

// Custom hook for tracking contact modal open
export function useContactModalTracking(language: string) {
  return useCallback(() => {
    analytics.trackContactModalOpen(language);
  }, [language]);
}

// Custom hook for tracking language change
export function useLanguageChangeTracking() {
  return useCallback((fromLang: string, toLang: string) => {
    analytics.trackLanguageChange(fromLang, toLang);
  }, []);
}

// Custom hook for tracking contact form submission
export function useContactFormSubmitTracking(language: string) {
  return useCallback((success: boolean) => {
    analytics.trackContactFormSubmit(success, language);
  }, [language]);
}

// Custom hook for tracking tool launches
export function useToolLaunchTracking(language: string) {
  return useCallback((toolName: string) => {
    analytics.trackToolLaunch(toolName, language);
  }, [language]);
}
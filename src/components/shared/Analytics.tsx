'use client';

import { Analytics as AnalyticsLib } from '@/lib/analytics';

/**
 * Privacy-first analytics component using Plausible.io
 * No cookies, GDPR/CCPA compliant, <1KB script
 * Compatible with static export (Next.js output: export)
 */
export function Analytics() {
  // This component uses the analytics library which handles:
  // - Automatic page view tracking on route changes
  // - Manual event tracking (CV download, contact modal, etc.)
  // - Only loads in production (not on localhost)
  return <AnalyticsLib />;
}
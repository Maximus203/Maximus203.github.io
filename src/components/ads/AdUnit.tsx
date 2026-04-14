'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
  }
}

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'vertical';
  className?: string;
}

export default function AdUnit({ slot, format = 'auto', className = '' }: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet (dev mode or blocker)
    }
  }, []);

  if (process.env.NODE_ENV === 'development') {
    return (
      <div
        className={`bg-gray-200 dark:bg-slate-800 rounded-xl flex items-center justify-center text-gray-400 dark:text-slate-500 text-sm font-mono border-2 border-dashed border-gray-300 dark:border-slate-700 ${className}`}
        style={{ minHeight: 250 }}
      >
        Ad Placeholder
      </div>
    );
  }

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={{ display: 'block' }}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}

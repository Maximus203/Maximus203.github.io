'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export function ScrollReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = gsap.context(() => {
      gsap.fromTo(ref.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', clearProps: 'all' });
    }, ref);
    return () => context.revert();
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}

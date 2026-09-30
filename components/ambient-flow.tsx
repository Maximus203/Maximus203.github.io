'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  previousX: number;
  previousY: number;
  velocityX: number;
  velocityY: number;
  phase: number;
};

const focusSelectors = [
  '.hero-portrait',
  '.projects-section',
  '.students-showcase',
  '.gallery-grid',
  '.lab-section',
  '.tool-cards',
];

export function AmbientFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compact = window.matchMedia('(max-width: 820px)').matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let animationFrame = 0;
    let accent = '#5d7cfa';
    let warm = '#f0b35b';
    let particles: Particle[] = [];
    const pointer = { x: -1000, y: -1000, active: false };
    const focus = { x: window.innerWidth * 0.72, y: window.innerHeight * 0.42, targetX: window.innerWidth * 0.72, targetY: window.innerHeight * 0.42 };

    const makeParticle = (index: number): Particle => {
      const x = ((index * 127.1) % 997) / 997 * width;
      const y = ((index * 311.7) % 991) / 991 * height;
      return { x, y, previousX: x, previousY: y, velocityX: 0, velocityY: 0, phase: index * 0.73 };
    };

    const updatePalette = () => {
      const rootStyles = getComputedStyle(document.querySelector('.site-root') || document.documentElement);
      accent = rootStyles.getPropertyValue('--accent').trim() || '#5d7cfa';
      warm = rootStyles.getPropertyValue('--warm').trim() || '#f0b35b';
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      updatePalette();
      particles = Array.from({ length: compact ? 22 : 58 }, (_, index) => makeParticle(index));
    };

    const updateFocus = () => {
      let best: { area: number; x: number; y: number } | null = null;
      for (const element of document.querySelectorAll<HTMLElement>(focusSelectors.join(','))) {
        const bounds = element.getBoundingClientRect();
        const visibleWidth = Math.max(0, Math.min(bounds.right, width) - Math.max(bounds.left, 0));
        const visibleHeight = Math.max(0, Math.min(bounds.bottom, height) - Math.max(bounds.top, 0));
        const area = visibleWidth * visibleHeight;
        if (area > (best?.area || 0)) best = { area, x: bounds.left + bounds.width * 0.5, y: bounds.top + bounds.height * 0.5 };
      }
      if (best) {
        focus.targetX = best.x;
        focus.targetY = best.y;
      }
    };

    const draw = () => {
      frame += 1;
      context.clearRect(0, 0, width, height);
      focus.x += (focus.targetX - focus.x) * 0.018;
      focus.y += (focus.targetY - focus.y) * 0.018;

      const glow = context.createRadialGradient(focus.x, focus.y, 0, focus.x, focus.y, compact ? 150 : 310);
      glow.addColorStop(0, `${accent}18`);
      glow.addColorStop(0.42, `${accent}08`);
      glow.addColorStop(1, `${accent}00`);
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      for (const particle of particles) {
        particle.previousX = particle.x;
        particle.previousY = particle.y;
        const time = frame * 0.0026 + particle.phase;
        const field = Math.sin(particle.x * 0.0048 + time) + Math.cos(particle.y * 0.0057 - time * 0.74) + Math.sin((particle.x + particle.y) * 0.0022 + time * 0.43);
        const angle = field * Math.PI * 0.64;
        const focusDistance = Math.max(100, Math.hypot(focus.x - particle.x, focus.y - particle.y));
        const focusPull = Math.min(0.022, 3.4 / focusDistance);
        particle.velocityX = particle.velocityX * 0.93 + Math.cos(angle) * 0.042 + (focus.x - particle.x) * focusPull * 0.006;
        particle.velocityY = particle.velocityY * 0.93 + Math.sin(angle) * 0.042 + (focus.y - particle.y) * focusPull * 0.006;

        if (pointer.active) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.max(34, Math.hypot(dx, dy));
          if (distance < 280) {
            const force = (1 - distance / 280) * 0.34;
            particle.velocityX += (-dy / distance) * force;
            particle.velocityY += (dx / distance) * force;
          }
        }

        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        context.beginPath();
        context.moveTo(particle.previousX, particle.previousY);
        context.lineTo(particle.x, particle.y);
        context.strokeStyle = frame % 7 === 0 ? warm : accent;
        context.globalAlpha = compact ? 0.12 : 0.19;
        context.lineWidth = compact ? 0.65 : 0.8;
        context.stroke();
      }
      context.globalAlpha = 1;
      if (!reducedMotion && !document.hidden) animationFrame = requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = event.pointerType !== 'touch';
    };
    const onPointerLeave = () => { pointer.active = false; };
    const onVisibility = () => {
      cancelAnimationFrame(animationFrame);
      if (!document.hidden && !reducedMotion) animationFrame = requestAnimationFrame(draw);
    };

    resize();
    updateFocus();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', updateFocus, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('portfolio-theme-change', updatePalette);
    document.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', updateFocus);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('portfolio-theme-change', updatePalette);
      document.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-flow" aria-hidden="true" />;
}

'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import gsap from 'gsap';
import type { Locale } from '@/lib/i18n';
import { assetUrl } from '@/lib/assets';

type Dimension = 1 | 2 | 3 | 4;

type Scene = {
  short: string;
  title: string;
  description: string;
  formula: string;
};

const copy: Record<Locale, { label: string; instruction: string; mobile: string; speculative: string; play: string; pause: string; scenes: Record<Dimension, Scene> }> = {
  fr: {
    label: 'Atlas dimensionnel', instruction: 'Changer de dimension', mobile: 'Portrait 2D · mode mobile', speculative: 'simulation spéculative', play: 'Lancer la lecture automatique', pause: 'Suspendre la lecture automatique',
    scenes: {
      1: { short: '1D', title: 'Filament causal', description: 'Toute l’information se contraint sur un seul axe.', formula: 'x(t) = c · t' },
      2: { short: '2D', title: 'Membrane d’identité', description: 'Le portrait redevient une surface lisible, stable et directe.', formula: 'ψ = ψ(x, y)' },
      3: { short: '3D', title: 'Lentille gravitationnelle', description: 'La profondeur répond au regard et déforme le champ autour du sujet.', formula: '∇²Φ = ρ' },
      4: { short: '4D', title: 'Écho temporel', description: 'Plusieurs états du portrait coexistent le long d’un axe temporel.', formula: 'xμ = (ct, x, y, z)' },
    },
  },
  en: {
    label: 'Dimensional atlas', instruction: 'Change dimension', mobile: '2D portrait · mobile mode', speculative: 'speculative simulation', play: 'Start autoplay', pause: 'Pause autoplay',
    scenes: {
      1: { short: '1D', title: 'Causal filament', description: 'All information is constrained to a single axis.', formula: 'x(t) = c · t' },
      2: { short: '2D', title: 'Identity membrane', description: 'The portrait returns to a direct, stable and readable surface.', formula: 'ψ = ψ(x, y)' },
      3: { short: '3D', title: 'Gravitational lens', description: 'Depth responds to the viewer and bends the field around the subject.', formula: '∇²Φ = ρ' },
      4: { short: '4D', title: 'Temporal echo', description: 'Several portrait states coexist along a temporal axis.', formula: 'xμ = (ct, x, y, z)' },
    },
  },
  zh: {
    label: '维度图谱', instruction: '切换维度', mobile: '二维肖像 · 移动模式', speculative: '推测性模拟', play: '开始自动播放', pause: '暂停自动播放',
    scenes: {
      1: { short: '1D', title: '因果丝线', description: '所有信息被约束在一条轴线上。', formula: 'x(t) = c · t' },
      2: { short: '2D', title: '身份薄膜', description: '肖像回到直接、稳定、清晰的表面。', formula: 'ψ = ψ(x, y)' },
      3: { short: '3D', title: '引力透镜', description: '深度回应观察者，并弯曲主体周围的场。', formula: '∇²Φ = ρ' },
      4: { short: '4D', title: '时间回声', description: '多个肖像状态沿时间轴同时存在。', formula: 'xμ = (ct, x, y, z)' },
    },
  },
  ja: {
    label: '次元アトラス', instruction: '次元を切り替える', mobile: '2Dポートレート・モバイルモード', speculative: '思考実験シミュレーション', play: '自動再生を開始', pause: '自動再生を停止',
    scenes: {
      1: { short: '1D', title: '因果フィラメント', description: 'すべての情報がひとつの軸に制約されます。', formula: 'x(t) = c · t' },
      2: { short: '2D', title: 'アイデンティティ膜', description: 'ポートレートが読みやすく安定した面に戻ります。', formula: 'ψ = ψ(x, y)' },
      3: { short: '3D', title: '重力レンズ', description: '奥行きが視線に反応し、人物の周囲の場を曲げます。', formula: '∇²Φ = ρ' },
      4: { short: '4D', title: '時間エコー', description: '複数の状態が時間軸に沿って共存します。', formula: 'xμ = (ct, x, y, z)' },
    },
  },
};

const dimensions: Dimension[] = [1, 2, 3, 4];

export function DimensionalPortrait({ locale, identity }: { locale: Locale; identity: string }) {
  const localized = copy[locale];
  const [dimension, setDimension] = useState<Dimension>(2);
  const [desktop, setDesktop] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const scene = localized.scenes[dimension];
  const fieldLines = useMemo(() => Array.from({ length: 11 }, (_, index) => index), []);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 821px)');
    const update = () => {
      setDesktop(media.matches);
      if (!media.matches) {
        setDimension(2);
        setAutoplay(false);
      } else {
        setDimension((current) => current === 2 ? 1 : current);
        setAutoplay(true);
      }
    };
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!desktop || !autoplay || interactionPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => {
      setDimension((current) => dimensions[(dimensions.indexOf(current) + 1) % dimensions.length]);
    }, 3800);
    return () => window.clearTimeout(timer);
  }, [autoplay, desktop, dimension, interactionPaused]);

  useEffect(() => {
    const stack = stackRef.current;
    if (!desktop || !autoplay || !stack || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const levitation = gsap.to(stack, { y: -11, rotationZ: 0.45, duration: 2.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    return () => {
      levitation.kill();
      gsap.set(stack, { clearProps: 'transform' });
    };
  }, [autoplay, desktop]);

  useEffect(() => {
    if (!desktop || !rootRef.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const context = gsap.context(() => {
      const readout = rootRef.current?.querySelector('.dimension-readout');
      const surface = rootRef.current?.querySelector('.portrait-surface');
      const ghosts = rootRef.current?.querySelectorAll('.temporal-ghost');
      const lines = rootRef.current?.querySelectorAll('.field-line');
      if (reduced) {
        gsap.set([readout, surface, ghosts, lines], { clearProps: 'all' });
        return;
      }
      const timeline = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
      timeline
        .fromTo(surface, { opacity: 0.45, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.72 })
        .fromTo(lines, { opacity: 0, scaleX: 0.82 }, { opacity: 1, scaleX: 1, duration: 0.58, stagger: 0.025 }, 0.08)
        .fromTo(readout, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.48 }, 0.22);
      if (dimension === 4) timeline.fromTo(ghosts, { opacity: 0, x: 0 }, { opacity: (index) => [0.38, 0.28, 0.18][index] ?? 0.18, x: 0, duration: 0.62, stagger: 0.08 }, 0.12);
    }, rootRef);
    return () => context.revert();
  }, [desktop, dimension]);

  useEffect(() => {
    if (!desktop || dimension < 3 || !rootRef.current || !motionRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    const motion = motionRef.current;
    const rotateX = gsap.quickTo(motion, 'rotationX', { duration: 0.5, ease: 'power3.out' });
    const rotateY = gsap.quickTo(motion, 'rotationY', { duration: 0.5, ease: 'power3.out' });
    const moveX = gsap.quickTo(motion, 'x', { duration: 0.5, ease: 'power3.out' });
    const moveY = gsap.quickTo(motion, 'y', { duration: 0.5, ease: 'power3.out' });
    const onMove = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      const amplitude = dimension === 4 ? 12 : 8;
      rotateX(-y * amplitude);
      rotateY(x * amplitude);
      moveX(x * (dimension === 4 ? 9 : 5));
      moveY(y * (dimension === 4 ? 9 : 5));
    };
    const reset = () => { rotateX(0); rotateY(0); moveX(0); moveY(0); };
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', reset);
    return () => {
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', reset);
      gsap.set(motion, { clearProps: 'transform' });
    };
  }, [desktop, dimension]);

  const activate = (next: Dimension) => {
    if (desktop) {
      setDimension(next);
      setAutoplay(false);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const focused = buttonsRef.current.findIndex((button) => button === event.target);
    const current = focused >= 0 ? focused : dimensions.indexOf(dimension);
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? 3 : event.key === 'ArrowRight' ? (current + 1) % 4 : (current + 3) % 4;
    const next = dimensions[nextIndex];
    setDimension(next);
    setAutoplay(false);
    buttonsRef.current[nextIndex]?.focus();
  };

  return (
    <div className={`hero-portrait dimensional-portrait dimension-${dimension}`} ref={rootRef} data-dimension={dimension} data-mode={desktop ? 'immersive' : '2d'} data-autoplay={autoplay ? 'playing' : 'paused'} onPointerEnter={() => setInteractionPaused(true)} onPointerLeave={() => setInteractionPaused(false)}>
      <div className="dimension-stage" aria-label={`${localized.label}. ${scene.title}. ${scene.description}`}>
        <div className="dimension-grid" aria-hidden="true" />
        <div className="dimension-field" aria-hidden="true">
          {fieldLines.map((line) => <span className="field-line" key={line} style={{ '--line-index': line } as CSSProperties} />)}
        </div>
        <div className="dimension-axis axis-x" aria-hidden="true"><span>x</span></div>
        <div className="dimension-axis axis-y" aria-hidden="true"><span>y</span></div>
        <div className="dimension-axis axis-z" aria-hidden="true"><span>z</span></div>
        <div className="dimension-axis axis-t" aria-hidden="true"><span>t</span></div>
        <div className="dimension-orbit orbit-one" aria-hidden="true" />
        <div className="dimension-orbit orbit-two" aria-hidden="true" />
        <div className="portrait-stack" ref={stackRef}>
          <div className="portrait-motion" ref={motionRef}>
            <img className="temporal-ghost ghost-one" src={assetUrl('/media/photo.webp')} alt="" aria-hidden="true" />
            <img className="temporal-ghost ghost-two" src={assetUrl('/media/photo.webp')} alt="" aria-hidden="true" />
            <img className="temporal-ghost ghost-three" src={assetUrl('/media/photo.webp')} alt="" aria-hidden="true" />
            <div className="portrait-surface">
              <Image src={assetUrl('/media/photo.webp')} alt="Portrait de Cherif Diouf" fill priority sizes="(max-width: 820px) 100vw, 45vw" />
              <span className="portrait-scan" aria-hidden="true" />
            </div>
          </div>
        </div>
        <div className="dimension-readout" aria-live="polite">
          <span>0{dimension} / {localized.speculative}</span>
          <strong>{scene.title}</strong>
          <p>{scene.description}</p>
          <code>{scene.formula}</code>
        </div>
        <div className="dimension-mobile-label"><span>{localized.mobile}</span><strong>{identity}</strong></div>
      </div>
      <div className="dimension-switcher" role="group" aria-label={localized.instruction} onKeyDown={onKeyDown}>
        <span>{localized.label}<button className="dimension-autoplay" type="button" aria-pressed={autoplay} aria-label={autoplay ? localized.pause : localized.play} title={autoplay ? localized.pause : localized.play} onClick={() => setAutoplay((value) => !value)}><i aria-hidden="true">{autoplay ? 'Ⅱ' : '▶'}</i></button></span>
        <div>
          {dimensions.map((item, index) => <button key={item} ref={(element) => { buttonsRef.current[index] = element; }} type="button" aria-pressed={dimension === item} onClick={() => activate(item)}><b>0{item}</b><small>{localized.scenes[item].short}</small></button>)}
        </div>
      </div>
    </div>
  );
}

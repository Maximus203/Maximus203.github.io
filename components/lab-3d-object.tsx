'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { getDictionary, type Locale } from '@/lib/i18n';

const uiCopy = {
  fr: { controls: ['Explorer le système', 'Pause', 'Plein écran', 'Réduire'], live: 'Système actif', idle: 'En attente', flow: 'Flux orchestration', input: 'Intention', output: 'Résultat', guard: 'Validation humaine', cycle: 'Cycle actif', packets: 'paquets / s', latency: 'latence', integrity: 'intégrité' },
  en: { controls: ['Explore the system', 'Pause', 'Fullscreen', 'Reduce'], live: 'System live', idle: 'Standing by', flow: 'Orchestration flow', input: 'Intent', output: 'Outcome', guard: 'Human validation', cycle: 'Active cycle', packets: 'packets / s', latency: 'latency', integrity: 'integrity' },
  zh: { controls: ['探索系统', '暂停', '全屏', '退出全屏'], live: '系统运行中', idle: '等待中', flow: '编排流', input: '意图', output: '结果', guard: '人工验证', cycle: '活动周期', packets: '数据包 / 秒', latency: '延迟', integrity: '完整性' },
  ja: { controls: ['システムを探索', '一時停止', '全画面', '縮小'], live: 'システム稼働中', idle: '待機中', flow: 'オーケストレーション', input: '意図', output: '結果', guard: '人間による検証', cycle: '稼働サイクル', packets: 'パケット / 秒', latency: 'レイテンシ', integrity: '完全性' },
} as const;

export function Lab3DObject({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale);
  const ui = uiCopy[locale];
  const sceneRef = useRef<HTMLDivElement>(null);
  const objectRef = useRef<HTMLDivElement>(null);
  const fullscreenButtonRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState(false);
  const [nativeExpanded, setNativeExpanded] = useState(false);
  const [fallbackExpanded, setFallbackExpanded] = useState(false);
  const expanded = nativeExpanded || fallbackExpanded;

  useEffect(() => {
    const syncFullscreen = () => setNativeExpanded(document.fullscreenElement === sceneRef.current);
    document.addEventListener('fullscreenchange', syncFullscreen);
    return () => document.removeEventListener('fullscreenchange', syncFullscreen);
  }, []);

  useEffect(() => {
    if (!fallbackExpanded) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFallbackExpanded(false);
        requestAnimationFrame(() => fullscreenButtonRef.current?.focus());
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [fallbackExpanded]);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const object = objectRef.current;
    if (!scene || !object) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const context = gsap.context(() => {
      gsap.set(object, { rotateX: -18, rotateY: -28 });
      if (reduced || !active) return;
      gsap.to(object, { rotateY: '+=360', rotateX: '+=8', duration: 18, repeat: -1, ease: 'none' });
      gsap.to('.lab-orbit-a', { rotation: 360, duration: 22, repeat: -1, ease: 'none' });
      gsap.to('.lab-orbit-b', { rotation: -360, duration: 31, repeat: -1, ease: 'none' });
      gsap.to('.lab-orbit-c', { rotation: 360, duration: 42, repeat: -1, ease: 'none' });
      gsap.to('.signal-line', { strokeDashoffset: -180, duration: 3.2, repeat: -1, ease: 'none', stagger: 0.25 });
      gsap.fromTo('.lab-data-bit', { y: 46, opacity: 0 }, { y: -76, opacity: 1, duration: 2.6, repeat: -1, ease: 'power1.inOut', stagger: 0.42, yoyo: true });
      gsap.to('.lab-core-pulse', { scale: 1.2, opacity: 0.08, duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.telemetry-wave span', { scaleY: 1.75, duration: 0.5, repeat: -1, yoyo: true, stagger: { each: 0.08, from: 'random' }, ease: 'sine.inOut' });
    }, scene);
    return () => context.revert();
  }, [active, fallbackExpanded, nativeExpanded]);

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen?.();
      requestAnimationFrame(() => fullscreenButtonRef.current?.focus());
      return;
    }
    if (fallbackExpanded) {
      setFallbackExpanded(false);
      requestAnimationFrame(() => fullscreenButtonRef.current?.focus());
      return;
    }
    setActive(true);
    if (sceneRef.current?.requestFullscreen) {
      try {
        await sceneRef.current.requestFullscreen();
        return;
      } catch {
        setFallbackExpanded(true);
      }
    } else setFallbackExpanded(true);
  };

  const scene = <div className={`lab-3d-scene ${expanded ? 'is-expanded' : ''} ${active ? 'is-active' : ''}`} ref={sceneRef} aria-describedby="lab-3d-description">
    <p id="lab-3d-description" className="sr-only">{copy.home.labScene}</p>
    <div className="lab-space-grid" aria-hidden="true" />
    <div className="lab-core-pulse" aria-hidden="true" />
    <svg className="lab-signal-map" viewBox="0 0 800 620" aria-hidden="true" preserveAspectRatio="none">
      <path className="signal-line" d="M44 154 C188 72 253 214 376 292 S616 440 756 330" />
      <path className="signal-line signal-line-warm" d="M72 478 C193 528 280 414 394 312 S600 94 738 152" />
      <path className="signal-line signal-line-soft" d="M28 316 C196 306 249 140 402 164 S602 366 782 278" />
    </svg>

    <div className="lab-scene-header">
      <span>CHERIF / SYSTEMS LAB</span>
      <span className={active ? 'lab-live is-live' : 'lab-live'}><i /> {active ? ui.live : ui.idle}</span>
    </div>

    <div className="lab-flow-label lab-flow-input"><span>01</span><strong>{ui.input}</strong><small>signal.in</small></div>
    <div className="lab-flow-label lab-flow-output"><span>06</span><strong>{ui.output}</strong><small>value.out</small></div>
    <div className="lab-flow-label lab-flow-guard"><span>05</span><strong>{ui.guard}</strong><small>human.gate</small></div>

    <div className="lab-orbit lab-orbit-a" aria-hidden="true">
      <span className="lab-satellite satellite-a"><i />{copy.home.labFaces[0]}</span>
      <span className="lab-satellite satellite-b"><i />{copy.home.labFaces[3]}</span>
    </div>
    <div className="lab-orbit lab-orbit-b" aria-hidden="true">
      <span className="lab-satellite satellite-c"><i />{copy.home.labFaces[1]}</span>
      <span className="lab-satellite satellite-d"><i />{copy.home.labFaces[2]}</span>
    </div>
    <div className="lab-orbit lab-orbit-c" aria-hidden="true">
      <span className="lab-satellite satellite-e"><i />{copy.home.labFaces[4]}</span>
      <span className="lab-satellite satellite-f"><i />{copy.home.labFaces[5]}</span>
    </div>

    <div className="lab-cube-stage">
      <span className="lab-core-index">CORE / 04</span>
      <div className="lab-3d-object" ref={objectRef} aria-hidden="true">{copy.home.labFaces.map((face, index) => <span className={`lab-3d-face face-${index}`} key={face}>{face}<small>0{index + 1}</small></span>)}</div>
    </div>

    <aside className="lab-telemetry">
      <span>{ui.cycle}</span>
      <strong>{active ? '1 284' : '000'}</strong>
      <small>{ui.packets}</small>
      <div><b>{ui.latency}</b><em>{active ? '12 ms' : '--'}</em></div>
      <div><b>{ui.integrity}</b><em>{active ? '99.8%' : '--'}</em></div>
      <div className="telemetry-wave" aria-hidden="true">{Array.from({ length: 15 }, (_, index) => <span key={index} />)}</div>
    </aside>

    <div className="lab-data-stream" aria-hidden="true">{Array.from({ length: 7 }, (_, index) => <span className="lab-data-bit" key={index}>0{index + 1}</span>)}</div>

    <div className="lab-3d-controls">
      <span>{ui.flow}</span>
      <button type="button" className="scene-control" aria-pressed={active} onClick={() => setActive((value) => !value)}>{active ? ui.controls[1] : ui.controls[0]}</button>
      <button ref={fullscreenButtonRef} type="button" className="scene-control" aria-expanded={expanded} onClick={toggleFullscreen}>{expanded ? ui.controls[3] : ui.controls[2]}</button>
    </div>
  </div>;

  return fallbackExpanded ? createPortal(scene, document.body) : scene;
}

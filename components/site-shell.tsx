'use client';

import { usePathname } from 'next/navigation';
import { useLayoutEffect, useRef, useState, type MouseEvent } from 'react';
import gsap from 'gsap';
import { profile } from '@/lib/site-data';
import { AmbientFlow } from '@/components/ambient-flow';
import { CherifChat } from '@/components/cherif-chat';
import { getDictionary, localePath, type Locale, locales } from '@/lib/i18n';

const THEME_STORAGE_KEY = 'cherif-portfolio-theme';

type Theme = 'dark' | 'light';

const shellCopy: Record<Locale, { theme: string; light: string; dark: string; explore: string; direct: string; socials: string; location: string; close: string }> = {
  fr: { theme: 'Changer de thème', light: 'Diffuser le mode clair', dark: 'Diffuser le mode sombre', explore: 'Explorer', direct: 'Contact direct', socials: 'Réseaux', location: 'Base', close: 'Concevoir · automatiser · transmettre' },
  en: { theme: 'Change theme', light: 'Diffuse light mode', dark: 'Diffuse dark mode', explore: 'Explore', direct: 'Direct contact', socials: 'Social', location: 'Base', close: 'Design · automate · teach' },
  zh: { theme: '切换主题', light: '扩散浅色模式', dark: '扩散深色模式', explore: '探索', direct: '直接联系', socials: '社交网络', location: '所在地', close: '设计 · 自动化 · 传授' },
  ja: { theme: 'テーマを変更', light: 'ライトモードを広げる', dark: 'ダークモードを広げる', explore: '見る', direct: '直接連絡', socials: 'ソーシャル', location: '拠点', close: '設計 · 自動化 · 伝える' },
};

export function SiteShell({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const routeOverlayRef = useRef<HTMLDivElement>(null);
  const fluidRef = useRef<HTMLDivElement>(null);
  const previousPathRef = useRef<string | null>(null);
  const themeAnimatingRef = useRef(false);
  const copy = getDictionary(locale);
  const chrome = shellCopy[locale];
  const pathTail = pathname.replace(/^\/(fr|en|zh|ja)/, '') || '';
  const navItems = [
    { href: localePath(locale), label: copy.nav.home },
    { href: localePath(locale, '/projects'), label: copy.nav.projects },
    { href: localePath(locale, '/gallery'), label: copy.nav.gallery },
    { href: localePath(locale, '/tools'), label: copy.nav.tools },
    { href: localePath(locale, '/students'), label: copy.nav.students },
  ];

  const applyTheme = (theme: Theme) => {
    document.documentElement.dataset.portfolioTheme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    setLightMode(theme === 'light');
    window.dispatchEvent(new CustomEvent('portfolio-theme-change', { detail: { theme } }));
  };

  useLayoutEffect(() => {
    const initialTheme = document.documentElement.dataset.portfolioTheme === 'light' ? 'light' : 'dark';
    setLightMode(initialTheme === 'light');
  }, []);

  useLayoutEffect(() => {
    document.documentElement.lang = locale;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo('.site-header', { y: -18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
  }, [locale]);

  useLayoutEffect(() => {
    const main = mainRef.current;
    const overlay = routeOverlayRef.current;
    if (!main || !overlay) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const panels = overlay.querySelectorAll('.route-transition-panel');
    if (reduced) {
      gsap.set([main, overlay, panels], { clearProps: 'all' });
      previousPathRef.current = pathname;
      return;
    }
    const firstRender = previousPathRef.current === null;
    previousPathRef.current = pathname;
    const timeline = gsap.timeline();
    if (firstRender) {
      timeline.fromTo(main, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.68, ease: 'power3.out' });
    } else {
      timeline
        .set(overlay, { autoAlpha: 1 })
        .set(panels, { scaleY: 0, transformOrigin: 'bottom' })
        .to(panels, { scaleY: 1, duration: 0.28, stagger: 0.035, ease: 'power3.in' })
        .set(main, { opacity: 0, y: 24 })
        .set(panels, { transformOrigin: 'top' })
        .to(panels, { scaleY: 0, duration: 0.38, stagger: 0.04, ease: 'power3.out' })
        .to(main, { opacity: 1, y: 0, duration: 0.52, ease: 'power3.out' }, '<0.08')
        .set(overlay, { autoAlpha: 0 });
    }
    return () => { timeline.kill(); };
  }, [pathname]);

  useLayoutEffect(() => {
    const handleInternalNavigation = (event: globalThis.MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
      if (!target || target.target || target.hasAttribute('download')) return;
      const href = target.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      const destination = new URL(target.href, window.location.href);
      if (destination.origin !== window.location.origin || (destination.pathname === window.location.pathname && destination.hash)) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const overlay = routeOverlayRef.current;
      if (!overlay) return;
      event.preventDefault();
      setMenuOpen(false);
      const panels = overlay.querySelectorAll('.route-transition-panel');
      gsap.timeline({ onComplete: () => window.location.assign(destination.href) })
        .set(overlay, { autoAlpha: 1 })
        .set(panels, { scaleY: 0, transformOrigin: 'bottom' })
        .to(panels, { scaleY: 1, duration: 0.3, stagger: 0.04, ease: 'power3.in' });
    };
    document.addEventListener('click', handleInternalNavigation);
    return () => document.removeEventListener('click', handleInternalNavigation);
  }, []);

  const changeTheme = (event: MouseEvent<HTMLButtonElement>) => {
    const nextLightMode = !lightMode;
    const nextTheme: Theme = nextLightMode ? 'light' : 'dark';
    const overlay = fluidRef.current;
    if (!overlay || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      applyTheme(nextTheme);
      return;
    }
    if (themeAnimatingRef.current) return;
    themeAnimatingRef.current = true;
    const bounds = event.currentTarget.getBoundingClientRect();
    const originX = bounds.left + bounds.width / 2;
    const originY = bounds.top + bounds.height / 2;
    const radius = Math.hypot(Math.max(originX, window.innerWidth - originX), Math.max(originY, window.innerHeight - originY)) * 1.18;
    const circles = overlay.querySelectorAll<SVGCircleElement>('.theme-fluid-blob');
    const rootStyles = getComputedStyle(document.documentElement);
    overlay.style.setProperty('--fluid-color', rootStyles.getPropertyValue(nextLightMode ? '--theme-light-bg' : '--theme-dark-bg').trim());
    circles.forEach((circle) => {
      circle.setAttribute('cx', String(originX));
      circle.setAttribute('cy', String(originY));
    });
    const offsets = [[0, 0], [-52, 32], [48, -46], [76, 61], [-83, -58]];
    const timeline = gsap.timeline({ onComplete: () => { themeAnimatingRef.current = false; } });
    timeline
      .set(overlay, { autoAlpha: 1 })
      .set(circles, { attr: { r: 0 }, x: 0, y: 0 })
      .to(circles, {
        attr: { r: radius },
        x: (index) => offsets[index]?.[0] || 0,
        y: (index) => offsets[index]?.[1] || 0,
        duration: 0.92,
        stagger: 0.035,
        ease: 'power3.inOut',
      })
      .call(() => applyTheme(nextTheme), [], 0.5)
      .to(overlay, { autoAlpha: 0, duration: 0.34, ease: 'power2.out' }, 0.92)
      .set(circles, { attr: { r: 0 }, x: 0, y: 0 });
  };

  return (
    <div className={lightMode ? 'site-root light-mode' : 'site-root'} lang={locale} data-theme={lightMode ? 'light' : 'dark'} suppressHydrationWarning>
      <AmbientFlow />
      <div className="route-transition" ref={routeOverlayRef} aria-hidden="true">
        <i className="route-transition-panel" /><i className="route-transition-panel" /><i className="route-transition-panel" /><i className="route-transition-panel" />
      </div>
      <div className="theme-fluid-transition" ref={fluidRef} aria-hidden="true">
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <filter id="theme-fluid-filter" x="-35%" y="-35%" width="170%" height="170%">
              <feTurbulence type="fractalNoise" baseFrequency="0.008 0.014" numOctaves="2" seed="19" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="46" xChannelSelector="R" yChannelSelector="B" />
            </filter>
          </defs>
          <g filter="url(#theme-fluid-filter)">
            {Array.from({ length: 5 }, (_, index) => <circle className="theme-fluid-blob" key={index} r="0" />)}
          </g>
        </svg>
      </div>
      <header className="site-header">
        <a className="wordmark" href={localePath(locale)} onClick={() => setMenuOpen(false)}>
          <img className="wordmark-avatar" src="/media/photo.webp" alt="" />
          <span>{profile.shortName}<i>.</i></span>
        </a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen((value) => !value)}>
          <span /> <span /> <span /> <b>Menu</b>
        </button>
        <nav id="main-nav" className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label={copy.nav.home}>
          {navItems.map((item) => <a key={item.href} className={pathname === item.href ? 'is-active' : ''} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
          <a href="#contact" onClick={() => setMenuOpen(false)}>{copy.nav.contact}</a>
        </nav>
        <nav className="locale-nav" aria-label="Language selector">{locales.map((item) => <a className={item === locale ? 'is-active' : ''} href={localePath(item, pathTail)} key={item}>{item.toUpperCase()}</a>)}</nav>
        <button className="mode-toggle" type="button" aria-pressed={lightMode} aria-label={`${chrome.theme} · ${lightMode ? chrome.dark : chrome.light}`} title={lightMode ? chrome.dark : chrome.light} onClick={changeTheme}>
          <span aria-hidden="true">{lightMode ? '☼' : '◐'}</span>
        </button>
      </header>
      <main ref={mainRef}>{children}</main>
      <CherifChat locale={locale} />
      <footer id="contact" className="site-footer">
        <div className="footer-heading">
          <div className="footer-identity"><img src="/media/photo.webp" alt="" /><span><b>{profile.shortName}</b><small>{profile.role}</small></span></div>
          <span className="eyebrow">{copy.footer.eyebrow}</span>
          <h2>{copy.footer.title}</h2>
          <a className="footer-primary-link" href={`mailto:${profile.email}`}>{profile.email}<span aria-hidden="true">↗</span></a>
        </div>
        <div className="footer-directory">
          <div><span>{chrome.explore}</span>{navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</div>
          <div><span>{chrome.direct}</span><a href={`mailto:${profile.email}`}>{profile.email}</a><a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a></div>
          <div><span>{chrome.socials}</span><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
          <div><span>{chrome.location}</span><strong>{profile.location}</strong><small>UTC +00:00</small><small>{copy.home.availability}</small></div>
        </div>
        <div className="footer-signal" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
        <div className="footer-bottom"><small>© {new Date().getFullYear()} {profile.name}</small><b>{chrome.close}</b><small>{copy.footer.languages}</small></div>
      </footer>
    </div>
  );
}

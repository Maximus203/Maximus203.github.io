import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/site-shell';
import { isLocale, locales, type Locale } from '@/lib/i18n';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '../../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://cherif-diouf.artist-dev.com'),
  title: 'Cherif Diouf — Ingénieur Full-Stack & Formateur',
  description: 'Portfolio public de Cherif Diouf : systèmes utiles, automatisation, IA et transmission.',
  icons: {
    icon: [{ url: '/media/photo.webp', type: 'image/webp' }],
    shortcut: ['/media/photo.webp'],
    apple: [{ url: '/media/photo.webp' }],
  },
  openGraph: { images: ['/media/photo.webp'], siteName: 'Cherif Diouf' },
};

export function generateStaticParams() { return locales.map((lang) => ({ lang })); }

const themeBootstrap = `(function(){try{var key='cherif-portfolio-theme';var saved=localStorage.getItem(key);var theme=saved==='light'||saved==='dark'?saved:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.portfolioTheme=theme;document.documentElement.style.colorScheme=theme;}catch(error){document.documentElement.dataset.portfolioTheme='dark';}})();`;
const themeRootSync = `(function(){var theme=document.documentElement.dataset.portfolioTheme==='light'?'light':'dark';var root=document.querySelector('.site-root');if(root){root.setAttribute('data-theme',theme);root.classList.toggle('light-mode',theme==='light');}})();`;

export default async function LanguageLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <html lang={lang} data-scroll-behavior="smooth" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeBootstrap }} /></head><body><SiteShell locale={lang as Locale}>{children}</SiteShell><script dangerouslySetInnerHTML={{ __html: themeRootSync }} /></body></html>;
}

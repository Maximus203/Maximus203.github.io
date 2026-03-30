import type { Metadata } from 'next';
import { SUPPORTED_LANGUAGES } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/metadata';
import type { Language } from '@/types';
import HomePageClient from './HomePageClient';

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildPageMetadata(lang as Language, '/', 'seoHomeTitle', 'seoHomeDesc');
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <HomePageClient lang={lang as Language} />;
}

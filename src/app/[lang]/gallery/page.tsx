import type { Metadata } from 'next';
import { SUPPORTED_LANGUAGES } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/metadata';
import type { Language } from '@/types';
import GalleryPageClient from './GalleryPageClient';

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildPageMetadata(lang as Language, '/gallery/', 'seoGalleryTitle', 'seoGalleryDesc');
}

export default async function GalleryPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <GalleryPageClient lang={lang as Language} />;
}

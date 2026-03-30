import type { Metadata } from 'next';
import { SUPPORTED_LANGUAGES } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/metadata';
import { UI_LABELS } from '@/lib/constants/ui-labels';
import type { Language } from '@/types';
import ImageConverterClient from './ImageConverterClient';

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const labels = UI_LABELS[lang as Language];
  return buildPageMetadata(
    lang as Language,
    '/tools/image-converter/',
    'seoToolsTitle',
    'toolConverterDesc',
    { title: `${labels.toolConverter} | Cherif Diouf` },
  );
}

export default async function ImageConverterPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <ImageConverterClient lang={lang as Language} />;
}

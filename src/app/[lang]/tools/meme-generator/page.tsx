import type { Metadata } from 'next';
import { SUPPORTED_LANGUAGES } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/metadata';
import { UI_LABELS } from '@/lib/constants/ui-labels';
import type { Language } from '@/types';
import MemeGeneratorClient from './MemeGeneratorClient';

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const labels = UI_LABELS[lang as Language];
  return buildPageMetadata(
    lang as Language,
    '/tools/meme-generator/',
    'seoToolsTitle',
    'toolMemeDesc',
    { title: `${labels.toolMeme} | Cherif Diouf` },
  );
}

export default async function MemeGeneratorPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <MemeGeneratorClient lang={lang as Language} />;
}

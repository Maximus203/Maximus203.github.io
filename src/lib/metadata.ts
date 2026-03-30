import type { Metadata } from 'next';
import type { Language } from '@/types';
import { UI_LABELS } from '@/lib/constants/ui-labels';
import { SUPPORTED_LANGUAGES } from '@/lib/i18n';

const BASE_URL = 'https://maximus203.github.io';

const LOCALE_MAP: Record<Language, string> = {
  fr: 'fr_FR',
  en: 'en_US',
  zh: 'zh_CN',
  ja: 'ja_JP',
};

function buildAlternates(lang: Language, path: string) {
  const languages: Record<string, string> = {};
  for (const l of SUPPORTED_LANGUAGES) {
    languages[l] = `${BASE_URL}/${l}${path}`;
  }
  return {
    canonical: `${BASE_URL}/${lang}${path}`,
    languages,
  };
}

export function buildPageMetadata(
  lang: Language,
  path: string,
  titleKey: string,
  descKey: string,
  overrides?: { title?: string; description?: string },
): Metadata {
  const labels = UI_LABELS[lang];
  const title = overrides?.title || labels[titleKey] || titleKey;
  const description = overrides?.description || labels[descKey] || descKey;

  return {
    title,
    description,
    keywords: 'Cherif Diouf, Full-Stack Developer, Laravel, React, TypeScript, DevOps, Portfolio',
    authors: [{ name: 'El Hadji Ahmadou Cherif Diouf' }],
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}${path}`,
      siteName: 'Cherif Diouf Portfolio',
      images: [{ url: `${BASE_URL}/assets/photo.webp`, alt: 'Cherif Diouf' }],
      locale: LOCALE_MAP[lang],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/assets/photo.webp`],
      creator: '@Maximus203',
    },
    alternates: buildAlternates(lang, path),
  };
}

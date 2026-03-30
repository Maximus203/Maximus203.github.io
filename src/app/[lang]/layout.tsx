import { notFound } from 'next/navigation';
import { SUPPORTED_LANGUAGES } from '@/lib/i18n';
import { LangLayoutClient } from './LangLayoutClient';
import type { Language } from '@/types';

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!SUPPORTED_LANGUAGES.includes(lang as Language)) {
    notFound();
  }

  return <LangLayoutClient lang={lang as Language}>{children}</LangLayoutClient>;
}

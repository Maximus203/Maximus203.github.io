import type { Metadata } from 'next';
import { SUPPORTED_LANGUAGES } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/metadata';
import type { Language } from '@/types';
import StudentsPageClient from './StudentsPageClient';

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildPageMetadata(lang as Language, '/students/', 'seoStudentsTitle', 'seoStudentsDesc');
}

export default async function StudentsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <StudentsPageClient lang={lang as Language} />;
}

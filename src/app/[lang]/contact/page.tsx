import type { Metadata } from 'next';
import { SUPPORTED_LANGUAGES } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/metadata';
import type { Language } from '@/types';
import ContactPageClient from './ContactPageClient';

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildPageMetadata(lang as Language, '/contact/', 'submitProjectTitle', 'submitProjectDesc');
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <ContactPageClient lang={lang as Language} />;
}

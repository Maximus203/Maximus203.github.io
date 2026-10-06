import type { Metadata } from 'next';
import { MemeGenerator } from '@/components/applications/meme-generator';
import { ApplicationFrame } from '@/components/applications/application-frame';
import { getApplicationCopy } from '@/lib/applications/catalog';
import { isLocale, languageAlternates, localePath } from '@/lib/i18n';
type Params = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params; const locale = isLocale(lang) ? lang : 'fr'; const copy = getApplicationCopy(locale).apps['meme-generator']; const path = '/applications/meme-generator';
  return { title: `${copy.name} — Cherif Diouf`, description: copy.description, alternates: { canonical: localePath(locale, path), languages: languageAlternates(path) } };
}
export default async function ApplicationPage({ params }: Params) {
  const { lang } = await params; const locale = isLocale(lang) ? lang : 'fr';
  return <ApplicationFrame locale={locale} id="meme-generator"><MemeGenerator locale={locale} /></ApplicationFrame>;
}

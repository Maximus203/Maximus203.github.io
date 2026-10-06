import type { Metadata } from 'next';
import { ApplicationHub } from '@/components/applications/application-hub';
import { getApplicationCopy } from '@/lib/applications/catalog';
import { isLocale, languageAlternates, localePath } from '@/lib/i18n';
type Params = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params; const locale = isLocale(lang) ? lang : 'fr'; const copy = getApplicationCopy(locale);
  return { title: `${copy.label} — Cherif Diouf`, description: copy.subtitle, alternates: { canonical: localePath(locale, '/applications'), languages: languageAlternates('/applications') } };
}
export default async function ApplicationsPage({ params }: Params) {
  const { lang } = await params; const locale = isLocale(lang) ? lang : 'fr'; const copy = getApplicationCopy(locale);
  return <div className="content-page applications-page"><header className="applications-intro"><span className="eyebrow">{copy.eyebrow}</span><h1>{copy.title}</h1><p>{copy.subtitle}</p></header><ApplicationHub locale={locale} /></div>;
}

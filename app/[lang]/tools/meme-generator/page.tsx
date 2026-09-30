import type { Metadata } from 'next';
import { MemeGeneratorTool } from '@/components/tool-workbench';
import { PageIntro } from '@/components/page-intro';
import { getDictionary, isLocale, languageAlternates, localePath, type Locale } from '@/lib/i18n';
type Params = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Params): Promise<Metadata> { const { lang } = await params; const locale = isLocale(lang) ? lang : 'fr'; const path = '/tools/meme-generator'; const [title, description] = getDictionary(locale).seo.meme; return { title, description, alternates: { canonical: localePath(locale, path), languages: languageAlternates(path) }, openGraph: { title, description, url: localePath(locale, path) } }; }
export default async function MemeGeneratorPage({ params }: Params) { const { lang } = await params; const locale: Locale = isLocale(lang) ? lang : 'fr'; const copy = getDictionary(locale).meme; return <div className="content-page tool-page"><PageIntro index="02" kicker={copy.kicker} title={copy.title} text={copy.text} /><MemeGeneratorTool locale={locale} /></div>; }

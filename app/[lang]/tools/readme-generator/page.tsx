import type { Metadata } from 'next';
import { ReadmeGeneratorTool } from '@/components/tool-workbench';
import { PageIntro } from '@/components/page-intro';
import { getDictionary, isLocale, languageAlternates, localePath, type Locale } from '@/lib/i18n';
import { assetUrl } from '@/lib/assets';
type Params = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Params): Promise<Metadata> { const { lang } = await params; const locale = isLocale(lang) ? lang : 'fr'; const path = '/tools/readme-generator'; const [title, description] = getDictionary(locale).seo.readme; return { title, description, alternates: { canonical: localePath(locale, path), languages: languageAlternates(path) }, openGraph: { title, description, url: localePath(locale, path) } }; }
export default async function ReadmeGeneratorPage({ params }: Params) { const { lang } = await params; const locale: Locale = isLocale(lang) ? lang : 'fr'; const copy = getDictionary(locale).readme; return <div className="content-page tool-page"><PageIntro index="02" kicker={copy.kicker} title={copy.title} text={copy.text} /><figure className="tool-context-image"><img src={assetUrl('/media/project-placeholder.svg')} alt="Aperçu non disponible du générateur de README" /><figcaption>{locale === 'fr' ? 'Aperçu non disponible · outil local' : 'Preview unavailable · local tool'}</figcaption></figure><ReadmeGeneratorTool locale={locale} /></div>; }

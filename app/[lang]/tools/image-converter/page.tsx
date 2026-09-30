import type { Metadata } from 'next';
import { ImageConverterTool } from '@/components/tool-workbench';
import { PageIntro } from '@/components/page-intro';
import { getDictionary, isLocale, languageAlternates, localePath, type Locale } from '@/lib/i18n';
import { assetUrl } from '@/lib/assets';
type Params = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Params): Promise<Metadata> { const { lang } = await params; const locale = isLocale(lang) ? lang : 'fr'; const path = '/tools/image-converter'; const [title, description] = getDictionary(locale).seo.image; return { title, description, alternates: { canonical: localePath(locale, path), languages: languageAlternates(path) }, openGraph: { title, description, url: localePath(locale, path), images: [assetUrl('/media/previews/image-converter.webp')] } }; }
export default async function ImageConverterPage({ params }: Params) { const { lang } = await params; const locale: Locale = isLocale(lang) ? lang : 'fr'; const copy = getDictionary(locale).image; return <div className="content-page tool-page"><PageIntro index="02" kicker={copy.kicker} title={copy.title} text={copy.text} /><figure className="tool-context-image"><img src={assetUrl('/media/previews/image-converter.webp')} alt="Aperçu réel de l’outil Image Converter" /><figcaption>{copy.caption}</figcaption></figure><ImageConverterTool locale={locale} /></div>; }

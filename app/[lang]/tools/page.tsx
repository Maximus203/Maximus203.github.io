import type { Metadata } from 'next';
import Image from 'next/image';
import { PageIntro } from '@/components/page-intro';
import { tools } from '@/lib/site-data';
import { getDictionary, isLocale, languageAlternates, localePath, type Locale } from '@/lib/i18n';
import { assetUrl } from '@/lib/assets';

type Params = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params; const locale = isLocale(lang) ? lang : 'fr'; const [title, description] = getDictionary(locale).seo.tools;
  return { title, description, alternates: { canonical: localePath(locale, '/tools'), languages: languageAlternates('/tools') }, openGraph: { title, description, url: localePath(locale, '/tools'), images: [assetUrl('/media/previews/image-converter.webp')] } };
}
export default async function ToolsPage({ params }: Params) {
  const { lang } = await params; const locale: Locale = isLocale(lang) ? lang : 'fr'; const copy = getDictionary(locale).tools;
  const cardCopy = [copy.cards.image, copy.cards.meme, copy.cards.readme];
  return <div className="content-page"><PageIntro index="01" kicker={copy.kicker} title={copy.title} text={copy.text} /><div className="tool-cards">{tools.map((tool, index) => <a href={localePath(locale, `/tools/${tool.slug}`)} className="tool-card" key={tool.slug}><div className={`tool-image ${tool.image.includes('project-placeholder') ? 'is-placeholder' : ''}`}><Image src={tool.image} alt={`${cardCopy[index][0]} preview`} fill sizes="(max-width: 780px) 100vw, 33vw" /></div><span>0{index + 1} / {copy.local}</span><h2>{cardCopy[index][0]}</h2><p>{cardCopy[index][1]}</p><b>{copy.open} ↗</b></a>)}</div></div>;
}

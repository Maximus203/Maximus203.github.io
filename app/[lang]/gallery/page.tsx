import type { Metadata } from 'next';
import { GalleryGrid } from '@/components/gallery-grid';
import { PageIntro } from '@/components/page-intro';
import { getDictionary, isLocale, languageAlternates, localePath, type Locale } from '@/lib/i18n';
import { assetUrl } from '@/lib/assets';

type Params = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params; const locale = isLocale(lang) ? lang : 'fr'; const [title, description] = getDictionary(locale).seo.gallery;
  return { title, description, alternates: { canonical: localePath(locale, '/gallery'), languages: languageAlternates('/gallery') }, openGraph: { title, description, url: localePath(locale, '/gallery'), images: [assetUrl('/media/galerie/devfest-1.webp')] } };
}
export default async function GalleryPage({ params }: Params) {
  const { lang } = await params; const locale: Locale = isLocale(lang) ? lang : 'fr'; const copy = getDictionary(locale).gallery;
  return <div className="content-page"><PageIntro index="01" kicker={copy.kicker} title={copy.title} text={copy.text} /><GalleryGrid locale={locale} /></div>;
}

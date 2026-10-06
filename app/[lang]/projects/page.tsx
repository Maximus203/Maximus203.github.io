import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { ProjectCard } from '@/components/project-card';
import { getPortfolioData } from '@/lib/portfolio-content';
import { getDictionary, isLocale, languageAlternates, localePath, type Locale } from '@/lib/i18n';
import { assetUrl } from '@/lib/assets';

type Params = { params: Promise<{ lang: string }> };

const pageCopy = {
  fr: ['Catalogue / réalisations', 'Des applications, des projets clients et des outils pour transmettre.', 'Logiciels publics, projets en production et travaux présentés dans le CV. Chaque carte distingue les liens disponibles, les démonstrations et les projets sans aperçu public.'],
  en: ['Catalogue / work', 'Applications, client projects and tools for teaching.', 'Public software, live client projects and work listed in the CV. Each card identifies available links, demonstrations and projects without public previews.'],
  zh: ['目录 / 作品', '应用、客户项目与教学工具。', '公开软件、已上线的客户项目及简历中的作品。每张卡片注明可用链接、演示或暂无公开预览的状态。'],
  ja: ['カタログ / 実績', 'アプリケーション、クライアント案件、学びのためのツール。', '公開ソフトウェア、運用中の案件、履歴書に掲載した制作物。リンクやデモの有無、公開プレビューのないプロジェクトを各カードに明記しています。'],
} as const;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'fr';
  const [title, description] = getDictionary(locale).seo.projects;
  return { title, description, alternates: { canonical: localePath(locale, '/projects'), languages: languageAlternates('/projects') }, openGraph: { title, description, url: localePath(locale, '/projects'), images: [assetUrl('/media/generated/murabbi-landing-demo.gif')] } };
}

export default async function ProjectsPage({ params }: Params) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'fr';
  const [kicker, title, text] = pageCopy[locale];
  const { projects } = getPortfolioData(locale);
  return <div className="content-page projects-page"><PageIntro index="01" kicker={kicker} title={title} text={text} /><div className="projects-grid">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} locale={locale} />)}</div></div>;
}

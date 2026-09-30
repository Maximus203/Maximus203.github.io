import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { ProjectCard } from '@/components/project-card';
import { projects } from '@/lib/site-data';
import { getDictionary, isLocale, languageAlternates, localePath, type Locale } from '@/lib/i18n';

type Params = { params: Promise<{ lang: string }> };

const pageCopy = {
  fr: ['Catalogue / preuves', 'Des projets publics, des systèmes privés et des démonstrations vérifiées.', 'Chaque carte précise la nature de sa preuve : dépôt public, démo enregistrée, référence historique ou schéma d’architecture sans secret.'],
  en: ['Catalogue / evidence', 'Public projects, private systems and verified demonstrations.', 'Each card names its evidence: public repository, recorded demo, historical reference or architecture diagram with no secrets.'],
  zh: ['目录 / 证据', '公开项目、私有系统与经过验证的演示。', '每张卡片都说明证据类型：公开仓库、录制演示、历史资料或不包含机密的架构图。'],
  ja: ['カタログ / 証拠', '公開プロジェクト、非公開システム、検証済みデモ。', '各カードに、公開リポジトリ、録画デモ、過去の資料、機密を含まない構成図の別を明記しています。'],
} as const;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'fr';
  const [title, description] = getDictionary(locale).seo.projects;
  return { title, description, alternates: { canonical: localePath(locale, '/projects'), languages: languageAlternates('/projects') }, openGraph: { title, description, url: localePath(locale, '/projects'), images: ['/media/generated/murabbi-landing-demo.gif'] } };
}

export default async function ProjectsPage({ params }: Params) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'fr';
  const [kicker, title, text] = pageCopy[locale];
  return <div className="content-page projects-page"><PageIntro index="01" kicker={kicker} title={title} text={text} /><div className="projects-grid">{projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}</div></div>;
}

import type { Metadata } from 'next';
import type { Language } from '@/types';
import { UI_LABELS } from '@/lib/constants/ui-labels';
import { SUPPORTED_LANGUAGES } from '@/lib/i18n';

const BASE_URL = 'https://cherif-diouf.artist-dev.com';

const LOCALE_MAP: Record<Language, string> = {
  fr: 'fr_FR',
  en: 'en_US',
  zh: 'zh_CN',
  ja: 'ja_JP',
};

/**
 * Keywords exhaustifs par langue.
 * Couvrent : identité, métiers, technologies, géographie.
 */
const KEYWORDS: Record<Language, string> = {
  fr: [
    'Cherif Diouf', 'El Hadji Ahmadou Cherif Diouf', 'Ahmadou Cherif Diouf',
    'développeur full-stack', 'ingénieur logiciel', 'développeur web', 'développeur mobile',
    'développement application web', 'développement application mobile',
    'expert en digitalisation', 'consultant digital', 'transformation numérique',
    'prompt engineering', 'prompt ingénieur', 'intelligence artificielle appliquée',
    'formateur développement web', 'formateur informatique',
    'Laravel', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'PHP', 'Node.js',
    'Supabase', 'Firebase', 'Directus', 'Docker', 'DevOps', 'CI/CD',
    'MySQL', 'PostgreSQL', 'MongoDB', 'Tailwind CSS', 'Spring Boot',
    'développeur Sénégal', 'développeur Dakar', 'ingénieur Sénégal',
    'Dakar', 'Keur Massar', 'Sénégal', 'Afrique de l\'Ouest', 'TérangaDev',
    'portfolio développeur', 'portfolio ingénieur', 'freelance développeur',
  ].join(', '),

  en: [
    'Cherif Diouf', 'El Hadji Ahmadou Cherif Diouf', 'Ahmadou Cherif Diouf',
    'full-stack developer', 'software engineer', 'web developer', 'mobile developer',
    'web application development', 'mobile application development',
    'digitalization expert', 'digital consultant', 'digital transformation',
    'prompt engineering', 'prompt engineer', 'applied artificial intelligence',
    'web development trainer', 'IT trainer',
    'Laravel', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'PHP', 'Node.js',
    'Supabase', 'Firebase', 'Directus', 'Docker', 'DevOps', 'CI/CD',
    'MySQL', 'PostgreSQL', 'MongoDB', 'Tailwind CSS', 'Spring Boot',
    'Senegal developer', 'Dakar developer', 'Senegal engineer',
    'Dakar', 'Senegal', 'West Africa', 'TérangaDev',
    'developer portfolio', 'engineer portfolio', 'freelance developer',
  ].join(', '),

  zh: [
    'Cherif Diouf', 'El Hadji Ahmadou Cherif Diouf', 'Ahmadou Cherif Diouf',
    '全栈开发者', '软件工程师', 'Web开发者', '移动应用开发者',
    '数字化专家', '数字化转型', '提示工程', '人工智能应用',
    'Web开发培训师', 'Laravel', 'React', 'Next.js', 'TypeScript', 'PHP',
    'Supabase', 'Firebase', 'Docker', 'DevOps',
    '塞内加尔开发者', '达喀尔', '非洲开发者', 'TérangaDev', '开发者作品集',
  ].join(', '),

  ja: [
    'Cherif Diouf', 'El Hadji Ahmadou Cherif Diouf', 'Ahmadou Cherif Diouf',
    'フルスタック開発者', 'ソフトウェアエンジニア', 'Webデベロッパー', 'モバイルアプリ開発者',
    'デジタル化専門家', 'デジタルトランスフォーメーション', 'プロンプトエンジニアリング', 'AI応用',
    'Web開発講師', 'Laravel', 'React', 'Next.js', 'TypeScript', 'PHP',
    'Supabase', 'Firebase', 'Docker', 'DevOps',
    'セネガル開発者', 'ダカール', 'アフリカ開発者', 'TérangaDev', '開発者ポートフォリオ',
  ].join(', '),
};

function buildAlternates(lang: Language, path: string) {
  const languages: Record<string, string> = {};
  for (const l of SUPPORTED_LANGUAGES) {
    languages[l] = `${BASE_URL}/${l}${path}`;
  }
  return {
    canonical: `${BASE_URL}/${lang}${path}`,
    languages,
  };
}

export function buildPageMetadata(
  lang: Language,
  path: string,
  titleKey: string,
  descKey: string,
  overrides?: { title?: string; description?: string },
): Metadata {
  const labels = UI_LABELS[lang];
  const title = overrides?.title || labels[titleKey] || titleKey;
  const description = overrides?.description || labels[descKey] || descKey;
  const ogImage = `${BASE_URL}/assets/photo-2.webp`;

  return {
    title,
    description,
    keywords: KEYWORDS[lang],
    authors: [{ name: 'El Hadji Ahmadou Cherif Diouf', url: `${BASE_URL}/${lang}/` }],
    creator: 'El Hadji Ahmadou Cherif Diouf',
    publisher: 'El Hadji Ahmadou Cherif Diouf',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}${path}`,
      siteName: 'Cherif Diouf – Portfolio',
      images: [
        {
          url: ogImage,
          width: 800,
          height: 800,
          alt: 'El Hadji Ahmadou Cherif Diouf – Développeur Full-Stack & Expert Digitalisation',
        },
      ],
      locale: LOCALE_MAP[lang],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@Maximus203',
      site: '@Maximus203',
    },
    alternates: buildAlternates(lang, path),
  };
}

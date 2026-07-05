import { notFound } from 'next/navigation';
import { SUPPORTED_LANGUAGES } from '@/lib/i18n';
import { LangLayoutClient } from './LangLayoutClient';
import type { Language } from '@/types';

const SITE_URL = 'https://cherif-diouf.artist-dev.com';

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!SUPPORTED_LANGUAGES.includes(lang as Language)) {
    notFound();
  }

  const localeUrl = `${SITE_URL}/${lang}/`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            '@id': `${SITE_URL}/#person`,
            name: 'El Hadji Ahmadou Cherif Diouf',
            alternateName: ['Cherif Diouf', 'Ahmadou Cherif Diouf'],
            url: localeUrl,
            image: `${SITE_URL}/assets/photo-2.webp`,
            description:
              'Expert en digitalisation et développeur Full-Stack (Laravel, React, Supabase, Next.js). Formateur en développement web et mobile au Sénégal. Doctorant en Sciences Techniques et Numériques. Spécialisé en prompt engineering et IA appliquée.',
            jobTitle: [
              'Ingénieur Full-Stack',
              'Expert en Digitalisation',
              'Formateur en Développement Web',
              'Prompt Engineer',
            ],
            worksFor: {
              '@type': 'Organization',
              name: 'TérangaDev',
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Dakar',
              addressRegion: 'Keur Massar',
              addressCountry: 'SN',
            },
            email: 'el.hadji.ahmadou.cherif.diouf@gmail.com',
            telephone: '+221773162727',
            nationality: { '@type': 'Country', name: 'Senegal' },
            sameAs: ['https://github.com/Maximus203', 'https://linkedin.com/in/cherif-diouf-59747b17b'],
            knowsAbout: [
              'Développement Web Full-Stack',
              "Développement d'Applications Mobiles",
              "Digitalisation d'Entreprise",
              'Transformation Numérique',
              'Prompt Engineering',
              'Intelligence Artificielle Appliquée',
              'Laravel',
              'React',
              'Next.js',
              'TypeScript',
              'JavaScript',
              'PHP',
              'Node.js',
              'Supabase',
              'Firebase',
              'Directus',
              'Docker',
              'DevOps',
              'CI/CD',
              'Git',
              'MySQL',
              'PostgreSQL',
              'MongoDB',
              'Formation Développement Web',
            ],
            hasCredential: [
              {
                '@type': 'EducationalOccupationalCredential',
                name: 'Doctorat en Sciences Techniques et Numériques',
                credentialCategory: 'degree',
                educationalLevel: 'Doctorate',
                recognizedBy: { '@type': 'CollegeOrUniversity', name: 'UN-CHK' },
              },
              {
                '@type': 'EducationalOccupationalCredential',
                name: 'Master Génie Logiciel et Admin Réseaux',
                credentialCategory: 'degree',
                educationalLevel: 'Master',
                recognizedBy: { '@type': 'CollegeOrUniversity', name: 'ESTM' },
              },
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: localeUrl,
            name: 'Cherif Diouf – Portfolio',
            description:
              'Portfolio professionnel de El Hadji Ahmadou Cherif Diouf. Développeur Full-Stack, expert digitalisation, formateur web et prompt engineer au Sénégal.',
            inLanguage: ['fr', 'en', 'zh', 'ja'],
            author: { '@id': `${SITE_URL}/#person` },
            publisher: { '@id': `${SITE_URL}/#person` },
          }),
        }}
      />

      <LangLayoutClient lang={lang as Language}>{children}</LangLayoutClient>
    </>
  );
}

import { Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import ThemeProvider from '@/components/layout/ThemeProvider';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cherif-diouf.artist-dev.com'),
  icons: {
    icon: '/assets/logo.webp',
    shortcut: '/assets/logo.webp',
    apple: '/assets/logo.webp',
  },
  other: {
    'theme-color': '#4F46E5',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Person schema — identité complète */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              '@id': 'https://cherif-diouf.artist-dev.com/#person',
              name: 'El Hadji Ahmadou Cherif Diouf',
              alternateName: ['Cherif Diouf', 'Ahmadou Cherif Diouf'],
              url: 'https://cherif-diouf.artist-dev.com/fr/',
              image: 'https://cherif-diouf.artist-dev.com/assets/photo-2.webp',
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
              sameAs: [
                'https://github.com/Maximus203',
                'https://linkedin.com/in/cherif-diouf-59747b17b',
              ],
              knowsAbout: [
                'Développement Web Full-Stack',
                'Développement d\'Applications Mobiles',
                'Digitalisation d\'Entreprise',
                'Transformation Numérique',
                'Prompt Engineering',
                'Intelligence Artificielle Appliquée',
                'Laravel', 'React', 'Next.js', 'TypeScript', 'JavaScript',
                'PHP', 'Node.js', 'Supabase', 'Firebase', 'Directus',
                'Docker', 'DevOps', 'CI/CD', 'Git',
                'MySQL', 'PostgreSQL', 'MongoDB',
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

        {/* WebSite schema — structure du site */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': 'https://cherif-diouf.artist-dev.com/#website',
              url: 'https://cherif-diouf.artist-dev.com/fr/',
              name: 'Cherif Diouf – Portfolio',
              description:
                'Portfolio professionnel de El Hadji Ahmadou Cherif Diouf. Développeur Full-Stack, expert digitalisation, formateur web et prompt engineer au Sénégal.',
              inLanguage: ['fr', 'en', 'zh', 'ja'],
              author: { '@id': 'https://cherif-diouf.artist-dev.com/#person' },
              publisher: { '@id': 'https://cherif-diouf.artist-dev.com/#person' },
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://cherif-diouf.artist-dev.com/fr/?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

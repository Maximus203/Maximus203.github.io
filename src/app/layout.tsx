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
  metadataBase: new URL('https://maximus203.github.io'),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'El Hadji Ahmadou Cherif Diouf',
              alternateName: 'Cherif Diouf',
              url: 'https://maximus203.github.io/',
              image: 'https://maximus203.github.io/assets/photo.webp',
              jobTitle: 'Ingénieur Full-Stack & Formateur',
              worksFor: { '@type': 'Organization', name: 'ESCOA' },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Dakar',
                addressRegion: 'Keur Massar',
                addressCountry: 'SN',
              },
              email: 'el.hadji.ahmadou.cherif.diouf@gmail.com',
              sameAs: [
                'https://github.com/Maximus203',
                'https://linkedin.com/in/cherif-diouf-59747b17b',
              ],
              knowsAbout: ['Laravel', 'React', 'TypeScript', 'DevOps', 'PHP', 'JavaScript', 'Docker', 'Git'],
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

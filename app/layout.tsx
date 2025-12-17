import { ThemeProvider } from '@/components/theme-provider'
import portfolioData from '@/data/portfolioData.json'
import type { Metadata } from 'next'
import { Fira_Code, Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
 subsets: ['latin'],
 variable: '--font-inter',
 display: 'swap',
})

const firaCode = Fira_Code({
 subsets: ['latin'],
 variable: '--font-fira-code',
 display: 'swap',
})

export const metadata: Metadata = {
 title: 'Cherif Diouf | Développeur Full-Stack',
 description: portfolioData.profile.description,
 keywords: 'Cherif Diouf, développeur, Full Stack, ingénieur logiciel, React, Laravel, TypeScript, Next.js',
 authors: [{ name: 'Cherif Diouf', url: portfolioData.profile.website }],
 creator: 'Cherif Diouf',
 publisher: 'Cherif Diouf',
 formatDetection: {
  email: false,
  address: false,
  telephone: false,
 },
 metadataBase: new URL('https://cherif-diouf.artist-dev.com'),
 alternates: {
  canonical: '/',
 },
 openGraph: {
  type: 'website',
  locale: 'fr_FR',
  url: 'https://cherif-diouf.artist-dev.com',
  title: 'Cherif Diouf | Développeur Full-Stack',
  description: portfolioData.profile.description,
  siteName: 'Portfolio Cherif Diouf',
  images: [
   {
    url: '/assets/photo.webp',
    width: 1200,
    height: 630,
    alt: 'Cherif Diouf - Développeur Full-Stack',
   },
  ],
 },
 twitter: {
  card: 'summary_large_image',
  title: 'Cherif Diouf | Développeur Full-Stack',
  description: portfolioData.profile.description,
  images: ['/assets/photo.webp'],
 },
 robots: {
  index: true,
  follow: true,
  googleBot: {
   index: true,
   follow: true,
   'max-video-preview': -1,
   'max-image-preview': 'large',
   'max-snippet': -1,
  },
 },
 verification: {
  google: 'your-google-verification-code',
 },
}

export default function RootLayout({
 children,
}: {
 children: React.ReactNode
}) {
 // JSON-LD structured data
 const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: portfolioData.profile.name,
  url: portfolioData.profile.website,
  image: `https://cherif-diouf.artist-dev.com/${portfolioData.profile.image}`,
  jobTitle: portfolioData.profile.title,
  description: portfolioData.profile.bio,
  email: portfolioData.profile.email,
  address: {
   '@type': 'PostalAddress',
   addressLocality: portfolioData.profile.location,
   addressCountry: 'SN',
  },
  sameAs: Object.values(portfolioData.profile.social).filter(Boolean),
  worksFor: {
   '@type': 'Organization',
   name: 'Hydrautech',
  },
  alumniOf: [
   {
    '@type': 'EducationalOrganization',
    name: 'École Supérieure de Technologie et de Management (ESTM)',
   },
  ],
  knowsAbout: [
   'Développement Web',
   'React',
   'Laravel',
   'TypeScript',
   'Next.js',
   'Node.js',
   'PostgreSQL',
   'MySQL',
   'PHP',
   'JavaScript',
  ],
  hasOccupation: {
   '@type': 'Occupation',
   name: 'Développeur Full-Stack',
   occupationLocation: {
    '@type': 'Place',
    name: 'Dakar, Sénégal',
   },
   skills: portfolioData.skills.frontend.concat(portfolioData.skills.backend).map(skill => skill.name),
  },
 }

 return (
  <html lang="fr" className={`scroll-smooth ${inter.variable} ${firaCode.variable}`}>
   <head>
    <script
     type="application/ld+json"
     dangerouslySetInnerHTML={{
      __html: JSON.stringify(jsonLd),
     }}
    />
    <link
     rel="preload"
     href="/assets/photo.webp"
     as="image"
     type="image/webp"
    />
   </head>
   <body className={`theme-transition ${inter.variable} ${firaCode.variable}`}>
    <ThemeProvider>
     {children}
    </ThemeProvider>
   </body>
  </html>
 )
}
import { Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import ThemeProvider from '@/components/layout/ThemeProvider';
import type { Metadata } from 'next';

const SITE_URL = 'https://cherif-diouf.artist-dev.com';

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
  metadataBase: new URL(SITE_URL),
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
        {process.env.NODE_ENV === 'production' && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'maximus203.github.io'}
            data-api={`${process.env.NEXT_PUBLIC_PLAUSIBLE_API_HOST || 'https://plausible.io'}/api/event`}
            src="https://plausible.io/js/script.manual.js"
          />
        )}
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

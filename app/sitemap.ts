import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';

export const dynamic = 'force-static';

const baseUrl = 'https://cherif-diouf.artist-dev.com';
const paths = ['', '/projects', '/gallery', '/applications', '/applications/file-converter', '/applications/meme-generator', '/applications/readme-generator', '/applications/tic-tac-toe', '/students'];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) => paths.map((path) => ({
    url: `${baseUrl}/${locale}${path}`,
    lastModified: new Date('2026-10-06'),
    changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const,
    priority: path === '' ? 1 : path === '/applications' || path === '/gallery' ? .8 : .7,
  })));
}

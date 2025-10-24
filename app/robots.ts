import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
 return {
  rules: {
   userAgent: '*',
   allow: '/',
   disallow: ['/private/', '/admin/'],
  },
  sitemap: 'https://cherif-diouf.artist-dev.com/sitemap.xml',
 }
}
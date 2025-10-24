import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
 const baseUrl = 'https://cherif-diouf.artist-dev.com'

 return [
  {
   url: baseUrl,
   lastModified: new Date(),
   changeFrequency: 'monthly',
   priority: 1,
  },
  {
   url: `${baseUrl}/#projets`,
   lastModified: new Date(),
   changeFrequency: 'weekly',
   priority: 0.9,
  },
  {
   url: `${baseUrl}/#competences`,
   lastModified: new Date(),
   changeFrequency: 'monthly',
   priority: 0.8,
  },
  {
   url: `${baseUrl}/#experiences`,
   lastModified: new Date(),
   changeFrequency: 'monthly',
   priority: 0.7,
  },
  {
   url: `${baseUrl}/#certifications`,
   lastModified: new Date(),
   changeFrequency: 'monthly',
   priority: 0.6,
  },
 ]
}
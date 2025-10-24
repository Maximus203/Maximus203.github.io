import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cherif Diouf - Portfolio Développeur Full-Stack',
    short_name: 'Cherif Diouf',
    description: 'Portfolio interactif de Cherif Diouf, développeur Full-Stack spécialisé en technologies web modernes.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#4361ee',
    icons: [
      {
        src: '/assets/logo.webp',
        sizes: '192x192',
        type: 'image/webp',
      },
      {
        src: '/assets/logo.webp',
        sizes: '512x512',
        type: 'image/webp',
      },
    ],
    categories: ['business', 'productivity', 'technology'],
    lang: 'fr',
    orientation: 'portrait-primary',
  }
}
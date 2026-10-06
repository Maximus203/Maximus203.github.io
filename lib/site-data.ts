import { assetUrl } from '@/lib/assets';
import { getPortfolioData } from '@/lib/portfolio-content';

export { getPortfolioData } from '@/lib/portfolio-content';
export type { Project, Experience, Education } from '@/lib/portfolio-content';

// Compatibility exports for consumers that still request the French defaults.
export const { profile, experiences, projects, skills, education } = getPortfolioData('fr');

type GalleryCategory = 'Transmission' | 'Communauté' | 'Logiciel libre' | 'Projet';

const series = (title: string, category: GalleryCategory, prefix: string, count: number, alt: string) =>
  Array.from({ length: count }, (_, index) => ({
    title,
    category,
    image: assetUrl(`/media/galerie/${prefix}-${index + 1}.webp`),
    alt: `${alt} — photo ${index + 1} sur ${count}`,
  }));

export const galleryItems = [
  ...series('Graduation ESTM', 'Transmission', 'graduation-estm', 10, 'Remise de diplômes et moments de transmission à l’ESTM'),
  ...series('DevFest Dakar', 'Communauté', 'devfest', 5, 'Cherif Diouf et la communauté technologique au DevFest Dakar'),
  ...series('Laravel Sénégal', 'Communauté', 'laravel-senegal', 5, 'Rencontre de la communauté Laravel Sénégal'),
  ...series('Hacktoberfest Galsen Dev', 'Logiciel libre', 'hacktoberfest', 4, 'Participation à Hacktoberfest avec Galsen Dev'),
  ...series('Atelier ESTM', 'Transmission', 'estm-workshop', 2, 'Atelier et accompagnement des étudiants à l’ESTM'),
  { title: 'Edacy', category: 'Transmission' as const, image: assetUrl('/media/galerie/edacy-2.webp'), alt: 'Cherif Diouf lors d’un moment de transmission avec Edacy' },
];

export const tools = [
  { slug: 'image-converter', title: 'Convertisseur WebP', text: 'Convertir une image en WebP côté navigateur.', image: assetUrl('/media/previews/image-converter.webp') },
  { slug: 'meme-generator', title: 'Générateur de mèmes', text: 'Composer un visuel simple à partir d’un média local.', image: assetUrl('/media/project-placeholder.svg') },
  { slug: 'readme-generator', title: 'Générateur de README', text: 'Structurer rapidement la documentation d’un projet.', image: assetUrl('/media/project-placeholder.svg') },
];

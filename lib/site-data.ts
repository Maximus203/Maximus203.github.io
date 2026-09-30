export type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  live?: string;
  access: string;
};

export const profile = {
  name: 'El Hadji Ahmadou Cherif Diouf',
  shortName: 'Cherif Diouf',
  role: 'Ingénieur Full-Stack · Formateur',
  location: 'Dakar, Keur Massar',
  email: 'el.hadji.ahmadou.cherif.diouf@gmail.com',
  phone: '+221 77 316 27 27',
  github: 'https://github.com/Maximus203',
  linkedin: 'https://www.linkedin.com/in/cherif-diouf-59747b17b/',
  metric: '6 h → 35 min',
  bio: 'Je conçois des systèmes qui font gagner du temps, réduisent les coûts opérationnels et transforment l’expertise en compétences durables.',
};

export const experiences = [
  {
    company: 'TérangaDev',
    role: 'Chef de projet digital',
    period: '2024 — 2026',
    logo: '/media/entreprises/teranga-dev.webp',
    summary: 'Pilotage de projets web et mobiles, specs, Kanban et coordination des équipes techniques et créatives.',
  },
  {
    company: 'FIDECA',
    role: 'Ingénieur Full-Stack · Responsable informatique',
    period: '2024 — 2026',
    logo: '/media/entreprises/fideca.webp',
    summary: 'Générateur d’états financiers avec FastAPI, React et Tauri. Supervision du SI, accès, sauvegardes et sécurité.',
  },
  {
    company: 'Orange — Sonatel',
    role: 'Assistant support performance & projet',
    period: '2021 — 2024',
    logo: '/media/entreprises/Orange-sonatel.webp',
    summary: 'KPI, reporting, coordination des mises en production et sécurisation des opérations.',
  },
  {
    company: 'Integratop IT',
    role: 'Intégrateur de services',
    period: '2022',
    summary: 'Installation, paramétrage, tests et stabilisation d’une solution chez le client.',
  },
];

export const projects: Project[] = [
  {
    title: 'Image Converter',
    description: 'Service logiciel libre de conversion d’images en WebP, pensé pour la performance et l’éco-conception.',
    image: '/media/previews/image-converter.webp',
    tags: ['Logiciel libre', 'WebP', 'Performance'],
    link: 'https://github.com/Maximus203/image-converter',
    access: 'Lien public vérifié',
  },
  {
    title: 'MyEvent',
    description: 'Application de création et de gestion d’événements, avec un parcours de bout en bout.',
    image: '/media/previews/my-event.webp',
    tags: ['Laravel', 'React', 'Management'],
    link: 'https://github.com/Maximus203/my-event-app',
    access: 'Lien public vérifié',
  },
  {
    title: 'Nanobrowser Bridge',
    description: 'Pont HTTP local pour piloter un agent IA Chrome avec un LLM local et validation humaine.',
    image: '/media/project-placeholder.svg',
    tags: ['IA', 'TypeScript', 'Automatisation'],
    access: 'Projet présenté · démo sur demande',
  },
  {
    title: 'SAP Commercial',
    description: 'Application interne de gestion des stocks, RH et finance pour la Société Africaine de Pétrole.',
    image: '/media/previews/sap.webp',
    tags: ['Laravel', 'React', 'MySQL'],
    access: 'Projet présenté · accès non public',
  },
  {
    title: 'Archive ESTM',
    description: 'Plateforme d’archivage des mémoires avec ancrage blockchain pour renforcer l’intégrité des dépôts.',
    image: '/media/projets/Archive-ESTM.webp',
    tags: ['Archive', 'Blockchain', 'Éducation'],
    access: 'Démo visuelle',
  },
  {
    title: 'Momentum',
    description: 'Plateforme de quiz interactifs en temps réel avec classement instantané pour cours et événements.',
    image: '/media/projets/momentum.webp',
    tags: ['React', 'Temps réel', 'Pédagogie'],
    access: 'Démo visuelle',
  },
  {
    title: 'Cynoia Spaces',
    description: 'SaaS de gestion d’espaces collaboratifs, présenté dans le corpus public historique.',
    image: '/media/previews/cynoia-spaces.webp',
    tags: ['Symfony', 'React', 'Docker'],
    access: 'Référence visuelle',
  },
  {
    title: 'Bibliothèque de compétences IA',
    description: 'Système privé de plus de 80 compétences spécialisées, avec routage, gouvernance, mémoire d’expérience et variantes ciblées selon les agents.',
    image: '/media/architecture/skills-library.svg',
    tags: ['Agents', 'Skills', 'Gouvernance'],
    access: 'Architecture documentée · dépôt privé',
  },
  {
    title: 'Artist Digital',
    description: 'Automatisation du cycle de vie client : contrats, prospects et alertes d’échéances.',
    image: '/media/project-placeholder.svg',
    tags: ['CRM', 'Automatisation', 'Process'],
    access: 'Corpus historique · aperçu non disponible',
  },
  {
    title: 'Atlas Automation',
    description: 'Socle d’automatisation auto-hébergé : orchestration d’agents, SSO, VPN, supervision, sauvegardes et bases vectorielles.',
    image: '/media/architecture/atlas-automation.svg',
    tags: ['Linux', 'Automatisation', 'RAG'],
    access: 'Architecture documentée · infrastructure privée',
  },
  {
    title: 'Bots Telegram Ops',
    description: 'Bots privés de contrôle et de notification pour suivre les tâches, recevoir les alertes d’Atlas et piloter des opérations à distance.',
    image: '/media/architecture/telegram-ops.svg',
    tags: ['Telegram', 'Alertes', 'Contrôle'],
    access: 'Architecture documentée · secrets exclus',
  },
  {
    title: 'Murabbi Landing',
    description: 'Expérience Next.js orientée habitudes et progression, avec une direction visuelle 3D et un déploiement public vérifié.',
    image: '/media/generated/murabbi-landing-demo.gif',
    tags: ['Next.js', 'Three.js', 'Produit'],
    link: 'https://github.com/Maximus203/murabbi-landing',
    live: 'https://murabbi-landing.vercel.app',
    access: 'Démo 15 s enregistrée · dépôt public',
  },
  {
    title: 'Les chats sont mignons',
    description: 'Projet pédagogique HTML/CSS finalisé : une démonstration simple, lisible et réellement exécutable du travail de transmission.',
    image: '/media/generated/les-chats-demo.gif',
    tags: ['HTML', 'CSS', 'Pédagogie'],
    link: 'https://github.com/Maximus203/Les-chats-sont-mignons',
    access: 'Démo locale 15 s · dépôt public',
  },
  {
    title: 'Mbaye Laravel Chatbot',
    description: 'Assistant conversationnel Laravel et Livewire, documenté et conservé avec sa démonstration animée historique.',
    image: '/media/projets/mbaye-chatbot-demo.gif',
    tags: ['Laravel', 'Livewire', 'Chatbot'],
    link: 'https://github.com/Maximus203/Mbaye-laravel-chatbot-app',
    access: 'Démo historique · dépôt public',
  },
];

export const skills = [
  { label: 'Construire', items: 'JavaScript · React · PHP · Laravel · Node.js · Express · FastAPI · Python' },
  { label: 'Structurer', items: 'SQL · MySQL · PostgreSQL · MongoDB · UML · Git · Linux · Docker' },
  { label: 'Augmenter', items: 'RAG · conception de prompts · agents · n8n · OpenRouter · validation humaine' },
  { label: 'Transmettre', items: 'HTML/CSS/JS · PHP/MySQL · code review · Kanban · pédagogie par projet' },
];

type GalleryCategory = 'Transmission' | 'Communauté' | 'Logiciel libre' | 'Projet';

const series = (title: string, category: GalleryCategory, prefix: string, count: number, alt: string) =>
  Array.from({ length: count }, (_, index) => ({
    title,
    category,
    image: `/media/galerie/${prefix}-${index + 1}.webp`,
    alt: `${alt} — photo ${index + 1} sur ${count}`,
  }));

export const galleryItems = [
  ...series('Graduation ESTM', 'Transmission', 'graduation-estm', 10, 'Remise de diplômes et moments de transmission à l’ESTM'),
  ...series('DevFest Dakar', 'Communauté', 'devfest', 5, 'Cherif Diouf et la communauté technologique au DevFest Dakar'),
  ...series('Laravel Sénégal', 'Communauté', 'laravel-senegal', 5, 'Rencontre de la communauté Laravel Sénégal'),
  ...series('Hacktoberfest Galsen Dev', 'Logiciel libre', 'hacktoberfest', 4, 'Participation à Hacktoberfest avec Galsen Dev'),
  ...series('Atelier ESTM', 'Transmission', 'estm-workshop', 2, 'Atelier et accompagnement des étudiants à l’ESTM'),
  { title: 'Edacy', category: 'Transmission' as const, image: '/media/galerie/edacy-2.webp', alt: 'Cherif Diouf lors d’un moment de transmission avec Edacy' },
];

export const tools = [
  { slug: 'image-converter', title: 'Convertisseur WebP', text: 'Convertir une image en WebP côté navigateur.', image: '/media/previews/image-converter.webp' },
  { slug: 'meme-generator', title: 'Générateur de mèmes', text: 'Composer un visuel simple à partir d’un média local.', image: '/media/project-placeholder.svg' },
  { slug: 'readme-generator', title: 'Générateur de README', text: 'Structurer rapidement la documentation d’un projet.', image: '/media/project-placeholder.svg' },
];

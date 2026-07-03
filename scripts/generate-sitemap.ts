import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://cherif-diouf.artist-dev.com';
const currentDate = new Date().toISOString().split('T')[0];

// Valeurs valides pour changefreq selon le standard XML sitemap
// Référence: https://www.sitemaps.org/protocol.html#changefreqdef
const VALID_CHANGEFREQ = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];

// Fonction de validation
const validateChangefreq = (freq: string): string => {
  if (!VALID_CHANGEFREQ.includes(freq)) {
    console.warn(`⚠️  Valeur changefreq invalide: "${freq}". Utilisation de "monthly" par défaut.`);
    return 'monthly';
  }
  return freq;
};

// Langues supportées
const LANGUAGES = ['fr', 'en', 'zh', 'ja'];

// Routes principales (sans /contact qui retourne 404)
const MAIN_ROUTES = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
  { path: '/gallery', changefreq: 'monthly', priority: '0.8' },
  { path: '/students', changefreq: 'monthly', priority: '0.8' },
  { path: '/tools', changefreq: 'monthly', priority: '0.9' },
  { path: '/tools/image-converter', changefreq: 'monthly', priority: '0.8' },
  { path: '/tools/meme-generator', changefreq: 'monthly', priority: '0.8' },
  { path: '/tools/readme-generator', changefreq: 'monthly', priority: '0.8' },
];

// Ancres de la page d'accueil (pour référence, pas indexées comme URLs distinctes par Google)
const HOME_ANCHORS = [
  { path: '/#projects', changefreq: 'monthly', priority: '0.9' },
  { path: '/#skills', changefreq: 'monthly', priority: '0.8' },
  { path: '/#experience', changefreq: 'monthly', priority: '0.8' },
  { path: '/#education', changefreq: 'yearly', priority: '0.7' },
  { path: '/#certifications', changefreq: 'monthly', priority: '0.7' },
  { path: '/#languages', changefreq: 'yearly', priority: '0.6' },
  { path: '/#interests', changefreq: 'yearly', priority: '0.5' },
];

// Générer toutes les URLs
const urls = [
  // Racine sans langue (redirige vers la langue par défaut)
  {
    loc: SITE_URL + '/',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '1.0'
  },
  // Routes localisées pour chaque langue
  ...LANGUAGES.flatMap(lang =>
    MAIN_ROUTES.map(route => ({
      loc: `${SITE_URL}/${lang}${route.path}`,
      lastmod: currentDate,
      changefreq: route.changefreq,
      priority: route.priority
    }))
  ),
  // Ancres de la page d'accueil (une seule fois, sans langue)
  ...HOME_ANCHORS.map(anchor => ({
    loc: SITE_URL + anchor.path,
    lastmod: currentDate,
    changefreq: anchor.changefreq,
    priority: anchor.priority
  }))
];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${validateChangefreq(url.changefreq)}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Créer le dossier public s'il n'existe pas
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Écrire la sitemap
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);

  // Générer robots.txt
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml

# Éviter l'indexation des fichiers de développement
Disallow: /node_modules/
Disallow: /src/
Disallow: /*.json
Disallow: /*.config.*
Disallow: /.github/
Disallow: /scripts/

# Permettre l'accès aux assets importants
Allow: /assets/
Allow: /documents/`;

  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);

  console.log('✅ Sitemap et robots.txt générés avec succès !');
  console.log(`📍 Site URL: ${SITE_URL}`);
  console.log(`📅 Date de mise à jour: ${currentDate}`);
  console.log(`📄 ${urls.length} URLs ajoutées à la sitemap`);
};

generateSitemap();
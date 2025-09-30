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

const urls = [
 {
  loc: SITE_URL + '/',
  lastmod: currentDate,
  changefreq: 'monthly',
  priority: '1.0'
 },
 {
  loc: SITE_URL + '/#projects',
  lastmod: currentDate,
  changefreq: 'monthly',
  priority: '0.9'
 },
 {
  loc: SITE_URL + '/#skills',
  lastmod: currentDate,
  changefreq: 'monthly',
  priority: '0.8'
 },
 {
  loc: SITE_URL + '/#experience',
  lastmod: currentDate,
  changefreq: 'monthly',
  priority: '0.8'
 },
 {
  loc: SITE_URL + '/#education',
  lastmod: currentDate,
  changefreq: 'yearly',
  priority: '0.7'
 },
 {
  loc: SITE_URL + '/#certifications',
  lastmod: currentDate,
  changefreq: 'monthly',
  priority: '0.7'
 },
 {
  loc: SITE_URL + '/#languages',
  lastmod: currentDate,
  changefreq: 'yearly',
  priority: '0.6'
 },
 {
  loc: SITE_URL + '/#interests',
  lastmod: currentDate,
  changefreq: 'yearly',
  priority: '0.5'
 }
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
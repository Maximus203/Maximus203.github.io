# 🗺️ Système de Sitemap Automatique

Ce portfolio utilise un système de génération automatique de sitemap pour optimiser le référencement SEO.

## 📋 Fonctionnalités

- **Génération automatique** : Sitemap XML et robots.txt créés à chaque build
- **Mise à jour des dates** : Date de dernière modification automatiquement mise à jour
- **URLs optimisées** : Toutes les sections importantes du portfolio incluses
- **Priorités SEO** : Chaque page a une priorité définie pour les moteurs de recherche

## 🛠️ Utilisation

### Génération manuelle
```bash
npm run generate-sitemap
```

### Génération automatique
La sitemap est automatiquement générée avant chaque build :
```bash
npm run build  # Génère la sitemap puis build le projet
```

## 📄 Fichiers générés

### `public/sitemap.xml`
Sitemap XML contenant toutes les URLs importantes du portfolio avec leurs métadonnées SEO.

### `public/robots.txt`
Fichier robots.txt qui guide les moteurs de recherche et référence la sitemap.

## 🔧 Configuration

### Modifier l'URL du site
Éditez `scripts/generate-sitemap.ts` :
```typescript
const SITE_URL = 'https://votre-domaine.com';
```

### Ajouter de nouvelles URLs
Ajoutez des entrées dans le tableau `urls` :
```typescript
{
  loc: SITE_URL + '/nouvelle-page',
  lastmod: currentDate,
  changefreq: 'monthly',
  priority: '0.8'
}
```

### Fréquences de mise à jour
- `always` : Change à chaque visite
- `hourly` : Change chaque heure
- `daily` : Change chaque jour
- `weekly` : Change chaque semaine
- `monthly` : Change chaque mois
- `yearly` : Change chaque année
- `never` : Ne change jamais

### Priorités (0.0 à 1.0)
- `1.0` : Page principale (accueil)
- `0.9` : Pages très importantes (projets)
- `0.8` : Pages importantes (compétences, expérience)
- `0.7` : Pages secondaires (éducation, certifications)
- `0.5-0.6` : Pages moins importantes (langues, centres d'intérêt)

## 📈 Avantages SEO

1. **Indexation rapide** : Les moteurs de recherche trouvent facilement toutes les pages
2. **Référencement optimisé** : Priorités et fréquences de mise à jour définies
3. **Robots.txt** : Guide les crawlers efficacement
4. **Mise à jour automatique** : Toujours synchronisé avec le contenu

## 🚀 Intégration CI/CD

Le workflow GitHub Actions génère automatiquement la sitemap avant le déploiement :

```yaml
- name: Generate sitemap
  run: npm run generate-sitemap

- name: Build project
  run: npm run build
```

## 📊 Soumission aux moteurs de recherche

Une fois déployé, soumettez votre sitemap à :

1. **Google Search Console** : https://search.google.com/search-console
2. **Bing Webmaster Tools** : https://www.bing.com/webmasters
3. **Yandex Webmaster** : https://webmaster.yandex.com

URL de la sitemap : `https://cherif-diouf.artist-dev.com/sitemap.xml`
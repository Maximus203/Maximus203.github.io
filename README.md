# Portfolio Cherif Diouf - Version 2.0

Portfolio personnel interactif développé avec **Next.js 14+**, **TypeScript**, et **Tailwind CSS**, selon les instructions de l'expert en architecture logicielle.

## 🚀 Fonctionnalités Principales

### Sélecteur de Thèmes Multi-Profils
- **Full-Stack** : Vue équilibrée et professionnelle (thème par défaut)
- **Frontend** : Vue créative avec palette orange monochrome 
- **Backend** : Vue minimaliste noir/blanc/gris avec typographie Fira Code

### Sections Optimisées
- **Certifications** : Système de modales par organisme pour réduire le défilement
- **Projets** : Filtrage contextuel selon le profil sélectionné
- **Compétences** : Affichage adaptatif selon la spécialisation

### SEO Avancé
- Métadonnées dynamiques et Open Graph
- JSON-LD avec Schema.org (Person, Organization)
- Sitemap.xml et robots.txt automatisés
- Images optimisées avec Next.js Image

## 🛠 Stack Technique

- **Framework** : Next.js 14+ avec App Router
- **Languages** : TypeScript (mode strict)
- **Styling** : Tailwind CSS + shadcn/ui
- **Animations** : Framer Motion
- **Icons** : Lucide React (zéro émojis)
- **Data** : portfolioData.json centralisé

## 📁 Architecture

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Styles avec 3 thèmes
│   ├── layout.tsx         # Layout principal + SEO
│   ├── page.tsx           # Page d'accueil
│   ├── sitemap.ts         # Génération sitemap
│   └── robots.ts          # Configuration robots
├── components/
│   ├── sections/          # Sections modulaires
│   ├── ui/               # shadcn/ui components
│   ├── navbar.tsx        # Navigation avec sélecteur
│   ├── footer.tsx        # Pied de page
│   └── theme-provider.tsx # Gestion thèmes
├── data/
│   └── portfolioData.json # Source unique des données
└── lib/
    └── utils.ts          # Utilitaires
```

## 🎨 Système de Thèmes

### Full-Stack (Défaut)
- Couleur primaire : `hsl(230, 64%, 44%)` (bleu)
- Design équilibré et professionnel
- Animations modérées

### Frontend 
- Couleur primaire : `hsl(25, 95%, 53%)` (orange)
- Design créatif avec dégradés subtils
- Animations fluides et engageantes

### Backend
- Couleurs : nuances de gris/noir/blanc
- Typographie : Fira Code pour tous les titres
- Animations minimales (fade uniquement)
- Style terminal/IDE

## 🚀 Utilisation

### Développement
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Production
```bash
npm start
```

## 📊 Données

Toutes les informations sont centralisées dans `data/portfolioData.json` :
- Profil et informations personnelles
- Projets avec filtrage par profil
- Expériences et formations
- Compétences techniques par catégorie
- Certifications organisées par émetteur
- Langues et centres d'intérêt

## ♿ Accessibilité

- Conforme WCAG 2.1 niveau AA
- Navigation au clavier complète
- Contrastes optimisés pour chaque thème
- Support `prefers-reduced-motion`
- Images avec attributs alt descriptifs

## 🔍 SEO

- Score Lighthouse 95+ sur tous les critères
- Métadonnées dynamiques par section
- Données structurées Schema.org
- Sitemap automatisé
- Images optimisées WebP/AVIF

## 🎯 Performance

- Code splitting automatique par route
- Lazy loading des images
- Optimisation des polices (font-display: swap)
- Compression des assets
- Export statique pour déploiement CDN

---

*Développé selon les standards d'excellence de l'architecte logiciel expert Next.js 14+*
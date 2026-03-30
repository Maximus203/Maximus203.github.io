# Cherif Diouf | Portfolio

Portfolio personnel construit avec **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion** et **Supabase**.

## Stack technique

- **Frontend** : Next.js (App Router, static export), React 19, TypeScript
- **Styling** : Tailwind CSS v4, Framer Motion
- **Backend** : Supabase (PostgreSQL, Storage, RLS)
- **State** : Zustand
- **i18n** : 4 langues (FR, EN, ZH, JA)
- **Deploiement** : GitHub Pages + cPanel (static export)

## Architecture

```
src/
├── app/[lang]/          # Pages avec SEO par langue (28 pages statiques)
│   ├── page.tsx         # Home (hero, experience, projets, skills, education)
│   ├── gallery/         # Galerie evenements
│   ├── tools/           # Grille outils + 3 pages dediees
│   │   ├── readme-generator/
│   │   ├── image-converter/
│   │   └── meme-generator/
│   └── contact/         # Formulaire de demande de projet
├── components/          # 16 composants React (layout, home, gallery, tools, shared)
├── lib/                 # Constants i18n, metadata SEO, client Supabase
├── store/               # Zustand (theme, UI state)
└── styles/              # Tailwind globals + custom styles
```

## Lancer en local

**Prerequis** : Node.js 20+

```bash
# Installer les dependances
npm install

# Lancer le serveur de developpement
npm run dev

# Build de production (static export)
npm run build
```

## Variables d'environnement

Copier `.env.local.example` ou creer `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxx
SUPABASE_SERVICE_KEY=eyJ...  # uniquement pour le seed
```

## Base de donnees

```bash
# Executer le schema dans le SQL Editor Supabase
# Fichier: supabase/schema.sql

# Seed les projets
npm run seed
```

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de developpement |
| `npm run build` | Build static (output: `out/`) |
| `npm run seed` | Inserer les projets dans Supabase |
| `npm run generate-sitemap` | Generer sitemap.xml |

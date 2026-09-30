# Cherif Diouf — Portfolio immersif

Portfolio multilingue construit avec **Next.js 16**, **TypeScript**, **GSAP** et une direction artistique sur mesure. L'interface associe narration, animations dimensionnelles, galerie, projets, outils et assistant conversationnel local.

## Stack technique

- **Frontend** : Next.js (App Router, static export), React 19, TypeScript
- **Motion** : GSAP, CSS 3D et mode 2D accessible sur mobile
- **Assistant** : réponses locales fondées sur les données publiques du portfolio
- **i18n** : 4 langues (FR, EN, ZH, JA)
- **Deploiement** : GitHub Pages + cPanel (static export)

## Architecture

Le contenu applicatif vit dans `app/`, `components/`, `lib/` et `styles/`. Les médias optimisés sont dans `public/media/`. Les parcours de régression sont documentés dans `test-playbooks/`.

## Lancer en local

**Prerequis** : Node.js 20+

```bash
# Installer les dependances
npm install

# Lancer le serveur de developpement
npm run dev

# Build de production statique
$env:NEXT_OUTPUT="export"; npm run build
```

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de developpement |
| `npm run build` | Build Next.js |
| `npm run typecheck` | Verification TypeScript |
| `npm run test:theme` | Regression claire/sombre, persistance et accessibilite |
| `npm run test:regression` | Regression fonctionnelle du portfolio |

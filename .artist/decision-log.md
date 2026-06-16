# Decision Log

## 2026-06-15 — Feature : html-lang

### Gaps de compétence
- Next.js App Router root layout constraints → pas de gap, couvert par les docs officielles + pattern route groups
- Static export (`output: 'export'`) + i18n → pattern connu, pas de skill tiers requis

### Frictions Notion
- Pas de connexion Notion disponible dans cette session. Phase -1 routing appliquée partiellement.

### Défauts appliqués depuis `~/.artist/delivery-defaults.md`
- Hébergement : GitHub Pages (front-only, déjà en place) ✓
- Compte admin : non applicable (pas d'application, portfolio statique) ✓

### Décision architecturale principale
**Route group `(redirect)` retenu** plutôt que :
- ❌ Middleware → incompatible `output: 'export'`
- ❌ Patch client-side only → déjà présent, insuffisant pour SEO statique
- ❌ `generateStaticParams` dans root layout → root layout ne reçoit pas les params de segments enfants
- ✅ Route group `(redirect)` + `[lang]/layout.tsx` comme vrai root layout

### Skills forge / install / trivial
- Ce fix est **trivial** (refacto layout Next.js standard) → pas de skill à forger ni installer

## 2026-06-16 — Lot : UX Onboarding outils (#24-#28)

### Décisions tranchées seul (réversibles — UI/onboarding)
- **#26** : implémenter **les deux** branches du « OU » de l'issue (illustration chiffrée du gain **+** bouton « image de démo »). Raison : « montrer ET faire accomplir » > l'un ou l'autre. Réversible (retrait d'un bloc JSX).
- **#26** : l'image de démo réutilise un asset JPG **déjà présent** (`/assets/galerie/devfest-1.jpg`) pour démontrer un vrai gain JPG→WebP sans ajouter de binaire dédié.
- **#27** : image de démo = PNG **généré localement** (scène neutre, copyright-safe) plutôt qu'un asset tiers ou une photo identifiable de la galerie. Stocké `/public/assets/tools/meme-demo.png`.
- **#27** : texte d'exemple du meme via `ui-labels.ts` (clés `memeExampleTop`/`memeExampleBottom`, 4 locales) plutôt qu'en dur → respecte l'i18n existant.
- **#28** : implémenter **les deux** (défauts neutres `your-username`/liens vides **+** champ pseudo proéminent au-dessus de l'aperçu). Réversible.

### Contrainte projet appliquée
- Pas d'emojis bruts dans le code → unicode escapes / icônes Lucide pour tout nouvel élément.

### Identité / gate
- Solo (pas de 2ᵉ identité reviewer) → EXIT loop = **« PR prête »**. APPROVE + merge `main` = gate humaine (déclenche le déploiement cPanel).

### Aucune décision irréversible parquée.

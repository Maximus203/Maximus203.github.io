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

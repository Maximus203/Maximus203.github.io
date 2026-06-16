# Spec — UX Onboarding des 3 outils (issues #24-#28)

> Cadrage `artist-cadrage` · 2026-06-16 · module doctrine : `artist-ux-clea-onboarding`

## Intention

Les 3 outils (`/tools/*`) échouent au même endroit : **la première valeur n'est
pas immédiate**. Chaque issue est une marche du chemin vers l'aha moment. Aucune
ne change la logique métier — uniquement le moment et la manière dont la valeur
apparaît.

## Tâches (toutes sur des composants client `'use client'`)

| # | Fichier | Changement | Priorité |
|---|---------|-----------|----------|
| 24 | `src/components/tools/ImageConverter.tsx` | Conversion **automatique au drop/sélection** ; le 2ᵉ clic distant n'est plus nécessaire (bouton conservé pour re-convertir après changement de format). | haute |
| 25 | `src/components/tools/ImageConverter.tsx` | État « done » : afficher `origine → finale (−X %)` au lieu de la seule taille finale ; couleur positive si gain, neutre/négative si alourdi. | haute |
| 26 | `src/components/tools/ImageConverter.tsx` | État vide → mini-démo de valeur : illustration chiffrée du gain + bouton « image de démo » (asset local) qui convertit réellement. | moyenne |
| 27 | `src/components/tools/MemeGenerator.tsx` | Image de démo **locale** (`/assets/tools/...`), suppression de la dépendance Unsplash + `crossOrigin` ; texte d'exemple **réellement dessiné** sur le canvas par défaut. | moyenne |
| 28 | `src/components/tools/ReadmeGenerator.tsx` | Défauts **neutres** (`your-username`, avatar/liens vides, lignes animées génériques) + champ « pseudo GitHub » **proéminent au-dessus de l'aperçu** avec repère « commence ici ». | moyenne |

## Contraintes projet (non négociables)

- **Pas d'emojis bruts dans le code** (`agent.instructions.md`) → unicode escapes (`\u{...}`) ou icônes Lucide.
- TypeScript strict (`tsc --noEmit` doit passer — CI gate).
- Icônes Lucide uniquement, pas de nouvelle dépendance.
- `output: 'export'` (statique) : tout en client-side, pas de réseau externe ajouté sur le chemin critique.
- i18n : le texte d'exemple du meme passe par `ui-labels.ts` (fr / en / zh / ja).

## Décisions tranchées au pré-vol (réversibles, journalisées)

- **#26** : faire les **deux** (illustration chiffrée + bouton démo) — « montrer ET faire accomplir ».
- **#26** : l'image de démo réutilise un JPG local existant (`/assets/galerie/devfest-1.jpg`) pour une vraie démo JPG→WebP, zéro nouvel asset.
- **#27** : image de démo = PNG généré localement (copyright-safe, scène neutre), pas un asset tiers.
- **#28** : faire les **deux** (défauts neutres + champ proéminent) — robustesse maximale de l'aha.

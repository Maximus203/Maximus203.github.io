# Delivery Context — Portfolio Cherif Diouf

> Généré par `artist-cadrage` · Feature : html-lang · 2026-06-15

---

## 1. Projet

- **Nom** : maximus203.github.io / cherif-diouf.artist-dev.com
- **Domaine prod** : https://cherif-diouf.artist-dev.com
- **Type** : Portfolio statique multilingue (fr / en / zh / ja)
- **Framework** : Next.js 15, App Router, TypeScript, Tailwind CSS
- **Output** : `output: 'export'` → GitHub Pages (statique, pas de serveur)

## 2. Accès

- **Repo GitHub** : Maximus203/maximus203.github.io (branch courante : `claude/beautiful-panini-f98d80`)
- **Identité auteur** : `printf_cherif`
- **Identité reviewer** : _(non défini — PR mergée directement par Cherif pour ce type de fix SEO trivial)_
- **Branche main** : `main`
- **Déploiement** : GitHub Actions → build → push vers `gh-pages`

## 3. Infra / Déploiement

- Hébergeur : GitHub Pages (défaut appliqué depuis `~/.artist/delivery-defaults.md` — front-only)
- Pas de middleware Next.js (incompatible avec `output: 'export'`)
- Pas de variables d'environnement requises pour ce fix
- Supabase présent dans le projet mais non impliqué dans ce fix

## 4. Cadre loop

- **Budget** : aucune contrainte de tokens explicite
- **EXIT** : GATE ready-to-fly vert + acceptance-playbooks unit et SEO verts
- **N1** : build passe → `npm run build` exit 0
- **N2** : grep lang correct dans chaque `out/<lang>/index.html`
- **N3** : aucun `<html>` imbriqué dans les fichiers statiques

## 5. Stack technique (fichiers clés touchés)

| Fichier | Action |
|---------|--------|
| `src/app/layout.tsx` | **SUPPRIMÉ** |
| `src/app/page.tsx` | **DÉPLACÉ** → `src/app/(redirect)/page.tsx` |
| `src/app/(redirect)/layout.tsx` | **CRÉÉ** — html/body minimal |
| `src/app/[lang]/layout.tsx` | **MODIFIÉ** — devient vrai root layout |
| `src/app/[lang]/LangLayoutClient.tsx:39` | **MODIFIÉ** — supprimer useEffect lang |

## 6. Contraintes projet (issues.md)

- Pas d'emojis dans le code (`agent.instructions.md`)
- Tout en TypeScript
- shadcn/ui pour les composants UI
- Icônes Lucide uniquement
- Ce fix ne touche pas aux données, labels, styles, ni au routing i18n

## 7. Tests

- Playbooks dans `.artist/acceptance-playbooks/html-lang/`
- Angles couverts : unit (build + grep), fonctionnel (navigateur), SEO (html statique)
- Pas d'angle Playwright ou E2E requis (changement d'attribut HTML, pas de logique UI)

## 8. Risques et mitigation

| Risque | Probabilité | Mitigation |
|--------|------------|------------|
| `app/(redirect)/page.tsx` perd le layout ThemeProvider | Faible | Le layout (redirect) est minimal, la page ne rend que `null` (redirection) |
| Les fonts Next.js dupliquées entre layouts | Moyen | Fonts définies uniquement dans `[lang]/layout.tsx`; la page redirect n'en a pas besoin |
| ThemeProvider absent de la page redirect | Faible | Page redirect retourne `null`, pas de rendu visible |
| JSON-LD Person schema en double | Faible | Ne reste que dans `[lang]/layout.tsx` |

## 9. Décision clé

**Route group `(redirect)` plutôt que middleware** : le middleware Next.js est
incompatible avec `output: 'export'`. Le route group permet d'avoir un root layout
minimal pour `/` (redirect client-side) et un root layout complet avec `lang={lang}`
pour toutes les pages de contenu sous `[lang]/`.

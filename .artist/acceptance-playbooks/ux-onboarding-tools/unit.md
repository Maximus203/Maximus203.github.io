# Playbook unit / build — UX Onboarding outils  ✅ TOUS VERTS

> Gates déterministes AVANT le navigateur (cascade : checks cheap d'abord). Exécuté 2026-06-16.

| # | Commande | Attendu | Observé | Verdict |
|---|----------|---------|---------|---------|
| U1 | `npx tsc --noEmit` | exit 0, 0 erreur (TS strict) | exit 0 | ✅ |
| U2 | `npm run generate-sitemap` | exit 0 | exit 0 (sortie non commitée — CI régénère au déploiement) | ✅ |
| U3 | `npm run build` | exit 0, export statique (`out/`) | exit 0, 35 pages SSG générées | ✅ |
| U4 | `npm audit --audit-level=critical` | exit 0 (0 critique) | exit 0 (0 critique ; 4 high + 1 mod pré-existants sur `ws`, hors périmètre, gate CI = critical) | ✅ |
| U5 | grep `images.unsplash.com` dans `src/` | 0 occurrence | 0 | ✅ |
| U6 | grep `Maximus203` dans `ReadmeGenerator.tsx` | 0 dans `formData` initial | 0 (aucune occurrence dans le fichier) | ✅ |

EXIT (solo) = U1-U6 verts + tous les PB fonctionnels verts (capture à l'appui) + 0 high/crit introduit + review postée.

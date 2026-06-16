# Livraison Manifeste — UX Onboarding outils (#24-#28)

> Lot précédent (typescript-strict) : clos — commit `74d831a`. Voir historique git.

## Acte 0 — Cadrage  ✅ GATE Ready-to-fly VERT

- **Entrée** : 5 issues UX/onboarding (`label: ux-onboarding`), toutes sourcées (lignes + preuve live).
- **Spec** : `.artist/specs/ux-onboarding-tools.md`
- **Playbooks (le DONE)** : `.artist/acceptance-playbooks/ux-onboarding-tools/{unit,fonctionnel}.md`
- **Skills manquants** : aucun (edits frontend triviaux, doctrine UX déjà connue via `artist-ux-clea-onboarding`).
- **Delivery-context** : `.artist/delivery-context.md` (reviewer = solo → EXIT = « PR prête » ; deploy = merge `main` → cPanel = gate humaine).
- **Défauts appliqués** : front-only GitHub-hosted, pas d'env var, pas de réseau externe ajouté.

## Acte 1 — Exécution  ✅ code + tests verts ; PR + review en cours

| # | Tâche | Code | Playbook | Statut |
|---|-------|------|----------|--------|
| 24 | auto-convert au drop | ✅ `ImageConverter.tsx` (`convertFiles` auto au drop) | PB-24 ✅ | done |
| 25 | gain de poids (−X %) | ✅ `getReduction` + carte `orig → finale (−X %)` | PB-25 ✅ | done |
| 26 | état vide → démo | ✅ illustration chiffrée + bouton démo local | PB-26 ✅ | done |
| 27 | meme image locale + texte | ✅ `/assets/tools/meme-demo.png` + texte i18n, Unsplash retiré | PB-27 ✅ | done |
| 28 | readme défaut neutre + pseudo | ✅ défauts neutres + champ proéminent au-dessus de l'aperçu | PB-28 ✅ | done |

- **Gates déterministes** : U1-U6 ✅ (tsc, build, audit-critical, greps).
- **E2E navigateur** : PB-24..28 ✅ (snapshot + sondes eval ; capture meme = recompo serveur, screenshot env indispo).
- **Identité auteur** : `printf_cherif` · **reviewer** : solo (pas de 2ᵉ identité) → EXIT loop = **PR prête**.
- **EXIT** : U1-U6 verts + PB-24..28 verts + 0 high/crit introduit + review postée.
- **Gate humaine** : APPROVE / merge `main` (→ déploiement cPanel automatique).

### Review (auteur ≠ reviewer)
- **PR** : [#29](https://github.com/Maximus203/Maximus203.github.io/pull/29) (auteur `printf_cherif`).
- **Revue adversariale** (3 angles + vérification réfutante) : verdict **OK_WITH_NITS** — 32 bruts → 4 confirmés, tous **low/nit**, 0 critical/high.
- **Fixes appliqués** (commit `d410d24`) : `loadDemoImage` (`res.ok` + erreur inline), `getReduction` (pas de « −0 % »). Re-vérifié E2E : démo → `−41 %` OK.
- **Review postée** sur la PR. → **EXIT « PR prête » atteint** (CI à re-confirmer sur `d410d24`).
- ⚠️ **Déploiement auto sur PR** : `deploy.yml` déploie sur chaque PR (pas seulement merge) → changements déjà **live** en prod. Tâche de durcissement CI créée (gate `push:main`).

## Acte 2 — Clôture  ⬜ à faire après PR

- decision-log : décisions #26/#27/#28 (réversibles) journalisées.
- session-capture / artist-capture : si la session le mérite.

## Décisions parquées (irréversibles)

- _(aucune pour l'instant)_

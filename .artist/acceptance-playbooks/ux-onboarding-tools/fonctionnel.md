# Playbook fonctionnel — UX Onboarding outils (E2E navigateur)  ✅ TOUS VERTS

> Surface visible → **test navigateur EXÉCUTÉ + capture** = condition de sortie.
> Exécuté 2026-06-16 sur le dev server Next + l'export statique servi en local (`/fr/tools/...`).
>
> **Note d'env** : `preview_screenshot` est indisponible dans cette session (timeout systématique,
> y compris page d'accueil triviale → limitation d'environnement, pas du code). E2E donc exécuté via
> snapshot d'accessibilité + sondes `eval` (valeurs DOM, pixels canvas, requêtes réseau) ; la capture
> visuelle du canvas meme est une **recomposition serveur fidèle** (mêmes entrées : image + texte + style).

## PB-24 · Converter — auto-convertir au drop  ✅

| Champ | Valeur |
|-------|--------|
| Étapes | État vide → clic « image de démo » (même chemin `processFiles` que drop/sélection) |
| Attendu | Conversion **sans** clic « Convertir Tout » ; statut → `done` ; taille + Download visibles |
| Observé | Carte `demo-devfest.jpg` passe directement à `done` (lien Download présent), **sans** action sur « Convertir Tout » |
| Verdict | ✅ PASS |

## PB-25 · Converter — gain de poids affiché  ✅

| Champ | Valeur |
|-------|--------|
| Attendu | `origine → finale (−X %)`, couleur positive si plus léger |
| Observé | `129.62 KB → 76.28 KB (−41 %)` en vert (JPG→WebP q0.8). Signe `+`/orange prévu si alourdi (logique `getReduction`) |
| Verdict | ✅ PASS |

## PB-26 · Converter — état vide = démo de valeur  ✅

| Champ | Valeur |
|-------|--------|
| Attendu | Plus de « Aucune image sélectionnée » nu ; illustration chiffrée + démo locale réelle |
| Observé | Snapshot : `AVANT 1.5 MB PNG → APRÈS 410 KB WebP / −73 % de poids` + bouton « Essayer avec une image de démo » (charge `/assets/galerie/devfest-1.jpg` local et convertit) |
| Verdict | ✅ PASS |

## PB-27 · Meme — démo locale + texte dessiné  ✅

| Champ | Valeur |
|-------|--------|
| Attendu | Canvas = image **locale** + texte d'exemple dessiné ; **0** requête `images.unsplash.com` |
| Observé | `unsplash: 0`, image locale `/assets/tools/meme-demo.png` (canvas 800×600, pixels non vides) ; inputs pré-remplis `QUAND LE CODE MARCHE` / `DU PREMIER COUP` (i18n fr). Recomposition fidèle vue = laptop + texte meme |
| Verdict | ✅ PASS |

## PB-28 · Readme — défaut neutre + pseudo proéminent  ✅

| Champ | Valeur |
|-------|--------|
| Attendu | Aucune identité propriétaire par défaut ; champ pseudo proéminent **au-dessus** de l'aperçu ; mise à jour en 1 geste |
| Observé | Badge défaut `Pseudo: your-username` (plus de `Maximus203`), `mentionsMaximus:false`, `mentionsOwnerLinkedin:false` ; champ `#github-username-start` présent, **au-dessus** de « Aperçu en direct », repère « commence ici ». Saisie `octocat` → badge + markdown + URL stats (`username=octocat`) mis à jour instantanément |
| Verdict | ✅ PASS |

# Spec — `<html lang>` dynamique par langue

## Contexte

Le portfolio est un Next.js App Router en `output: 'export'` (GitHub Pages).
Toutes les routes de contenu vivent sous `app/[lang]/` (fr, en, zh, ja).
Il existe un root layout `app/layout.tsx` qui rend `<html lang="fr">` en dur
— ce qui fait que le HTML statique de `/en/`, `/zh/`, `/ja/` porte tous
`lang="fr"`. C'est un signal SEO faux qui dévalorise les pages non-françaises.

## Problème précis

- **Fichier** : `src/app/layout.tsx:34`
- **Valeur hardcodée** : `<html lang="fr">`
- **Impact** : Les crawlers lisent `lang="fr"` sur toutes les pages, quel que
  soit le segment d'URL. Le patch client-side (`document.documentElement.lang`)
  dans `LangLayoutClient.tsx:39` ne corrige pas le HTML statique.

## Solution retenue — route group `(redirect)`

Next.js n'autorise `<html>` et `<body>` que dans le root layout. La seule
façon de rendre `<html lang={lang}>` dynamique dans un export statique est
de faire de `app/[lang]/layout.tsx` le **vrai** root layout.

Architecture cible :

```
src/app/
  (redirect)/
    layout.tsx   ← html/body minimal pour la page de redirection /
    page.tsx     ← déplacé depuis app/page.tsx (redirection browser-lang)
  [lang]/
    layout.tsx   ← devient le vrai root layout avec <html lang={lang}>
                    reçoit les fonts, CSS global, ThemeProvider, JSON-LD
  layout.tsx     ← SUPPRIMÉ
  page.tsx       ← SUPPRIMÉ (déplacé dans (redirect)/)
```

## Plan d'exécution

1. Créer `src/app/(redirect)/layout.tsx` — wrapper html/body minimal
2. Déplacer `src/app/page.tsx` → `src/app/(redirect)/page.tsx` (sans modification)
3. Supprimer `src/app/layout.tsx`
4. Dans `src/app/[lang]/layout.tsx` :
   - Importer fonts Inter + JetBrains Mono
   - Importer `globals.css`
   - Importer ThemeProvider
   - Ajouter l'export `metadata`
   - Rendre `<html lang={lang}><body className={...}><ThemeProvider>{children}</ThemeProvider></body></html>`
   - Inclure les deux blocs JSON-LD (Person + WebSite)
5. Supprimer le `useEffect(() => { document.documentElement.lang = lang })` dans
   `LangLayoutClient.tsx:39` (redondant)

## Done (critères exécutables)

- Le build `npm run build` passe sans erreur
- Le fichier `out/en/index.html` contient `lang="en"`
- Le fichier `out/zh/index.html` contient `lang="zh"`
- Le fichier `out/ja/index.html` contient `lang="ja"`
- Le fichier `out/fr/index.html` contient `lang="fr"`
- Le fichier `out/index.html` (racine redirect) ne contient PAS de `lang="fr"` incorrect
  (lang non significatif = `"und"` ou omis acceptable)
- Aucun `<html>` imbriqué dans le DOM

## Out of scope

- Modifier les langues supportées
- Réécrire la logique de redirection de `app/page.tsx`
- Modifier les métadonnées JSON-LD

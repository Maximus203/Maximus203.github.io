# Playbook — Fonctionnel (rendu navigateur)

## must-pass

```
SCÉNARIO A — Langue anglaise
1. Ouvrir /en/ dans le navigateur (ou lancer `npm run start` ou serveur statique)
2. DevTools → Elements → inspecter la balise <html>
3. Vérifier : attribut `lang="en"` présent
4. Vérifier : PAS d'attribut `lang="fr"` sur la balise <html>

SCÉNARIO B — Langue chinoise
1. Ouvrir /zh/
2. DevTools → Elements → inspecter <html>
3. Vérifier : attribut `lang="zh"` présent

SCÉNARIO C — Langue japonaise
1. Ouvrir /ja/
2. DevTools → Elements → inspecter <html>
3. Vérifier : attribut `lang="ja"` présent

SCÉNARIO D — Langue française
1. Ouvrir /fr/
2. DevTools → Elements → inspecter <html>
3. Vérifier : attribut `lang="fr"` présent

SCÉNARIO E — Changement de langue
1. Ouvrir /fr/ → LangSwitcher → sélectionner "EN"
2. URL change vers /en/
3. Vérifier : <html lang="en"> (SANS rechargement forcé = ok si client-side nav)
4. DevTools → document.documentElement.lang → "en"

SCÉNARIO F — Thème dark + lang
1. Ouvrir /en/ en mode dark
2. Thème dark actif (dark class sur html ou body)
3. lang="en" toujours présent (classes dark et lang coexistent)
```

## must-fail

```
ANTI-SCÉNARIO 1 — lang figé après navigation
1. Ouvrir /fr/ (lang="fr")
2. Naviguer vers /en/ via LangSwitcher
3. PAS ACCEPTABLE : document.documentElement.lang reste "fr"

ANTI-SCÉNARIO 2 — HTML invalide
1. Ouvrir /en/ → DevTools → Ctrl+F "<html"
2. PAS ACCEPTABLE : trouver plus d'une balise <html> ouverte
```

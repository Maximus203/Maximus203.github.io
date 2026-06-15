# Playbook — SEO (signal lang pour les crawlers)

## must-pass

```
SCÉNARIO A — Signal lang correct dans le HTML livré statiquement
Commande (après `npm run build`) :
  grep -i '<html' out/en/index.html
Attendu : <html lang="en" ...>

  grep -i '<html' out/zh/index.html
Attendu : <html lang="zh" ...>

  grep -i '<html' out/ja/index.html
Attendu : <html lang="ja" ...>

SCÉNARIO B — Cohérence lang / hreflang
Le sitemap (public/sitemap.xml) déjà existant déclare :
  hreflang="en" → /en/
  hreflang="zh" → /zh/
  hreflang="ja" → /ja/
  hreflang="fr" → /fr/
Après le fix, le lang="XX" dans le HTML doit correspondre au hreflang="XX"
du sitemap pour chaque URL. Vérifier 1 URL par langue.

SCÉNARIO C — Validator HTML
Coller le contenu de out/en/index.html dans https://validator.w3.org/#validate_by_input
Résultat : 0 erreur liée à l'attribut lang
```

## must-fail

```
ANTI-SCÉNARIO 1 — Signal lang incorrect pour /en/
  grep -i 'lang="fr"' out/en/index.html
Attendu : exit code 1 (aucun match)
Si ce grep trouve un résultat → la fix n'est pas appliquée.

ANTI-SCÉNARIO 2 — lang absent de la balise <html>
  grep -i '<html[^>]*lang' out/en/index.html
Attendu : au moins 1 match
Si aucun match → le lang est absent, ce qui est aussi un bug SEO.
```

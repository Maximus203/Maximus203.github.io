# Playbook — Unit (build + grep statique)

## must-pass

```bash
# Build complet sans erreur
npm run build
echo "EXIT:$?"
# Attendu: EXIT:0

# Chaque langue a le bon attribut lang dans le HTML généré
grep -c 'lang="en"' out/en/index.html   # → ≥1
grep -c 'lang="zh"' out/zh/index.html   # → ≥1
grep -c 'lang="ja"' out/ja/index.html   # → ≥1
grep -c 'lang="fr"' out/fr/index.html   # → ≥1
```

## must-fail (garde-fous)

```bash
# La page /en/ NE doit PAS avoir lang="fr" dans le html root
grep '<html[^>]*lang="fr"' out/en/index.html
# Attendu: exit code 1 (pas de match)

# La page /zh/ NE doit PAS avoir lang="fr"
grep '<html[^>]*lang="fr"' out/zh/index.html
# Attendu: exit code 1

# La page /ja/ NE doit PAS avoir lang="fr"
grep '<html[^>]*lang="fr"' out/ja/index.html
# Attendu: exit code 1

# Aucun html imbriqué (nested <html> serait du HTML invalide)
grep -c '<html' out/en/index.html
# Attendu: 1 (exactement une balise <html)
```

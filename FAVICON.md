# Génération du Favicon

## Option 1 : Utiliser logo.webp directement (déjà configuré)
Le fichier `index.html` utilise déjà `logo.webp` comme favicon. Les navigateurs modernes supportent WebP pour les favicons.

## Option 2 : Convertir en .ico (recommandé pour la compatibilité)

### Méthode rapide (en ligne)
1. Ouvrez https://convertio.co/webp-ico/
2. Uploadez `public/assets/logo.webp`
3. Téléchargez le fichier `favicon.ico`
4. Placez-le dans `public/favicon.ico`
5. Le lien dans `index.html` sera automatiquement utilisé

### Méthode avec Sharp (automatisée)
```bash
# Installer sharp
npm install --save-dev sharp

# Générer les favicons
npm run favicon
```

Cela créera `favicon-16x16.png` et `favicon-32x32.png` que vous pourrez ensuite convertir en .ico.

## Tailles recommandées
- 16x16px : Onglets navigateur
- 32x32px : Barre des tâches Windows
- 180x180px : Apple Touch Icon
- 192x192px : Android Chrome

Le logo.webp actuel sera automatiquement redimensionné par le navigateur.

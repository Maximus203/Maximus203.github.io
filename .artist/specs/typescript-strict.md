# Spec — Activer TypeScript strict

## Contexte

`tsconfig.json` a `"strict": false`. Avec strict, il n'y a qu'**une seule erreur** :

```
src/components/tools/ImageConverter.tsx(7,20): error TS7016
Could not find a declaration file for module 'file-saver'.
Fix : npm i --save-dev @types/file-saver
```

## Plan d'exécution

1. `npm install --save-dev @types/file-saver`
2. `tsconfig.json` : `"strict": false` → `"strict": true`
3. `npx tsc --noEmit` → doit passer à 0 erreur
4. `npm run build` → doit passer

## Done

- `tsc --noEmit` : exit 0
- `npm run build` : exit 0
- `tsconfig.json` contient `"strict": true`
- `package.json` contient `@types/file-saver` dans devDependencies

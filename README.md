# Cherif Diouf — Portfolio & Applications

Portfolio FR / EN / ZH / JA en Next.js App Router, React et TypeScript strict. Export statique compatible GitHub Pages et cPanel. Les expériences, projets, études et compétences sont localisés, avec priorité au CV fourni pour les dates.

## Développement

Node.js 20.9+ (Node 24 utilisé pour cette refonte), npm.

```sh
npm ci
npm run dev
npm run typecheck
NEXT_OUTPUT=export npm run build
npm run test:unit
```

Sous PowerShell : `$env:NEXT_OUTPUT="export"; npm run build`.

## Applications

Le catalogue `/fr/applications/` permet la recherche et le filtrage par catégories. Les anciennes routes `/[lang]/tools/*` restent accessibles et déclarent les nouvelles routes comme URL canonique.

| Application | Capacités prévues pour validation |
| --- | --- |
| Convertisseur | Lots JPEG/PNG/WebP, qualité JPEG/WebP, ZIP, images vers PDF, CSV ↔ JSON |
| Studio de mèmes | Image locale, texte haut/bas, taille/couleurs/contour, véritable export PNG |
| README Studio | Profil GitHub, compétences, badges/icônes, thèmes, statistiques optionnelles, trophées, snake et workflow YAML |

Les fichiers sont traités dans le navigateur. Aucune conversion externe, aucun compte ou téléversement de document n’est nécessaire. Les images de fournisseurs tiers dans le README sont facultatives et demandent une activation explicite de l’aperçu. Leur disponibilité n’est pas garantie.

### Limites de conversion

- Les résultats sont de vrais fichiers : une extension n’est jamais changée pour simuler une conversion.
- Images → PDF ne signifie pas PDF → Word ou extraction fidèle de tableaux.
- CSV ↔ JSON gère des données tabulaires ; cela n’est pas une conversion de classeur Excel avec formules et mise en page.
- DOC/DOCX, XLS/XLSX, l’import PDF éditable et les codecs audio/vidéo ne sont pas pris en charge dans cette version.
- Google Docs est un service. Exporter un document dans un format pris en charge ne donne pas automatiquement accès à ce service.
- Les bibliothèques de conversion lourdes sont chargées à la demande. Les limites de fichiers et les erreurs restent visibles dans chaque application.

## Validation

```sh
# Après lancement du site sur http://localhost:4178
npm run test:applications
npm run test:theme
npm run test:regression
```

Les scripts utilisent Playwright installé dans le projet, pas un chemin d’ordinateur personnel. Installer son navigateur avec `npx playwright install chromium`, ou définir `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` vers un Chromium déjà installé. `PORTFOLIO_BASE_URL` permet de tester un autre serveur. Les captures/rapports locaux sont exclus de Git.

La stratégie de tests couvre : signature des fichiers, réutilisation des outils, erreurs et reset, sécurité du Markdown et des URL, absence d’envoi de fichiers, navigation clavier, quatre langues, mobile/tablette/desktop, thèmes et export statique.

## Sources éditoriales

Le CV fourni et l’historique du portfolio servent de sources. Les écarts de dates ont été résolus provisoirement en faveur du CV : doctorat à partir de 2025 et TérangaDev 2024–2026. UpgradeTech est décrit d’après le propriétaire comme un e-commerce client en ligne de matériel informatique, téléphones et accessoires, sans indicateurs inventés ni lien supposé. Les projets privés n’exposent pas de détails internes.

## Publication

Une PR ne publie pas le site. Les deux workflows déploient uniquement sur un push de `main`. La refonte doit rester en PR brouillon jusqu’à la revue et l’autorisation de fusion/publication. Ne jamais pousser directement sur `main` pour tester.

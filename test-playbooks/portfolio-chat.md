# Portfolio conversationnel
> Surfaces : [WEB] · Statut : ✅ · Build : local uncommitted @ npm run build · Testé : 2026-09-30

## Préconditions
- [WEB] `prototype-next` est servi sur `http://localhost:4178/` après un build frais.
- [WEB] Aucun compte requis ; les réponses du chat sont locales.

## Scénarios

### MP-01 — [WEB] Charger le portfolio multi-page
**Action** : Ouvrir `/fr`, puis naviguer vers `/fr/gallery`, `/fr/tools`, `/fr/tools/image-converter`, `/fr/tools/meme-generator`, `/fr/tools/readme-generator` et `/fr/students`.
**Attendu** : Chaque route répond `200`, partage le shell de navigation et ne contient aucun iframe.
**Observé** : Les 7 routes répondent `200` ; le shell et le bouton « Interroger Cherif » sont présents ; `iframeCount=0`.
**Verdict** : ✅
**Issue** : —

### MP-02 — [WEB] Répondre depuis une suggestion du chat
**Action** : Ouvrir « Interroger Cherif », puis cliquer sur « Parcours ».
**Attendu** : La suggestion apparaît comme message utilisateur et une réponse contextualisée sur les expériences est ajoutée.
**Observé** : Le panneau s’ouvre avec GSAP ; le fil contient « Parcours » puis une réponse citant TérangaDev, FIDECA et Orange — Sonatel.
**Verdict** : ✅
**Issue** : —

### MP-03 — [WEB] Répondre à une question libre
**Action** : Saisir « Quelles sont ses compétences ? » puis envoyer.
**Attendu** : Une réponse locale mentionne les groupes de compétences et la stack publique.
**Observé** : La réponse est ajoutée sans requête réseau et reprend Construire, Structurer, Augmenter et Transmettre.
**Verdict** : ✅
**Issue** : —

### MP-04 — [WEB] Utiliser les outils locaux
**Action** : Sur l’Image Converter, sélectionner `public/media/photo.webp`, convertir, puis modifier le texte du Meme Generator et le nom du README.
**Attendu** : Une prévisualisation apparaît, un lien de téléchargement est généré, le mème et l’aperçu README reflètent la saisie.
**Observé** : Prévisualisation présente, lien `converted.webp` généré, texte du mème mis à jour et README mis à jour après saisie.
**Verdict** : ✅
**Issue** : —

### MP-05 — [WEB] Lire le signal 3D du laboratoire
**Action** : Ouvrir `/fr`, atteindre la section « Couche d’intelligence » et observer l’objet.
**Attendu** : L’objet représente des étapes compréhensibles, utilise une perspective CSS réelle, s’anime avec GSAP et reste stable avec `prefers-reduced-motion`.
**Observé** : Objet 3D à six faces avec libellés Contexte, Outils, Validation, animation GSAP confirmée par changement de matrice ; fallback reduced-motion présent dans le composant et la feuille de style.
**Verdict** : ✅
**Issue** : —

### MF-03 — [WEB] Ne pas charger les GIF lourds sur l’accueil
**Action** : Charger `/fr` et inspecter les images demandées par la page.
**Attendu** : L’accueil utilise des aperçus statiques ; les GIF restent réservés aux fiches/outils détaillés.
**Observé** : `0` GIF dans les images de l’accueil ; aperçus WebP statiques utilisés pour Image Converter, MyEvent et SAP Commercial.
**Verdict** : ✅
**Issue** : —

### MF-01 — [WEB] Refuser une injection HTML dans le chat
**Action** : Saisir `<img src=x onerror=alert(1)>` puis envoyer.
**Attendu** : Aucun élément `img` n’est injecté et aucune boîte de dialogue ne s’ouvre.
**Observé** : `imgCount=0`, aucun dialogue JavaScript et aucun log `error`/`warn`.
**Verdict** : ✅
**Issue** : —

### MF-02 — [WEB] Refuser une soumission vide
**Action** : Ouvrir le chat, laisser le champ vide et envoyer.
**Attendu** : Aucun nouveau message n’est ajouté et aucune erreur n’apparaît.
**Observé** : La fonction `ask` ignore la chaîne vide ; aucun effet visible et aucun log d’erreur.
**Verdict** : ✅
**Issue** : —

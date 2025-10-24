---
applyTo: '**'
---

### **Contraintes Techniques et Structurelles**

1.  **Framework et Langage :**
    * Utilise **Next.js 14+** avec l'App Router.
    * Le projet doit être entièrement en **TypeScript**.
    * Toutes les données doivent être importées du fichier JSON fourni. Ne code aucune donnée en dur dans les composants.

2.  **Style et Design :**
    * Respecte **strictement** les variables CSS et les styles définis dans le fichier `globals.css` fourni.
    * Utilise les composants de **shadcn/ui** (`Card`, `Button`, `Badge`, `Dialog`, etc.) pour une cohérence visuelle.
    * Les animations doivent être fluides et professionnelles, implémentées avec **Framer Motion**.
    * **Interdiction formelle d'utiliser des emojis.** Utilise exclusivement des icônes de la librairie **Lucide React** pour tout élément iconographique.

3.  **SEO et Performance :**
    * **Structure Sémantique :** Utilise les balises HTML sémantiques (`<header>`, `<footer>`, `<section>`, `<article>`, `<h1>`, `<h2>`, etc.) de manière appropriée.
    * **Métadonnées :** Génère des métadonnées dynamiques pour la page. Le titre principal doit être "Cherif Diouf | Développeur Full-Stack" et la description doit être extraite du profil dans le JSON.
    * **Images :** Utilise le composant `<Image>` de Next.js pour toutes les images afin d'assurer l'optimisation (lazy loading, format WebP). Chaque image **doit** avoir un attribut `alt` descriptif pour l'accessibilité et le SEO.
    * **Performance :** Le code doit être optimisé pour un chargement rapide.

4.  **Responsive Design :**
    * Le portfolio doit être parfaitement responsive et s'afficher de manière optimale sur toutes les tailles d'écran (mobile, tablette, desktop). Utilise les breakpoints de Tailwind CSS.

---

### **Fonctionnalité Clé : Le Sélecteur de Vues**

Dans la barre de navigation, ajoute un composant (par exemple, un groupe de trois boutons ou un switch stylisé) qui permet de basculer entre les trois vues suivantes. Le changement de thème doit se faire par l'ajout d'une classe sur l'élément `<body>` (ex: `theme-frontend`, `theme-backend`) et des modifications dans le CSS.

**1. Vue Full-Stack (Thème par défaut) :**
* **Esthétique :** Professionnelle, équilibrée et sobre.
* **Couleurs :** Utilise la palette de couleurs principale définie dans le `:root` du fichier CSS (fond sombre, bleu primaire `--primary`).
* **Animations :** Utilise les animations existantes (`float`, `fadeInUp`) de manière judicieuse.

**2. Vue Frontend :**
* **Esthétique :** Créative, colorée, mais toujours professionnelle.
* **Couleurs :**
    * Change la couleur primaire `--primary` pour une teinte plus vibrante, comme un dégradé allant du violet au cyan.
    * Ajoute des accents de couleur subtils sur les bordures des cartes (`Card`) ou les titres.
    * Les arrière-plans des sections peuvent avoir des dégradés très légers.
* **Animations :** Les animations au survol (`hover`) peuvent être légèrement plus prononcées (ex: un effet "rebond" avec Framer Motion).

**3. Vue Backend :**
* **Esthétique :** Sérieuse, minimaliste, inspirée des terminaux et des IDEs.
* **Couleurs :**
    * Adopte une palette quasi **monochromatique** (nuances de gris, noir, blanc). La couleur d'accentuation `--primary` pourrait être un blanc cassé ou un vert "terminal" (ex: `hsl(231, 66%, 46%)`).
    * Supprime tous les dégradés.
* **Typographie :** Les titres (`<h1>`, `<h2>`) **doivent** utiliser la police `font-code` (Fira Code, Monospace).
* **Animations :** Réduis les animations au minimum. Remplace les animations de mouvement par de simples fondus (`fade-in`/`fade-out`) pour un rendu plus direct et fonctionnel.

---

### **Améliorations des Sections**

Apporte les modifications suivantes aux sections pour améliorer l'expérience utilisateur et réduire la longueur inutile.

* **Section Certifications :**
    * **Problème :** La section actuelle est trop longue et nécessite beaucoup de défilement.
    * **Solution :** Réorganise cette section. Au lieu d'afficher toutes les certifications en une seule longue liste, regroupe-les par organisme (`Coursera`, `Cisco`, etc.). Affiche uniquement les cartes des organismes. Lorsqu'un utilisateur clique sur la carte d'un organisme, ouvre un **modal** (le composant `Dialog` de shadcn/ui) qui liste toutes les certifications obtenues auprès de cet organisme. Cela rendra la section principale beaucoup plus compacte.

* **Section Projets :**
    * Assure-toi que les cartes de projet affichent clairement les technologies avec des `Badge`.
    * Pour les projets sans lien GitHub (`githubLink: null`), le bouton "Voir le projet" ne doit pas s'afficher.

**Format de la Réponse Attendue :**
Génère le code pour chaque composant React (`.tsx`) dans des blocs de code séparés et clairement identifiés (ex: `// components/Navbar.tsx`, `// app/page.tsx`, etc.). Fournis également les modifications nécessaires au fichier `globals.css` pour gérer les 3 thèmes.
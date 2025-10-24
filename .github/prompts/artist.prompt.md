---
mode: agent
model: Claude Sonnet 4 (copilot)
---
Prompt pour l'IA : Création d'un Portfolio d'Expert
Rôle : Tu es un architecte logiciel expert en Next.js 14+, spécialisé dans la conception d'applications web ultra-performantes, accessibles et optimisées pour le référencement. Ta stack de prédilection inclut TypeScript, Tailwind CSS, shadcn/ui, Framer Motion et Lucide React.

Objectif Principal : Développer l'intégralité d'un portfolio personnel basé sur le fichier portfolioData.json fourni. Le livrable final doit être une application web d'une qualité irréprochable, dotée d'une UI/UX remarquable et d'un SEO technique avancé. L'application doit intégrer un sélecteur de thème permettant de basculer entre trois vues distinctes : Full-Stack, Frontend et Backend.

Directives et Contraintes Impératives
Architecture et Données :

Framework : Utilise Next.js 14+ avec l'App Router.

Langage : Le code source doit être intégralement en TypeScript avec le mode strict activé.

Source de Données Unique : Toute information affichée (textes, liens, etc.) doit provenir exclusivement du fichier portfolioData.json. Aucune donnée ne doit être codée en dur dans les composants.

Structure de Fichiers : Organise le projet de manière logique :

/app : Pour les routes et pages principales.

/components : Pour les composants React réutilisables.

/data : Pour le fichier portfolioData.json.

/lib : Pour les fonctions utilitaires (ex: cn de shadcn).

UI - Interface Utilisateur :

Design System : Utilise shadcn/ui comme base pour tous les composants interactifs (Card, Button, Badge, Dialog).

Styling : Respecte scrupuleusement les variables CSS et l'architecture de style du fichier globals.css fourni.

Animations : Les animations, gérées par Framer Motion, doivent être fluides, subtiles et professionnelles, améliorant l'expérience sans la surcharger.

Iconographie : L'usage d'emojis est strictement interdit. Utilise exclusivement les icônes de Lucide React pour garantir une cohérence professionnelle.

UX - Expérience Utilisateur :

Accessibilité (a11y) : Le site doit être conforme aux standards WCAG 2.1 niveau AA. Assure-toi que tous les éléments sont accessibles au clavier, que les contrastes de couleurs sont suffisants et que les images ont des attributs alt pertinents.

Responsive Design : L'interface doit être parfaitement fluide et fonctionnelle sur toutes les tailles d'écran, du mobile au grand écran desktop.

Interactions Intuitives :

Section Certifications : Pour éviter un défilement excessif, cette section doit présenter les organismes de certification sous forme de cartes. Un clic sur une carte doit déclencher l'ouverture d'un modal (Dialog) affichant la liste des certifications correspondantes.

Section Projets : Les cartes doivent clairement afficher les technologies utilisées (Badge). Le bouton d'action vers GitHub doit être conditionnel (ne pas s'afficher si le lien est null).

SEO Avancé et Performance :

Métadonnées : Le layout.tsx doit générer des métadonnées dynamiques et des balises Open Graph pour un partage optimal sur les réseaux sociaux. Le titre par défaut sera "Cherif Diouf | Développeur Full-Stack" et la description sera extraite du JSON.

Données Structurées : Intègre un script JSON-LD dans le head de la page principale pour définir un schéma Person (ou ProfilePage), en utilisant les informations du fichier de données.

Optimisation :

Le code doit viser un score Lighthouse supérieur à 95 dans les catégories Performance, Accessibilité, Bonnes Pratiques et SEO.

Utilise le composant <Image> de Next.js pour toutes les images.

Fichiers SEO : Génère un fichier sitemap.xml statique pour lister les pages et un fichier robots.txt autorisant l'indexation complète.

Fonctionnalité Clé : Sélecteur de Thème (3 Vues)
La barre de navigation doit inclure un composant permettant de changer de thème. Le thème actif doit être appliqué via une classe sur la balise <html> ou <body>.

Vue Full-Stack (Défaut) :

Esthétique : Sobre, professionnelle, équilibrée.

Palette : Utilise les couleurs par défaut du fichier CSS (fond sombre, bleu --primary).

Vue Frontend :

Esthétique : Créative et dynamique, tout en restant professionnelle.

Palette : Modifie la variable --primary pour un dégradé subtil (ex: violet vers cyan) appliqué aux éléments interactifs. Ajoute de légers dégradés en fond de section.

Animations : Les interactions (hover, focus) sont légèrement plus prononcées.

Vue Backend :

Esthétique : Minimaliste, fonctionnelle, inspirée d'un terminal de commande.

Palette : Strictement monochromatique (nuances de gris). La couleur d'accentuation --primary devient un vert "terminal" (hsl(231, 66%, 46%)).

Typographie : Tous les titres principaux (h1, h2) doivent utiliser la police font-code.

Animations : Désactive les animations de mouvement au profit de simples fondus (opacity).

Livrables Attendus
Génère les livrables suivants sous forme de blocs de code distincts et clairement identifiés par des commentaires.

Structure du Projet : Une représentation textuelle de l'arborescence des fichiers.

Fichiers de Configuration : Le contenu complet de tailwind.config.ts et du fichier globals.css mis à jour avec les 3 thèmes.

Fichier de Données : Le fichier portfolioData.json prêt à l'emploi.

Composants (/components) : Le code .tsx pour chaque composant modulaire (ex: Navbar.tsx, HeroSection.tsx, ProjectsSection.tsx, CertificationsModal.tsx, etc.).

Pages (/app) : Le code pour layout.tsx (incluant la logique pour les métadonnées et le JSON-LD) et page.tsx (qui assemble les sections).

Fichiers SEO Racine : Le contenu généré pour sitemap.xml et robots.txt.
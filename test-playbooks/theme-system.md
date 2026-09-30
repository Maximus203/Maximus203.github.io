# Thèmes clair et sombre du portfolio
> Surfaces : desktop 1440×1000, mobile 390×844 · Statut : ✅ · Build : local @ qyeUZLfvEfvyIb0VnPFZs · Testé : 2026-09-30

## Préconditions
- [WEB] Le build de production est servi et les anciennes données du navigateur peuvent être réinitialisées.
- [WEB] Les routes Accueil, Projets et Outils répondent sans erreur.

## Scénarios

### THEME.1 — [DESKTOP] Appliquer le thème clair avant le premier affichage
**Action** : enregistrer le choix clair, puis charger directement l’Accueil.
**Attendu** : aucun flash sombre ; le document et le site sont clairs ; le titre atteint 7:1 et le texte courant 4.5:1.
**Observé** : À DOMContentLoaded, `html` et `.site-root` sont tous deux en clair. Contrastes mesurés : titre 16,43:1, texte 6,38:1.
**Verdict** : ✅
**Issue** : —

### THEME.2 — [DESKTOP] Conserver le choix utilisateur
**Action** : naviguer vers Projets, puis actualiser complètement la page.
**Attendu** : le thème clair reste actif pendant la navigation et après actualisation.
**Observé** : Le clair reste actif après navigation Next.js et après actualisation complète.
**Verdict** : ✅
**Issue** : —

### THEME.3 — [DESKTOP] Diffuser les deux thèmes
**Action** : déclencher clair vers sombre, puis sombre vers clair.
**Attendu** : la diffusion fluide démarre dans les deux sens et le choix final est persisté.
**Observé** : Les rayons GSAP progressent dans les deux sens et le dernier choix est stocké.
**Verdict** : ✅
**Issue** : —

### THEME.4 — [DESKTOP] Thématiser les surfaces techniques
**Action** : observer le laboratoire, l’aperçu README, le générateur de mème et le cube plein écran en thème clair.
**Attendu** : aucune surface ne conserve un fond nuit accidentel ; le cube s’étend réellement et ses commandes restent lisibles.
**Observé** : Lab, README et mème héritent des tokens clairs. Le cube affiche 6 faces, 3 orbites et 6 satellites en plein écran.
**Verdict** : ✅
**Issue** : —

### THEME.5 — [MOBILE] Garder une expérience 2D accessible
**Action** : ouvrir l’Accueil clair à 390×844 avec mouvements réduits, puis ouvrir le chatbot.
**Attendu** : portrait 2D au ratio 4:5, aucun débordement, aucun sélecteur dimensionnel et zones tactiles d’au moins 44 px.
**Observé** : Mode 2D, ratio 0,8, largeur 390/390 sans débordement. Contrôles thème, autoplay et fermeture du chat mesurés à au moins 44 px.
**Verdict** : ✅
**Issue** : —

### THEME.6 — [WEB] Refuser les régressions silencieuses
**Action** : parcourir les scénarios en observant console et réseau.
**Attendu** : aucune erreur produit et aucune requête en échec.
**Observé** : 32 routes répondent ; tableaux d’erreurs console et réseau vides dans les deux suites.
**Verdict** : ✅
**Issue** : —

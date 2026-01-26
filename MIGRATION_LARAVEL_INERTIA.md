# Stratégie de Migration vers Laravel 12 + Inertia.js

## Table des matières
1. [Analyse de l'existant](#1-analyse-de-lexistant)
2. [Architecture cible](#2-architecture-cible)
3. [Stratégie de migration](#3-stratégie-de-migration)
4. [Plan d'implémentation détaillé](#4-plan-dimplémentation-détaillé)
5. [Mapping des composants](#5-mapping-des-composants)
6. [Gestion des données](#6-gestion-des-données)
7. [Considérations techniques](#7-considérations-techniques)
8. [Estimation et phases](#8-estimation-et-phases)

---

## 1. Analyse de l'existant

### 1.1 Architecture actuelle

| Aspect | Technologie | Version |
|--------|-------------|---------|
| **Type** | SPA (Single Page Application) | - |
| **Framework Frontend** | React | 19.2.3 |
| **Langage** | TypeScript | 5.8.2 |
| **Bundler** | Vite | 6.2.0 |
| **Styling** | Tailwind CSS | 3.x (CDN) |
| **Animations** | Framer Motion | 12.23.26 |
| **Icônes** | Lucide React | 0.561.0 |
| **State Management** | Zustand | 5.0.3 |
| **Backend** | Aucun (statique) | - |
| **Déploiement** | GitHub Pages | - |

### 1.2 Structure des fichiers actuels

```
/
├── index.html                    # Point d'entrée HTML
├── index.tsx                     # Point d'entrée React
├── App.tsx                       # Composant principal (32.5 KB)
├── constants.tsx                 # Données et labels i18n (33.4 KB)
├── types.ts                      # Interfaces TypeScript
├── store.ts                      # État global Zustand
├── components/                   # 13 composants React
│   ├── StickySidebar.tsx        # Carte profil 3D
│   ├── ProjectCard.tsx          # Carte projet
│   ├── ProjectRequestModal.tsx  # Modal formulaire
│   ├── ReadmeGenerator.tsx      # Outil README (45.4 KB)
│   ├── ImageConverter.tsx       # Convertisseur images (19.3 KB)
│   ├── MemeGenerator.tsx        # Générateur mèmes (10.7 KB)
│   ├── GalleryCarousel.tsx      # Carrousel galerie
│   ├── GalleryGrid.tsx          # Grille galerie
│   ├── IntroAnimation.tsx       # Animation d'intro
│   ├── ExperienceItem.tsx       # Item timeline
│   ├── ToolsGrid.tsx            # Grille outils
│   ├── TerminalBlock.tsx        # Bloc terminal
│   └── footer.tsx               # Pied de page
├── hooks/
│   └── useSEO.ts                # Hook SEO dynamique
└── public/assets/               # Images et ressources
```

### 1.3 Vues/Pages actuelles

| Vue | Route actuelle | Description |
|-----|----------------|-------------|
| **Home** | `view: 'home'` | Page principale avec sections |
| **Gallery** | `view: 'gallery'` | Galerie photos événements |
| **Tools** | `view: 'tools'` | Liste des outils développeur |
| **README Generator** | `view: 'readme_generator'` | Générateur README GitHub |
| **Image Converter** | `view: 'converter'` | Convertisseur d'images |
| **Meme Generator** | `view: 'meme'` | Générateur de mèmes |

### 1.4 Fonctionnalités clés à conserver

- ✅ **Thème clair/sombre** avec persistance
- ✅ **Multilingue** (FR, EN, ZH, JA)
- ✅ **Animation d'introduction**
- ✅ **Effet 3D** sur la carte profil
- ✅ **Carrousel infini** avec auto-scroll
- ✅ **Recherche projets** avec filtrage
- ✅ **Outils interactifs** (README, Images, Mèmes)
- ✅ **SEO dynamique** par page
- ✅ **Modal de demande projet**
- ✅ **Design responsive**

---

## 2. Architecture cible

### 2.1 Stack technique Laravel 12 + Inertia

| Couche | Technologie | Rôle |
|--------|-------------|------|
| **Backend** | Laravel 12 | API, routing, logique métier |
| **Bridge** | Inertia.js | Communication backend-frontend |
| **Frontend** | React 19 + TypeScript | Interface utilisateur |
| **Bundler** | Vite (via Laravel) | Build assets |
| **Styling** | Tailwind CSS 4 | Styles (config locale) |
| **Animations** | Framer Motion | Animations préservées |
| **State** | Zustand + Inertia shared data | État global |
| **BDD** | SQLite/MySQL | Données dynamiques |

### 2.2 Structure Laravel cible

```
laravel-portfolio/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── HomeController.php
│   │   │   ├── GalleryController.php
│   │   │   ├── ToolsController.php
│   │   │   ├── ProjectController.php
│   │   │   └── ContactController.php
│   │   └── Middleware/
│   │       └── HandleInertiaRequests.php
│   ├── Models/
│   │   ├── Project.php
│   │   ├── Experience.php
│   │   ├── Skill.php
│   │   ├── Education.php
│   │   ├── GalleryItem.php
│   │   └── ContactRequest.php
│   └── Services/
│       └── PortfolioDataService.php
├── resources/
│   ├── js/
│   │   ├── app.tsx                    # Point d'entrée Inertia
│   │   ├── types/
│   │   │   ├── index.d.ts
│   │   │   └── inertia.d.ts
│   │   ├── Pages/                     # Pages Inertia (ex-vues)
│   │   │   ├── Home.tsx
│   │   │   ├── Gallery.tsx
│   │   │   ├── Tools/
│   │   │   │   ├── Index.tsx
│   │   │   │   ├── ReadmeGenerator.tsx
│   │   │   │   ├── ImageConverter.tsx
│   │   │   │   └── MemeGenerator.tsx
│   │   │   └── Error.tsx
│   │   ├── Components/                # Composants réutilisables
│   │   │   ├── Layout/
│   │   │   │   ├── AppLayout.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── UI/
│   │   │   │   ├── StickySidebar.tsx
│   │   │   │   ├── ProjectCard.tsx
│   │   │   │   ├── ExperienceItem.tsx
│   │   │   │   ├── TerminalBlock.tsx
│   │   │   │   └── IntroAnimation.tsx
│   │   │   ├── Gallery/
│   │   │   │   ├── GalleryCarousel.tsx
│   │   │   │   └── GalleryGrid.tsx
│   │   │   └── Modals/
│   │   │       └── ProjectRequestModal.tsx
│   │   ├── Hooks/
│   │   │   └── useSEO.ts
│   │   ├── Store/
│   │   │   └── useAppStore.ts
│   │   ├── i18n/
│   │   │   ├── fr.ts
│   │   │   ├── en.ts
│   │   │   ├── zh.ts
│   │   │   └── ja.ts
│   │   └── Utils/
│   │       └── helpers.ts
│   ├── css/
│   │   └── app.css                    # Tailwind + styles custom
│   └── views/
│       └── app.blade.php              # Template racine Inertia
├── routes/
│   └── web.php                        # Routes Inertia
├── database/
│   ├── migrations/
│   └── seeders/
│       └── PortfolioSeeder.php
├── public/
│   └── assets/                        # Images migrées
├── config/
│   └── portfolio.php                  # Config portfolio
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

### 2.3 Flux de données Inertia

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Navigateur    │────▶│   Inertia.js    │────▶│    Laravel      │
│   (React SPA)   │◀────│   (Middleware)  │◀────│   Controller    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                       │                       │
         │                       │                       ▼
         │                       │              ┌─────────────────┐
         │                       │              │   Base de       │
         │                       │              │   données       │
         │                       │              └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Page Component                            │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────────────┐│
│  │ Props   │  │ Zustand │  │ Framer  │  │ Tailwind CSS        ││
│  │ Inertia │  │ Store   │  │ Motion  │  │ (même styles)       ││
│  └─────────┘  └─────────┘  └─────────┘  └─────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Stratégie de migration

### 3.1 Approche recommandée : Migration progressive

**Pourquoi cette approche ?**
- Minimise les risques de régression
- Permet de valider chaque étape
- Conserve le site actuel fonctionnel pendant la migration
- Facilite les tests comparatifs

### 3.2 Phases de migration

```
Phase 1: Infrastructure (Fondations)
         ↓
Phase 2: Composants UI (Migration React)
         ↓
Phase 3: Pages Inertia (Routing)
         ↓
Phase 4: Données dynamiques (BDD)
         ↓
Phase 5: Fonctionnalités avancées
         ↓
Phase 6: Tests et optimisation
         ↓
Phase 7: Déploiement
```

---

## 4. Plan d'implémentation détaillé

### Phase 1 : Infrastructure et configuration

#### 1.1 Création du projet Laravel

```bash
# Installation Laravel 12
composer create-project laravel/laravel portfolio-laravel "12.*"
cd portfolio-laravel

# Installation Inertia côté serveur
composer require inertiajs/inertia-laravel

# Installation des dépendances Node
npm install @inertiajs/react @types/react @types/react-dom
npm install react react-dom
npm install -D typescript @vitejs/plugin-react

# Installation des dépendances existantes
npm install framer-motion lucide-react zustand
npm install jszip file-saver
npm install -D @types/file-saver

# Installation Tailwind CSS 4
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### 1.2 Configuration Inertia

**app/Http/Middleware/HandleInertiaRequests.php**
```php
<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'locale' => app()->getLocale(),
            'availableLocales' => ['fr', 'en', 'zh', 'ja'],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'meta' => [
                'title' => config('portfolio.meta.title'),
                'description' => config('portfolio.meta.description'),
            ],
        ]);
    }
}
```

**resources/views/app.blade.php**
```blade
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="index, follow">

    <!-- Favicon -->
    <link rel="icon" type="image/webp" href="{{ asset('assets/logo.webp') }}">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    @inertiaHead
</head>
<body class="font-sans antialiased bg-white dark:bg-dark text-gray-900 dark:text-gray-100">
    @inertia
</body>
</html>
```

#### 1.3 Configuration TypeScript

**tsconfig.json**
```json
{
    "compilerOptions": {
        "target": "ESNext",
        "module": "ESNext",
        "moduleResolution": "bundler",
        "strict": true,
        "jsx": "react-jsx",
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "baseUrl": ".",
        "paths": {
            "@/*": ["resources/js/*"],
            "@/Components/*": ["resources/js/Components/*"],
            "@/Pages/*": ["resources/js/Pages/*"],
            "@/Hooks/*": ["resources/js/Hooks/*"],
            "@/Store/*": ["resources/js/Store/*"],
            "@/i18n/*": ["resources/js/i18n/*"]
        }
    },
    "include": ["resources/js/**/*"],
    "exclude": ["node_modules"]
}
```

#### 1.4 Configuration Vite

**vite.config.ts**
```typescript
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
        },
    },
    define: {
        'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY),
    },
});
```

#### 1.5 Configuration Tailwind

**tailwind.config.js**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['"JetBrains Mono"', '"Cascadia Code"', 'monospace'],
            },
            colors: {
                primary: '#4F46E5',
                secondary: '#10B981',
                dark: '#0f172a',
            },
        },
    },
    plugins: [],
};
```

**resources/css/app.css**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Styles personnalisés migrés de index.html */
html {
    scroll-behavior: smooth;
}

/* Scrollbar personnalisée */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
}

.dark ::-webkit-scrollbar-track {
    background: #1e293b;
}

.dark ::-webkit-scrollbar-thumb {
    background: #475569;
}

.dark ::-webkit-scrollbar-thumb:hover {
    background: #64748b;
}

/* Effet glass card */
.glass-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.dark .glass-card {
    background: rgba(15, 23, 42, 0.7);
}

/* Utilitaire hide-scrollbar */
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}

.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
```

---

### Phase 2 : Migration des composants React

#### 2.1 Point d'entrée Inertia

**resources/js/app.tsx**
```tsx
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import AppLayout from '@/Components/Layout/AppLayout';

createInertiaApp({
    title: (title) => title ? `${title} - Cherif Diouf` : 'Cherif Diouf - Portfolio',
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true });
        const page = resolvePageComponent(`./Pages/${name}.tsx`, pages);

        // Appliquer le layout par défaut
        page.then((module: any) => {
            module.default.layout = module.default.layout ||
                ((page: React.ReactNode) => <AppLayout>{page}</AppLayout>);
        });

        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: {
        color: '#4F46E5',
        showSpinner: true,
    },
});
```

#### 2.2 Types Inertia

**resources/js/types/inertia.d.ts**
```typescript
import { PageProps as InertiaPageProps } from '@inertiajs/core';

export interface SharedProps {
    locale: 'fr' | 'en' | 'zh' | 'ja';
    availableLocales: string[];
    flash: {
        success: string | null;
        error: string | null;
    };
    meta: {
        title: string;
        description: string;
    };
}

export type PageProps<T extends Record<string, unknown> = {}> = T & SharedProps;

declare module '@inertiajs/core' {
    interface PageProps extends SharedProps {}
}
```

#### 2.3 Migration du Store Zustand

**resources/js/Store/useAppStore.ts**
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'fr' | 'en' | 'zh' | 'ja';
export type Theme = 'light' | 'dark';

interface AppState {
    // Theme
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;

    // Language
    lang: Language;
    setLang: (lang: Language) => void;

    // UI State
    showIntro: boolean;
    setShowIntro: (show: boolean) => void;
    isMobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
    isProjectModalOpen: boolean;
    setProjectModalOpen: (open: boolean) => void;

    // Search
    projectSearch: string;
    setProjectSearch: (search: string) => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            // Theme - détection système par défaut
            theme: typeof window !== 'undefined' &&
                   window.matchMedia('(prefers-color-scheme: dark)').matches
                   ? 'dark' : 'light',
            setTheme: (theme) => {
                set({ theme });
                document.documentElement.classList.toggle('dark', theme === 'dark');
            },
            toggleTheme: () => set((state) => {
                const newTheme = state.theme === 'light' ? 'dark' : 'light';
                document.documentElement.classList.toggle('dark', newTheme === 'dark');
                return { theme: newTheme };
            }),

            // Language
            lang: 'fr',
            setLang: (lang) => set({ lang }),

            // UI State
            showIntro: true,
            setShowIntro: (showIntro) => set({ showIntro }),
            isMobileMenuOpen: false,
            setMobileMenuOpen: (isMobileMenuOpen) => set({ isMobileMenuOpen }),
            isProjectModalOpen: false,
            setProjectModalOpen: (isProjectModalOpen) => set({ isProjectModalOpen }),

            // Search
            projectSearch: '',
            setProjectSearch: (projectSearch) => set({ projectSearch }),
        }),
        {
            name: 'portfolio-storage',
            partialize: (state) => ({
                theme: state.theme,
                lang: state.lang,
                showIntro: state.showIntro,
            }),
        }
    )
);
```

#### 2.4 Composant Layout principal

**resources/js/Components/Layout/AppLayout.tsx**
```tsx
import { ReactNode, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/Store/useAppStore';
import Header from './Header';
import Footer from '@/Components/UI/Footer';
import IntroAnimation from '@/Components/UI/IntroAnimation';
import ProjectRequestModal from '@/Components/Modals/ProjectRequestModal';

interface Props {
    children: ReactNode;
    title?: string;
    description?: string;
}

export default function AppLayout({ children, title, description }: Props) {
    const { meta } = usePage().props;
    const { theme, showIntro, isProjectModalOpen, setProjectModalOpen } = useAppStore();

    // Synchroniser le thème avec le DOM
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return (
        <>
            <Head>
                <title>{title || meta.title}</title>
                <meta name="description" content={description || meta.description} />
            </Head>

            <AnimatePresence>
                {showIntro && <IntroAnimation />}
            </AnimatePresence>

            <div className="min-h-screen flex flex-col">
                <Header />

                <main className="flex-1">
                    {children}
                </main>

                <Footer />
            </div>

            <AnimatePresence>
                {isProjectModalOpen && (
                    <ProjectRequestModal
                        onClose={() => setProjectModalOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
```

#### 2.5 Migration des composants existants

Les composants suivants peuvent être migrés avec des modifications minimales :

| Composant actuel | Nouveau chemin | Modifications requises |
|-----------------|----------------|------------------------|
| `StickySidebar.tsx` | `Components/UI/StickySidebar.tsx` | Import paths, types Inertia |
| `ProjectCard.tsx` | `Components/UI/ProjectCard.tsx` | Props depuis Inertia |
| `ExperienceItem.tsx` | `Components/UI/ExperienceItem.tsx` | Aucune |
| `TerminalBlock.tsx` | `Components/UI/TerminalBlock.tsx` | Aucune |
| `IntroAnimation.tsx` | `Components/UI/IntroAnimation.tsx` | Aucune |
| `GalleryCarousel.tsx` | `Components/Gallery/GalleryCarousel.tsx` | Props depuis controller |
| `GalleryGrid.tsx` | `Components/Gallery/GalleryGrid.tsx` | Props depuis controller |
| `ProjectRequestModal.tsx` | `Components/Modals/ProjectRequestModal.tsx` | Inertia form handling |
| `footer.tsx` | `Components/UI/Footer.tsx` | Import i18n |
| `ReadmeGenerator.tsx` | `Pages/Tools/ReadmeGenerator.tsx` | Page Inertia complète |
| `ImageConverter.tsx` | `Pages/Tools/ImageConverter.tsx` | Page Inertia complète |
| `MemeGenerator.tsx` | `Pages/Tools/MemeGenerator.tsx` | Page Inertia complète |

---

### Phase 3 : Routes et Controllers Laravel

#### 3.1 Routes Web

**routes/web.php**
```php
<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ToolsController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\LocaleController;
use Illuminate\Support\Facades\Route;

// Page d'accueil
Route::get('/', [HomeController::class, 'index'])->name('home');

// Galerie
Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery');

// Outils
Route::prefix('tools')->name('tools.')->group(function () {
    Route::get('/', [ToolsController::class, 'index'])->name('index');
    Route::get('/readme-generator', [ToolsController::class, 'readmeGenerator'])->name('readme');
    Route::get('/image-converter', [ToolsController::class, 'imageConverter'])->name('converter');
    Route::get('/meme-generator', [ToolsController::class, 'memeGenerator'])->name('meme');
});

// Contact / Demande de projet
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// Changement de langue
Route::post('/locale/{locale}', [LocaleController::class, 'update'])->name('locale.update');

// Sitemap dynamique
Route::get('/sitemap.xml', function () {
    return response()->view('sitemap')->header('Content-Type', 'application/xml');
});
```

#### 3.2 HomeController

**app/Http/Controllers/HomeController.php**
```php
<?php

namespace App\Http\Controllers;

use App\Services\PortfolioDataService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(
        private PortfolioDataService $portfolioService
    ) {}

    public function index(): Response
    {
        return Inertia::render('Home', [
            'profile' => $this->portfolioService->getProfile(),
            'experiences' => $this->portfolioService->getExperiences(),
            'projects' => $this->portfolioService->getProjects(),
            'skills' => $this->portfolioService->getSkills(),
            'education' => $this->portfolioService->getEducation(),
            'certifications' => $this->portfolioService->getCertifications(),
        ]);
    }
}
```

#### 3.3 GalleryController

**app/Http/Controllers/GalleryController.php**
```php
<?php

namespace App\Http\Controllers;

use App\Services\PortfolioDataService;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function __construct(
        private PortfolioDataService $portfolioService
    ) {}

    public function index(): Response
    {
        return Inertia::render('Gallery', [
            'featuredItems' => $this->portfolioService->getFeaturedGalleryItems(),
            'galleryItems' => $this->portfolioService->getGalleryItems(),
        ]);
    }
}
```

#### 3.4 ToolsController

**app/Http/Controllers/ToolsController.php**
```php
<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class ToolsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Tools/Index', [
            'tools' => [
                [
                    'id' => 'readme',
                    'name' => 'README Generator',
                    'description' => 'Créez des README GitHub professionnels',
                    'icon' => 'FileText',
                    'route' => 'tools.readme',
                ],
                [
                    'id' => 'converter',
                    'name' => 'Image Converter',
                    'description' => 'Convertissez vos images en différents formats',
                    'icon' => 'Image',
                    'route' => 'tools.converter',
                ],
                [
                    'id' => 'meme',
                    'name' => 'Meme Generator',
                    'description' => 'Créez des mèmes personnalisés',
                    'icon' => 'Smile',
                    'route' => 'tools.meme',
                ],
            ],
        ]);
    }

    public function readmeGenerator(): Response
    {
        return Inertia::render('Tools/ReadmeGenerator');
    }

    public function imageConverter(): Response
    {
        return Inertia::render('Tools/ImageConverter');
    }

    public function memeGenerator(): Response
    {
        return Inertia::render('Tools/MemeGenerator');
    }
}
```

#### 3.5 ContactController

**app/Http/Controllers/ContactController.php**
```php
<?php

namespace App\Http\Controllers;

use App\Models\ContactRequest;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use App\Mail\ProjectRequestMail;

class ContactController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'company' => 'nullable|string|max:255',
            'project_type' => 'required|string|max:255',
            'budget' => 'nullable|string|max:255',
            'deadline' => 'nullable|date',
            'description' => 'required|string|max:5000',
        ]);

        $contactRequest = ContactRequest::create($validated);

        // Envoi d'email (optionnel)
        // Mail::to(config('portfolio.contact_email'))->send(
        //     new ProjectRequestMail($contactRequest)
        // );

        return back()->with('success', 'Votre demande a été envoyée avec succès !');
    }
}
```

---

### Phase 4 : Modèles et Base de données

#### 4.1 Migrations

**database/migrations/create_portfolio_tables.php**
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Projets
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->json('title'); // Multilingue
            $table->json('description');
            $table->string('image')->nullable();
            $table->json('tags');
            $table->string('github_url')->nullable();
            $table->string('live_url')->nullable();
            $table->boolean('featured')->default(false);
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Expériences
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->json('title');
            $table->json('company');
            $table->json('location');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->boolean('current')->default(false);
            $table->json('description');
            $table->json('technologies');
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Compétences
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('category');
            $table->json('name');
            $table->string('icon')->nullable();
            $table->integer('level')->default(0); // 0-100
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Éducation
        Schema::create('education', function (Blueprint $table) {
            $table->id();
            $table->json('degree');
            $table->json('institution');
            $table->json('location');
            $table->string('year');
            $table->json('description')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Galerie
        Schema::create('gallery_items', function (Blueprint $table) {
            $table->id();
            $table->json('title');
            $table->json('description')->nullable();
            $table->string('image');
            $table->string('category')->nullable();
            $table->boolean('featured')->default(false);
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Demandes de contact
        Schema::create('contact_requests', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('company')->nullable();
            $table->string('project_type');
            $table->string('budget')->nullable();
            $table->date('deadline')->nullable();
            $table->text('description');
            $table->string('status')->default('new');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_requests');
        Schema::dropIfExists('gallery_items');
        Schema::dropIfExists('education');
        Schema::dropIfExists('skills');
        Schema::dropIfExists('experiences');
        Schema::dropIfExists('projects');
    }
};
```

#### 4.2 Modèles Eloquent

**app/Models/Project.php**
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Project extends Model
{
    protected $fillable = [
        'title', 'description', 'image', 'tags',
        'github_url', 'live_url', 'featured', 'order'
    ];

    protected $casts = [
        'title' => 'array',
        'description' => 'array',
        'tags' => 'array',
        'featured' => 'boolean',
    ];

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderByDesc('created_at');
    }
}
```

#### 4.3 Service de données

**app/Services/PortfolioDataService.php**
```php
<?php

namespace App\Services;

use App\Models\Project;
use App\Models\Experience;
use App\Models\Skill;
use App\Models\Education;
use App\Models\GalleryItem;
use Illuminate\Support\Collection;

class PortfolioDataService
{
    public function getProfile(): array
    {
        return config('portfolio.profile');
    }

    public function getProjects(): Collection
    {
        return Project::ordered()->get();
    }

    public function getExperiences(): Collection
    {
        return Experience::ordered()->get();
    }

    public function getSkills(): Collection
    {
        return Skill::ordered()->get()->groupBy('category');
    }

    public function getEducation(): Collection
    {
        return Education::ordered()->get();
    }

    public function getCertifications(): array
    {
        return config('portfolio.certifications', []);
    }

    public function getFeaturedGalleryItems(): Collection
    {
        return GalleryItem::where('featured', true)->ordered()->get();
    }

    public function getGalleryItems(): Collection
    {
        return GalleryItem::ordered()->get();
    }
}
```

#### 4.4 Seeder pour données initiales

**database/seeders/PortfolioSeeder.php**
```php
<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Experience;
use App\Models\Skill;
use App\Models\Education;
use App\Models\GalleryItem;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        // Migration des données depuis constants.tsx
        // Les données multilingues sont stockées en JSON

        // Exemple de projet
        Project::create([
            'title' => [
                'fr' => 'Application E-commerce',
                'en' => 'E-commerce Application',
                'zh' => '电子商务应用',
                'ja' => 'Eコマースアプリ',
            ],
            'description' => [
                'fr' => 'Plateforme de vente en ligne complète',
                'en' => 'Complete online sales platform',
                'zh' => '完整的在线销售平台',
                'ja' => '完全なオンライン販売プラットフォーム',
            ],
            'image' => '/assets/projets/ecommerce.webp',
            'tags' => ['Laravel', 'React', 'MySQL', 'Tailwind'],
            'github_url' => 'https://github.com/example/ecommerce',
            'live_url' => 'https://example.com',
            'featured' => true,
            'order' => 1,
        ]);

        // Les autres données seront migrées depuis constants.tsx
        // via un script de migration dédié
    }
}
```

---

### Phase 5 : Pages Inertia

#### 5.1 Page Home

**resources/js/Pages/Home.tsx**
```tsx
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/Store/useAppStore';
import { getTranslation } from '@/i18n';
import StickySidebar from '@/Components/UI/StickySidebar';
import ExperienceItem from '@/Components/UI/ExperienceItem';
import ProjectCard from '@/Components/UI/ProjectCard';
import TerminalBlock from '@/Components/UI/TerminalBlock';
import type { PageProps } from '@/types/inertia';

interface HomeProps extends PageProps {
    profile: ProfileData;
    experiences: Experience[];
    projects: Project[];
    skills: Record<string, Skill[]>;
    education: Education[];
}

export default function Home({
    profile,
    experiences,
    projects,
    skills,
    education
}: HomeProps) {
    const { lang, projectSearch, setProjectSearch } = useAppStore();
    const t = getTranslation(lang);

    const filteredProjects = projects.filter(project => {
        const search = projectSearch.toLowerCase();
        const title = (project.title[lang] || project.title.fr).toLowerCase();
        const tags = project.tags.join(' ').toLowerCase();
        return title.includes(search) || tags.includes(search);
    });

    return (
        <>
            <Head title={t.nav.home} />

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="lg:w-1/3 xl:w-1/4">
                        <StickySidebar profile={profile} />
                    </aside>

                    {/* Main content */}
                    <main className="lg:w-2/3 xl:w-3/4 space-y-16">
                        {/* Section À propos */}
                        <section id="about">
                            <h2 className="text-2xl font-bold mb-6">{t.sections.about}</h2>
                            <TerminalBlock content={profile.bio[lang]} />
                        </section>

                        {/* Section Expériences */}
                        <section id="experience">
                            <h2 className="text-2xl font-bold mb-6">{t.sections.experience}</h2>
                            <div className="space-y-6">
                                {experiences.map((exp, index) => (
                                    <ExperienceItem key={exp.id} experience={exp} index={index} />
                                ))}
                            </div>
                        </section>

                        {/* Section Projets */}
                        <section id="projects">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">{t.sections.projects}</h2>
                                <input
                                    type="text"
                                    placeholder={t.search.placeholder}
                                    value={projectSearch}
                                    onChange={(e) => setProjectSearch(e.target.value)}
                                    className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                {filteredProjects.map((project, index) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <ProjectCard project={project} />
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Section Compétences */}
                        <section id="skills">
                            <h2 className="text-2xl font-bold mb-6">{t.sections.skills}</h2>
                            {Object.entries(skills).map(([category, categorySkills]) => (
                                <div key={category} className="mb-8">
                                    <h3 className="text-lg font-semibold mb-4">{category}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {categorySkills.map((skill) => (
                                            <span
                                                key={skill.id}
                                                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                                            >
                                                {skill.name[lang] || skill.name.fr}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </section>

                        {/* Section Éducation */}
                        <section id="education">
                            <h2 className="text-2xl font-bold mb-6">{t.sections.education}</h2>
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <div key={edu.id} className="p-4 border rounded-lg dark:border-gray-700">
                                        <h3 className="font-semibold">{edu.degree[lang]}</h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {edu.institution[lang]} - {edu.year}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </>
    );
}
```

#### 5.2 Page Gallery

**resources/js/Pages/Gallery.tsx**
```tsx
import { Head } from '@inertiajs/react';
import { useAppStore } from '@/Store/useAppStore';
import { getTranslation } from '@/i18n';
import GalleryCarousel from '@/Components/Gallery/GalleryCarousel';
import GalleryGrid from '@/Components/Gallery/GalleryGrid';
import type { PageProps } from '@/types/inertia';

interface GalleryProps extends PageProps {
    featuredItems: GalleryItem[];
    galleryItems: GalleryItem[];
}

export default function Gallery({ featuredItems, galleryItems }: GalleryProps) {
    const { lang } = useAppStore();
    const t = getTranslation(lang);

    return (
        <>
            <Head title={t.nav.gallery} />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">{t.nav.gallery}</h1>

                {/* Carrousel des items en vedette */}
                <section className="mb-12">
                    <h2 className="text-xl font-semibold mb-4">{t.gallery.featured}</h2>
                    <GalleryCarousel items={featuredItems} />
                </section>

                {/* Grille complète */}
                <section>
                    <h2 className="text-xl font-semibold mb-4">{t.gallery.all}</h2>
                    <GalleryGrid items={galleryItems} />
                </section>
            </div>
        </>
    );
}
```

#### 5.3 Page Tools Index

**resources/js/Pages/Tools/Index.tsx**
```tsx
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { useAppStore } from '@/Store/useAppStore';
import { getTranslation } from '@/i18n';
import type { PageProps } from '@/types/inertia';

interface Tool {
    id: string;
    name: string;
    description: string;
    icon: keyof typeof Icons;
    route: string;
}

interface ToolsProps extends PageProps {
    tools: Tool[];
}

export default function ToolsIndex({ tools }: ToolsProps) {
    const { lang } = useAppStore();
    const t = getTranslation(lang);

    return (
        <>
            <Head title={t.nav.tools} />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">{t.nav.tools}</h1>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool, index) => {
                        const IconComponent = Icons[tool.icon] as React.FC<{ className?: string }>;

                        return (
                            <motion.div
                                key={tool.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={route(tool.route)}
                                    className="block p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-primary/10 rounded-lg">
                                            <IconComponent className="w-6 h-6 text-primary" />
                                        </div>
                                        <h2 className="text-xl font-semibold">{tool.name}</h2>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {tool.description}
                                    </p>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
```

---

### Phase 6 : Internationalisation (i18n)

#### 6.1 Structure des fichiers de traduction

**resources/js/i18n/index.ts**
```typescript
import fr from './fr';
import en from './en';
import zh from './zh';
import ja from './ja';

export type Language = 'fr' | 'en' | 'zh' | 'ja';

const translations = { fr, en, zh, ja };

export function getTranslation(lang: Language) {
    return translations[lang] || translations.fr;
}

export { fr, en, zh, ja };
```

**resources/js/i18n/fr.ts**
```typescript
export default {
    nav: {
        home: 'Accueil',
        about: 'À propos',
        experience: 'Expériences',
        projects: 'Projets',
        skills: 'Compétences',
        education: 'Formation',
        gallery: 'Galerie',
        tools: 'Outils',
        contact: 'Contact',
    },
    sections: {
        about: 'À propos de moi',
        experience: 'Expériences professionnelles',
        projects: 'Mes projets',
        skills: 'Compétences techniques',
        education: 'Formation académique',
    },
    search: {
        placeholder: 'Rechercher un projet...',
    },
    gallery: {
        featured: 'En vedette',
        all: 'Toutes les photos',
    },
    contact: {
        title: 'Demande de projet',
        name: 'Nom complet',
        email: 'Email',
        company: 'Entreprise',
        projectType: 'Type de projet',
        budget: 'Budget estimé',
        deadline: 'Date limite souhaitée',
        description: 'Description du projet',
        submit: 'Envoyer',
        success: 'Votre demande a été envoyée avec succès !',
    },
    footer: {
        rights: 'Tous droits réservés',
        madeWith: 'Fait avec',
    },
    // ... autres traductions
};
```

---

## 5. Mapping des composants

### 5.1 Tableau de correspondance

| Composant actuel | Localisation actuelle | Nouvelle localisation | Modifications |
|-----------------|----------------------|----------------------|---------------|
| **App.tsx** | `/App.tsx` | **Supprimé** (logique répartie) | Éclaté en Pages + Layout |
| **StickySidebar** | `/components/StickySidebar.tsx` | `/resources/js/Components/UI/StickySidebar.tsx` | Import paths |
| **ProjectCard** | `/components/ProjectCard.tsx` | `/resources/js/Components/UI/ProjectCard.tsx` | Props typées Inertia |
| **ExperienceItem** | `/components/ExperienceItem.tsx` | `/resources/js/Components/UI/ExperienceItem.tsx` | Aucune |
| **TerminalBlock** | `/components/TerminalBlock.tsx` | `/resources/js/Components/UI/TerminalBlock.tsx` | Aucune |
| **IntroAnimation** | `/components/IntroAnimation.tsx` | `/resources/js/Components/UI/IntroAnimation.tsx` | Aucune |
| **GalleryCarousel** | `/components/GalleryCarousel.tsx` | `/resources/js/Components/Gallery/GalleryCarousel.tsx` | Props depuis controller |
| **GalleryGrid** | `/components/GalleryGrid.tsx` | `/resources/js/Components/Gallery/GalleryGrid.tsx` | Props depuis controller |
| **ProjectRequestModal** | `/components/ProjectRequestModal.tsx` | `/resources/js/Components/Modals/ProjectRequestModal.tsx` | Inertia.useForm() |
| **Footer** | `/components/footer.tsx` | `/resources/js/Components/UI/Footer.tsx` | Import i18n |
| **ReadmeGenerator** | `/components/ReadmeGenerator.tsx` | `/resources/js/Pages/Tools/ReadmeGenerator.tsx` | Page Inertia |
| **ImageConverter** | `/components/ImageConverter.tsx` | `/resources/js/Pages/Tools/ImageConverter.tsx` | Page Inertia |
| **MemeGenerator** | `/components/MemeGenerator.tsx` | `/resources/js/Pages/Tools/MemeGenerator.tsx` | Page Inertia |
| **ToolsGrid** | `/components/ToolsGrid.tsx` | **Intégré** dans `Pages/Tools/Index.tsx` | - |
| **store.ts** | `/store.ts` | `/resources/js/Store/useAppStore.ts` | Persist middleware |
| **constants.tsx** | `/constants.tsx` | **BDD + config/portfolio.php** | Migration données |
| **types.ts** | `/types.ts` | `/resources/js/types/` | Séparation fichiers |
| **useSEO** | `/hooks/useSEO.ts` | **Supprimé** (Inertia Head) | Remplacé par Head |

### 5.2 Exemple de migration : ProjectRequestModal

**Avant (React pur):**
```tsx
// Gestion état local + pas de soumission backend
const [formData, setFormData] = useState({...});
const handleSubmit = (e) => {
    e.preventDefault();
    // Pas de vraie soumission
};
```

**Après (Inertia):**
```tsx
import { useForm } from '@inertiajs/react';

export default function ProjectRequestModal({ onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        company: '',
        project_type: '',
        budget: '',
        deadline: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('contact.store'), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Champs avec gestion d'erreurs serveur */}
            <input
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
            />
            {errors.name && <span className="text-red-500">{errors.name}</span>}

            <button type="submit" disabled={processing}>
                {processing ? 'Envoi...' : 'Envoyer'}
            </button>
        </form>
    );
}
```

---

## 6. Gestion des données

### 6.1 Migration des données statiques

Les données actuellement dans `constants.tsx` seront migrées vers :

| Données | Source actuelle | Destination | Méthode |
|---------|-----------------|-------------|---------|
| **Labels UI** | `constants.tsx` | `/resources/js/i18n/*.ts` | Fichiers de traduction |
| **Profil** | `constants.tsx` | `config/portfolio.php` | Configuration Laravel |
| **Projets** | `constants.tsx` | Table `projects` | Seeder + Admin |
| **Expériences** | `constants.tsx` | Table `experiences` | Seeder + Admin |
| **Compétences** | `constants.tsx` | Table `skills` | Seeder + Admin |
| **Éducation** | `constants.tsx` | Table `education` | Seeder + Admin |
| **Galerie** | `constants.tsx` | Table `gallery_items` | Seeder + Admin |
| **Certifications** | `constants.tsx` | `config/portfolio.php` | Configuration |

### 6.2 Script de migration des données

**scripts/migrate-constants.ts**
```typescript
// Script Node.js pour convertir constants.tsx en seeders Laravel
// À exécuter une fois pour générer les fichiers de seed

import * as fs from 'fs';
import { RESUME_DATA, LABELS } from '../constants';

// Génération du seeder PHP
const generateSeeder = () => {
    const projects = RESUME_DATA.projects.map(p => ({
        title: JSON.stringify(p.title),
        description: JSON.stringify(p.description),
        // ...
    }));

    // Écriture du fichier PHP
    fs.writeFileSync(
        'database/seeders/GeneratedPortfolioSeeder.php',
        generatePHPSeeder(projects)
    );
};
```

### 6.3 Configuration Portfolio

**config/portfolio.php**
```php
<?php

return [
    'profile' => [
        'name' => 'Cherif Diouf',
        'title' => [
            'fr' => 'Développeur Full Stack',
            'en' => 'Full Stack Developer',
            'zh' => '全栈开发人员',
            'ja' => 'フルスタック開発者',
        ],
        'email' => 'contact@cherif-diouf.com',
        'phone' => '+221 XX XXX XX XX',
        'location' => 'Dakar, Sénégal',
        'avatar' => '/assets/logo.webp',
        'bio' => [
            'fr' => 'Développeur passionné...',
            'en' => 'Passionate developer...',
            // ...
        ],
        'social' => [
            'github' => 'https://github.com/Maximus203',
            'linkedin' => 'https://linkedin.com/in/cherif-diouf',
            // ...
        ],
        'cv' => [
            'fr' => '/cv/cv-cherif-diouf-fr.pdf',
            'en' => '/cv/cv-cherif-diouf-en.pdf',
        ],
    ],

    'meta' => [
        'title' => 'Cherif Diouf - Portfolio',
        'description' => 'Portfolio de Cherif Diouf, développeur Full Stack',
    ],

    'contact_email' => env('CONTACT_EMAIL', 'contact@cherif-diouf.com'),
];
```

---

## 7. Considérations techniques

### 7.1 Avantages de la migration

| Aspect | Avant (React SPA) | Après (Laravel + Inertia) |
|--------|-------------------|---------------------------|
| **SEO** | Client-side rendering, SEO limité | SSR possible, meilleur SEO |
| **Formulaires** | Pas de backend, simulation | Validation serveur, persistance |
| **Données** | Statiques dans JS | Dynamiques en BDD |
| **Sécurité** | Aucune protection | CSRF, validation, sanitization |
| **Évolutivité** | Limitée | Admin panel possible |
| **Cache** | Navigateur uniquement | Cache serveur + CDN |
| **Analytics** | Client-side | Server-side + client |
| **API** | Aucune | REST/GraphQL possible |

### 7.2 Points d'attention

1. **Performance**
   - Utiliser le lazy loading des pages Inertia
   - Configurer le cache Laravel (Redis recommandé)
   - Optimiser les images avec intervention/image
   - Activer la compression Gzip/Brotli

2. **Déploiement**
   - Nécessite PHP 8.2+ et Composer
   - Hébergement compatible Laravel (Forge, Vapor, VPS)
   - Configuration Nginx/Apache requise
   - Migration depuis GitHub Pages vers serveur

3. **Données**
   - Migration unique des données constants.tsx
   - Validation des données multilingues
   - Backup avant migration

4. **Tests**
   - Tests unitaires PHPUnit pour backend
   - Tests E2E avec Playwright/Cypress
   - Comparaison visuelle avant/après

### 7.3 Dépendances à conserver

```json
{
    "dependencies": {
        "@inertiajs/react": "^1.0",
        "react": "^19.0",
        "react-dom": "^19.0",
        "framer-motion": "^12.0",
        "lucide-react": "^0.400",
        "zustand": "^5.0",
        "jszip": "^3.10",
        "file-saver": "^2.0"
    },
    "devDependencies": {
        "typescript": "^5.0",
        "@types/react": "^19.0",
        "@types/react-dom": "^19.0",
        "@types/file-saver": "^2.0",
        "@vitejs/plugin-react": "^5.0",
        "tailwindcss": "^4.0",
        "autoprefixer": "^10.0",
        "postcss": "^8.0"
    }
}
```

---

## 8. Estimation et phases

### 8.1 Découpage en phases

| Phase | Description | Complexité |
|-------|-------------|------------|
| **Phase 1** | Infrastructure Laravel + Inertia | Moyenne |
| **Phase 2** | Migration composants UI | Faible |
| **Phase 3** | Pages Inertia + Routes | Moyenne |
| **Phase 4** | Base de données + Modèles | Moyenne |
| **Phase 5** | Fonctionnalités (formulaires, i18n) | Moyenne |
| **Phase 6** | Tests + Optimisation | Moyenne |
| **Phase 7** | Déploiement + CI/CD | Moyenne |

### 8.2 Checklist de migration

#### Phase 1 : Infrastructure
- [ ] Créer projet Laravel 12
- [ ] Installer Inertia.js (serveur + client)
- [ ] Configurer Vite avec React + TypeScript
- [ ] Configurer Tailwind CSS
- [ ] Créer template Blade racine
- [ ] Configurer HandleInertiaRequests middleware

#### Phase 2 : Composants
- [ ] Migrer StickySidebar
- [ ] Migrer ProjectCard
- [ ] Migrer ExperienceItem
- [ ] Migrer TerminalBlock
- [ ] Migrer IntroAnimation
- [ ] Migrer GalleryCarousel
- [ ] Migrer GalleryGrid
- [ ] Migrer Footer
- [ ] Créer AppLayout
- [ ] Créer Header

#### Phase 3 : Pages
- [ ] Créer page Home
- [ ] Créer page Gallery
- [ ] Créer page Tools/Index
- [ ] Migrer ReadmeGenerator (page)
- [ ] Migrer ImageConverter (page)
- [ ] Migrer MemeGenerator (page)
- [ ] Créer page Error

#### Phase 4 : Données
- [ ] Créer migrations BDD
- [ ] Créer modèles Eloquent
- [ ] Créer PortfolioDataService
- [ ] Script migration constants.tsx
- [ ] Créer seeders
- [ ] Configurer config/portfolio.php

#### Phase 5 : Fonctionnalités
- [ ] Migrer store Zustand
- [ ] Créer fichiers i18n
- [ ] Migrer ProjectRequestModal (Inertia form)
- [ ] Créer ContactController
- [ ] Configurer routes
- [ ] Tester formulaire contact

#### Phase 6 : Tests
- [ ] Tests unitaires controllers
- [ ] Tests intégration pages
- [ ] Tests E2E navigation
- [ ] Comparaison visuelle
- [ ] Tests performance
- [ ] Tests SEO

#### Phase 7 : Déploiement
- [ ] Configurer environnement production
- [ ] Configurer CI/CD GitHub Actions
- [ ] Migrer assets (images)
- [ ] Configurer DNS
- [ ] Déployer
- [ ] Monitoring

---

## Conclusion

Cette stratégie de migration permet de :

1. **Conserver l'identité visuelle** : Tous les styles Tailwind et animations Framer Motion sont préservés
2. **Améliorer l'architecture** : Séparation claire backend/frontend avec Inertia comme bridge
3. **Ajouter des fonctionnalités** : Formulaires fonctionnels, données dynamiques, admin possible
4. **Optimiser le SEO** : Rendu serveur, meta tags dynamiques, sitemap automatique
5. **Faciliter la maintenance** : Code organisé, types stricts, tests possibles

La migration peut être réalisée de manière progressive, permettant de valider chaque étape avant de passer à la suivante.

---

*Document généré le 26 janvier 2026*
*Version : 1.0*

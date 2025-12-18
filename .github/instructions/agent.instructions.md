---
applyTo: '**'
---

# Instructions de Développement - Portfolio Laravel 12 + Inertia.js

## 🎯 Architecture du Projet

### Stack Technique Obligatoire
- **Backend :** Laravel 12 (PHP 8.3+)
- **Frontend :** Inertia.js + React 18+ + TypeScript 5+
- **Styling :** TailwindCSS 3.4+
- **Animations :** Framer Motion 11+
- **Icons :** Lucide React
- **Build :** Vite 5+
- **Tests :** Pest PHP (backend) + Jest/Vitest (frontend)
- **Database :** MySQL 8.0+
- **Hosting :** O2Switch (hébergement mutualisé)

### Structure de Projet
```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/        # Contrôleurs Inertia & API
│   │   ├── Requests/          # Form Requests (validation)
│   │   └── Middleware/
│   ├── Models/                # Modèles Eloquent
│   └── Services/              # Logique métier
├── resources/
│   ├── js/
│   │   ├── Pages/            # Pages Inertia (React)
│   │   ├── Components/       # Composants réutilisables
│   │   ├── Layouts/          # Layouts (MainLayout, etc.)
│   │   ├── types/            # Types TypeScript
│   │   └── app.tsx           # Point d'entrée
│   ├── views/
│   │   └── app.blade.php     # Template HTML principal
│   └── css/
│       └── app.css
├── routes/
│   ├── web.php               # Routes Inertia (pages)
│   └── api.php               # Routes API REST
├── tests/
│   ├── Feature/              # Tests d'intégration
│   └── Unit/                 # Tests unitaires
└── database/
    ├── migrations/
    ├── factories/
    └── seeders/
```

---

## 🧪 Méthodologie TDD (OBLIGATOIRE)

### Règle d'Or : Red → Green → Refactor
1. **🔴 Red :** Écrire le test AVANT le code (le test doit échouer)
2. **🟢 Green :** Écrire le code minimum pour faire passer le test
3. **🔵 Refactor :** Améliorer le code sans casser les tests

### Workflow de Développement

#### Pour Chaque Nouvelle Fonctionnalité :

1. **Créer le test d'abord**
```php
// tests/Feature/Pages/ProjectsPageTest.php
test('projects page displays all projects', function () {
    Project::factory()->count(5)->create();
    
    $response = $this->get('/projets');
    
    $response->assertOk()
             ->assertInertia(fn ($page) => 
                 $page->component('Projets')
                      ->has('projects', 5)
             );
});
```

2. **Exécuter le test (doit échouer)**
```bash
php artisan test --filter=ProjectsPageTest
```

3. **Implémenter le code minimum**
```php
// app/Http/Controllers/ProjectController.php
public function index(): Response
{
    return Inertia::render('Projets', [
        'projects' => Project::all(),
    ]);
}
```

4. **Vérifier que le test passe**
```bash
php artisan test --filter=ProjectsPageTest
# ✅ PASSED
```

5. **Refactorer si nécessaire**
```php
// Amélioration : pagination, eager loading, etc.
public function index(): Response
{
    return Inertia::render('Projets', [
        'projects' => Project::with('tags')
                            ->latest()
                            ->paginate(12),
    ]);
}
```

### Types de Tests Requis

#### Tests Feature (Intégration)
- Tester les routes et réponses HTTP
- Vérifier les données passées à Inertia
- Valider les interactions avec la DB

```php
test('can submit project with valid data', function () {
    $data = [
        'firstName' => 'John',
        'lastName' => 'Doe',
        'email' => 'john@example.com',
        'details' => 'Project details here',
    ];
    
    $response = $this->postJson('/api/projects/submit', $data);
    
    $response->assertCreated();
    $this->assertDatabaseHas('project_submissions', [
        'email' => 'john@example.com'
    ]);
});
```

#### Tests Unit (Unitaires)
- Tester les services et modèles isolément
- Valider la logique métier

```php
test('file upload service stores file correctly', function () {
    Storage::fake('public');
    
    $file = UploadedFile::fake()->create('test.pdf', 100);
    $service = new FileUploadService();
    
    $result = $service->upload($file, 'projects');
    
    expect($result)->toHaveKeys(['path', 'name', 'size']);
    Storage::disk('public')->assertExists($result['path']);
});
```

### Coverage Minimum
- **Backend :** 80% de couverture
- **Fonctions critiques :** 100% (upload, validation, API)

---

## 🏗️ Conventions de Code

### Backend (Laravel)

#### Controllers
- **Convention :** Nommage clair, méthodes RESTful
- **Règle :** Un contrôleur = Une ressource
- **Inertia :** Utiliser `Inertia::render()` pour les pages

```php
// ✅ BON
class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Projets', [
            'projects' => Project::with('tags')->latest()->get(),
            'categories' => ProjectCategory::all(),
        ]);
    }
    
    public function show(Project $project): Response
    {
        return Inertia::render('Projets/Show', [
            'project' => $project->load('tags', 'images'),
        ]);
    }
}

// ❌ MAUVAIS
class ProjectController extends Controller
{
    public function getProjects() // Mauvais nommage
    {
        return response()->json(Project::all()); // Pas Inertia
    }
}
```

#### Models
- **Convention :** Eloquent avec relations explicites
- **Accessors/Mutators :** Pour transformations de données

```php
// ✅ BON
class ProjectSubmission extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'details',
        'file_path',
    ];
    
    protected $casts = [
        'created_at' => 'datetime',
    ];
    
    protected $appends = ['file_url'];
    
    public function getFileUrlAttribute(): ?string
    {
        return $this->file_path 
            ? Storage::url($this->file_path)
            : null;
    }
}
```

#### Form Requests
- **Validation côté serveur OBLIGATOIRE**
- **Messages en français**

```php
// ✅ BON
class ProjectSubmissionRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'firstName' => ['required', 'string', 'min:2', 'max:100'],
            'lastName' => ['required', 'string', 'min:2', 'max:100'],
            'email' => ['required', 'email', 'max:255'],
            'details' => ['required', 'string', 'min:10', 'max:2000'],
            'file' => ['nullable', 'file', 'max:10240', 'mimes:pdf,doc,docx,jpg,png'],
        ];
    }
    
    public function messages(): array
    {
        return [
            'firstName.required' => 'Le prénom est requis.',
            'email.email' => 'L\'email doit être valide.',
            // ...
        ];
    }
}
```

#### Services
- **Logique métier complexe dans des services**
- **Injection de dépendances**

```php
// ✅ BON
class FileUploadService
{
    public function upload(UploadedFile $file, string $folder = 'projects'): array
    {
        $yearMonth = now()->format('Y-m');
        $filename = Str::random(40) . '.' . $file->extension();
        $path = "{$folder}/{$yearMonth}/{$filename}";
        
        Storage::disk('public')->putFileAs(
            "{$folder}/{$yearMonth}",
            $file,
            $filename
        );
        
        return [
            'path' => $path,
            'name' => $file->getClientOriginalName(),
            'size' => $file->getSize(),
        ];
    }
}
```

### Frontend (React + TypeScript)

#### Composants
- **Convention :** PascalCase, un composant = un fichier
- **Props typées avec TypeScript**
- **Export par défaut**

```tsx
// ✅ BON
import { motion } from 'framer-motion';

interface ProjectCardProps {
    project: {
        title: string;
        description: string;
        tags: string[];
        github?: string;
        image: string;
    };
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden"
        >
            <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                {project.github && (
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block text-indigo-600 hover:underline"
                    >
                        Voir le projet →
                    </a>
                )}
            </div>
        </motion.div>
    );
}

// ❌ MAUVAIS
function projectCard(props: any) { // Mauvais nommage, any interdit
    return <div>{props.title}</div>; // Pas de types, pas d'accessibilité
}
```

#### Pages Inertia
- **Convention :** Nom de fichier = Nom du composant
- **Props typées avec PageProps**
- **Layout wrapping**

```tsx
// resources/js/Pages/Projets.tsx
import { PageProps } from '@/types';
import MainLayout from '@/Layouts/MainLayout';
import ProjectCard from '@/Components/ProjectCard';

interface Project {
    id: number;
    title: string;
    description: string;
    tags: string[];
    github?: string;
    image: string;
}

interface ProjetsProps extends PageProps {
    projects: Project[];
    categories: string[];
}

export default function Projets({ projects, categories }: ProjetsProps) {
    return (
        <MainLayout>
            <div className="min-h-screen py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                        Mes Projets
                    </h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
```

#### Types TypeScript
- **Interfaces pour les données**
- **Pas de `any`** (strict mode activé)

```typescript
// resources/js/types/index.d.ts
export interface User {
    id: number;
    name: string;
    email: string;
}

export interface ProjectSubmission {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    details: string;
    file_url: string | null;
    status: 'pending' | 'reviewed' | 'approved' | 'rejected';
    created_at: string;
}

export interface PageProps<T extends Record<string, unknown> = Record<string, unknown>> {
    auth: {
        user: User | null;
    };
    data?: T;
}
```

---

## 🎨 Design System

### Thèmes (Light/Dark/System)
- **Utiliser `dark:` prefix de TailwindCSS**
- **Persister le choix utilisateur**

```tsx
// Gestion thème
const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as typeof theme || 'system';
    setTheme(savedTheme);
    
    if (savedTheme === 'dark' || 
        (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }
}, []);
```

### Couleurs Principales
```css
/* TailwindCSS palette */
Primary: Indigo (indigo-600, indigo-700)
Secondary: Slate (slate-600, slate-700)
Accent: Purple (purple-600)
Success: Green (green-600)
Error: Red (red-600)
Warning: Amber (amber-600)

/* Dark mode */
Background: slate-950
Surface: slate-900
Text: white, gray-300
```

### Animations
- **Framer Motion pour animations complexes**
- **Transitions TailwindCSS pour hover/focus**

```tsx
// ✅ BON
<motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="transition-all hover:scale-105"
>
    {children}
</motion.div>
```

### Responsive Design
- **Mobile First**
- **Breakpoints TailwindCSS :** `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols */}
</div>
```

---

## 📝 SEO & Métadonnées

### Head Component (Inertia)
```tsx
import { Head } from '@inertiajs/react';

<Head>
    <title>Mes Projets - Cherif Diouf</title>
    <meta name="description" content="Découvrez mes projets web et mobile" />
    <meta property="og:title" content="Projets - Cherif Diouf" />
    <meta property="og:description" content="Portfolio de projets" />
    <meta property="og:image" content="/assets/og-image.jpg" />
</Head>
```

### Sitemap & Robots
- **Générer sitemap.xml dynamiquement**
- **Robots.txt à la racine**

---

## 🔒 Sécurité

### Validation
- **TOUJOURS valider côté serveur** (Form Requests)
- **Valider aussi côté client** (UX)
- **Sanitization automatique** (Laravel)

### Upload de Fichiers
```php
// ✅ BON - Validation stricte
'file' => ['nullable', 'file', 'max:10240', 'mimes:pdf,doc,docx,jpg,png,webp']

// ❌ MAUVAIS
'file' => ['nullable'] // Pas de validation
```

### CORS & API
```php
// config/cors.php
'allowed_origins' => [env('FRONTEND_URL', 'https://votre-domaine.com')],
'allowed_methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
```

### Rate Limiting
```php
// routes/api.php
Route::middleware('throttle:60,1')->group(function () {
    Route::post('/projects/submit', [ProjectSubmissionController::class, 'store']);
});
```

---

## 🚀 Performance

### Lazy Loading
```tsx
// ✅ BON - Lazy load des composants lourds
const MemeGenerator = lazy(() => import('@/Components/MemeGenerator'));

<Suspense fallback={<Loading />}>
    <MemeGenerator />
</Suspense>
```

### Optimisation Images
```tsx
// ✅ BON - Lazy loading + formats modernes
<img 
    src={project.image} 
    alt={project.title}
    loading="lazy"
    className="w-full h-48 object-cover"
/>
```

### Cache Laravel
```bash
# Production
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize
```

---

## 📦 Déploiement O2Switch

### Build Production
```bash
# Frontend
npm run build

# Backend
composer install --optimize-autoloader --no-dev
php artisan migrate --force
php artisan storage:link
php artisan optimize
```

### Structure Déploiement
```
public_html/
├── backend/              # Laravel complet
│   ├── public/          # Point d'entrée web
│   ├── storage/         # Uploads
│   └── ...
└── .htaccess            # Redirection globale
```

### .htaccess Racine
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # API vers Laravel
    RewriteCond %{REQUEST_URI} ^/api/
    RewriteRule ^(.*)$ backend/public/$1 [L,QSA]
    
    # Storage vers Laravel
    RewriteCond %{REQUEST_URI} ^/storage/
    RewriteRule ^storage/(.*)$ backend/public/storage/$1 [L]
    
    # Build Vite vers Laravel
    RewriteCond %{REQUEST_URI} ^/build/
    RewriteRule ^build/(.*)$ backend/public/build/$1 [L]
    
    # Tout le reste vers Laravel (Inertia)
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ backend/public/$1 [L,QSA]
</IfModule>
```

---

## ⚠️ Règles Critiques à Respecter

### ❌ INTERDIT
1. **Utiliser `any` en TypeScript** → Toujours typer
2. **Valider uniquement côté client** → Validation serveur obligatoire
3. **Exposer des données sensibles** → Toujours filtrer
4. **Ignorer les tests** → TDD obligatoire
5. **Coder sans tester** → Red-Green-Refactor
6. **Commits sans description** → Messages explicites
7. **Code dupliqué** → DRY (Don't Repeat Yourself)
8. **Styles inline React** → TailwindCSS uniquement
9. **Console.log en production** → Utiliser logger approprié
10. **Migrations sans rollback** → Toujours testable

### ✅ OBLIGATOIRE
1. **Tests AVANT code** → TDD
2. **Types TypeScript stricts** → Pas de any
3. **Validation serveur** → Form Requests
4. **Accessibilité** → ARIA labels, semantic HTML
5. **Responsive** → Mobile first
6. **SEO** → Meta tags sur chaque page
7. **Performance** → Lazy loading, code splitting
8. **Sécurité** → CSRF, validation, sanitization
9. **Documentation** → Commenter le code complexe
10. **Git workflow** → Branches feature, commits atomiques

---

## 📚 Ressources de Référence

- **Laravel 12 :** https://laravel.com/docs/12.x
- **Inertia.js :** https://inertiajs.com/
- **Pest PHP :** https://pestphp.com/
- **TypeScript :** https://www.typescriptlang.org/
- **TailwindCSS :** https://tailwindcss.com/
- **Framer Motion :** https://www.framer.com/motion/

---

## ✅ Checklist Avant Chaque Commit

- [ ] Tests écrits et passant
- [ ] TypeScript sans erreurs (`npm run type-check`)
- [ ] Linting passant (`npm run lint`)
- [ ] Code formaté (Prettier)
- [ ] Pas de console.log/var_dump
- [ ] Documentation à jour
- [ ] Variables d'environnement documentées
- [ ] Migration testée (up & down)

---

**Principe clé :** Si tu ne peux pas le tester, ne le code pas. Si tu ne peux pas le typer, ne l'utilise pas.
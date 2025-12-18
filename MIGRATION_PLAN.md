# Plan de Migration TDD : SPA React/Vite → Laravel 12 + Inertia.js

## 🎯 Objectif
Migrer le portfolio actuel (SPA React/Vite) vers une architecture Laravel 12 + Inertia.js + React avec approche Test-Driven Development.

## 📋 Prérequis
- PHP 8.3+
- Composer 2.x
- Node.js 20+
- MySQL 8.0+
- O2Switch avec accès FTP et cPanel

---

## 🏗️ Architecture Cible

```
public_html/
├── backend/                          # Laravel 12 + Inertia
│   ├── app/
│   ├── resources/js/                 # React + TypeScript
│   ├── public/build/                 # Assets compilés
│   ├── storage/                      # Uploads
│   └── tests/                        # Tests PHPUnit + Pest
└── .htaccess                         # Routage global
```

---

## 📊 Phases de Migration (TDD)

### **Phase 0 : Préparation & Configuration (1-2 jours)**

#### 0.1 Setup Environnement Local
- [ ] Installer Laravel 12 : `composer create-project laravel/laravel backend`
- [ ] Installer Inertia : `composer require inertiajs/inertia-laravel`
- [ ] Installer React : `npm install @inertiajs/react react react-dom`
- [ ] Configurer Vite + TypeScript
- [ ] Configurer TailwindCSS
- [ ] Configurer Pest pour les tests : `composer require pestphp/pest --dev`

#### 0.2 Configuration Base de Données
- [ ] Créer `.env` avec credentials MySQL
- [ ] Tester connexion DB : `php artisan migrate`
- [ ] Configurer seeders pour données de test

#### 0.3 Structure de Tests
```php
tests/
├── Feature/                          # Tests d'intégration
│   ├── Pages/
│   │   ├── HomePageTest.php
│   │   ├── ProjectsPageTest.php
│   │   └── GalleryPageTest.php
│   └── Api/
│       └── ProjectSubmissionTest.php
├── Unit/                             # Tests unitaires
│   ├── Services/
│   │   └── FileUploadServiceTest.php
│   └── Models/
│       └── ProjectSubmissionTest.php
└── Pest.php
```

---

### **Phase 1 : Migration Infrastructure (2-3 jours)**

#### 1.1 TDD - Configuration Inertia
**Test d'abord :**
```php
// tests/Feature/InertiaSetupTest.php
test('inertia renders app layout', function () {
    $response = $this->get('/');
    $response->assertInertia(fn ($page) => 
        $page->component('Home')
    );
});
```

**Implémentation :**
- [ ] Créer `resources/views/app.blade.php`
- [ ] Configurer `app/Http/Middleware/HandleInertiaRequests.php`
- [ ] Créer `resources/js/app.tsx`
- [ ] Vérifier que le test passe ✅

#### 1.2 TDD - Layout Principal
**Test :**
```php
test('main layout contains navigation', function () {
    $response = $this->get('/');
    $response->assertSee('Accueil');
    $response->assertSee('Projets');
    $response->assertSee('Galerie');
});
```

**Implémentation :**
- [ ] Créer `resources/js/Layouts/MainLayout.tsx`
- [ ] Migrer composant Navbar
- [ ] Ajouter gestion thème (dark/light)
- [ ] Vérifier test ✅

#### 1.3 TDD - Routing & Pages
**Tests :**
```php
test('home page loads successfully', function () {
    $response = $this->get('/');
    $response->assertOk()
             ->assertInertia(fn ($page) => $page->component('Home'));
});

test('projects page loads successfully', function () {
    $response = $this->get('/projets');
    $response->assertOk()
             ->assertInertia(fn ($page) => $page->component('Projets'));
});

test('gallery page loads successfully', function () {
    $response = $this->get('/galerie');
    $response->assertOk()
             ->assertInertia(fn ($page) => $page->component('Galerie'));
});
```

**Implémentation :**
- [ ] Créer routes dans `routes/web.php`
- [ ] Créer controllers : HomeController, ProjectController, GalleryController
- [ ] Créer pages Inertia vides
- [ ] Vérifier tests ✅

---

### **Phase 2 : Migration Données & Modèles (3-4 jours)**

#### 2.1 TDD - Modèle ProjectSubmission
**Tests unitaires :**
```php
// tests/Unit/Models/ProjectSubmissionTest.php
test('can create project submission', function () {
    $submission = ProjectSubmission::factory()->create([
        'first_name' => 'John',
        'last_name' => 'Doe',
        'email' => 'john@example.com',
    ]);
    
    expect($submission->first_name)->toBe('John');
    expect($submission->status)->toBe('pending');
});

test('file url accessor returns correct url', function () {
    $submission = ProjectSubmission::factory()->create([
        'file_path' => 'projects/2024-12/test.pdf'
    ]);
    
    expect($submission->file_url)->toContain('/storage/projects/2024-12/test.pdf');
});
```

**Implémentation :**
- [ ] Créer migration `create_project_submissions_table`
- [ ] Créer modèle `ProjectSubmission`
- [ ] Créer factory `ProjectSubmissionFactory`
- [ ] Ajouter accessors/mutators
- [ ] Vérifier tests ✅

#### 2.2 TDD - Service FileUpload
**Tests unitaires :**
```php
// tests/Unit/Services/FileUploadServiceTest.php
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('can upload file successfully', function () {
    Storage::fake('public');
    
    $file = UploadedFile::fake()->create('document.pdf', 100);
    $service = new FileUploadService();
    
    $result = $service->upload($file, 'projects');
    
    expect($result)->toHaveKeys(['path', 'name', 'size', 'mime']);
    Storage::disk('public')->assertExists($result['path']);
});

test('rejects file larger than 10MB', function () {
    Storage::fake('public');
    
    $file = UploadedFile::fake()->create('large.pdf', 11000);
    $service = new FileUploadService();
    
    expect(fn() => $service->upload($file))
        ->toThrow(ValidationException::class);
});
```

**Implémentation :**
- [ ] Créer `app/Services/FileUploadService.php`
- [ ] Implémenter méthodes upload(), delete()
- [ ] Ajouter validation taille et type
- [ ] Vérifier tests ✅

#### 2.3 TDD - Données Portfolio (JSON → DB)
**Tests :**
```php
test('resume data seeder populates database', function () {
    $this->seed(ResumeDataSeeder::class);
    
    expect(Project::count())->toBeGreaterThan(0);
    expect(Experience::count())->toBeGreaterThan(0);
    expect(Certification::count())->toBeGreaterThan(0);
});
```

**Implémentation :**
- [ ] Créer migrations pour : projects, experiences, certifications, skills
- [ ] Créer modèles correspondants
- [ ] Créer seeder depuis `metadata.json`
- [ ] Vérifier tests ✅

---

### **Phase 3 : Migration Composants React (4-5 jours)**

#### 3.1 Migration Composants Réutilisables
**Checklist TDD :**
- [ ] `ProjectCard.tsx`
  - Test : Affiche titre, description, tags
  - Test : Lien GitHub conditionnel
  - Migration + tests ✅
  
- [ ] `ExperienceItem.tsx`
  - Test : Affiche entreprise, période, description
  - Migration + tests ✅
  
- [ ] `GalleryCarousel.tsx`
  - Test : Navigation images
  - Test : Lightbox modal
  - Migration + tests ✅

- [ ] `ToolsGrid.tsx`
  - Test : Affiche liste d'outils
  - Test : Navigation vers outil
  - Migration + tests ✅

#### 3.2 Migration Pages Principales
**Page Home**
```php
// tests/Feature/Pages/HomePageTest.php
test('home page displays profile information', function () {
    $response = $this->get('/');
    
    $response->assertInertia(fn ($page) => 
        $page->component('Home')
             ->has('data.profile')
             ->where('data.profile.name', 'Cherif Diouf')
    );
});

test('home page displays recent projects', function () {
    Project::factory()->count(3)->create();
    
    $response = $this->get('/');
    
    $response->assertInertia(fn ($page) => 
        $page->has('data.projects', 3)
    );
});
```

**Implémentation :**
- [ ] Créer `resources/js/Pages/Home.tsx`
- [ ] Migrer sections : Hero, About, Projects, Experience
- [ ] Ajouter animations Framer Motion
- [ ] Vérifier tests ✅

**Page Projets**
```php
test('projects page displays all projects with filters', function () {
    Project::factory()->count(10)->create([
        'category' => 'web'
    ]);
    
    $response = $this->get('/projets');
    
    $response->assertInertia(fn ($page) => 
        $page->component('Projets')
             ->has('projects', 10)
             ->has('categories')
    );
});
```

**Implémentation :**
- [ ] Créer `resources/js/Pages/Projets.tsx`
- [ ] Implémenter filtres par catégorie
- [ ] Ajouter modal détail projet
- [ ] Vérifier tests ✅

**Page Galerie**
```php
test('gallery page displays images grouped by category', function () {
    GalleryImage::factory()->count(20)->create();
    
    $response = $this->get('/galerie');
    
    $response->assertInertia(fn ($page) => 
        $page->component('Galerie')
             ->has('images')
             ->has('categories')
    );
});
```

**Implémentation :**
- [ ] Créer `resources/js/Pages/Galerie.tsx`
- [ ] Migration GalleryGrid + Carousel
- [ ] Ajouter système de filtres
- [ ] Vérifier tests ✅

#### 3.3 Migration Outils
**Outils Pages :**
- [ ] `Outils/Index.tsx` - Liste des outils
- [ ] `Outils/ReadmeGenerator.tsx`
- [ ] `Outils/ImageConverter.tsx`
- [ ] `Outils/MemeGenerator.tsx`

**Tests :**
```php
test('readme generator page loads with form', function () {
    $response = $this->get('/outils/readme-generator');
    
    $response->assertInertia(fn ($page) => 
        $page->component('Outils/ReadmeGenerator')
    );
});
```

---

### **Phase 4 : API & Soumissions (2-3 jours)**

#### 4.1 TDD - API Soumission Projet
**Tests Feature :**
```php
// tests/Feature/Api/ProjectSubmissionTest.php
test('can submit project with valid data', function () {
    $data = [
        'firstName' => 'John',
        'lastName' => 'Doe',
        'email' => 'john@example.com',
        'details' => 'I need a website for my business',
    ];
    
    $response = $this->postJson('/api/projects/submit', $data);
    
    $response->assertCreated()
             ->assertJsonStructure([
                 'success',
                 'message',
                 'data' => ['id', 'status']
             ]);
    
    $this->assertDatabaseHas('project_submissions', [
        'email' => 'john@example.com',
        'status' => 'pending'
    ]);
});

test('validates required fields', function () {
    $response = $this->postJson('/api/projects/submit', []);
    
    $response->assertUnprocessable()
             ->assertJsonValidationErrors(['firstName', 'lastName', 'email', 'details']);
});

test('can upload file with submission', function () {
    Storage::fake('public');
    
    $file = UploadedFile::fake()->create('proposal.pdf', 1000);
    
    $response = $this->postJson('/api/projects/submit', [
        'firstName' => 'John',
        'lastName' => 'Doe',
        'email' => 'john@example.com',
        'details' => 'Details here',
        'file' => $file,
    ]);
    
    $response->assertCreated();
    
    $submission = ProjectSubmission::first();
    expect($submission->file_path)->not->toBeNull();
    Storage::disk('public')->assertExists($submission->file_path);
});

test('rejects invalid file types', function () {
    Storage::fake('public');
    
    $file = UploadedFile::fake()->create('malicious.exe', 100);
    
    $response = $this->postJson('/api/projects/submit', [
        'firstName' => 'John',
        'lastName' => 'Doe',
        'email' => 'john@example.com',
        'details' => 'Details',
        'file' => $file,
    ]);
    
    $response->assertUnprocessable()
             ->assertJsonValidationErrors(['file']);
});
```

**Implémentation :**
- [ ] Créer `ProjectSubmissionRequest` avec règles validation
- [ ] Créer `ProjectSubmissionController`
- [ ] Implémenter méthode store()
- [ ] Ajouter gestion upload fichier
- [ ] Vérifier tests ✅

#### 4.2 TDD - API Admin (Gestion Soumissions)
**Tests :**
```php
test('admin can list all submissions', function () {
    $user = User::factory()->create();
    ProjectSubmission::factory()->count(5)->create();
    
    $response = $this->actingAs($user)
                     ->getJson('/api/projects');
    
    $response->assertOk()
             ->assertJsonCount(5, 'data');
});

test('admin can update submission status', function () {
    $user = User::factory()->create();
    $submission = ProjectSubmission::factory()->create(['status' => 'pending']);
    
    $response = $this->actingAs($user)
                     ->patchJson("/api/projects/{$submission->id}/status", [
                         'status' => 'approved'
                     ]);
    
    $response->assertOk();
    expect($submission->fresh()->status)->toBe('approved');
});

test('admin can delete submission', function () {
    Storage::fake('public');
    
    $user = User::factory()->create();
    $submission = ProjectSubmission::factory()->create([
        'file_path' => 'projects/2024-12/test.pdf'
    ]);
    
    Storage::disk('public')->put($submission->file_path, 'content');
    
    $response = $this->actingAs($user)
                     ->deleteJson("/api/projects/{$submission->id}");
    
    $response->assertOk();
    $this->assertDatabaseMissing('project_submissions', ['id' => $submission->id]);
    Storage::disk('public')->assertMissing($submission->file_path);
});

test('unauthorized users cannot access admin endpoints', function () {
    $response = $this->getJson('/api/projects');
    $response->assertUnauthorized();
});
```

**Implémentation :**
- [ ] Implémenter méthodes index(), updateStatus(), destroy()
- [ ] Ajouter middleware auth:sanctum
- [ ] Créer système authentification admin
- [ ] Vérifier tests ✅

#### 4.3 Modal Soumission Frontend
**Tests Browser (Dusk optionnel) :**
```php
test('can submit project through modal', function () {
    $this->browse(function (Browser $browser) {
        $browser->visit('/')
                ->click('@open-project-modal')
                ->waitFor('@project-modal')
                ->type('firstName', 'John')
                ->type('lastName', 'Doe')
                ->type('email', 'john@example.com')
                ->type('details', 'I need help with my project')
                ->press('Envoyer')
                ->waitForText('Merci !')
                ->assertSee('Votre demande a été soumise');
    });
});
```

**Implémentation :**
- [ ] Créer `ProjectRequestModal.tsx` avec Inertia
- [ ] Connecter à API `/api/projects/submit`
- [ ] Ajouter gestion erreurs et succès
- [ ] Vérifier tests ✅

---

### **Phase 5 : SEO & Performance (2 jours)**

#### 5.1 TDD - Meta Tags & SEO
**Tests :**
```php
test('home page has correct meta tags', function () {
    $response = $this->get('/');
    
    $response->assertSee('<title>Cherif Diouf | Développeur Full-Stack</title>', false);
    $response->assertSee('<meta name="description"', false);
    $response->assertSee('<meta property="og:title"', false);
});

test('each page has unique title', function () {
    $pages = [
        '/' => 'Accueil',
        '/projets' => 'Projets',
        '/galerie' => 'Galerie',
    ];
    
    foreach ($pages as $url => $title) {
        $response = $this->get($url);
        $response->assertSee($title, false);
    }
});
```

**Implémentation :**
- [ ] Ajouter Head component Inertia
- [ ] Créer composant SEO réutilisable
- [ ] Ajouter meta dynamiques par page
- [ ] Vérifier tests ✅

#### 5.2 TDD - Sitemap & Robots
**Tests :**
```php
test('sitemap xml is accessible', function () {
    $response = $this->get('/sitemap.xml');
    
    $response->assertOk()
             ->assertHeader('Content-Type', 'text/xml; charset=UTF-8');
});

test('sitemap contains all public pages', function () {
    $response = $this->get('/sitemap.xml');
    
    $response->assertSee('<loc>' . url('/') . '</loc>', false);
    $response->assertSee('<loc>' . url('/projets') . '</loc>', false);
});

test('robots txt is accessible', function () {
    $response = $this->get('/robots.txt');
    
    $response->assertOk()
             ->assertSee('User-agent: *');
});
```

**Implémentation :**
- [ ] Créer route `/sitemap.xml`
- [ ] Générer sitemap dynamique
- [ ] Créer `/robots.txt`
- [ ] Vérifier tests ✅

#### 5.3 Performance
**Tests :**
```php
test('home page loads in under 1 second', function () {
    $start = microtime(true);
    $this->get('/');
    $duration = microtime(true) - $start;
    
    expect($duration)->toBeLessThan(1.0);
});

test('assets are cached correctly', function () {
    $response = $this->get('/build/assets/app.js');
    
    $response->assertHeader('Cache-Control');
});
```

**Optimisations :**
- [ ] Lazy loading images
- [ ] Code splitting Vite
- [ ] Cache Laravel (config, route, view)
- [ ] Compression Gzip/Brotli
- [ ] Vérifier tests ✅

---

### **Phase 6 : Déploiement O2Switch (1-2 jours)**

#### 6.1 Configuration Déploiement
**Tests (local) :**
```php
test('production config is valid', function () {
    config(['app.env' => 'production']);
    
    expect(config('app.debug'))->toBeFalse();
    expect(config('app.key'))->not->toBeEmpty();
});

test('database connection works in production mode', function () {
    DB::connection()->getPdo();
    expect(DB::connection()->getDatabaseName())->not->toBeEmpty();
});
```

**Checklist :**
- [ ] Créer `.env.production`
- [ ] Configurer variables O2Switch
- [ ] Tester connexion DB production
- [ ] Créer script de build automatisé

#### 6.2 Script de Déploiement
```bash
#!/bin/bash
# deploy.sh

echo "🚀 Building assets..."
npm run build

echo "📦 Installing dependencies..."
composer install --optimize-autoloader --no-dev

echo "🔧 Optimizing Laravel..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "✅ Build complete!"
```

#### 6.3 Configuration .htaccess
**Test (manuel sur O2Switch) :**
- [ ] Vérifier redirection `/api/*` vers Laravel
- [ ] Vérifier redirection `/storage/*` vers storage symlink
- [ ] Vérifier routes Inertia fonctionnent
- [ ] Tester HTTPS redirection
- [ ] Tester compression Gzip

#### 6.4 Upload & Migration DB
**Checklist :**
- [ ] Upload dossier `backend/` via FTP
- [ ] Upload `.htaccess` racine
- [ ] Créer base de données via cPanel
- [ ] Exécuter migrations : `php artisan migrate --force`
- [ ] Créer storage symlink : `php artisan storage:link`
- [ ] Seed données : `php artisan db:seed`
- [ ] Tester toutes les pages

---

### **Phase 7 : Tests End-to-End & Validation (1 jour)**

#### 7.1 Tests Utilisateur Final
**Checklist manuelle :**
- [ ] Navigation entre pages fluide
- [ ] Thème dark/light fonctionne
- [ ] Formulaire soumission projet fonctionne
- [ ] Upload fichier fonctionne
- [ ] Responsive mobile/tablet/desktop
- [ ] Performance acceptable (< 3s chargement)
- [ ] SEO : Meta tags présents
- [ ] Console sans erreurs JavaScript
- [ ] Pas d'erreurs 404

#### 7.2 Tests Performance Production
```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun --collect.url=https://votre-domaine.com

# Objectifs :
# - Performance: > 90
# - Accessibility: > 95
# - Best Practices: > 90
# - SEO: > 95
```

#### 7.3 Tests Sécurité
**Checklist :**
- [ ] HTTPS actif
- [ ] Headers sécurité (CSP, X-Frame-Options, etc.)
- [ ] Validation inputs côté serveur
- [ ] Protection CSRF active
- [ ] Upload fichiers sécurisé
- [ ] Pas d'exposition de données sensibles
- [ ] Rate limiting API

---

## 📈 Métriques de Succès

### Tests Coverage
- [ ] Backend : > 80% coverage
- [ ] Frontend : > 60% coverage (composants critiques)

### Performance
- [ ] Lighthouse Score : > 90
- [ ] Time to First Byte : < 600ms
- [ ] First Contentful Paint : < 1.5s
- [ ] Largest Contentful Paint : < 2.5s

### Qualité Code
- [ ] PHPStan level 5 sans erreurs
- [ ] ESLint sans warnings
- [ ] TypeScript strict mode

---

## 🛠️ Commandes Utiles

```bash
# Tests
php artisan test                      # Tous les tests
php artisan test --filter=HomePageTest  # Test spécifique
php artisan test --coverage           # Coverage report

# Qualité code
./vendor/bin/phpstan analyse          # Analyse statique PHP
npm run lint                          # Lint TypeScript

# Build & Deploy
npm run build                         # Build production
php artisan optimize                  # Cache Laravel
bash deploy.sh                        # Déploiement automatisé

# Monitoring
php artisan queue:work                # Worker queues
php artisan schedule:work             # Cron tasks
tail -f storage/logs/laravel.log      # Logs temps réel
```

---

## 📚 Ressources

- [Laravel 12 Documentation](https://laravel.com/docs/12.x)
- [Inertia.js Documentation](https://inertiajs.com/)
- [Pest PHP Testing](https://pestphp.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

## ✅ Validation Finale

Avant de considérer la migration terminée :

1. ✅ Tous les tests passent (Feature + Unit)
2. ✅ Coverage > 80% backend
3. ✅ Lighthouse score > 90
4. ✅ Aucune erreur console navigateur
5. ✅ Responsive testé sur 3+ appareils
6. ✅ SEO validé (meta tags, sitemap, robots.txt)
7. ✅ Performance validée (< 3s chargement)
8. ✅ Backup base de données effectué
9. ✅ Monitoring mis en place
10. ✅ Documentation mise à jour

---

**Durée totale estimée : 15-20 jours** (selon disponibilité et complexité)

**Approche recommandée :** 1 phase à la fois, tests AVANT code, commits fréquents.

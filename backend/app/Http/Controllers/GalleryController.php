<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(): Response
    {
        // Images mises en avant
        $featuredItems = [
            [
                'id' => '1',
                'title' => 'DevFest Dakar 2023',
                'category' => 'Conference',
                'date' => 'Déc 2023',
                'imageUrl' => '/assets/galerie/devfest-1.jpg',
                'size' => 'large',
                'featured' => true,
            ],
            [
                'id' => '2',
                'title' => 'Laravel Senegal Meetup',
                'category' => 'Community',
                'date' => 'Nov 2023',
                'imageUrl' => '/assets/galerie/laravel-senegal-1.jpg',
                'size' => 'medium',
                'featured' => true,
            ],
            [
                'id' => '3',
                'title' => 'Hacktoberfest 2023',
                'category' => 'Hackathon',
                'date' => 'Oct 2023',
                'imageUrl' => '/assets/galerie/hacktoberfest-1.jpg',
                'size' => 'medium',
                'featured' => true,
            ],
        ];

        $gridItems = [
            [
                'id' => '4',
                'title' => 'DevFest Dakar - Conférence',
                'category' => 'Conference',
                'date' => 'Déc 2023',
                'imageUrl' => '/assets/galerie/devfest-2.jpg',
                'size' => 'small',
                'featured' => false,
            ],
            [
                'id' => '5',
                'title' => 'DevFest Dakar - Networking',
                'category' => 'Conference',
                'date' => 'Déc 2023',
                'imageUrl' => '/assets/galerie/devfest-3.jpg',
                'size' => 'small',
                'featured' => false,
            ],
            [
                'id' => '6',
                'title' => 'DevFest Dakar - Workshop',
                'category' => 'Conference',
                'date' => 'Déc 2023',
                'imageUrl' => '/assets/galerie/devfest-4.jpg',
                'size' => 'small',
                'featured' => false,
            ],
            [
                'id' => '7',
                'title' => 'DevFest Dakar - Communauté',
                'category' => 'Conference',
                'date' => 'Déc 2023',
                'imageUrl' => '/assets/galerie/devfest-5.jpg',
                'size' => 'small',
                'featured' => false,
            ],
            [
                'id' => '8',
                'title' => 'Laravel Senegal - Session 2',
                'category' => 'Community',
                'date' => 'Nov 2023',
                'imageUrl' => '/assets/galerie/laravel-senegal-2.jpg',
                'size' => 'small',
                'featured' => false,
            ],
            [
                'id' => '9',
                'title' => 'Laravel Senegal - Session 3',
                'category' => 'Community',
                'date' => 'Nov 2023',
                'imageUrl' => '/assets/galerie/laravel-senegal-3.jpg',
                'size' => 'small',
                'featured' => false,
            ],
            [
                'id' => '10',
                'title' => 'Hacktoberfest - Équipe',
                'category' => 'Hackathon',
                'date' => 'Oct 2023',
                'imageUrl' => '/assets/galerie/hacktoberfest-2.jpg',
                'size' => 'small',
                'featured' => false,
            ],
            [
                'id' => '11',
                'title' => 'Hacktoberfest - Coding',
                'category' => 'Hackathon',
                'date' => 'Oct 2023',
                'imageUrl' => '/assets/galerie/hacktoberfest-3.jpg',
                'size' => 'small',
                'featured' => false,
            ],
            [
                'id' => '12',
                'title' => 'Workshop ESTM',
                'category' => 'Workshop',
                'date' => 'Sep 2023',
                'imageUrl' => '/assets/galerie/estm-workshop-1.jpg',
                'size' => 'small',
                'featured' => false,
            ],
            [
                'id' => '13',
                'title' => 'Formation ESTM',
                'category' => 'Workshop',
                'date' => 'Sep 2023',
                'imageUrl' => '/assets/galerie/estm-workshop-2.jpg',
                'size' => 'small',
                'featured' => false,
            ],
            [
                'id' => '14',
                'title' => 'Edacy - Formation',
                'category' => 'Workshop',
                'date' => 'Août 2023',
                'imageUrl' => '/assets/galerie/edacy-2.jpg',
                'size' => 'small',
                'featured' => false,
            ],
        ];

        $portfolioData = config('portfolio');

        return Inertia::render('Galerie', [
            'featuredItems' => $featuredItems,
            'gridItems' => $gridItems,
            'labels' => $portfolioData['labels'],
        ]);
    }
}

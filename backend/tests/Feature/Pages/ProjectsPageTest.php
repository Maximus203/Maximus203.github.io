<?php

use App\Models\Project;
use Inertia\Testing\AssertableInertia as Assert;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('projects page displays projects from database', function () {
    // Arrange
    Project::create([
        'title' => ['fr' => 'Test Project'],
        'description' => ['fr' => 'Description'],
        'tags' => ['Tag1'],
        'image' => 'image.jpg',
        'category' => 'Web',
    ]);

    // Act
    $response = $this->get('/projets');

    // Assert
    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Projets')
            ->has('projects', 1)
            ->has('categories')
        );
});

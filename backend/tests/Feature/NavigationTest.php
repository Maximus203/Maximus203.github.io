<?php

use Inertia\Testing\AssertableInertia as Assert;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('all pages render correctly', function () {
    // Test Home
    $this->get('/')
        ->assertOk()
        ->assertInertia(
            fn(Assert $page) =>
            $page->component('Home')
        );

    // Test Projets
    $this->get('/projets')
        ->assertOk()
        ->assertInertia(
            fn(Assert $page) =>
            $page->component('Projets')
        );

    // Test Galerie
    $this->get('/galerie')
        ->assertOk()
        ->assertInertia(
            fn(Assert $page) =>
            $page->component('Galerie')
        );

    // Test Outils
    $this->get('/outils')
        ->assertOk()
        ->assertInertia(
            fn(Assert $page) =>
            $page->component('Outils/Index')
        );
});

test('navigation routes are accessible', function () {
    $routes = ['/', '/projets', '/galerie', '/outils'];

    foreach ($routes as $route) {
        $this->get($route)->assertOk();
    }
});

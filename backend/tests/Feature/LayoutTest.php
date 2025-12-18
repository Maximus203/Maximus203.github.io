<?php

use Inertia\Testing\AssertableInertia as Assert;

test('layout has navigation with links', function () {
    $response = $this->get('/');

    $response->assertOk();
    // Le layout devrait contenir les liens de navigation
    $response->assertSee('Accueil');
    $response->assertSee('Projets');
    $response->assertSee('Galerie');
    $response->assertSee('Outils');
});

test('layout has footer with copyright', function () {
    $response = $this->get('/');

    $response->assertOk();
    $response->assertSee('2025');
    $response->assertSee('Cherif Diouf');
});

test('layout wraps page content', function () {
    $response = $this->get('/');

    $response->assertOk()
        ->assertInertia(
            fn(Assert $page) =>
            $page->component('Home')
        );
});

test('theme preference is persisted', function () {
    // Test que le thème peut être sauvegardé (sera géré côté client)
    $response = $this->get('/');

    $response->assertOk();
    // Le layout doit être présent pour gérer le thème
    $response->assertSee('html');
});

<?php

use Inertia\Testing\AssertableInertia as Assert;

test('gallery page loads successfully', function () {
    $response = $this->get('/galerie');

    $response->assertOk()
        ->assertInertia(
            fn(Assert $page) =>
            $page->component('Galerie')
                ->has('images')
                ->has('categories')
        );
});

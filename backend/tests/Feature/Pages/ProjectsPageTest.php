<?php

use Inertia\Testing\AssertableInertia as Assert;

test('projects page loads successfully', function () {
    $response = $this->get('/projets');

    $response->assertOk()
        ->assertInertia(
            fn(Assert $page) =>
            $page->component('Projets')
                ->has('projects')
                ->has('categories')
        );
});

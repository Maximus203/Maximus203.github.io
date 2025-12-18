<?php

use Inertia\Testing\AssertableInertia as Assert;

test('home page loads successfully', function () {
    $response = $this->get('/');

    $response->assertOk()
        ->assertInertia(
            fn(Assert $page) =>
            $page->component('Home')
        );
});

test('home page has correct Inertia component', function () {
    $this->get('/')
        ->assertInertia(
            fn(Assert $page) =>
            $page->component('Home')
                ->has('auth')
        );
});

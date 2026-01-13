<?php

use App\Models\Project;
use Inertia\Testing\AssertableInertia as Assert;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('home page loads successfully', function () {
    Project::factory()->count(3)->create();

    $response = $this->get('/');

    $response->assertOk()
        ->assertInertia(
            fn(Assert $page) =>
            $page->component('Home')
        );
});

test('home page has correct Inertia component', function () {
    Project::factory()->count(3)->create();

    $this->get('/')
        ->assertInertia(
            fn(Assert $page) =>
            $page->component('Home')
                ->has('auth')
        );
});

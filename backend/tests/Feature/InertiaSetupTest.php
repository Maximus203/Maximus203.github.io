<?php

use App\Models\Project;
use Inertia\Testing\AssertableInertia as Assert;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('inertia renders app layout', function () {
    Project::factory()->count(3)->create();

    $response = $this->get('/');

    $response->assertInertia(
        fn(Assert $page) =>
        $page->component('Home')
    );
});

test('inertia shares auth data', function () {
    Project::factory()->count(3)->create();

    $response = $this->get('/');

    $response->assertInertia(
        fn(Assert $page) =>
        $page->has('auth')
            ->where('auth.user', null)
    );
});

test('inertia shares ziggy routes', function () {
    Project::factory()->count(3)->create();

    $response = $this->get('/');

    $response->assertInertia(
        fn(Assert $page) =>
        $page->has('ziggy')
    );
});

<?php

use Inertia\Testing\AssertableInertia as Assert;

test('inertia renders app layout', function () {
    $response = $this->get('/');

    $response->assertInertia(
        fn(Assert $page) =>
        $page->component('Home')
    );
});

test('inertia shares auth data', function () {
    $response = $this->get('/');

    $response->assertInertia(
        fn(Assert $page) =>
        $page->has('auth')
            ->where('auth.user', null)
    );
});

test('inertia shares ziggy routes', function () {
    $response = $this->get('/');

    $response->assertInertia(
        fn(Assert $page) =>
        $page->has('ziggy')
    );
});

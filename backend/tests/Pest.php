<?php

use Illuminate\Foundation\Testing\TestCase;

uses(TestCase::class)
    ->in('Feature', 'Unit');

// Helpers functions
function artisan(string $command, array $parameters = []): void
{
    test()->artisan($command, $parameters);
}

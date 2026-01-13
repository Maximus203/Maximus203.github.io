<?php

use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('project has correct casts', function () {
    $project = new Project();

    $casts = $project->getCasts();

    expect($casts['title'])->toBe('array');
    expect($casts['description'])->toBe('array');
    expect($casts['tags'])->toBe('array');
    expect($casts['featured'])->toBe('boolean');
});

test('can create project with translations', function () {
    $project = Project::create([
        'title' => ['fr' => 'Mon Projet', 'en' => 'My Project'],
        'description' => ['fr' => 'Desc FR', 'en' => 'Desc EN'],
        'tags' => ['Laravel', 'React'],
        'image' => 'test.jpg',
        'category' => 'Web',
    ]);

    expect($project->title['fr'])->toBe('Mon Projet');
    expect($project->title['en'])->toBe('My Project');
    expect($project->tags)->toBe(['Laravel', 'React']);
});

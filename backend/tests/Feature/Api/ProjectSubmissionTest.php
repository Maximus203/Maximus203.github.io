<?php

use App\Models\ProjectSubmission;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('can submit project with valid data', function () {
    Storage::fake('public');

    $file = UploadedFile::fake()->create('proposal.pdf', 1000);

    $data = [
        'firstName' => 'John',
        'lastName' => 'Doe',
        'email' => 'john@example.com',
        'details' => 'I need a website for my business',
        'file' => $file,
    ];

    $response = $this->postJson('/api/projects/submit', $data);

    $response->assertCreated()
             ->assertJsonStructure([
                 'success',
                 'message',
                 'data' => ['id', 'status']
             ]);

    $this->assertDatabaseHas('project_submissions', [
        'email' => 'john@example.com',
        'status' => 'pending'
    ]);

    $submission = ProjectSubmission::first();
    expect($submission->file_path)->not->toBeNull();
    Storage::disk('public')->assertExists($submission->file_path);
});

test('validates required fields', function () {
    $response = $this->postJson('/api/projects/submit', []);

    $response->assertUnprocessable()
             ->assertJsonValidationErrors(['firstName', 'lastName', 'email', 'details']);
});

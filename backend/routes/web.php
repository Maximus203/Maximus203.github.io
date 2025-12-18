<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/projets', function () {
    return inertia('Projets', [
        'projects' => [],
        'categories' => [],
    ]);
})->name('projets');

Route::get('/galerie', function () {
    return inertia('Galerie', [
        'images' => [],
        'categories' => [],
    ]);
})->name('galerie');

Route::prefix('outils')->name('outils.')->group(function () {
    Route::get('/', function () {
        return inertia('Outils/Index');
    })->name('index');

    Route::get('/readme-generator', function () {
        return inertia('Outils/ReadmeGenerator');
    })->name('readme');

    Route::get('/image-converter', function () {
        return inertia('Outils/ImageConverter');
    })->name('converter');

    Route::get('/meme-generator', function () {
        return inertia('Outils/MemeGenerator');
    })->name('meme');
});

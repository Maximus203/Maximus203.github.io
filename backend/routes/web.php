<?php

use App\Http\Controllers\GalleryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OutilsController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/projets', [ProjectController::class, 'index'])->name('projets');

Route::get('/galerie', [GalleryController::class, 'index'])->name('galerie');

Route::prefix('outils')->name('outils.')->group(function () {
    Route::get('/', [OutilsController::class, 'index'])->name('index');

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

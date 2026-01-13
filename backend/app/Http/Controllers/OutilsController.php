<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class OutilsController extends Controller
{
    public function index(): Response
    {
        $portfolioData = config('portfolio');

        return Inertia::render('Outils/Index', [
            'labels' => $portfolioData['labels'],
        ]);
    }
}

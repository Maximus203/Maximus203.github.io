<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $portfolioData = config('portfolio');

        return Inertia::render('Home', [
            'projects' => Project::latest()->take(6)->get(),
            'profile' => $portfolioData['profile'],
            'experience' => $portfolioData['experience'],
            'skills' => $portfolioData['skills'],
            'education' => $portfolioData['education'],
            'labels' => $portfolioData['labels'],
        ]);
    }
}

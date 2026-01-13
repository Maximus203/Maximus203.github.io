<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Projets', [
            'projects' => Project::latest()->get(),
            'categories' => Project::select('category')->distinct()->pluck('category'),
        ]);
    }
}

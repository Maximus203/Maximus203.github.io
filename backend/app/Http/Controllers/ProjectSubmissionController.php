<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\ProjectSubmissionRequest;
use App\Models\ProjectSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectSubmissionController extends Controller
{
    public function store(ProjectSubmissionRequest $request): JsonResponse
    {
        $data = $request->validated();
        $filePath = null;

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = Str::random(40) . '.' . $file->getClientOriginalExtension();
            $filePath = $file->storeAs('submissions/' . date('Y-m'), $filename, 'public');
        }

        $submission = ProjectSubmission::create([
            'first_name' => $data['firstName'],
            'last_name' => $data['lastName'],
            'email' => $data['email'],
            'details' => $data['details'],
            'file_path' => $filePath,
            'status' => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Votre demande a été envoyée avec succès !',
            'data' => $submission,
        ], 201);
    }
}

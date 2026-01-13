<?php

use App\Http\Controllers\ProjectSubmissionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Health check
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toIso8601String(),
    ]);
});

Route::middleware('throttle:60,1')->group(function () {
    Route::post('/projects/submit', [ProjectSubmissionController::class, 'store']);
});

// API routes protégées (à implémenter en Phase 4)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

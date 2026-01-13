<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'tags',
        'github',
        'demo_url',
        'image',
        'category',
        'featured',
    ];

    protected $casts = [
        'title' => 'array',
        'description' => 'array',
        'tags' => 'array',
        'featured' => 'boolean',
    ];
}

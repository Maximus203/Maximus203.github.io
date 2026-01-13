<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectSubmission extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'details',
        'file_path',
        'status',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];

    protected $appends = ['file_url'];

    public function getFileUrlAttribute(): ?string
    {
        return $this->file_path
            ? \Storage::url($this->file_path)
            : null;
    }
}

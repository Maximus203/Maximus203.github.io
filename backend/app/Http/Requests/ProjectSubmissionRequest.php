<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectSubmissionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'firstName' => ['required', 'string', 'min:2', 'max:100'],
            'lastName' => ['required', 'string', 'min:2', 'max:100'],
            'email' => ['required', 'email', 'max:255'],
            'details' => ['required', 'string', 'min:10', 'max:2000'],
            'file' => ['nullable', 'file', 'max:10240', 'mimes:pdf,doc,docx,jpg,png'],
        ];
    }

    public function messages(): array
    {
        return [
            'firstName.required' => 'Le prénom est requis.',
            'lastName.required' => 'Le nom est requis.',
            'email.required' => "L'email est requis.",
            'email.email' => "L'email doit être valide.",
            'details.required' => 'Les détails du projet sont requis.',
            'details.min' => 'Les détails doivent contenir au moins 10 caractères.',
            'file.max' => 'Le fichier ne doit pas dépasser 10 Mo.',
            'file.mimes' => 'Format de fichier non supporté (PDF, DOC, JPG, PNG).',
        ];
    }
}

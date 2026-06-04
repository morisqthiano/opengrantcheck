<?php

namespace App\Http\Controllers;

use App\Models\Guideline;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GuidelineController extends Controller
{
    public function index(): JsonResponse
    {
        $guidelines = Guideline::latest()->get();

        return $this->success('Guidelines retrieved successfully.', $guidelines);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'file' => ['required', 'file', 'mimes:pdf,doc,docx,txt', 'max:10240'],
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed.', $validator->errors(), 422);
        }

        $uploadedFile = $request->file('file');
        $path = $uploadedFile->store('guidelines', 'public');

        $guideline = Guideline::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'file_path' => $path,
            'original_filename' => $uploadedFile->getClientOriginalName(),
        ]);

        return $this->success('Guideline uploaded successfully.', $guideline, 201);
    }
}

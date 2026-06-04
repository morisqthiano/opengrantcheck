<?php

namespace App\Http\Controllers;

use App\Models\Guideline;
use App\Services\DocumentTextExtractor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class GuidelineController extends Controller
{
    public function __construct(private readonly DocumentTextExtractor $extractor)
    {
    }

    public function index(): JsonResponse
    {
        $guidelines = Guideline::latest()->get();

        return $this->success('Guidelines retrieved successfully.', $guidelines);
    }

    public function show(Guideline $guideline): JsonResponse
    {
        return $this->success('Guideline retrieved successfully.', $guideline);
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
        $extractedText = $this->extractor->extract($uploadedFile, $path);

        $guideline = Guideline::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'file_path' => $path,
            'original_filename' => $uploadedFile->getClientOriginalName(),
            'extracted_text' => $extractedText,
            'metadata_json' => $this->extractor->metadata($uploadedFile, $extractedText),
        ]);

        return $this->success('Guideline uploaded successfully.', $guideline, 201);
    }

    public function destroy(Guideline $guideline): JsonResponse
    {
        Storage::disk('public')->delete($guideline->file_path);
        $guideline->delete();

        return $this->success('Guideline deleted successfully.');
    }
}

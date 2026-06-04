<?php

namespace App\Http\Controllers;

use App\Models\Proposal;
use App\Services\DocumentTextExtractor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProposalController extends Controller
{
    public function __construct(private readonly DocumentTextExtractor $extractor)
    {
    }

    public function index(): JsonResponse
    {
        $proposals = Proposal::withCount('complianceChecks')->latest()->get();

        return $this->success('Proposals retrieved successfully.', $proposals);
    }

    public function show(Proposal $proposal): JsonResponse
    {
        return $this->success('Proposal retrieved successfully.', $proposal->load('complianceChecks'));
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'researcher_name' => ['required', 'string', 'max:255'],
            'file' => ['required', 'file', 'mimes:pdf,doc,docx,txt', 'max:10240'],
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed.', $validator->errors(), 422);
        }

        $uploadedFile = $request->file('file');
        $path = $uploadedFile->store('proposals', 'public');
        $extractedText = $this->extractor->extract($uploadedFile, $path);

        $proposal = Proposal::create([
            'title' => $request->input('title'),
            'researcher_name' => $request->input('researcher_name'),
            'file_path' => $path,
            'original_filename' => $uploadedFile->getClientOriginalName(),
            'extracted_text' => $extractedText,
            'metadata_json' => $this->extractor->metadata($uploadedFile, $extractedText),
        ]);

        return $this->success('Proposal uploaded successfully.', $proposal, 201);
    }

    public function destroy(Proposal $proposal): JsonResponse
    {
        Storage::disk('public')->delete($proposal->file_path);
        $proposal->delete();

        return $this->success('Proposal deleted successfully.');
    }
}

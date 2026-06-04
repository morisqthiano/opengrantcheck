<?php

namespace App\Http\Controllers;

use App\Models\Proposal;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProposalController extends Controller
{
    public function index(): JsonResponse
    {
        $proposals = Proposal::withCount('complianceChecks')->latest()->get();

        return $this->success('Proposals retrieved successfully.', $proposals);
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

        $proposal = Proposal::create([
            'title' => $request->input('title'),
            'researcher_name' => $request->input('researcher_name'),
            'file_path' => $path,
            'original_filename' => $uploadedFile->getClientOriginalName(),
        ]);

        return $this->success('Proposal uploaded successfully.', $proposal, 201);
    }
}

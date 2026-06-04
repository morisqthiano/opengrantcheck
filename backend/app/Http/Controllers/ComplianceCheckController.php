<?php

namespace App\Http\Controllers;

use App\Models\ComplianceCheck;
use App\Models\Proposal;
use Illuminate\Http\JsonResponse;

class ComplianceCheckController extends Controller
{
    public function index(): JsonResponse
    {
        $checks = ComplianceCheck::with('proposal')->latest()->get();

        return $this->success('Compliance checks retrieved successfully.', $checks);
    }

    public function run(Proposal $proposal): JsonResponse
    {
        $check = ComplianceCheck::create([
            'proposal_id' => $proposal->id,
            'score' => 72,
            'status' => 'Needs Revision',
            'result_json' => $this->dummyChecklist(),
            'recommendations_json' => $this->dummyRecommendations(),
        ]);

        return $this->success('Dummy compliance check completed successfully.', [
            'proposal' => $proposal,
            'check' => $check,
            'checklist' => $check->result_json,
            'recommendations' => $check->recommendations_json,
        ], 201);
    }

    public function result(Proposal $proposal): JsonResponse
    {
        $check = $proposal->complianceChecks()->latest()->first();

        if (! $check) {
            return $this->error('No compliance check result found for this proposal.', null, 404);
        }

        return $this->success('Compliance check result retrieved successfully.', [
            'proposal' => $proposal,
            'check' => $check,
            'checklist' => $check->result_json,
            'recommendations' => $check->recommendations_json,
        ]);
    }

    private function dummyChecklist(): array
    {
        return [
            [
                'item' => 'Abstract or summary is available',
                'status' => 'Passed',
                'note' => 'The proposal contains an abstract or project summary.',
            ],
            [
                'item' => 'Research objectives are clear',
                'status' => 'Passed',
                'note' => 'The objectives are stated clearly.',
            ],
            [
                'item' => 'Methodology section is available',
                'status' => 'Passed',
                'note' => 'The proposal includes a methodology section.',
            ],
            [
                'item' => 'Budget explanation is available',
                'status' => 'Warning',
                'note' => 'The budget section exists, but the justification should be improved.',
            ],
            [
                'item' => 'Expected deliverables are clearly stated',
                'status' => 'Passed',
                'note' => 'The proposal mentions expected deliverables.',
            ],
            [
                'item' => 'Open-source license is mentioned',
                'status' => 'Warning',
                'note' => 'The license plan should be explained more clearly.',
            ],
            [
                'item' => 'Data privacy consideration is explained',
                'status' => 'Missing',
                'note' => 'The proposal should include a clearer privacy and data handling section.',
            ],
            [
                'item' => 'References are included',
                'status' => 'Passed',
                'note' => 'The proposal includes references.',
            ],
        ];
    }

    private function dummyRecommendations(): array
    {
        return [
            'Add a clearer privacy and data handling section.',
            'Explain the open-source license and repository plan.',
            'Improve the budget justification and milestone alignment.',
        ];
    }
}

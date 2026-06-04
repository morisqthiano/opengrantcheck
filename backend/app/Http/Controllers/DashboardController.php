<?php

namespace App\Http\Controllers;

use App\Models\ComplianceCheck;
use App\Models\Guideline;
use App\Models\Proposal;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return $this->success('Dashboard summary retrieved successfully.', [
            'guidelines_count' => Guideline::count(),
            'proposals_count' => Proposal::count(),
            'checks_count' => ComplianceCheck::count(),
        ]);
    }
}

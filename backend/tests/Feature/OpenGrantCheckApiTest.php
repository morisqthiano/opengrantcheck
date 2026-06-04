<?php

namespace Tests\Feature;

use App\Models\Proposal;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class OpenGrantCheckApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_returns_summary_counts(): void
    {
        $response = $this->getJson('/api/dashboard');

        $response
            ->assertOk()
            ->assertJson([
                'success' => true,
                'data' => [
                    'guidelines_count' => 0,
                    'proposals_count' => 0,
                    'checks_count' => 0,
                ],
            ]);
    }

    public function test_guideline_can_be_uploaded(): void
    {
        Storage::fake('public');

        $response = $this->postJson('/api/guidelines', [
            'title' => 'Internal Research Grant Guideline',
            'description' => 'Prototype guideline document.',
            'file' => UploadedFile::fake()->create('guideline.pdf', 128, 'application/pdf'),
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.title', 'Internal Research Grant Guideline')
            ->assertJsonPath('data.metadata_json.extraction_status', 'not_supported_yet');

        $this->assertDatabaseHas('guidelines', [
            'title' => 'Internal Research Grant Guideline',
            'original_filename' => 'guideline.pdf',
        ]);

        Storage::disk('public')->assertExists($response->json('data.file_path'));
    }

    public function test_proposal_can_be_uploaded(): void
    {
        Storage::fake('public');

        $response = $this->postJson('/api/proposals', [
            'title' => 'Open Campus Research Repository',
            'researcher_name' => 'Dr. Prototype',
            'file' => UploadedFile::fake()->create('proposal.docx', 128, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.researcher_name', 'Dr. Prototype');

        $this->assertDatabaseHas('proposals', [
            'title' => 'Open Campus Research Repository',
            'researcher_name' => 'Dr. Prototype',
            'original_filename' => 'proposal.docx',
        ]);

        Storage::disk('public')->assertExists($response->json('data.file_path'));
    }

    public function test_txt_upload_extracts_text(): void
    {
        Storage::fake('public');

        $response = $this->postJson('/api/proposals', [
            'title' => 'Text Proposal',
            'researcher_name' => 'Dr. Text',
            'file' => UploadedFile::fake()->createWithContent(
                'proposal.txt',
                "Abstract\n\nMethodology and privacy consideration are included.",
            ),
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('data.metadata_json.extraction_status', 'extracted')
            ->assertJsonPath('data.extracted_text', 'Abstract Methodology and privacy consideration are included.');
    }

    public function test_dummy_compliance_check_can_be_run_and_retrieved(): void
    {
        $proposal = Proposal::create([
            'title' => 'Privacy-Aware Research Tooling',
            'researcher_name' => 'Dr. Local First',
            'file_path' => 'proposals/example.txt',
            'original_filename' => 'example.txt',
            'extracted_text' => null,
            'metadata_json' => null,
        ]);

        $runResponse = $this->postJson("/api/checks/run/{$proposal->id}");

        $runResponse
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.check.score', 72)
            ->assertJsonPath('data.check.status', 'Needs Revision')
            ->assertJsonCount(8, 'data.checklist')
            ->assertJsonCount(3, 'data.recommendations');

        $resultResponse = $this->getJson("/api/checks/result/{$proposal->id}");

        $resultResponse
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.proposal.title', 'Privacy-Aware Research Tooling')
            ->assertJsonPath('data.check.score', 72)
            ->assertJsonPath('data.checklist.6.status', 'Missing');
    }

    public function test_guideline_and_proposal_detail_routes_work(): void
    {
        Storage::fake('public');

        $guideline = $this->postJson('/api/guidelines', [
            'title' => 'Detail Guideline',
            'description' => 'Detail test',
            'file' => UploadedFile::fake()->createWithContent('guideline.txt', 'Guideline text'),
        ])->json('data');

        $proposal = $this->postJson('/api/proposals', [
            'title' => 'Detail Proposal',
            'researcher_name' => 'Dr. Detail',
            'file' => UploadedFile::fake()->createWithContent('proposal.txt', 'Proposal text'),
        ])->json('data');

        $this->getJson("/api/guidelines/{$guideline['id']}")
            ->assertOk()
            ->assertJsonPath('data.title', 'Detail Guideline');

        $this->getJson("/api/proposals/{$proposal['id']}")
            ->assertOk()
            ->assertJsonPath('data.title', 'Detail Proposal');
    }
}

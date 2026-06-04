<?php

namespace Database\Seeders;

use App\Models\Guideline;
use App\Models\Proposal;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Storage::disk('public')->put(
            'guidelines/sample-guideline.txt',
            'Required sections include abstract, objectives, methodology, budget explanation, deliverables, license plan, privacy consideration, and references.',
        );
        Storage::disk('public')->put(
            'proposals/sample-proposal.txt',
            'This sample proposal contains abstract, objectives, methodology, budget, expected deliverables, and references. Privacy and license sections still need improvement.',
        );

        Guideline::firstOrCreate(
            ['title' => 'Sample Internal Research Grant Guideline'],
            [
                'description' => 'Dummy guideline for demo and local testing.',
                'file_path' => 'guidelines/sample-guideline.txt',
                'original_filename' => 'sample-guideline.txt',
                'extracted_text' => 'Required sections include abstract, objectives, methodology, budget explanation, deliverables, license plan, privacy consideration, and references.',
                'metadata_json' => [
                    'extension' => 'txt',
                    'mime_type' => 'text/plain',
                    'size_bytes' => 0,
                    'extraction_status' => 'seeded',
                    'extracted_characters' => 149,
                ],
            ],
        );

        Proposal::firstOrCreate(
            ['title' => 'Sample Open Campus Research Repository'],
            [
                'researcher_name' => 'Dr. Prototype',
                'file_path' => 'proposals/sample-proposal.txt',
                'original_filename' => 'sample-proposal.txt',
                'extracted_text' => 'This sample proposal contains abstract, objectives, methodology, budget, expected deliverables, and references. Privacy and license sections still need improvement.',
                'metadata_json' => [
                    'extension' => 'txt',
                    'mime_type' => 'text/plain',
                    'size_bytes' => 0,
                    'extraction_status' => 'seeded',
                    'extracted_characters' => 153,
                ],
            ],
        );
    }
}

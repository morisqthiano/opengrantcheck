<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('guidelines', function (Blueprint $table): void {
            $table->longText('extracted_text')->nullable()->after('original_filename');
            $table->json('metadata_json')->nullable()->after('extracted_text');
        });

        Schema::table('proposals', function (Blueprint $table): void {
            $table->longText('extracted_text')->nullable()->after('original_filename');
            $table->json('metadata_json')->nullable()->after('extracted_text');
        });
    }

    public function down(): void
    {
        Schema::table('guidelines', function (Blueprint $table): void {
            $table->dropColumn(['extracted_text', 'metadata_json']);
        });

        Schema::table('proposals', function (Blueprint $table): void {
            $table->dropColumn(['extracted_text', 'metadata_json']);
        });
    }
};

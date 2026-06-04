<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ComplianceCheck extends Model
{
    use HasFactory;

    protected $fillable = [
        'proposal_id',
        'score',
        'status',
        'result_json',
        'recommendations_json',
    ];

    protected function casts(): array
    {
        return [
            'result_json' => 'array',
            'recommendations_json' => 'array',
        ];
    }

    public function proposal(): BelongsTo
    {
        return $this->belongsTo(Proposal::class);
    }
}

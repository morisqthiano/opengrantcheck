<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class DocumentTextExtractor
{
    public function extract(UploadedFile $file, string $storedPath): ?string
    {
        if (strtolower($file->getClientOriginalExtension()) !== 'txt') {
            return null;
        }

        $content = Storage::disk('public')->get($storedPath);
        $content = preg_replace('/\s+/', ' ', trim($content));

        return $content !== '' ? $content : null;
    }

    public function metadata(UploadedFile $file, ?string $extractedText): array
    {
        return [
            'extension' => strtolower($file->getClientOriginalExtension()),
            'mime_type' => $file->getClientMimeType(),
            'size_bytes' => $file->getSize(),
            'extraction_status' => $extractedText ? 'extracted' : 'not_supported_yet',
            'extracted_characters' => $extractedText ? strlen($extractedText) : 0,
        ];
    }
}

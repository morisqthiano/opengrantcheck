export default function DocumentMeta({ document }) {
  const metadata = document?.metadata_json || {}

  return (
    <dl className="grid gap-3 rounded-md bg-slate-50 p-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <dt className="font-medium text-slate-500">Original file</dt>
        <dd className="mt-1 text-slate-900">{document.original_filename}</dd>
      </div>
      <div>
        <dt className="font-medium text-slate-500">Type</dt>
        <dd className="mt-1 text-slate-900">{metadata.extension || 'unknown'}</dd>
      </div>
      <div>
        <dt className="font-medium text-slate-500">Extraction</dt>
        <dd className="mt-1 text-slate-900">{metadata.extraction_status || 'not available'}</dd>
      </div>
      <div>
        <dt className="font-medium text-slate-500">Characters</dt>
        <dd className="mt-1 text-slate-900">{metadata.extracted_characters || 0}</dd>
      </div>
    </dl>
  )
}

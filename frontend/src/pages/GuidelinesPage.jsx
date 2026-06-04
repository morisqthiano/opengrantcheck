import { useEffect, useState } from 'react'
import AlertMessage from '../components/AlertMessage'
import Button from '../components/Button'
import DocumentMeta from '../components/DocumentMeta'
import api from '../services/api'
import { apiErrorMessage } from '../services/errorMessage'

export default function GuidelinesPage() {
  const [guidelines, setGuidelines] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('/guidelines')
      .then((response) => setGuidelines(response.data.data))
      .catch((err) => setError(apiErrorMessage(err, 'Unable to load guidelines.')))
      .finally(() => setLoading(false))
  }, [])

  const deleteGuideline = async (id) => {
    setError('')

    try {
      await api.delete(`/guidelines/${id}`)
      setGuidelines((items) => items.filter((item) => item.id !== id))
    } catch (err) {
      setError(apiErrorMessage(err, 'Unable to delete guideline.'))
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">Guidelines</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">Uploaded Guidelines</h1>
          <p className="mt-3 text-slate-600">Review guideline files and extraction metadata.</p>
        </div>
        <Button to="/guidelines/create">Upload Guideline</Button>
      </div>

      <div className="mt-6">
        <AlertMessage type="error" message={error} />
      </div>

      <div className="mt-8 grid gap-4">
        {loading ? (
          <div className="rounded-md border border-slate-200 bg-white p-8 text-center text-slate-500">Loading guidelines...</div>
        ) : guidelines.length === 0 ? (
          <div className="rounded-md border border-slate-200 bg-white p-8 text-center">
            <p className="text-slate-600">No guidelines uploaded yet.</p>
            <div className="mt-4">
              <Button to="/guidelines/create" variant="secondary">Upload the first guideline</Button>
            </div>
          </div>
        ) : (
          guidelines.map((guideline) => (
            <article key={guideline.id} className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950">{guideline.title}</h2>
                  {guideline.description ? <p className="mt-2 text-slate-600">{guideline.description}</p> : null}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button href={guideline.file_url} target="_blank" rel="noreferrer" variant="secondary">View File</Button>
                  <Button onClick={() => deleteGuideline(guideline.id)} variant="muted">Delete</Button>
                </div>
              </div>
              <div className="mt-5">
                <DocumentMeta document={guideline} />
              </div>
              {guideline.extracted_text ? (
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{guideline.extracted_text}</p>
              ) : null}
            </article>
          ))
        )}
      </div>
    </section>
  )
}

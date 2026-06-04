import { useState } from 'react'
import AlertMessage from '../components/AlertMessage'
import Button from '../components/Button'
import api from '../services/api'
import { apiErrorMessage } from '../services/errorMessage'

export default function UploadGuidelinePage() {
  const [form, setForm] = useState({ title: '', description: '', file: null })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    setError('')
    setSubmitting(true)

    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('description', form.description)
    formData.append('file', form.file)

    try {
      const response = await api.post('/guidelines', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setMessage(response.data.message)
      setForm({ title: '', description: '', file: null })
      event.target.reset()
    } catch (err) {
      setError(apiErrorMessage(err, 'Unable to upload guideline.'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">Guidelines</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-950">Upload Grant Guideline</h1>
      <p className="mt-3 text-slate-600">Accepted files: PDF, DOC, DOCX, and TXT up to 10MB. TXT files are parsed into extracted text in this prototype.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <AlertMessage type="success" message={message} />
        <AlertMessage type="error" message={error} />

        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="title">Title</label>
          <input
            id="title"
            required
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="description">Description</label>
          <textarea
            id="description"
            rows="4"
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="file">File</label>
          <input
            id="file"
            required
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(event) => setForm({ ...form, file: event.target.files[0] })}
            className="mt-2 w-full rounded-md border border-dashed border-slate-300 bg-slate-50 px-3 py-3 text-sm"
          />
        </div>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Uploading...' : 'Upload Guideline'}
        </Button>
      </form>
    </section>
  )
}

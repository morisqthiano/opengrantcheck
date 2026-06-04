import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertMessage from '../components/AlertMessage'
import Button from '../components/Button'
import api from '../services/api'

export default function UploadProposalPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', researcher_name: '', file: null })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('researcher_name', form.researcher_name)
    formData.append('file', form.file)

    try {
      await api.post('/proposals', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      navigate('/checks')
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to upload proposal.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">Proposals</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-950">Upload Proposal Draft</h1>
      <p className="mt-3 text-slate-600">Add a proposal draft before running a prototype compliance check.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-md border border-slate-200 bg-white p-6 shadow-sm">
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
          <label className="text-sm font-medium text-slate-700" htmlFor="researcher_name">Researcher name</label>
          <input
            id="researcher_name"
            required
            value={form.researcher_name}
            onChange={(event) => setForm({ ...form, researcher_name: event.target.value })}
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
          {submitting ? 'Uploading...' : 'Upload Proposal'}
        </Button>
      </form>
    </section>
  )
}

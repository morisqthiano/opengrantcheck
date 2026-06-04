import { useEffect, useState } from 'react'
import AlertMessage from '../components/AlertMessage'
import Button from '../components/Button'
import StatCard from '../components/StatCard'
import api from '../services/api'

export default function DashboardPage() {
  const [summary, setSummary] = useState({
    guidelines_count: 0,
    proposals_count: 0,
    checks_count: 0,
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('/dashboard')
      .then((response) => setSummary(response.data.data))
      .catch(() => setError('Unable to load dashboard summary. Make sure the Laravel API is running.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">Dashboard</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">Proposal Compliance Workspace</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Upload grant guidelines, add proposal drafts, and run a prototype compliance checklist.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button to="/guidelines/create">Upload Guideline</Button>
          <Button to="/proposals/create" variant="secondary">Upload Proposal</Button>
          <Button to="/guidelines" variant="muted">View Guidelines</Button>
          <Button to="/proposals" variant="muted">View Proposals</Button>
          <Button to="/checks" variant="muted">View Checks</Button>
        </div>
      </div>

      <div className="mt-6">
        <AlertMessage type="error" message={error} />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Guidelines uploaded" value={loading ? '...' : summary.guidelines_count} />
        <StatCard label="Proposals uploaded" value={loading ? '...' : summary.proposals_count} />
        <StatCard label="Compliance checks" value={loading ? '...' : summary.checks_count} />
        <StatCard label="Current status" value="V0.1" helper="Dummy checklist prototype" />
      </div>

      <div className="mt-10 rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-950">How It Works</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {['Upload guideline', 'Upload proposal', 'Run compliance check', 'Review recommendations'].map((step, index) => (
            <div key={step} className="rounded-md bg-slate-50 p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                {index + 1}
              </div>
              <p className="mt-4 font-medium text-slate-900">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

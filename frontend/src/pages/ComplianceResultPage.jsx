import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AlertMessage from '../components/AlertMessage'
import BadgeStatus from '../components/BadgeStatus'
import Button from '../components/Button'
import ComplianceChecklist from '../components/ComplianceChecklist'
import api from '../services/api'

export default function ComplianceResultPage() {
  const { proposalId } = useParams()
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get(`/checks/result/${proposalId}`)
      .then((response) => setResult(response.data.data))
      .catch((err) => setError(err.response?.data?.message || 'Unable to load compliance result.'))
      .finally(() => setLoading(false))
  }, [proposalId])

  if (loading) {
    return <section className="mx-auto max-w-7xl px-4 py-10 text-slate-600 sm:px-6 lg:px-8">Loading result...</section>
  }

  if (error) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <AlertMessage type="error" message={error} />
        <div className="mt-5">
          <Button to="/checks" variant="secondary">Back to checks</Button>
        </div>
      </section>
    )
  }

  const score = result.check.score || 0

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">Compliance Result</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-950">{result.proposal.title}</h1>
            <p className="mt-2 text-slate-600">Researcher: {result.proposal.researcher_name}</p>
          </div>
          <BadgeStatus status={result.check.status} />
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-[220px_1fr] md:items-center">
          <div>
            <p className="text-sm font-medium text-slate-500">Compliance score</p>
            <p className="mt-2 text-5xl font-bold text-slate-950">{score}%</p>
          </div>
          <div>
            <div className="h-4 rounded-full bg-slate-100">
              <div className="h-4 rounded-full bg-sky-600" style={{ width: `${score}%` }} />
            </div>
            <p className="mt-3 text-sm text-slate-500">Overall status: {result.check.status}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <ComplianceChecklist items={result.checklist} />
      </div>

      <div className="mt-8 rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">Recommendations</h2>
        <ul className="mt-4 space-y-3">
          {result.recommendations.map((recommendation) => (
            <li key={recommendation} className="rounded-md bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {recommendation}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <Button to="/dashboard" variant="secondary">Back to Dashboard</Button>
      </div>
    </section>
  )
}

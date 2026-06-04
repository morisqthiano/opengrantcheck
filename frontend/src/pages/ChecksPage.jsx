import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertMessage from '../components/AlertMessage'
import Button from '../components/Button'
import api from '../services/api'
import { apiErrorMessage } from '../services/errorMessage'

export default function ChecksPage() {
  const navigate = useNavigate()
  const [proposals, setProposals] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [runningId, setRunningId] = useState(null)

  useEffect(() => {
    api
      .get('/proposals')
      .then((response) => setProposals(response.data.data))
      .catch((err) => setError(apiErrorMessage(err, 'Unable to load proposals. Make sure the Laravel API is running.')))
      .finally(() => setLoading(false))
  }, [])

  const runCheck = async (proposalId) => {
    setError('')
    setRunningId(proposalId)

    try {
      await api.post(`/checks/run/${proposalId}`)
      navigate(`/checks/result/${proposalId}`)
    } catch (err) {
      setError(apiErrorMessage(err, 'Unable to run compliance check.'))
    } finally {
      setRunningId(null)
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">Checks</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">Run Compliance Checks</h1>
          <p className="mt-3 text-slate-600">Select a proposal and generate the V0.1 dummy checklist.</p>
        </div>
        <Button to="/proposals/create" variant="secondary">Upload Proposal</Button>
      </div>

      <div className="mt-6">
        <AlertMessage type="error" message={error} />
      </div>

      <div className="mt-8 overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Proposal title</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Researcher name</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Uploaded date</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-5 py-8 text-center text-slate-500">Loading proposals...</td>
                </tr>
              ) : proposals.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-5 py-8 text-center text-slate-500">No proposals uploaded yet.</td>
                </tr>
              ) : (
                proposals.map((proposal) => (
                  <tr key={proposal.id}>
                    <td className="px-5 py-4 font-medium text-slate-950">{proposal.title}</td>
                    <td className="px-5 py-4 text-slate-600">{proposal.researcher_name}</td>
                    <td className="px-5 py-4 text-slate-600">{new Date(proposal.created_at).toLocaleDateString()}</td>
                    <td className="px-5 py-4">
                      <Button onClick={() => runCheck(proposal.id)} disabled={runningId === proposal.id}>
                        {runningId === proposal.id ? 'Running...' : 'Run Compliance Check'}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

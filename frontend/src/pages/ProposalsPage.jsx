import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertMessage from '../components/AlertMessage'
import Button from '../components/Button'
import DocumentMeta from '../components/DocumentMeta'
import api from '../services/api'
import { apiErrorMessage } from '../services/errorMessage'

export default function ProposalsPage() {
  const navigate = useNavigate()
  const [proposals, setProposals] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [runningId, setRunningId] = useState(null)

  useEffect(() => {
    api
      .get('/proposals')
      .then((response) => setProposals(response.data.data))
      .catch((err) => setError(apiErrorMessage(err, 'Unable to load proposals.')))
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

  const deleteProposal = async (id) => {
    setError('')

    try {
      await api.delete(`/proposals/${id}`)
      setProposals((items) => items.filter((item) => item.id !== id))
    } catch (err) {
      setError(apiErrorMessage(err, 'Unable to delete proposal.'))
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">Proposals</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">Uploaded Proposals</h1>
          <p className="mt-3 text-slate-600">Manage proposal drafts and run compliance checks.</p>
        </div>
        <Button to="/proposals/create">Upload Proposal</Button>
      </div>

      <div className="mt-6">
        <AlertMessage type="error" message={error} />
      </div>

      <div className="mt-8 grid gap-4">
        {loading ? (
          <div className="rounded-md border border-slate-200 bg-white p-8 text-center text-slate-500">Loading proposals...</div>
        ) : proposals.length === 0 ? (
          <div className="rounded-md border border-slate-200 bg-white p-8 text-center">
            <p className="text-slate-600">No proposals uploaded yet.</p>
            <div className="mt-4">
              <Button to="/proposals/create" variant="secondary">Upload the first proposal</Button>
            </div>
          </div>
        ) : (
          proposals.map((proposal) => (
            <article key={proposal.id} className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950">{proposal.title}</h2>
                  <p className="mt-2 text-slate-600">Researcher: {proposal.researcher_name}</p>
                  <p className="mt-1 text-sm text-slate-500">Checks run: {proposal.compliance_checks_count || 0}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => runCheck(proposal.id)} disabled={runningId === proposal.id}>
                    {runningId === proposal.id ? 'Running...' : 'Run Check'}
                  </Button>
                  <Button href={proposal.file_url} target="_blank" rel="noreferrer" variant="secondary">View File</Button>
                  <Button onClick={() => deleteProposal(proposal.id)} variant="muted">Delete</Button>
                </div>
              </div>
              <div className="mt-5">
                <DocumentMeta document={proposal} />
              </div>
              {proposal.extracted_text ? (
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{proposal.extracted_text}</p>
              ) : null}
            </article>
          ))
        )}
      </div>
    </section>
  )
}

import Button from '../components/Button'

const features = [
  {
    title: 'Guideline Upload',
    description: 'Keep grant guidance documents close to the local review workflow.',
  },
  {
    title: 'Proposal Draft Upload',
    description: 'Collect proposal drafts without requiring accounts or external services.',
  },
  {
    title: 'Compliance Checklist',
    description: 'Preview administrative readiness with a clear dummy checklist in V0.1.',
  },
  {
    title: 'Privacy-Aware Self-Hosted System',
    description: 'Designed for campus teams that need local-first, open-source infrastructure.',
  },
]

export default function LandingPage() {
  return (
    <div>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
              Prototype V0.1
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              OpenGrantCheck
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-medium text-slate-700">
              Local-First Open-Source AI Assistant for Research Proposal Compliance
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              OpenGrantCheck helps researchers and small universities review research proposal drafts against grant guidelines through a privacy-aware and self-hosted workflow.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/dashboard">Start Checking</Button>
              <Button
                href="https://github.com/morisqthiano/opengrantcheck"
                target="_blank"
                rel="noreferrer"
                variant="secondary"
              >
                View Repository
              </Button>
            </div>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="rounded-md bg-slate-900 p-5 text-white">
              <p className="text-sm text-slate-300">Latest dummy check</p>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-4xl font-bold">72%</p>
                  <p className="mt-1 text-sm text-slate-300">Needs Revision</p>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                  Prototype
                </span>
              </div>
              <div className="mt-6 h-2 rounded-full bg-slate-700">
                <div className="h-2 w-[72%] rounded-full bg-sky-400" />
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {[
                'Privacy section needs work',
                'License plan can be clearer',
                'Budget justification needs alignment',
              ].map((item) => (
                <div key={item} className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-950">{feature.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-14 text-white sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Why It Matters</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            Many promising research proposals fail because of administrative gaps, unclear documentation, or missed compliance details, not because the research idea is weak. OpenGrantCheck gives teams a practical local workflow to catch those issues earlier.
          </p>
        </div>
      </section>
    </div>
  )
}

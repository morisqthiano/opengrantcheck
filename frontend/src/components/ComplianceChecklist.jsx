import BadgeStatus from './BadgeStatus'

export default function ComplianceChecklist({ items = [] }) {
  return (
    <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-lg font-semibold text-slate-950">Compliance Checklist</h2>
      </div>
      <div className="divide-y divide-slate-200">
        {items.map((item) => (
          <div key={item.item} className="grid gap-3 px-5 py-4 md:grid-cols-[1fr_auto]">
            <div>
              <p className="font-medium text-slate-950">{item.item}</p>
              <p className="mt-1 text-sm text-slate-500">{item.note}</p>
            </div>
            <div className="md:text-right">
              <BadgeStatus status={item.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

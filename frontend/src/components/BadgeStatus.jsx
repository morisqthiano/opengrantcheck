const styles = {
  Passed: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Warning: 'bg-amber-50 text-amber-700 ring-amber-200',
  Missing: 'bg-rose-50 text-rose-700 ring-rose-200',
  'Needs Revision': 'bg-amber-50 text-amber-700 ring-amber-200',
}

export default function BadgeStatus({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
        styles[status] || 'bg-slate-100 text-slate-700 ring-slate-200'
      }`}
    >
      {status}
    </span>
  )
}

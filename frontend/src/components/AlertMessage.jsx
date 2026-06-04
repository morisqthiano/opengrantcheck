const styles = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  error: 'border-rose-200 bg-rose-50 text-rose-800',
  info: 'border-sky-200 bg-sky-50 text-sky-800',
}

export default function AlertMessage({ message, type = 'info' }) {
  if (!message) {
    return null
  }

  return (
    <div className={`rounded-md border px-4 py-3 text-sm ${styles[type]}`}>
      {message}
    </div>
  )
}

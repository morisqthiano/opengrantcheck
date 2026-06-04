import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-300',
  secondary: 'bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50 focus:ring-slate-300',
  muted: 'bg-slate-100 text-slate-800 hover:bg-slate-200 focus:ring-slate-300',
}

export default function Button({
  children,
  className = '',
  href,
  to,
  type = 'button',
  variant = 'primary',
  ...props
}) {
  const classes = `inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}

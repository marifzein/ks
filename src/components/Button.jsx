import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/25',
  dark: 'bg-ink text-white hover:bg-black',
  outline: 'border-2 border-ink/15 text-ink hover:border-ink hover:bg-white',
  outlineLight: 'border-2 border-white/40 text-white hover:border-white hover:bg-white/10 backdrop-blur-sm',
  gold: 'bg-gold text-ink hover:brightness-105 shadow-lg shadow-gold/30',
  ghost: 'text-ink hover:bg-ink/5',
  ghostLight: 'text-white hover:bg-white/10',
}

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-[15px]',
}

export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  children,
  ...rest
}) {
  const cls = `btn-base ${variants[variant]} ${sizes[size]} ${className}`
  const content = (
    <>
      {children}
      {Icon && <Icon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
    </>
  )
  if (to) {
    return (
      <Link to={to} className={`group ${cls}`} {...rest}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={`group ${cls}`} {...rest}>
        {content}
      </a>
    )
  }
  return (
    <button className={`group ${cls}`} {...rest}>
      {content}
    </button>
  )
}
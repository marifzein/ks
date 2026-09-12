const tones = {
  red: 'bg-primary/10 text-primary',
  gold: 'bg-gold/20 text-[#8a6d00]',
  dark: 'bg-ink text-white',
  gray: 'bg-ink/[0.06] text-ink/60',
  green: 'bg-emerald-500/10 text-emerald-600',
  blue: 'bg-blue-500/10 text-blue-600',
  purple: 'bg-purple-500/10 text-purple-600',
  white: 'bg-white/15 text-white backdrop-blur-sm',
}

export default function Badge({ tone = 'red', className = '', children }) {
  return <span className={`chip ${tones[tone]} ${className}`}>{children}</span>
}
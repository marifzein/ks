import { initials, jenjangColor } from '../lib/utils'

export default function MemberAvatar({ name, jenjang, size = 'md', className = '' }) {
  const color = jenjangColor(jenjang)
  const sizes = {
    sm: 'h-10 w-10 text-xs',
    md: 'h-14 w-14 text-base',
    lg: 'h-24 w-24 text-2xl',
    xl: 'h-32 w-32 text-3xl',
  }
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-2xl font-extrabold text-white ${sizes[size]} ${className}`}
      style={{ background: `linear-gradient(135deg, ${color}, #111111)` }}
    >
      {initials(name)}
    </div>
  )
}
export function Emblem({ className = 'h-10 w-auto' }) {
  return (
    <svg viewBox="0 0 100 118" className={className} aria-label="Lambang IKSPI Kera Sakti" role="img">
      <path d="M10 16 L26 16 L26 6 L74 6 L74 16 L90 16 L90 60 L50 116 L10 60 Z" fill="#E60000" />
      <path d="M10 16 L26 16 L26 6 L74 6 L74 16 L90 16 L90 60 L50 116 L10 60 Z" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="1.5" />
      <text x="50" y="15" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff" fontFamily="'Plus Jakarta Sans',sans-serif" letterSpacing="1">IKSPI</text>
      <circle cx="50" cy="63" r="30" fill="#F5C400" />
      <g fill="#111" stroke="#111" strokeLinecap="round" strokeLinejoin="round">
        <path d="M55 87 C 72 92 84 76 76 60 C 70 48 58 48 56 58" fill="none" strokeWidth="5" />
        <ellipse cx="55" cy="72" rx="8" ry="10" />
        <circle cx="59" cy="56" r="7" />
        <circle cx="66" cy="54" r="2.8" />
        <path d="M49 68 C 42 72 39 66 41 60" fill="none" strokeWidth="5" />
        <path d="M50 80 L47 87 M59 81 L63 87" strokeWidth="5" />
      </g>
      <g fill="#fff" stroke="#fff" strokeLinecap="round">
        <circle cx="41" cy="55" r="6" />
        <path d="M37 63 C 32 66 32 72 36 76 L 42 81 L 48 75 C 51 71 48 65 45 63 Z" />
        <path d="M37 66 L32 72 M46 65 L52 70" strokeWidth="3.5" fill="none" />
        <path d="M40 79 L37 86 M45 79 L49 86" strokeWidth="3.5" fill="none" />
      </g>
      <text x="50" y="107" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#fff" fontFamily="'Plus Jakarta Sans',sans-serif" letterSpacing="1">KERA SAKTI</text>
    </svg>
  )
}

export default function Logo({ className = '', emblemClass = 'h-11 w-auto', dark = false, to = '/' }) {
  return (
    <a href={to} className={`group flex items-center gap-3 ${className}`}>
      <Emblem className={emblemClass} />
      <span className="flex flex-col leading-none">
        <span className={`text-lg font-extrabold tracking-tight ${dark ? 'text-white' : 'text-ink'}`}>
          IKSPI<span className="text-primary"> DIGITAL</span>
        </span>
        <span className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.24em] ${dark ? 'text-white/50' : 'text-ink/45'}`}>
          Kera Sakti
        </span>
      </span>
    </a>
  )
}
import { Link } from 'react-router-dom'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
import { fmtDate } from '../lib/utils'
import Badge from './Badge'

const catTone = (cat) =>
  ({ Berita: 'red', Pengumuman: 'gold', Kegiatan: 'green', Organisasi: 'blue', Prestasi: 'purple' }[cat] || 'gray')

export default function NewsCard({ item, featured = false, className = '' }) {
  const Inner = (
    <>
      <div className={`relative overflow-hidden ${featured ? 'aspect-[16/10]' : 'aspect-[16/10]'}`}>
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-ink via-ink-soft to-primary-deeper" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute left-4 top-4">
          <Badge tone={catTone(item.category)}>{item.category}</Badge>
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-semibold text-white/85">
          <CalendarDays className="h-3.5 w-3.5" />
          {fmtDate(item.date)}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3
          className={`font-extrabold leading-snug tracking-tight text-ink transition-colors group-hover:text-primary ${
            featured ? 'text-2xl md:text-3xl' : 'text-lg'
          }`}
        >
          {item.title}
        </h3>
        <p className={`text-sm leading-relaxed text-ink/55 ${featured ? 'md:text-base' : 'line-clamp-3'}`}>
          {item.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-xs font-semibold text-ink/40">{item.author}</span>
          <span className="flex items-center gap-1 text-xs font-bold text-primary">
            Baca <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </>
  )

  return (
    <Link
      to={`/berita/${item.id}`}
      className={`group card-ik flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${className}`}
    >
      {Inner}
    </Link>
  )
}
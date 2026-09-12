import { CalendarDays, MapPin } from 'lucide-react'
import { fmtDate } from '../lib/utils'
import Badge from './Badge'

export default function EventCard({ event, className = '' }) {
  const d = new Date(event.date + 'T00:00:00')
  const day = d.toLocaleDateString('id-ID', { day: '2-digit' })
  const month = d.toLocaleDateString('id-ID', { month: 'short' }).toUpperCase()

  return (
    <article className={`group card-ik flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${className}`}>
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex items-start gap-2">
          <div className="flex flex-col items-center rounded-xl bg-white px-3 py-2 shadow-lg">
            <span className="text-xl font-extrabold leading-none text-ink">{day}</span>
            <span className="text-[10px] font-bold tracking-widest text-primary">{month}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="red">{event.category}</Badge>
        </div>
        <h3 className="text-lg font-extrabold leading-snug tracking-tight text-ink group-hover:text-primary">
          {event.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-ink/55">{event.description}</p>
        <div className="mt-auto flex flex-col gap-1.5 border-t border-ink/[0.06] pt-4 text-xs font-semibold text-ink/50">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-3.5 w-3.5 text-primary" /> {fmtDate(event.date)}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-primary" /> {event.location}
          </span>
        </div>
      </div>
    </article>
  )
}
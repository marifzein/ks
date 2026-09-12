import { Flag } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function Timeline({ items }) {
  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-primary via-ink/20 to-transparent md:left-1/2" />
      <div className="flex flex-col gap-12">
        {items.map((item, i) => {
          const left = i % 2 === 0
          return (
            <ScrollReveal key={i} className="relative">
              <div className={`md:flex md:items-start md:gap-16 ${left ? '' : 'md:flex-row-reverse'}`}>
                {/* Node */}
                <div className="absolute left-5 top-1 z-10 -translate-x-1/2 md:left-1/2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-surface bg-primary text-white shadow-lg shadow-primary/30">
                    <Flag className="h-4 w-4" />
                  </div>
                </div>
                {/* Card */}
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-3rem)] ${left ? '' : ''}`}>
                  <div className="card-ik relative p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{item.era}</span>
                    <h3 className="mt-2 text-xl font-extrabold tracking-tight text-ink">{item.year}</h3>
                    <p className="mt-1 text-sm font-bold text-primary">{item.title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink/60">{item.description}</p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink/[0.04] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-ink/50">
                      {item.tag}
                    </div>
                    {item.dataNote && (
                      <p className="mt-3 text-[11px] font-semibold text-primary/70">⚠ [DATA SIMULASI]</p>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )
        })}
      </div>
    </div>
  )
}
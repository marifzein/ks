import { useEffect, useRef, useState } from 'react'
import ScrollReveal from './ScrollReveal'

function CountUp({ value, suffix = '', duration = 1600 }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const start = performance.now()
            const tick = (now) => {
              const p = Math.min((now - start) / duration, 1)
              const eased = 1 - Math.pow(1 - p, 3)
              setDisplay(Math.round(value * eased))
              if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration])

  return (
    <span ref={ref} className="stat-number">
      {display.toLocaleString('id-ID')}
      {suffix}
    </span>
  )
}

export default function Stats({ items, dark = false, columns = 4 }) {
  return (
    <div className={`grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink/[0.06] md:grid-cols-${columns}`}>
      {items.map((s, i) => (
        <ScrollReveal
          key={i}
          delay={i * 80}
          className={`flex flex-col gap-1.5 p-6 md:p-8 ${dark ? 'bg-ink' : 'bg-white'} ${s.accent ? '' : ''}`}
        >
          <span
            className={`text-3xl font-extrabold tracking-tight md:text-4xl ${
              s.accent ? 'text-primary' : dark ? 'text-white' : 'text-ink'
            }`}
          >
            <CountUp value={s.value} suffix={s.suffix || ''} />
          </span>
          <span className={`text-xs font-bold uppercase tracking-wider ${dark ? 'text-white/45' : 'text-ink/45'}`}>
            {s.label}
          </span>
        </ScrollReveal>
      ))}
    </div>
  )
}
import ScrollReveal from './ScrollReveal'

export default function SectionHeader({ eyebrow, title, description, align = 'left', light = false, className = '' }) {
  const alignCls = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  return (
    <ScrollReveal className={`flex flex-col gap-4 ${alignCls} ${className}`}>
      {eyebrow && (
        <span className={`eyebrow ${align === 'center' ? 'justify-center' : ''} ${light ? 'text-gold' : ''}`}>
          {eyebrow}
        </span>
      )}
      <h2
        className={`max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`max-w-2xl text-base leading-relaxed md:text-lg ${light ? 'text-white/65' : 'text-ink/60'}`}>
          {description}
        </p>
      )}
    </ScrollReveal>
  )
}
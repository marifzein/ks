import { useState } from 'react'

export default function Tabs({ tabs, active, onChange, className = '' }) {
  return (
    <div className={`flex gap-1 overflow-x-auto rounded-full bg-ink/[0.05] p-1 ${className}`}>
      {tabs.map((tab) => {
        const key = typeof tab === 'string' ? tab : tab.key
        const label = typeof tab === 'string' ? tab : tab.label
        const isActive = active === key
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-bold transition-all ${
              isActive ? 'bg-ink text-white shadow' : 'text-ink/55 hover:text-ink'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

export function TabPanes({ panes, active }) {
  return <div className="mt-6">{panes[active]}</div>
}

export function useTabs(initial) {
  const [active, setActive] = useState(initial)
  return [active, setActive]
}
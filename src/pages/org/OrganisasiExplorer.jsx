import { useState } from 'react'
import { ChevronDown, ChevronRight, MapPin } from 'lucide-react'
import IndonesiaMap from '../../components/IndonesiaMap'
import Badge from '../../components/Badge'
import { organizationTree, provinces } from '../../data'
import { fmt } from '../../lib/utils'

function TreeNode({ node, depth = 0 }) {
  const [open, setOpen] = useState(depth < 1)
  const hasChildren = node.children?.length > 0
  const typeColor = {
    Pusat: 'bg-primary text-white',
    Pengda: 'bg-ink text-white',
    Cabang: 'bg-blue-500 text-white',
    Ranting: 'bg-white text-ink border border-ink/10',
  }[node.type]

  return (
    <div>
      <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 transition hover:bg-ink/[0.04]" style={{ marginLeft: depth * 24 }}>
        {hasChildren ? (
          <button onClick={() => setOpen(!open)} className="flex h-6 w-6 items-center justify-center rounded-md bg-ink/[0.06] text-ink/50 hover:text-ink" aria-label="Buka/tutup">
            {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        ) : (
          <span className="w-6" />
        )}
        <span className={`chip ${typeColor}`}>{node.type}</span>
        <span className="text-sm font-extrabold text-ink">{node.name}</span>
        {node.detail && <span className="ml-auto hidden text-[11px] font-semibold text-ink/40 sm:block">{node.detail}</span>}
      </div>
      {open && hasChildren && node.children.map((c) => <TreeNode key={c.name} node={c} depth={depth + 1} />)}
    </div>
  )
}

export default function OrganisasiExplorer() {
  const [selected, setSelected] = useState(null)
  const province = selected ? provinces.find((p) => p.name === selected) : null
  const top = [...provinces].sort((a, b) => b.members - a.members).slice(0, 6)

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Organization Explorer</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Struktur & Sebaran Organisasi</h1>
        <p className="mt-1 text-sm text-ink/50">Alur drill-down: Indonesia → Provinsi → Kabupaten/Kota → Cabang → Ranting · [DATA SIMULASI]</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <IndonesiaMap onSelect={(name) => setSelected(name)} selectedName={selected} height={460} />
          {province && (
            <div className="card-ik mt-4 animate-fadeUp p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold tracking-tight text-ink">{province.name}</h3>
                    <p className="text-xs font-semibold text-ink/40">Ibu kota {province.capital}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  {[
                    ['Anggota', fmt(province.members)],
                    ['Cabang', province.branches],
                    ['Ranting', province.rantings],
                  ].map(([l, v]) => (
                    <div key={l} className="text-center">
                      <p className="stat-number text-xl font-extrabold text-primary">{v}</p>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-ink/40">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 grid gap-3 border-t border-ink/[0.06] pt-5 sm:grid-cols-2">
                {[1, 2, 3, 4].map((k) => (
                  <div key={k} className="rounded-xl bg-surface p-4">
                    <p className="text-xs font-extrabold text-ink">{province.name} — Kabupaten/Kota {k}</p>
                    <p className="mt-1 text-[11px] font-semibold text-ink/45">
                      Cabang {k} · Ranting {k * 3} · {fmt(Math.round(province.members / 8))} anggota
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[10px] font-semibold text-ink/35">⚠ Data drill-down adalah DATA SIMULASI.</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6 xl:col-span-2">
          <div className="card-ik p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold tracking-tight text-ink">Top 6 Provinsi</h3>
              <Badge tone="gold">Simulasi</Badge>
            </div>
            <div className="mt-5 flex flex-col gap-4">
              {top.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setSelected(p.name)}
                  className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition ${
                    selected === p.name ? 'border-primary bg-primary/[0.05]' : 'border-transparent hover:bg-surface'
                  }`}
                >
                  <span className="w-6 text-lg font-extrabold text-ink/25">{i + 1}</span>
                  <div className="flex-1">
                    <p className="text-sm font-extrabold text-ink">{p.name}</p>
                    <p className="text-[11px] font-semibold text-ink/40">{p.branches} cabang · {p.rantings} ranting</p>
                  </div>
                  <p className="stat-number text-sm font-extrabold text-primary">{fmt(p.members)}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="card-ik flex-1 p-6">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-extrabold tracking-tight text-ink">Hierarki</h3>
              <span className="ml-auto flex gap-1.5">
                {[['Pusat', 'bg-primary'], ['Pengda', 'bg-ink'], ['Cabang', 'bg-blue-500'], ['Ranting', 'bg-white border border-ink/15']].map(([l, c]) => (
                  <span key={l} className={`h-3 w-3 rounded-full ${c}`} title={l} />
                ))}
              </span>
            </div>
            <div className="mt-4 max-h-[420px] overflow-y-auto pr-1">
              <TreeNode node={organizationTree} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
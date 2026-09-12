import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import MemberCard from '../../components/MemberCard'
import { provinces, jenjangList } from '../../data'

const statuses = ['Semua', 'AKTIF', 'NON-AKTIF', 'PENDING']

export default function MemberDirectory() {
  const { members } = useApp()
  const [q, setQ] = useState('')
  const [province, setProvince] = useState('Semua')
  const [jenjang, setJenjang] = useState('Semua')
  const [status, setStatus] = useState('Semua')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(
    () =>
      members.filter((m) => {
        const okQ = !q || (m.name + m.nomor + m.cabang).toLowerCase().includes(q.toLowerCase())
        const okP = province === 'Semua' || m.province === province
        const okJ = jenjang === 'Semua' || m.jenjang === jenjang
        const okS = status === 'Semua' || m.status === status
        return okQ && okP && okJ && okS
      }),
    [members, q, province, jenjang, status]
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Member Directory</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Direktori Anggota</h1>
        </div>
        <p className="text-sm font-semibold text-ink/45">
          {filtered.length} dari {members.length} anggota (demo)
        </p>
      </div>

      {/* Search */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white px-5 py-3.5 shadow-sm">
          <Search className="h-5 w-5 text-ink/35" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari nama, nomor anggota, atau cabang…"
            className="w-full bg-transparent text-sm font-medium text-ink placeholder:text-ink/35 focus:outline-none"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition ${
              showFilters ? 'bg-primary text-white' : 'bg-ink/[0.06] text-ink/60 hover:bg-ink/10'
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filter
          </button>
        </div>

        {showFilters && (
          <div className="grid animate-fadeUp gap-3 rounded-2xl border border-ink/10 bg-white p-5 sm:grid-cols-3">
            <div>
              <label className="label-ik">Provinsi</label>
              <select className="input-ik" value={province} onChange={(e) => setProvince(e.target.value)}>
                <option>Semua</option>
                {provinces.map((p) => (
                  <option key={p.name}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-ik">Jenjang</label>
              <select className="input-ik" value={jenjang} onChange={(e) => setJenjang(e.target.value)}>
                <option>Semua</option>
                {jenjangList.map((j) => (
                  <option key={j}>{j}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-ik">Status</label>
              <select className="input-ik" value={status} onChange={(e) => setStatus(e.target.value)}>
                {statuses.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((m) => (
          <MemberCard key={m.id} member={m} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="card-ik p-14 text-center">
          <p className="font-bold text-ink/55">Tidak ada anggota yang cocok dengan filter.</p>
        </div>
      )}
      <p className="text-center text-[11px] font-semibold text-ink/35">⚠ Direktori demo — data anggota adalah DATA SIMULASI.</p>
    </div>
  )
}
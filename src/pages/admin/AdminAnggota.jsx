import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import Badge from '../../components/Badge'
import Modal from '../../components/Modal'
import { jenjangList, provinces } from '../../data'
import { fmtDate } from '../../lib/utils'

export default function AdminAnggota() {
  const { members } = useApp()
  const [q, setQ] = useState('')
  const [province, setProvince] = useState('Semua')
  const [jenjang, setJenjang] = useState('Semua')
  const [detail, setDetail] = useState(null)

  const filtered = useMemo(
    () =>
      members.filter((m) => {
        const okQ = !q || (m.name + m.nomor + m.cabang).toLowerCase().includes(q.toLowerCase())
        return okQ && (province === 'Semua' || m.province === province) && (jenjang === 'Semua' || m.jenjang === jenjang)
      }),
    [members, q, province, jenjang]
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Admin</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Kelola Anggota</h1>
          <p className="mt-1 text-sm text-ink/50">{filtered.length} dari {members.length} anggota (data demo)</p>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white px-5 py-3">
          <Search className="h-4 w-4 text-ink/35" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari nama atau nomor…" className="w-full bg-transparent text-sm focus:outline-none" />
        </div>
        <select className="input-ik" value={province} onChange={(e) => setProvince(e.target.value)}>
          <option>Semua</option>
          {provinces.map((p) => <option key={p.name}>{p.name}</option>)}
        </select>
        <select className="input-ik" value={jenjang} onChange={(e) => setJenjang(e.target.value)}>
          <option>Semua</option>
          {jenjangList.map((j) => <option key={j}>{j}</option>)}
        </select>
      </div>

      <div className="card-ik overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink/[0.06] bg-surface text-[11px] font-extrabold uppercase tracking-wider text-ink/45">
                <th className="px-6 py-4">Anggota</th>
                <th className="px-4 py-4">Nomor</th>
                <th className="px-4 py-4">Jenjang</th>
                <th className="px-4 py-4">Cabang</th>
                <th className="px-4 py-4">Provinsi</th>
                <th className="px-4 py-4">Sejak</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} onClick={() => setDetail(m)} className="cursor-pointer border-b border-ink/[0.04] transition hover:bg-surface/60">
                  <td className="px-6 py-3.5 font-extrabold text-ink">{m.name}</td>
                  <td className="px-4 py-3.5 text-xs font-bold text-ink/50">{m.nomor}</td>
                  <td className="px-4 py-3.5 text-xs font-bold text-ink/70">{m.jenjang}</td>
                  <td className="px-4 py-3.5 text-xs font-semibold text-ink/55">{m.cabang}</td>
                  <td className="px-4 py-3.5 text-xs font-semibold text-ink/55">{m.province}</td>
                  <td className="px-4 py-3.5 text-xs font-semibold text-ink/50">{m.joinYear}</td>
                  <td className="px-6 py-3.5 text-right">
                    <Badge tone={m.status === 'AKTIF' ? 'green' : m.status === 'PENDING' ? 'gold' : 'gray'}>{m.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={Boolean(detail)} onClose={() => setDetail(null)} title="Detail Anggota" size="sm">
        {detail && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-ink text-xl font-extrabold text-white">
                {detail.name.slice(0, 1)}
              </div>
              <div>
                <p className="text-lg font-extrabold text-ink">{detail.name}</p>
                <p className="text-xs font-bold text-ink/45">{detail.nomor}</p>
                <div className="mt-1.5"><Badge tone={detail.status === 'AKTIF' ? 'green' : 'gray'}>{detail.status}</Badge></div>
              </div>
            </div>
            {[
              ['Jenjang', detail.jenjang],
              ['Tanggal Lahir', fmtDate(detail.birthDate)],
              ['No. HP', detail.phone],
              ['Provinsi', detail.province],
              ['Cabang', detail.cabang],
              ['Ranting', detail.ranting],
              ['Bergabung', String(detail.joinYear)],
              ['Prestasi', detail.achievements?.length ? `${detail.achievements.length} prestasi` : '—'],
            ].map(([l, v]) => (
              <div key={l} className="flex justify-between border-b border-ink/[0.06] pb-2 text-sm">
                <span className="font-semibold text-ink/45">{l}</span>
                <span className="font-extrabold text-ink">{v}</span>
              </div>
            ))}
            <p className="text-[11px] font-semibold text-ink/35">⚠ Data anggota adalah DATA SIMULASI.</p>
          </div>
        )}
      </Modal>
    </div>
  )
}
import { useState } from 'react'
import { CalendarDays, Plus, Trash2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useToast } from '../../context/ToastContext'
import Badge from '../../components/Badge'
import { fmtDate } from '../../lib/utils'

const empty = { title: '', category: 'Latihan Bersama', date: '2026-12-01', location: '', description: '' }

export default function AdminKegiatan() {
  const { events, addEvent, deleteEvent } = useApp()
  const toast = useToast()
  const [form, setForm] = useState(empty)
  const [showForm, setShowForm] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!form.title || !form.date) return
    addEvent({ ...form, image: '/images/silat-nusantara.jpg', status: 'open' })
    toast.success(`Kegiatan "${form.title}" diterbitkan.`)
    setForm(empty)
    setShowForm(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Admin</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Kelola Kegiatan</h1>
          <p className="mt-1 text-sm text-ink/50">{events.length} kegiatan terjadwal</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-base bg-primary text-white hover:bg-primary-dark">
          <Plus className="h-4 w-4" /> Tambah Kegiatan
        </button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="card-ik grid animate-fadeUp gap-4 p-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label-ik">Judul Kegiatan</label>
            <input className="input-ik" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Judul kegiatan…" required />
          </div>
          <div>
            <label className="label-ik">Kategori</label>
            <select className="input-ik" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {['Latihan Bersama', 'Ujian', 'Kejuaraan', 'Sosial', 'Seminar', 'Budaya'].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label-ik">Tanggal</label>
            <input type="date" className="input-ik" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
          </div>
          <div className="sm:col-span-2">
            <label className="label-ik">Lokasi</label>
            <input className="input-ik" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Kota / tempat" />
          </div>
          <div className="sm:col-span-2">
            <label className="label-ik">Deskripsi</label>
            <textarea className="input-ik min-h-[90px]" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Deskripsi singkat…" />
          </div>
          <div className="flex gap-3 sm:col-span-2">
            <button type="submit" className="btn-base bg-primary text-white hover:bg-primary-dark">Terbitkan</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-base bg-ink/[0.06] text-ink hover:bg-ink/10">Batal</button>
          </div>
        </form>
      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {events.map((e) => (
          <div key={e.id} className="card-ik group p-6 transition-all hover:shadow-lift">
            <div className="flex items-start justify-between gap-3">
              <Badge tone="red">{e.category}</Badge>
              <button onClick={() => { deleteEvent(e.id); toast.info('Kegiatan dihapus.', 'info') }} className="text-ink/25 transition hover:text-primary" aria-label="Hapus">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <h3 className="mt-3 text-base font-extrabold leading-snug text-ink">{e.title}</h3>
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink/50">{e.description}</p>
            <div className="mt-4 flex flex-col gap-1 border-t border-ink/[0.06] pt-3 text-xs font-semibold text-ink/45">
              <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-primary" /> {fmtDate(e.date)}</span>
              <span>{e.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
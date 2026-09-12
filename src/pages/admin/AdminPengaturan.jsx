import { useState } from 'react'
import { Building2, ShieldCheck } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useToast } from '../../context/ToastContext'
import Badge from '../../components/Badge'
import { orgStats, photoCredits } from '../../data'

export default function AdminPengaturan() {
  const toast = useToast()
  const [form, setForm] = useState({
    nama: 'IKSPI Kera Sakti',
    singkatan: 'IKSPI',
    tagline: 'Satu Persaudaraan. Satu Keluarga. Satu Ekosistem.',
    email: 'halo@ikspidigital.id',
    website: 'www.ikspidigital.id',
    modeData: 'simulasi',
    notifApprove: true,
    notifReject: true,
    notifAgenda: false,
  })

  const save = (e) => {
    e.preventDefault()
    toast.success('Pengaturan berhasil disimpan (demo).')
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Admin</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Pengaturan</h1>
        <p className="mt-1 text-sm text-ink/50">Profil organisasi dan preferensi sistem</p>
      </div>

      <form onSubmit={save} className="grid gap-6 lg:grid-cols-3">
        <div className="card-ik flex flex-col gap-5 p-7 lg:col-span-2">
          <h3 className="flex items-center gap-2 text-base font-extrabold text-ink">
            <Building2 className="h-4 w-4 text-primary" /> Profil Organisasi
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-ik">Nama Organisasi</label>
              <input className="input-ik" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} />
            </div>
            <div>
              <label className="label-ik">Singkatan</label>
              <input className="input-ik" value={form.singkatan} onChange={(e) => setForm({ ...form, singkatan: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <label className="label-ik">Tagline</label>
              <input className="input-ik" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
            </div>
            <div>
              <label className="label-ik">Email Resmi</label>
              <input className="input-ik" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="label-ik">Website</label>
              <input className="input-ik" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
            </div>
          </div>

          <h3 className="mt-2 flex items-center gap-2 text-base font-extrabold text-ink">
            <ShieldCheck className="h-4 w-4 text-primary" /> Mode Data & Notifikasi
          </h3>
          <div>
            <label className="label-ik">Mode Data</label>
            <select className="input-ik" value={form.modeData} onChange={(e) => setForm({ ...form, modeData: e.target.value })}>
              <option value="simulasi">DATA SIMULASI (mode demo)</option>
              <option value="resmi" disabled>Data resmi (belum tersedia)</option>
            </select>
            <p className="mt-1.5 text-[11px] font-semibold text-ink/40">
              Prototype berjalan dalam mode simulasi. Saat data resmi tersedia, mode dapat dialihkan tanpa mengubah struktur aplikasi.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {[
              ['notifApprove', 'Notifikasi saat registrasi disetujui'],
              ['notifReject', 'Notifikasi saat registrasi ditolak'],
              ['notifAgenda', 'Pengingat agenda kegiatan'],
            ].map(([key, label]) => (
              <label key={key} className="flex items-center gap-3 rounded-2xl bg-surface p-4">
                <input type="checkbox" className="h-4 w-4 accent-primary" checked={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.checked })} />
                <span className="text-sm font-bold text-ink/70">{label}</span>
              </label>
            ))}
          </div>

          <button type="submit" className="btn-base w-fit bg-primary text-white hover:bg-primary-dark">Simpan Pengaturan</button>
        </div>

        <div className="flex flex-col gap-6">
          <div className="card-ik p-7">
            <h3 className="text-base font-extrabold tracking-tight text-ink">Status Sistem</h3>
            <div className="mt-4 flex flex-col gap-3">
              {[
                ['Data anggota', `${orgStats.members.toLocaleString('id-ID')} entri`],
                ['Mode', 'Simulasi / Demo'],
                ['Sinkronisasi', 'Real-time (lokal)'],
              ].map(([l, v]) => (
                <div key={l} className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-ink/45">{l}</span>
                  <Badge tone="green">{v}</Badge>
                </div>
              ))}
            </div>
          </div>
          <div className="card-ik bg-ink p-7 text-white">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-gold">Disclaimer & Kredit</h3>
            <div className="mt-3 flex flex-col gap-2 text-[11px] leading-relaxed text-white/50">
              {photoCredits.map((c) => (
                <p key={c}>{c}</p>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
import { Link } from 'react-router-dom'
import { Instagram, Youtube, Facebook, Mail, MapPin } from 'lucide-react'
import { Emblem } from './Logo'

const cols = [
  {
    title: 'IKSPI',
    links: [
      { label: 'Tentang', to: '/tentang' },
      { label: 'Sejarah', to: '/sejarah' },
      { label: 'Nilai & Filosofi', to: '/nilai' },
    ],
  },
  {
    title: 'Informasi',
    links: [
      { label: 'Berita', to: '/berita' },
      { label: 'Kegiatan', to: '/kegiatan' },
      { label: 'Pengumuman', to: '/berita' },
    ],
  },
  {
    title: 'Keanggotaan',
    links: [
      { label: 'Cara Bergabung', to: '/bergabung' },
      { label: 'Registrasi', to: '/registrasi' },
      { label: 'Login Anggota', to: '/login' },
    ],
  },
  {
    title: 'Organisasi',
    links: [
      { label: 'Sebaran Organisasi', to: '/sebaran' },
      { label: 'Struktur Organisasi', to: '/sebaran' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-ik grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <Emblem className="h-14 w-auto" />
            <div>
              <p className="text-xl font-extrabold tracking-tight">
                IKSPI<span className="text-primary"> DIGITAL</span>
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40">
                Kera Sakti
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
            Satu Persaudaraan. Satu Keluarga. Satu Ekosistem.
            <br />
            Rumah digital resmi organisasi — identitas, informasi, dan layanan anggota dalam satu ekosistem.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Youtube, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-primary hover:text-white"
                aria-label="Media sosial"
              >
                <Icon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/40">{col.title}</h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm font-semibold text-white/70 transition hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-ik flex flex-col gap-3 py-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© 2026 IKSPI DIGITAL — Prototype / Demo</p>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> Indonesia
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> halo@ikspidigital.id
            </span>
          </div>
        </div>
        <div className="container-ik pb-8 text-[11px] leading-relaxed text-white/30">
          ⚠ Seluruh data pada website ini — termasuk angka anggota, nama tokoh, riwayat, dan prestasi — adalah{' '}
          <strong className="text-white/50">DATA SIMULASI untuk keperluan prototype/demo</strong> dan bukan data resmi
          organisasi.
        </div>
      </div>
    </footer>
  )
}
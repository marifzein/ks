import { Link } from 'react-router-dom'
import { ArrowRight, Bell, CalendarDays, CreditCard, Newspaper, QrCode, ShieldCheck, UserRound, Users } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import MemberAvatar from '../../components/MemberAvatar'
import { events, news } from '../../data'
import { fmtDate, timeAgo } from '../../lib/utils'

export default function MemberDashboard() {
  const { members, session } = useApp()
  const member = members.find((m) => m.id === (session?.member || 'mbr-001')) || members[0]
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3)
  const latestNews = news.slice(0, 3)

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome */}
      <div className="relative overflow-hidden rounded-3xl bg-ink p-8 text-white shadow-lift">
        <div className="bg-grid absolute inset-0" />
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <MemberAvatar name={member.name} jenjang={member.jenjang} size="lg" className="rounded-2xl" />
            <div>
              <p className="text-sm font-semibold text-white/50">Selamat datang kembali,</p>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{member.name}</h1>
              <p className="mt-1 text-xs font-bold tracking-wide text-white/40">{member.nomor}</p>
            </div>
          </div>
          <Link to="/anggota/kartu" className="btn-base bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary-dark">
            <QrCode className="h-4 w-4" /> Tampilkan Kartu Digital
          </Link>
        </div>
        <div className="relative mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            [ShieldCheck, 'Status', member.status],
            [UserRound, 'Jenjang', member.jenjang],
            [Users, 'Cabang', member.cabang],
            [Bell, 'Pengumuman', '3 baru'],
          ].map(([Icon, l, v]) => (
            <div key={l} className="rounded-2xl bg-white/[0.07] p-4 backdrop-blur">
              <Icon className="h-4 w-4 text-gold" />
              <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-white/40">{l}</p>
              <p className="mt-0.5 truncate text-sm font-extrabold">{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          [CreditCard, 'Kartu Anggota', 'Identitas digital + QR', '/anggota/kartu'],
          [UserRound, 'Profil Saya', 'Data & riwayat keanggotaan', '/anggota/profil'],
          [Users, 'Direktori', 'Cari sesama anggota', '/anggota/direktori'],
        ].map(([Icon, t, d, to]) => (
          <Link key={t} to={to} className="group card-ik flex items-center gap-4 p-5 transition-all hover:-translate-y-0.5 hover:shadow-lift">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-extrabold text-ink">{t}</p>
              <p className="truncate text-xs text-ink/45">{d}</p>
            </div>
            <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-ink/20 group-hover:text-primary" />
          </Link>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Events */}
        <div className="card-ik p-7">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-ink">
              <CalendarDays className="h-5 w-5 text-primary" /> Kegiatan Mendatang
            </h2>
            <Link to="/kegiatan" className="text-xs font-bold text-primary hover:underline">Semua →</Link>
          </div>
          <div className="mt-5 flex flex-col gap-4">
            {upcoming.map((e) => (
              <div key={e.id} className="flex items-center gap-4 rounded-2xl bg-surface p-4">
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-ink text-white">
                  <span className="text-lg font-extrabold leading-none">{new Date(e.date + 'T00:00:00').getDate()}</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-white/60">
                    {new Date(e.date + 'T00:00:00').toLocaleDateString('id-ID', { month: 'short' })}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-extrabold text-ink">{e.title}</p>
                  <p className="text-xs text-ink/45">{e.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* News */}
        <div className="card-ik p-7">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-ink">
              <Newspaper className="h-5 w-5 text-primary" /> Informasi Terbaru
            </h2>
            <Link to="/berita" className="text-xs font-bold text-primary hover:underline">Semua →</Link>
          </div>
          <div className="mt-5 flex flex-col gap-4">
            {latestNews.map((n) => (
              <Link key={n.id} to={`/berita/${n.id}`} className="group flex gap-4 rounded-2xl p-2 transition hover:bg-surface">
                <img src={n.image} alt="" className="h-14 w-20 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0">
                  <p className="line-clamp-2 text-sm font-extrabold leading-snug text-ink group-hover:text-primary">{n.title}</p>
                  <p className="mt-1 text-[11px] font-semibold text-ink/40">{timeAgo(n.date + 'T00:00:00')} · {n.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-[11px] font-semibold text-ink/35">⚠ Prototype demo — seluruh data adalah DATA SIMULASI.</p>
    </div>
  )
}
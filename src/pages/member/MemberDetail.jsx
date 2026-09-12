import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, MapPin, Medal, Phone, ShieldCheck } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import MemberAvatar from '../../components/MemberAvatar'
import Badge from '../../components/Badge'
import { fmtDate } from '../../lib/utils'

export default function MemberDetail() {
  const { id } = useParams()
  const { members } = useApp()
  const member = members.find((m) => m.id === id) || members[0]

  return (
    <div className="flex flex-col gap-6">
      <Link to="/anggota/direktori" className="flex items-center gap-2 text-sm font-bold text-ink/50 hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> Kembali ke Direktori
      </Link>

      <div className="card-ik overflow-hidden">
        <div className="bg-gradient-to-r from-ink via-ink-soft to-primary-deeper p-8">
          <div className="flex flex-wrap items-center gap-6">
            <MemberAvatar name={member.name} jenjang={member.jenjang} size="xl" className="rounded-3xl" />
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                <Badge tone={member.status === 'AKTIF' ? 'green' : member.status === 'PENDING' ? 'gold' : 'gray'}>{member.status}</Badge>
                <Badge tone="white">{member.jenjang}</Badge>
              </div>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white">{member.name}</h1>
              <p className="mt-1 text-sm font-bold tracking-wide text-white/50">{member.nomor}</p>
            </div>
          </div>
        </div>
        <div className="grid gap-5 p-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [MapPin, 'Wilayah', `${member.cabang} · ${member.province}`],
            [CalendarDays, 'Bergabung', String(member.joinYear)],
            [Phone, 'Kontak', member.phone],
            [ShieldCheck, 'Ranting', member.ranting],
          ].map(([Icon, l, v]) => (
            <div key={l} className="rounded-2xl bg-surface p-4">
              <Icon className="h-4 w-4 text-primary" />
              <p className="mt-2 text-[10px] font-extrabold uppercase tracking-wider text-ink/40">{l}</p>
              <p className="mt-0.5 text-sm font-extrabold text-ink">{v}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-ik p-7">
          <h3 className="flex items-center gap-2 text-base font-extrabold text-ink">
            <Medal className="h-4 w-4 text-gold" /> Prestasi
          </h3>
          {member.achievements?.length ? (
            <ul className="mt-4 flex flex-col gap-2">
              {member.achievements.map((a, i) => (
                <li key={i} className="rounded-xl bg-surface p-3 text-sm font-bold text-ink/70">{a}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm font-semibold text-ink/40">Belum ada prestasi tercatat.</p>
          )}
        </div>
        <div className="card-ik p-7">
          <h3 className="flex items-center gap-2 text-base font-extrabold text-ink">
            <CalendarDays className="h-4 w-4 text-primary" /> Riwayat Kegiatan
          </h3>
          {member.activities?.length ? (
            <ul className="mt-4 flex flex-col gap-2">
              {member.activities.map((a, i) => (
                <li key={i} className="rounded-xl bg-surface p-3 text-sm font-bold text-ink/70">{a}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm font-semibold text-ink/40">Belum ada kegiatan tercatat.</p>
          )}
        </div>
      </div>
      <p className="text-center text-[11px] font-semibold text-ink/35">⚠ Data profil anggota adalah DATA SIMULASI. Tanggal lahir: {fmtDate(member.birthDate)}.</p>
    </div>
  )
}
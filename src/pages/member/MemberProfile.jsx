import { useState } from 'react'
import { Award, CalendarDays, MapPin, Medal, Network, Phone, UserRound } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import MemberAvatar from '../../components/MemberAvatar'
import Badge from '../../components/Badge'
import Tabs, { TabPanes } from '../../components/Tabs'
import { jenjangDescriptions, jenjangList } from '../../data'
import { fmtDate, jenjangColor } from '../../lib/utils'

export default function MemberProfile() {
  const { members, session } = useApp()
  const member = members.find((m) => m.id === (session?.member || 'mbr-001')) || members[0]
  const [active, setActive] = useState('Profil')

  const levelIndex = Math.max(0, jenjangList.indexOf(member.jenjang))

  const panes = {
    Profil: (
      <div className="grid gap-5 sm:grid-cols-2">
        {[
          ['Nomor Anggota', member.nomor],
          ['Nama Lengkap', member.name],
          ['Jenis Kelamin', member.gender === 'L' ? 'Laki-laki' : 'Perempuan'],
          ['Tanggal Lahir', fmtDate(member.birthDate)],
          ['No. HP', member.phone],
          ['Bergabung Sejak', String(member.joinYear)],
          ['Status', member.status],
          ['Jenjang', member.jenjang],
        ].map(([l, v]) => (
          <div key={l} className="rounded-2xl bg-surface p-4">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-ink/40">{l}</p>
            <p className="mt-1 text-sm font-extrabold text-ink">{v}</p>
          </div>
        ))}
      </div>
    ),
    Jenjang: (
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          {jenjangList.map((j, i) => (
            <div
              key={j}
              className={`flex items-center gap-4 rounded-2xl border p-4 ${
                i === levelIndex ? 'border-primary/40 bg-primary/[0.05] shadow-lg shadow-primary/10' : 'border-ink/[0.06] bg-surface'
              }`}
            >
              <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: jenjangColor(j) }} />
              <div className="flex-1">
                <p className="text-sm font-extrabold text-ink">{j} {i === levelIndex && <Badge tone="red" className="ml-2">Jenjang Saat Ini</Badge>}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-ink/50">{jenjangDescriptions[j]}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] font-semibold text-ink/35">⚠ Nama jenjang adalah DATA SIMULASI — menunggu data resmi organisasi.</p>
      </div>
    ),
    Organisasi: (
      <div className="grid gap-5 sm:grid-cols-2">
        {[
          ['Provinsi', member.province, MapPin],
          ['Cabang', member.cabang, Network],
          ['Ranting', member.ranting, MapPin],
          ['Pengurus Terkait', `${member.cabang} — Pengurus Cabang`, UserRound],
        ].map(([l, v, Icon]) => (
          <div key={l} className="flex items-center gap-4 rounded-2xl bg-surface p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-ink/40">{l}</p>
              <p className="text-sm font-extrabold text-ink">{v}</p>
            </div>
          </div>
        ))}
      </div>
    ),
    Prestasi: (
      <div className="flex flex-col gap-4">
        {member.achievements?.length ? (
          member.achievements.map((a, i) => (
            <div key={i} className="flex items-center gap-4 rounded-2xl bg-surface p-4">
              <Medal className="h-5 w-5 shrink-0 text-gold" />
              <div>
                <p className="text-sm font-extrabold text-ink">{a}</p>
                <p className="text-xs text-ink/45">Prestasi [DATA SIMULASI]</p>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl bg-surface p-8 text-center">
            <Award className="mx-auto h-8 w-8 text-ink/20" />
            <p className="mt-3 text-sm font-bold text-ink/50">Belum ada prestasi tercatat.</p>
          </div>
        )}
      </div>
    ),
    Kegiatan: (
      <div className="flex flex-col gap-4">
        {member.activities?.length ? (
          member.activities.map((a, i) => (
            <div key={i} className="flex items-center gap-4 rounded-2xl bg-surface p-4">
              <CalendarDays className="h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm font-extrabold text-ink">{a}</p>
            </div>
          ))
        ) : (
          <div className="rounded-2xl bg-surface p-8 text-center">
            <CalendarDays className="mx-auto h-8 w-8 text-ink/20" />
            <p className="mt-3 text-sm font-bold text-ink/50">Belum ada keikutsertaan kegiatan.</p>
          </div>
        )}
        <p className="text-[11px] font-semibold text-ink/35">⚠ Data kegiatan dan prestasi adalah DATA SIMULASI.</p>
      </div>
    ),
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-ink p-8 text-white shadow-lift">
        <div className="bg-grid absolute inset-0" />
        <div className="relative flex flex-wrap items-center gap-6">
          <MemberAvatar name={member.name} jenjang={member.jenjang} size="xl" className="rounded-3xl" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={member.status === 'AKTIF' ? 'green' : 'gray'}>{member.status}</Badge>
              <Badge tone="white">{member.jenjang}</Badge>
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight">{member.name}</h1>
            <p className="mt-1 text-sm font-bold tracking-wide text-white/45">{member.nomor}</p>
            <div className="mt-4 flex flex-wrap gap-5 text-xs font-semibold text-white/55">
              <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {member.phone}</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {member.cabang} · {member.province}</span>
              <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> Anggota sejak {member.joinYear}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={['Profil', 'Jenjang', 'Organisasi', 'Prestasi', 'Kegiatan']} active={active} onChange={setActive} />
      <TabPanes panes={panes} active={active} />
    </div>
  )
}
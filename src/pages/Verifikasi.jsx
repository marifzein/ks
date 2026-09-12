import { Link, useParams } from 'react-router-dom'
import { BadgeCheck, MapPin, ShieldCheck } from 'lucide-react'
import { Emblem } from '../components/Logo'
import { useApp } from '../context/AppContext'
import MemberAvatar from '../components/MemberAvatar'

export default function Verifikasi() {
  const { id } = useParams()
  const { members } = useApp()
  const member = members.find((m) => m.id === id) || members[0]
  const verified = member?.status === 'AKTIF'

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5 py-28">
      <div className="w-full max-w-md animate-fadeUp">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur">
          <div className="mx-auto flex justify-center">
            <Emblem className="h-16 w-auto" />
          </div>

          <div className="mt-6">
            {verified ? (
              <>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
                  <BadgeCheck className="h-9 w-9 text-emerald-400" />
                </div>
                <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  ✓ ANGGOTA TERVERIFIKASI
                </h1>
                <p className="mt-2 text-sm text-white/55">
                  Identitas anggota ini telah diverifikasi oleh pengurus organisasi.
                </p>
              </>
            ) : (
              <>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15">
                  <ShieldCheck className="h-9 w-9 text-gold" />
                </div>
                <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  STATUS MENUNGGU VERIFIKASI
                </h1>
                <p className="mt-2 text-sm text-white/55">
                  Data anggota masih dalam proses verifikasi pengurus.
                </p>
              </>
            )}
          </div>

          {/* Member data */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.05] p-6 text-left">
            <div className="flex items-center gap-4">
              <MemberAvatar name={member.name} jenjang={member.jenjang} size="md" />
              <div>
                <p className="text-lg font-extrabold text-white">{member.name}</p>
                <p className="text-xs font-bold tracking-wide text-white/40">{member.nomor}</p>
                <p className="mt-1 text-[11px] font-semibold text-gold">{member.jenjang}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-2 border-t border-white/10 pt-4 text-xs font-semibold text-white/55">
              <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary" /> {member.cabang} — {member.province}</span>
              <span className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Status: {member.status}</span>
            </div>
          </div>

          <p className="mt-5 text-[10px] leading-relaxed text-white/30">
            ⚠ Halaman verifikasi ini adalah bagian dari prototype IKSPI DIGITAL. Data anggota adalah DATA SIMULASI.
          </p>
          <Link to="/" className="mt-4 inline-block text-xs font-bold text-white/50 underline-offset-4 hover:text-white hover:underline">
            Kembali ke Website IKSPI →
          </Link>
        </div>
      </div>
    </div>
  )
}
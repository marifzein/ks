import { Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { BadgeCheck, Download, ExternalLink, MapPin, ShieldCheck } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { Emblem } from '../../components/Logo'
import MemberAvatar from '../../components/MemberAvatar'
import { useToast } from '../../context/ToastContext'

export default function MemberCardPage() {
  const { members, session } = useApp()
  const member = members.find((m) => m.id === (session?.member || 'mbr-001')) || members[0]
  const toast = useToast()
  const verifyUrl = `${window.location.origin}/verifikasi/${member.id}`

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Digital Member Card</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Kartu Anggota Digital</h1>
        </div>
        <button
          onClick={() => toast.success('Kartu digital disimpan ke perangkat Anda.')}
          className="btn-base bg-ink text-white hover:bg-black"
        >
          <Download className="h-4 w-4" /> Simpan Kartu
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Card */}
        <div className="lg:col-span-3">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#2a0000] via-primary-deeper to-ink p-[1px] shadow-lift">
            <div className="relative rounded-[27px] bg-gradient-to-br from-[#3a0202] via-[#1a0505] to-[#111111] p-8">
              <div className="bg-grid absolute inset-0 opacity-60" />
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
              <div className="relative">
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Emblem className="h-14 w-auto" />
                    <div>
                      <p className="text-lg font-extrabold tracking-tight text-white">
                        IKSPI<span className="text-primary"> DIGITAL</span>
                      </p>
                      <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-white/45">Member Card</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1.5 text-[10px] font-extrabold text-emerald-400">
                    <BadgeCheck className="h-3.5 w-3.5" /> TERVERIFIKASI
                  </div>
                </div>

                {/* Member info */}
                <div className="mt-8 flex items-center gap-5">
                  <MemberAvatar name={member.name} jenjang={member.jenjang} size="lg" className="rounded-2xl ring-2 ring-white/20" />
                  <div>
                    <p className="text-2xl font-extrabold tracking-tight text-white">{member.name}</p>
                    <p className="mt-1 text-sm font-bold tracking-wider text-white/45">{member.nomor}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="chip bg-gold/20 text-gold">{member.jenjang}</span>
                      <span className="chip bg-white/10 text-white/70">AKTIF</span>
                    </div>
                  </div>
                </div>

                {/* Bottom row */}
                <div className="mt-8 flex items-end justify-between gap-6 border-t border-white/10 pt-6">
                  <div className="flex flex-col gap-2 text-xs font-semibold text-white/60">
                    <span className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      {member.cabang} — {member.province}
                    </span>
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                      Anggota sejak {member.joinYear}
                    </span>
                  </div>
                  <div className="rounded-2xl bg-white p-3 shadow-lg">
                    <QRCodeSVG value={verifyUrl} size={104} fgColor="#111111" bgColor="#ffffff" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-[11px] font-semibold text-ink/40">
            Pindai QR untuk membuka halaman verifikasi anggota. ⚠ Data anggota adalah DATA SIMULASI.
          </p>
        </div>

        {/* Side */}
        <div className="flex flex-col gap-5 lg:col-span-2">
          <div className="card-ik p-7">
            <h3 className="text-base font-extrabold tracking-tight text-ink">Tentang Kartu Ini</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/55">
              Kartu anggota digital adalah identitas resmi keanggotaan pada ekosistem IKSPI DIGITAL. Setiap anggota
              memiliki nomor unik, jenjang, dan QR verifikasi yang dapat dipindai siapa pun untuk memastikan
              keabsahan keanggotaan.
            </p>
            <ul className="mt-4 flex flex-col gap-2 text-sm font-semibold text-ink/65">
              {['Nomor anggota unik & permanen', 'QR verifikasi real-time', 'Jenjang & wilayah tertera', 'Dapat diperbarui saat kenaikan tingkat'].map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="card-ik bg-ink p-7 text-white">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-gold">Coba Verifikasi</p>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              Lihat bagaimana halaman verifikasi tampil saat QR dipindai orang lain.
            </p>
            <Link
              to={`/verifikasi/${member.id}`}
              className="btn-base mt-4 w-full bg-primary text-white hover:bg-primary-dark"
            >
              Buka Halaman Verifikasi <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
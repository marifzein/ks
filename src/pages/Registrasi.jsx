import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  FileUp,
  Home,
  MapPin,
  UserRound,
} from 'lucide-react'
import Button from '../components/Button'
import Badge from '../components/Badge'
import { useToast } from '../context/ToastContext'
import { provinces } from '../data'

const steps = [
  { key: 'diri', label: 'Data Diri', icon: UserRound },
  { key: 'alamat', label: 'Alamat', icon: Home },
  { key: 'wilayah', label: 'Wilayah', icon: MapPin },
  { key: 'dokumen', label: 'Dokumen', icon: FileUp },
  { key: 'konfirmasi', label: 'Konfirmasi', icon: ClipboardCheck },
]

const empty = {
  nama: '', nik: '', tempatLahir: '', tanggalLahir: '', jenisKelamin: '', agama: '',
  alamat: '', rtRw: '', kelurahan: '', kecamatan: '', kodePos: '',
  provinsi: '', kabupaten: '', cabang: '', ranting: '', jenjang: 'Anggota Muda',
  ktp: null, foto: null, pernyataan: null,
}

export default function Registrasi() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState(empty)
  const [done, setDone] = useState(false)
  const [regNo, setRegNo] = useState('')
  const toast = useToast()
  const navigate = useNavigate()

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }))
  const province = provinces.find((p) => p.name === data.provinsi)

  const canNext = (() => {
    switch (step) {
      case 0:
        return data.nama && data.nik && data.tanggalLahir && data.jenisKelamin
      case 1:
        return data.alamat && data.kelurahan && data.kecamatan && data.kodePos
      case 2:
        return data.provinsi && data.cabang && data.ranting
      case 3:
        return data.ktp && data.foto
      default:
        return true
    }
  })()

  const submit = () => {
    const no = `REG-2026-${String(Math.floor(10000 + Math.random() * 89999))}`
    setRegNo(no)
    setDone(true)
    toast.success('Registrasi berhasil dikirim!')
  }

  const files = (label) => [
    { label, ok: Boolean(data[label]) },
  ]

  const field = (label, value, onChange, placeholder = '', type = 'text') => (
    <div>
      <label className="label-ik">{label}</label>
      <input type={type} className="input-ik" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )

  const select = (label, value, onChange, options) => (
    <div>
      <label className="label-ik">{label}</label>
      <div className="relative">
        <select className="input-ik appearance-none pr-10" value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">Pilih…</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
      </div>
    </div>
  )

  if (done) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink px-5 py-28">
        <div className="w-full max-w-lg animate-fadeUp text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15">
            <CheckCircle2 className="h-10 w-10 text-emerald-400" />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Registrasi Berhasil</h1>
          <p className="mt-3 text-white/60">Data kamu telah kami terima dan sedang dalam proses verifikasi pengurus cabang.</p>
          <div className="mx-auto mt-8 max-w-sm rounded-3xl border border-white/10 bg-white/[0.06] p-8 backdrop-blur">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/40">Nomor Registrasi</p>
            <p className="stat-number mt-2 text-2xl font-extrabold tracking-tight text-gold">{regNo}</p>
            <div className="mt-4">
              <Badge tone="gold">Status: Menunggu Verifikasi</Badge>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button to="/" variant="outlineLight">Kembali ke Beranda</Button>
            <Button to="/login" variant="gold" className="text-ink">Cek Status Registrasi</Button>
          </div>
          <p className="mt-6 text-[11px] font-semibold text-white/30">⚠ Prototype demo — data tidak dikirim ke server.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface pb-24 pt-32">
      <div className="container-ik max-w-3xl">
        <div className="text-center">
          <p className="eyebrow justify-center">Registrasi Anggota Baru</p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Daftar Menjadi Anggota IKSPI</h1>
          <p className="mt-3 text-sm text-ink/55">Lengkapi data secara bertahap. Butuh ±3 menit. ⚠ Data simulasi demo.</p>
        </div>

        {/* Stepper */}
        <div className="mt-10 flex items-center justify-between gap-1">
          {steps.map((s, i) => (
            <div key={s.key} className="flex flex-1 flex-col items-center gap-2">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110' : 'bg-ink/10 text-ink/40'
              }`}>
                {i < step ? <CheckCircle2 className="h-4.5 w-4.5 h-[18px] w-[18px]" /> : <s.icon className="h-4 w-4" />}
              </div>
              <span className={`hidden text-[10px] font-extrabold uppercase tracking-wider sm:block ${i <= step ? 'text-ink' : 'text-ink/35'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/10">
          <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${((step + 1) / 5) * 100}%` }} />
        </div>

        {/* Step content */}
        <div className="card-ik mt-8 p-8">
          {step === 0 && (
            <div className="grid gap-5 sm:grid-cols-2">
              {field('Nama Lengkap', data.nama, (v) => set('nama', v), 'Sesuai identitas')}
              {field('NIK', data.nik, (v) => set('nik', v), '16 digit', 'number')}
              {field('Tempat Lahir', data.tempatLahir, (v) => set('tempatLahir', v))}
              {field('Tanggal Lahir', data.tanggalLahir, (v) => set('tanggalLahir', v), '', 'date')}
              {select('Jenis Kelamin', data.jenisKelamin, (v) => set('jenisKelamin', v), ['Laki-laki', 'Perempuan'])}
              {select('Agama', data.agama, (v) => set('agama', v), ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'])}
            </div>
          )}
          {step === 1 && (
            <div className="grid gap-5 sm:grid-cols-2">
              {field('Alamat Lengkap', data.alamat, (v) => set('alamat', v), 'Jalan, nomor rumah…')}
              {field('RT / RW', data.rtRw, (v) => set('rtRw', v), '000/000')}
              {field('Kelurahan / Desa', data.kelurahan, (v) => set('kelurahan', v))}
              {field('Kecamatan', data.kecamatan, (v) => set('kecamatan', v))}
              {field('Kode Pos', data.kodePos, (v) => set('kodePos', v), '5 digit', 'number')}
            </div>
          )}
          {step === 2 && (
            <div className="grid gap-5 sm:grid-cols-2">
              {select('Provinsi', data.provinsi, (v) => { set('provinsi', v); set('cabang', ''); set('ranting', '') }, provinces.map((p) => p.name))}
              <div className="hidden sm:block" />
              {select('Cabang', data.cabang, (v) => { set('cabang', v); set('ranting', '') }, [
                province ? `${province.name} — Cabang Utama` : '',
                province ? `${province.name} — Cabang 2` : '',
              ].filter(Boolean))}
              {select('Ranting', data.ranting, (v) => set('ranting', v), [
                data.cabang ? `${data.cabang} — Ranting 1` : '',
                data.cabang ? `${data.cabang} — Ranting 2` : '',
              ].filter(Boolean))}
              {select('Jenjang Awal', data.jenjang, (v) => set('jenjang', v), ['Anggota Muda', 'Anggota Madya'])}
              <p className="text-xs leading-relaxed text-ink/45 sm:col-span-2">
                💡 Pilih wilayah sesuai domisili. Pengurus cabang akan menghubungimu setelah verifikasi.
              </p>
            </div>
          )}
          {step === 3 && (
            <div className="flex flex-col gap-4">
              {[
                { key: 'ktp', label: 'Foto Identitas (KTP/KK)', hint: 'JPG/PNG maks 2MB' },
                { key: 'foto', label: 'Pas Foto 3×4', hint: 'Berlatar polos' },
                { key: 'pernyataan', label: 'Surat Pernyataan (opsional)', hint: 'Untuk calon anggota di bawah umur' },
              ].map((f) => (
                <label key={f.key} className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed p-5 transition ${
                  data[f.key] ? 'border-emerald-400 bg-emerald-50' : 'border-ink/15 hover:border-primary/50'
                }`}>
                  <input type="file" className="hidden" onChange={(e) => set(f.key, e.target.files?.[0] || null)} />
                  <FileUp className={`h-6 w-6 ${data[f.key] ? 'text-emerald-500' : 'text-ink/30'}`} />
                  <div className="flex-1">
                    <p className="text-sm font-extrabold text-ink">{f.label}</p>
                    <p className="text-xs text-ink/45">{data[f.key] ? `✓ ${data[f.key].name}` : f.hint}</p>
                  </div>
                </label>
              ))}
            </div>
          )}
          {step === 4 && (
            <div>
              <h3 className="text-lg font-extrabold text-ink">Periksa kembali data kamu</h3>
              <div className="mt-5 flex flex-col gap-3">
                {[
                  ['Nama Lengkap', data.nama],
                  ['NIK', data.nik],
                  ['Jenis Kelamin', data.jenisKelamin],
                  ['Alamat', [data.alamat, data.kelurahan, data.kecamatan, data.kodePos].filter(Boolean).join(', ')],
                  ['Wilayah', [data.provinsi, data.cabang, data.ranting].filter(Boolean).join(' — ')],
                  ['Jenjang Awal', data.jenjang],
                ].map(([l, v]) => (
                  <div key={l} className="flex items-start justify-between gap-4 border-b border-ink/[0.06] pb-3 last:border-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-ink/45">{l}</span>
                    <span className="text-right text-sm font-bold text-ink">{v || '—'}</span>
                  </div>
                ))}
              </div>
              <label className="mt-6 flex items-start gap-3 rounded-2xl bg-surface p-4">
                <input type="checkbox" className="mt-0.5 h-4 w-4 accent-primary" defaultChecked />
                <span className="text-xs leading-relaxed text-ink/60">
                  Saya menyatakan bahwa data yang saya isi adalah benar dan saya bersedia mengikuti pembinaan serta
                  peraturan organisasi.
                </span>
              </label>
            </div>
          )}

          {/* Nav */}
          <div className="mt-8 flex items-center justify-between border-t border-ink/[0.06] pt-6">
            <Button variant="ghost" onClick={() => (step === 0 ? navigate('/') : setStep(step - 1))} className={step === 0 ? 'invisible' : ''}>
              <ArrowLeft className="h-4 w-4" /> Sebelumnya
            </Button>
            {step < 4 ? (
              <Button onClick={() => setStep(step + 1)} disabled={!canNext} className={canNext ? '' : 'cursor-not-allowed opacity-40'}>
                Lanjut <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={submit} variant="gold" className="text-ink">
                Kirim Registrasi <CheckCircle2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
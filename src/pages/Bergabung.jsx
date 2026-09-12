import { useState } from 'react'
import { ArrowRight, CheckCircle2, ChevronDown, FileText, MapPin, ShieldCheck, UserRound } from 'lucide-react'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import ScrollReveal from '../components/ScrollReveal'

const steps = [
  {
    icon: UserRound,
    title: 'Isi Data Diri',
    desc: 'Lengkapi formulir registrasi online: data diri, alamat, dan wilayah tempat tinggal.',
  },
  {
    icon: MapPin,
    title: 'Pilih Wilayah',
    desc: 'Tentukan pengurus daerah, cabang, dan ranting terdekat sesuai domisili.',
  },
  {
    icon: FileText,
    title: 'Unggah Dokumen',
    desc: 'Siapkan dokumen pendukung: identitas, pas foto, dan surat pernyataan (sesuai ketentuan).',
  },
  {
    icon: ShieldCheck,
    title: 'Verifikasi & Aktivasi',
    desc: 'Pengurus cabang memverifikasi data. Setelah disetujui, kamu resmi menjadi anggota.',
  },
]

const faqs = [
  {
    q: 'Apakah ada batasan usia untuk bergabung?',
    a: 'Ketentuan usia mengikuti aturan resmi organisasi yang akan diinformasikan pengurus cabang. [DATA SIMULASI]',
  },
  {
    q: 'Di mana saya bisa berlatih?',
    a: 'Latihan diselenggarakan di ranting dan cabang di seluruh Indonesia. Pilih wilayah terdekat saat registrasi.',
  },
  {
    q: 'Apakah saya harus punya pengalaman bela diri?',
    a: 'Tidak. Pembinaan dimulai dari dasar dan disesuaikan dengan kemampuan setiap anggota.',
  },
  {
    q: 'Berapa biaya untuk bergabung?',
    a: 'Biaya mengikuti ketentuan resmi cabang masing-masing. [DATA SIMULASI]',
  },
]

export default function Bergabung() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div>
      <section className="relative overflow-hidden bg-ink pb-24 pt-40">
        <div className="absolute inset-0">
          <img src="/images/silat-betawi.jpg" alt="Bergabung IKSPI" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-ink" />
        </div>
        <div className="container-ik relative">
          <ScrollReveal>
            <p className="eyebrow text-gold">Keanggotaan</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
              Cara Bergabung dengan <span className="text-primary">IKSPI</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
              Bergabung kini lebih mudah — pendaftaran dilakukan secara digital, diverifikasi oleh pengurus cabang, dan
              setiap anggota mendapatkan identitas digital.
            </p>
            <div className="mt-8">
              <Button to="/registrasi" size="lg">
                Daftar Sekarang <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Steps */}
      <section className="section-pad bg-surface">
        <div className="container-ik">
          <SectionHeader eyebrow="Proses" title="Empat Langkah Menjadi Anggota" align="center" />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 100}>
                <div className="card-ik relative h-full p-7">
                  <span className="absolute right-6 top-5 text-5xl font-extrabold text-ink/[0.06]">0{i + 1}</span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/25">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold tracking-tight text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/55">{s.desc}</p>
                  {i < steps.length - 1 && (
                    <ArrowRight className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-ink/20 lg:block" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="section-pad bg-white">
        <div className="container-ik grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Persyaratan"
              title="Apa yang Perlu Disiapkan?"
              description="Persyaratan umum pendaftaran anggota baru. Detail lengkap akan dikonfirmasi pengurus cabang."
            />
            <ScrollReveal delay={150}>
              <ul className="mt-8 flex flex-col gap-4">
                {[
                  'Fotokopi identitas diri (KTP/KK bagi dewasa, akta kelahiran bagi anak)',
                  'Pas foto terbaru berlatar polos',
                  'Surat pernyataan orang tua/wali bagi calon anggota di bawah umur',
                  'Menentukan wilayah cabang/ranting terdekat dengan domisili',
                ].map((r) => (
                  <li key={r} className="flex items-start gap-3 text-sm font-medium leading-relaxed text-ink/70">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" /> {r}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={200}>
            <div className="relative overflow-hidden rounded-3xl bg-ink shadow-lift">
              <div className="bg-grid absolute inset-0" />
              <div className="relative p-10">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-gold">Yang kamu dapatkan</p>
                <div className="mt-6 flex flex-col gap-5">
                  {[
                    'Nomor anggota resmi organisasi',
                    'Kartu anggota digital dengan QR verifikasi',
                    'Akses ke direktori dan komunitas anggota',
                    'Program pembinaan dan kenaikan tingkat',
                  ].map((b) => (
                    <div key={b} className="flex items-center gap-3 rounded-2xl bg-white/[0.07] p-4">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-gold" />
                      <p className="text-sm font-bold text-white">{b}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-surface">
        <div className="container-ik max-w-3xl">
          <SectionHeader eyebrow="FAQ" title="Pertanyaan yang Sering Diajukan" align="center" />
          <div className="mt-10 flex flex-col gap-3">
            {faqs.map((f, i) => (
              <ScrollReveal key={f.q} delay={i * 60}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className={`card-ik w-full p-6 text-left transition ${openFaq === i ? 'shadow-lift' : ''}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-extrabold text-ink">{f.q}</p>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </div>
                  {openFaq === i && <p className="mt-3 text-sm leading-relaxed text-ink/60">{f.a}</p>}
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-primary py-20">
        <div className="container-ik relative text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Siap memulai perjalanan?</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/registrasi" size="lg" variant="gold" className="text-ink">
              Daftar Menjadi Anggota <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
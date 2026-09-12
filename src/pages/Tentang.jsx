import { ArrowRight, HeartHandshake, BookOpen, Users2, Sparkles } from 'lucide-react'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import ScrollReveal from '../components/ScrollReveal'
import MemberAvatar from '../components/MemberAvatar'
import Badge from '../components/Badge'
import { figures, orgStats } from '../data'
import { fmtCompact } from '../lib/utils'

export default function Tentang() {
  return (
    <div>
      {/* Page hero */}
      <section className="relative overflow-hidden bg-ink pb-24 pt-40">
        <div className="absolute inset-0">
          <img src="/images/silat-nusantara.jpg" alt="IKSPI" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-ink" />
        </div>
        <div className="container-ik relative">
          <ScrollReveal>
            <p className="eyebrow text-gold">Tentang IKSPI</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
              Lebih dari Sekadar <span className="text-primary">Bela Diri</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
              Organisasi pencak silat yang tumbuh menjadi keluarga besar — tempat belajar ilmu, membentuk karakter, dan
              mengabdi untuk masyarakat.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="section-pad bg-surface">
        <div className="container-ik grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Perjalanan"
              title="Dari Sebuah Tekad, Tumbuh Sebuah Keluarga"
              description="Sejarah panjang organisasi dibangun dari semangat melestarikan budaya, membina generasi, dan menjaga nilai persaudaraan. [DATA SIMULASI]"
            />
            <ScrollReveal delay={150}>
              <div className="prose-ik mt-6 text-[15px]">
                <p>
                  IKSPI Kera Sakti tumbuh dari generasi ke generasi — dari latihan sederhana di satu daerah, hingga
                  tersebar di seluruh Indonesia dengan puluhan ribu anggota aktif. Yang konsisten dari waktu ke waktu
                  bukan hanya ilmu bela dirinya, tetapi <strong>nilai yang dibawa setiap anggota</strong>.
                </p>
                <p>
                  Hari ini, organisasi melangkah ke era digital. <strong>IKSPI DIGITAL</strong> adalah rumah digital
                  resmi: identitas digital anggota, database organisasi, dan pusat informasi — agar organisasi semakin
                  transparan, terstruktur, dan siap menghadapi masa depan.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={250}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button to="/sejarah">Lihat Perjalanan Sejarah <ArrowRight className="h-4 w-4" /></Button>
                <Button to="/nilai" variant="dark">Nilai & Filosofi</Button>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={200}>
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-3xl shadow-lift">
                <img src="/images/hero-anggota.png" alt="Anggota IKSPI" className="aspect-[16/10] w-full object-cover" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  [fmtCompact(orgStats.members), 'Anggota'],
                  [orgStats.provinces, 'Provinsi'],
                  [orgStats.branches, 'Cabang'],
                ].map(([v, l]) => (
                  <div key={l} className="rounded-2xl bg-ink p-4 text-center text-white">
                    <p className="stat-number text-xl font-extrabold text-gold">{v}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/50">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="section-pad bg-white">
        <div className="container-ik">
          <SectionHeader
            eyebrow="Pilar Organisasi"
            title="Apa yang Menopang IKSPI?"
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              [HeartHandshake, 'Persaudaraan', 'Keluarga besar yang saling menjaga — satu persaudaraan di atas segalanya.'],
              [BookOpen, 'Ilmu & Budaya', 'Melestarikan ilmu bela diri dan seni budaya warisan Nusantara.'],
              [Users2, 'Pembinaan', 'Kaderisasi generasi muda yang berkarakter, terampil, dan bertanggung jawab.'],
              [Sparkles, 'Pengabdian', 'Bakti kepada masyarakat melalui kegiatan sosial dan kemanusiaan.'],
            ].map(([Icon, t, d], i) => (
              <ScrollReveal key={t} delay={i * 90}>
                <div className="card-ik h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold tracking-tight text-ink">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/55">{d}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Figures */}
      <section className="section-pad bg-surface">
        <div className="container-ik">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              eyebrow="Tokoh"
              title="Tokoh & Mereka yang Menggerakkan Perjalanan"
              description="Di balik organisasi ada manusia — tokoh yang menjaga nilai dan menggerakkan perjalanan."
            />
            <ScrollReveal>
              <Badge tone="gold">⚠ DATA SIMULASI</Badge>
            </ScrollReveal>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {figures.map((f, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="card-ik flex h-full flex-col gap-5 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-ink text-xl font-extrabold text-white">
                      {f.initials}
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold tracking-tight text-ink">{f.name}</h3>
                      <p className="mt-0.5 text-xs font-bold text-primary">{f.role}</p>
                      <p className="text-[11px] font-semibold text-ink/40">{f.period}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-ink/60">{f.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <p className="mt-6 text-center text-[11px] font-semibold text-ink/35">
              Nama, jabatan, dan periode pada kartu di atas adalah DATA SIMULASI dan menunggu data resmi organisasi.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-ink py-16">
        <div className="container-ik flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-white">
            Ingin mengenal lebih jauh perjalanan dan nilainya?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/sejarah">Jelajahi Sejarah</Button>
            <Button to="/nilai" variant="outlineLight">Nilai & Filosofi</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
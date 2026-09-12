import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  Handshake,
  ShieldCheck,
  Flame,
  Sprout,
  Scale,
  Compass,
  Users,
  Building2,
  Network,
  Landmark,
} from "lucide-react";
import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";
import ScrollReveal from "../components/ScrollReveal";
import Stats from "../components/Stats";
import NewsCard from "../components/NewsCard";
import EventCard from "../components/EventCard";
import IndonesiaMap from "../components/IndonesiaMap";
import { orgStats, values, activities, news, events, tickerItems, provinces } from "../data";
import { fmt, fmtCompact } from "../lib/utils";

const valueIcons = {
  handshake: Handshake,
  shield: ShieldCheck,
  flame: Flame,
  sprout: Sprout,
  scale: Scale,
  compass: Compass,
};

export default function Home() {
  const featuredNews = news.find((n) => n.featured) || news[0];
  const latestNews = news.filter((n) => n.id !== featuredNews.id).slice(0, 3);
  const upcomingEvents = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <img
            src="images/hero.webp"
            alt="Anggota IKSPI Kera Sakti"
            className="relative left-10 md:left-24 h-full w-full object-cover object-[center_25%] scale-[0.7] origin-right opacity-90 grayscale"
            // className="relative left-10 md:left-24 h-full w-full object-[center_5%] scale-60  object-cover opacity-90"
          />
          {/* <img
            // src="images/hero-anggota.png"
            src="images/hero.webp"
            alt="Anggota IKSPI Kera Sakti"
            className="h-full w-full object-cover object-[70%_20%] opacity-70"
          /> */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/30 to-black/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
        </div>
        <div className="bg-grid absolute inset-0 opacity-40" />

        <div className="container-ik relative z-10 pt-28 pb-24">
          <ScrollReveal>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/80">
                Platform Resmi IKSPI Kera Sakti
              </span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h1 className="mt-8 max-w-4xl text-4xl font-extrabold leading-[1.02] tracking-tightest text-white sm:text-6xl md:text-7xl lg:text-[70px]">
              SATU PERSAUDARAAN
              <br />
              SATU KELUARGA
              <br />
              <span className="bg-gradient-to-r from-red-600 via-red-500 to-amber-400 bg-clip-text text-transparent">
                SATU EKOSISTEM
              </span>
              {/* <span className="text-primary">SATU EKOSISTEM</span> */}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={240}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              Mengenal lebih dekat perjalanan, nilai, aktivitas, dan keluarga besar IKSPI Kera Sakti.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={360}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button to="/tentang" size="lg">
                Jelajahi IKSPI <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/registrasi" size="lg" variant="outlineLight">
                Bergabung dengan IKSPI
              </Button>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={500}>
            <div className="mt-16 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                { v: orgStats.members, l: "Anggota" },
                { v: orgStats.provinces, l: "Provinsi" },
                { v: orgStats.branches, l: "Cabang" },
                { v: orgStats.rantings, l: "Ranting" },
              ].map((s) => (
                <div key={s.l} className="border-l-2 border-primary/60 pl-4">
                  <p className="stat-number text-2xl font-extrabold text-white md:text-3xl">{fmtCompact(s.v)}</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-white/45">{s.l}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[11px] font-semibold text-white/35">
              * Angka simulasi untuk prototype — bukan data resmi.
            </p>
          </ScrollReveal>
        </div>

        <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-white/50 md:block">
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </div>
      </section>

      {/* ============ TICKER ============ */}
      <div className="overflow-hidden border-y border-white/10 bg-ink py-4">
        <div className="ticker-track flex w-max items-center gap-10">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap">
              <span className="text-sm font-extrabold uppercase tracking-[0.18em] text-white/70">{t}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
          ))}
        </div>
      </div>

      {/* ============ WHO WE ARE ============ */}
      <section className="section-pad bg-surface">
        <div className="container-ik grid items-center gap-14 lg:grid-cols-2">
          <ScrollReveal>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-lift">
                <img
                  src="images/aktivitas-latihan.jpg"
                  alt="Latihan IKSPI"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-ink p-6 text-white shadow-lift sm:block md:-right-8">
                <p className="stat-number text-3xl font-extrabold text-gold">{fmtCompact(orgStats.members)}</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-white/50">Anggota [Simulasi]</p>
              </div>
            </div>
          </ScrollReveal>
          <div>
            <SectionHeader
              eyebrow="Who We Are"
              title="Lebih dari Sekadar Bela Diri"
              description="IKSPI Kera Sakti adalah organisasi pencak silat yang tumbuh menjadi keluarga besar — membina generasi muda melalui latihan, pendidikan karakter, nilai persaudaraan, dan pengabdian kepada masyarakat."
            />
            <ScrollReveal delay={150}>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  [
                    "Pendidikan Karakter",
                    "Disiplin, tanggung jawab, dan pengendalian diri ditanamkan sejak latihan pertama.",
                  ],
                  ["Persaudaraan", "Jaringan keluarga besar yang saling menjaga di seluruh Indonesia."],
                  ["Aktivitas Nyata", "Latihan, ujian tingkat, kompetisi, sosial, hingga budaya."],
                  ["Pembinaan Generasi", "Kaderisasi berkelanjutan dari generasi ke generasi."],
                ].map(([t, d]) => (
                  <div key={t} className="rounded-2xl border border-ink/[0.06] bg-white p-5 shadow-card">
                    <p className="text-sm font-extrabold text-ink">{t}</p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink/55">{d}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={250}>
              <div className="mt-8">
                <Button to="/tentang" variant="dark">
                  Kenali IKSPI Lebih Dekat <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="bg-ink py-20">
        <div className="container-ik">
          <SectionHeader
            eyebrow="Skala Organisasi"
            title="Sebuah Keluarga yang Tersebar di Nusantara"
            description="Ribuan ranting, ratusan cabang, di 34 provinsi. Ini gambaran ekosistem organisasi — data simulasi untuk prototype."
            light
          />
          <ScrollReveal delay={150}>
            <div className="mt-10">
              <Stats
                dark
                items={[
                  { value: orgStats.members, label: "Anggota", accent: true },
                  { value: orgStats.provinces, label: "Provinsi" },
                  { value: orgStats.branches, label: "Cabang" },
                  { value: orgStats.rantings, label: "Ranting" },
                ]}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ VALUES ============ */}
      <section className="section-pad bg-surface">
        <div className="container-ik">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              eyebrow="Nilai & Filosofi"
              title="Nilai yang Dibawa Setiap Anggota"
              description="Bela diri dimulai dari dalam diri. Enam nilai ini menjadi fondasi setiap anggota IKSPI."
            />
            <ScrollReveal>
              <Link to="/nilai" className="group flex items-center gap-2 text-sm font-bold text-primary">
                Lihat Nilai & Filosofi <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </ScrollReveal>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => {
              const Icon = valueIcons[v.icon] || Compass;
              return (
                <ScrollReveal key={v.title} delay={i * 80}>
                  <Link
                    to="/nilai"
                    className="group card-ik flex h-full flex-col gap-4 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-5.5 w-5.5 h-[22px] w-[22px]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold tracking-tight text-ink">{v.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink/55">{v.description}</p>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ WHAT WE DO ============ */}
      <section className="section-pad bg-white">
        <div className="container-ik">
          <SectionHeader
            eyebrow="What We Do"
            title="Apa yang Dilakukan IKSPI?"
            description="Aktivitas yang hidup di setiap cabang dan ranting — dari latihan rutin hingga pengabdian masyarakat."
            align="center"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {activities.slice(0, 6).map((a, i) => (
              <ScrollReveal key={a.title} delay={i * 70}>
                <Link to="/kegiatan" className="group relative block overflow-hidden rounded-3xl">
                  <img
                    src={a.image}
                    alt={a.title}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-gold">{a.category}</p>
                    <h3 className="mt-1.5 text-xl font-extrabold tracking-tight text-white">{a.title}</h3>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/65">{a.description}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY JOIN ============ */}
      <section className="relative overflow-hidden bg-ink py-24">
        <div className="bg-grid absolute inset-0" />
        <div className="container-ik relative">
          <SectionHeader
            eyebrow="Keanggotaan"
            title="Mengapa Menjadi Bagian dari IKSPI?"
            description="Bukan hanya belajar bela diri — menjadi bagian dari keluarga besar, pembentukan karakter, dan kesempatan berkembang."
            light
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {[
              [Handshake, "Persaudaraan", "Komunitas yang luas dan saling menjaga."],
              [ShieldCheck, "Karakter", "Disiplin, tanggung jawab, pengendalian diri."],
              [Flame, "Pengembangan Diri", "Belajar dan berkembang lewat latihan & pengalaman."],
              [Users, "Komunitas", "Terhubung dengan anggota di berbagai wilayah."],
              [Landmark, "Pengalaman", "Kegiatan, organisasi, prestasi, dan kesempatan."],
            ].map(([Icon, t, d], i) => (
              <ScrollReveal key={t} delay={i * 80} className="bg-ink">
                <div className="flex h-full flex-col gap-3 p-6 transition-colors hover:bg-ink-soft">
                  <Icon className="h-6 w-6 text-gold" />
                  <p className="text-sm font-extrabold text-white">{t}</p>
                  <p className="text-xs leading-relaxed text-white/55">{d}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={200}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button to="/registrasi" size="lg">
                Saya Ingin Bergabung <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/bergabung" variant="outlineLight" size="lg">
                Pelajari Cara Bergabung
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ MAP ============ */}
      <section className="section-pad bg-surface">
        <div className="container-ik">
          <SectionHeader
            eyebrow="Sebaran Organisasi"
            title="Terhubung di Seluruh Indonesia"
            description="Jelajahi peta interaktif sebaran organisasi. Klik provinsi untuk melihat detailnya."
          />
          <ScrollReveal delay={120}>
            <div className="mt-10">
              <IndonesiaMap onSelect={(name) => {}} />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-8">
                {[
                  [Building2, `${orgStats.provinces} Provinsi`],
                  [Network, `${orgStats.branches} Cabang`],
                  [Users, `${orgStats.rantings} Ranting`],
                ].map(([Icon, t]) => (
                  <div key={t} className="flex items-center gap-2.5 text-sm font-bold text-ink/70">
                    <Icon className="h-4.5 w-4.5 h-[18px] w-[18px] text-primary" /> {t}
                  </div>
                ))}
              </div>
              <Link to="/sebaran" className="group flex items-center gap-2 text-sm font-bold text-primary">
                Jelajahi Sebaran IKSPI <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ NEWS ============ */}
      <section className="section-pad bg-white">
        <div className="container-ik">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              eyebrow="Information Center"
              title="Berita & Informasi Resmi"
              description="Pusat informasi resmi organisasi — terstruktur, permanen, dan dapat dicari."
            />
            <ScrollReveal>
              <Link to="/berita" className="group flex items-center gap-2 text-sm font-bold text-primary">
                Lihat Semua Berita <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </ScrollReveal>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <ScrollReveal>
              <NewsCard item={featuredNews} featured className="h-full" />
            </ScrollReveal>
            <div className="grid gap-6 sm:grid-cols-2">
              {latestNews.slice(0, 2).map((n, i) => (
                <ScrollReveal key={n.id} delay={i * 100}>
                  <NewsCard item={n} className="h-full" />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ EVENTS ============ */}
      <section className="section-pad bg-surface">
        <div className="container-ik">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              eyebrow="Agenda"
              title="Aktivitas & Kegiatan Terdekat"
              description="Agenda latihan bersama, ujian, kejuaraan, hingga bakti sosial di seluruh Indonesia."
            />
            <ScrollReveal>
              <Link to="/kegiatan" className="group flex items-center gap-2 text-sm font-bold text-primary">
                Lihat Semua Kegiatan <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </ScrollReveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {upcomingEvents.map((e, i) => (
              <ScrollReveal key={e.id} delay={i * 100}>
                <EventCard event={e} className="h-full" />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden bg-primary py-24">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-black/20 blur-3xl" />
        <div className="container-ik relative text-center">
          <ScrollReveal>
            <p className="eyebrow justify-center text-white">Keanggotaan</p>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
              Siap Menjadi Bagian dari Keluarga Besar IKSPI?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={240}>
            <p className="mx-auto mt-5 max-w-xl text-white/75">
              Pendaftaran anggota baru dilakukan secara digital. Lengkapi data, verifikasi, dan mulailah perjalananmu.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={360}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button to="/registrasi" size="lg" variant="gold" className="text-ink">
                Daftar Menjadi Anggota
              </Button>
              <Button to="/bergabung" size="lg" variant="outlineLight">
                Pelajari Cara Bergabung <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

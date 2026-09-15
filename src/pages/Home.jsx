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
import { orgStats, values, activities, news, events, tickerItems } from "../data";
import { fmtCompact, getImg } from "../lib/utils";

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
    <div className="bg-black text-white font-sans selection:bg-red-600 selection:text-white">
      {/* ============ HERO SECTION ============ */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-black pt-20">
        <div className="absolute inset-0 z-0">
          {/* <img
            src="images/hero-anggota.webp"
            alt="Anggota IKSPI Kera Sakti"
            className="h-full w-full object-cover object-[center_20%] opacity-40 grayscale contrast-125"
          /> */}

          <img
            // src="images/hero.webp"
            src={`${import.meta.env.BASE_URL}images/hero.webp`}
            alt="Anggota IKSPI Kera Sakti"
            className="relative left-10 md:left-24 h-full w-full object-cover object-[center_25%] scale-[0.6] origin-right opacity-90 grayscale"
            // className="relative left-10 md:left-24 h-full w-full object-[center_5%] scale-60  object-cover opacity-90"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/30 to-black/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />

          {/* <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" /> */}
        </div>

        <div className="container-ik relative z-10 py-20">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2.5 rounded-none border-l-2 border-red-600 bg-white/5 px-3.5 py-1.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-ping" />
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-gray-300">
                Platform Resmi IKSPI Kera Sakti
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            {/* <h1 className="mt-6 max-w-5xl text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl"> */}
            <h1 className="mt-6 max-w-5xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">
              SATU PERSAUDARAAN
              <br />
              SATU KELUARGA
              <br />
              <span className="bg-gradient-to-r from-red-600 via-red-500 to-amber-400 bg-clip-text text-transparent">
                SATU EKOSISTEM
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg">
              Mengenal lebih dekat perjalanan, nilai, aktivitas, dan keluarga besar IKSPI Kera Sakti.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                to="/tentang"
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white font-bold tracking-wider uppercase rounded-none px-8"
              >
                Jelajahi IKSPI <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
              <Button
                to="/registrasi"
                size="lg"
                variant="outlineLight"
                className="border-gray-700 hover:bg-white/10 text-white font-bold tracking-wider uppercase rounded-none px-8"
              >
                Bergabung
              </Button>
            </div>
          </ScrollReveal>

          {/* Stats Highlight Bar */}
          <ScrollReveal delay={400}>
            <div className="mt-16 grid max-w-3xl grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
              {[
                { v: orgStats.members, l: "Anggota" },
                { v: orgStats.provinces, l: "Provinsi" },
                { v: orgStats.branches, l: "Cabang" },
                { v: orgStats.rantings, l: "Ranting" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="text-3xl font-black text-white tracking-tight">{fmtCompact(s.v)}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-red-500">{s.l}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ TICKER RUNNING TEXT ============ */}
      <div className="border-y border-white/10 bg-zinc-950 py-3.5">
        <div className="ticker-track flex w-max items-center gap-10">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">{t}</span>
              <span className="h-1.5 w-1.5 bg-red-600" />
            </span>
          ))}
        </div>
      </div>

      {/* ============ ABOUT SECTION ============ */}
      <section className="py-24 bg-zinc-950">
        <div className="container-ik grid items-center gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <div className="relative border border-white/10 bg-black p-2">
              <img
                src={getImg("/images/loncat-ikspi.webp")}
                alt="Latihan IKSPI"
                className="aspect-[4/3] w-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition duration-500"
              />
              <div className="absolute bottom-4 right-4 bg-red-600 p-4 text-white font-black">
                <p className="text-2xl tracking-tight">{fmtCompact(orgStats.members)}</p>
                <p className="text-[9px] uppercase tracking-widest text-white/80">Anggota Aktif</p>
              </div>
            </div>
          </ScrollReveal>

          <div>
            <SectionHeader
              eyebrow="TENTANG KAMI"
              title="LEBIH DARI SEKADAR BELA DIRI"
              description="IKSPI Kera Sakti membina generasi muda melalui fisik, mental, pendidikan karakter, dan rasa persaudaraan yang erat."
              light
            />
            <ScrollReveal delay={100}>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  ["Pendidikan Karakter", "Disiplin, tanggung jawab, dan pengendalian diri."],
                  ["Persaudaraan", "Jaringan keluarga besar yang saling menjaga."],
                  ["Aktivitas Nyata", "Latihan rutin, ujian tingkat, dan pengabdian."],
                  ["Pembinaan Generasi", "Kaderisasi berkelanjutan dari waktu ke waktu."],
                ].map(([t, d]) => (
                  <div key={t} className="border-l-2 border-red-600 bg-zinc-900/50 p-4">
                    <p className="text-sm font-bold text-white uppercase tracking-wider">{t}</p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-400">{d}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============ VALUES SECTION ============ */}
      <section className="py-24 bg-black border-t border-white/10">
        <div className="container-ik">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              eyebrow="FILOSOFI"
              title="FONDASI SETIAP ANGGOTA"
              description="Nilai-nilai utama yang memandu setiap langkah anggota IKSPI Kera Sakti."
              light
            />
            <Link
              to="/nilai"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-400"
            >
              Lihat Semua Filosofi <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => {
              const Icon = valueIcons[v.icon] || Compass;
              return (
                <ScrollReveal key={v.title} delay={i * 60}>
                  <Link
                    to="/nilai"
                    className="group block h-full border border-white/10 bg-zinc-950 p-6 hover:border-red-600 transition duration-300"
                  >
                    <Icon className="h-7 w-7 text-red-600 mb-4" />
                    <h3 className="text-lg font-bold uppercase tracking-wider text-white group-hover:text-red-500 transition">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-400">{v.description}</p>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ MAP / WILAYAH SECTION ============ */}
      <section className="py-24 bg-zinc-950 border-t border-white/10">
        <div className="container-ik">
          <SectionHeader
            eyebrow="SEBARAN WILAYAH"
            title="TERHUBUNG DI SELURUH NUSANTARA"
            // titleClassName="whitespace-nowrap"
            description="Jaringan organisasi yang tersebar luas di seluruh wilayah Indonesia."
            light
          />
          <ScrollReveal delay={100}>
            <div className="mt-10 border border-white/10 bg-black p-4">
              <IndonesiaMap onSelect={() => {}} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ CALL TO ACTION ============ */}
      <section className="relative overflow-hidden bg-red-600 py-20 text-white">
        <div className="container-ik relative z-10 text-center">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-black">Pendaftaran Anggota</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black uppercase tracking-tight sm:text-5xl">
            SIAP MENJADI BAGIAN DARI KELUARGA BESAR IKSPI?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-white/90">
            Lengkapi data, ikuti proses verifikasi, dan mulailah perjalanan latihanmu.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button
              to="/registrasi"
              size="lg"
              className="bg-black hover:bg-zinc-900 text-white font-bold uppercase tracking-wider rounded-none px-8"
            >
              Daftar Sekarang
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

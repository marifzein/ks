import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Search } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import ScrollReveal from "../components/ScrollReveal";
import NewsCard from "../components/NewsCard";
import Badge from "../components/Badge";
import { news, agenda } from "../data";
import { fmtDate } from "../lib/utils";

const cats = ["Semua", "Berita", "Pengumuman", "Kegiatan", "Organisasi", "Prestasi"];

export default function Berita() {
  const [cat, setCat] = useState("Semua");
  const [q, setQ] = useState("");

  const filtered = news.filter((n) => {
    const okCat = cat === "Semua" || n.category === cat;
    const okQ = !q || (n.title + n.excerpt).toLowerCase().includes(q.toLowerCase());
    return okCat && okQ;
  });

  const featured = news.find((n) => n.featured);
  const rest = filtered.filter((n) => n.id !== featured?.id);

  return (
    <div>
      <section className="relative overflow-hidden bg-ink pb-24 pt-40">
        <div className="absolute inset-0">
          <img src="images/hero-anggota.png" alt="Berita IKSPI" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-ink" />
        </div>
        <div className="container-ik relative">
          <ScrollReveal>
            <p className="eyebrow text-gold">Information Center</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
              Sumber Informasi <span className="text-primary">Resmi & Permanen</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
              Berita, pengumuman, agenda, dan kegiatan organisasi — terstruktur, dapat dicari, dan tidak hanya
              mengandalkan media sosial.
            </p>
            <div className="mt-8 flex max-w-xl items-center gap-3 rounded-full bg-white/[0.08] px-5 py-3.5 backdrop-blur">
              <Search className="h-4.5 w-4.5 h-[18px] w-[18px] text-white/50" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari berita, pengumuman, prestasi…"
                className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-pad bg-surface">
        <div className="container-ik grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-2">
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                    cat === c
                      ? "bg-ink text-white shadow"
                      : "bg-white text-ink/55 hover:text-ink border border-ink/[0.08]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {featured && (cat === "Semua" || featured.category === cat) && (
              <ScrollReveal delay={80}>
                <div className="mt-8">
                  <NewsCard item={featured} featured className="h-full" />
                </div>
              </ScrollReveal>
            )}

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {rest.map((n, i) => (
                <ScrollReveal key={n.id} delay={(i % 2) * 90}>
                  <NewsCard item={n} className="h-full" />
                </ScrollReveal>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="card-ik mt-10 p-14 text-center">
                <p className="font-bold text-ink/60">Tidak ada hasil untuk pencarian ini.</p>
              </div>
            )}
          </div>

          {/* Sidebar: agenda */}
          <aside>
            <ScrollReveal>
              <div className="card-ik sticky top-24 p-7">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <h3 className="text-base font-extrabold tracking-tight text-ink">Agenda Terdekat</h3>
                </div>
                <div className="mt-5 flex flex-col gap-4">
                  {agenda.map((a) => (
                    <div key={a.title} className="flex gap-4 border-b border-ink/[0.06] pb-4 last:border-0 last:pb-0">
                      <div className="flex w-12 shrink-0 flex-col items-center rounded-xl bg-ink py-2 text-white">
                        <span className="text-lg font-extrabold leading-none">
                          {new Date(a.date + "T00:00:00").getDate()}
                        </span>
                        <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-white/60">
                          {new Date(a.date + "T00:00:00").toLocaleDateString("id-ID", { month: "short" })}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-extrabold leading-snug text-ink">{a.title}</p>
                        <Badge tone="gray" className="mt-1.5">
                          {a.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/kegiatan" className="group mt-6 flex items-center gap-2 text-sm font-bold text-primary">
                  Lihat Semua Kegiatan <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
                <p className="mt-4 text-[10px] font-semibold text-ink/35">
                  Tanggal ditampilkan: {fmtDate(agenda[0].date)} — {fmtDate(agenda[agenda.length - 1].date)} · Data
                  simulasi
                </p>
              </div>
            </ScrollReveal>
          </aside>
        </div>
      </section>
    </div>
  );
}

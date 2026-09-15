import { useState } from "react";
import { CalendarDays, Filter } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import ScrollReveal from "../components/ScrollReveal";
import EventCard from "../components/EventCard";
import Badge from "../components/Badge";
import { events, activities } from "../data";

const categories = ["Semua", "Latihan Bersama", "Ujian", "Kejuaraan", "Sosial", "Seminar", "Budaya"];

export default function Kegiatan() {
  const [cat, setCat] = useState("Semua");
  const filtered = cat === "Semua" ? events : events.filter((e) => e.category === cat);

  return (
    <div>
      <section className="relative overflow-hidden bg-ink pb-24 pt-40">
        <div className="absolute inset-0">
          <img
            src={`${import.meta.env.BASE_URL}images/silat-nusantara.webp`}
            alt="Kegiatan IKSPI"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-ink" />
        </div>
        <div className="container-ik relative">
          <ScrollReveal>
            <p className="eyebrow text-gold">Aktivitas & Kegiatan</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
              Hidup dalam <span className="text-primary">Aktivitas Nyata</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
              Latihan, ujian, kejuaraan, bakti sosial, hingga pagelaran budaya — denyut kehidupan organisasi di setiap
              cabang dan ranting.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* What we do strip */}
      <section className="border-b border-ink/[0.06] bg-white py-10">
        <div className="container-ik">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-ink/45">
              <Filter className="h-4 w-4" /> Bidang Kegiatan
            </span>
            {activities.map((a) => (
              <span
                key={a.title}
                className="rounded-full border border-ink/10 px-3.5 py-1.5 text-xs font-bold text-ink/60"
              >
                {a.title}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-surface">
        <div className="container-ik">
          <SectionHeader
            eyebrow="Agenda"
            title="Kegiatan Terjadwal"
            description="Agenda resmi organisasi. Seluruh jadwal adalah DATA SIMULASI untuk prototype."
          />
          <ScrollReveal delay={100}>
            <div className="mt-8 flex flex-wrap gap-2">
              {categories.map((c) => (
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
          </ScrollReveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((e, i) => (
              <ScrollReveal key={e.id} delay={(i % 3) * 90}>
                <EventCard event={e} className="h-full" />
              </ScrollReveal>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="card-ik mt-10 flex flex-col items-center gap-3 p-14 text-center">
              <CalendarDays className="h-8 w-8 text-ink/25" />
              <p className="font-bold text-ink/60">Belum ada kegiatan pada kategori ini.</p>
            </div>
          )}
          <div className="mt-10 flex justify-center">
            <Badge tone="gold">⚠ Jadwal kegiatan adalah DATA SIMULASI</Badge>
          </div>
        </div>
      </section>
    </div>
  );
}

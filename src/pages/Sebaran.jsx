import { useState } from "react";
import { ArrowRight, Building2, ChevronDown, ChevronRight, Landmark, Network, Users } from "lucide-react";
import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";
import ScrollReveal from "../components/ScrollReveal";
import IndonesiaMap from "../components/IndonesiaMap";
import Badge from "../components/Badge";
import { provinces, orgStats, organizationTree } from "../data";
import { fmt } from "../lib/utils";

function TreeNode({ node, depth = 0 }) {
  const [open, setOpen] = useState(depth < 1);
  const hasChildren = node.children?.length > 0;
  const typeColor = {
    Pusat: "bg-primary text-white",
    Pengda: "bg-ink text-white",
    Cabang: "bg-blue-500 text-white",
    Ranting: "bg-white text-ink border border-ink/10",
  }[node.type];

  return (
    <div>
      <div
        className="flex items-center gap-2 rounded-xl px-3 py-2.5 transition hover:bg-ink/[0.04]"
        style={{ marginLeft: depth * 22 }}
      >
        {hasChildren ? (
          <button onClick={() => setOpen(!open)} className="text-ink/40 hover:text-ink" aria-label="Buka/tutup">
            {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        ) : (
          <span className="w-4" />
        )}
        <span className={`chip ${typeColor}`}>{node.type}</span>
        <span className="text-sm font-extrabold text-ink">{node.name}</span>
        {node.detail && (
          <span className="ml-auto hidden text-[11px] font-semibold text-ink/40 sm:block">{node.detail}</span>
        )}
      </div>
      {open && hasChildren && node.children.map((c) => <TreeNode key={c.name} node={c} depth={depth + 1} />)}
    </div>
  );
}

export default function Sebaran() {
  const [selected, setSelected] = useState(null);
  const province = selected ? provinces.find((p) => p.name === selected) : null;
  const topProvinces = [...provinces].sort((a, b) => b.members - a.members).slice(0, 8);
  const maxMembers = topProvinces[0].members;

  return (
    <div>
      <section className="relative overflow-hidden bg-ink pb-24 pt-40">
        <div className="absolute inset-0">
          <img
            src="images/silat-indonesia-2.jpg"
            alt="Sebaran IKSPI"
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-ink" />
        </div>
        <div className="container-ik relative">
          <ScrollReveal>
            <p className="eyebrow text-gold">Sebaran Organisasi</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
              Terhubung di <span className="text-primary">Seluruh Indonesia</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
              Dari Sabang sampai Merauke — puluhan ribu anggota, ratusan cabang, dan ribuan ranting. Jelajahi peta
              interaktif dan struktur organisasi.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-b border-ink/[0.06] bg-white py-10">
        <div className="container-ik grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            [Users, orgStats.members, "Anggota"],
            [Landmark, orgStats.provinces, "Provinsi"],
            [Building2, orgStats.branches, "Cabang"],
            [Network, orgStats.rantings, "Ranting"],
          ].map(([Icon, v, l]) => (
            <div key={l} className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="stat-number text-xl font-extrabold text-ink">{fmt(v)}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-ink/45">{l} · Simulasi</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map + drill down */}
      <section className="section-pad bg-surface">
        <div className="container-ik">
          <SectionHeader
            eyebrow="Peta Interaktif"
            title="Peta Sebaran Anggota per Provinsi"
            description="Arahkan kursor untuk melihat data, klik provinsi untuk detail. Peta disederhanakan untuk prototype."
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <ScrollReveal className="lg:col-span-2">
              <IndonesiaMap onSelect={(name) => setSelected(name)} selectedName={selected} height={520} />
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="card-ik sticky top-24 flex h-full min-h-[520px] flex-col p-7">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-primary">Drill-down</p>
                {province ? (
                  <>
                    <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">{province.name}</h3>
                    <p className="text-sm font-semibold text-ink/45">Ibu kota: {province.capital}</p>
                    <div className="mt-6 flex flex-col gap-3">
                      {[
                        ["Anggota", fmt(province.members)],
                        ["Cabang", province.branches],
                        ["Ranting", province.rantings],
                      ].map(([l, v]) => (
                        <div key={l} className="flex items-center justify-between rounded-2xl bg-surface px-5 py-4">
                          <span className="text-xs font-bold uppercase tracking-wider text-ink/50">{l}</span>
                          <span className="stat-number text-xl font-extrabold text-ink">{v}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-[11px] font-semibold text-ink/35">
                      ⚠ Data simulasi. Alur drill-down lengkap: Provinsi → Kabupaten/Kota → Cabang → Ranting.
                    </p>
                    <button
                      onClick={() => setSelected(null)}
                      className="mt-auto pt-4 text-left text-sm font-bold text-primary hover:underline"
                    >
                      ← Kembali ke peta nasional
                    </button>
                  </>
                ) : (
                  <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
                    <Landmark className="h-10 w-10 text-ink/15" />
                    <p className="max-w-[220px] text-sm font-semibold leading-relaxed text-ink/45">
                      Klik salah satu provinsi pada peta untuk melihat rincian anggota, cabang, dan ranting.
                    </p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Top provinces */}
      <section className="section-pad bg-white">
        <div className="container-ik">
          <SectionHeader
            eyebrow="Perbandingan"
            title="Provinsi dengan Anggota Terbanyak"
            description="Data simulasi untuk memvisualisasikan skala organisasi."
          />
          <div className="mt-10 grid gap-x-12 gap-y-6 md:grid-cols-2">
            {topProvinces.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 60}>
                <div className="group flex items-center gap-4">
                  <span className="w-7 text-right text-lg font-extrabold text-ink/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <p className="text-sm font-extrabold text-ink">{p.name}</p>
                      <p className="stat-number text-sm font-extrabold text-primary">{fmt(p.members)}</p>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/[0.06]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-primary-dark transition-all duration-700"
                        style={{ width: `${(p.members / maxMembers) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Org explorer */}
      <section className="section-pad bg-ink">
        <div className="container-ik">
          <SectionHeader
            eyebrow="Organization Explorer"
            title="Struktur: Pusat → Pengda → Cabang → Ranting"
            description="Jelajahi hierarki organisasi secara interaktif. Struktur ini adalah DATA SIMULASI."
            light
          />
          <ScrollReveal delay={120}>
            <div className="mt-10 rounded-3xl bg-white/95 p-6 shadow-2xl backdrop-blur sm:p-8">
              <div className="flex flex-wrap gap-2 border-b border-ink/[0.06] pb-5">
                {[
                  ["Pusat", "bg-primary text-white"],
                  ["Pengda", "bg-ink text-white"],
                  ["Cabang", "bg-blue-500 text-white"],
                  ["Ranting", "bg-white text-ink border border-ink/10"],
                ].map(([l, c]) => (
                  <span key={l} className={`chip ${c}`}>
                    {l}
                  </span>
                ))}
                <Badge tone="gold" className="ml-auto">
                  DATA SIMULASI
                </Badge>
              </div>
              <div className="pt-5">
                <TreeNode node={organizationTree} />
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button to="/registrasi" variant="gold" className="text-ink">
                Daftar di Cabang Terdekat <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

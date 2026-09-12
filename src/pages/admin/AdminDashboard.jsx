import { Link } from "react-router-dom";
import { ArrowRight, ClipboardCheck, Newspaper, CalendarDays, Users } from "lucide-react";
import { useApp } from "../../context/AppContext";
import Badge from "../../components/Badge";
import { fmt, timeAgo } from "../../lib/utils";

export default function AdminDashboard() {
  const { stats, registrations, members, news, events } = useApp();
  const pending = registrations.filter((r) => r.status === "MENUNGGU");

  const cards = [
    {
      icon: ClipboardCheck,
      label: "Registrasi Menunggu",
      value: fmt(pending.length),
      to: "/admin/registrasi",
      tone: "bg-gold/20 text-[#8a6d00]",
    },
    {
      icon: Users,
      label: "Total Anggota",
      value: fmt(stats.members),
      to: "/admin/anggota",
      tone: "bg-primary/10 text-primary",
    },
    { icon: Newspaper, label: "Berita", value: news.length, to: "/admin/berita", tone: "bg-blue-500/10 text-blue-600" },
    {
      icon: CalendarDays,
      label: "Kegiatan",
      value: events.length,
      to: "/admin/kegiatan",
      tone: "bg-emerald-500/10 text-emerald-600",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Admin Backstage</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Ringkasan</h1>
        <p className="mt-1 text-sm text-ink/50">Kelola anggota, registrasi, dan konten organisasi · </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="card-ik group p-6 transition-all hover:-translate-y-0.5 hover:shadow-lift"
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${c.tone}`}>
              <c.icon className="h-5 w-5" />
            </div>
            <p className="stat-number mt-4 text-3xl font-extrabold tracking-tight text-ink">{c.value}</p>
            <p className="mt-1 text-xs font-extrabold uppercase tracking-wider text-ink/45">{c.label}</p>
            <span className="mt-3 flex items-center gap-1 text-xs font-bold text-primary opacity-0 transition group-hover:opacity-100">
              Kelola <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending registrations */}
        <div className="card-ik p-7">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold tracking-tight text-ink">Registrasi Perlu Review</h3>
            <Link to="/admin/registrasi" className="text-xs font-bold text-primary hover:underline">
              Semua →
            </Link>
          </div>
          <div className="mt-5 flex flex-col gap-3">
            {pending.slice(0, 4).map((r) => (
              <Link
                key={r.id}
                to="/admin/registrasi"
                className="flex items-center gap-4 rounded-2xl bg-surface p-4 transition hover:bg-surface-deep"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/20 text-sm font-extrabold text-[#8a6d00]">
                  {r.name.slice(0, 1)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-extrabold text-ink">{r.name}</p>
                  <p className="text-xs font-semibold text-ink/45">
                    {r.nomor} · {r.cabang}
                  </p>
                </div>
                <Badge tone="gold">Menunggu</Badge>
              </Link>
            ))}
            {pending.length === 0 && (
              <p className="p-6 text-center text-sm font-bold text-ink/40">Tidak ada registrasi menunggu.</p>
            )}
          </div>
        </div>

        {/* Recent activity */}
        <div className="card-ik p-7">
          <h3 className="text-lg font-extrabold tracking-tight text-ink">Aktivitas Terakhir</h3>
          <div className="mt-5 flex flex-col gap-1">
            {[
              [`${pending.length} registrasi baru menunggu review`, "Baru saja"],
              [`${members.filter((m) => m.status === "AKTIF").length} anggota berstatus aktif`, "Hari ini"],
              [`${news.length} berita terpublikasi`, "Bulan ini"],
              [`${events.length} kegiatan terjadwal`, "Bulan ini"],
            ].map(([t, w]) => (
              <div key={t} className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-surface">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <p className="text-sm font-bold text-ink">{t}</p>
                  <p className="text-[11px] font-semibold text-ink/35">{w}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl bg-ink p-5 text-white">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-gold">Demo tip</p>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              Buka menu <strong className="text-white">Registrasi</strong> untuk mencoba alur approve/reject dan
              pembuatan nomor anggota otomatis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

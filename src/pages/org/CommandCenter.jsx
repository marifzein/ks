import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, Building2, CheckCircle2, Clock, Network, TrendingUp, UserCheck, Users } from "lucide-react";
import { useApp } from "../../context/AppContext";
import Badge from "../../components/Badge";
import { growthData, jenjangDistribution, statusDistribution, regionDistribution, activityFeed } from "../../data";
import { fmt, timeAgo } from "../../lib/utils";

const PIE_COLORS = ["#16a34a", "#e60000", "#111111", "#2563eb", "#f5c400", "#9333ea"];
const REGION_COLORS = ["#e60000", "#b80000", "#8f0000", "#f07a72", "#f5c400", "#f9b9b4"];

const feedIcon = {
  registrasi: <Clock className="h-4 w-4 text-blue-500" />,
  pengumuman: <Activity className="h-4 w-4 text-gold" />,
  anggota: <UserCheck className="h-4 w-4 text-emerald-500" />,
  prestasi: <TrendingUp className="h-4 w-4 text-purple-500" />,
  kegiatan: <Activity className="h-4 w-4 text-primary" />,
  organisasi: <Network className="h-4 w-4 text-ink" />,
};

export default function CommandCenter() {
  const { stats, registrations, members } = useApp();

  const kpis = [
    {
      icon: Users,
      label: "Total Anggota",
      value: fmt(stats.members),
      sub: "+2,4% bulan ini",
      tone: "bg-primary/10 text-primary",
    },
    {
      icon: UserCheck,
      label: "Anggota Aktif",
      value: fmt(stats.activeMembers),
      sub: "88,5% dari total",
      tone: "bg-emerald-500/10 text-emerald-600",
    },
    {
      icon: Clock,
      label: "Menunggu Verifikasi",
      value: fmt(stats.pending),
      sub: `${registrations.filter((r) => r.status === "MENUNGGU").length} baru hari ini`,
      tone: "bg-gold/20 text-[#8a6d00]",
    },
    {
      icon: Building2,
      label: "Cabang",
      value: fmt(stats.branches),
      sub: `${stats.rantings} ranting`,
      tone: "bg-blue-500/10 text-blue-600",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Organization Intelligence</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Command Center</h1>
          <p className="mt-1 text-sm text-ink/50">Pusat informasi organisasi — </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-xs font-extrabold text-emerald-600">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Sistem terhubung
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k, i) => (
          <div key={k.label} className="card-ik p-6 transition-all hover:-translate-y-0.5 hover:shadow-lift">
            <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${k.tone}`}>
              <k.icon className="h-5 w-5" />
            </div>
            <p className="stat-number mt-4 text-3xl font-extrabold tracking-tight text-ink">{k.value}</p>
            <p className="mt-1 text-xs font-extrabold uppercase tracking-wider text-ink/45">{k.label}</p>
            <p className="mt-1.5 text-[11px] font-semibold text-emerald-600">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="card-ik p-7 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold tracking-tight text-ink">Pertumbuhan Anggota</h3>
              <p className="text-xs font-semibold text-ink/40">2016 — 2026 · data simulasi</p>
            </div>
            <Badge tone="green">▲ +237%</Badge>
          </div>
          <div className="mt-6 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gAnggota" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e60000" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#e60000" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(17,17,17,0.06)" vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 11, fill: "#999" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${Math.round(v / 1000)}rb`}
                  width={44}
                />
                <Tooltip formatter={(v) => [fmt(v), "Anggota"]} labelStyle={{ fontWeight: 800, color: "#111" }} />
                <Area type="monotone" dataKey="anggota" stroke="#e60000" strokeWidth={3} fill="url(#gAnggota)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-ik p-7">
          <h3 className="text-lg font-extrabold tracking-tight text-ink">Status Anggota</h3>
          <p className="text-xs font-semibold text-ink/40">Distribusi status keanggotaan</p>
          <div className="mt-4 h-[210px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {statusDistribution.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [fmt(v), ""]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex flex-col gap-2">
            {statusDistribution.map((s, i) => (
              <div key={s.name} className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-2 text-ink/60">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} /> {s.name}
                </span>
                <span className="text-ink">{fmt(s.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="card-ik p-7">
          <h3 className="text-lg font-extrabold tracking-tight text-ink">Distribusi Jenjang</h3>
          <p className="text-xs font-semibold text-ink/40">Jumlah anggota per jenjang</p>
          <div className="mt-6 h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={jenjangDistribution} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(17,17,17,0.06)" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: "#999" }}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                  angle={-18}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#999" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${Math.round(v / 1000)}rb`}
                  width={40}
                />
                <Tooltip formatter={(v) => [fmt(v), "Anggota"]} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={38}>
                  {jenjangDistribution.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-ik p-7">
          <h3 className="text-lg font-extrabold tracking-tight text-ink">Sebaran Wilayah</h3>
          <p className="text-xs font-semibold text-ink/40">Anggota per wilayah besar</p>
          <div className="mt-6 flex flex-col gap-4">
            {regionDistribution.map((r, i) => {
              const total = regionDistribution.reduce((a, b) => a + b.value, 0);
              return (
                <div key={r.name}>
                  <div className="flex items-baseline justify-between text-xs font-bold">
                    <span className="text-ink/65">{r.name}</span>
                    <span className="text-ink">
                      {fmt(r.value)} · {Math.round((r.value / total) * 100)}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-ink/[0.06]">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(r.value / total) * 100}%`, background: REGION_COLORS[i] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity feed */}
        <div className="card-ik p-7">
          <h3 className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-ink">
            <Activity className="h-5 w-5 text-primary" /> Aktivitas Terbaru
          </h3>
          <div className="mt-5 flex max-h-[320px] flex-col gap-1 overflow-y-auto pr-1">
            {activityFeed.map((a) => (
              <div key={a.id} className="flex gap-3 rounded-xl p-2.5 transition hover:bg-surface">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink/[0.05]">
                  {feedIcon[a.type] || <Activity className="h-4 w-4 text-ink/40" />}
                </div>
                <div>
                  <p className="text-[13px] font-semibold leading-snug text-ink">
                    <span className="font-extrabold">{a.actor}</span> {a.action}
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold text-ink/35">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-ink/[0.06] pt-4">
            <div className="flex items-center justify-between rounded-xl bg-surface p-3">
              <div>
                <p className="text-xs font-extrabold text-ink">Registrasi baru menunggu</p>
                <p className="text-[11px] font-semibold text-ink/40">Perlu review pengurus</p>
              </div>
              <Badge tone="gold">{registrations.filter((r) => r.status === "MENUNGGU").length} baru</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Recent members table */}
      <div className="card-ik overflow-hidden">
        <div className="flex items-center justify-between px-7 pt-7">
          <div>
            <h3 className="text-lg font-extrabold tracking-tight text-ink">Anggota Terbaru</h3>
            <p className="text-xs font-semibold text-ink/40">5 anggota terakhir terdaftar di sistem</p>
          </div>
          <Badge tone="gray">{members.length} ditampilkan (demo)</Badge>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-y border-ink/[0.06] bg-surface text-[11px] font-extrabold uppercase tracking-wider text-ink/45">
                <th className="px-7 py-3">Anggota</th>
                <th className="px-4 py-3">Nomor</th>
                <th className="px-4 py-3">Jenjang</th>
                <th className="px-4 py-3">Wilayah</th>
                <th className="px-7 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {members.slice(0, 5).map((m) => (
                <tr key={m.id} className="border-b border-ink/[0.04] transition hover:bg-surface/60">
                  <td className="px-7 py-3.5 font-extrabold text-ink">{m.name}</td>
                  <td className="px-4 py-3.5 text-xs font-bold text-ink/50">{m.nomor}</td>
                  <td className="px-4 py-3.5 text-xs font-bold text-ink/70">{m.jenjang}</td>
                  <td className="px-4 py-3.5 text-xs font-semibold text-ink/55">{m.cabang}</td>
                  <td className="px-7 py-3.5 text-right">
                    <Badge tone={m.status === "AKTIF" ? "green" : "gray"}>{m.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

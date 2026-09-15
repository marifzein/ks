import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, MapPin, Users } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { provinces, jenjangList } from "../../data";

const statuses = ["Semua", "AKTIF", "NON-AKTIF", "PENDING"];

// Komponen Card sesuai UI pada Lampiran 2
function MemberCard({ member }) {
  // Ambil data dengan fallback jika ada perbedaan penamaan di schema lama/baru
  const photoUrl = member.photo || `https://i.pravatar.cc/300?img=${member.id}`;
  const memberNumber = member.nomor || member.noAnggota;
  const provinceName = member.province || member.provinsi;
  const statusUpper = (member.status || "AKTIF").toUpperCase();

  // Sederhanakan format jenjang jika perlu (opsional)
  const jenjangBadge = member.jenjang;

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start gap-4">
        {/* Foto Profil / Avatar */}
        <img
          src={photoUrl}
          alt={member.name}
          className="h-14 w-14 rounded-full object-cover border border-slate-100 flex-shrink-0"
        />

        {/* Informasi Nama & Nomor */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-800 truncate text-base leading-snug">{member.name}</h3>
          <p className="text-xs font-semibold tracking-wide text-slate-400 mt-0.5">{memberNumber}</p>

          {/* Badge Jenjang & Status */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">
              {jenjangBadge}
            </span>
            <span
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                statusUpper === "AKTIF"
                  ? "bg-emerald-50 text-emerald-600"
                  : statusUpper === "PENDING"
                    ? "bg-amber-50 text-amber-600"
                    : "bg-slate-100 text-slate-500"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  statusUpper === "AKTIF"
                    ? "bg-emerald-500"
                    : statusUpper === "PENDING"
                      ? "bg-amber-500"
                      : "bg-slate-400"
                }`}
              />
              {member.status}
            </span>
          </div>
        </div>
      </div>

      {/* Info Lokasi (Cabang & Provinsi) */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-400 font-medium">
        <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-slate-300" />
        <span className="truncate">
          {member.cabang} • {provinceName}
        </span>
      </div>
    </div>
  );
}

export default function MemberDirectory() {
  const { members } = useApp();
  const [q, setQ] = useState("");
  const [province, setProvince] = useState("Semua");
  const [jenjang, setJenjang] = useState("Semua");
  const [status, setStatus] = useState("Semua");
  const [showFilters, setShowFilters] = useState(false);

  // Filtering data aman untuk property `province` maupun `provinsi`
  const filtered = useMemo(
    () =>
      members.filter((m) => {
        const memberNum = m.nomor || m.noAnggota || "";
        const mProv = m.province || m.provinsi || "";

        const okQ = !q || (m.name + memberNum + m.cabang).toLowerCase().includes(q.toLowerCase());
        const okP = province === "Semua" || mProv === province;
        const okJ = jenjang === "Semua" || m.jenjang === jenjang;
        const okS = status === "Semua" || (m.status || "").toUpperCase() === status.toUpperCase();

        return okQ && okP && okJ && okS;
      }),
    [members, q, province, jenjang, status],
  );

  return (
    <div className="flex flex-col gap-6 p-2">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl">Direktori Anggota</h1>
        <p className="mt-1 text-xs font-semibold text-slate-400">
          {filtered.length} dari {members.length}+ anggota contoh ditampilkan
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari nama, nomor anggota, atau cabang…"
            className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition border ${
              showFilters
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filter
          </button>
        </div>

        {/* Form Filter Ekstra */}
        {showFilters && (
          <div className="grid animate-fadeUp gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:grid-cols-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Provinsi</label>
              <select
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-slate-400"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              >
                <option>Semua</option>
                {provinces.map((p) => (
                  <option key={p.name}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Jenjang</label>
              <select
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-slate-400"
                value={jenjang}
                onChange={(e) => setJenjang(e.target.value)}
              >
                <option>Semua</option>
                {jenjangList.map((j) => (
                  <option key={j}>{j}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Status</label>
              <select
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-slate-400"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {statuses.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Info Jumlah Ditemukan */}
      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
        <Users className="h-4 w-4" />
        <span>{filtered.length} anggota ditemukan</span>
      </div>

      {/* Grid Card List */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((m) => (
          <MemberCard key={m.id} member={m} />
        ))}
      </div>

      {/* Fallback Jika Hasil Kosong */}
      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <p className="text-sm font-bold text-slate-400">Tidak ada anggota yang cocok dengan pencarian/filter.</p>
        </div>
      )}
    </div>
  );
}

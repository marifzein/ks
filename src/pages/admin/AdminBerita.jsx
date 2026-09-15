import { useState } from "react";
import { Newspaper, Plus, Trash2 } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useToast } from "../../context/ToastContext";
import Badge from "../../components/Badge";
import { fmtDate, timeAgo } from "../../lib/utils";

const empty = { title: "", category: "Berita", excerpt: "", date: "2026-09-04", author: "Tim Media IKSPI" };

export default function AdminBerita() {
  const { news, addNews, deleteNews } = useApp();
  const toast = useToast();
  const [form, setForm] = useState(empty);
  const [showForm, setShowForm] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!form.title) return;
    addNews({ ...form, featured: false, image: getImg("images/silat-indonesia.webp") });
    toast.success("Berita diterbitkan ke Information Center.");
    setForm(empty);
    setShowForm(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Admin</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Kelola Berita</h1>
          <p className="mt-1 text-sm text-ink/50">{news.length} konten di Information Center</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-base bg-primary text-white hover:bg-primary-dark">
          <Plus className="h-4 w-4" /> Tulis Berita
        </button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="card-ik grid animate-fadeUp gap-4 p-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label-ik">Judul</label>
            <input
              className="input-ik"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Judul berita…"
              required
            />
          </div>
          <div>
            <label className="label-ik">Kategori</label>
            <select
              className="input-ik"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {["Berita", "Pengumuman", "Kegiatan", "Organisasi", "Prestasi"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-ik">Tanggal Terbit</label>
            <input
              type="date"
              className="input-ik"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="label-ik">Ringkasan</label>
            <textarea
              className="input-ik min-h-[90px]"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              placeholder="Ringkasan berita…"
            />
          </div>
          <div className="flex gap-3 sm:col-span-2">
            <button type="submit" className="btn-base bg-primary text-white hover:bg-primary-dark">
              Terbitkan
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="btn-base bg-ink/[0.06] text-ink hover:bg-ink/10"
            >
              Batal
            </button>
          </div>
        </form>
      )}

      <div className="card-ik overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink/[0.06] bg-surface text-[11px] font-extrabold uppercase tracking-wider text-ink/45">
                <th className="px-6 py-4">Judul</th>
                <th className="px-4 py-4">Kategori</th>
                <th className="px-4 py-4">Tanggal</th>
                <th className="px-4 py-4">Penulis</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {news.map((n) => (
                <tr key={n.id} className="border-b border-ink/[0.04] transition hover:bg-surface/60">
                  <td className="max-w-md px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <img src={n.image} alt="" className="h-10 w-14 shrink-0 rounded-lg object-cover" />
                      <div>
                        <p className="line-clamp-1 font-extrabold text-ink">{n.title}</p>
                        <p className="text-[11px] font-semibold text-ink/40">{timeAgo(n.date + "T00:00:00")}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge tone="gray">{n.category}</Badge>
                  </td>
                  <td className="px-4 py-3.5 text-xs font-semibold text-ink/50">{fmtDate(n.date)}</td>
                  <td className="px-4 py-3.5 text-xs font-semibold text-ink/50">{n.author}</td>
                  <td className="px-6 py-3.5">
                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          deleteNews(n.id);
                          toast.info("Berita dihapus.", "info");
                        }}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary transition hover:bg-primary hover:text-white"
                        aria-label="Hapus"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="flex items-center justify-center gap-2 text-center text-[11px] font-semibold text-ink/35">
        <Newspaper className="h-3.5 w-3.5" /> Berita tampil di halaman publik Information Center secara otomatis.
      </p>
    </div>
  );
}

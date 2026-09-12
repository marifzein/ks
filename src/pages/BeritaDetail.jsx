import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, UserRound } from 'lucide-react'
import Badge from '../components/Badge'
import NewsCard from '../components/NewsCard'
import { news } from '../data'
import { fmtDate } from '../lib/utils'

export default function BeritaDetail() {
  const { id } = useParams()
  const item = news.find((n) => n.id === id) || news[0]
  const related = news.filter((n) => n.id !== item.id).slice(0, 3)

  return (
    <div>
      <section className="relative overflow-hidden bg-ink pb-16 pt-36">
        <div className="absolute inset-0">
          <img src={item.image} alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-ink" />
        </div>
        <div className="container-ik relative">
          <Link to="/berita" className="flex items-center gap-2 text-sm font-bold text-white/60 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Kembali ke Information Center
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge tone="red">{item.category}</Badge>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-white/50">
              <CalendarDays className="h-3.5 w-3.5" /> {fmtDate(item.date)}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-white/50">
              <UserRound className="h-3.5 w-3.5" /> {item.author}
            </span>
          </div>
          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
            {item.title}
          </h1>
        </div>
      </section>

      <section className="section-pad bg-surface">
        <div className="container-ik max-w-3xl">
          <div className="overflow-hidden rounded-3xl shadow-lift">
            <img src={item.image} alt={item.title} className="aspect-[16/9] w-full object-cover" />
          </div>
          <article className="prose-ik mt-10 text-[16px]">
            <p className="text-lg font-semibold leading-relaxed text-ink">{item.excerpt}</p>
            <p>
              Artikel ini merupakan konten demonstrasi pada prototype IKSPI DIGITAL. Seluruh informasi yang muncul pada
              halaman ini — judul, tanggal, penulis, dan isi — adalah <strong>DATA SIMULASI</strong> untuk keperluan
              demo dan bukan informasi resmi organisasi.
            </p>
            <p>
              Pada versi produksi, halaman ini akan menjadi bagian dari Information Center resmi: setiap berita memiliki
              URL permanen, kategori, tanggal terbit, dan tautan dokumen terkait sehingga informasi organisasi dapat
              diakses kapan saja dan dipertanggungjawabkan.
            </p>
          </article>
          <div className="mt-10 rounded-2xl bg-gold/15 p-5 text-sm font-semibold text-[#7a6300]">
            ⚠ [DATA SIMULASI] — Konten halaman ini dibuat untuk keperluan prototype dan akan digantikan data resmi.
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-ik">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">Berita Lainnya</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((n) => (
              <NewsCard key={n.id} item={n} className="h-full" />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
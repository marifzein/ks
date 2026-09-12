import Button from '../components/Button'
import { Emblem } from '../components/Logo'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-5 text-center">
      <Emblem className="h-20 w-auto" />
      <h1 className="mt-8 text-6xl font-extrabold tracking-tight text-white">404</h1>
      <p className="mt-3 max-w-sm text-white/55">
        Halaman yang kamu cari tidak ditemukan. Mungkin sudah pindah atau belum dibuat.
      </p>
      <div className="mt-8">
        <Button to="/">Kembali ke Beranda</Button>
      </div>
    </div>
  )
}
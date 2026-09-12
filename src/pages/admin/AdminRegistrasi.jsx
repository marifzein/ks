import { useState } from 'react'
import { Check, Eye, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useToast } from '../../context/ToastContext'
import Badge from '../../components/Badge'
import Modal from '../../components/Modal'
import { fmtDate } from '../../lib/utils'

const statusTone = { MENUNGGU: 'gold', DISETUJUI: 'green', DITOLAK: 'red' }

export default function AdminRegistrasi() {
  const { registrations, approveRegistration, rejectRegistration } = useApp()
  const toast = useToast()
  const [detail, setDetail] = useState(null)
  const [confirm, setConfirm] = useState(null) // { id, action }

  const handleApprove = (id) => {
    const newMember = approveRegistration(id)
    toast.success(`Registrasi disetujui. Nomor anggota: ${newMember.nomor}`)
  }
  const handleReject = (id) => {
    rejectRegistration(id)
    toast.info('Registrasi ditolak.', 'info')
  }

  const pending = registrations.filter((r) => r.status === 'MENUNGGU')

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Admin</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Review Registrasi</h1>
          <p className="mt-1 text-sm text-ink/50">Tinjau, setujui, atau tolak pendaftaran anggota baru</p>
        </div>
        <Badge tone="gold">{pending.length} menunggu review</Badge>
      </div>

      <div className="card-ik overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink/[0.06] bg-surface text-[11px] font-extrabold uppercase tracking-wider text-ink/45">
                <th className="px-6 py-4">Calon Anggota</th>
                <th className="px-4 py-4">Nomor Registrasi</th>
                <th className="px-4 py-4">Wilayah</th>
                <th className="px-4 py-4">Diajukan</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r) => (
                <tr key={r.id} className="border-b border-ink/[0.04] transition hover:bg-surface/60">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-sm font-extrabold text-white">
                        {r.name.slice(0, 1)}
                      </div>
                      <div>
                        <p className="font-extrabold text-ink">{r.name}</p>
                        <p className="text-xs font-semibold text-ink/40">{fmtDate(r.birthDate)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs font-bold text-ink/50">{r.nomor}</td>
                  <td className="px-4 py-4 text-xs font-semibold text-ink/60">{r.cabang} · {r.province}</td>
                  <td className="px-4 py-4 text-xs font-semibold text-ink/50">{fmtDate(r.submittedAt)}</td>
                  <td className="px-4 py-4"><Badge tone={statusTone[r.status]}>{r.status}</Badge></td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setDetail(r)} className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/[0.06] text-ink/60 transition hover:bg-ink/10" aria-label="Detail">
                        <Eye className="h-4 w-4" />
                      </button>
                      {r.status === 'MENUNGGU' && (
                        <>
                          <button onClick={() => setConfirm({ id: r.id, action: 'approve' })} className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 transition hover:bg-emerald-500 hover:text-white" aria-label="Setujui">
                            <Check className="h-4 w-4" />
                          </button>
                          <button onClick={() => setConfirm({ id: r.id, action: 'reject' })} className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary transition hover:bg-primary hover:text-white" aria-label="Tolak">
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail modal */}
      <Modal open={Boolean(detail)} onClose={() => setDetail(null)} title="Detail Registrasi" size="sm">
        {detail && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-xl font-extrabold text-white">{detail.name.slice(0, 1)}</div>
              <div>
                <p className="text-lg font-extrabold text-ink">{detail.name}</p>
                <p className="text-xs font-bold text-ink/45">{detail.nomor}</p>
              </div>
            </div>
            {[
              ['Jenis Kelamin', detail.gender === 'L' ? 'Laki-laki' : 'Perempuan'],
              ['Tanggal Lahir', fmtDate(detail.birthDate)],
              ['No. HP', detail.phone],
              ['Provinsi', detail.province],
              ['Cabang', detail.cabang],
              ['Ranting', detail.ranting],
              ['Diajukan', fmtDate(detail.submittedAt)],
            ].map(([l, v]) => (
              <div key={l} className="flex justify-between border-b border-ink/[0.06] pb-2 text-sm">
                <span className="font-semibold text-ink/45">{l}</span>
                <span className="font-extrabold text-ink">{v}</span>
              </div>
            ))}
            {detail.status === 'MENUNGGU' && (
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => { handleApprove(detail.id); setDetail(null) }}
                  className="btn-base flex-1 bg-emerald-500 text-white hover:bg-emerald-600"
                >
                  <Check className="h-4 w-4" /> Setujui & Buat Nomor
                </button>
                <button
                  onClick={() => { handleReject(detail.id); setDetail(null) }}
                  className="btn-base flex-1 bg-ink/[0.06] text-ink hover:bg-ink/10"
                >
                  <X className="h-4 w-4" /> Tolak
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Confirm modal */}
      <Modal open={Boolean(confirm)} onClose={() => setConfirm(null)} title={confirm?.action === 'approve' ? 'Setujui Registrasi?' : 'Tolak Registrasi?'} size="sm">
        {confirm && (
          <div>
            <p className="text-sm leading-relaxed text-ink/60">
              {confirm.action === 'approve'
                ? 'Anggota akan langsung aktif dengan nomor anggota otomatis yang unik. Proses ini tidak dapat dibatalkan.'
                : 'Registrasi akan ditandai DITOLAK dan calon anggota dapat mengajukan ulang.'}
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  if (confirm.action === 'approve') handleApprove(confirm.id)
                  else handleReject(confirm.id)
                  setConfirm(null)
                }}
                className={`btn-base flex-1 ${confirm.action === 'approve' ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-primary text-white hover:bg-primary-dark'}`}
              >
                {confirm.action === 'approve' ? 'Ya, Setujui' : 'Ya, Tolak'}
              </button>
              <button onClick={() => setConfirm(null)} className="btn-base flex-1 bg-ink/[0.06] text-ink hover:bg-ink/10">
                Batal
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
import { useState } from 'react'
import { ChevronDown, ChevronRight, Plus } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useToast } from '../../context/ToastContext'
import Badge from '../../components/Badge'
import { organizationTree } from '../../data'

function TreeNode({ node, depth = 0 }) {
  const [open, setOpen] = useState(depth < 2)
  const hasChildren = node.children?.length > 0
  return (
    <div>
      <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 transition hover:bg-ink/[0.04]" style={{ marginLeft: depth * 22 }}>
        {hasChildren ? (
          <button onClick={() => setOpen(!open)} className="text-ink/40 hover:text-ink" aria-label="Buka/tutup">
            {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        ) : (
          <span className="w-4" />
        )}
        <span className="chip bg-ink/[0.06] text-ink/60">{node.type}</span>
        <span className="text-sm font-extrabold text-ink">{node.name}</span>
        {node.detail && <span className="ml-auto text-[11px] font-semibold text-ink/40">{node.detail}</span>}
      </div>
      {open && hasChildren && node.children.map((c) => <TreeNode key={c.name} node={c} depth={depth + 1} />)}
    </div>
  )
}

export default function AdminOrganisasi() {
  const toast = useToast()
  const [nodes, setNodes] = useState(() => JSON.parse(JSON.stringify(organizationTree)))
  const [form, setForm] = useState({ type: 'Pengda', name: '', parent: 'IKSPI Pusat' })

  const collectNames = (node, list = []) => {
    list.push(node.name)
    node.children?.forEach((c) => collectNames(c, list))
    return list
  }
  const parents = collectNames(nodes)

  const addNode = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    const insert = (node) => {
      if (node.name === form.parent) {
        node.children = node.children || []
        node.children.push({ name: form.name, type: form.type, detail: 'Baru ditambahkan' })
        return true
      }
      return (node.children || []).some(insert)
    }
    setNodes((n) => {
      const copy = JSON.parse(JSON.stringify(n))
      insert(copy)
      return copy
    })
    toast.success(`${form.type} "${form.name}" ditambahkan di bawah ${form.parent}.`)
    setForm((f) => ({ ...f, name: '' }))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Admin</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Kelola Organisasi</h1>
          <p className="mt-1 text-sm text-ink/50">Tambah pengurus daerah, cabang, atau ranting baru</p>
        </div>
        <Badge tone="gold">DATA SIMULASI</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-ik p-6 lg:col-span-2">
          <h3 className="text-base font-extrabold tracking-tight text-ink">Struktur Organisasi</h3>
          <div className="mt-4 rounded-2xl bg-surface p-4">
            <TreeNode node={nodes} />
          </div>
        </div>

        <div className="card-ik h-fit p-6">
          <h3 className="flex items-center gap-2 text-base font-extrabold tracking-tight text-ink">
            <Plus className="h-4 w-4 text-primary" /> Tambah Unit Baru
          </h3>
          <form onSubmit={addNode} className="mt-5 flex flex-col gap-4">
            <div>
              <label className="label-ik">Tipe Unit</label>
              <select className="input-ik" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option>Pengda</option>
                <option>Cabang</option>
                <option>Ranting</option>
              </select>
            </div>
            <div>
              <label className="label-ik">Nama Unit</label>
              <input className="input-ik" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={`Contoh: Pengda ${form.type === 'Pengda' ? 'Kalimantan Utara' : ''}`} />
            </div>
            <div>
              <label className="label-ik">Di Bawah</label>
              <select className="input-ik" value={form.parent} onChange={(e) => setForm({ ...form, parent: e.target.value })}>
                {parents.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <button type="submit" className="btn-base bg-primary text-white hover:bg-primary-dark">
              <Plus className="h-4 w-4" /> Tambahkan
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
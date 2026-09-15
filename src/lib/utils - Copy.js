export const fmt = (n) => (n == null ? '—' : Number(n).toLocaleString('id-ID'))

export const fmtCompact = (n) =>
  Intl.NumberFormat('id-ID', { notation: 'compact', maximumFractionDigits: 1 }).format(n)

export const fmtDate = (iso) => {
  if (!iso) return ''
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

export const timeAgo = (iso) => {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
  if (days <= 0) return 'Hari ini'
  if (days === 1) return 'Kemarin'
  if (days < 30) return `${days} hari lalu`
  if (days < 365) return `${Math.floor(days / 30)} bulan lalu`
  return `${Math.floor(days / 365)} tahun lalu`
}

export const initials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

export const jenjangColor = (jenjang) => {
  const map = {
    'Anggota Muda': '#16a34a',
    'Anggota Madya': '#2563eb',
    'Anggota Utama': '#9333ea',
    'Pendekar Muda': '#d97706',
    'Pendekar Madya': '#e60000',
    'Pendekar Utama': '#111111',
  }
  return map[jenjang] || '#16a34a'
}
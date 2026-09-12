import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin, Medal } from 'lucide-react'
import MemberAvatar from './MemberAvatar'
import Badge from './Badge'
import { jenjangColor } from '../lib/utils'

const statusTone = { AKTIF: 'green', 'NON-AKTIF': 'gray', PENDING: 'gold' }

export default function MemberCard({ member, className = '' }) {
  return (
    <Link
      to={`/anggota/direktori/${member.id}`}
      className={`group card-ik flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${className}`}
    >
      <div className="flex items-start gap-4">
        <MemberAvatar name={member.name} jenjang={member.jenjang} size="md" />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-extrabold text-ink group-hover:text-primary">{member.name}</h3>
          <p className="mt-0.5 text-xs font-bold tracking-wide text-ink/40">{member.nomor}</p>
          <div className="mt-2">
            <Badge tone={statusTone[member.status] || 'gray'}>{member.status}</Badge>
          </div>
        </div>
        <ArrowUpRight className="h-4 w-4 text-ink/25 transition group-hover:text-primary" />
      </div>
      <div className="mt-5 flex flex-col gap-1.5 border-t border-ink/[0.06] pt-4 text-xs font-semibold text-ink/55">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ background: jenjangColor(member.jenjang) }} />
          {member.jenjang}
        </span>
        <span className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-ink/30" />
          {member.cabang} · {member.province}
        </span>
        {member.achievements?.length > 0 && (
          <span className="flex items-center gap-2">
            <Medal className="h-3.5 w-3.5 text-gold" />
            {member.achievements.length} prestasi
          </span>
        )}
      </div>
    </Link>
  )
}
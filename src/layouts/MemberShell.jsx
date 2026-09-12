import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, UserRound, CreditCard, Users, LogOut, QrCode, ShieldCheck } from 'lucide-react'
import { Emblem } from '../components/Logo'
import MemberAvatar from '../components/MemberAvatar'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'

const nav = [
  { to: '/anggota', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/anggota/profil', label: 'Profil Saya', icon: UserRound },
  { to: '/anggota/kartu', label: 'Kartu Anggota', icon: CreditCard },
  { to: '/anggota/direktori', label: 'Direktori Anggota', icon: Users },
]

const bottomNav = nav.slice(0, 4)

export default function MemberShell() {
  const { session, logout } = useApp()
  const toast = useToast()
  const navigate = useNavigate()
  const name = session?.name || 'Demo Anggota'
  const demoMember = session?.member || 'mbr-001'

  const handleLogout = () => {
    logout()
    toast.info('Anda telah keluar.')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-[1100] hidden w-64 flex-col bg-ink text-white lg:flex">
        <Link to="/" className="flex items-center gap-3 px-6 py-6">
          <Emblem className="h-10 w-auto" />
          <div>
            <p className="text-base font-extrabold leading-none tracking-tight">
              IKSPI<span className="text-primary"> DIGITAL</span>
            </p>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.22em] text-white/40">Member Platform</p>
          </div>
        </Link>
        <nav className="mt-2 flex flex-1 flex-col gap-1 px-4">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
                  isActive ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <n.icon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] p-3">
            <MemberAvatar name={name} jenjang="Pendekar Muda" size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{name}</p>
              <p className="text-[10px] font-semibold text-white/40">IKS.2021.01842</p>
            </div>
            <button onClick={handleLogout} className="text-white/40 transition hover:text-primary" aria-label="Keluar">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="sticky top-0 z-[1000] flex items-center justify-between bg-ink px-5 py-3.5 text-white lg:hidden">
        <Link to="/" className="flex items-center gap-2.5">
          <Emblem className="h-9 w-auto" />
          <span className="text-base font-extrabold tracking-tight">
            IKSPI<span className="text-primary"> DIGITAL</span>
          </span>
        </Link>
        <NavLink
          to="/anggota/kartu"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white"
          aria-label="Kartu Anggota"
        >
          <QrCode className="h-4.5 w-4.5 h-[18px] w-[18px]" />
        </NavLink>
      </header>

      {/* Content */}
      <div className="pb-24 lg:pb-8 lg:pl-64">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
          <Outlet context={{ demoMember }} />
        </div>
      </div>

      {/* Bottom nav (mobile) */}
      <nav className="fixed inset-x-0 bottom-0 z-[1100] flex border-t border-ink/[0.08] bg-white/95 backdrop-blur lg:hidden">
        {bottomNav.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-bold ${
                isActive ? 'text-primary' : 'text-ink/45'
              }`
            }
          >
            <n.icon className="h-5 w-5" />
            {n.label.split(' ')[0]}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
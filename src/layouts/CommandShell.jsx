import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Network,
  ClipboardCheck,
  Users,
  CalendarDays,
  Newspaper,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { Emblem } from "../components/Logo";
import { useApp } from "../context/AppContext";
import { useToast } from "../context/ToastContext";

export default function CommandShell({ admin = false }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { session, logout } = useApp();
  const toast = useToast();
  const navigate = useNavigate();

  const name = session?.name || (admin ? "Admin Demo" : "Pengurus Demo");
  const role = admin ? "Administrator" : "Pengurus Pusat";

  const nav = admin
    ? [
        { to: "/admin", label: "Ringkasan", icon: LayoutDashboard, end: true },
        { to: "/admin/registrasi", label: "Registrasi", icon: ClipboardCheck },
        { to: "/admin/anggota", label: "Anggota", icon: Users },
        { to: "/admin/organisasi", label: "Organisasi", icon: Network },
        { to: "/admin/kegiatan", label: "Kegiatan", icon: CalendarDays },
        { to: "/admin/berita", label: "Berita", icon: Newspaper },
        { to: "/admin/pengaturan", label: "Pengaturan", icon: Settings },
      ]
    : [
        { to: "/komando", label: "Command Center", icon: LayoutDashboard, end: true },
        { to: "/komando/organisasi", label: "Organisasi", icon: Network },
      ];

  const handleLogout = () => {
    logout();
    toast.info("Anda telah keluar.");
    navigate("/login");
  };

  const sidebar = (
    <div className="flex h-full flex-col">
      <Link to="/" className="flex items-center gap-3 px-6 py-6">
        <Emblem className="h-10 w-auto" />
        <div>
          <p className="text-base font-extrabold leading-none tracking-tight">
            IKSPI<span className="text-primary"> DIGITAL</span>
          </p>
          <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.22em] text-white/40">
            {admin ? "Admin Backstage" : "Organization Intelligence"}
          </p>
        </div>
      </Link>
      <nav className="mt-2 flex flex-1 flex-col gap-1 px-4">
        {nav.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.end}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <n.icon className="h-[18px] w-[18px]" />
            {n.label}
          </NavLink>
        ))}
        {!admin && (
          <Link
            to="/admin"
            className="mt-6 flex items-center gap-3 rounded-xl bg-white/[0.06] px-4 py-3 text-sm font-bold text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            <ShieldCheck className="h-[18px] w-[18px]" />
            Admin Backstage
          </Link>
        )}
      </nav>
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-extrabold text-white">
            {name.slice(0, 1)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">{name}</p>
            <p className="text-[10px] font-semibold text-white/40">{role}</p>
          </div>
          <button onClick={handleLogout} className="text-white/40 transition hover:text-primary" aria-label="Keluar">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F4F1]">
      <aside className="fixed inset-y-0 left-0 z-[1100] hidden w-64 bg-ink text-white lg:block">{sidebar}</aside>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-[1200] lg:hidden ${mobileOpen ? "" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 h-full w-72 bg-ink text-white transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute right-4 top-5 text-white/60"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
          {sidebar}
        </div>
      </div>

      {/* Topbar */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-[1000] flex items-center justify-between border-b border-ink/[0.06] bg-white/90 px-5 py-3.5 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/[0.05] text-ink lg:hidden"
              aria-label="Buka menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-sm font-extrabold tracking-tight text-ink">
                {admin ? "Admin Backstage" : "Command Center"}
              </p>
              <p className="text-[11px] font-semibold text-ink/40">
                {admin ? "Kelola data & pengaturan organisasi" : "Organization Intelligence · "}
              </p>
            </div>
          </div>
          <Link
            to="/"
            className="hidden items-center gap-2 rounded-full bg-ink/[0.05] px-4 py-2 text-xs font-bold text-ink/60 transition hover:bg-ink/10 sm:flex"
          >
            Lihat Website Publik →
          </Link>
        </header>
        <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

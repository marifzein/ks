import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { LogIn, Menu, UserPlus, X } from "lucide-react";
import Logo from "./Logo";

const links = [
  { to: "/", label: "Beranda" },
  { to: "/tentang", label: "Profil" },
  { to: "/sejarah", label: "Sejarah" },
  { to: "/nilai", label: "Filosofi" },
  { to: "/kegiatan", label: "Kegiatan" },
  { to: "/berita", label: "Berita" },
  { to: "/sebaran", label: "Sebaran" },
  { to: "/bergabung", label: "Keanggotaan" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const overlay = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  const solid = scrolled || !isHome || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[1200] transition-all duration-300 ${
          solid ? "border-b border-ink/[0.06] bg-white/95 shadow-sm backdrop-blur" : "bg-transparent"
        }`}
      >
        <div className="container-ik flex h-[72px] items-center justify-between gap-4">
          <Logo dark={!solid} />
          <nav className="hidden items-center gap-6 xl:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `relative text-[13px] font-bold transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:rounded-full after:bg-primary after:transition-all after:duration-300 ${
                    isActive
                      ? `after:w-full ${solid ? "text-primary" : "text-white"}`
                      : `after:w-0 hover:after:w-full ${solid ? "text-ink/60 hover:text-ink" : "text-white/70 hover:text-white"}`
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-bold transition-colors ${
                solid ? "text-ink/70 hover:bg-ink/5 hover:text-ink" : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <LogIn className="h-4 w-4" /> Masuk Anggota
            </Link>
            <Link
              to="/registrasi"
              className="btn-base bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-dark"
            >
              <UserPlus className="h-4 w-4" /> Bergabung
            </Link>
          </div>
          <button
            onClick={() => setOpen(true)}
            className={`flex h-11 w-11 items-center justify-center rounded-full transition ${
              solid ? "text-ink hover:bg-ink/5" : "text-white hover:bg-white/10"
            } xl:hidden`}
            aria-label="Buka menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-[1300] ${open ? "" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-ink shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <Logo dark />
            <button
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
              aria-label="Tutup menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-6">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-base font-bold transition ${
                    isActive ? "bg-primary text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex flex-col gap-3 border-t border-white/10 px-6 py-6">
            <Link to="/registrasi" className="btn-base bg-primary text-white hover:bg-primary-dark">
              <UserPlus className="h-4 w-4" /> Bergabung dengan IKSPI
            </Link>
            <Link to="/login" className="btn-base border border-white/20 text-white hover:bg-white/10">
              <LogIn className="h-4 w-4" /> Masuk Anggota
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

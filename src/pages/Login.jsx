import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogIn, ShieldCheck, UserRound, Network } from "lucide-react";
import { Emblem } from "../components/Logo";
import { useApp } from "../context/AppContext";
import { useToast } from "../context/ToastContext";

const roles = [
  {
    key: "member",
    label: "Anggota",
    desc: "Dashboard, profil, kartu digital & direktori",
    icon: UserRound,
    dest: "/anggota",
    name: "Budi Santoso",
  },
  {
    key: "pengurus",
    label: "Pengurus",
    desc: "Command center & organization intelligence",
    icon: Network,
    dest: "/komando",
    name: "Pengurus Demo",
  },
  {
    key: "admin",
    label: "Administrator",
    desc: "Kelola anggota, registrasi, konten & pengaturan",
    icon: ShieldCheck,
    dest: "/admin",
    name: "Admin Demo",
  },
];

export default function Login() {
  const [role, setRole] = useState("member");
  const [email, setEmail] = useState("anggota@ikspidigital.id");
  const [password, setPassword] = useState("ikspi2026");
  const { login } = useApp();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const r = roles.find((x) => x.key === role);
    login({ name: r.name, role: r.key });
    toast.success(`Selamat datang, ${r.name}!`);
    navigate(r.dest);
  };

  return (
    <div className="grid min-h-screen bg-ink lg:grid-cols-2">
      {/* Visual side */}
      <div className="relative hidden overflow-hidden lg:block">
        <img
          src="images/pengurus-pusat-ikspi.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <a href="/" className="flex items-center gap-3">
            <Emblem className="h-12 w-auto" />
            <span className="text-xl font-extrabold tracking-tight text-white">
              IKSPI<span className="text-primary"> DIGITAL</span>
            </span>
          </a>
          <div>
            <h1 className="max-w-md text-4xl font-extrabold leading-[1.05] tracking-tight text-white">
              Satu Persaudaraan.
              <br />
              Satu Keluarga.
              <br />
              <span className="text-primary">Satu Ekosistem.</span>
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              Masuk ke platform digital organisasi — layanan anggota, pusat informasi pengurus, dan administrasi.
            </p>
          </div>
          <p className="text-[11px] font-semibold text-white/30">Prototype demo — gunakan akun demo di bawah.</p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center bg-surface px-5 py-16">
        <div className="w-full max-w-md animate-fadeUp">
          <a href="/" className="mb-8 flex items-center gap-2 text-sm font-bold text-ink/50 transition hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> Kembali ke beranda
          </a>
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <Emblem className="h-10 w-auto" />
            <span className="text-lg font-extrabold tracking-tight text-ink">
              IKSPI<span className="text-primary"> DIGITAL</span>
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink">Masuk</h1>
          <p className="mt-2 text-sm text-ink/55">Pilih peran demo lalu masuk dengan akun demo.</p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              {roles.map((r) => (
                <button
                  type="button"
                  key={r.key}
                  onClick={() => setRole(r.key)}
                  className={`flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all ${
                    role === r.key
                      ? "border-primary bg-primary/[0.04] shadow-lg shadow-primary/10"
                      : "border-ink/10 bg-white hover:border-ink/25"
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${role === r.key ? "bg-primary text-white" : "bg-ink/[0.06] text-ink/50"}`}
                  >
                    <r.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-ink">{r.label}</p>
                    <p className="text-xs text-ink/50">{r.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <div>
              <label className="label-ik">Email</label>
              <input className="input-ik" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
            </div>
            <div>
              <label className="label-ik">Kata Sandi</label>
              <input
                className="input-ik"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>

            <button
              type="submit"
              className="btn-base mt-2 w-full bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-dark"
            >
              <LogIn className="h-4 w-4" /> Masuk
            </button>

            <p className="text-center text-xs font-semibold text-ink/40">
              Belum punya akun?{" "}
              <a href="/registrasi" className="font-bold text-primary hover:underline">
                Daftar menjadi anggota
              </a>
            </p>
            <p className="rounded-xl bg-gold/15 p-3 text-center text-[11px] font-semibold text-[#7a6300]">
              Demo: klik salah satu peran di atas, lalu tekan Masuk.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

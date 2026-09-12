export function Emblem({ className = "h-10 w-auto" }) {
  return <img src="images/lambang-ikspi.webp" alt="Lambang IKSPI Kera Sakti" className={className} />;
}

export default function Logo({ className = "", emblemClass = "h-11 w-auto", dark = false, to = "/" }) {
  return (
    <a href={to} className={`group flex items-center gap-3 ${className}`}>
      <Emblem className={emblemClass} />
      <span className="flex flex-col leading-none">
        <span className={`text-lg font-extrabold tracking-tight ${dark ? "text-white" : "text-ink"}`}>
          IKSPI<span className="text-primary"> DIGITAL</span>
        </span>
        <span
          className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.24em] ${dark ? "text-white/50" : "text-ink/45"}`}
        >
          Kera Sakti
        </span>
      </span>
    </a>
  );
}

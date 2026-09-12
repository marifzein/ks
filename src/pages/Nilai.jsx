import { ArrowRight, Handshake, ShieldCheck, Flame, Sprout, Scale, Compass, Quote } from "lucide-react";
import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";
import ScrollReveal from "../components/ScrollReveal";
import { values } from "../data";

const valueIcons = {
  handshake: Handshake,
  shield: ShieldCheck,
  flame: Flame,
  sprout: Sprout,
  scale: Scale,
  compass: Compass,
};

export default function Nilai() {
  return (
    <div>
      <section className="relative overflow-hidden bg-ink pb-24 pt-40">
        <div className="absolute inset-0">
          <img src="images/silat-jabar.jpg" alt="Nilai IKSPI" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-ink" />
        </div>
        <div className="container-ik relative">
          <ScrollReveal>
            <p className="eyebrow text-gold">Nilai & Filosofi</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
              Ilmu Dimulai dari <span className="text-primary">Dalam Diri</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
              Sebelum menguasai jurus, setiap anggota terlebih dahulu dibentuk oleh nilai. Enam nilai ini adalah jiwa
              dari organisasi.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Quote band */}
      <section className="bg-primary py-14">
        <div className="container-ik flex items-center gap-6">
          <Quote className="hidden h-14 w-14 shrink-0 text-white/30 sm:block" />
          <blockquote className="text-xl font-extrabold leading-snug tracking-tight text-white sm:text-2xl md:text-3xl">
            “Bela diri sejati tidak dimulai dari memukul, tetapi dari mengendalikan diri.”
          </blockquote>
        </div>
      </section>

      {/* Values editorial */}
      <section className="section-pad bg-surface">
        <div className="container-ik">
          <div className="flex flex-col gap-16">
            {values.map((v, i) => {
              const Icon = valueIcons[v.icon] || Compass;
              const even = i % 2 === 0;
              return (
                <div key={v.title} className={`grid items-center gap-10 lg:grid-cols-2 ${even ? "" : ""}`}>
                  <ScrollReveal className={even ? "lg:order-1" : "lg:order-2"}>
                    <div className="relative overflow-hidden rounded-3xl bg-ink shadow-lift">
                      <div className="bg-grid absolute inset-0" />
                      <div className="relative flex aspect-[4/3] flex-col items-center justify-center gap-5 p-10 text-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-white shadow-2xl shadow-primary/40">
                          <Icon className="h-9 w-9" />
                        </div>
                        <p className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{v.title}</p>
                        <p className="max-w-sm text-sm leading-relaxed text-white/60">{v.description}</p>
                      </div>
                      <span className="absolute right-6 top-4 text-[80px] font-extrabold leading-none text-white/[0.06]">
                        0{i + 1}
                      </span>
                    </div>
                  </ScrollReveal>
                  <ScrollReveal delay={150} className={even ? "lg:order-2" : "lg:order-1"}>
                    <div className={even ? "lg:pl-10" : "lg:pr-10"}>
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-primary">
                        Nilai 0{i + 1}
                      </p>
                      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{v.title}</h2>
                      <p className="mt-4 text-base leading-relaxed text-ink/60">{v.description}</p>
                      <p className="mt-4 text-sm leading-relaxed text-ink/40">
                        Dalam praktiknya, nilai ini tercermin dalam setiap latihan, setiap pertemuan, dan setiap
                        pengabdian anggota kepada sesama.
                      </p>
                    </div>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-20">
        <div className="container-ik flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Nilai tidak cukup dibaca — ia harus dilatih.
          </h2>
          <Button to="/registrasi" size="lg">
            Mulai Berlatih Bersama Kami <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}

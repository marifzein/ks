import { ArrowRight } from "lucide-react";
import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";
import ScrollReveal from "../components/ScrollReveal";
import Timeline from "../components/Timeline";
import Badge from "../components/Badge";
import { historicalTimeline } from "../data";

export default function Sejarah() {
  return (
    <div>
      <section className="relative overflow-hidden bg-ink pb-24 pt-40">
        <div className="absolute inset-0">
          <img
            src={`${import.meta.env.BASE_URL}images/pengurus-pusat-ikspi.webp`}
            alt="Sejarah IKSPI"
            className="h-full w-full object-cover object-[center_75%]"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-black/30 to-ink" />
          {/* <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-ink" /> */}
        </div>
        <div className="container-ik relative">
          <ScrollReveal>
            <p className="eyebrow text-gold">Sejarah</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
              Perjalanan <br></br>yang Dibangun<br></br> <span className="text-primary">Generasi ke Generasi</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
              Dari awal perjalanan hingga menjadi keluarga besar di seluruh Indonesia — sebuah perjalanan panjang yang
              terus berlanjut.
            </p>
            <div className="mt-6">
              <Badge tone="gold">⚠ Seluruh isi halaman ini adalah DATA SIMULASI — menunggu data resmi</Badge>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-pad bg-surface">
        <div className="container-ik">
          <SectionHeader
            eyebrow="Linimasa"
            title="Momentum Perjalanan"
            description="Enam era besar yang membentuk organisasi hingga hari ini. Detail resmi akan menggantikan data simulasi ini."
            align="center"
          />
          <div className="mt-16">
            <Timeline items={historicalTimeline} />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-ik">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-ink text-center shadow-lift">
            <div className="p-12">
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Sejarah belum selesai ditulis.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/60">
                Setiap anggota yang bergabung hari ini adalah bagian dari babak berikutnya. Data resmi sejarah
                organisasi akan dihadirkan setelah dikonfirmasi pengurus pusat.
              </p>
              <div className="mt-8 flex justify-center">
                <Button to="/bergabung" variant="gold" className="text-ink">
                  Tulis Babak Berikutnya <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

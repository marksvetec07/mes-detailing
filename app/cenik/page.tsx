import Link from "next/link";
import { services } from "../data";

export default function CenikPage() {
  return (
    <main className="min-h-screen bg-[#eee9e1] px-6 py-24 text-[#24211f]">
      <section className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
          <div>
            <span className="accent-line" />
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.35em] text-[#8b6f47]">
              Cenik
            </p>
            <h1 className="font-display mt-4 text-[5rem] leading-[0.92] md:text-[7rem]">
              Pregleden cenik storitev.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#746f68]">
              Cene so okvirne in veljajo za običajno umazana vozila. Pri večjih
              ali zelo umazanih vozilih se cena prilagodi po dogovoru.
            </p>
          </div>

          <aside className="rounded-[2.5rem] border border-[#ded6ca] bg-[#faf8f4] p-8 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b6f47]">Pomembno</p>
            <h2 className="mt-3 text-xl font-bold">Posebni primeri</h2>
            <p className="mt-4 text-sm leading-7 text-[#746f68]">
              Pri pasji dlaki, trdovratnih madežih, večjih SUV-jih ali zelo
              umazani notranjosti se končna cena določi po ogledu in dogovoru.
            </p>
            <Link
              href="/narocanje"
              className="btn-primary mt-8 inline-flex rounded-full bg-[#2b2723] px-7 py-3.5 text-sm font-bold text-[#faf8f4] hover:bg-[#3a342e]"
            >
              Rezerviraj termin →
            </Link>
          </aside>
        </div>

        {/* Price cards */}
        <div className="mt-16 grid gap-5">
          {services.map((service, i) => (
            <article
              key={service.id}
              className="card-hover overflow-hidden rounded-[2.5rem] border border-[#ded6ca] bg-[#faf8f4] shadow-sm"
            >
              <div className="grid gap-6 p-7 md:grid-cols-[1.4fr_0.6fr_0.6fr] md:items-center md:p-10">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-6xl text-[#ded6ca]">0{i + 1}</span>
                    <h2 className="text-2xl font-bold">{service.name}</h2>
                  </div>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-[#746f68]">
                    {service.short}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#ded6ca] bg-[#eee9e1] p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b6f47]">
                    Trajanje
                  </p>
                  <p className="mt-2 text-2xl font-black">{service.duration}</p>
                </div>

                <div className="rounded-2xl border border-[#8b6f47]/20 bg-[#faf8f4] p-5 ring-1 ring-[#8b6f47]/10 md:text-right">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b6f47]">
                    Cena od
                  </p>
                  <p className="font-display mt-1 text-5xl text-[#24211f]">
                    {service.price} €
                  </p>
                </div>
              </div>

              <div className="border-t border-[#ded6ca] bg-[#f5f0ea] px-7 py-5 md:px-10">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#746f68]">Vključuje</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {service.includes.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[#ded6ca] bg-[#faf8f4] px-3.5 py-1.5 text-xs font-medium text-[#746f68]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/narocanje"
                    className="btn-primary shrink-0 rounded-full bg-[#2b2723] px-7 py-3 text-center text-sm font-bold text-[#faf8f4] hover:bg-[#3a342e]"
                  >
                    Rezerviraj →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-10 rounded-2xl border border-[#ded6ca] bg-[#faf8f4] px-7 py-5 text-sm text-[#746f68]">
          💡 Vse cene so informativne in vključujejo DDV. Za natančno ponudbo nas kontaktiraj pred rezervacijo.
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import { services } from "../data";

export default function StoritvePage() {
  return (
    <main className="min-h-screen bg-[#eee9e1] px-6 py-24 text-[#24211f]">
      <section className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:items-start">
          <div>
            <span className="accent-line" />
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.35em] text-[#8b6f47]">
              Storitve
            </p>
            <h1 className="font-display mt-4 text-[5rem] leading-[0.92] md:text-[7rem]">
              Pravi paket za vsak avto.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#746f68]">
              Od hitrega zunanjega pranja do globinskega čiščenja notranjosti.
              Vsako vozilo pregledamo in storitev prilagodimo stanju vozila.
            </p>
          </div>

          <aside className="rounded-[2.5rem] border border-[#ded6ca] bg-[#faf8f4] p-8 shadow-sm">
            <h2 className="text-xl font-bold">Kako izbrati?</h2>
            <div className="mt-5 space-y-4">
              {[
                "Za redno osvežitev priporočamo zunanje ali komplet čiščenje.",
                "Za madeže, sedeže in zahtevnejšo notranjost priporočamo globinsko.",
                "Nisi prepričan? Kontaktiraj nas in skupaj izberemo pravo storitev.",
              ].map((text, i) => (
                <div key={i} className="flex gap-3 text-sm leading-6 text-[#746f68]">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8b6f47]" />
                  {text}
                </div>
              ))}
            </div>
            <Link
              href="/narocanje"
              className="btn-primary mt-8 inline-flex rounded-full bg-[#2b2723] px-7 py-3.5 font-bold text-sm text-[#faf8f4] hover:bg-[#3a342e]"
            >
              Rezerviraj termin →
            </Link>
          </aside>
        </div>

        {/* Services list */}
        <div className="mt-16 grid gap-8">
          {services.map((service, index) => (
            <article
              key={service.id}
              className="grid overflow-hidden rounded-[2.5rem] border border-[#ded6ca] bg-[#faf8f4] shadow-sm lg:grid-cols-2"
            >
              <div
                className={`img-placeholder h-[320px] lg:h-auto ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              />

              <div className="p-8 md:p-10 flex flex-col justify-center">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b6f47]">
                  {service.duration} · od {service.price} €
                </p>

                <h2 className="font-display mt-3 text-5xl">
                  {service.name}
                </h2>

                <p className="mt-4 text-base leading-8 text-[#746f68]">
                  {service.short}
                </p>

                <div className="mt-6 rounded-2xl border border-[#ded6ca] bg-[#eee9e1] p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b6f47]">
                    Primerno za
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#746f68]">
                    {service.bestFor}
                  </p>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#24211f]">Vključuje</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {service.includes.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2.5 rounded-xl border border-[#ded6ca] bg-[#eee9e1] px-3.5 py-2.5 text-sm text-[#746f68]"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#8b6f47]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/narocanje"
                    className="btn-primary rounded-full bg-[#2b2723] px-6 py-3 text-center text-sm font-bold text-[#faf8f4] hover:bg-[#3a342e]"
                  >
                    Rezerviraj →
                  </Link>
                  <Link
                    href="/cenik"
                    className="rounded-full border border-[#cfc5b6] bg-[#eee9e1] px-6 py-3 text-center text-sm font-bold hover:border-[#8b6f47] transition-colors"
                  >
                    Poglej cenik
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import Image from "next/image";
import { services } from "./data";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#eee9e1] text-[#24211f] overflow-hidden">

      {/* HERO */}
      <section className="relative px-6 py-24 md:py-32">
        {/* Background accent */}
        <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-[#d4c4ae]/20 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="animate-fade-up inline-flex items-center gap-2.5 rounded-full border border-[#ded6ca] bg-[#faf8f4] px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8b6f47]" />
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b6f47]">
                MES Detailing
              </p>
            </div>

            <h1 className="font-display animate-fade-up-delay-1 mt-7 text-[5.5rem] leading-[0.92] md:text-[8rem]">
              Čist avto.
              <span className="block text-[#8b6f47]">Premium</span>
              <span className="block">občutek.</span>
            </h1>

            <p className="animate-fade-up-delay-2 mt-8 max-w-md text-lg leading-8 text-[#746f68]">
              Profesionalno zunanje, notranje in globinsko čiščenje vozil.
              Elegantno, natančno in brez nepotrebnega kompliciranja.
            </p>

            <div className="animate-fade-up-delay-3 mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/narocanje"
                className="btn-primary rounded-full bg-[#2b2723] px-8 py-4 text-center font-bold text-[#faf8f4] hover:bg-[#3a342e]"
              >
                Rezerviraj termin →
              </Link>
              <Link
                href="/storitve"
                className="rounded-full border border-[#cfc5b6] bg-[#faf8f4] px-8 py-4 text-center font-bold text-[#24211f] hover:border-[#8b6f47] transition-colors duration-200"
              >
                Poglej storitve
              </Link>
            </div>

            {/* Social proof */}
            <div className="animate-fade-in mt-12 flex items-center gap-5 border-t border-[#ded6ca] pt-8">
              <div>
                <p className="text-3xl font-black text-[#24211f]">100+</p>
                <p className="text-sm text-[#746f68]">opravljenih čiščenj</p>
              </div>
              <div className="h-8 w-px bg-[#ded6ca]" />
              <div>
                <p className="text-3xl font-black text-[#24211f]">4.9★</p>
                <p className="text-sm text-[#746f68]">povprečna ocena</p>
              </div>
              <div className="h-8 w-px bg-[#ded6ca]" />
              <div>
                <p className="text-3xl font-black text-[#24211f]">1 h</p>
                <p className="text-sm text-[#746f68]">povprečni odziv</p>
              </div>
            </div>
          </div>

          {/* Hero image card */}
          <div className="animate-scale-in rounded-[2.5rem] border border-[#ded6ca] bg-[#faf8f4] p-4 shadow-2xl shadow-[#24211f]/10">
            <div className="relative h-[520px] overflow-hidden rounded-[2rem]">
              <Image
                src="/hero.jpg"
                alt="MES Detailing — profesionalno čiščenje"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Floating badge */}
              <div className="absolute right-5 top-5 rounded-2xl bg-[#faf8f4]/90 backdrop-blur-sm px-4 py-3 text-center shadow-lg">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b6f47]">Od</p>
                <p className="text-3xl font-black text-[#24211f]">15 €</p>
              </div>

              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">
                  MES Detailing
                </p>
                <h2 className="font-display mt-2 text-4xl text-white">
                  Profesionalno čiščenje vozil
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-[#faf8f4] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <span className="accent-line" />
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.35em] text-[#8b6f47]">
                Zakaj izbrati nas
              </p>
              <h2 className="font-display mt-4 text-[4rem] leading-[0.95] md:text-[5.5rem]">
                Čiščenje, ki se pozna v detajlih.
              </h2>
            </div>
            <p className="text-lg leading-8 text-[#746f68]">
              Pri čiščenju se osredotočimo na detajle, ki naredijo vozilo bolj
              prijetno, urejeno in sveže — od platišč do notranjosti. Vsak avto
              obravnavamo individualno.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                num: "01",
                title: "Natančen pristop",
                text: "Vsako vozilo pregledamo in čiščenje prilagodimo njegovemu stanju in potrebam.",
              },
              {
                num: "02",
                title: "Urejena notranjost",
                text: "Sesanje, plastike, stekla in po potrebi globinsko čiščenje sedežev in tekstila.",
              },
              {
                num: "03",
                title: "Jasen dogovor",
                text: "Brez kompliciranja: izbereš storitev, pošlješ termin in se dogovorimo.",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="card-hover rounded-[2rem] border border-[#ded6ca] bg-[#eee9e1] p-8"
              >
                <p className="font-display text-6xl text-[#ded6ca]">{item.num}</p>
                <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 leading-7 text-[#746f68]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <span className="accent-line" />
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.35em] text-[#8b6f47]">
                Storitve
              </p>
              <h2 className="font-display mt-4 text-[4rem] leading-[0.95] md:text-[5.5rem]">
                Izberi pravi nivo čiščenja.
              </h2>
            </div>
            <Link
              href="/cenik"
              className="btn-primary rounded-full bg-[#2b2723] px-7 py-4 text-center font-bold text-[#faf8f4] hover:bg-[#3a342e]"
            >
              Poglej vse cene →
            </Link>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="card-hover overflow-hidden rounded-[2rem] border border-[#ded6ca] bg-[#faf8f4] flex flex-col"
              >
                <div className="img-placeholder h-44" />
                <div className="flex flex-col flex-1 p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b6f47]">
                    {service.duration}
                  </p>
                  <h3 className="mt-2 text-xl font-bold">{service.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-[#746f68]">{service.short}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-[#ded6ca] pt-5">
                    <p className="text-2xl font-black">od {service.price} €</p>
                    <Link
                      href="/narocanje"
                      className="rounded-full bg-[#eee9e1] px-4 py-2 text-sm font-bold hover:bg-[#ded6ca] transition-colors"
                    >
                      Rezerviraj
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-[#faf8f4] px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <span className="accent-line mx-auto" />
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.35em] text-[#8b6f47]">Kako deluje</p>
          <h2 className="font-display mt-4 text-[4rem] leading-[0.95] md:text-[5rem]">
            Preprost postopek v 3 korakih.
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { step: "1", title: "Izberi storitev", text: "Poglej storitve in cenik ter izberi, kar ustreza tvojemu vozilu." },
              { step: "2", title: "Pošlji povpraševanje", text: "Izpolni obrazec z datumom in vozilom. V kratkem se oglasiamo." },
              { step: "3", title: "Pridi po čist avto", text: "Ob dogovorjenem terminu prevzameš temeljito očiščeno vozilo." },
            ].map((item) => (
              <div key={item.step} className="relative rounded-[2rem] border border-[#ded6ca] bg-[#eee9e1] p-8 text-left">
                <p className="font-display text-[5rem] leading-none text-[#d4c4ae]">{item.step}</p>
                <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 leading-7 text-[#746f68]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-28 pt-10">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-[#2b2723] p-12 text-center text-[#faf8f4] relative">
          {/* Decorative accent */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-60 w-60 rounded-full bg-[#8b6f47]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-[#8b6f47]/10 blur-3xl" />

          <p className="relative text-xs font-bold uppercase tracking-[0.35em] text-[#8b6f47]">Naroči se danes</p>
          <h2 className="font-display relative mt-5 text-[4rem] leading-[0.95] md:text-[5.5rem]">
            Rezerviraj svoj termin.
          </h2>
          <p className="relative mx-auto mt-6 max-w-xl text-lg leading-8 text-[#a09890]">
            Izberi storitev, pošlji povpraševanje in dogovorimo se za termin čiščenja.
          </p>
          <Link
            href="/narocanje"
            className="btn-primary relative mt-10 inline-flex rounded-full bg-[#faf8f4] px-9 py-4 font-bold text-[#2b2723] hover:bg-[#eee9e1]"
          >
            Pojdi na naročanje →
          </Link>
        </div>
      </section>
    </main>
  );
}

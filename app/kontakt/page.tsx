export default function KontaktPage() {
  return (
    <main className="min-h-screen bg-[#eee9e1] px-6 py-24 text-[#24211f]">
      <section className="mx-auto max-w-5xl">
        <span className="accent-line" />
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.35em] text-[#8b6f47]">
          Kontakt
        </p>
        <h1 className="font-display mt-4 text-[5rem] leading-[0.92] md:text-[7rem]">
          Kontaktiraj nas.
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-[#746f68]">
          Za vprašanja, termine ali dodatne informacije nas kontaktiraj
          preko telefona, Instagrama ali e-maila.
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            {
              label: "Telefon",
              icon: "📞",
              value: "Pokliči nas",
              sub: "Za najhitrejši dogovor.",
              href: "tel:+38600000000",
            },
            {
              label: "Instagram",
              icon: "📷",
              value: "@mesdetailing",
              sub: "Slike, rezultati in DM.",
              href: "https://instagram.com/mesdetailing",
            },
            {
              label: "Email",
              icon: "✉️",
              value: "info@mesdetailing.si",
              sub: "Za pisna povpraševanja.",
              href: "mailto:info@mesdetailing.si",
            },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="card-hover group rounded-[2rem] border border-[#ded6ca] bg-[#faf8f4] p-8 block"
            >
              <div className="text-3xl">{item.icon}</div>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-[#8b6f47]">
                {item.label}
              </p>
              <p className="mt-2 text-xl font-bold group-hover:text-[#8b6f47] transition-colors">{item.value}</p>
              <p className="mt-2 text-sm text-[#746f68]">{item.sub}</p>
              <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-[#8b6f47] opacity-0 group-hover:opacity-100 transition-opacity">
                Odpri <span>→</span>
              </div>
            </a>
          ))}
        </div>

        {/* Map placeholder / location info */}
        <div className="mt-10 rounded-[2rem] border border-[#ded6ca] bg-[#faf8f4] p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b6f47]">Lokacija</p>
              <h2 className="mt-2 text-2xl font-bold">Pridemo k tebi ali se dogovorimo za lokacijo.</h2>
              <p className="mt-3 text-sm leading-7 text-[#746f68]">
                Delujemo mobilno — pogovorimo se o lokaciji, ki ti ustreza.
              </p>
            </div>
            <a
              href="/narocanje"
              className="btn-primary shrink-0 rounded-full bg-[#2b2723] px-7 py-3.5 text-center text-sm font-bold text-[#faf8f4] hover:bg-[#3a342e]"
            >
              Rezerviraj termin →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

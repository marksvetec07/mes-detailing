import Link from "next/link";

const galleryItems = [
  { title: "Notranjost", text: "Armatura, plastike, sedeži in notranja stekla.", tag: "Notranje" },
  { title: "Globinsko čiščenje", text: "Odstranjevanje madežev in osvežitev sedežev.", tag: "Globinsko" },
  { title: "Zunanje čiščenje", text: "Pena, ročno pranje, platišča in sušenje.", tag: "Zunanje" },
  { title: "Platišča", text: "Čiščenje zavornega prahu in umazanije.", tag: "Detajl" },
  { title: "Prej / potem", text: "Najboljši prikaz razlike po čiščenju.", tag: "Primerjava" },
  { title: "Končni rezultat", text: "Čist, urejen in svež izgled vozila.", tag: "Rezultat" },
];

export default function GalerijaPage() {
  return (
    <main className="min-h-screen bg-[#eee9e1] px-6 py-24 text-[#24211f]">
      <section className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
          <div>
            <span className="accent-line" />
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.35em] text-[#8b6f47]">
              Galerija
            </p>
            <h1 className="font-display mt-4 text-[5rem] leading-[0.92] md:text-[7rem]">
              Rezultati, ki se vidijo.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#746f68]">
              Tukaj bodo prikazane slike opravljenih čiščenj. Slike prej/potem
              pokažejo razliko, ki jo naredi profesionalno čiščenje.
            </p>
          </div>

          <aside className="rounded-[2.5rem] border border-[#ded6ca] bg-[#faf8f4] p-8 shadow-sm">
            <h2 className="text-xl font-bold">Sledi nam na Instagramu</h2>
            <p className="mt-3 text-sm leading-7 text-[#746f68]">
              Najnovejše slike in rezultati čiščenj so objavljeni na Instagramu.
            </p>
            <div className="mt-5 space-y-2.5">
              {["Sedeži prej/potem", "Platišča pred in po čiščenju", "Zunanjost po pranju", "Detajli notranjosti"].map((t) => (
                <div key={t} className="flex items-center gap-2.5 text-sm text-[#746f68]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8b6f47]" />
                  {t}
                </div>
              ))}
            </div>
            <a
              href="https://instagram.com/mesdetailing"
              target="_blank"
              rel="noopener"
              className="btn-primary mt-7 inline-flex rounded-full bg-[#2b2723] px-7 py-3.5 text-sm font-bold text-[#faf8f4] hover:bg-[#3a342e]"
            >
              @mesdetailing →
            </a>
          </aside>
        </div>

        {/* Gallery grid */}
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map(({ title, text, tag }) => (
            <article
              key={title}
              className="card-hover overflow-hidden rounded-[2.5rem] border border-[#ded6ca] bg-[#faf8f4]"
            >
              <div className="img-placeholder relative h-72">
                <div className="absolute left-4 top-4 rounded-full bg-[#faf8f4]/90 backdrop-blur-sm px-3.5 py-1.5 text-xs font-bold text-[#8b6f47]">
                  {tag}
                </div>
                <div className="absolute right-4 top-4 rounded-full bg-[#2b2723]/60 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-[#faf8f4]">
                  MES Detailing
                </div>
              </div>
              <div className="p-7">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#746f68]">{text}</p>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-[2.5rem] bg-[#2b2723] p-10 text-center text-[#faf8f4]">
          <h2 className="font-display text-5xl">Tvoj avto je naslednji.</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#a09890]">
            Rezerviraj termin in se prepričaj, kaj profesionalno čiščenje naredi z vozilom.
          </p>
          <Link
            href="/narocanje"
            className="btn-primary mt-8 inline-flex rounded-full bg-[#faf8f4] px-8 py-4 font-bold text-[#2b2723] hover:bg-[#eee9e1]"
          >
            Rezerviraj termin →
          </Link>
        </div>
      </section>
    </main>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const links = [
  { href: "/", label: "Domov" },
  { href: "/storitve", label: "Storitve" },
  { href: "/cenik", label: "Cenik" },
  { href: "/galerija", label: "Galerija" },
  { href: "/narocanje", label: "Naročanje" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#faf8f4]/95 backdrop-blur-xl shadow-[0_1px_0_#ded6ca] py-0"
          : "bg-[#faf8f4]/80 backdrop-blur-md border-b border-[#ded6ca]"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-[70px]">
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo.svg"
              alt="MES Detailing"
              width={140}
              height={50}
              className="h-12 w-auto object-contain transition-opacity group-hover:opacity-80"
            />
          </Link>

          <div className="hidden items-center gap-7 text-[0.9rem] font-semibold text-[#746f68] md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative py-1 hover:text-[#24211f] transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#8b6f47] after:rounded-full after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/narocanje"
            className="hidden rounded-full bg-[#2b2723] px-5 py-2.5 text-sm font-bold text-[#faf8f4] hover:bg-[#3a342e] transition-all duration-200 hover:-translate-y-0.5 md:inline-flex"
          >
            Rezerviraj termin →
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#ded6ca] bg-[#eee9e1] hover:bg-[#e5dfd5] transition-colors md:hidden"
            aria-label="Meni"
          >
            <div className="space-y-1.5">
              <div className={`h-0.5 w-5 bg-[#2b2723] transition-all duration-200 ${open ? "rotate-45 translate-y-2" : ""}`} />
              <div className={`h-0.5 w-5 bg-[#2b2723] transition-all duration-200 ${open ? "opacity-0" : ""}`} />
              <div className={`h-0.5 w-5 bg-[#2b2723] transition-all duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {open && (
          <div className="pb-4 md:hidden">
            <div className="rounded-3xl border border-[#ded6ca] bg-white p-3 shadow-xl">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 font-semibold text-[#746f68] hover:bg-[#eee9e1] hover:text-[#24211f] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/narocanje"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-2xl bg-[#2b2723] px-4 py-3 text-center font-bold text-[#faf8f4]"
              >
                Rezerviraj termin →
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#2b2723] text-[#faf8f4]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Image src="/logo.svg" alt="MES Detailing" width={130} height={45} className="h-10 w-auto brightness-0 invert opacity-90" />
            <p className="mt-5 text-sm leading-7 text-[#a09890]">
              Profesionalno čiščenje in detailing vozil. Elegantno, natančno in brez nepotrebnega kompliciranja.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b6f47]">Storitve</p>
            <div className="mt-4 space-y-2">
              {["Zunanje čiščenje", "Notranje čiščenje", "Komplet čiščenje", "Globinsko čiščenje"].map((s) => (
                <p key={s} className="text-sm text-[#a09890]">{s}</p>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b6f47]">Kontakt</p>
            <div className="mt-4 space-y-3">
              <a href="tel:+38600000000" className="block text-sm text-[#a09890] hover:text-[#faf8f4] transition-colors">
                📞 Pokliči nas
              </a>
              <a href="https://instagram.com/mesdetailing" className="block text-sm text-[#a09890] hover:text-[#faf8f4] transition-colors">
                📷 @mesdetailing
              </a>
              <a href="mailto:info@mesdetailing.si" className="block text-sm text-[#a09890] hover:text-[#faf8f4] transition-colors">
                ✉️ info@mesdetailing.si
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#3a342e] pt-8 flex flex-col sm:flex-row justify-between gap-3 text-xs text-[#6b6460]">
          <p>© 2026 MES Detailing. Vse pravice pridržane.</p>
          <p>Profesionalno čiščenje vozil · Slovenija</p>
        </div>
      </div>
    </footer>
  );
}

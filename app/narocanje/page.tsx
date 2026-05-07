"use client";

import { useState } from "react";
import { services } from "../data";

const bookedDates = ["2026-05-10", "2026-05-12", "2026-05-15"];

export default function NarocanjePage() {
  const [selectedService, setSelectedService] = useState(services[2]);
  const [selectedDate, setSelectedDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const isBooked = bookedDates.includes(selectedDate);

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#eee9e1] px-6 py-24 text-[#24211f] flex items-center justify-center">
        <div className="mx-auto max-w-lg text-center">
          <div className="text-6xl">✅</div>
          <h1 className="font-display mt-6 text-5xl">Povpraševanje poslano!</h1>
          <p className="mt-5 text-lg text-[#746f68]">
            Hvala, {name || ""}! V kratkem se ti oglasimo za potrditev termina.
          </p>
          <button
            onClick={() => { setSubmitted(false); setName(""); setPhone(""); setSelectedDate(""); }}
            className="mt-8 rounded-full border border-[#ded6ca] bg-[#faf8f4] px-7 py-3.5 text-sm font-bold hover:border-[#8b6f47] transition-colors"
          >
            Novo povpraševanje
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#eee9e1] px-6 py-24 text-[#24211f]">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_420px]">

          {/* Form side */}
          <div>
            <span className="accent-line" />
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.35em] text-[#8b6f47]">
              Naročanje
            </p>
            <h1 className="font-display mt-4 text-[5rem] leading-[0.92] md:text-[7rem]">
              Rezerviraj termin.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#746f68]">
              Izberi storitev, datum in pošlji povpraševanje. Potrditev termina
              se dogovori po telefonu ali sporočilu.
            </p>

            <div className="mt-12 grid gap-4 rounded-[2.5rem] border border-[#ded6ca] bg-[#faf8f4] p-8 shadow-sm">
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#8b6f47] mb-2">Ime in priimek</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-[#ded6ca] bg-[#eee9e1] px-5 py-4 text-sm transition-colors"
                  placeholder="npr. Janez Novak"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#8b6f47] mb-2">Telefonska številka</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-2xl border border-[#ded6ca] bg-[#eee9e1] px-5 py-4 text-sm transition-colors"
                  placeholder="+386 XX XXX XXX"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#8b6f47] mb-2">Vozilo</label>
                <input
                  className="w-full rounded-2xl border border-[#ded6ca] bg-[#eee9e1] px-5 py-4 text-sm transition-colors"
                  placeholder="npr. Audi A4, BMW 3, VW Golf..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#8b6f47] mb-2">Storitev</label>
                <select
                  value={selectedService.id}
                  onChange={(e) => {
                    const found = services.find((s) => s.id === e.target.value);
                    if (found) setSelectedService(found);
                  }}
                  className="w-full rounded-2xl border border-[#ded6ca] bg-[#eee9e1] px-5 py-4 text-sm transition-colors"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} — od {s.price} €
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#8b6f47] mb-2">Želeni datum</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full rounded-2xl border border-[#ded6ca] bg-[#eee9e1] px-5 py-4 text-sm transition-colors"
                />
              </div>

              {selectedDate && (
                <div
                  className={`rounded-2xl border p-4 text-sm font-medium ${
                    isBooked
                      ? "border-red-200 bg-red-50 text-red-700"
                      : "border-green-200 bg-green-50 text-green-700"
                  }`}
                >
                  {isBooked
                    ? "⚠️ Ta datum je zaseden. Prosimo, izberi drug datum."
                    : "✅ Ta datum je prost za rezervacijo."}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#8b6f47] mb-2">Opombe</label>
                <textarea
                  className="w-full min-h-32 rounded-2xl border border-[#ded6ca] bg-[#eee9e1] px-5 py-4 text-sm resize-none transition-colors"
                  placeholder="Madeži, pasja dlaka, zelo umazana notranjost, posebne zahteve..."
                />
              </div>

              <button
                type="button"
                onClick={() => setSubmitted(true)}
                disabled={isBooked}
                className="btn-primary mt-2 w-full rounded-full bg-[#2b2723] py-4 font-bold text-[#faf8f4] hover:bg-[#3a342e] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all"
              >
                Pošlji povpraševanje →
              </button>
            </div>
          </div>

          {/* Summary sidebar */}
          <aside className="h-fit space-y-5">
            <div className="rounded-[2.5rem] border border-[#ded6ca] bg-[#faf8f4] p-8 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b6f47]">
                Izbrana storitev
              </p>
              <h2 className="font-display mt-3 text-4xl">{selectedService.name}</h2>
              <p className="mt-3 text-sm leading-7 text-[#746f68]">
                {selectedService.short}
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[#ded6ca] bg-[#eee9e1] p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b6f47]">Trajanje</p>
                  <p className="mt-2 text-xl font-black">{selectedService.duration}</p>
                </div>
                <div className="rounded-2xl border border-[#8b6f47]/20 bg-[#eee9e1] p-5 ring-1 ring-[#8b6f47]/10">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b6f47]">Cena od</p>
                  <p className="font-display mt-1 text-4xl">{selectedService.price} €</p>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#24211f]">Vključuje</p>
                <div className="mt-3 space-y-2">
                  {selectedService.includes.map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-sm text-[#746f68]">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#8b6f47]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#ded6ca] bg-[#faf8f4] p-5">
              <p className="text-sm text-[#746f68]">
                📞 Raje pokliči? <a href="tel:+38600000000" className="font-bold text-[#24211f] hover:text-[#8b6f47] transition-colors">+386 00 000 000</a>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

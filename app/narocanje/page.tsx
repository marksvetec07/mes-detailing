"use client";

import { useState, useEffect } from "react";
import { services } from "../data";

const MONTHS = ["Januar","Februar","Marec","April","Maj","Junij","Julij","Avgust","September","Oktober","November","December"];
const DAY_LABELS = ["Ned","Pon","Tor","Sre","Čet","Pet","Sob"];

function toDateStr(y: number, m: number, d: number) {
  return `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
}
function getDaysInMonth(y: number, m: number) { return new Date(y, m+1, 0).getDate(); }
function getFirstDay(y: number, m: number) { return new Date(y, m, 1).getDay(); }

interface DayData { availableSlots: string[]; bookedSlots: string[]; isOpen: boolean; }

export default function NarocanjePage() {
  const today = new Date();
  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate());

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string|null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string|null>(null);
  const [monthData, setMonthData] = useState<Record<string,DayData>>({});
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState(services[2]);
  const [step, setStep] = useState<"calendar"|"form"|"done">("calendar");
  const [form, setForm] = useState({ name:"", phone:"", email:"", vehicle:"", notes:"" });
  const [submitting, setSubmitting] = useState(false);

  const monthKey = `${viewYear}-${String(viewMonth+1).padStart(2,"0")}`;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/availability?month=${monthKey}`)
      .then(r => r.json())
      .then(({ availability, bookings }) => {
        const map: Record<string,DayData> = {};
        for (const a of availability ?? []) {
          map[a.date] = { availableSlots: a.slots ?? [], bookedSlots: [], isOpen: a.is_open };
        }
        for (const b of bookings ?? []) {
          if (!map[b.date]) map[b.date] = { availableSlots: [], bookedSlots: [], isOpen: false };
          map[b.date].bookedSlots.push(b.time_slot);
        }
        setMonthData(map);
      })
      .catch(() => setMonthData({}))
      .finally(() => setLoading(false));
  }, [monthKey]);

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y-1); setViewMonth(11); }
    else setViewMonth(m => m-1);
    setSelectedDate(null); setSelectedSlot(null);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y+1); setViewMonth(0); }
    else setViewMonth(m => m+1);
    setSelectedDate(null); setSelectedSlot(null);
  }

  function getDayStatus(dateStr: string) {
    if (dateStr < todayStr) return "past";
    const info = monthData[dateStr];
    if (!info || !info.isOpen) return "closed";
    const free = info.availableSlots.filter(s => !info.bookedSlots.includes(s));
    if (free.length === 0) return "full";
    return "open";
  }

  const dayInfo = selectedDate ? monthData[selectedDate] : null;
  const freeSlots = dayInfo ? dayInfo.availableSlots.filter(s => !dayInfo.bookedSlots.includes(s)) : [];
  const allSlots = dayInfo ? [...dayInfo.availableSlots].sort() : [];

  async function handleSubmit() {
    if (!selectedDate || !selectedSlot) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          service_id: selectedService.id,
          service_name: selectedService.name,
          date: selectedDate,
          time_slot: selectedSlot,
        }),
      });
      if (res.ok) setStep("done");
      else { const d = await res.json(); alert(d.error ?? "Napaka pri oddaji."); }
    } finally { setSubmitting(false); }
  }

  // ── DONE SCREEN ──────────────────────────────────────────────────────────
  if (step === "done") return (
    <main className="min-h-screen bg-[#eee9e1] flex items-center justify-center px-6 py-20">
      <div className="max-w-lg w-full">
        <div className="rounded-[2.5rem] border border-[#ded6ca] bg-[#faf8f4] p-10 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">✅</div>
          <h1 className="font-display text-5xl text-[#24211f]">Oddano!</h1>
          <p className="mt-4 text-[#746f68] leading-7">
            Hvala, <strong className="text-[#24211f]">{form.name}</strong>! Prejeli smo tvoje povpraševanje. V kratkem se ti oglasite za potrditev.
          </p>
          <div className="mt-7 rounded-2xl border border-[#ded6ca] bg-[#eee9e1] p-5 text-left space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-[#746f68]">Datum</span><strong>{selectedDate}</strong></div>
            <div className="flex justify-between"><span className="text-[#746f68]">Ura</span><strong>{selectedSlot}</strong></div>
            <div className="flex justify-between"><span className="text-[#746f68]">Storitev</span><strong>{selectedService.name}</strong></div>
            <div className="flex justify-between"><span className="text-[#746f68]">Cena od</span><strong>{selectedService.price} €</strong></div>
          </div>
          <button
            onClick={() => { setStep("calendar"); setSelectedDate(null); setSelectedSlot(null); setForm({name:"",phone:"",email:"",vehicle:"",notes:""}); }}
            className="mt-7 w-full rounded-full border border-[#ded6ca] py-3 font-bold text-sm hover:border-[#8b6f47] transition-colors"
          >
            Novo povpraševanje
          </button>
        </div>
      </div>
    </main>
  );

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDay(viewYear, viewMonth);

  // ── MAIN ─────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#eee9e1] px-4 py-16 pb-24 text-[#24211f]">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10">
          <span className="accent-line"/>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.35em] text-[#8b6f47]">Naročanje</p>
          <h1 className="font-display mt-3 text-[4.5rem] leading-[0.92] md:text-[6.5rem]">Rezerviraj termin.</h1>
          <p className="mt-4 text-lg text-[#746f68] max-w-xl">
            Izberi datum na koledarju, uro in storitev — nato izpolni podatke.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-10">
          {[{n:"1",label:"Termin"},{n:"2",label:"Podatki"}].map(({n,label},i) => {
            const active = (i===0 && step==="calendar") || (i===1 && step==="form");
            const done = (i===0 && step==="form");
            return (
              <div key={n} className="flex items-center gap-2">
                {i>0 && <div className="h-px w-8 bg-[#ded6ca]"/>}
                <div className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${active ? "bg-[#2b2723] text-[#faf8f4]" : done ? "bg-green-100 text-green-700" : "bg-[#faf8f4] border border-[#ded6ca] text-[#746f68]"}`}>
                  <span>{done ? "✓" : n}</span> {label}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── STEP 1: CALENDAR ──────────────────────────────────────────── */}
        {step === "calendar" && (
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">

            {/* Calendar card */}
            <div className="rounded-[2.5rem] border border-[#ded6ca] bg-[#faf8f4] p-6 md:p-8 shadow-sm">

              {/* Month navigation */}
              <div className="flex items-center justify-between mb-7">
                <button onClick={prevMonth} className="h-11 w-11 rounded-full border border-[#ded6ca] bg-[#eee9e1] hover:bg-[#e0d8cc] transition-colors flex items-center justify-center font-bold text-xl">‹</button>
                <div className="text-center">
                  <h2 className="font-bold text-xl">{MONTHS[viewMonth]}</h2>
                  <p className="text-sm text-[#746f68]">{viewYear}</p>
                </div>
                <button onClick={nextMonth} className="h-11 w-11 rounded-full border border-[#ded6ca] bg-[#eee9e1] hover:bg-[#e0d8cc] transition-colors flex items-center justify-center font-bold text-xl">›</button>
              </div>

              {/* Day labels */}
              <div className="grid grid-cols-7 mb-3">
                {DAY_LABELS.map(d => (
                  <div key={d} className="text-center text-xs font-bold text-[#a09890] py-1">{d}</div>
                ))}
              </div>

              {/* Days grid */}
              {loading ? (
                <div className="h-56 flex flex-col items-center justify-center gap-3 text-[#746f68]">
                  <div className="h-6 w-6 rounded-full border-2 border-[#ded6ca] border-t-[#8b6f47] animate-spin"/>
                  <p className="text-sm">Nalagam razpored...</p>
                </div>
              ) : (
                <div className="grid grid-cols-7 gap-1.5">
                  {Array.from({length: firstDay}).map((_,i) => <div key={`e${i}`}/>)}
                  {Array.from({length: daysInMonth}).map((_,i) => {
                    const day = i + 1;
                    const dateStr = toDateStr(viewYear, viewMonth, day);
                    const status = getDayStatus(dateStr);
                    const isSelected = selectedDate === dateStr;
                    const isToday = dateStr === todayStr;

                    let cls = "";
                    if (isSelected) cls = "bg-[#2b2723] text-[#faf8f4] shadow-md ring-2 ring-[#8b6f47]/40 scale-105";
                    else if (status === "open") cls = "bg-[#d8f0e2] text-[#155a30] hover:bg-[#c3e8d0] hover:scale-105 cursor-pointer";
                    else if (status === "full") cls = "bg-[#fde8e8] text-[#991b1b] cursor-not-allowed";
                    else if (status === "past") cls = "text-[#cfc5b6] cursor-default opacity-40";
                    else cls = "bg-[#f0ece7] text-[#b0a898] cursor-not-allowed";

                    return (
                      <button
                        key={day}
                        disabled={status !== "open"}
                        onClick={() => { setSelectedDate(dateStr); setSelectedSlot(null); }}
                        className={`relative rounded-2xl py-3 text-sm font-bold transition-all duration-150 ${cls}`}
                      >
                        {day}
                        {isToday && !isSelected && (
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-[#8b6f47]"/>
                        )}
                        {status === "open" && !isSelected && (
                          <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-green-500"/>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Legend */}
              <div className="mt-6 flex flex-wrap gap-4 pt-5 border-t border-[#ded6ca]">
                {[
                  {color:"bg-[#d8f0e2]",label:"Prosto"},
                  {color:"bg-[#fde8e8]",label:"Zasedeno"},
                  {color:"bg-[#f0ece7]",label:"Zaprto"},
                ].map(({color,label}) => (
                  <div key={label} className="flex items-center gap-2 text-xs text-[#746f68]">
                    <span className={`h-3.5 w-3.5 rounded-md ${color}`}/>
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Right panel */}
            <div className="flex flex-col gap-4">

              {/* Time slots */}
              <div className="rounded-[2rem] border border-[#ded6ca] bg-[#faf8f4] p-6 shadow-sm flex-1">
                {!selectedDate ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-[#746f68]">
                    <div className="mb-4 h-16 w-16 rounded-full bg-[#eee9e1] flex items-center justify-center text-3xl">📅</div>
                    <p className="font-bold text-[#24211f]">Izberi datum</p>
                    <p className="text-sm mt-1">Klikni na zelen dan v koledarju</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-5">
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b6f47]">Razpoložljive ure</p>
                      <h3 className="font-bold text-lg mt-1">
                        {new Date(selectedDate + "T12:00:00").toLocaleDateString("sl-SI", {weekday:"long",day:"numeric",month:"long"})}
                      </h3>
                      <p className="text-sm text-[#746f68] mt-0.5">{freeSlots.length} prostih terminov</p>
                    </div>

                    {allSlots.length === 0 ? (
                      <p className="text-sm text-[#746f68] py-4">Ta dan nima nastavljenih ur.</p>
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        {allSlots.map(slot => {
                          const booked = dayInfo?.bookedSlots.includes(slot);
                          const sel = selectedSlot === slot;
                          return (
                            <button
                              key={slot}
                              disabled={!!booked}
                              onClick={() => setSelectedSlot(slot)}
                              className={`rounded-xl py-3 text-sm font-bold transition-all ${
                                booked ? "bg-[#fde8e8] text-[#991b1b] opacity-60 cursor-not-allowed line-through"
                                : sel ? "bg-[#2b2723] text-[#faf8f4] ring-2 ring-[#8b6f47]/40 scale-105"
                                : "bg-[#d8f0e2] text-[#155a30] hover:bg-[#c3e8d0] hover:scale-105 cursor-pointer"
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Service selector */}
              <div className="rounded-[2rem] border border-[#ded6ca] bg-[#faf8f4] p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b6f47] mb-3">Storitev</p>
                <div className="space-y-2">
                  {services.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedService(s)}
                      className={`w-full rounded-2xl border px-4 py-3 text-left transition-all ${
                        selectedService.id === s.id
                          ? "border-[#8b6f47] bg-[#f5ede0] ring-1 ring-[#8b6f47]/20"
                          : "border-[#ded6ca] hover:border-[#cfc5b6] bg-transparent"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm">{s.name}</span>
                        <span className="text-xs text-[#8b6f47] font-bold">od {s.price} €</span>
                      </div>
                      <span className="text-xs text-[#746f68]">{s.duration}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => setStep("form")}
                disabled={!selectedDate || !selectedSlot}
                className="btn-primary w-full rounded-full bg-[#2b2723] py-4 font-bold text-[#faf8f4] hover:bg-[#3a342e] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                {selectedDate && selectedSlot
                  ? `Nadaljuj — ${new Date(selectedDate+"T12:00:00").toLocaleDateString("sl-SI",{day:"numeric",month:"short"})} ob ${selectedSlot}`
                  : "Izberi datum in uro za nadaljevanje"}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: FORM ──────────────────────────────────────────────── */}
        {step === "form" && (
          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <div className="rounded-[2.5rem] border border-[#ded6ca] bg-[#faf8f4] p-8 shadow-sm">
              <button onClick={() => setStep("calendar")} className="mb-6 flex items-center gap-1.5 text-sm font-bold text-[#8b6f47] hover:underline">
                ← Nazaj na koledar
              </button>
              <h2 className="font-display text-4xl mb-7">Tvoji podatki</h2>

              <div className="space-y-4">
                {[
                  {key:"name", label:"Ime in priimek *", placeholder:"Janez Novak", type:"text"},
                  {key:"phone", label:"Telefonska številka *", placeholder:"+386 40 123 456", type:"tel"},
                  {key:"email", label:"Email naslov", placeholder:"janez@email.com", type:"email"},
                  {key:"vehicle", label:"Vozilo *", placeholder:"VW Golf 7, BMW 320d, Audi A4..."},
                ].map(({key,label,placeholder,type}) => (
                  <div key={key}>
                    <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#8b6f47] mb-2">{label}</label>
                    <input
                      type={type ?? "text"}
                      value={form[key as keyof typeof form]}
                      onChange={e => setForm(f => ({...f,[key]:e.target.value}))}
                      placeholder={placeholder}
                      className="w-full rounded-2xl border border-[#ded6ca] bg-[#eee9e1] px-5 py-3.5 text-sm transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#8b6f47] mb-2">Opombe</label>
                  <textarea
                    value={form.notes}
                    onChange={e => setForm(f => ({...f,notes:e.target.value}))}
                    placeholder="Pasja dlaka, madeži, posebne zahteve..."
                    className="w-full min-h-28 rounded-2xl border border-[#ded6ca] bg-[#eee9e1] px-5 py-3.5 text-sm resize-none transition-colors"
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting || !form.name || !form.phone || !form.vehicle}
                className="btn-primary mt-7 w-full rounded-full bg-[#2b2723] py-4 font-bold text-[#faf8f4] hover:bg-[#3a342e] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"/>
                    Pošiljam...
                  </span>
                ) : "Pošlji povpraševanje →"}
              </button>

              <p className="mt-4 text-xs text-center text-[#a09890]">
                * obvezna polja · Po oddaji vas kontaktiramo za potrditev.
              </p>
            </div>

            {/* Summary */}
            <aside className="rounded-[2rem] border border-[#ded6ca] bg-[#faf8f4] p-6 h-fit shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b6f47] mb-5">Povzetek rezervacije</p>
              <div className="space-y-3 text-sm">
                <div className="rounded-2xl bg-[#eee9e1] p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#746f68]">Datum</span>
                    <strong>{new Date(selectedDate!+"T12:00:00").toLocaleDateString("sl-SI",{day:"numeric",month:"long",year:"numeric"})}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#746f68]">Ura</span>
                    <strong className="text-lg">{selectedSlot}</strong>
                  </div>
                </div>
                <div className="rounded-2xl bg-[#eee9e1] p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#746f68]">Storitev</span>
                    <strong>{selectedService.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#746f68]">Trajanje</span>
                    <strong>{selectedService.duration}</strong>
                  </div>
                  <div className="flex justify-between border-t border-[#ded6ca] pt-2 mt-1">
                    <span className="text-[#746f68]">Cena od</span>
                    <span className="font-display text-3xl">{selectedService.price} €</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-[#ded6ca] p-4 text-xs text-[#746f68]">
                💡 Cena je okvirna. Točna cena se dogovori pri ogledu vozila.
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

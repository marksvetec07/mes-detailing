"use client";

import { useState, useEffect, useCallback } from "react";

const MONTHS = ["Januar","Februar","Marec","April","Maj","Junij","Julij","Avgust","September","Oktober","November","December"];
const DAY_LABELS = ["Ned","Pon","Tor","Sre","Čet","Pet","Sob"];
const ALL_HOURS = ["07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"];

function toDateStr(y: number, m: number, d: number) {
  return `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
}

interface Booking {
  id: string; created_at: string; name: string; phone: string; email: string;
  vehicle: string; service_name: string; date: string; time_slot: string;
  notes: string; status: "pending"|"confirmed"|"cancelled";
}

interface AvailDay { is_open: boolean; slots: string[]; }

export default function AdminPage() {
  const today = new Date();
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [token, setToken] = useState("");
  const [authError, setAuthError] = useState(false);
  const [tab, setTab] = useState<"bookings"|"availability">("bookings");

  // Bookings state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bFilter, setBFilter] = useState<"all"|"pending"|"confirmed"|"cancelled">("pending");
  const [loadingBookings, setLoadingBookings] = useState(false);

  // Availability state
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [avail, setAvail] = useState<Record<string,AvailDay>>({});
  const [editingDate, setEditingDate] = useState<string|null>(null);
  const [savingKey, setSavingKey] = useState<string|null>(null);

  const monthKey = `${viewYear}-${String(viewMonth+1).padStart(2,"0")}`;

  const loadBookings = useCallback(async (t: string) => {
    setLoadingBookings(true);
    try {
      const r = await fetch("/api/admin/bookings", { headers: {"x-admin-token": t} });
      if (r.ok) { const d = await r.json(); setBookings(d.bookings ?? []); }
    } finally { setLoadingBookings(false); }
  }, []);

  const loadAvail = useCallback(async (t: string, mk: string) => {
    const r = await fetch(`/api/admin/availability?month=${mk}`, { headers: {"x-admin-token": t} });
    if (r.ok) {
      const { availability } = await r.json();
      const map: Record<string,AvailDay> = {};
      for (const a of availability ?? []) map[a.date] = { is_open: a.is_open, slots: a.slots ?? [] };
      setAvail(map);
    }
  }, []);

  async function login() {
    setAuthError(false);
    const r = await fetch("/api/admin/bookings", { headers: {"x-admin-token": pw} });
    if (r.ok) {
      setToken(pw); setAuthed(true);
      const d = await r.json(); setBookings(d.bookings ?? []);
    } else { setAuthError(true); }
  }

  useEffect(() => {
    if (!authed) return;
    if (tab === "bookings") loadBookings(token);
    if (tab === "availability") loadAvail(token, monthKey);
  }, [authed, tab, monthKey, token, loadBookings, loadAvail]);

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: {"Content-Type":"application/json","x-admin-token":token},
      body: JSON.stringify({id, status}),
    });
    loadBookings(token);
  }

  async function saveDay(dateStr: string, data: AvailDay) {
    setSavingKey(dateStr);
    await fetch("/api/admin/availability", {
      method: "POST",
      headers: {"Content-Type":"application/json","x-admin-token":token},
      body: JSON.stringify({ date: dateStr, ...data }),
    });
    setSavingKey(null);
  }

  function toggleDayOpen(dateStr: string) {
    const cur = avail[dateStr] ?? { is_open: false, slots: [] };
    const updated = { ...cur, is_open: !cur.is_open };
    setAvail(a => ({...a, [dateStr]: updated}));
    saveDay(dateStr, updated);
    if (!cur.is_open) setEditingDate(dateStr);
  }

  function toggleSlot(dateStr: string, slot: string) {
    const cur = avail[dateStr] ?? { is_open: true, slots: [] };
    const slots = cur.slots.includes(slot)
      ? cur.slots.filter(s => s !== slot)
      : [...cur.slots, slot].sort();
    const updated = { ...cur, slots };
    setAvail(a => ({...a, [dateStr]: updated}));
    saveDay(dateStr, updated);
  }

  function applyTemplate(dateStr: string, tmpl: string[]) {
    const cur = avail[dateStr] ?? { is_open: true, slots: [] };
    const updated = { ...cur, slots: tmpl };
    setAvail(a => ({...a, [dateStr]: updated}));
    saveDay(dateStr, updated);
  }

  const pending = bookings.filter(b => b.status === "pending").length;
  const filtered = bookings.filter(b => bFilter === "all" || b.status === bFilter);

  const statusCls: Record<string,string> = {
    pending: "bg-amber-50 text-amber-800 border-amber-200",
    confirmed: "bg-green-50 text-green-800 border-green-200",
    cancelled: "bg-red-50 text-red-800 border-red-200",
  };
  const statusLabel: Record<string,string> = { pending:"⏳ Čaka", confirmed:"✅ Potrjeno", cancelled:"❌ Preklicano" };

  const daysInMonth = new Date(viewYear, viewMonth+1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();

  // ── LOGIN ─────────────────────────────────────────────────────────────────
  if (!authed) return (
    <main className="min-h-screen bg-[#eee9e1] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="rounded-[2.5rem] border border-[#ded6ca] bg-[#faf8f4] p-9 shadow-sm">
          <div className="mb-6 h-14 w-14 rounded-2xl bg-[#2b2723] flex items-center justify-center text-2xl">🔐</div>
          <h1 className="font-display text-4xl">Admin panel</h1>
          <p className="text-sm text-[#746f68] mt-1 mb-7">MES Detailing</p>
          <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#8b6f47] mb-2">Geslo</label>
          <input
            type="password" value={pw}
            onChange={e => { setPw(e.target.value); setAuthError(false); }}
            onKeyDown={e => e.key==="Enter" && login()}
            className={`w-full rounded-2xl border bg-[#eee9e1] px-5 py-3.5 text-sm mb-1 transition-colors ${authError ? "border-red-300" : "border-[#ded6ca]"}`}
            placeholder="Vnesi geslo..."
          />
          {authError && <p className="text-xs text-red-600 mb-3">Napačno geslo. Preveri .env datoteko.</p>}
          <button onClick={login} className="btn-primary mt-4 w-full rounded-full bg-[#2b2723] py-3.5 font-bold text-[#faf8f4] hover:bg-[#3a342e]">
            Vstopi →
          </button>
        </div>
      </div>
    </main>
  );

  // ── ADMIN PANEL ───────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#eee9e1] px-4 py-10 text-[#24211f]">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-5xl">Admin panel</h1>
            <p className="text-sm text-[#746f68]">MES Detailing · {today.toLocaleDateString("sl-SI",{day:"numeric",month:"long",year:"numeric"})}</p>
          </div>
          <div className="flex items-center gap-3">
            {pending > 0 && (
              <div className="rounded-full bg-amber-100 border border-amber-200 px-4 py-2 text-sm font-bold text-amber-800">
                ⏳ {pending} {pending===1?"čaka":"čakajo"} potrditve
              </div>
            )}
            <button onClick={() => setAuthed(false)} className="rounded-full border border-[#ded6ca] bg-[#faf8f4] px-4 py-2 text-xs font-bold text-[#746f68] hover:border-red-300 hover:text-red-600 transition-colors">
              Odjava
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-7 bg-[#faf8f4] rounded-full border border-[#ded6ca] p-1.5 w-fit">
          {(["bookings","availability"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`rounded-full px-6 py-2 text-sm font-bold transition-all ${tab===t ? "bg-[#2b2723] text-[#faf8f4]" : "text-[#746f68] hover:text-[#24211f]"}`}>
              {t==="bookings" ? `Rezervacije${pending>0?" ("+pending+")":""}` : "Razpored ur"}
            </button>
          ))}
        </div>

        {/* ── BOOKINGS TAB ──────────────────────────────────────────────── */}
        {tab === "bookings" && (
          <div>
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-5">
              {(["pending","confirmed","cancelled","all"] as const).map(f => (
                <button key={f} onClick={() => setBFilter(f)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-bold transition-all ${bFilter===f ? "bg-[#2b2723] text-[#faf8f4] border-[#2b2723]" : "border-[#ded6ca] text-[#746f68] hover:border-[#cfc5b6]"}`}>
                  {f==="all" ? "Vse" : statusLabel[f].split(" ")[1]}
                  {f!=="all" && ` (${bookings.filter(b=>b.status===f).length})`}
                </button>
              ))}
              <button onClick={() => loadBookings(token)} className="ml-auto rounded-full border border-[#ded6ca] px-4 py-1.5 text-xs font-bold text-[#746f68] hover:border-[#8b6f47] transition-colors">
                ↻ Osveži
              </button>
            </div>

            {loadingBookings ? (
              <div className="flex items-center justify-center py-20 text-[#746f68]">
                <div className="h-6 w-6 rounded-full border-2 border-[#ded6ca] border-t-[#8b6f47] animate-spin mr-3"/>
                Nalagam...
              </div>
            ) : filtered.length === 0 ? (
              <div className="rounded-[2rem] border border-[#ded6ca] bg-[#faf8f4] p-14 text-center">
                <div className="text-4xl mb-3">📭</div>
                <p className="font-bold text-[#24211f]">Ni rezervacij</p>
                <p className="text-sm text-[#746f68] mt-1">V tej kategoriji ni nobene rezervacije.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map(b => (
                  <div key={b.id} className="rounded-[2rem] border border-[#ded6ca] bg-[#faf8f4] overflow-hidden shadow-sm">
                    <div className="p-5 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="font-bold text-xl">{b.name}</span>
                            <span className={`rounded-full border px-3 py-0.5 text-xs font-bold ${statusCls[b.status]}`}>
                              {statusLabel[b.status]}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                            <div className="rounded-xl bg-[#eee9e1] px-3 py-2">
                              <p className="text-[10px] font-bold uppercase text-[#8b6f47]">Datum & ura</p>
                              <p className="font-bold mt-0.5">{b.date} · {b.time_slot}</p>
                            </div>
                            <div className="rounded-xl bg-[#eee9e1] px-3 py-2">
                              <p className="text-[10px] font-bold uppercase text-[#8b6f47]">Vozilo</p>
                              <p className="font-bold mt-0.5 truncate">{b.vehicle}</p>
                            </div>
                            <div className="rounded-xl bg-[#eee9e1] px-3 py-2">
                              <p className="text-[10px] font-bold uppercase text-[#8b6f47]">Storitev</p>
                              <p className="font-bold mt-0.5 text-xs">{b.service_name}</p>
                            </div>
                            <div className="rounded-xl bg-[#eee9e1] px-3 py-2">
                              <p className="text-[10px] font-bold uppercase text-[#8b6f47]">Kontakt</p>
                              <a href={`tel:${b.phone}`} className="font-bold mt-0.5 block text-xs hover:text-[#8b6f47]">{b.phone}</a>
                            </div>
                          </div>
                          {b.notes && (
                            <p className="text-sm text-[#746f68] italic bg-[#f5f0ea] rounded-xl px-4 py-2">
                              💬 "{b.notes}"
                            </p>
                          )}
                        </div>
                        <div className="flex md:flex-col gap-2">
                          {b.status !== "confirmed" && (
                            <button onClick={() => updateStatus(b.id,"confirmed")}
                              className="rounded-full bg-green-100 border border-green-200 px-4 py-2 text-xs font-bold text-green-800 hover:bg-green-200 transition-colors whitespace-nowrap">
                              ✓ Potrdi
                            </button>
                          )}
                          {b.status !== "cancelled" && (
                            <button onClick={() => updateStatus(b.id,"cancelled")}
                              className="rounded-full bg-red-100 border border-red-200 px-4 py-2 text-xs font-bold text-red-800 hover:bg-red-200 transition-colors whitespace-nowrap">
                              ✕ Prekliči
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── AVAILABILITY TAB ──────────────────────────────────────────── */}
        {tab === "availability" && (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">

            {/* Calendar */}
            <div className="rounded-[2.5rem] border border-[#ded6ca] bg-[#faf8f4] p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-7">
                <button onClick={() => { if(viewMonth===0){setViewYear(y=>y-1);setViewMonth(11);}else setViewMonth(m=>m-1); }}
                  className="h-11 w-11 rounded-full border border-[#ded6ca] bg-[#eee9e1] hover:bg-[#e0d8cc] transition-colors flex items-center justify-center font-bold text-xl">‹</button>
                <div className="text-center">
                  <h2 className="font-bold text-xl">{MONTHS[viewMonth]}</h2>
                  <p className="text-sm text-[#746f68]">{viewYear}</p>
                </div>
                <button onClick={() => { if(viewMonth===11){setViewYear(y=>y+1);setViewMonth(0);}else setViewMonth(m=>m+1); }}
                  className="h-11 w-11 rounded-full border border-[#ded6ca] bg-[#eee9e1] hover:bg-[#e0d8cc] transition-colors flex items-center justify-center font-bold text-xl">›</button>
              </div>

              <div className="grid grid-cols-7 mb-3">
                {DAY_LABELS.map(d => <div key={d} className="text-center text-xs font-bold text-[#a09890] py-1">{d}</div>)}
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {Array.from({length: firstDay}).map((_,i) => <div key={`e${i}`}/>)}
                {Array.from({length: daysInMonth}).map((_,i) => {
                  const day = i+1;
                  const dateStr = toDateStr(viewYear, viewMonth, day);
                  const info = avail[dateStr];
                  const isOpen = info?.is_open ?? false;
                  const slotCount = info?.slots?.length ?? 0;
                  const isEditing = editingDate === dateStr;
                  const isSaving = savingKey === dateStr;

                  return (
                    <button key={day} onClick={() => { toggleDayOpen(dateStr); setEditingDate(dateStr); }}
                      className={`relative rounded-2xl py-2.5 text-xs font-bold transition-all ${
                        isEditing ? "ring-2 ring-[#8b6f47] scale-105" : ""
                      } ${isOpen ? "bg-[#d8f0e2] text-[#155a30] hover:bg-[#c3e8d0]" : "bg-[#eee9e1] text-[#746f68] hover:bg-[#e0d8cc]"}
                      ${isSaving ? "opacity-50" : ""}`}
                    >
                      <div>{day}</div>
                      {isOpen && <div className="text-[9px] opacity-70 mt-0.5">{slotCount}ur</div>}
                      {isSaving && <div className="absolute inset-0 flex items-center justify-center"><div className="h-3 w-3 rounded-full border border-current border-t-transparent animate-spin"/></div>}
                    </button>
                  );
                })}
              </div>

              <p className="mt-5 text-xs text-[#746f68] border-t border-[#ded6ca] pt-4">
                💡 Klikni na dan da ga <strong>odpre/zapre</strong>. Nato izberi ure na desni.
              </p>
            </div>

            {/* Hour editor */}
            <div className="rounded-[2rem] border border-[#ded6ca] bg-[#faf8f4] p-6 shadow-sm h-fit">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b6f47] mb-1">Nastavi ure</p>
              {!editingDate ? (
                <p className="text-sm text-[#746f68] py-4">Klikni na dan v koledarju da izbereš ure.</p>
              ) : (
                <>
                  <p className="font-bold text-base mb-1">
                    {new Date(editingDate+"T12:00:00").toLocaleDateString("sl-SI",{weekday:"long",day:"numeric",month:"short"})}
                  </p>
                  <p className="text-xs text-[#746f68] mb-4">{avail[editingDate]?.slots?.length ?? 0} izbranih ur</p>

                  {/* Quick templates */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {[
                      {label:"Dopoldne",slots:["08:00","09:00","10:00","11:00"]},
                      {label:"Popoldan",slots:["13:00","14:00","15:00","16:00"]},
                      {label:"Cel dan",slots:["08:00","09:00","10:00","11:00","13:00","14:00","15:00","16:00"]},
                    ].map(({label,slots}) => (
                      <button key={label} onClick={() => applyTemplate(editingDate, slots)}
                        className="rounded-full border border-[#ded6ca] bg-[#eee9e1] px-3 py-1 text-xs font-bold text-[#746f68] hover:border-[#8b6f47] hover:text-[#8b6f47] transition-colors">
                        {label}
                      </button>
                    ))}
                    <button onClick={() => applyTemplate(editingDate, [])}
                      className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-700 hover:bg-red-100 transition-colors">
                      Počisti
                    </button>
                  </div>

                  <div className="space-y-1.5 max-h-[380px] overflow-y-auto">
                    {ALL_HOURS.map(h => {
                      const active = avail[editingDate]?.slots?.includes(h) ?? false;
                      const saving = savingKey === editingDate + h;
                      return (
                        <button key={h} onClick={() => toggleSlot(editingDate, h)}
                          className={`w-full rounded-xl border px-4 py-2.5 text-sm font-bold text-left transition-all flex items-center justify-between ${
                            active ? "bg-[#d8f0e2] border-green-200 text-[#155a30]" : "border-[#ded6ca] text-[#746f68] hover:border-[#cfc5b6]"
                          } ${saving ? "opacity-50" : ""}`}
                        >
                          <span>{h}</span>
                          <span className={`text-xs ${active ? "text-green-600" : "text-[#cfc5b6]"}`}>
                            {saving ? "..." : active ? "✓ prosto" : "zaprto"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

# 🚀 MES Detailing — Navodila za setup

## Kar si dobil

- **Javna stran `/narocanje`** — stranka vidi koledar, zelene/rdeče ure, izbere termin
- **Admin panel `/admin`** — ti nastaviš delovne ure, potrdiš/zavrneš rezervacije
- **Email obvestila** — ob vsaki rezervaciji dobiš mail (potreben Resend)

---

## KORAK 1 — Ustvari Supabase account (brezplačno, 5 min)

1. Pojdi na **https://supabase.com** → klikni **Start your project**
2. Registriraj se z Google ali emailom
3. Klikni **New project**
   - Organization: (pusti privzeto)
   - Name: `mes-detailing`
   - Database Password: izmisli si geslo in ga shrani nekje
   - Region: izberi **Central EU (Frankfurt)**
4. Počakaj ~2 minuti da se projekt zgradi

---

## KORAK 2 — Ustvari tabele v Supabase

1. V levem meniju klikni **SQL Editor**
2. Klikni **New query**
3. Odpri datoteko `supabase/setup.sql` iz tega projekta
4. Kopiraj vso vsebino in jo prilepi v SQL Editor
5. Klikni **Run** (zeleni gumb)
6. Mora pisati: *Success. No rows returned*

---

## KORAK 3 — Kopiraj API ključe

1. V Supabase pojdi na **Settings → API** (levi meni, spodaj)
2. Kopiraj:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY` (klikni na oko da vidiš)

---

## KORAK 4 — Nastavi .env.local

1. V mapi projekta najdi datoteko `.env.local.example`
2. Ustvari kopijo z imenom `.env.local` (brez .example)
3. Zapolni vrednosti:

```
NEXT_PUBLIC_SUPABASE_URL=https://TVOJ_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
ADMIN_SECRET=izmisli_si_geslo123
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> ⚠️ `ADMIN_SECRET` je geslo za `/admin` — izmisli si kaj trdnega

---

## KORAK 5 — Zaženi projekt

```bash
npm install
npm run dev
```

Odpri **http://localhost:3000**

---

## KORAK 6 — Nastavi razpored v admin panelu

1. Odpri **http://localhost:3000/admin**
2. Vnesi geslo ki si ga nastavil v `ADMIN_SECRET`
3. Klikni na zavihek **"Razpored ur"**
4. **Klikni na dan** da ga odpre (obarva se zeleno)
5. Na desni izberi ure ali uporabi hitre predloge:
   - *Dopoldne* = 8, 9, 10, 11
   - *Popoldan* = 13, 14, 15, 16
   - *Cel dan* = vse skupaj
6. Vse se shrani avtomatično

---

## KORAK 7 — Email obvestila (opcijsko)

Brez tega sistem deluje, samo ne dobiš emaila ob rezervaciji.

1. Pojdi na **https://resend.com** → brezplačen account
2. Ustvari API key
3. Dodaj v `.env.local`:
   ```
   RESEND_API_KEY=re_...tvoj_kljuc
   ADMIN_EMAIL=tvoj@email.com
   ```
4. Restart: `npm run dev`

---

## Kako deluje sistem

```
Stranka odpre /narocanje
    → vidi koledar za tekoči mesec
    → zeleni dnevi = ti si nastavil ure
    → klikne na dan → vidi ure (zelena=prosta, rdeča=zasedena)
    → izbere uro + storitev → vnese podatke → pošlje

Ti dobiš email (če je Resend nastavljen)
    → odpre /admin → vnese geslo
    → vidi rezervacijo v zavihku "Rezervacije"
    → klikne "Potrdi" ali "Prekliči"
```

---

## Deploy na Vercel (ko boš pripravljen)

1. Ustvari account na **https://vercel.com**
2. Poveži GitHub repo ali uploadaj projekt
3. V Vercel nastavitvah dodaj vse ENV spremenljivke (enake kot .env.local)
4. Klikni Deploy → dobiš brezplačno domensko ime npr. `mes-detailing.vercel.app`
5. Posodobi `.env` na Vercel: `NEXT_PUBLIC_SITE_URL=https://mes-detailing.vercel.app`

---

## Pogosta vprašanja

**Stranke vidijo "Nalagam..." in nič drugega?**
→ Preveri da sta SUPABASE URL in ANON KEY pravilno nastavljena v .env.local

**Admin pravi "Napačno geslo"?**
→ Preveri ADMIN_SECRET v .env.local — mora biti enako kot kar vpišeš

**Email ne pride?**
→ Preveri RESEND_API_KEY. Na brezplačnem planu Resend-a moraš verificirati svojo domeno ali email.

---

*Vprašanja? Odpri ChatGPT ali Claude in opiši napako ki jo vidiš v terminalu.*

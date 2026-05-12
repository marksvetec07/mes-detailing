import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, phone, email, vehicle, service_id, service_name, date, time_slot, notes } = body;

  if (!name || !phone || !date || !time_slot || !service_id) {
    return NextResponse.json({ error: "Manjkajoči podatki" }, { status: 400 });
  }

  const supabase = createServiceClient();

  // Check slot is still free
  const { data: existing } = await supabase
    .from("bookings")
    .select("id")
    .eq("date", date)
    .eq("time_slot", time_slot)
    .in("status", ["pending", "confirmed"])
    .single();

  if (existing) {
    return NextResponse.json({ error: "Ta termin je že zaseden." }, { status: 409 });
  }

  const { data, error } = await supabase
    .from("bookings")
    .insert({ name, phone, email, vehicle, service_id, service_name, date, time_slot, notes, status: "pending" })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Send email notification (optional — needs RESEND_API_KEY env var)
  try {
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "MES Detailing <noreply@mesdetailing.si>",
        to: process.env.ADMIN_EMAIL ?? "admin@mesdetailing.si",
        subject: `Novo povpraševanje — ${name} · ${date} ${time_slot}`,
        html: `
          <h2>Novo povpraševanje za termin</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;border:1px solid #eee"><b>Ime</b></td><td style="padding:8px;border:1px solid #eee">${name}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee"><b>Telefon</b></td><td style="padding:8px;border:1px solid #eee">${phone}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee"><b>Email</b></td><td style="padding:8px;border:1px solid #eee">${email ?? "—"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee"><b>Vozilo</b></td><td style="padding:8px;border:1px solid #eee">${vehicle}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee"><b>Storitev</b></td><td style="padding:8px;border:1px solid #eee">${service_name}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee"><b>Datum</b></td><td style="padding:8px;border:1px solid #eee">${date}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee"><b>Ura</b></td><td style="padding:8px;border:1px solid #eee">${time_slot}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee"><b>Opombe</b></td><td style="padding:8px;border:1px solid #eee">${notes ?? "—"}</td></tr>
          </table>
          <p style="margin-top:20px"><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin">Odpri admin panel →</a></p>
        `,
      });
    }
  } catch (e) {
    console.error("Email failed:", e);
  }

  return NextResponse.json({ success: true, booking: data });
}

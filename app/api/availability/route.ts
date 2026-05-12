import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month"); // "2026-05"

  if (!month) return NextResponse.json({ error: "Missing month" }, { status: 400 });

  const supabase = createServiceClient();

  // Get availability settings for month
  const { data: availability } = await supabase
    .from("availability")
    .select("*")
    .gte("date", `${month}-01`)
    .lte("date", `${month}-31`);

  // Get confirmed bookings for month
  const { data: bookings } = await supabase
    .from("bookings")
    .select("date, time_slot")
    .gte("date", `${month}-01`)
    .lte("date", `${month}-31`)
    .in("status", ["pending", "confirmed"]);

  return NextResponse.json({ availability: availability ?? [], bookings: bookings ?? [] });
}

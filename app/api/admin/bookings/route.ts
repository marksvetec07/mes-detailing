import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

function checkAuth(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  return token === process.env.ADMIN_SECRET;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("bookings")
    .select("*")
    .order("date", { ascending: true })
    .order("time_slot", { ascending: true });
  return NextResponse.json({ bookings: data ?? [] });
}

export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, status } = await req.json();
  const supabase = createServiceClient();
  const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

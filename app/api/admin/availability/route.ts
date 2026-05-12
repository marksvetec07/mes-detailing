import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

function checkAuth(req: NextRequest) {
  return req.headers.get("x-admin-token") === process.env.ADMIN_SECRET;
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json(); // { date, is_open, slots }
  const supabase = createServiceClient();

  const { error } = await supabase
    .from("availability")
    .upsert({ ...body }, { onConflict: "date" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("availability")
    .select("*")
    .gte("date", `${month}-01`)
    .lte("date", `${month}-31`)
    .order("date");
  return NextResponse.json({ availability: data ?? [] });
}

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, anonKey);

// Server-side client with service role (for admin operations)
export function createServiceClient() {
  return createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!);
}

// Types
export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface Booking {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  service_id: string;
  service_name: string;
  date: string;       // "2026-05-15"
  time_slot: string;  // "09:00"
  notes: string;
  status: BookingStatus;
}

export interface AvailabilityDay {
  id: string;
  date: string;         // "2026-05-15"
  is_open: boolean;
  slots: string[];      // ["09:00","10:00","11:00"]
}

export interface BlockedSlot {
  id: string;
  date: string;
  time_slot: string;
}

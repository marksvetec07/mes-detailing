-- Zaženi ta SQL v Supabase SQL Editor

-- 1. Tabela za razpored (kateri dnevi in ure so odprti)
create table if not exists availability (
  id uuid primary key default gen_random_uuid(),
  date date not null unique,
  is_open boolean not null default false,
  slots text[] not null default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Tabela za rezervacije
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  phone text not null,
  email text,
  vehicle text not null,
  service_id text not null,
  service_name text not null,
  date date not null,
  time_slot text not null,
  notes text,
  status text not null default 'pending' check (status in ('pending','confirmed','cancelled'))
);

-- 3. Row Level Security — javni dostop za branje availability (stranke)
alter table availability enable row level security;
create policy "Public can read availability" on availability for select using (true);

-- 4. Bookings so samo serverside (service role)
alter table bookings enable row level security;
-- Brez public policy — dostop samo prek service role key

-- 5. Index za hitrejše poizvedbe
create index if not exists bookings_date_idx on bookings(date);
create index if not exists availability_date_idx on availability(date);

-- Pripravljeno! ✅

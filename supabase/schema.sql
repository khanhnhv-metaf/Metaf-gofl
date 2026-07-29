-- Run this in the Supabase SQL editor for your project.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  contact_info text not null,
  package text,
  travel_date date,
  guests integer,
  note text
);

alter table public.leads enable row level security;

-- Allow anonymous visitors to submit a lead (insert only, no read/update/delete).
create policy "Anyone can submit a lead"
  on public.leads
  for insert
  to anon
  with check (true);

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

-- Golf courses shown on the homepage teaser, /golf list and /golf/[slug] detail page.
-- Managed from /admin instead of being hardcoded in src/lib/translations.ts.
create table if not exists public.golf_courses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  slug text not null unique,
  display_order integer not null default 0,
  featured_on_home boolean not null default false,

  name_vi text not null,
  name_kr text not null,
  location_vi text not null,
  location_kr text not null,
  distance_vi text not null,               -- e.g. "~45 phút từ trung tâm Hà Nội"
  distance_kr text not null,
  distance_from_homestay_vi text,          -- e.g. "~12 km"; only set for homepage-featured courses
  distance_from_homestay_kr text,
  holes_vi text not null,
  holes_kr text not null,
  highlight_vi text not null,
  highlight_kr text not null,
  text_vi text not null,
  text_kr text not null,
  details_vi text[] not null default '{}',
  details_kr text[] not null default '{}',

  images text[] not null default '{}',     -- Storage public URLs; images[0] is the cover photo
  video_url text                            -- single flycam video (Storage public URL)
);

alter table public.golf_courses enable row level security;

create policy "Anyone can read golf courses"
  on public.golf_courses
  for select
  to anon, authenticated
  using (true);

create policy "Admins can insert golf courses"
  on public.golf_courses
  for insert
  to authenticated
  with check (true);

create policy "Admins can update golf courses"
  on public.golf_courses
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Admins can delete golf courses"
  on public.golf_courses
  for delete
  to authenticated
  using (true);

-- Service packages shown in the "Gói dịch vụ" / "패키지" section on the homepage.
-- Managed from /admin instead of being hardcoded in src/lib/translations.ts.
create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  slug text not null unique,
  display_order integer not null default 0,
  featured boolean not null default false,
  flight_included boolean not null default false,

  tag_vi text not null,
  tag_kr text not null,
  name_vi text not null,
  name_kr text not null,
  text_vi text not null,
  text_kr text not null,
  includes_vi text[] not null default '{}',
  includes_kr text[] not null default '{}',

  image_url text
);

alter table public.packages enable row level security;

create policy "Anyone can read packages"
  on public.packages
  for select
  to anon, authenticated
  using (true);

create policy "Admins can insert packages"
  on public.packages
  for insert
  to authenticated
  with check (true);

create policy "Admins can update packages"
  on public.packages
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Admins can delete packages"
  on public.packages
  for delete
  to authenticated
  using (true);

-- Golf-course photos/flycam videos and package photos are stored in Cloudflare R2
-- (see src/lib/r2/), not Supabase Storage — no storage.objects policies needed here.

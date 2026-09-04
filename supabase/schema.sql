-- PlacementPilot Phase 1 schema. Run this once in a new Supabase project's SQL Editor.
-- This script contains no sample or generated student data.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  avatar_url text,
  college text,
  branch text,
  graduation_year integer check (graduation_year between 2000 and 2100),
  current_semester integer check (current_semester between 1 and 20),
  skills text[] not null default '{}',
  career_interests text[] not null default '{}',
  career_goals text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.academic_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  semester integer not null check (semester between 1 and 20),
  sgpa numeric(4,2) check (sgpa between 0 and 10),
  cgpa numeric(4,2) check (cgpa between 0 and 10),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, semester)
);

create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  semester integer not null check (semester between 1 and 20),
  name text not null check (char_length(trim(name)) > 0),
  marks numeric(5,2) check (marks >= 0),
  completion integer not null default 0 check (completion between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null check (char_length(trim(title)) > 0),
  description text,
  due_date date not null,
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high')),
  is_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists academic_records_user_semester_idx on public.academic_records (user_id, semester);
create index if not exists subjects_user_semester_idx on public.subjects (user_id, semester);
create index if not exists tasks_user_due_date_idx on public.tasks (user_id, due_date);

create or replace function public.set_updated_at()
returns trigger language plpgsql security invoker set search_path = public as $$
begin new.updated_at = now(); return new; end;
$$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id) values (new.id) on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at before update on public.profiles for each row execute procedure public.set_updated_at();
drop trigger if exists set_academic_records_updated_at on public.academic_records;
create trigger set_academic_records_updated_at before update on public.academic_records for each row execute procedure public.set_updated_at();
drop trigger if exists set_subjects_updated_at on public.subjects;
create trigger set_subjects_updated_at before update on public.subjects for each row execute procedure public.set_updated_at();
drop trigger if exists set_tasks_updated_at on public.tasks;
create trigger set_tasks_updated_at before update on public.tasks for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.academic_records enable row level security;
alter table public.subjects enable row level security;
alter table public.tasks enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_insert_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "profiles_delete_own" on public.profiles;
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "profiles_delete_own" on public.profiles for delete using (auth.uid() = id);

drop policy if exists "academic_records_select_own" on public.academic_records;
drop policy if exists "academic_records_insert_own" on public.academic_records;
drop policy if exists "academic_records_update_own" on public.academic_records;
drop policy if exists "academic_records_delete_own" on public.academic_records;
create policy "academic_records_select_own" on public.academic_records for select using (auth.uid() = user_id);
create policy "academic_records_insert_own" on public.academic_records for insert with check (auth.uid() = user_id);
create policy "academic_records_update_own" on public.academic_records for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "academic_records_delete_own" on public.academic_records for delete using (auth.uid() = user_id);

drop policy if exists "subjects_select_own" on public.subjects;
drop policy if exists "subjects_insert_own" on public.subjects;
drop policy if exists "subjects_update_own" on public.subjects;
drop policy if exists "subjects_delete_own" on public.subjects;
create policy "subjects_select_own" on public.subjects for select using (auth.uid() = user_id);
create policy "subjects_insert_own" on public.subjects for insert with check (auth.uid() = user_id);
create policy "subjects_update_own" on public.subjects for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "subjects_delete_own" on public.subjects for delete using (auth.uid() = user_id);

drop policy if exists "tasks_select_own" on public.tasks;
drop policy if exists "tasks_insert_own" on public.tasks;
drop policy if exists "tasks_update_own" on public.tasks;
drop policy if exists "tasks_delete_own" on public.tasks;
create policy "tasks_select_own" on public.tasks for select using (auth.uid() = user_id);
create policy "tasks_insert_own" on public.tasks for insert with check (auth.uid() = user_id);
create policy "tasks_update_own" on public.tasks for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "tasks_delete_own" on public.tasks for delete using (auth.uid() = user_id);

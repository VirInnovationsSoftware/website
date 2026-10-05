-- Careers admin foundation. Memberships are provisioned through the Supabase
-- dashboard/SQL editor by a trusted project owner; clients cannot write them.
create table if not exists public.admin_memberships (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null check (role in ('hr', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.admin_memberships enable row level security;
revoke all on public.admin_memberships from anon, authenticated;
grant select on public.admin_memberships to authenticated;

create policy "Users can read their own admin membership"
  on public.admin_memberships for select to authenticated
  using (user_id = (select auth.uid()));

-- This helper avoids recursive RLS when jobs policies check membership.
create or replace function public.is_careers_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admin_memberships m
    where m.user_id = (select auth.uid())
      and m.role in ('hr', 'admin')
  );
$$;
revoke all on function public.is_careers_admin() from public;
grant execute on function public.is_careers_admin() to authenticated;

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  department text,
  location text,
  employment_type text,
  description text,
  requirements text,
  responsibilities text,
  qualifications text,
  experience text,
  jd_url text,
  google_form_url text,
  status text not null default 'draft' check (status in ('draft', 'published', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid not null default auth.uid() references auth.users (id) on delete restrict,
  published_at timestamptz,
  closed_at timestamptz
);

alter table public.jobs enable row level security;
revoke all on public.jobs from anon, authenticated;
grant select on public.jobs to anon, authenticated;
grant insert, update on public.jobs to authenticated;

create policy "Public can read published jobs"
  on public.jobs for select to anon
  using (status = 'published');

create policy "Authenticated users can read published jobs and admins can read all"
  on public.jobs for select to authenticated
  using (status = 'published' or public.is_careers_admin());

create policy "Authorized admins can create jobs"
  on public.jobs for insert to authenticated
  with check (public.is_careers_admin() and created_by = (select auth.uid()));

create policy "Authorized admins can update jobs"
  on public.jobs for update to authenticated
  using (public.is_careers_admin())
  with check (public.is_careers_admin());

create or replace function public.touch_job_timestamps()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  if tg_op = 'INSERT' and new.status = 'published' and new.published_at is null then
    new.published_at := now();
  elsif tg_op = 'INSERT' and new.status = 'closed' and new.closed_at is null then
    new.closed_at := now();
  elsif tg_op = 'UPDATE' and new.status = 'published' and old.status is distinct from 'published' then
    new.published_at := now();
    new.closed_at := null;
  elsif tg_op = 'UPDATE' and new.status = 'closed' and old.status is distinct from 'closed' then
    new.closed_at := now();
  elsif new.status = 'draft' then
    new.closed_at := null;
  end if;
  return new;
end;
$$;

create trigger jobs_touch_timestamps
  before insert or update on public.jobs
  for each row execute function public.touch_job_timestamps();

create index if not exists jobs_status_created_at_idx on public.jobs (status, created_at desc);

-- Admin-only job details. Applications are collected by Google Forms, which
-- stores them in a linked Google Sheet; HR saves that Sheet's link here so the
-- admin page can open it. Kept out of public.jobs so anonymous visitors can
-- never read it.
create table if not exists public.job_private (
  job_id uuid primary key references public.jobs (id) on delete cascade,
  responses_url text,
  updated_at timestamptz not null default now()
);

alter table public.job_private enable row level security;
revoke all on public.job_private from anon, authenticated;
grant select, insert, update on public.job_private to authenticated;

create policy "Authorized admins can read private job details"
  on public.job_private for select to authenticated
  using (public.is_careers_admin());

create policy "Authorized admins can create private job details"
  on public.job_private for insert to authenticated
  with check (public.is_careers_admin());

create policy "Authorized admins can update private job details"
  on public.job_private for update to authenticated
  using (public.is_careers_admin())
  with check (public.is_careers_admin());

-- Let HR remove jobs posted by mistake (job_private rows cascade).
grant delete on public.jobs to authenticated;

create policy "Authorized admins can delete jobs"
  on public.jobs for delete to authenticated
  using (public.is_careers_admin());

-- Shareable job links (/careers/<slug>). The slug is set once when a job is
-- created, from its title plus a short piece of its id, and never changes, so
-- links already shared keep working if the title is edited later.
alter table public.jobs add column if not exists slug text;

create or replace function public.set_job_slug()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.slug is null or new.slug = '' then
    new.slug := concat_ws('-',
      nullif(trim(both '-' from regexp_replace(lower(new.title), '[^a-z0-9]+', '-', 'g')), ''),
      left(replace(new.id::text, '-', ''), 6));
  end if;
  return new;
end;
$$;

create trigger jobs_set_slug
  before insert on public.jobs
  for each row execute function public.set_job_slug();

-- Give jobs that already exist a slug too.
update public.jobs
set slug = concat_ws('-',
  nullif(trim(both '-' from regexp_replace(lower(title), '[^a-z0-9]+', '-', 'g')), ''),
  left(replace(id::text, '-', ''), 6))
where slug is null;

alter table public.jobs alter column slug set not null;
create unique index if not exists jobs_slug_idx on public.jobs (slug);

-- Messages from the website's Contact form. Visitors can only add a message;
-- only careers admins can read, mark handled or delete them.
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (char_length(email) between 3 and 320 and email like '%_@_%'),
  phone text check (char_length(phone) <= 40),
  message text not null check (char_length(message) between 1 and 5000),
  handled boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;
revoke all on public.contact_messages from anon, authenticated;
grant insert (name, email, phone, message) on public.contact_messages to anon, authenticated;
grant select, update (handled), delete on public.contact_messages to authenticated;

create policy "Anyone can send a contact message"
  on public.contact_messages for insert to anon, authenticated
  with check (handled = false);

create policy "Admins can read contact messages"
  on public.contact_messages for select to authenticated
  using (public.is_careers_admin());

create policy "Admins can mark contact messages handled"
  on public.contact_messages for update to authenticated
  using (public.is_careers_admin())
  with check (public.is_careers_admin());

create policy "Admins can delete contact messages"
  on public.contact_messages for delete to authenticated
  using (public.is_careers_admin());

-- Flood guard: refuse new messages when more than 20 arrived in the last 10
-- minutes. Runs as the table owner because visitors cannot read the table.
create or replace function public.limit_contact_messages()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select count(*) from public.contact_messages
      where created_at > now() - interval '10 minutes') >= 20 then
    raise exception 'Too many messages right now. Please try again later.'
      using errcode = 'P0001';
  end if;
  return new;
end;
$$;
revoke all on function public.limit_contact_messages() from public;

create trigger contact_messages_rate_limit
  before insert on public.contact_messages
  for each row execute function public.limit_contact_messages();

create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);

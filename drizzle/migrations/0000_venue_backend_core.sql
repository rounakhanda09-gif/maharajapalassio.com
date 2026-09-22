-- Roles enum
create type public.app_role as enum ('admin', 'staff');

-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "Staff read own profile" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "Staff update own profile" on public.profiles for update to authenticated using (auth.uid() = id);

-- Roles table (never on profiles)
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

-- Enquiries
create table public.event_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  event_type text,
  preferred_date text,
  message text,
  status text not null default 'new' check (status in ('new','contacted','closed')),
  staff_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, update on public.event_enquiries to authenticated;
grant all on public.event_enquiries to service_role;
alter table public.event_enquiries enable row level security;
create policy "Staff read enquiries" on public.event_enquiries for select to authenticated
  using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'staff'));
create policy "Staff update enquiries" on public.event_enquiries for update to authenticated
  using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'staff'));

create index event_enquiries_created_at_idx on public.event_enquiries (created_at desc);
create index event_enquiries_phone_created_idx on public.event_enquiries (phone, created_at desc);

-- Status history (audit)
create table public.enquiry_status_history (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null references public.event_enquiries(id) on delete cascade,
  from_status text,
  to_status text not null,
  changed_by uuid,
  changed_at timestamptz not null default now()
);
grant select on public.enquiry_status_history to authenticated;
grant all on public.enquiry_status_history to service_role;
alter table public.enquiry_status_history enable row level security;
create policy "Staff read status history" on public.enquiry_status_history for select to authenticated
  using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'staff'));

create or replace function public.touch_enquiry()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at := now();
  if new.status is distinct from old.status then
    insert into public.enquiry_status_history (enquiry_id, from_status, to_status, changed_by)
    values (new.id, old.status, new.status, auth.uid());
  end if;
  return new;
end;
$$;

create trigger event_enquiries_touch
before update on public.event_enquiries
for each row execute function public.touch_enquiry();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

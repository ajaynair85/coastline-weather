create table if not exists public.subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  stripe_customer_id text not null,
  stripe_subscription_id text not null unique,
  status text not null,
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

create policy "Users can view their own subscription"
on public.subscriptions for select
to authenticated
using (auth.uid() = user_id);

create table if not exists public.site_visitors (
  visitor_id uuid primary key,
  first_seen timestamptz not null default now(),
  last_seen timestamptz not null default now(),
  city text,
  region text,
  country text
);

alter table public.site_visitors add column if not exists last_seen timestamptz not null default now();
alter table public.site_visitors add column if not exists city text;
alter table public.site_visitors add column if not exists region text;
alter table public.site_visitors add column if not exists country text;

alter table public.site_visitors enable row level security;

create or replace function public.get_site_visitor_count()
returns bigint
language sql
security definer
set search_path = public
as $$
  select count(*) from public.site_visitors;
$$;

drop function if exists public.record_site_visit(uuid);

create or replace function public.record_site_visit(
  p_visitor_id uuid,
  p_city text,
  p_region text,
  p_country text
)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.site_visitors (visitor_id, city, region, country)
  values (p_visitor_id, p_city, p_region, p_country)
  on conflict (visitor_id) do update
  set last_seen = now(),
      city = coalesce(excluded.city, site_visitors.city),
      region = coalesce(excluded.region, site_visitors.region),
      country = coalesce(excluded.country, site_visitors.country);

  return (select count(*) from public.site_visitors);
end;
$$;

revoke all on function public.get_site_visitor_count() from public;
revoke all on function public.record_site_visit(uuid, text, text, text) from public;
grant execute on function public.get_site_visitor_count() to anon, authenticated;
grant execute on function public.record_site_visit(uuid, text, text, text) to anon, authenticated;

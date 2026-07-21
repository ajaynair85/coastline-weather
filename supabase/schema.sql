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
  first_seen timestamptz not null default now()
);

alter table public.site_visitors enable row level security;

create or replace function public.get_site_visitor_count()
returns bigint
language sql
security definer
set search_path = public
as $$
  select count(*) from public.site_visitors;
$$;

create or replace function public.record_site_visit(p_visitor_id uuid)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.site_visitors (visitor_id)
  values (p_visitor_id)
  on conflict do nothing;

  return (select count(*) from public.site_visitors);
end;
$$;

revoke all on function public.get_site_visitor_count() from public;
revoke all on function public.record_site_visit(uuid) from public;
grant execute on function public.get_site_visitor_count() to anon, authenticated;
grant execute on function public.record_site_visit(uuid) to anon, authenticated;

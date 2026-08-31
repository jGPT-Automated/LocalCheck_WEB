create table if not exists public.court_time_intents (
  id uuid primary key default gen_random_uuid(),
  court_key text not null check (char_length(court_key) between 2 and 160),
  user_id uuid not null references auth.users(id) on delete cascade,
  planned_for date not null,
  time_slot text not null check (time_slot in ('16:00', '18:00', '20:00', '22:00')),
  created_at timestamptz not null default now(),
  unique (court_key, user_id, planned_for, time_slot)
);

create index if not exists court_time_intents_heatmap_index
  on public.court_time_intents (court_key, planned_for, time_slot);

alter table public.court_time_intents enable row level security;

drop policy if exists "Players can view their own court plans" on public.court_time_intents;
create policy "Players can view their own court plans"
on public.court_time_intents
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Players can add their own court plans" on public.court_time_intents;
create policy "Players can add their own court plans"
on public.court_time_intents
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Players can remove their own court plans" on public.court_time_intents;
create policy "Players can remove their own court plans"
on public.court_time_intents
for delete
to authenticated
using ((select auth.uid()) = user_id);

revoke all on table public.court_time_intents from anon, authenticated;
grant select, insert, delete on table public.court_time_intents to authenticated;
grant all on table public.court_time_intents to service_role;

create or replace function public.get_court_time_intent_counts(
  p_court_key text,
  p_start_date date,
  p_end_date date
)
returns table (
  planned_for date,
  time_slot text,
  attendee_count bigint
)
language sql
stable
security definer
set search_path = public
as $$
  select
    intent.planned_for,
    intent.time_slot,
    count(*)::bigint as attendee_count
  from public.court_time_intents as intent
  where intent.court_key = p_court_key
    and intent.planned_for between p_start_date and p_end_date
  group by intent.planned_for, intent.time_slot;
$$;

revoke all on function public.get_court_time_intent_counts(text, date, date) from public;
grant execute on function public.get_court_time_intent_counts(text, date, date) to anon, authenticated, service_role;

comment on table public.court_time_intents is
  'Authenticated weekly court plans. Individual rows are private; the public heatmap reads only aggregate counts.';
comment on function public.get_court_time_intent_counts(text, date, date) is
  'Privacy-safe aggregate attendance for the weekly court heatmap.';

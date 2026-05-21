create table if not exists crm_leads (
  id text primary key,
  workspace_slug text not null default 'dikhao-clinics',
  business_name text not null,
  category text,
  address text,
  phone text,
  website text,
  maps_url text,
  rating text,
  reviews_count text,
  city text,
  locality text,
  source text,
  standalone_flag text,
  simple_offer_flag text,
  notes text,
  message_draft text,
  priority_score integer,
  priority_band text,
  ready_for_outreach boolean default false,
  status text,
  first_sent_date date,
  follow_up_1_date date,
  follow_up_2_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists crm_leads_workspace_idx on crm_leads (workspace_slug);
create index if not exists crm_leads_status_idx on crm_leads (status);
create index if not exists crm_leads_priority_idx on crm_leads (priority_band);
create index if not exists crm_leads_city_idx on crm_leads (city);

create table if not exists crm_lead_activities (
  id text primary key,
  workspace_slug text not null default 'dikhao-clinics',
  lead_id text not null references crm_leads(id) on delete cascade,
  activity_type text,
  body text,
  created_at timestamptz default now()
);

create index if not exists crm_lead_activities_workspace_idx on crm_lead_activities (workspace_slug);
create index if not exists crm_lead_activities_lead_idx on crm_lead_activities (lead_id);

alter table crm_leads enable row level security;
alter table crm_lead_activities enable row level security;

drop policy if exists "anon full access leads" on crm_leads;
create policy "anon full access leads"
on crm_leads
for all
using (true)
with check (true);

drop policy if exists "anon full access activities" on crm_lead_activities;
create policy "anon full access activities"
on crm_lead_activities
for all
using (true)
with check (true);

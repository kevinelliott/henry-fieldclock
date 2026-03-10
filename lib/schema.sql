create table companies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  overtime_threshold_hours numeric default 8,
  gps_radius_feet integer default 500,
  created_at timestamptz default now()
);

create table workers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  role text default 'field',
  hourly_rate numeric,
  worker_token text unique default substring(md5(random()::text), 1, 12),
  is_active boolean default true,
  created_at timestamptz default now()
);

create table jobs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  name text not null,
  client_name text,
  address text,
  latitude numeric,
  longitude numeric,
  status text default 'active',
  start_date date,
  end_date date,
  created_at timestamptz default now()
);

create table time_entries (
  id uuid primary key default gen_random_uuid(),
  worker_id uuid references workers(id) on delete cascade,
  job_id uuid references jobs(id),
  clock_in timestamptz not null,
  clock_out timestamptz,
  clock_in_lat numeric,
  clock_in_lng numeric,
  clock_out_lat numeric,
  clock_out_lng numeric,
  hours_worked numeric,
  notes text,
  created_at timestamptz default now()
);

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text default 'free',
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

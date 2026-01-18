-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Family Members Table
create table family_members (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  role text not null, -- 'Admin', 'Member', etc.
  avatar_url text,
  monthly_income numeric default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Accounts Table (Combines BankAccount and CreditCard for simplicity)
create table accounts (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  type text not null, -- 'bank' or 'credit'
  institution text,
  balance numeric default 0, -- For bank accounts
  limit_amount numeric default 0, -- For credit cards
  current_bill numeric default 0, -- For credit cards
  closing_day integer, -- For credit cards
  due_day integer, -- For credit cards
  last_digits text,
  theme text, -- 'black', 'lime', 'white'
  holder_id uuid references family_members(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Transactions Table
create table transactions (
  id uuid default uuid_generate_v4() primary key,
  description text not null,
  amount numeric not null,
  type text not null check (type in ('income', 'expense')),
  category text not null,
  date timestamp with time zone not null,
  account_id uuid references accounts(id),
  member_id uuid references family_members(id),
  is_paid boolean default false,
  installments integer default 1,
  is_recurring boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Goals Table
create table goals (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  target_amount numeric not null,
  current_amount numeric default 0,
  deadline timestamp with time zone,
  icon text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert Mock Data (Optional - to match current state)

-- Insert a default user
INSERT INTO family_members (name, role, monthly_income)
VALUES ('Alex Silva', 'Admin', 9000);

-- Enable Row Level Security (RLS) - Recommended
alter table family_members enable row level security;
alter table accounts enable row level security;
alter table transactions enable row level security;
alter table goals enable row level security;

-- Create policies (Open for public for now for ease of prototype, restrict later!)
create policy "Enable all access for all users" on family_members for all using (true);
create policy "Enable all access for all users" on accounts for all using (true);
create policy "Enable all access for all users" on transactions for all using (true);
create policy "Enable all access for all users" on goals for all using (true);

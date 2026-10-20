# KenyaDate - Location-Based Dating for Kenya

A modern location-based matchmaking platform for people in Kenya to connect, swipe, match, and chat.

**Live Site:** [kenya-date-match.netlify.app](https://kenya-date-match.netlify.app) (after linking)

## Features

- User registration & login (Supabase Auth)
- Profile setup (bio, age, county, interests)
- GPS location tracking
- Location-based matching (nearby users)
- Swipe / Like / Match
- Real-time chat (Supabase Realtime)
- Photo uploads (Supabase Storage)
- Filters: county, distance, age, tribe, interests, religion, lifestyle
- Safety / report system (planned)
- Premium features & M-Pesa (optional, planned)
- Localized for Kenya: counties, Sheng vibes, student/professional/church modes

## Tech Stack

- **Frontend:** Next.js 16 (App Router) + TypeScript + Tailwind CSS
- **Backend / DB / Auth / Storage / Realtime:** Supabase (PostgreSQL + PostGIS recommended)
- **Hosting:** Netlify
- **Repo:** GitHub

## Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. In Project Settings → API, copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon / public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Database Schema

Run this SQL in the Supabase SQL Editor:

```sql
-- Enable PostGIS for location queries (recommended)
create extension if not exists postgis;

-- Profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  full_name text,
  bio text,
  age int check (age >= 18),
  gender text,
  county text,
  tribe text,
  religion text,
  interests text[],
  lifestyle text,
  avatar_url text,
  location geography(POINT, 4326),  -- for PostGIS distance queries
  latitude float,
  longitude float,
  is_premium boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone" on profiles
  for select using (true);

create policy "Users can insert their own profile" on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

-- Matches table
create table public.matches (
  id uuid default gen_random_uuid() primary key,
  user1 uuid references auth.users,
  user2 uuid references auth.users,
  created_at timestamptz default now(),
  unique(user1, user2)
);

-- Messages table
create table public.messages (
  id uuid default gen_random_uuid() primary key,
  match_id uuid references matches,
  sender_id uuid references auth.users,
  content text,
  created_at timestamptz default now()
);

-- Enable realtime
alter publication supabase_realtime add table messages;
alter publication supabase_realtime add table matches;
```

### 3. Environment Variables

Create `.env.local` locally (and add the same in Netlify UI):

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Local Development

```bash
npm install
npm run dev
```

### 5. Deploy to Netlify

1. Connect the GitHub repo `gachiesamuel14/kenya-date-match` to the Netlify site `kenya-date-match`.
2. Build command: `npm run build`
3. Publish directory: `.next` (or leave default for Next.js)
4. Add environment variables in Netlify dashboard.
5. Deploy.

### Next Steps / To Implement Fully

- Complete swipe UI with cards
- Matching algorithm using PostGIS `ST_DWithin` or distance calculation
- Real-time chat UI
- Photo upload to Supabase Storage bucket
- Report / block system
- Premium subscriptions (Stripe or M-Pesa via Daraja API)
- Push notifications
- Admin moderation

## License

MIT
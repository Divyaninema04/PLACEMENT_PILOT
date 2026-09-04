<<<<<<< HEAD
# PlacementPilot

A private, Supabase-backed workspace for students to manage their profile, academics, and daily placement preparation.

## Setup

1. Create a Supabase project and run [`supabase/schema.sql`](supabase/schema.sql) in its SQL editor before creating users. It creates the tables, indexes, RLS policies, and profile trigger.
2. In Supabase Authentication, enable Email auth. For development, set the Site URL to `http://127.0.0.1:5173` and add `http://127.0.0.1:5173/dashboard` to Redirect URLs. Keep email confirmation enabled for production.
3. Copy `.env.example` to `.env`, then add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from Supabase Project Settings → API. Never use a service-role key in the browser.
4. Install dependencies with `pnpm install` and start the project with `pnpm dev`.

The project intentionally shows empty states until the signed-in student adds their own data.
=======
# PLACEMENT_PILOT
ALL IN ONE PLACEMENT PREPARATION SOFTWARE
PLACEMENT PILOT is an AII POWERED all in one platform for placement preparation. It is for any student pursuing there bachelors or masters degree in any tech related courses confused about what skills to learn, which companies to target, his/her preparation, and looking forward to guidance. Many students face several problems while preparing for placements. Don't know where to start? Where do you stand? It gets you ready for facing the real world placement challenges, no multiple platforms just one platform and one path. It is different from other platforms as it provides personalized AI guidance and tracks your progress regularly, also sends you reminder.
>>>>>>> 96bf5f7e6da60431cc0cbd5acec18f278b8ab8a3

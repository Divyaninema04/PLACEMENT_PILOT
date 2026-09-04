# PlacementPilot

A private, Supabase-backed workspace for students to manage their profile, academics, and daily placement preparation.

## Setup

1. Create a Supabase project and run [`supabase/schema.sql`](supabase/schema.sql) in its SQL editor before creating users. It creates the tables, indexes, RLS policies, and profile trigger.
2. In Supabase Authentication, enable Email auth. For development, set the Site URL to `http://127.0.0.1:5173` and add `http://127.0.0.1:5173/dashboard` to Redirect URLs. Keep email confirmation enabled for production.
3. Copy `.env.example` to `.env`, then add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from Supabase Project Settings → API. Never use a service-role key in the browser.
4. Install dependencies with `pnpm install` and start the project with `pnpm dev`.

The project intentionally shows empty states until the signed-in student adds their own data.

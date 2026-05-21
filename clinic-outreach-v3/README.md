# Dikhao CRM V3

Next.js direction for the real hosted product.

## What this is
- login-first app shell
- protected dashboard route
- temporary passcode gate for development
- server route scaffold for Apify lead finding
- ready to evolve into Supabase auth + real CRM

## Routes
- `/` landing
- `/login` login page
- `/dashboard` protected dashboard shell
- `/api/auth/demo-login` temporary login handler
- `/api/find-leads` server-side lead finder placeholder

## Why this direction is better
- real app structure
- better future hosting story
- secrets stay server-side
- easier to add auth, database, roles, and proper CRM flows

## Dev
```bash
npm install
npm run dev
```

## Env
Copy `.env.example` to `.env.local` and fill what you want to use.

## Important
This is the product architecture direction, not the fully wired final CRM yet.
Next step is replacing the temporary passcode gate with Supabase auth and then wiring the live lead finder route.

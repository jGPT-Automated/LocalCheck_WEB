# LocalCheck web auth

The court planner uses Supabase email/password authentication and the
`court_time_intents` migration. Individual plans are protected by row-level
security; the weekly grid reads only aggregate counts.

For the hosted Supabase project:

1. Run all migrations in `supabase/migrations`.
2. In **Authentication → Providers → Email**, keep email/password enabled and
   turn off **Confirm email**. This matches `supabase/config.toml` for local
   development and lets a new account receive a session immediately.
3. Set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` in the web runtime.

If confirmation is still enabled, the sign-up form reports that mismatch
instead of pretending the user is signed in.

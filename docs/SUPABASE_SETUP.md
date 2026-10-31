# Supabase Setup & Migration Guide

This step-by-step guide explains how to apply the Echo database migrations to your Supabase project using the Supabase SQL Editor.

---

## 1. Prerequisites & Environment Setup

### Step 1.1: Obtain Supabase API Credentials
1. Open your browser and navigate to your **[Supabase Dashboard](https://supabase.com/dashboard)**.
2. Select or create your project for **Echo**.
3. In the left navigation bar, click on **Project Settings** (gear icon) -> **API**.
4. Find the **Project URL** and copy it.
5. Under **Project API Keys**, copy the **`anon` `public`** key.
   > [!CAUTION]
   > NEVER copy or expose the `service_role` key in your mobile application or source code! The client application only uses the `anon` key, which is safely constrained by Row Level Security (RLS).

### Step 1.2: Configure `.env`
In the project root, create a file named `.env` (or copy `.env.example`):

```bash
# In your local project directory:
cp .env.example .env
```

Open `.env` and fill in your actual credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> [!NOTE]
> `.env` is already configured in `.gitignore` and will never be committed to source control.

---

## 2. Executing Migrations in Supabase SQL Editor

You do not need Supabase CLI installed locally. You can execute each migration directly in the web dashboard:

1. In your Supabase Dashboard, click on **SQL Editor** in the left sidebar.
2. Click **New Query** (or the `+` icon).

### Migration 1: Schema Definition
1. Open the file [`supabase/migrations/001_initial_schema.sql`](file:///c:/Users/Shantharam/OneDrive/Documents/Projects/Music%20app/supabase/migrations/001_initial_schema.sql) in your code editor.
2. Copy the entire contents of the file.
3. Paste the SQL into the Supabase SQL Editor.
4. Click **Run** (or press `Cmd + Enter` / `Ctrl + Enter`).
5. Confirm that the output message reads `Success. No rows returned`.

### Migration 2: Row Level Security (RLS)
1. Open the file [`supabase/migrations/002_enable_rls.sql`](file:///c:/Users/Shantharam/OneDrive/Documents/Projects/Music%20app/supabase/migrations/002_enable_rls.sql).
2. Copy the entire contents of the file.
3. In the Supabase SQL Editor, open a new query tab and paste the SQL.
4. Click **Run**.
5. Confirm that the output message reads `Success. No rows returned`.

### Migration 3: Indexes & Constraints
1. Open the file [`supabase/migrations/003_indexes_and_constraints.sql`](file:///c:/Users/Shantharam/OneDrive/Documents/Projects/Music%20app/supabase/migrations/003_indexes_and_constraints.sql).
2. Copy the entire contents of the file.
3. In the Supabase SQL Editor, open a new query tab and paste the SQL.
4. Click **Run**.
5. Confirm that the output message reads `Success. No rows returned`.

---

## 3. Running Security & Validation Tests

We have provided a comprehensive SQL verification suite in [`supabase/verification_tests.sql`](file:///c:/Users/Shantharam/OneDrive/Documents/Projects/Music%20app/supabase/verification_tests.sql).

1. In the Supabase SQL Editor, open a new query tab.
2. Copy the contents of [`supabase/verification_tests.sql`](file:///c:/Users/Shantharam/OneDrive/Documents/Projects/Music%20app/supabase/verification_tests.sql).
3. Paste into the SQL editor and click **Run**.
4. The query returns a tabular report validating:
   - ✅ All 8 tables exist in the `public` schema.
   - ✅ Row Level Security (RLS) is active on 100% of tables.
   - ✅ Foreign keys and cascading relationships are properly linked.
   - ✅ Unique constraints exist for playlist songs and user favorites.
   - ✅ Triggers for `updated_at` and automatic profile creation are attached.
   - ✅ Simulated multi-tenant isolation prevents User A from querying User B's records.

---

## 4. Next Steps: Stage 4B

Once you execute the migrations and confirm the database foundation, **Stage 4B** will introduce:
1. Editorial authentication UI matching Echo's serene botanical design language (Login, Sign-Up, Reset Password).
2. Supabase Auth state integration (session management and token refresh).
3. Seamless fallback between local mock music and cloud-synced databases.

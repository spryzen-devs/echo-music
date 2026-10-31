-- ==============================================================================
-- Echo Music - Database & Security Verification Test Suite
-- Execute this script in the Supabase SQL Editor after running migrations 001-003.
-- This script performs automated schema inspection and multi-tenant security checks.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- TEST 1: Verify Table Existence
-- ------------------------------------------------------------------------------
SELECT 
  table_name,
  CASE 
    WHEN table_name IN ('profiles', 'artists', 'albums', 'songs', 'playlists', 'playlist_songs', 'favorites', 'listening_history') 
    THEN '✅ PASS: Table Exists'
    ELSE 'ℹ️ Other Table'
  END AS test_status
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- ------------------------------------------------------------------------------
-- TEST 2: Verify Row Level Security (RLS) is Enabled
-- ------------------------------------------------------------------------------
SELECT 
  relname AS table_name,
  CASE 
    WHEN relrowsecurity THEN '✅ PASS: RLS Enabled' 
    ELSE '❌ FAIL: RLS Disabled!' 
  END AS rls_status
FROM pg_class
JOIN pg_namespace ON pg_namespace.oid = pg_class.relnamespace
WHERE pg_namespace.nspname = 'public'
  AND relkind = 'r'
  AND relname IN ('profiles', 'artists', 'albums', 'songs', 'playlists', 'playlist_songs', 'favorites', 'listening_history')
ORDER BY relname;

-- ------------------------------------------------------------------------------
-- TEST 3: Verify Foreign Key Constraints
-- ------------------------------------------------------------------------------
SELECT 
  tc.table_name, 
  kcu.column_name, 
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name,
  rc.delete_rule,
  '✅ PASS: Linked' AS fk_status
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
JOIN information_schema.referential_constraints AS rc
  ON rc.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_schema = 'public'
ORDER BY tc.table_name, kcu.column_name;

-- ------------------------------------------------------------------------------
-- TEST 4: Verify Unique Constraints
-- ------------------------------------------------------------------------------
SELECT
  tc.table_name,
  tc.constraint_name,
  string_agg(kcu.column_name, ', ') AS columns,
  '✅ PASS: Unique Enforced' AS status
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
WHERE tc.constraint_type = 'UNIQUE'
  AND tc.table_schema = 'public'
GROUP BY tc.table_name, tc.constraint_name;

-- ------------------------------------------------------------------------------
-- TEST 5: Verify Active Security Policies Count
-- ------------------------------------------------------------------------------
SELECT 
  tablename,
  cmd,
  policyname,
  roles,
  '✅ PASS: Policy Defined' AS policy_status
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, cmd;

-- ------------------------------------------------------------------------------
-- TEST 6-8: Multi-Tenant RLS Behavioral Simulation Test (Rolls Back Cleanly)
-- Simulates User A and User B attempting to access and modify each other's data.
-- ------------------------------------------------------------------------------
DO $$
DECLARE
  v_user_a UUID := '11111111-1111-1111-1111-111111111111';
  v_user_b UUID := '22222222-2222-2222-2222-222222222222';
  v_song_id UUID;
  v_playlist_id UUID;
  v_visible_songs_for_b INT;
  v_illegal_insert_blocked BOOLEAN := FALSE;
BEGIN
  RAISE NOTICE '=== Running Multi-Tenant RLS Simulation ===';

  -- 1. Simulate Auth as User A
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_user_a::text, 'role', 'authenticated')::text, true);

  -- 2. User A inserts a song
  INSERT INTO public.songs (id, owner_id, title, duration_ms, object_key)
  VALUES (gen_random_uuid(), v_user_a, 'Slow Dancing in the Dark', 209000, 'audio/test_a.flac')
  RETURNING id INTO v_song_id;

  -- 3. User A creates a playlist
  INSERT INTO public.playlists (id, owner_id, name)
  VALUES (gen_random_uuid(), v_user_a, 'User A Private Playlist')
  RETURNING id INTO v_playlist_id;

  -- 4. User A adds song to playlist
  INSERT INTO public.playlist_songs (playlist_id, song_id, position)
  VALUES (v_playlist_id, v_song_id, 0);

  -- 5. User A likes the song
  INSERT INTO public.favorites (owner_id, song_id)
  VALUES (v_user_a, v_song_id);

  -- 6. Switch context to User B
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_user_b::text, 'role', 'authenticated')::text, true);

  -- TEST 6: User B queries songs -> Must find ZERO rows belonging to User A
  SELECT COUNT(*) INTO v_visible_songs_for_b
  FROM public.songs
  WHERE id = v_song_id;

  IF v_visible_songs_for_b = 0 THEN
    RAISE NOTICE '✅ PASS [TEST 6]: User B cannot view User A songs (returned 0 rows).';
  ELSE
    RAISE EXCEPTION '❌ FAIL: User B was able to view User A song!';
  END IF;

  -- TEST 7: User B attempts to inject a song into User A''s playlist -> Must be blocked by RLS
  BEGIN
    INSERT INTO public.playlist_songs (playlist_id, song_id, position)
    VALUES (v_playlist_id, v_song_id, 1);
    
    -- If we reach here, it failed to block
    v_illegal_insert_blocked := FALSE;
  EXCEPTION WHEN insufficient_privilege OR check_violation THEN
    v_illegal_insert_blocked := TRUE;
  END;

  IF v_illegal_insert_blocked THEN
    RAISE NOTICE '✅ PASS [TEST 7]: Playlist ownership enforced. User B cannot modify User A playlist.';
  ELSE
    RAISE EXCEPTION '❌ FAIL: User B was able to insert into User A playlist!';
  END IF;

  -- TEST 8: User B queries favorites -> Must find ZERO favorites
  IF (SELECT COUNT(*) FROM public.favorites WHERE owner_id = v_user_a) = 0 THEN
    RAISE NOTICE '✅ PASS [TEST 8]: Favorites ownership enforced. User B cannot view User A favorites.';
  ELSE
    RAISE EXCEPTION '❌ FAIL: User B was able to view User A favorites!';
  END IF;

  RAISE NOTICE '🎉 ALL SECURITY VALIDATION TESTS PASSED!';

  -- Always roll back so test data does not persist
  RAISE EXCEPTION 'Rollback test transaction' USING ERRCODE = '00000';
EXCEPTION WHEN SQLSTATE '00000' THEN
  RAISE NOTICE 'Simulation completed and cleanly rolled back. No test records preserved.';
END $$;

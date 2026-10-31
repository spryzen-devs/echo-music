-- ==============================================================================
-- Migration: 002_enable_rls.sql
-- Description: Enable Row Level Security (RLS) on all tables and define
--              strict per-user isolation policies.
-- Security Model:
--   - profiles: auth.uid() = id
--   - artists, albums, songs, playlists, favorites, listening_history: auth.uid() = owner_id
--   - playlist_songs: validated through parent playlist ownership (playlists.owner_id = auth.uid())
-- ==============================================================================

BEGIN;

-- ------------------------------------------------------------------------------
-- 1. Enable RLS on all public tables
-- ------------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlist_songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listening_history ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 2. Profiles Policies
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
CREATE POLICY "profiles_insert_own"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_delete_own" ON public.profiles;
CREATE POLICY "profiles_delete_own"
  ON public.profiles FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

-- ------------------------------------------------------------------------------
-- 3. Artists Policies
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "artists_select_own" ON public.artists;
CREATE POLICY "artists_select_own"
  ON public.artists FOR SELECT
  TO authenticated
  USING (auth.uid() = owner_id);

DROP POLICY IF EXISTS "artists_insert_own" ON public.artists;
CREATE POLICY "artists_insert_own"
  ON public.artists FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

DROP POLICY IF EXISTS "artists_update_own" ON public.artists;
CREATE POLICY "artists_update_own"
  ON public.artists FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

DROP POLICY IF EXISTS "artists_delete_own" ON public.artists;
CREATE POLICY "artists_delete_own"
  ON public.artists FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);

-- ------------------------------------------------------------------------------
-- 4. Albums Policies
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "albums_select_own" ON public.albums;
CREATE POLICY "albums_select_own"
  ON public.albums FOR SELECT
  TO authenticated
  USING (auth.uid() = owner_id);

DROP POLICY IF EXISTS "albums_insert_own" ON public.albums;
CREATE POLICY "albums_insert_own"
  ON public.albums FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

DROP POLICY IF EXISTS "albums_update_own" ON public.albums;
CREATE POLICY "albums_update_own"
  ON public.albums FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

DROP POLICY IF EXISTS "albums_delete_own" ON public.albums;
CREATE POLICY "albums_delete_own"
  ON public.albums FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);

-- ------------------------------------------------------------------------------
-- 5. Songs Policies
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "songs_select_own" ON public.songs;
CREATE POLICY "songs_select_own"
  ON public.songs FOR SELECT
  TO authenticated
  USING (auth.uid() = owner_id);

DROP POLICY IF EXISTS "songs_insert_own" ON public.songs;
CREATE POLICY "songs_insert_own"
  ON public.songs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

DROP POLICY IF EXISTS "songs_update_own" ON public.songs;
CREATE POLICY "songs_update_own"
  ON public.songs FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

DROP POLICY IF EXISTS "songs_delete_own" ON public.songs;
CREATE POLICY "songs_delete_own"
  ON public.songs FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);

-- ------------------------------------------------------------------------------
-- 6. Playlists Policies
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "playlists_select_own" ON public.playlists;
CREATE POLICY "playlists_select_own"
  ON public.playlists FOR SELECT
  TO authenticated
  USING (auth.uid() = owner_id);

DROP POLICY IF EXISTS "playlists_insert_own" ON public.playlists;
CREATE POLICY "playlists_insert_own"
  ON public.playlists FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

DROP POLICY IF EXISTS "playlists_update_own" ON public.playlists;
CREATE POLICY "playlists_update_own"
  ON public.playlists FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

DROP POLICY IF EXISTS "playlists_delete_own" ON public.playlists;
CREATE POLICY "playlists_delete_own"
  ON public.playlists FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);

-- ------------------------------------------------------------------------------
-- 7. Playlist Songs Policies (Ownership verified via parent playlist)
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "playlist_songs_select_own" ON public.playlist_songs;
CREATE POLICY "playlist_songs_select_own"
  ON public.playlist_songs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.playlists
      WHERE playlists.id = playlist_songs.playlist_id
        AND playlists.owner_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "playlist_songs_insert_own" ON public.playlist_songs;
CREATE POLICY "playlist_songs_insert_own"
  ON public.playlist_songs FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.playlists
      WHERE playlists.id = playlist_songs.playlist_id
        AND playlists.owner_id = auth.uid()
    )
    -- Also ensure the song being added belongs to the user
    AND EXISTS (
      SELECT 1 FROM public.songs
      WHERE songs.id = playlist_songs.song_id
        AND songs.owner_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "playlist_songs_update_own" ON public.playlist_songs;
CREATE POLICY "playlist_songs_update_own"
  ON public.playlist_songs FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.playlists
      WHERE playlists.id = playlist_songs.playlist_id
        AND playlists.owner_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.playlists
      WHERE playlists.id = playlist_songs.playlist_id
        AND playlists.owner_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "playlist_songs_delete_own" ON public.playlist_songs;
CREATE POLICY "playlist_songs_delete_own"
  ON public.playlist_songs FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.playlists
      WHERE playlists.id = playlist_songs.playlist_id
        AND playlists.owner_id = auth.uid()
    )
  );

-- ------------------------------------------------------------------------------
-- 8. Favorites Policies
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "favorites_select_own" ON public.favorites;
CREATE POLICY "favorites_select_own"
  ON public.favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = owner_id);

DROP POLICY IF EXISTS "favorites_insert_own" ON public.favorites;
CREATE POLICY "favorites_insert_own"
  ON public.favorites FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = owner_id
    AND EXISTS (
      SELECT 1 FROM public.songs
      WHERE songs.id = favorites.song_id
        AND songs.owner_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "favorites_update_own" ON public.favorites;
CREATE POLICY "favorites_update_own"
  ON public.favorites FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

DROP POLICY IF EXISTS "favorites_delete_own" ON public.favorites;
CREATE POLICY "favorites_delete_own"
  ON public.favorites FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);

-- ------------------------------------------------------------------------------
-- 9. Listening History Policies
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "listening_history_select_own" ON public.listening_history;
CREATE POLICY "listening_history_select_own"
  ON public.listening_history FOR SELECT
  TO authenticated
  USING (auth.uid() = owner_id);

DROP POLICY IF EXISTS "listening_history_insert_own" ON public.listening_history;
CREATE POLICY "listening_history_insert_own"
  ON public.listening_history FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = owner_id
    AND EXISTS (
      SELECT 1 FROM public.songs
      WHERE songs.id = listening_history.song_id
        AND songs.owner_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "listening_history_update_own" ON public.listening_history;
CREATE POLICY "listening_history_update_own"
  ON public.listening_history FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

DROP POLICY IF EXISTS "listening_history_delete_own" ON public.listening_history;
CREATE POLICY "listening_history_delete_own"
  ON public.listening_history FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);

COMMIT;

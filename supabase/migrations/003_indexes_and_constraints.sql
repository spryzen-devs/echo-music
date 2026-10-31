-- ==============================================================================
-- Migration: 003_indexes_and_constraints.sql
-- Description: Indexes for foreign keys, fast querying, sorting, and
--              database validation check constraints.
-- ==============================================================================

BEGIN;

-- ------------------------------------------------------------------------------
-- 1. Foreign Key & Query Performance Indexes
-- ------------------------------------------------------------------------------

-- Artists
CREATE INDEX IF NOT EXISTS idx_artists_owner_id
  ON public.artists (owner_id);

CREATE INDEX IF NOT EXISTS idx_artists_name
  ON public.artists (owner_id, name);

-- Albums
CREATE INDEX IF NOT EXISTS idx_albums_owner_id
  ON public.albums (owner_id);

CREATE INDEX IF NOT EXISTS idx_albums_artist_id
  ON public.albums (artist_id);

CREATE INDEX IF NOT EXISTS idx_albums_title
  ON public.albums (owner_id, title);

-- Songs
CREATE INDEX IF NOT EXISTS idx_songs_owner_id
  ON public.songs (owner_id);

CREATE INDEX IF NOT EXISTS idx_songs_album_id
  ON public.songs (album_id);

CREATE INDEX IF NOT EXISTS idx_songs_artist_id
  ON public.songs (artist_id);

CREATE INDEX IF NOT EXISTS idx_songs_title
  ON public.songs (owner_id, title);

CREATE INDEX IF NOT EXISTS idx_songs_object_key
  ON public.songs (object_key);

-- Playlists
CREATE INDEX IF NOT EXISTS idx_playlists_owner_id
  ON public.playlists (owner_id);

CREATE INDEX IF NOT EXISTS idx_playlists_name
  ON public.playlists (owner_id, name);

-- Playlist Songs (Ordering and membership lookups)
CREATE INDEX IF NOT EXISTS idx_playlist_songs_playlist_id
  ON public.playlist_songs (playlist_id);

CREATE INDEX IF NOT EXISTS idx_playlist_songs_song_id
  ON public.playlist_songs (song_id);

CREATE INDEX IF NOT EXISTS idx_playlist_songs_ordering
  ON public.playlist_songs (playlist_id, position ASC);

-- Favorites
CREATE INDEX IF NOT EXISTS idx_favorites_owner_id
  ON public.favorites (owner_id);

CREATE INDEX IF NOT EXISTS idx_favorites_song_id
  ON public.favorites (song_id);

CREATE INDEX IF NOT EXISTS idx_favorites_created_at
  ON public.favorites (owner_id, created_at DESC);

-- Listening History (Chronological analytics queries)
CREATE INDEX IF NOT EXISTS idx_listening_history_owner_played
  ON public.listening_history (owner_id, played_at DESC);

CREATE INDEX IF NOT EXISTS idx_listening_history_song_id
  ON public.listening_history (song_id);

-- ------------------------------------------------------------------------------
-- 2. Value Integrity Check Constraints
-- ------------------------------------------------------------------------------

-- Song duration and audio properties
ALTER TABLE public.songs
  DROP CONSTRAINT IF EXISTS chk_songs_duration_non_negative,
  ADD CONSTRAINT chk_songs_duration_non_negative
    CHECK (duration_ms >= 0);

ALTER TABLE public.songs
  DROP CONSTRAINT IF EXISTS chk_songs_file_size_positive,
  ADD CONSTRAINT chk_songs_file_size_positive
    CHECK (file_size_bytes IS NULL OR file_size_bytes > 0);

ALTER TABLE public.songs
  DROP CONSTRAINT IF EXISTS chk_songs_bitrate_positive,
  ADD CONSTRAINT chk_songs_bitrate_positive
    CHECK (bitrate_kbps IS NULL OR bitrate_kbps > 0);

-- Albums release year sensible boundary
ALTER TABLE public.albums
  DROP CONSTRAINT IF EXISTS chk_albums_release_year,
  ADD CONSTRAINT chk_albums_release_year
    CHECK (release_year IS NULL OR (release_year >= 1800 AND release_year <= 2100));

-- Playlist songs position non-negative
ALTER TABLE public.playlist_songs
  DROP CONSTRAINT IF EXISTS chk_playlist_songs_position_non_negative,
  ADD CONSTRAINT chk_playlist_songs_position_non_negative
    CHECK (position >= 0);

-- Listening history completion percentage (0.00% to 100.00%)
ALTER TABLE public.listening_history
  DROP CONSTRAINT IF EXISTS chk_listening_history_percentage,
  ADD CONSTRAINT chk_listening_history_percentage
    CHECK (completion_percentage >= 0.00 AND completion_percentage <= 100.00);

COMMIT;

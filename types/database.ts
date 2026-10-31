export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

/**
 * Supabase Database Schema Definition for Echo
 */
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          bio: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      artists: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          biography: string | null;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          biography?: string | null;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          name?: string;
          biography?: string | null;
          image_url?: string | null;
          created_at?: string;
        };
      };
      albums: {
        Row: {
          id: string;
          owner_id: string;
          artist_id: string | null;
          title: string;
          artwork_url: string | null;
          release_year: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          artist_id?: string | null;
          title: string;
          artwork_url?: string | null;
          release_year?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          artist_id?: string | null;
          title?: string;
          artwork_url?: string | null;
          release_year?: number | null;
          created_at?: string;
        };
      };
      songs: {
        Row: {
          id: string;
          owner_id: string;
          album_id: string | null;
          artist_id: string | null;
          title: string;
          duration_ms: number;
          file_format: string | null;
          file_size_bytes: number | null;
          bitrate_kbps: number | null;
          object_key: string;
          artwork_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          album_id?: string | null;
          artist_id?: string | null;
          title: string;
          duration_ms?: number;
          file_format?: string | null;
          file_size_bytes?: number | null;
          bitrate_kbps?: number | null;
          object_key: string;
          artwork_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          album_id?: string | null;
          artist_id?: string | null;
          title?: string;
          duration_ms?: number;
          file_format?: string | null;
          file_size_bytes?: number | null;
          bitrate_kbps?: number | null;
          object_key?: string;
          artwork_url?: string | null;
          created_at?: string;
        };
      };
      playlists: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          description: string | null;
          artwork_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          description?: string | null;
          artwork_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          name?: string;
          description?: string | null;
          artwork_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      playlist_songs: {
        Row: {
          id: string;
          playlist_id: string;
          song_id: string;
          position: number;
          added_at: string;
        };
        Insert: {
          id?: string;
          playlist_id: string;
          song_id: string;
          position?: number;
          added_at?: string;
        };
        Update: {
          id?: string;
          playlist_id?: string;
          song_id?: string;
          position?: number;
          added_at?: string;
        };
      };
      favorites: {
        Row: {
          id: string;
          owner_id: string;
          song_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          song_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          song_id?: string;
          created_at?: string;
        };
      };
      listening_history: {
        Row: {
          id: string;
          owner_id: string;
          song_id: string;
          played_at: string;
          completion_percentage: number;
        };
        Insert: {
          id?: string;
          owner_id: string;
          song_id: string;
          played_at?: string;
          completion_percentage?: number;
        };
        Update: {
          id?: string;
          owner_id?: string;
          song_id?: string;
          played_at?: string;
          completion_percentage?: number;
        };
      };
    };
  };
}

// Convenience Aliases for Database Row Types
export type DbProfile = Database['public']['Tables']['profiles']['Row'];
export type DbArtist = Database['public']['Tables']['artists']['Row'];
export type DbAlbum = Database['public']['Tables']['albums']['Row'];
export type DbSong = Database['public']['Tables']['songs']['Row'];
export type DbPlaylist = Database['public']['Tables']['playlists']['Row'];
export type DbPlaylistSong = Database['public']['Tables']['playlist_songs']['Row'];
export type DbFavorite = Database['public']['Tables']['favorites']['Row'];
export type DbListeningHistory = Database['public']['Tables']['listening_history']['Row'];

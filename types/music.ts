import { ImageSourcePropType } from 'react-native';

export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: string;
  durationSeconds?: number;
  artwork: ImageSourcePropType;
  audioUrl?: string; // Optional for future audio streaming
  isFavorite?: boolean;
  lyrics?: string[];
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  artwork: ImageSourcePropType;
  songIds: string[];
  songCount?: number;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  artwork: ImageSourcePropType;
  songIds: string[];
  songCount?: number;
  isUserCreated?: boolean;
}

export type RepeatMode = 'off' | 'all' | 'one';
export type PlayerPanelTab = 'Up Next' | 'Lyrics' | 'Related';

export interface RecentSearchItem {
  id: string;
  query: string;
}

// Backward compatibility aliases
export type LibraryPlaylist = Playlist;
export type LibraryAlbum = Album;

import { ImageSourcePropType } from 'react-native';

export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  artwork: ImageSourcePropType;
  duration?: string;
  durationSeconds?: number;
  isFavorite?: boolean;
  lyrics?: string[];
}

export type RepeatMode = 'off' | 'all' | 'one';
export type PlayerPanelTab = 'Up Next' | 'Lyrics' | 'Related';

export interface RecentSearchItem {
  id: string;
  query: string;
}

export interface LibraryPlaylist {
  id: string;
  name: string;
  songCount: number;
  artwork: ImageSourcePropType;
}

export interface LibraryAlbum {
  id: string;
  title: string;
  songCount: number;
  artwork: ImageSourcePropType;
}



import { ImageSourcePropType } from 'react-native';

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  artwork: ImageSourcePropType;
  duration?: string;
  isFavorite?: boolean;
}

export interface RecentSearchItem {
  id: string;
  query: string;
}

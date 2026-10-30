import { ImageSourcePropType } from 'react-native';

export interface UserProfile {
  name: string;
  greeting: string;
  avatar: ImageSourcePropType;
}

export interface FeaturedBannerItem {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  buttonText: string;
  artwork: ImageSourcePropType;
  mixTrackTitle: string;
  mixArtist: string;
}

export interface AlbumItem {
  id: string;
  title: string;
  artist: string;
  artwork: ImageSourcePropType;
}

export interface PlaylistItem {
  id: string;
  title: string;
  subtitle: string;
  artwork: ImageSourcePropType;
}

export type CollectionCategory = 'All' | 'Artists' | 'Albums' | 'Playlists';

export interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  category: CollectionCategory;
  type: 'icon' | 'bubbles' | 'grid';
  iconName?: string;
  iconColor?: string;
  bgColor?: string;
  bubbleColors?: string[];
  gridImage?: ImageSourcePropType;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  artwork: ImageSourcePropType;
  duration?: string;
  isFavorite?: boolean;
}

export type NavigationTab = 'Home' | 'Search' | 'Library' | 'Profile';

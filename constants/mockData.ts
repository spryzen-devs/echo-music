import {
  UserProfile,
  FeaturedBannerItem,
  AlbumItem,
  PlaylistItem,
  CollectionItem,
  CollectionCategory,
  Track,
} from '../types';

export const mockUser: UserProfile = {
  name: 'Shantharam',
  greeting: 'Good morning,',
  avatar: require('../assets/images/music/avatar.png'),
};

export const mockFeaturedBanners: FeaturedBannerItem[] = [
  {
    id: 'banner-1',
    eyebrow: 'FOR A CALMER YOU',
    title: 'Music\nthat stays',
    subtitle: 'Ambient, indie and acoustic for quieter days.',
    buttonText: 'Play Mix',
    artwork: require('../assets/images/music/featured_banner_clean.png'),
    mixTrackTitle: 'Music that Stays (Curated Mix)',
    mixArtist: 'Echo Editorial',
  },
  {
    id: 'banner-2',
    eyebrow: 'MORNING SELECTION',
    title: 'Acoustic\nWarmth',
    subtitle: 'Mellow guitars and unhurried songwriting.',
    buttonText: 'Play Mix',
    artwork: require('../assets/images/music/featured_banner_clean.png'),
    mixTrackTitle: 'Acoustic Warmth (Morning Mix)',
    mixArtist: 'Echo Editorial',
  },
  {
    id: 'banner-3',
    eyebrow: 'EVENING SERENITY',
    title: 'Late Night\nQuiet',
    subtitle: 'Gentle piano and tape loops for winding down.',
    buttonText: 'Play Mix',
    artwork: require('../assets/images/music/featured_banner_clean.png'),
    mixTrackTitle: 'Late Night Quiet (Nocturne)',
    mixArtist: 'Echo Editorial',
  },
];

export const mockRecentlyPlayed: AlbumItem[] = [
  {
    id: 'album-1',
    title: 'Blonde',
    artist: 'Frank Ocean',
    artwork: require('../assets/images/music/album_blonde.png'),
  },
  {
    id: 'album-2',
    title: 'IGOR',
    artist: 'Tyler, The Creator',
    artwork: require('../assets/images/music/album_igor.png'),
  },
  {
    id: 'album-3',
    title: 'Currents',
    artist: 'Tame Impala',
    artwork: require('../assets/images/music/album_currents.png'),
  },
  {
    id: 'album-4',
    title: 'In Rainbows',
    artist: 'Radiohead',
    artwork: require('../assets/images/music/album_in_rainbows.png'),
  },
];

export const mockForYou: PlaylistItem[] = [
  {
    id: 'for-you-1',
    title: 'Deep Focus',
    subtitle: 'Stay in flow',
    artwork: require('../assets/images/music/playlist_deep_focus_clean.png'),
  },
  {
    id: 'for-you-2',
    title: 'Indie Vibes',
    subtitle: 'Fresh finds',
    artwork: require('../assets/images/music/playlist_indie_vibes_clean.png'),
  },
  {
    id: 'for-you-3',
    title: 'Lo-fi Room',
    subtitle: 'Chill always',
    artwork: require('../assets/images/music/playlist_lofi_room_clean.png'),
  },
  {
    id: 'for-you-4',
    title: 'Late Nights',
    subtitle: 'For quiet minds',
    artwork: require('../assets/images/music/playlist_late_nights_clean.png'),
  },
];

export const collectionCategories: CollectionCategory[] = [
  'All',
  'Artists',
  'Albums',
  'Playlists',
];

export const mockCollections: CollectionItem[] = [
  {
    id: 'col-liked',
    title: 'Liked Songs',
    subtitle: '327 songs',
    category: 'Playlists',
    type: 'icon',
    iconName: 'heart',
    iconColor: '#345242',
    bgColor: '#DCE8E0',
  },
  {
    id: 'col-top-mix',
    title: 'Your Top Mix',
    subtitle: 'Made for you',
    category: 'Playlists',
    type: 'bubbles',
    bubbleColors: ['#C5B8A5', '#A5B5A8', '#8E9EA5'],
  },
  {
    id: 'col-downloaded',
    title: 'Downloaded',
    subtitle: '84 songs',
    category: 'Albums',
    type: 'icon',
    iconName: 'arrow-down',
    iconColor: '#345242',
    bgColor: '#DCE8E0',
  },
  {
    id: 'col-chill',
    title: 'Chill',
    subtitle: '12 playlists',
    category: 'Playlists',
    type: 'grid',
    gridImage: require('../assets/images/music/collection_chill.png'),
  },
  {
    id: 'col-artists',
    title: 'Top Artists',
    subtitle: '18 artists',
    category: 'Artists',
    type: 'icon',
    iconName: 'person',
    iconColor: '#345242',
    bgColor: '#E3ECE6',
  },
  {
    id: 'col-vinyl',
    title: 'Vinyl Rotations',
    subtitle: '42 albums',
    category: 'Albums',
    type: 'icon',
    iconName: 'disc',
    iconColor: '#345242',
    bgColor: '#E3ECE6',
  },
];

export const initialTrack: Track = {
  id: 'track-now-playing',
  title: 'Slow Dancing in the Dark',
  artist: 'Joji',
  artwork: require('../assets/images/music/mini_thumb.png'),
  isFavorite: false,
};

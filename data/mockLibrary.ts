import { LibraryPlaylist, LibraryAlbum } from '../types/music';

export const mockLibraryPlaylists: LibraryPlaylist[] = [
  {
    id: 'playlist-fav',
    name: 'Favorites',
    songCount: 12,
    artwork: require('../assets/images/music/library/playlist_favorites.png'),
  },
  {
    id: 'playlist-chill',
    name: 'Chill',
    songCount: 18,
    artwork: require('../assets/images/music/library/playlist_chill.png'),
  },
  {
    id: 'playlist-late-nights',
    name: 'Late Nights',
    songCount: 9,
    artwork: require('../assets/images/music/library/playlist_late_nights.png'),
  },
];

export const mockLibraryAlbums: LibraryAlbum[] = [
  {
    id: 'album-local',
    title: 'Local Album',
    songCount: 28,
    artwork: require('../assets/images/music/library/album_local.png'),
  },
];


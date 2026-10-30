import { Song } from '../types/music';

export const mockSongs: Song[] = [
  {
    id: 'song-1',
    title: 'Slow Dancing in the Dark',
    artist: 'Joji',
    album: 'Nectar',
    artwork: require('../assets/images/music/search/song_slow_dancing.png'),
    duration: '3:29',
  },
  {
    id: 'song-2',
    title: 'The Less I Know The Better',
    artist: 'Tame Impala',
    album: 'Currents',
    artwork: require('../assets/images/music/search/song_less_i_know.png'),
    duration: '3:36',
  },
  {
    id: 'song-3',
    title: 'Nikes',
    artist: 'Frank Ocean',
    album: 'Blonde',
    artwork: require('../assets/images/music/search/song_nikes.png'),
    duration: '5:14',
  },
  {
    id: 'song-4',
    title: 'Everything in Its Right Place',
    artist: 'Radiohead',
    album: 'Kid A',
    artwork: require('../assets/images/music/search/song_right_place.png'),
    duration: '4:11',
  },
  {
    id: 'song-5',
    title: 'Apocalypse',
    artist: 'Cigarettes After Sex',
    album: 'Cigarettes After Sex',
    artwork: require('../assets/images/music/search/song_apocalypse.png'),
    duration: '4:50',
  },
  {
    id: 'song-6',
    title: 'Space Song',
    artist: 'Beach House',
    album: 'Depression Cherry',
    artwork: require('../assets/images/music/search/song_space_song.png'),
    duration: '5:20',
  },
];

export const initialRecentSearches: string[] = [
  'Tame Impala',
  'Frank Ocean',
  'Joji',
  'Radiohead',
];


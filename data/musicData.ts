import { Song, Album, Playlist } from '../types/music';

export const mockSongs: Song[] = [
  {
    id: 'song-1',
    title: 'Slow Dancing in the Dark',
    artist: 'Joji',
    album: 'BALLADS 1',
    artwork: require('../assets/images/music/player/art_slow_dancing.png'),
    duration: '3:29',
    durationSeconds: 209,
    isFavorite: true,
    lyrics: [
      'Give me reasons we should be complete',
      "You should be with him, I can't compete",
      'You looked at me like I was someone else, oh well',
      "Can't you see?",
      "I don't wanna slow dance",
      'In the dark, dark',
      "When you gotta run",
      "Just hear my voice in your head",
      "I don't wanna slow dance",
      'In the dark...',
    ],
  },
  {
    id: 'song-2',
    title: 'Glimpse of Us',
    artist: 'Joji',
    album: 'SMITHEREENS',
    artwork: require('../assets/images/music/player/art_glimpse_of_us.png'),
    duration: '3:53',
    durationSeconds: 233,
    isFavorite: false,
    lyrics: [
      "She'd take the world off my shoulders",
      'If it was ever hard to move',
      'She turns the rain to a rainbow',
      'When I am living in the blue',
      'Why then, if she is so perfect',
      'Do I still wish that it was you?',
      "'Cause sometimes I look in her eyes",
      'And that’s where I find a glimpse of us...',
    ],
  },
  {
    id: 'song-3',
    title: 'Die For You',
    artist: 'The Weeknd',
    album: 'Starboy',
    artwork: require('../assets/images/music/player/art_die_for_you.png'),
    duration: '4:20',
    durationSeconds: 260,
    isFavorite: false,
    lyrics: [
      "I'm findin' ways to articulate the feelin' I'm goin' through",
      'I just can’t say I don’t love you',
      "'Cause I love you, yeah",
      "It’s hard for me to communicate the thoughts that I hold",
      'Even though we came to an end',
      'I still feel you in my soul',
      "'Cause baby, I would die for you...",
    ],
  },
  {
    id: 'song-4',
    title: 'The Less I Know The Better',
    artist: 'Tame Impala',
    album: 'Currents',
    artwork: require('../assets/images/music/player/art_less_i_know.png'),
    duration: '3:36',
    durationSeconds: 216,
    isFavorite: false,
    lyrics: [
      'Someone said they left together',
      'I ran out the door to get her',
      'She was holding hands with Trevor',
      'Not the greatest feeling ever',
      'Said, "Pull yourself together"',
      '"You should try your luck with Heather"',
      'Oh, the less I know the better...',
    ],
  },
  {
    id: 'song-5',
    title: 'Nikes',
    artist: 'Frank Ocean',
    album: 'Blonde',
    artwork: require('../assets/images/music/player/art_nikes.png'),
    duration: '5:14',
    durationSeconds: 314,
    isFavorite: true,
    lyrics: [
      'These bitches want Nikes',
      'They looking for a check',
      'Tell \'em it ain\'t likely',
      'Said she need a ring like Carmelo',
      'Must be on that white like Othello',
      'All you want is peace and quiet',
      'We\'ll let you show me what you got...',
    ],
  },
  {
    id: 'song-6',
    title: 'Space Song',
    artist: 'Beach House',
    album: 'Depression Cherry',
    artwork: require('../assets/images/music/player/art_space_song.png'),
    duration: '5:20',
    durationSeconds: 320,
    isFavorite: false,
    lyrics: [
      'It was late at night',
      'You held on tight',
      'From an empty seat',
      'A flash of light',
      'It will take a while',
      'To make you smile',
      'Somewhere in these eyes',
      'I’m on your side...',
    ],
  },
  {
    id: 'song-7',
    title: 'EARFQUAKE',
    artist: 'Tyler, The Creator',
    album: 'IGOR',
    artwork: require('../assets/images/music/album_igor.png'),
    duration: '3:10',
    durationSeconds: 190,
    isFavorite: false,
    lyrics: [
      "For real, for real this time",
      "For real, for real, for real this time",
      "'Cause you make my earth quake",
      "Oh, you make my earth quake",
      "Riding around, your love is shakin' me up",
      "Don't leave, it's my fault...",
    ],
  },
  {
    id: 'song-8',
    title: 'Everything in Its Right Place',
    artist: 'Radiohead',
    album: 'Kid A',
    artwork: require('../assets/images/music/album_in_rainbows.png'),
    duration: '4:11',
    durationSeconds: 251,
    isFavorite: false,
    lyrics: [
      "Everything in its right place",
      "Yesterday I woke up sucking a lemon",
      "There are two colors in my head",
      "What is that you tried to say?",
      "Everything in its right place...",
    ],
  },
  {
    id: 'song-9',
    title: 'Apocalypse',
    artist: 'Cigarettes After Sex',
    album: 'Cigarettes After Sex',
    artwork: require('../assets/images/music/player/art_space_song.png'),
    duration: '4:50',
    durationSeconds: 290,
    isFavorite: false,
    lyrics: [
      "You leapt from collapsed and shattered balcony",
      "You were looking for a shelter from an early dusk",
      "Got the music in you baby, tell me why",
      "Got the music in you baby, tell me why...",
    ],
  },
];

export const mockAlbums: Album[] = [
  {
    id: 'album-blonde',
    title: 'Blonde',
    artist: 'Frank Ocean',
    artwork: require('../assets/images/music/album_blonde.png'),
    songIds: ['song-5'],
    songCount: 17,
  },
  {
    id: 'album-igor',
    title: 'IGOR',
    artist: 'Tyler, The Creator',
    artwork: require('../assets/images/music/album_igor.png'),
    songIds: ['song-7'],
    songCount: 12,
  },
  {
    id: 'album-currents',
    title: 'Currents',
    artist: 'Tame Impala',
    artwork: require('../assets/images/music/album_currents.png'),
    songIds: ['song-4'],
    songCount: 13,
  },
  {
    id: 'album-in-rainbows',
    title: 'In Rainbows',
    artist: 'Radiohead',
    artwork: require('../assets/images/music/album_in_rainbows.png'),
    songIds: ['song-8'],
    songCount: 10,
  },
  {
    id: 'album-local',
    title: 'Local Album',
    artist: 'Various Artists',
    artwork: require('../assets/images/music/library/album_local.png'),
    songIds: ['song-1', 'song-2', 'song-3', 'song-4', 'song-5', 'song-6', 'song-7', 'song-8', 'song-9'],
    songCount: 28,
  },
];

export const mockPlaylists: Playlist[] = [
  {
    id: 'playlist-favorites',
    name: 'Favorites',
    description: 'Your cherished, peaceful songs and calm favourites.',
    artwork: require('../assets/images/music/library/playlist_favorites.png'),
    songIds: ['song-1', 'song-5'],
    songCount: 12,
  },
  {
    id: 'playlist-chill',
    name: 'Chill',
    description: 'Ambient, indie and acoustic for quieter days.',
    artwork: require('../assets/images/music/library/playlist_chill.png'),
    songIds: ['song-1', 'song-4', 'song-6'],
    songCount: 18,
  },
  {
    id: 'playlist-late-nights',
    name: 'Late Nights',
    description: 'Mellow melodies for quiet minds and late hours.',
    artwork: require('../assets/images/music/library/playlist_late_nights.png'),
    songIds: ['song-2', 'song-3', 'song-6'],
    songCount: 9,
  },
  {
    id: 'playlist-deep-focus',
    name: 'Deep Focus',
    description: 'Stay in flow with delicate instrumentals.',
    artwork: require('../assets/images/music/playlist_deep_focus.png'),
    songIds: ['song-6', 'song-4', 'song-8'],
    songCount: 14,
  },
  {
    id: 'playlist-indie-vibes',
    name: 'Indie Vibes',
    description: 'Fresh nostalgic finds and warm acoustic chords.',
    artwork: require('../assets/images/music/playlist_indie_vibes.png'),
    songIds: ['song-4', 'song-5', 'song-7'],
    songCount: 16,
  },
  {
    id: 'playlist-lofi-room',
    name: 'Lo-fi Room',
    description: 'Chill always. Vinyl crackle and calming rain.',
    artwork: require('../assets/images/music/playlist_lofi_room.png'),
    songIds: ['song-1', 'song-2', 'song-6'],
    songCount: 22,
  },
];

export const initialRecentSearches: string[] = [
  'Tame Impala',
  'Frank Ocean',
  'Joji',
  'Radiohead',
];

// Helper Lookups
export function getSongById(id: string): Song | undefined {
  return mockSongs.find((s) => s.id === id);
}

export function getSongsByIds(ids: string[]): Song[] {
  return ids
    .map((id) => mockSongs.find((s) => s.id === id))
    .filter((s): s is Song => s !== undefined);
}

export function getAlbumById(id: string): Album | undefined {
  return mockAlbums.find((a) => a.id === id);
}

export function getPlaylistById(id: string, customPlaylists: Playlist[] = []): Playlist | undefined {
  return customPlaylists.find((p) => p.id === id) || mockPlaylists.find((p) => p.id === id);
}

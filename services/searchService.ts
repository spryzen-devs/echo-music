import { Song } from '../types/music';

/**
 * Filter songs based on search query matching title, artist, or album
 * Case-insensitive client-side search
 */
export function searchSongs(query: string, songs: Song[]): Song[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) {
    return songs;
  }

  return songs.filter((song) => {
    const titleMatch = song.title.toLowerCase().includes(cleanQuery);
    const artistMatch = song.artist.toLowerCase().includes(cleanQuery);
    const albumMatch = song.album.toLowerCase().includes(cleanQuery);
    return titleMatch || artistMatch || albumMatch;
  });
}


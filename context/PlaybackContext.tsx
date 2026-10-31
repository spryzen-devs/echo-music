import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { Song, Album, Playlist, RepeatMode } from '../types/music';
import { UserProfile } from '../types';
import {
  mockSongs,
  mockAlbums,
  mockPlaylists,
  getSongsByIds,
} from '../data/musicData';
import { mockUser } from '../constants/mockData';
import { StorageService } from '../services/storageService';

export interface PlaybackContextType {
  // Playback State
  currentTrack: Song;
  queue: Song[];
  isPlaying: boolean;
  currentTime: number;
  position: number; // alias
  duration: number;
  shuffleEnabled: boolean;
  isShuffle: boolean; // alias
  repeatMode: RepeatMode;
  likedSongIds: string[];

  // Library & Profile Data
  playlists: Playlist[];
  userProfile: UserProfile;

  // Modals & Navigation Overlays
  isNowPlayingOpen: boolean;
  isOptionsModalOpen: boolean;
  activeSongForOptions: Song | null;
  isCreatePlaylistOpen: boolean;
  selectedPlaylistForView: Playlist | null;
  selectedAlbumForView: Album | null;

  // Playback Actions
  playTrack: (song: Song) => void;
  playPlaylist: (playlist: Playlist, startIndex?: number) => void;
  playAlbum: (album: Album, startIndex?: number) => void;
  togglePlayPause: () => void;
  togglePlay: () => void; // alias
  nextTrack: () => void;
  previousTrack: () => void;
  prevTrack: () => void; // alias
  seekTo: (seconds: number) => void;
  toggleShuffle: () => void;
  cycleRepeatMode: () => void;
  cycleRepeat: () => void; // alias
  toggleFavorite: (songId?: string) => void;
  isSongLiked: (songId: string) => boolean;

  // Queue Actions
  addToQueue: (song: Song) => void;
  playNextInQueue: (song: Song) => void;
  removeFromQueue: (songId: string) => void;
  reorderQueue: (fromIndex: number, toIndex: number) => void;

  // Playlist Actions
  createPlaylist: (name: string, description?: string) => Playlist;
  addSongToPlaylist: (playlistId: string, songId: string) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;

  // Modal Open / Close Handlers
  openNowPlaying: () => void;
  closeNowPlaying: () => void;
  openOptionsModal: (song: Song) => void;
  closeOptionsModal: () => void;
  openCreatePlaylist: () => void;
  closeCreatePlaylist: () => void;
  openPlaylistView: (playlist: Playlist) => void;
  closePlaylistView: () => void;
  openAlbumView: (album: Album) => void;
  closeAlbumView: () => void;

  // Profile Action
  updateUserProfile: (updated: Partial<UserProfile>) => void;

  // Utility
  formatTime: (seconds: number) => string;
}

const PlaybackContext = createContext<PlaybackContextType | undefined>(undefined);

export const PlaybackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Core Playback State
  const [queue, setQueue] = useState<Song[]>(mockSongs);
  const [currentTrack, setCurrentTrack] = useState<Song>(mockSongs[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(92); // 1:32 default
  const [shuffleEnabled, setShuffleEnabled] = useState<boolean>(true);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('all');
  const [likedSongIds, setLikedSongIds] = useState<string[]>(['song-1', 'song-5']);

  // Playlists and User Profile State
  const [playlists, setPlaylists] = useState<Playlist[]>(mockPlaylists);
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUser);

  // Modals & Navigation Overlays
  const [isNowPlayingOpen, setIsNowPlayingOpen] = useState<boolean>(false);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState<boolean>(false);
  const [activeSongForOptions, setActiveSongForOptions] = useState<Song | null>(null);
  const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState<boolean>(false);
  const [selectedPlaylistForView, setSelectedPlaylistForView] = useState<Playlist | null>(null);
  const [selectedAlbumForView, setSelectedAlbumForView] = useState<Album | null>(null);

  const duration = currentTrack.durationSeconds || 209;

  // Load Persisted Data on Mount
  useEffect(() => {
    async function loadData() {
      const persistedLiked = await StorageService.getLikedSongIds();
      if (persistedLiked) {
        setLikedSongIds(persistedLiked);
      }

      const persistedPlaylists = await StorageService.getUserPlaylists();
      if (persistedPlaylists && persistedPlaylists.length > 0) {
        // Merge standard playlists with user created playlists
        const merged = [...mockPlaylists];
        persistedPlaylists.forEach((userPl) => {
          if (!merged.some((p) => p.id === userPl.id)) {
            merged.push(userPl);
          }
        });
        setPlaylists(merged);
      }

      const persistedPrefs = await StorageService.getPlaybackPreferences();
      if (persistedPrefs) {
        setShuffleEnabled(persistedPrefs.isShuffle);
        setRepeatMode(persistedPrefs.repeatMode);
      }

      const persistedProfile = await StorageService.getUserProfile();
      if (persistedProfile) {
        setUserProfile((prev) => ({ ...prev, ...persistedProfile }));
      }
    }

    loadData();
  }, []);

  // Format seconds to mm:ss
  const formatTime = useCallback((secs: number): string => {
    const rounded = Math.max(0, Math.floor(secs));
    const m = Math.floor(rounded / 60);
    const s = rounded % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }, []);

  // Check if a song is liked
  const isSongLiked = useCallback(
    (songId: string): boolean => likedSongIds.includes(songId),
    [likedSongIds]
  );

  // Play a specific track
  const playTrack = useCallback(
    (song: Song) => {
      const isFav = likedSongIds.includes(song.id);
      setCurrentTrack({ ...song, isFavorite: isFav });
      setCurrentTime(0);
      setIsPlaying(true);

      // Ensure the track exists in the queue
      setQueue((prevQueue) => {
        if (prevQueue.some((s) => s.id === song.id)) {
          return prevQueue;
        }
        return [song, ...prevQueue];
      });
    },
    [likedSongIds]
  );

  // Play an entire playlist
  const playPlaylist = useCallback(
    (playlist: Playlist, startIndex = 0) => {
      const songs = getSongsByIds(playlist.songIds);
      if (songs.length === 0) return;

      const safeIndex = Math.max(0, Math.min(startIndex, songs.length - 1));
      const startingSong = songs[safeIndex];

      setQueue(songs);
      playTrack(startingSong);
    },
    [playTrack]
  );

  // Play an entire album
  const playAlbum = useCallback(
    (album: Album, startIndex = 0) => {
      const songs = getSongsByIds(album.songIds);
      if (songs.length === 0) return;

      const safeIndex = Math.max(0, Math.min(startIndex, songs.length - 1));
      const startingSong = songs[safeIndex];

      setQueue(songs);
      playTrack(startingSong);
    },
    [playTrack]
  );

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Toggle favorite for a track
  const toggleFavorite = useCallback(
    (songId?: string) => {
      const targetId = songId || currentTrack.id;

      setLikedSongIds((prevIds) => {
        let updated: string[];
        if (prevIds.includes(targetId)) {
          updated = prevIds.filter((id) => id !== targetId);
        } else {
          updated = [...prevIds, targetId];
        }

        // Persist
        StorageService.saveLikedSongIds(updated);

        // Synchronize currentTrack isFavorite if it matches
        if (targetId === currentTrack.id) {
          setCurrentTrack((prev) => ({
            ...prev,
            isFavorite: updated.includes(targetId),
          }));
        }

        return updated;
      });
    },
    [currentTrack.id]
  );

  // Advance to next track
  const nextTrack = useCallback(() => {
    setQueue((currentQueue) => {
      if (currentQueue.length === 0) return currentQueue;

      const currentIndex = currentQueue.findIndex((s) => s.id === currentTrack.id);
      let nextIndex: number;

      if (shuffleEnabled && currentQueue.length > 1) {
        let randomIndex = currentIndex;
        while (randomIndex === currentIndex) {
          randomIndex = Math.floor(Math.random() * currentQueue.length);
        }
        nextIndex = randomIndex;
      } else {
        nextIndex = currentIndex >= currentQueue.length - 1 ? 0 : currentIndex + 1;
      }

      const nextSong = currentQueue[nextIndex] || currentQueue[0];
      const isFav = likedSongIds.includes(nextSong.id);
      setCurrentTrack({ ...nextSong, isFavorite: isFav });
      setCurrentTime(0);
      setIsPlaying(true);
      return currentQueue;
    });
  }, [currentTrack.id, shuffleEnabled, likedSongIds]);

  // Go to previous track
  const previousTrack = useCallback(() => {
    if (currentTime > 3) {
      setCurrentTime(0);
      return;
    }

    setQueue((currentQueue) => {
      if (currentQueue.length === 0) return currentQueue;

      const currentIndex = currentQueue.findIndex((s) => s.id === currentTrack.id);
      const prevIndex = currentIndex <= 0 ? currentQueue.length - 1 : currentIndex - 1;
      const prevSong = currentQueue[prevIndex] || currentQueue[0];
      const isFav = likedSongIds.includes(prevSong.id);
      setCurrentTrack({ ...prevSong, isFavorite: isFav });
      setCurrentTime(0);
      setIsPlaying(true);
      return currentQueue;
    });
  }, [currentTrack.id, currentTime, likedSongIds]);

  // Seek position
  const seekTo = useCallback(
    (seconds: number) => {
      setCurrentTime(Math.max(0, Math.min(seconds, duration)));
    },
    [duration]
  );

  // Toggle shuffle
  const toggleShuffle = useCallback(() => {
    setShuffleEnabled((prev) => {
      const nextVal = !prev;
      StorageService.savePlaybackPreferences({
        isShuffle: nextVal,
        repeatMode,
      });
      return nextVal;
    });
  }, [repeatMode]);

  // Cycle repeat modes: off -> all -> one -> off
  const cycleRepeatMode = useCallback(() => {
    setRepeatMode((prev) => {
      let nextMode: RepeatMode;
      if (prev === 'off') nextMode = 'all';
      else if (prev === 'all') nextMode = 'one';
      else nextMode = 'off';

      StorageService.savePlaybackPreferences({
        isShuffle: shuffleEnabled,
        repeatMode: nextMode,
      });
      return nextMode;
    });
  }, [shuffleEnabled]);

  // Queue Operations
  const addToQueue = useCallback((song: Song) => {
    setQueue((prev) => {
      if (prev.some((s) => s.id === song.id)) {
        return prev;
      }
      return [...prev, song];
    });
  }, []);

  const playNextInQueue = useCallback(
    (song: Song) => {
      setQueue((prev) => {
        const withoutSong = prev.filter((s) => s.id !== song.id);
        const currentIndex = withoutSong.findIndex((s) => s.id === currentTrack.id);
        const insertIndex = currentIndex >= 0 ? currentIndex + 1 : 0;
        const updated = [...withoutSong];
        updated.splice(insertIndex, 0, song);
        return updated;
      });
    },
    [currentTrack.id]
  );

  const removeFromQueue = useCallback((songId: string) => {
    setQueue((prev) => prev.filter((s) => s.id !== songId));
  }, []);

  const reorderQueue = useCallback((fromIndex: number, toIndex: number) => {
    setQueue((prev) => {
      const result = [...prev];
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, removed);
      return result;
    });
  }, []);

  // Playlist Management
  const createPlaylist = useCallback((name: string, description = ''): Playlist => {
    const newPlaylist: Playlist = {
      id: `user-playlist-${Date.now()}`,
      name: name.trim() || 'My Playlist',
      description: description.trim() || 'Personal playlist in Echo.',
      artwork: require('../assets/images/music/library/playlist_chill.png'),
      songIds: [],
      songCount: 0,
      isUserCreated: true,
    };

    setPlaylists((prev) => {
      const updated = [newPlaylist, ...prev];
      StorageService.saveUserPlaylists(updated.filter((p) => p.isUserCreated));
      return updated;
    });

    return newPlaylist;
  }, []);

  const addSongToPlaylist = useCallback((playlistId: string, songId: string) => {
    setPlaylists((prev) => {
      const updated = prev.map((pl) => {
        if (pl.id === playlistId) {
          if (pl.songIds.includes(songId)) return pl;
          const updatedSongIds = [...pl.songIds, songId];
          return {
            ...pl,
            songIds: updatedSongIds,
            songCount: updatedSongIds.length,
          };
        }
        return pl;
      });

      StorageService.saveUserPlaylists(updated.filter((p) => p.isUserCreated));
      return updated;
    });
  }, []);

  const removeSongFromPlaylist = useCallback((playlistId: string, songId: string) => {
    setPlaylists((prev) => {
      const updated = prev.map((pl) => {
        if (pl.id === playlistId) {
          const updatedSongIds = pl.songIds.filter((id) => id !== songId);
          return {
            ...pl,
            songIds: updatedSongIds,
            songCount: updatedSongIds.length,
          };
        }
        return pl;
      });

      StorageService.saveUserPlaylists(updated.filter((p) => p.isUserCreated));
      return updated;
    });
  }, []);

  // Profile Management
  const updateUserProfile = useCallback((updated: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const nextProfile = { ...prev, ...updated };
      StorageService.saveUserProfile(nextProfile);
      return nextProfile;
    });
  }, []);

  // Modal / Navigation Handlers
  const openNowPlaying = useCallback(() => setIsNowPlayingOpen(true), []);
  const closeNowPlaying = useCallback(() => setIsNowPlayingOpen(false), []);

  const openOptionsModal = useCallback((song: Song) => {
    setActiveSongForOptions(song);
    setIsOptionsModalOpen(true);
  }, []);

  const closeOptionsModal = useCallback(() => {
    setIsOptionsModalOpen(false);
    setActiveSongForOptions(null);
  }, []);

  const openCreatePlaylist = useCallback(() => setIsCreatePlaylistOpen(true), []);
  const closeCreatePlaylist = useCallback(() => setIsCreatePlaylistOpen(false), []);

  const openPlaylistView = useCallback((playlist: Playlist) => {
    setSelectedPlaylistForView(playlist);
  }, []);

  const closePlaylistView = useCallback(() => {
    setSelectedPlaylistForView(null);
  }, []);

  const openAlbumView = useCallback((album: Album) => {
    setSelectedAlbumForView(album);
  }, []);

  const closeAlbumView = useCallback(() => {
    setSelectedAlbumForView(null);
  }, []);

  // Simulated 1s Playback Timer
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime((pos) => {
        if (pos >= duration) {
          if (repeatMode === 'one') {
            return 0;
          }
          nextTrack();
          return 0;
        }
        return pos + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, duration, repeatMode, nextTrack]);

  return (
    <PlaybackContext.Provider
      value={{
        // Playback State
        currentTrack,
        queue,
        isPlaying,
        currentTime,
        position: currentTime,
        duration,
        shuffleEnabled,
        isShuffle: shuffleEnabled,
        repeatMode,
        likedSongIds,

        // Data
        playlists,
        userProfile,

        // Overlays & Modals
        isNowPlayingOpen,
        isOptionsModalOpen,
        activeSongForOptions,
        isCreatePlaylistOpen,
        selectedPlaylistForView,
        selectedAlbumForView,

        // Playback Actions
        playTrack,
        playPlaylist,
        playAlbum,
        togglePlayPause,
        togglePlay: togglePlayPause,
        nextTrack,
        previousTrack,
        prevTrack: previousTrack,
        seekTo,
        toggleShuffle,
        cycleRepeatMode,
        cycleRepeat: cycleRepeatMode,
        toggleFavorite,
        isSongLiked,

        // Queue Actions
        addToQueue,
        playNextInQueue,
        removeFromQueue,
        reorderQueue,

        // Playlist Actions
        createPlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,

        // Modals
        openNowPlaying,
        closeNowPlaying,
        openOptionsModal,
        closeOptionsModal,
        openCreatePlaylist,
        closeCreatePlaylist,
        openPlaylistView,
        closePlaylistView,
        openAlbumView,
        closeAlbumView,

        // Profile
        updateUserProfile,

        // Utility
        formatTime,
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
};

export const usePlayback = (): PlaybackContextType => {
  const context = useContext(PlaybackContext);
  if (!context) {
    throw new Error('usePlayback must be used within a PlaybackProvider');
  }
  return context;
};

export default PlaybackContext;

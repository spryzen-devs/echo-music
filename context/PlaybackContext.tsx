import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { Song, RepeatMode } from '../types/music';
import { mockSongs } from '../data/mockSongs';

interface PlaybackContextType {
  currentTrack: Song;
  isPlaying: boolean;
  position: number;
  duration: number;
  isShuffle: boolean;
  repeatMode: RepeatMode;
  isNowPlayingOpen: boolean;
  queue: Song[];
  playTrack: (song: Song) => void;
  togglePlay: () => void;
  toggleFavorite: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seekTo: (seconds: number) => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  openNowPlaying: () => void;
  closeNowPlaying: () => void;
  formatTime: (seconds: number) => string;
}

const PlaybackContext = createContext<PlaybackContextType | undefined>(undefined);

export const PlaybackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [queue, setQueue] = useState<Song[]>(mockSongs);
  const [currentTrack, setCurrentTrack] = useState<Song>(mockSongs[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [position, setPosition] = useState<number>(92); // 1:32 default matching reference screenshot
  const [isShuffle, setIsShuffle] = useState<boolean>(true); // active in reference
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('all');
  const [isNowPlayingOpen, setIsNowPlayingOpen] = useState<boolean>(true); // Open by default for immediate Phase 2.5 view

  const duration = currentTrack.durationSeconds || 209; // 3:29 default
  const positionRef = useRef(position);
  positionRef.current = position;

  // Format seconds to mm:ss
  const formatTime = useCallback((secs: number): string => {
    const rounded = Math.max(0, Math.floor(secs));
    const m = Math.floor(rounded / 60);
    const s = rounded % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }, []);

  // Select and play a specific track
  const playTrack = useCallback((song: Song) => {
    setCurrentTrack(song);
    setPosition(0);
    setIsPlaying(true);
  }, []);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Toggle favorite for current track and update queue
  const toggleFavorite = useCallback(() => {
    setCurrentTrack((prev) => {
      const updated = { ...prev, isFavorite: !prev.isFavorite };
      setQueue((q) => q.map((s) => (s.id === prev.id ? updated : s)));
      return updated;
    });
  }, []);

  // Advance to next track
  const nextTrack = useCallback(() => {
    setQueue((currentQueue) => {
      const currentIndex = currentQueue.findIndex((s) => s.id === currentTrack.id);
      let nextIndex: number;

      if (isShuffle && currentQueue.length > 1) {
        let randomIndex = currentIndex;
        while (randomIndex === currentIndex) {
          randomIndex = Math.floor(Math.random() * currentQueue.length);
        }
        nextIndex = randomIndex;
      } else {
        nextIndex = currentIndex >= currentQueue.length - 1 ? 0 : currentIndex + 1;
      }

      const nextSong = currentQueue[nextIndex] || currentQueue[0];
      setCurrentTrack(nextSong);
      setPosition(0);
      setIsPlaying(true);
      return currentQueue;
    });
  }, [currentTrack.id, isShuffle]);

  // Go to previous track
  const prevTrack = useCallback(() => {
    if (position > 3) {
      setPosition(0);
      return;
    }
    setQueue((currentQueue) => {
      const currentIndex = currentQueue.findIndex((s) => s.id === currentTrack.id);
      const prevIndex = currentIndex <= 0 ? currentQueue.length - 1 : currentIndex - 1;
      const prevSong = currentQueue[prevIndex] || currentQueue[0];
      setCurrentTrack(prevSong);
      setPosition(0);
      setIsPlaying(true);
      return currentQueue;
    });
  }, [currentTrack.id, position]);

  // Seek position
  const seekTo = useCallback((seconds: number) => {
    setPosition(Math.max(0, Math.min(seconds, duration)));
  }, [duration]);

  // Toggle shuffle
  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev);
  }, []);

  // Cycle repeat modes: off -> all -> one -> off
  const cycleRepeat = useCallback(() => {
    setRepeatMode((prev) => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  }, []);

  // Modal open/close
  const openNowPlaying = useCallback(() => setIsNowPlayingOpen(true), []);
  const closeNowPlaying = useCallback(() => setIsNowPlayingOpen(false), []);

  // Simulated playback timer
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setPosition((pos) => {
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
        currentTrack,
        isPlaying,
        position,
        duration,
        isShuffle,
        repeatMode,
        isNowPlayingOpen,
        queue,
        playTrack,
        togglePlay,
        toggleFavorite,
        nextTrack,
        prevTrack,
        seekTo,
        toggleShuffle,
        cycleRepeat,
        openNowPlaying,
        closeNowPlaying,
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

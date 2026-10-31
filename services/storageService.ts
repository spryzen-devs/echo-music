import AsyncStorage from '@react-native-async-storage/async-storage';
import { Playlist, RepeatMode } from '../types/music';
import { UserProfile } from '../types';

const STORAGE_KEYS = {
  LIKED_SONGS: '@echo_liked_songs',
  PLAYLISTS: '@echo_user_playlists',
  RECENT_SEARCHES: '@echo_recent_searches',
  PREFERENCES: '@echo_playback_preferences',
  USER_PROFILE: '@echo_user_profile',
} as const;

export interface PlaybackPreferences {
  isShuffle: boolean;
  repeatMode: RepeatMode;
}

export const StorageService = {
  // Liked Song IDs
  async getLikedSongIds(): Promise<string[] | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.LIKED_SONGS);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn('StorageService: failed to read liked songs', e);
      return null;
    }
  },

  async saveLikedSongIds(ids: string[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LIKED_SONGS, JSON.stringify(ids));
    } catch (e) {
      console.warn('StorageService: failed to save liked songs', e);
    }
  },

  // User Playlists
  async getUserPlaylists(): Promise<Playlist[] | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.PLAYLISTS);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn('StorageService: failed to read playlists', e);
      return null;
    }
  },

  async saveUserPlaylists(playlists: Playlist[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PLAYLISTS, JSON.stringify(playlists));
    } catch (e) {
      console.warn('StorageService: failed to save playlists', e);
    }
  },

  // Recent Searches
  async getRecentSearches(): Promise<string[] | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn('StorageService: failed to read recent searches', e);
      return null;
    }
  },

  async saveRecentSearches(searches: string[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(searches));
    } catch (e) {
      console.warn('StorageService: failed to save recent searches', e);
    }
  },

  // Playback Preferences (Shuffle & Repeat)
  async getPlaybackPreferences(): Promise<PlaybackPreferences | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.PREFERENCES);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn('StorageService: failed to read preferences', e);
      return null;
    }
  },

  async savePlaybackPreferences(prefs: PlaybackPreferences): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
    } catch (e) {
      console.warn('StorageService: failed to save preferences', e);
    }
  },

  // User Profile
  async getUserProfile(): Promise<Partial<UserProfile> | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn('StorageService: failed to read user profile', e);
      return null;
    }
  },

  async saveUserProfile(profile: Partial<UserProfile>): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('StorageService: failed to save user profile', e);
    }
  },
};

export default StorageService;


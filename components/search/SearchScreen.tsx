import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { UserProfile } from '../../types';
import { Song } from '../../types/music';
import { mockSongs, initialRecentSearches } from '../../data/musicData';
import { searchSongs } from '../../services/searchService';
import { StorageService } from '../../services/storageService';
import { usePlayback } from '../../context/PlaybackContext';
import { Colors } from '../../constants/colors';
import { SearchHeader } from './SearchHeader';
import { RecentSearches } from './RecentSearches';
import { SearchResults } from './SearchResults';

interface SearchScreenProps {
  user: UserProfile;
  onSelectSong: (song: Song) => void;
  onProfilePress?: () => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  user,
  onSelectSong,
  onProfilePress,
}) => {
  const [query, setQuery] = useState<string>('');
  const [recentSearches, setRecentSearches] = useState<string[]>(initialRecentSearches);
  const { openOptionsModal } = usePlayback();

  // Load persisted recent searches on mount
  useEffect(() => {
    async function loadRecent() {
      const persisted = await StorageService.getRecentSearches();
      if (persisted && persisted.length > 0) {
        setRecentSearches(persisted);
      }
    }
    loadRecent();
  }, []);

  // Client-side filtering matching song title, artist, or album
  const filteredSongs = useMemo(() => {
    return searchSongs(query, mockSongs);
  }, [query]);

  // Update query as user types
  const handleChangeQuery = (text: string) => {
    setQuery(text);
  };

  // Clear query button
  const handleClearQuery = () => {
    setQuery('');
  };

  // Tapping a recent search chip
  const handleSelectRecentSearch = (selected: string) => {
    setQuery(selected);
  };

  // Submitting search adds query to recent searches (no duplicates)
  const handleSubmitSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (item) => item.toLowerCase() !== trimmed.toLowerCase()
      );
      const updated = [trimmed, ...filtered].slice(0, 8);
      StorageService.saveRecentSearches(updated);
      return updated;
    });
  };

  // Clear all recent searches
  const handleClearAllSearches = () => {
    setRecentSearches([]);
    StorageService.saveRecentSearches([]);
  };

  // Microphone interaction placeholder
  const handleMicrophonePress = () => {
    const message = 'Voice Search is coming in a future update.';
    if (Platform.OS === 'web') {
      window.alert(message);
    } else {
      Alert.alert('Voice Search', message);
    }
  };

  // Three-dot menu opens the shared interactive options modal
  const handleMenuPress = (song: Song) => {
    openOptionsModal(song);
  };

  return (
    <ScrollView
      style={styles.scrollArea}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* 1. Hero Section with Cinematic Background & Search Input */}
      <SearchHeader
        user={user}
        query={query}
        onChangeQuery={handleChangeQuery}
        onClearQuery={handleClearQuery}
        onSubmitSearch={handleSubmitSearch}
        onMicrophonePress={handleMicrophonePress}
        onProfilePress={onProfilePress}
      />

      {/* 2. Main Sheet Container with Ivory Background & Rounded Overlap */}
      <View style={styles.sheetContainer}>
        {/* Recent Searches */}
        <RecentSearches
          searches={recentSearches}
          onSelectSearch={handleSelectRecentSearch}
          onClearAll={handleClearAllSearches}
        />

        {/* Top Results / Filtered Results */}
        <SearchResults
          songs={filteredSongs}
          query={query}
          onSelectSong={onSelectSong}
          onMenuPress={handleMenuPress}
        />

        {/* Bottom spacer so results scroll completely above floating MiniPlayer */}
        <View style={styles.bottomSpacer} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollArea: {
    flex: 1,
    backgroundColor: Colors.background,
    ...Platform.select({
      web: {
        overflowY: 'auto' as any,
      },
    }),
  },
  scrollContent: {
    paddingBottom: 20,
  },
  sheetContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    marginTop: -28,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 24,
    paddingHorizontal: 0,
    zIndex: 10,
  },
  bottomSpacer: {
    height: 180,
  },
});

export default SearchScreen;

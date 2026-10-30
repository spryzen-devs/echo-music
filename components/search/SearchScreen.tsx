import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { UserProfile } from '../../types';
import { Song } from '../../types/music';
import { mockSongs, initialRecentSearches } from '../../data/mockSongs';
import { searchSongs } from '../../services/searchService';
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
      return [trimmed, ...filtered].slice(0, 8); // Keep top 8 searches
    });
  };

  // Clear all recent searches
  const handleClearAllSearches = () => {
    setRecentSearches([]);
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

  // Three-dot menu options
  const handleMenuPress = (song: Song) => {
    const message = `Options for "${song.title}" by ${song.artist} (${song.album})`;
    if (Platform.OS === 'web') {
      window.alert(message);
    } else {
      Alert.alert(song.title, message);
    }
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

        {/* Bottom spacer ensures all items scroll well above persistent mini-player */}
        <View style={styles.bottomSpacer} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollArea: {
    flex: 1,
    width: '100%',
    minHeight: 0,
    backgroundColor: Colors.background,
    ...Platform.select({
      web: {
        overflowY: 'auto' as any,
      },
    }),
  },
  scrollContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  sheetContainer: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -16, // Seamless overlap onto hero background as shown in reference
    flex: 1,
    minHeight: 500,
  },
  bottomSpacer: {
    height: 180, // Clearance above floating mini-player & bottom nav dock
  },
});

export default SearchScreen;


import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Song } from '../../types/music';
import { SearchResultItem } from './SearchResultItem';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface SearchResultsProps {
  songs: Song[];
  query: string;
  onSelectSong: (song: Song) => void;
  onMenuPress: (song: Song) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  songs,
  query,
  onSelectSong,
  onMenuPress,
}) => {
  const isSearching = query.trim().length > 0;
  const headingText = isSearching ? `Results for "${query.trim()}"` : 'Top Results';

  return (
    <View style={styles.container}>
      {/* Section Heading */}
      <View style={styles.headingRow}>
        <Text style={styles.heading}>{headingText}</Text>
        {isSearching && (
          <Text style={styles.resultCount}>
            {songs.length} {songs.length === 1 ? 'song' : 'songs'}
          </Text>
        )}
      </View>

      {/* Results List */}
      {songs.length > 0 ? (
        <View style={styles.list}>
          {songs.map((song, index) => (
            <SearchResultItem
              key={song.id}
              song={song}
              onSelectSong={onSelectSong}
              onMenuPress={onMenuPress}
              showDivider={index < songs.length - 1}
            />
          ))}
        </View>
      ) : (
        /* Empty State */
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsTitle}>No results found</Text>
          <Text style={styles.noResultsSubtitle}>
            {`We couldn't find any songs, artists, or albums matching "${query.trim()}".`}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
  headingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: Spacing.screenPadding,
    marginBottom: 8,
  },
  heading: {
    ...Typography.sectionTitle,
    fontSize: 21,
    lineHeight: 26,
    color: Colors.text.primary,
  },
  resultCount: {
    ...Typography.cardSubtitle,
    color: Colors.text.secondary,
    fontSize: 12,
  },
  list: {
    width: '100%',
  },
  noResultsContainer: {
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsTitle: {
    ...Typography.cardTitle,
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 6,
  },
  noResultsSubtitle: {
    ...Typography.cardSubtitle,
    color: Colors.text.secondary,
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 18,
    maxWidth: 280,
  },
});

export default SearchResults;

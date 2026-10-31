import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LibraryPlaylist } from '../../types/music';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { PlaylistRow } from './PlaylistRow';

interface PlaylistSectionProps {
  playlists: LibraryPlaylist[];
  onSelectPlaylist: (playlist: LibraryPlaylist) => void;
  onMenuPress: (playlist: LibraryPlaylist) => void;
  onCreatePlaylist: () => void;
}

export const PlaylistSection: React.FC<PlaylistSectionProps> = ({
  playlists,
  onSelectPlaylist,
  onMenuPress,
  onCreatePlaylist,
}) => {
  return (
    <View style={styles.container}>
      {/* Section Header with Circular Plus Button */}
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Playlists</Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Create playlist"
          hitSlop={8}
          style={({ pressed }) => [styles.plusButton, pressed && styles.plusPressed]}
          onPress={onCreatePlaylist}
        >
          <Ionicons name="add" size={18} color={Colors.text.primary} />
        </Pressable>
      </View>

      {/* Playlist Rows */}
      <View style={styles.list}>
        {playlists.map((playlist, index) => (
          <PlaylistRow
            key={playlist.id}
            playlist={playlist}
            onSelect={onSelectPlaylist}
            onMenuPress={onMenuPress}
            showDivider={index < playlists.length - 1}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    paddingBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    marginBottom: 8,
  },
  heading: {
    ...Typography.sectionTitle,
    fontSize: 21,
    lineHeight: 26,
    color: Colors.text.primary,
  },
  plusButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E6E0D4',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      } as any,
    }),
  },
  plusPressed: {
    backgroundColor: Colors.sage.light,
    transform: [{ scale: 0.95 }],
  },
  list: {
    width: '100%',
  },
});

export default PlaylistSection;

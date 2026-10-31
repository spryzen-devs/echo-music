import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Song } from '../../types/music';
import { Typography } from '../../constants/typography';
import { Radius } from '../../constants/spacing';

interface RelatedSongsProps {
  currentTrack: Song;
  allSongs: Song[];
  onSelectSong: (song: Song) => void;
  onOptionsPress: (song: Song) => void;
}

export const RelatedSongs: React.FC<RelatedSongsProps> = ({
  currentTrack,
  allSongs,
  onSelectSong,
  onOptionsPress,
}) => {
  // Show tracks different from the currently playing one
  const relatedTracks = allSongs.filter((s) => s.id !== currentTrack.id);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Recommended For This Mood</Text>

      {relatedTracks.map((song) => (
        <View key={song.id} style={styles.row}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Play ${song.title} by ${song.artist}`}
            style={({ pressed }) => [styles.trackMain, pressed && styles.pressed]}
            onPress={() => onSelectSong(song)}
          >
            <Image source={song.artwork} style={styles.thumbnail} resizeMode="cover" />

            <View style={styles.textColumn}>
              <Text style={styles.title} numberOfLines={1}>
                {song.title}
              </Text>
              <Text style={styles.artist} numberOfLines={1}>
                {song.artist}{song.album ? ` • ${song.album}` : ''}
              </Text>
            </View>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Options for ${song.title}`}
            hitSlop={8}
            style={({ pressed }) => [styles.menuButton, pressed && styles.pressed]}
            onPress={() => onOptionsPress(song)}
          >
            <Ionicons name="ellipsis-vertical" size={16} color="#A4A096" />
          </Pressable>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 24,
  },
  sectionHeader: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: 'rgba(200, 221, 184, 0.7)',
    marginBottom: 12,
    fontWeight: '600',
    paddingHorizontal: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  trackMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  pressed: {
    opacity: 0.7,
  },
  thumbnail: {
    width: 44,
    height: 44,
    borderRadius: Radius.sm,
    backgroundColor: 'rgba(40, 50, 32, 0.5)',
  },
  textColumn: {
    marginLeft: 14,
    flex: 1,
  },
  title: {
    ...Typography.bodyMedium,
    fontSize: 14.5,
    color: '#EDE8DF',
    letterSpacing: -0.1,
  },
  artist: {
    fontSize: 12,
    color: '#A8A193',
    marginTop: 2,
  },
  menuButton: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
});

export default RelatedSongs;


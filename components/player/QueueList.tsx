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

interface QueueListProps {
  queue: Song[];
  currentTrack: Song;
  onSelectSong: (song: Song) => void;
  onOptionsPress: (song: Song) => void;
}

export const QueueList: React.FC<QueueListProps> = ({
  queue,
  currentTrack,
  onSelectSong,
  onOptionsPress,
}) => {
  return (
    <View style={styles.container}>
      {queue.map((song) => {
        const isCurrent = song.id === currentTrack.id;

        return (
          <View key={song.id} style={styles.row}>
            {/* Main Interactive Track Content */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Play ${song.title} by ${song.artist}`}
              style={({ pressed }) => [styles.trackMain, pressed && styles.pressed]}
              onPress={() => onSelectSong(song)}
            >
              <Image source={song.artwork} style={styles.thumbnail} resizeMode="cover" />

              <View style={styles.textColumn}>
                <Text
                  style={[styles.title, isCurrent && styles.titleCurrent]}
                  numberOfLines={1}
                >
                  {song.title}
                </Text>
                <Text style={styles.artist} numberOfLines={1}>
                  {song.artist}
                </Text>
              </View>
            </Pressable>

            {/* Right Status / Action: Equalizer or Three-Dot Menu */}
            {isCurrent ? (
              <View style={styles.equalizer}>
                <View style={[styles.eqBar, styles.eqBar1]} />
                <View style={[styles.eqBar, styles.eqBar2]} />
                <View style={[styles.eqBar, styles.eqBar3]} />
              </View>
            ) : (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Options for ${song.title}`}
                hitSlop={8}
                style={({ pressed }) => [styles.menuButton, pressed && styles.pressed]}
                onPress={() => onOptionsPress(song)}
              >
                <Ionicons name="ellipsis-vertical" size={16} color="#A4A096" />
              </Pressable>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 24,
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
  thumbnail: {
    width: 44,
    height: 44,
    borderRadius: Radius.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  textColumn: {
    flex: 1,
    marginLeft: 12,
    paddingRight: 8,
  },
  title: {
    ...Typography.cardTitle,
    fontSize: 13.5,
    lineHeight: 18,
    color: '#D8D2C6',
    fontWeight: '500',
  },
  titleCurrent: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  artist: {
    ...Typography.cardSubtitle,
    fontSize: 11.5,
    color: '#A0998B',
    marginTop: 2,
  },
  equalizer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 16,
    gap: 3,
    paddingRight: 8,
  },
  eqBar: {
    width: 3,
    borderRadius: 1.5,
    backgroundColor: '#C8DDB8',
  },
  eqBar1: {
    height: 10,
  },
  eqBar2: {
    height: 16,
  },
  eqBar3: {
    height: 7,
  },
  menuButton: {
    padding: 8,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  pressed: {
    opacity: 0.6,
  },
});

export default QueueList;


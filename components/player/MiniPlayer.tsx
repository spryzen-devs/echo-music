import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Track } from '../../types';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius } from '../../constants/spacing';
import { Shadows } from '../../constants/theme';

interface MiniPlayerProps {
  track: Track;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onToggleFavorite: () => void;
  onNextTrack: () => void;
  onPressTrack?: () => void;
}

export const MiniPlayer: React.FC<MiniPlayerProps> = ({
  track,
  isPlaying,
  onTogglePlay,
  onToggleFavorite,
  onNextTrack,
  onPressTrack,
}) => {
  return (
    <View style={styles.outerContainer}>
      <View style={[styles.container, Shadows.floating]}>
        {/* Left: Thumbnail & Track Details - Pressable for Track details */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Now playing: ${track.title} by ${track.artist}`}
          style={({ pressed }) => [styles.trackInfo, pressed && styles.trackPressed]}
          onPress={onPressTrack}
        >
          <Image source={track.artwork} style={styles.artwork} resizeMode="cover" />
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {track.title}
            </Text>
            <Text style={styles.artist} numberOfLines={1}>
              {track.artist}
            </Text>
          </View>
        </Pressable>

        {/* Right: Controls - Sibling buttons (NOT nested) */}
        <View style={styles.controls}>
          {/* Favorite Button */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={track.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            hitSlop={8}
            style={({ pressed }) => [styles.controlButton, pressed && styles.controlPressed]}
            onPress={onToggleFavorite}
          >
            <Ionicons
              name={track.isFavorite ? 'heart' : 'heart-outline'}
              size={20}
              color={track.isFavorite ? '#E57373' : Colors.text.light}
            />
          </Pressable>

          {/* Play / Pause Circular White Button */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
            style={({ pressed }) => [
              styles.playPauseButton,
              pressed && styles.playPausePressed,
            ]}
            onPress={onTogglePlay}
          >
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={16}
              color={Colors.forest.primary}
              style={!isPlaying ? styles.playIconOffset : undefined}
            />
          </Pressable>

          {/* Next Track Button */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Next track"
            hitSlop={8}
            style={({ pressed }) => [styles.controlButton, pressed && styles.controlPressed]}
            onPress={onNextTrack}
          >
            <Ionicons
              name="play-skip-forward"
              size={18}
              color={Colors.text.light}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    paddingHorizontal: Spacing.screenPadding,
    marginBottom: 8,
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.forest.playerBg,
    borderRadius: Radius.xxl,
    paddingVertical: 7,
    paddingHorizontal: 10,
    height: 54,
    width: '100%',
  },
  trackInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: Spacing.sm,
  },
  trackPressed: {
    opacity: 0.8,
  },
  artwork: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.forest.dark,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    ...Typography.cardTitle,
    color: Colors.text.light,
    fontSize: 13,
    lineHeight: 16,
  },
  artist: {
    ...Typography.cardSubtitle,
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 11,
    lineHeight: 14,
    marginTop: 1,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  controlButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlPressed: {
    opacity: 0.6,
    transform: [{ scale: 0.94 }],
  },
  playPauseButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPausePressed: {
    opacity: 0.85,
    transform: [{ scale: 0.94 }],
  },
  playIconOffset: {
    marginLeft: 2,
  },
});

export default MiniPlayer;

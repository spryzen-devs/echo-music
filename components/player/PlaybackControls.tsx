import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RepeatMode } from '../../types/music';
import { Spacing } from '../../constants/spacing';
import { Shadows } from '../../constants/theme';

interface PlaybackControlsProps {
  isPlaying: boolean;
  isShuffle: boolean;
  repeatMode: RepeatMode;
  onTogglePlay: () => void;
  onPrevTrack: () => void;
  onNextTrack: () => void;
  onToggleShuffle: () => void;
  onCycleRepeat: () => void;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  isShuffle,
  repeatMode,
  onTogglePlay,
  onPrevTrack,
  onNextTrack,
  onToggleShuffle,
  onCycleRepeat,
}) => {
  return (
    <View style={styles.container}>
      {/* 1. Shuffle Button */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Shuffle: ${isShuffle ? 'On' : 'Off'}`}
        hitSlop={10}
        style={({ pressed }) => [styles.sideControl, pressed && styles.controlPressed]}
        onPress={onToggleShuffle}
      >
        <Ionicons
          name="shuffle"
          size={22}
          color={isShuffle ? '#C8DDB8' : '#A4A096'}
        />
        {isShuffle && <View style={styles.activeDot} />}
      </Pressable>

      {/* 2. Previous Track */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Previous track"
        hitSlop={10}
        style={({ pressed }) => [styles.skipControl, pressed && styles.controlPressed]}
        onPress={onPrevTrack}
      >
        <Ionicons name="play-skip-back" size={26} color="#F5EFE6" />
      </Pressable>

      {/* 3. Large Play / Pause Button */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
        style={({ pressed }) => [
          styles.playPauseButton,
          Shadows.floating,
          pressed && styles.playPressed,
        ]}
        onPress={onTogglePlay}
      >
        <Ionicons
          name={isPlaying ? 'pause' : 'play'}
          size={28}
          color="#24301E"
          style={!isPlaying ? styles.playIconOffset : undefined}
        />
      </Pressable>

      {/* 4. Next Track */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Next track"
        hitSlop={10}
        style={({ pressed }) => [styles.skipControl, pressed && styles.controlPressed]}
        onPress={onNextTrack}
      >
        <Ionicons name="play-skip-forward" size={26} color="#F5EFE6" />
      </Pressable>

      {/* 5. Repeat Button */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Repeat mode: ${repeatMode}`}
        hitSlop={10}
        style={({ pressed }) => [styles.sideControl, pressed && styles.controlPressed]}
        onPress={onCycleRepeat}
      >
        <Ionicons
          name="repeat"
          size={22}
          color={repeatMode !== 'off' ? '#C8DDB8' : '#A4A096'}
        />
        {repeatMode === 'one' && (
          <View style={styles.repeatBadge}>
            <Text style={styles.repeatBadgeText}>1</Text>
          </View>
        )}
        {repeatMode === 'all' && <View style={styles.activeDot} />}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screenPadding + 4,
    marginVertical: 14,
    width: '100%',
  },
  sideControl: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  skipControl: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  playPauseButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FAF5EC',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0 8px 24px rgba(10, 16, 12, 0.4)',
      } as any,
    }),
  },
  playIconOffset: {
    marginLeft: 3,
  },
  activeDot: {
    position: 'absolute',
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#C8DDB8',
  },
  repeatBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#C8DDB8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  repeatBadgeText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#24301E',
    lineHeight: 10,
  },
  controlPressed: {
    opacity: 0.65,
  },
  playPressed: {
    transform: [{ scale: 0.95 }],
    backgroundColor: '#EAE5DB',
  },
});

export default PlaybackControls;

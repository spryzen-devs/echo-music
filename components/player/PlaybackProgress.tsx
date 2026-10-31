import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  LayoutChangeEvent,
  Platform,
} from 'react-native';
import { Spacing } from '../../constants/spacing';

interface PlaybackProgressProps {
  position: number;
  duration: number;
  onSeek: (seconds: number) => void;
  formatTime: (seconds: number) => string;
}

export const PlaybackProgress: React.FC<PlaybackProgressProps> = ({
  position,
  duration,
  onSeek,
  formatTime,
}) => {
  const trackWidthRef = useRef<number>(300);

  const safeDuration = duration > 0 ? duration : 1;
  const progressRatio = Math.max(0, Math.min(position / safeDuration, 1));
  const progressPercent = progressRatio * 100;

  const handleLayout = (e: LayoutChangeEvent) => {
    trackWidthRef.current = e.nativeEvent.layout.width;
  };

  const handlePress = (e: any) => {
    const clickX = e.nativeEvent.locationX;
    const ratio = Math.max(0, Math.min(clickX / trackWidthRef.current, 1));
    onSeek(ratio * safeDuration);
  };

  return (
    <View style={styles.container}>
      {/* Interactive Progress Bar */}
      <Pressable
        accessibilityRole="adjustable"
        accessibilityLabel="Playback scrubber"
        accessibilityValue={{ now: position, min: 0, max: safeDuration }}
        hitSlop={10}
        style={styles.touchArea}
        onLayout={handleLayout}
        onPress={handlePress}
      >
        <View style={styles.trackBackground}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          <View style={[styles.thumb, { left: `${progressPercent}%` }]} />
        </View>
      </Pressable>

      {/* Timestamps */}
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.screenPadding,
    marginTop: 6,
    marginBottom: 10,
    width: '100%',
  },
  touchArea: {
    height: 24,
    justifyContent: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  trackBackground: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 1.5,
    width: '100%',
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F5EFE6',
    borderRadius: 1.5,
  },
  thumb: {
    position: 'absolute',
    top: -3.5,
    marginLeft: -5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  timeText: {
    fontSize: 11.5,
    lineHeight: 14,
    color: '#C8C0B2',
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default PlaybackProgress;

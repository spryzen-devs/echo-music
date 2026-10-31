import React, { useMemo } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Pressable,
  PanResponder,
  Platform,
} from 'react-native';
import { Song } from '../../types/music';
import { Shadows } from '../../constants/theme';

interface ArtworkCarouselProps {
  currentTrack: Song;
  queue: Song[];
  onNextTrack: () => void;
  onPrevTrack: () => void;
}

export const ArtworkCarousel: React.FC<ArtworkCarouselProps> = ({
  currentTrack,
  queue,
  onNextTrack,
  onPrevTrack,
}) => {
  // Find current, previous, and next track indices
  const currentIndex = queue.findIndex((s) => s.id === currentTrack.id);
  const prevIndex = currentIndex <= 0 ? queue.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex >= queue.length - 1 ? 0 : currentIndex + 1;

  const prevSong = queue[prevIndex] || currentTrack;
  const nextSong = queue[nextIndex] || currentTrack;

  // Swipe gesture detection
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
          return Math.abs(gestureState.dx) > 20 && Math.abs(gestureState.dy) < 20;
        },
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dx < -40) {
            onNextTrack();
          } else if (gestureState.dx > 40) {
            onPrevTrack();
          }
        },
      }),
    [onNextTrack, onPrevTrack]
  );

  return (
    <View style={styles.carouselContainer} {...panResponder.panHandlers}>
      {/* Left Preview Card (Previous Track) */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Previous track: ${prevSong.title}`}
        style={styles.sideCardLeft}
        onPress={onPrevTrack}
      >
        <Image
          source={prevSong.artwork}
          style={styles.sideArtwork}
          resizeMode="cover"
        />
        <View style={styles.sideCardOverlay} />
      </Pressable>

      {/* Main Center Card (Current Track) */}
      <View style={[styles.centerCard, Shadows.floating]}>
        <Image
          source={currentTrack.artwork}
          style={styles.centerArtwork}
          resizeMode="cover"
        />
      </View>

      {/* Right Preview Card (Next Track) */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Next track: ${nextSong.title}`}
        style={styles.sideCardRight}
        onPress={onNextTrack}
      >
        <Image
          source={nextSong.artwork}
          style={styles.sideArtwork}
          resizeMode="cover"
        />
        <View style={styles.sideCardOverlay} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    width: '100%',
    height: 310,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    marginVertical: 6,
  },
  centerCard: {
    width: 290,
    height: 290,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    zIndex: 2,
    ...Platform.select({
      web: {
        boxShadow: '0 16px 38px rgba(10, 16, 12, 0.45)',
      } as any,
    }),
  },
  centerArtwork: {
    width: '100%',
    height: '100%',
  },
  sideCardLeft: {
    position: 'absolute',
    left: -200,
    width: 250,
    height: 250,
    borderRadius: 20,
    overflow: 'hidden',
    zIndex: 1,
    opacity: 0.55,
    transform: [{ scale: 0.88 }],
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  sideCardRight: {
    position: 'absolute',
    right: -200,
    width: 250,
    height: 250,
    borderRadius: 20,
    overflow: 'hidden',
    zIndex: 1,
    opacity: 0.55,
    transform: [{ scale: 0.88 }],
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  sideArtwork: {
    width: '100%',
    height: '100%',
  },
  sideCardOverlay: {
    ...StyleSheet.absoluteFill as any,
    backgroundColor: 'rgba(20, 26, 18, 0.35)',
  },
});

export default ArtworkCarousel;

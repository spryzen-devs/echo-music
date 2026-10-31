import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  Alert,
} from 'react-native';
import { usePlayback } from '../../context/PlaybackContext';
import { mockSongs } from '../../data/mockSongs';
import { Song } from '../../types/music';
import { NowPlayingHeader } from './NowPlayingHeader';
import { ArtworkCarousel } from './ArtworkCarousel';
import { SongInformation } from './SongInformation';
import { PlaybackProgress } from './PlaybackProgress';
import { PlaybackControls } from './PlaybackControls';
import { PlayerBottomPanel } from './PlayerBottomPanel';

interface NowPlayingScreenProps {
  onClose?: () => void;
}

export const NowPlayingScreen: React.FC<NowPlayingScreenProps> = ({ onClose }) => {
  const {
    currentTrack,
    isPlaying,
    position,
    duration,
    isShuffle,
    repeatMode,
    queue,
    playTrack,
    togglePlay,
    toggleFavorite,
    nextTrack,
    prevTrack,
    seekTo,
    toggleShuffle,
    cycleRepeat,
    closeNowPlaying,
    formatTime,
  } = usePlayback();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      closeNowPlaying();
    }
  };

  const handleMoreOptions = () => {
    const msg = `Options for "${currentTrack.title}" by ${currentTrack.artist}\n• Add to Playlist\n• View Artist\n• Share Song\n• Sleep Timer`;
    if (Platform.OS === 'web') {
      window.alert(msg);
    } else {
      Alert.alert(currentTrack.title, msg);
    }
  };

  const handleQueueTrackOptions = (song: Song) => {
    const msg = `Options for "${song.title}"\n• Play Next\n• Remove from Queue\n• Add to Playlist`;
    if (Platform.OS === 'web') {
      window.alert(msg);
    } else {
      Alert.alert(song.title, msg);
    }
  };

  return (
    <View style={styles.container}>
      {/* 1. Dynamic Blurred Artwork Background */}
      <View style={styles.backgroundContainer}>
        <Image
          source={currentTrack.artwork}
          style={styles.backgroundImage}
          resizeMode="cover"
          blurRadius={Platform.OS === 'web' ? 24 : 32}
        />
        {/* Deep olive-green with warm golden tint overlay matching reference */}
        <View style={styles.darkOverlay} />
        <View style={styles.warmTintOverlay} />
      </View>

      {/* 2. Top Header Navigation */}
      <View style={styles.headerWrapper}>
        <NowPlayingHeader
          onClose={handleClose}
          onMoreOptions={handleMoreOptions}
        />
      </View>

      {/* 3. Main Scrollable Content */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Artwork Carousel with Preview Cards */}
        <ArtworkCarousel
          currentTrack={currentTrack}
          queue={queue}
          onNextTrack={nextTrack}
          onPrevTrack={prevTrack}
        />

        {/* Song Info (Title, Artist, Heart Favorite) */}
        <SongInformation
          currentTrack={currentTrack}
          isFavorite={!!currentTrack.isFavorite}
          onToggleFavorite={toggleFavorite}
        />

        {/* Playback Progress Scrubber */}
        <PlaybackProgress
          position={position}
          duration={duration}
          onSeek={seekTo}
          formatTime={formatTime}
        />

        {/* Playback Controls (Shuffle, Prev, Play/Pause, Next, Repeat) */}
        <PlaybackControls
          isPlaying={isPlaying}
          isShuffle={isShuffle}
          repeatMode={repeatMode}
          onTogglePlay={togglePlay}
          onPrevTrack={prevTrack}
          onNextTrack={nextTrack}
          onToggleShuffle={toggleShuffle}
          onCycleRepeat={cycleRepeat}
        />

        {/* Translucent Frosted Bottom Panel (Up Next, Lyrics, Related) */}
        <PlayerBottomPanel
          currentTrack={currentTrack}
          queue={queue}
          allSongs={mockSongs}
          onSelectSong={playTrack}
          onOptionsPress={handleQueueTrackOptions}
        />

        {/* Bottom Home Indicator Pill */}
        <View style={styles.homeIndicatorWrapper}>
          <View style={styles.homeIndicator} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: '#161F14',
    overflow: 'hidden',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    transform: [{ scale: 1.15 }], // Slight zoom prevents edge clipping during blur
    ...Platform.select({
      web: {
        filter: 'blur(30px)',
      } as any,
    }),
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(20, 26, 17, 0.74)',
  },
  warmTintOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(54, 46, 26, 0.28)', // warm golden tint overlay
  },
  headerWrapper: {
    paddingTop: Platform.OS === 'web' ? 12 : 46,
    zIndex: 10,
  },
  scrollArea: {
    flex: 1,
    width: '100%',
    ...Platform.select({
      web: {
        overflowY: 'auto' as any,
      },
    }),
  },
  scrollContent: {
    paddingBottom: 24,
  },
  homeIndicatorWrapper: {
    alignItems: 'center',
    paddingVertical: 14,
  },
  homeIndicator: {
    width: 136,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
  },
});

export default NowPlayingScreen;

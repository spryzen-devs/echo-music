import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Design Tokens & Mock Data
import { Colors } from '../constants/colors';
import { Layout } from '../constants/spacing';
import {
  mockUser,
  mockFeaturedBanners,
  mockRecentlyPlayed,
  mockForYou,
  mockCollections,
  collectionCategories,
  initialTrack,
} from '../constants/mockData';
import {
  Track,
  AlbumItem,
  PlaylistItem,
  CollectionItem,
  FeaturedBannerItem,
  NavigationTab,
} from '../types';

// Components
import {
  HomeHeader,
  FeaturedBanner,
  RecentlyPlayed,
  PlaylistSection,
  CollectionsSection,
  MiniPlayer,
  BottomNavigation,
} from '../components';

export default function HomeScreen() {
  // Navigation & Interactive State
  const [activeTab, setActiveTab] = useState<NavigationTab>('Home');
  const [currentTrack, setCurrentTrack] = useState<Track>(initialTrack);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeToast, setActiveToast] = useState<string | null>(null);

  // Helper notification / interaction
  const showFeedback = (message: string) => {
    setActiveToast(message);
    setTimeout(() => setActiveToast(null), 2400);
  };

  // Banner Play Mix action
  const handlePlayMix = (banner: FeaturedBannerItem) => {
    setCurrentTrack({
      id: `mix-${banner.id}`,
      title: banner.mixTrackTitle,
      artist: banner.mixArtist,
      artwork: banner.artwork,
      isFavorite: false,
    });
    setIsPlaying(true);
    showFeedback(`Now Playing: ${banner.mixTrackTitle}`);
  };

  // Album play action
  const handleAlbumPress = (album: AlbumItem) => {
    setCurrentTrack({
      id: `album-${album.id}`,
      title: album.title,
      artist: album.artist,
      artwork: album.artwork,
      isFavorite: currentTrack.id === `album-${album.id}` ? currentTrack.isFavorite : false,
    });
    setIsPlaying(true);
    showFeedback(`Playing: ${album.title} by ${album.artist}`);
  };

  const handleAlbumMenu = (album: AlbumItem) => {
    const msg = `Options for ${album.title} - Share, Add to Playlist, View Album details.`;
    if (Platform.OS === 'web') {
      window.alert(msg);
    } else {
      Alert.alert(album.title, msg);
    }
  };

  // Playlist play action
  const handlePlaylistPress = (playlist: PlaylistItem) => {
    setCurrentTrack({
      id: `playlist-${playlist.id}`,
      title: playlist.title,
      artist: `Echo ${playlist.subtitle}`,
      artwork: playlist.artwork,
      isFavorite: false,
    });
    setIsPlaying(true);
    showFeedback(`Playing Playlist: ${playlist.title}`);
  };

  // Collection card press action
  const handleCollectionPress = (collection: CollectionItem) => {
    showFeedback(`Opened Collection: ${collection.title} (${collection.subtitle})`);
  };

  // Mini player controls
  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
    showFeedback(isPlaying ? 'Playback paused' : `Resumed: ${currentTrack.title}`);
  };

  const handleToggleFavorite = () => {
    setCurrentTrack((prev) => {
      const nextFav = !prev.isFavorite;
      showFeedback(nextFav ? 'Added to Liked Songs' : 'Removed from Liked Songs');
      return { ...prev, isFavorite: nextFav };
    });
  };

  const handleNextTrack = () => {
    // Cycle to next song in recently played or mock pool
    const currentIndex = mockRecentlyPlayed.findIndex(
      (a) => a.title === currentTrack.title
    );
    const nextAlbum =
      currentIndex >= 0 && currentIndex < mockRecentlyPlayed.length - 1
        ? mockRecentlyPlayed[currentIndex + 1]
        : mockRecentlyPlayed[0];

    setCurrentTrack({
      id: `album-${nextAlbum.id}`,
      title: nextAlbum.title,
      artist: nextAlbum.artist,
      artwork: nextAlbum.artwork,
      isFavorite: false,
    });
    setIsPlaying(true);
    showFeedback(`Next track: ${nextAlbum.title}`);
  };

  // Header button handlers
  const handleNotificationPress = () => {
    showFeedback('No new notifications. Your library is up to date.');
  };

  const handleSettingsPress = () => {
    showFeedback('Settings: Audio Quality: Lossless • Theme: Warm Ivory');
  };

  const handleProfilePress = () => {
    setActiveTab('Profile');
  };

  const handleTabChange = (tab: NavigationTab) => {
    setActiveTab(tab);
    if (tab !== 'Home') {
      showFeedback(`Switched to ${tab} tab (Preview mode)`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />

      {/* Main Container - Centered on Web Desktop, Full on Mobile */}
      <View style={styles.outerContainer}>
        <View style={styles.appContainer}>
          {/* Main Scrollable Content */}
          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* A. Header */}
            <HomeHeader
              user={mockUser}
              onNotificationPress={handleNotificationPress}
              onSettingsPress={handleSettingsPress}
              onProfilePress={handleProfilePress}
            />

            {/* B. Featured Music Banner */}
            <FeaturedBanner
              banners={mockFeaturedBanners}
              onPlayMix={handlePlayMix}
            />

            {/* C. Recently Played */}
            <RecentlyPlayed
              albums={mockRecentlyPlayed}
              onAlbumPress={handleAlbumPress}
              onSeeAllPress={() => showFeedback('Viewing all 38 recently played tracks')}
              onAlbumMenuPress={handleAlbumMenu}
            />

            {/* D. For You */}
            <PlaylistSection
              playlists={mockForYou}
              onPlaylistPress={handlePlaylistPress}
              onPlayPress={handlePlaylistPress}
              onMorePress={() => showFeedback('Curated mixes refreshed daily')}
            />

            {/* E. Your Collections */}
            <CollectionsSection
              collections={mockCollections}
              categories={collectionCategories}
              onCollectionPress={handleCollectionPress}
              onMorePress={() => showFeedback('Opening full Collections library')}
            />

            {/* Spacer to prevent mini-player & bottom nav overlap */}
            <View style={styles.scrollBottomSpacer} />
          </ScrollView>

          {/* Toast Notification Banner */}
          {activeToast && (
            <View style={styles.toastContainer}>
              <Text style={styles.toastText}>{activeToast}</Text>
            </View>
          )}

          {/* Fixed Bottom Container: F. Mini-player & G. Bottom Navigation */}
          <View style={styles.bottomDock}>
            <MiniPlayer
              track={currentTrack}
              isPlaying={isPlaying}
              onTogglePlay={handleTogglePlay}
              onToggleFavorite={handleToggleFavorite}
              onNextTrack={handleNextTrack}
              onPressTrack={() => showFeedback(`Now Playing details: ${currentTrack.title}`)}
            />
            <BottomNavigation
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  outerContainer: {
    flex: 1,
    backgroundColor: Platform.OS === 'web' ? '#EAE5DC' : Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appContainer: {
    flex: 1,
    width: '100%',
    maxWidth: Layout.maxWidth,
    backgroundColor: Colors.background,
    overflow: 'hidden',
    position: 'relative',
    ...Platform.select({
      web: {
        height: '100%',
        boxShadow: '0 12px 40px rgba(24, 36, 29, 0.12)',
      },
    }),
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  scrollBottomSpacer: {
    height: 140, // Ensures content is fully scrollable above fixed bottom dock
  },
  bottomDock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  toastContainer: {
    position: 'absolute',
    bottom: 144,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(24, 36, 29, 0.92)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  toastText: {
    color: Colors.text.light,
    fontSize: 12.5,
    fontWeight: '500',
    textAlign: 'center',
  },
});

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
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
} from '../constants/mockData';
import {
  UserProfile,
  AlbumItem,
  PlaylistItem,
  CollectionItem,
  FeaturedBannerItem,
  NavigationTab,
  Song,
  LibraryPlaylist,
  LibraryAlbum,
} from '../types';

// Context
import { PlaybackProvider, usePlayback } from '../context/PlaybackContext';

// Components
import {
  HomeHeader,
  FeaturedBanner,
  RecentlyPlayed,
  PlaylistSection,
  CollectionsSection,
  MiniPlayer,
  BottomNavigation,
  TabPlaceholder,
  SearchScreen,
  LibraryScreen,
  ProfileScreen,
  NowPlayingScreen,
} from '../components';

function EchoApp() {
  // Navigation & Interactive State
  const [activeTab, setActiveTab] = useState<NavigationTab>('Home');
  const [user, setUser] = useState<UserProfile>(mockUser);

  // Playback Context
  const {
    currentTrack,
    isPlaying,
    isNowPlayingOpen,
    playTrack,
    togglePlay,
    toggleFavorite,
    nextTrack,
    openNowPlaying,
    closeNowPlaying,
  } = usePlayback();

  // Update Profile details
  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  // Banner Play Mix action
  const handlePlayMix = (banner: FeaturedBannerItem) => {
    playTrack({
      id: `mix-${banner.id}`,
      title: banner.mixTrackTitle,
      artist: banner.mixArtist,
      artwork: banner.artwork,
      duration: '3:24',
      durationSeconds: 204,
      isFavorite: false,
    });
  };

  // Album play action
  const handleAlbumPress = (album: AlbumItem) => {
    playTrack({
      id: `album-${album.id}`,
      title: album.title,
      artist: album.artist,
      artwork: album.artwork,
      duration: '3:30',
      durationSeconds: 210,
      isFavorite: currentTrack.id === `album-${album.id}` ? currentTrack.isFavorite : false,
    });
  };

  const handleAlbumMenu = (album: AlbumItem) => {
    const msg = `Options for "${album.title}" by ${album.artist}`;
    if (Platform.OS === 'web') {
      window.alert(msg);
    } else {
      Alert.alert(album.title, msg);
    }
  };

  // Playlist play action
  const handlePlaylistPress = (playlist: PlaylistItem) => {
    playTrack({
      id: `playlist-${playlist.id}`,
      title: playlist.title,
      artist: `Echo ${playlist.subtitle}`,
      artwork: playlist.artwork,
      duration: '3:15',
      durationSeconds: 195,
      isFavorite: false,
    });
  };

  // Collection card press action
  const handleCollectionPress = (collection: CollectionItem) => {
    if (collection.id === 'col-liked') {
      playTrack({
        id: 'track-liked-first',
        title: 'Nikes',
        artist: 'Frank Ocean',
        artwork: require('../assets/images/music/album_blonde.png'),
        duration: '5:14',
        durationSeconds: 314,
        isFavorite: true,
      });
    } else if (collection.id === 'col-top-mix') {
      playTrack({
        id: 'track-top-mix',
        title: 'EARFQUAKE',
        artist: 'Tyler, The Creator',
        artwork: require('../assets/images/music/album_igor.png'),
        duration: '3:10',
        durationSeconds: 190,
        isFavorite: false,
      });
    } else if (collection.id === 'col-downloaded') {
      playTrack({
        id: 'track-downloaded',
        title: 'The Less I Know The Better',
        artist: 'Tame Impala',
        artwork: require('../assets/images/music/album_currents.png'),
        duration: '3:36',
        durationSeconds: 216,
        isFavorite: false,
      });
    }
  };

  // Search song press action
  const handleSelectSong = (song: Song) => {
    playTrack(song);
  };

  // Library playlist selection action
  const handleSelectPlaylist = (playlist: LibraryPlaylist) => {
    playTrack({
      id: `lib-playlist-${playlist.id}`,
      title: playlist.name,
      artist: `Echo Playlist • ${playlist.songCount} songs`,
      artwork: playlist.artwork,
      duration: '3:45',
      durationSeconds: 225,
      isFavorite: playlist.name === 'Favorites',
    });
  };

  // Library album selection action
  const handleSelectAlbum = (album: LibraryAlbum) => {
    playTrack({
      id: `lib-album-${album.id}`,
      title: album.title,
      artist: `Local Collection • ${album.songCount} songs`,
      artwork: album.artwork,
      duration: '3:20',
      durationSeconds: 200,
      isFavorite: false,
    });
  };

  // Header button handlers
  const handleNotificationPress = () => {
    if (Platform.OS === 'web') {
      window.alert('Notifications: No new alerts. Your Echo library is up to date.');
    } else {
      Alert.alert('Notifications', 'No new alerts. Your Echo library is up to date.');
    }
  };

  const handleSettingsPress = () => {
    setActiveTab('Profile');
  };

  const handleProfilePress = () => {
    setActiveTab('Profile');
  };

  const handleTabChange = (tab: NavigationTab) => {
    setActiveTab(tab);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style={isNowPlayingOpen ? 'light' : 'dark'} />

      {/* Main Container - Centered on Web Desktop, Full on Mobile */}
      <View style={styles.outerContainer}>
        <View style={styles.appContainer}>
          {/* Active Tab Screen Content */}
          {activeTab === 'Home' ? (
            <ScrollView
              style={styles.scrollArea}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* A. Header */}
              <HomeHeader
                user={user}
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
                onSeeAllPress={() => setActiveTab('Library')}
                onAlbumMenuPress={handleAlbumMenu}
              />

              {/* D. For You */}
              <PlaylistSection
                playlists={mockForYou}
                onPlaylistPress={handlePlaylistPress}
                onPlayPress={handlePlaylistPress}
                onMorePress={() => setActiveTab('Search')}
              />

              {/* E. Your Collections */}
              <CollectionsSection
                collections={mockCollections}
                categories={collectionCategories}
                onCollectionPress={handleCollectionPress}
                onMorePress={() => setActiveTab('Library')}
              />

              {/* Generous bottom spacer ensures Your Collections sits fully above mini-player */}
              <View style={styles.scrollBottomSpacer} />
            </ScrollView>
          ) : activeTab === 'Search' ? (
            <SearchScreen
              user={user}
              onSelectSong={handleSelectSong}
              onProfilePress={handleProfilePress}
            />
          ) : activeTab === 'Library' ? (
            <LibraryScreen
              user={user}
              onSelectPlaylist={handleSelectPlaylist}
              onSelectAlbum={handleSelectAlbum}
              onProfilePress={handleProfilePress}
            />
          ) : activeTab === 'Profile' ? (
            <ProfileScreen
              user={user}
              onUpdateUser={handleUpdateUser}
              onSelectSong={handleSelectSong}
              onSelectAlbum={handleAlbumPress}
            />
          ) : (
            <TabPlaceholder
              tab={activeTab}
              user={user}
              onReturnHome={() => setActiveTab('Home')}
            />
          )}

          {/* Persistent Fixed Bottom Container: F. Mini-player & G. Bottom Navigation */}
          <View style={styles.bottomDock}>
            <MiniPlayer
              track={currentTrack}
              isPlaying={isPlaying}
              onTogglePlay={togglePlay}
              onToggleFavorite={toggleFavorite}
              onNextTrack={nextTrack}
              onPressTrack={openNowPlaying}
            />
            <BottomNavigation
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </View>

          {/* Phase 2.5: Immersive Full-Screen Now Playing Screen */}
          {isNowPlayingOpen && (
            <NowPlayingScreen onClose={closeNowPlaying} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function HomeScreen() {
  return (
    <PlaybackProvider>
      <EchoApp />
    </PlaybackProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  outerContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: Platform.OS === 'web' ? '#EDE8DF' : Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        height: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
      },
    }),
  },
  appContainer: {
    flex: 1,
    width: '100%',
    maxWidth: Layout.maxWidth,
    backgroundColor: Colors.background,
    position: 'relative',
    overflow: 'hidden',
    alignSelf: 'center',
    ...Platform.select({
      web: {
        height: '100%',
        maxHeight: '100vh',
        boxShadow: '0 8px 36px rgba(24, 36, 29, 0.12)',
      },
    }),
  },
  scrollArea: {
    flex: 1,
    width: '100%',
    minHeight: 0,
    ...Platform.select({
      web: {
        overflowY: 'auto' as any,
      },
    }),
  },
  scrollContent: {
    paddingBottom: 20,
  },
  scrollBottomSpacer: {
    height: 180, // Generous 180px spacer guarantees Your Collections cards sit fully above the floating mini-player
  },
  bottomDock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    maxWidth: Layout.maxWidth,
    backgroundColor: Colors.background,
    zIndex: 100,
    paddingTop: 6,
  },
});

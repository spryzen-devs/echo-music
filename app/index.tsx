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
  initialTrack,
} from '../constants/mockData';
import {
  Track,
  AlbumItem,
  PlaylistItem,
  CollectionItem,
  FeaturedBannerItem,
  NavigationTab,
  Song,
  LibraryPlaylist,
  LibraryAlbum,
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
  TabPlaceholder,
  SearchScreen,
  LibraryScreen,
} from '../components';

export default function HomeScreen() {
  // Navigation & Interactive State
  const [activeTab, setActiveTab] = useState<NavigationTab>('Home');
  const [currentTrack, setCurrentTrack] = useState<Track>(initialTrack);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

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
    setCurrentTrack({
      id: `playlist-${playlist.id}`,
      title: playlist.title,
      artist: `Echo ${playlist.subtitle}`,
      artwork: playlist.artwork,
      isFavorite: false,
    });
    setIsPlaying(true);
  };

  // Collection card press action
  const handleCollectionPress = (collection: CollectionItem) => {
    // If the collection is a playlist like Liked Songs, update playback
    if (collection.id === 'col-liked') {
      setCurrentTrack({
        id: 'track-liked-first',
        title: 'Nikes',
        artist: 'Frank Ocean',
        artwork: require('../assets/images/music/album_blonde.png'),
        isFavorite: true,
      });
      setIsPlaying(true);
    } else if (collection.id === 'col-top-mix') {
      setCurrentTrack({
        id: 'track-top-mix',
        title: 'EARFQUAKE',
        artist: 'Tyler, The Creator',
        artwork: require('../assets/images/music/album_igor.png'),
        isFavorite: false,
      });
      setIsPlaying(true);
    } else if (collection.id === 'col-downloaded') {
      setCurrentTrack({
        id: 'track-downloaded',
        title: 'The Less I Know The Better',
        artist: 'Tame Impala',
        artwork: require('../assets/images/music/album_currents.png'),
        isFavorite: false,
      });
      setIsPlaying(true);
    }
  };

  // Search song press action
  const handleSelectSong = (song: Song) => {
    setCurrentTrack({
      id: song.id,
      title: song.title,
      artist: song.artist,
      artwork: song.artwork,
      isFavorite: currentTrack.id === song.id ? currentTrack.isFavorite : false,
    });
    setIsPlaying(true);
  };

  // Library playlist selection action
  const handleSelectPlaylist = (playlist: LibraryPlaylist) => {
    setCurrentTrack({
      id: `lib-playlist-${playlist.id}`,
      title: playlist.name,
      artist: `Echo Playlist • ${playlist.songCount} songs`,
      artwork: playlist.artwork,
      isFavorite: playlist.name === 'Favorites',
    });
    setIsPlaying(true);
  };

  // Library album selection action
  const handleSelectAlbum = (album: LibraryAlbum) => {
    setCurrentTrack({
      id: `lib-album-${album.id}`,
      title: album.title,
      artist: `Local Collection • ${album.songCount} songs`,
      artwork: album.artwork,
      isFavorite: false,
    });
    setIsPlaying(true);
  };

  // Mini player controls
  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleToggleFavorite = () => {
    setCurrentTrack((prev) => ({
      ...prev,
      isFavorite: !prev.isFavorite,
    }));
  };

  const handleNextTrack = () => {
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
  };

  // Header button handlers
  const handleNotificationPress = () => {
    // Informative alert without disruptive toast
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
      <StatusBar style="dark" />

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
              user={mockUser}
              onSelectSong={handleSelectSong}
              onProfilePress={handleProfilePress}
            />
          ) : activeTab === 'Library' ? (
            <LibraryScreen
              user={mockUser}
              onSelectPlaylist={handleSelectPlaylist}
              onSelectAlbum={handleSelectAlbum}
              onProfilePress={handleProfilePress}
            />
          ) : (
            <TabPlaceholder
              tab={activeTab}
              user={mockUser}
              onReturnHome={() => setActiveTab('Home')}
            />
          )}

          {/* Persistent Fixed Bottom Container: F. Mini-player & G. Bottom Navigation */}
          <View style={styles.bottomDock}>
            <MiniPlayer
              track={currentTrack}
              isPlaying={isPlaying}
              onTogglePlay={handleTogglePlay}
              onToggleFavorite={handleToggleFavorite}
              onNextTrack={handleNextTrack}
              onPressTrack={() => {
                // Focus on current track
              }}
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

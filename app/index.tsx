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
  mockFeaturedBanners,
  mockRecentlyPlayed,
  mockForYou,
  mockCollections,
  collectionCategories,
} from '../constants/mockData';
import {
  AlbumItem,
  PlaylistItem,
  CollectionItem,
  FeaturedBannerItem,
  NavigationTab,
  Song,
  LibraryPlaylist,
  LibraryAlbum,
} from '../types';
import { mockSongs, mockAlbums } from '../data/musicData';

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
  SongOptionsModal,
  CreatePlaylistModal,
  PlaylistDetailModal,
  AlbumDetailModal,
} from '../components';

function EchoApp() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<NavigationTab>('Home');

  // Playback & Global Application Context
  const {
    currentTrack,
    isPlaying,
    isNowPlayingOpen,
    likedSongIds,
    playlists,
    userProfile,
    isOptionsModalOpen,
    activeSongForOptions,
    isCreatePlaylistOpen,
    selectedPlaylistForView,
    selectedAlbumForView,
    playTrack,
    playPlaylist,
    playAlbum,
    togglePlayPause,
    toggleFavorite,
    nextTrack,
    openNowPlaying,
    closeNowPlaying,
    openOptionsModal,
    closeOptionsModal,
    closeCreatePlaylist,
    createPlaylist,
    addSongToPlaylist,
    openPlaylistView,
    closePlaylistView,
    openAlbumView,
    closeAlbumView,
    playNextInQueue,
    addToQueue,
    updateUserProfile,
  } = usePlayback();

  // Banner Play Mix action
  const handlePlayMix = (banner: FeaturedBannerItem) => {
    playTrack({
      id: `mix-${banner.id}`,
      title: banner.mixTrackTitle,
      artist: banner.mixArtist,
      album: 'Echo Featured Mix',
      artwork: banner.artwork,
      duration: '3:24',
      durationSeconds: 204,
      isFavorite: false,
    });
  };

  // Album card press action on Home screen
  const handleAlbumPress = (album: AlbumItem) => {
    const matchedAlbum = mockAlbums.find(
      (a) => a.id === album.id || a.title.toLowerCase() === album.title.toLowerCase()
    );
    if (matchedAlbum) {
      openAlbumView(matchedAlbum);
    } else {
      playTrack({
        id: `album-${album.id}`,
        title: album.title,
        artist: album.artist,
        album: album.title,
        artwork: album.artwork,
        duration: '3:30',
        durationSeconds: 210,
        isFavorite: false,
      });
    }
  };

  // Three-dot menu on Home Recently Played albums
  const handleAlbumMenu = (album: AlbumItem) => {
    const matchedSong = mockSongs.find(
      (s) =>
        s.album?.toLowerCase() === album.title.toLowerCase() ||
        s.artist.toLowerCase() === album.artist.toLowerCase()
    );
    if (matchedSong) {
      openOptionsModal(matchedSong);
    } else {
      openOptionsModal({
        id: `song-${album.id}`,
        title: album.title,
        artist: album.artist,
        album: album.title,
        artwork: album.artwork,
        duration: '3:30',
        durationSeconds: 210,
      });
    }
  };

  // Playlist card press action on Home screen
  const handlePlaylistPress = (playlist: PlaylistItem) => {
    const matchedPlaylist = playlists.find(
      (p) => p.name.toLowerCase() === playlist.title.toLowerCase()
    );
    if (matchedPlaylist) {
      openPlaylistView(matchedPlaylist);
    } else {
      playTrack({
        id: `playlist-${playlist.id}`,
        title: playlist.title,
        artist: `Echo ${playlist.subtitle}`,
        album: playlist.title,
        artwork: playlist.artwork,
        duration: '3:15',
        durationSeconds: 195,
        isFavorite: false,
      });
    }
  };

  // Collection card press action on Home screen
  const handleCollectionPress = (collection: CollectionItem) => {
    if (collection.id === 'col-liked') {
      const favPlaylist =
        playlists.find((p) => p.id === 'playlist-favorites') || playlists[0];
      openPlaylistView(favPlaylist);
    } else if (collection.id === 'col-top-mix') {
      const igorAlbum = mockAlbums.find((a) => a.id === 'album-igor');
      if (igorAlbum) openAlbumView(igorAlbum);
    } else if (collection.id === 'col-downloaded') {
      const currentsAlbum = mockAlbums.find((a) => a.id === 'album-currents');
      if (currentsAlbum) openAlbumView(currentsAlbum);
    } else if (collection.id === 'col-chill') {
      const chillPlaylist =
        playlists.find((p) => p.id === 'playlist-chill') || playlists[1];
      openPlaylistView(chillPlaylist);
    }
  };

  // Song selection from Search, Library, or Profile
  const handleSelectSong = (song: Song) => {
    playTrack(song);
  };

  // Library playlist selection
  const handleSelectPlaylist = (playlist: LibraryPlaylist) => {
    openPlaylistView(playlist);
  };

  // Library album selection
  const handleSelectAlbum = (album: LibraryAlbum) => {
    openAlbumView(album);
  };

  // Notifications button handler
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
                user={userProfile}
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
              user={userProfile}
              onSelectSong={handleSelectSong}
              onProfilePress={handleProfilePress}
            />
          ) : activeTab === 'Library' ? (
            <LibraryScreen
              user={userProfile}
              onSelectPlaylist={handleSelectPlaylist}
              onSelectAlbum={handleSelectAlbum}
              onProfilePress={handleProfilePress}
            />
          ) : activeTab === 'Profile' ? (
            <ProfileScreen
              user={userProfile}
              onUpdateUser={updateUserProfile}
              onSelectSong={handleSelectSong}
              onSelectAlbum={handleAlbumPress}
            />
          ) : (
            <TabPlaceholder
              tab={activeTab}
              user={userProfile}
              onReturnHome={() => setActiveTab('Home')}
            />
          )}

          {/* Persistent Fixed Bottom Container: Mini-player & Bottom Navigation */}
          <View style={styles.bottomDock}>
            <MiniPlayer
              track={currentTrack}
              isPlaying={isPlaying}
              onTogglePlay={togglePlayPause}
              onToggleFavorite={() => toggleFavorite(currentTrack.id)}
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

          {/* Phase 3: Comprehensive Song Options 3-Dots Modal */}
          <SongOptionsModal
            visible={isOptionsModalOpen}
            song={activeSongForOptions}
            isLiked={activeSongForOptions ? likedSongIds.includes(activeSongForOptions.id) : false}
            playlists={playlists}
            onClose={closeOptionsModal}
            onPlayNext={playNextInQueue}
            onAddToQueue={addToQueue}
            onToggleFavorite={(songId) => toggleFavorite(songId)}
            onAddToPlaylist={(playlistId, songId) => addSongToPlaylist(playlistId, songId)}
            onOpenAlbum={(albumId) => {
              const matched = mockAlbums.find((a) => a.id === albumId);
              if (matched) openAlbumView(matched);
            }}
          />

          {/* Phase 3: Create Playlist Modal */}
          <CreatePlaylistModal
            visible={isCreatePlaylistOpen}
            onClose={closeCreatePlaylist}
            onCreate={(name, desc) => createPlaylist(name, desc)}
          />

          {/* Phase 3: Playlist Detail Modal */}
          <PlaylistDetailModal
            visible={!!selectedPlaylistForView}
            playlist={selectedPlaylistForView}
            onClose={closePlaylistView}
            onPlaySong={handleSelectSong}
            onPlayAll={playPlaylist}
            onSongOptions={openOptionsModal}
          />

          {/* Phase 3: Album Detail Modal */}
          <AlbumDetailModal
            visible={!!selectedAlbumForView}
            album={selectedAlbumForView}
            onClose={closeAlbumView}
            onPlaySong={handleSelectSong}
            onPlayAlbum={playAlbum}
            onSongOptions={openOptionsModal}
          />
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

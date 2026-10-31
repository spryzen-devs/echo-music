import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  Alert,
} from 'react-native';
import { UserProfile } from '../../types';
import { LibraryPlaylist, LibraryAlbum } from '../../types/music';
import { mockAlbums } from '../../data/musicData';
import { Colors } from '../../constants/colors';
import { usePlayback } from '../../context/PlaybackContext';
import { LibraryHero } from './LibraryHero';
import { PlaylistSection } from './PlaylistSection';
import { AlbumSection } from './AlbumSection';

interface LibraryScreenProps {
  user: UserProfile;
  onSelectPlaylist?: (playlist: LibraryPlaylist) => void;
  onSelectAlbum?: (album: LibraryAlbum) => void;
  onProfilePress?: () => void;
}

export const LibraryScreen: React.FC<LibraryScreenProps> = ({
  user,
  onSelectPlaylist,
  onSelectAlbum,
  onProfilePress,
}) => {
  const {
    playlists,
    openCreatePlaylist,
    openPlaylistView,
    openAlbumView,
    playPlaylist,
    playAlbum,
  } = usePlayback();

  // Cloud Music Access interaction
  const handleCloudPress = () => {
    const title = 'My Cloud Music';
    const message =
      'Personal cloud storage integration (Cloudflare R2) is scheduled for a future phase. Your music library remains local and private.';
    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  // Create Playlist interaction
  const handleCreatePlaylist = () => {
    openCreatePlaylist();
  };

  // Playlist selection opens playlist detail modal
  const handleSelectPlaylist = (playlist: LibraryPlaylist) => {
    if (onSelectPlaylist) {
      onSelectPlaylist(playlist);
    }
    openPlaylistView(playlist);
  };

  // Album selection opens album detail modal
  const handleSelectAlbum = (album: LibraryAlbum) => {
    if (onSelectAlbum) {
      onSelectAlbum(album);
    }
    openAlbumView(album);
  };

  // Contextual menu for playlists
  const handlePlaylistMenu = (playlist: LibraryPlaylist) => {
    playPlaylist(playlist);
  };

  // Contextual menu for albums
  const handleAlbumMenu = (album: LibraryAlbum) => {
    playAlbum(album);
  };

  return (
    <ScrollView
      style={styles.scrollArea}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Large Photographic Hero Section with Cloud Access Card */}
      <LibraryHero
        user={user}
        onCloudPress={handleCloudPress}
        onProfilePress={onProfilePress}
      />

      {/* 2. Ivory Sheet with Botanical Shadows */}
      <View style={styles.sheetContainer}>
        {/* Natural leaf shadow overlay on the right */}
        <Image
          source={require('../../assets/images/music/library/leaf_shadow_clean.png')}
          style={styles.leafShadow}
          resizeMode="contain"
          pointerEvents="none"
        />

        {/* Playlists Section with + Button */}
        <PlaylistSection
          playlists={playlists}
          onSelectPlaylist={handleSelectPlaylist}
          onMenuPress={handlePlaylistMenu}
          onCreatePlaylist={handleCreatePlaylist}
        />

        {/* Albums Section */}
        <AlbumSection
          albums={mockAlbums}
          onSelectAlbum={handleSelectAlbum}
          onMenuPress={handleAlbumMenu}
        />

        {/* Bottom Spacer to guarantee full clearance above MiniPlayer */}
        <View style={styles.bottomSpacer} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollArea: {
    flex: 1,
    width: '100%',
    minHeight: 0,
    backgroundColor: Colors.background,
    ...Platform.select({
      web: {
        overflowY: 'auto' as any,
      },
    }),
  },
  scrollContent: {
    paddingBottom: 20,
  },
  sheetContainer: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -16, // Seamless overlap onto hero background
    flex: 1,
    minHeight: 520,
    position: 'relative',
    overflow: 'hidden',
  },
  leafShadow: {
    position: 'absolute',
    right: -20,
    top: 30,
    width: 220,
    height: 560,
    opacity: 0.65,
  },
  bottomSpacer: {
    height: 180, // Generous clearance above floating mini-player & bottom nav dock
  },
});

export default LibraryScreen;

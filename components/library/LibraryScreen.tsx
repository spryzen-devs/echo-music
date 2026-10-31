import React, { useState } from 'react';
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
import { mockLibraryPlaylists, mockLibraryAlbums } from '../../data/mockLibrary';
import { Colors } from '../../constants/colors';
import { LibraryHero } from './LibraryHero';
import { PlaylistSection } from './PlaylistSection';
import { AlbumSection } from './AlbumSection';

interface LibraryScreenProps {
  user: UserProfile;
  onSelectPlaylist: (playlist: LibraryPlaylist) => void;
  onSelectAlbum: (album: LibraryAlbum) => void;
  onProfilePress?: () => void;
}

export const LibraryScreen: React.FC<LibraryScreenProps> = ({
  user,
  onSelectPlaylist,
  onSelectAlbum,
  onProfilePress,
}) => {
  const [playlists, setPlaylists] = useState<LibraryPlaylist[]>(mockLibraryPlaylists);
  const [albums] = useState<LibraryAlbum[]>(mockLibraryAlbums);

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
    const newName = `New Mix #${playlists.length + 1}`;
    const newPlaylist: LibraryPlaylist = {
      id: `playlist-custom-${Date.now()}`,
      name: newName,
      songCount: 0,
      artwork: require('../../assets/images/music/library/playlist_chill.png'),
    };
    setPlaylists((prev) => [...prev, newPlaylist]);

    const msg = `Created "${newName}". You can now add tracks to this playlist.`;
    if (Platform.OS === 'web') {
      window.alert(msg);
    } else {
      Alert.alert('Playlist Created', msg);
    }
  };

  // Contextual menu for playlists
  const handlePlaylistMenu = (playlist: LibraryPlaylist) => {
    const msg = `Options for "${playlist.name}" (${playlist.songCount} songs):\n• Play all\n• Add to queue\n• Rename playlist`;
    if (Platform.OS === 'web') {
      window.alert(msg);
    } else {
      Alert.alert(playlist.name, msg);
    }
  };

  // Contextual menu for albums
  const handleAlbumMenu = (album: LibraryAlbum) => {
    const msg = `Options for "${album.title}" (${album.songCount} songs):\n• Play album\n• Add to queue\n• View album info`;
    if (Platform.OS === 'web') {
      window.alert(msg);
    } else {
      Alert.alert(album.title, msg);
    }
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
          onSelectPlaylist={onSelectPlaylist}
          onMenuPress={handlePlaylistMenu}
          onCreatePlaylist={handleCreatePlaylist}
        />

        {/* Albums Section */}
        <AlbumSection
          albums={albums}
          onSelectAlbum={onSelectAlbum}
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
    flexGrow: 1,
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


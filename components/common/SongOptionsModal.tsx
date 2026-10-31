import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Modal,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Song, Playlist } from '../../types/music';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Radius } from '../../constants/spacing';
import { Shadows } from '../../constants/theme';
import { mockAlbums } from '../../data/musicData';

interface SongOptionsModalProps {
  visible: boolean;
  song: Song | null;
  isLiked: boolean;
  playlists: Playlist[];
  onClose: () => void;
  onPlayNext: (song: Song) => void;
  onAddToQueue: (song: Song) => void;
  onToggleFavorite: (songId: string) => void;
  onAddToPlaylist: (playlistId: string, songId: string) => void;
  onOpenAlbum?: (albumId: string) => void;
}

export const SongOptionsModal: React.FC<SongOptionsModalProps> = ({
  visible,
  song,
  isLiked,
  playlists,
  onClose,
  onPlayNext,
  onAddToQueue,
  onToggleFavorite,
  onAddToPlaylist,
  onOpenAlbum,
}) => {
  const [showPlaylistPicker, setShowPlaylistPicker] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!song) return null;

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
      onClose();
      setShowPlaylistPicker(false);
    }, 1200);
  };

  const handlePlayNext = () => {
    onPlayNext(song);
    showNotification(`"${song.title}" will play next`);
  };

  const handleAddToQueue = () => {
    onAddToQueue(song);
    showNotification(`Added "${song.title}" to queue`);
  };

  const handleToggleFav = () => {
    onToggleFavorite(song.id);
    showNotification(isLiked ? 'Removed from Liked Songs' : 'Saved to Liked Songs');
  };

  const handleSelectPlaylist = (playlist: Playlist) => {
    onAddToPlaylist(playlist.id, song.id);
    showNotification(`Added to "${playlist.name}"`);
  };

  const handleGoToAlbum = () => {
    if (song.album && onOpenAlbum) {
      const match = mockAlbums.find(
        (a) => a.title.toLowerCase() === song.album?.toLowerCase()
      );
      if (match) {
        onClose();
        onOpenAlbum(match.id);
        return;
      }
    }
    showNotification(`Album: ${song.album || 'Single'}`);
  };

  const handleShare = () => {
    const text = `Listen to "${song.title}" by ${song.artist} on Echo`;
    if (Platform.OS === 'web') {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        showNotification('Song link copied to clipboard!');
      } else {
        window.alert(text);
      }
    } else {
      Alert.alert('Share Song', text);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <Pressable style={styles.scrim} onPress={onClose} />

        <View style={[styles.sheetContainer, Shadows.floating]}>
          {/* Grab Handle */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          {/* Song Info Header */}
          <View style={styles.header}>
            <Image source={song.artwork} style={styles.artwork} resizeMode="cover" />
            <View style={styles.headerText}>
              <Text style={styles.title} numberOfLines={1}>
                {song.title}
              </Text>
              <Text style={styles.artist} numberOfLines={1}>
                {song.artist} {song.album ? `• ${song.album}` : ''}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Feedback Toast */}
          {toastMessage && (
            <View style={styles.toast}>
              <Ionicons name="checkmark-circle" size={18} color="#2D4739" />
              <Text style={styles.toastText}>{toastMessage}</Text>
            </View>
          )}

          {/* Playlist Picker View */}
          {showPlaylistPicker ? (
            <View style={styles.playlistPickerContainer}>
              <View style={styles.pickerHeader}>
                <Pressable
                  accessibilityRole="button"
                  hitSlop={8}
                  style={styles.backButton}
                  onPress={() => setShowPlaylistPicker(false)}
                >
                  <Ionicons name="arrow-back" size={20} color={Colors.text.primary} />
                </Pressable>
                <Text style={styles.pickerTitle}>Add to Playlist</Text>
              </View>

              <ScrollView style={styles.playlistList} showsVerticalScrollIndicator={false}>
                {playlists.map((pl) => (
                  <Pressable
                    key={pl.id}
                    accessibilityRole="button"
                    style={({ pressed }) => [styles.playlistItem, pressed && styles.rowPressed]}
                    onPress={() => handleSelectPlaylist(pl)}
                  >
                    <Image source={pl.artwork} style={styles.playlistThumb} resizeMode="cover" />
                    <View style={styles.playlistItemText}>
                      <Text style={styles.playlistItemName} numberOfLines={1}>
                        {pl.name}
                      </Text>
                      <Text style={styles.playlistItemCount}>
                        {pl.songIds.length} songs
                      </Text>
                    </View>
                    <Ionicons name="add-circle-outline" size={22} color={Colors.forest.primary} />
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          ) : (
            /* Standard Action Options */
            <ScrollView style={styles.actionsList} showsVerticalScrollIndicator={false}>
              {/* Option 1: Play Next */}
              <Pressable
                accessibilityRole="button"
                style={({ pressed }) => [styles.actionRow, pressed && styles.rowPressed]}
                onPress={handlePlayNext}
              >
                <View style={styles.iconCircle}>
                  <Ionicons name="play-skip-forward-outline" size={20} color={Colors.forest.primary} />
                </View>
                <Text style={styles.actionLabel}>Play Next</Text>
              </Pressable>

              {/* Option 2: Add to Queue */}
              <Pressable
                accessibilityRole="button"
                style={({ pressed }) => [styles.actionRow, pressed && styles.rowPressed]}
                onPress={handleAddToQueue}
              >
                <View style={styles.iconCircle}>
                  <Ionicons name="list-outline" size={20} color={Colors.forest.primary} />
                </View>
                <Text style={styles.actionLabel}>Add to Queue</Text>
              </Pressable>

              {/* Option 3: Add to Playlist */}
              <Pressable
                accessibilityRole="button"
                style={({ pressed }) => [styles.actionRow, pressed && styles.rowPressed]}
                onPress={() => setShowPlaylistPicker(true)}
              >
                <View style={styles.iconCircle}>
                  <Ionicons name="folder-open-outline" size={20} color={Colors.forest.primary} />
                </View>
                <Text style={styles.actionLabel}>Add to Playlist...</Text>
                <Ionicons name="chevron-forward" size={18} color="#A0998B" style={styles.chevron} />
              </Pressable>

              {/* Option 4: Favorite */}
              <Pressable
                accessibilityRole="button"
                style={({ pressed }) => [styles.actionRow, pressed && styles.rowPressed]}
                onPress={handleToggleFav}
              >
                <View style={styles.iconCircle}>
                  <Ionicons
                    name={isLiked ? 'heart' : 'heart-outline'}
                    size={20}
                    color={isLiked ? '#D9534F' : Colors.forest.primary}
                  />
                </View>
                <Text style={styles.actionLabel}>
                  {isLiked ? 'Remove from Liked Songs' : 'Like Song'}
                </Text>
              </Pressable>

              {/* Option 5: View Album */}
              {song.album && (
                <Pressable
                  accessibilityRole="button"
                  style={({ pressed }) => [styles.actionRow, pressed && styles.rowPressed]}
                  onPress={handleGoToAlbum}
                >
                  <View style={styles.iconCircle}>
                    <Ionicons name="disc-outline" size={20} color={Colors.forest.primary} />
                  </View>
                  <Text style={styles.actionLabel}>View Album ({song.album})</Text>
                </Pressable>
              )}

              {/* Option 6: Share */}
              <Pressable
                accessibilityRole="button"
                style={({ pressed }) => [styles.actionRow, pressed && styles.rowPressed]}
                onPress={handleShare}
              >
                <View style={styles.iconCircle}>
                  <Ionicons name="share-outline" size={20} color={Colors.forest.primary} />
                </View>
                <Text style={styles.actionLabel}>Share Track</Text>
              </Pressable>
            </ScrollView>
          )}

          {/* Close Button */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close options"
            style={({ pressed }) => [styles.closeButton, pressed && styles.closePressed]}
            onPress={onClose}
          >
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(24, 32, 22, 0.55)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sheetContainer: {
    width: '100%',
    maxWidth: 430,
    backgroundColor: '#FAF7F0',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'web' ? 24 : 36,
    paddingHorizontal: 20,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(160, 150, 130, 0.35)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  artwork: {
    width: 52,
    height: 52,
    borderRadius: Radius.sm,
    backgroundColor: '#E8E2D6',
  },
  headerText: {
    flex: 1,
    marginLeft: 14,
  },
  title: {
    ...Typography.cardTitle,
    fontSize: 16,
    color: Colors.text.primary,
    fontWeight: '600',
  },
  artist: {
    ...Typography.cardSubtitle,
    fontSize: 13,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(160, 150, 130, 0.25)',
    marginVertical: 8,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E2EBDD',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginVertical: 6,
    gap: 8,
  },
  toastText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2D4739',
  },
  actionsList: {
    maxHeight: 280,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 12,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  rowPressed: {
    backgroundColor: 'rgba(160, 150, 130, 0.1)',
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(45, 71, 57, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  actionLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: Colors.text.primary,
  },
  chevron: {
    marginLeft: 8,
  },
  playlistPickerContainer: {
    maxHeight: 280,
  },
  pickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  backButton: {
    padding: 6,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  pickerTitle: {
    ...Typography.sectionTitle,
    fontSize: 16,
    color: Colors.text.primary,
  },
  playlistList: {
    maxHeight: 220,
    marginTop: 6,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 12,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  playlistThumb: {
    width: 42,
    height: 42,
    borderRadius: Radius.sm,
    backgroundColor: '#E8E2D6',
  },
  playlistItemText: {
    flex: 1,
    marginLeft: 12,
  },
  playlistItemName: {
    fontSize: 14.5,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  playlistItemCount: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  closeButton: {
    marginTop: 14,
    paddingVertical: 13,
    backgroundColor: 'rgba(160, 150, 130, 0.12)',
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  closePressed: {
    opacity: 0.7,
  },
  closeText: {
    fontSize: 14.5,
    fontWeight: '600',
    color: Colors.text.primary,
  },
});

export default SongOptionsModal;

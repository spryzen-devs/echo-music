import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Album, Song } from '../../types/music';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Radius } from '../../constants/spacing';
import { Shadows } from '../../constants/theme';
import { getSongsByIds } from '../../data/musicData';

interface AlbumDetailModalProps {
  visible: boolean;
  album: Album | null;
  onClose: () => void;
  onPlaySong: (song: Song) => void;
  onPlayAlbum: (album: Album) => void;
  onSongOptions: (song: Song) => void;
}

export const AlbumDetailModal: React.FC<AlbumDetailModalProps> = ({
  visible,
  album,
  onClose,
  onPlaySong,
  onPlayAlbum,
  onSongOptions,
}) => {
  if (!album) return null;

  const songs = getSongsByIds(album.songIds);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={[styles.container, Shadows.floating]}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Back"
              hitSlop={12}
              style={styles.iconButton}
              onPress={onClose}
            >
              <Ionicons name="chevron-down" size={26} color={Colors.text.primary} />
            </Pressable>
            <Text style={styles.topBarTitle}>Album</Text>
            <View style={styles.iconButtonPlaceholder} />
          </View>

          <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
            {/* Album Hero Info */}
            <View style={styles.heroSection}>
              <Image source={album.artwork} style={styles.coverArtwork} resizeMode="cover" />
              <Text style={styles.albumTitle}>{album.title}</Text>
              <Text style={styles.artistName}>{album.artist}</Text>
              <Text style={styles.statsText}>{songs.length} tracks</Text>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Play album"
                  style={({ pressed }) => [styles.playAllButton, pressed && styles.pressed]}
                  onPress={() => onPlayAlbum(album)}
                >
                  <Ionicons name="play" size={18} color="#FAF5ED" />
                  <Text style={styles.playAllText}>Play Album</Text>
                </Pressable>
              </View>
            </View>

            {/* Song List */}
            <View style={styles.songList}>
              {songs.map((song, index) => (
                <View key={song.id} style={styles.songRow}>
                  <Pressable
                    accessibilityRole="button"
                    style={({ pressed }) => [styles.songMain, pressed && styles.pressed]}
                    onPress={() => onPlaySong(song)}
                  >
                    <Text style={styles.trackIndex}>{index + 1}</Text>
                    <Image source={song.artwork} style={styles.songThumb} resizeMode="cover" />
                    <View style={styles.songTextCol}>
                      <Text style={styles.songTitle} numberOfLines={1}>
                        {song.title}
                      </Text>
                      <Text style={styles.songArtist} numberOfLines={1}>
                        {song.artist}
                      </Text>
                    </View>
                  </Pressable>

                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Options for ${song.title}`}
                    hitSlop={8}
                    style={styles.songMenuButton}
                    onPress={() => onSongOptions(song)}
                  >
                    <Ionicons name="ellipsis-vertical" size={16} color="#A0998B" />
                  </Pressable>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(24, 32, 22, 0.6)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxWidth: 430,
    height: '92%',
    backgroundColor: Colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(160, 150, 130, 0.2)',
  },
  topBarTitle: {
    ...Typography.bodyMedium,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  iconButton: {
    padding: 6,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  iconButtonPlaceholder: {
    width: 38,
  },
  scrollArea: {
    flex: 1,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  coverArtwork: {
    width: 170,
    height: 170,
    borderRadius: Radius.lg,
    backgroundColor: '#E8E2D6',
    marginBottom: 16,
  },
  albumTitle: {
    ...Typography.sectionTitle,
    fontSize: 22,
    color: Colors.text.primary,
    textAlign: 'center',
  },
  artistName: {
    ...Typography.bodyMedium,
    fontSize: 14.5,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: 4,
  },
  statsText: {
    fontSize: 12,
    color: Colors.forest.primary,
    fontWeight: '600',
    marginTop: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  actionButtons: {
    marginTop: 16,
  },
  playAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.forest.primary,
    paddingVertical: 10,
    paddingHorizontal: 26,
    borderRadius: 24,
    gap: 8,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  playAllText: {
    fontSize: 14.5,
    fontWeight: '600',
    color: '#FAF5ED',
  },
  songList: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(160, 150, 130, 0.15)',
  },
  songMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  trackIndex: {
    width: 22,
    fontSize: 13,
    color: '#A0998B',
    textAlign: 'center',
  },
  songThumb: {
    width: 44,
    height: 44,
    borderRadius: Radius.sm,
    backgroundColor: '#E8E2D6',
    marginLeft: 6,
  },
  songTextCol: {
    flex: 1,
    marginLeft: 12,
    paddingRight: 8,
  },
  songTitle: {
    fontSize: 14.5,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  songArtist: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  songMenuButton: {
    padding: 10,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  pressed: {
    opacity: 0.7,
  },
});

export default AlbumDetailModal;

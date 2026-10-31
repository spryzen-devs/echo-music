import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Song } from '../../types/music';
import { AlbumItem } from '../../types';
import { mockSongs } from '../../data/musicData';
import { mockRecentlyPlayed } from '../../constants/mockData';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius } from '../../constants/spacing';
import { Shadows } from '../../constants/theme';
import { usePlayback } from '../../context/PlaybackContext';

interface ProfileFavoritesProps {
  onSelectSong: (song: Song) => void;
  onSelectAlbum: (album: AlbumItem) => void;
}

export const ProfileFavorites: React.FC<ProfileFavoritesProps> = ({
  onSelectSong,
  onSelectAlbum,
}) => {
  const { likedSongIds, openOptionsModal } = usePlayback();

  // Actual liked songs filtered dynamically from shared state
  const favoriteSongs = mockSongs.filter((song) => likedSongIds.includes(song.id));
  const favoriteAlbums = mockRecentlyPlayed.slice(0, 2);
  const favoriteArtists = [
    { name: 'Frank Ocean', genre: 'R&B / Soul', tracks: '24 saved' },
    { name: 'Tame Impala', genre: 'Psychedelic Rock', tracks: '19 saved' },
    { name: 'Joji', genre: 'Lo-Fi / Alternative', tracks: '15 saved' },
  ];

  return (
    <View style={styles.container}>
      {/* 1. Favourite Songs Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Favorite Songs</Text>
          <Text style={styles.sectionCount}>{favoriteSongs.length} tracks</Text>
        </View>

        <View style={styles.listContainer}>
          {favoriteSongs.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="heart-outline" size={32} color="#A0998B" />
              <Text style={styles.emptyTitle}>No favorite songs yet</Text>
              <Text style={styles.emptySubtitle}>
                Tap the heart icon on any track in Now Playing or the MiniPlayer to save it here.
              </Text>
            </View>
          ) : (
            favoriteSongs.map((song) => (
              <View key={song.id} style={styles.songRowWrapper}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Play ${song.title} by ${song.artist}`}
                  style={({ pressed }) => [
                    styles.songRow,
                    pressed && styles.rowPressed,
                  ]}
                  onPress={() => onSelectSong(song)}
                >
                  <Image source={song.artwork} style={styles.songArtwork} resizeMode="cover" />
                  <View style={styles.songInfo}>
                    <Text style={styles.songTitle} numberOfLines={1}>
                      {song.title}
                    </Text>
                    <Text style={styles.songSubtitle} numberOfLines={1}>
                      {song.artist} {song.album ? `• ${song.album}` : ''}
                    </Text>
                  </View>
                  <Ionicons name="heart" size={18} color="#D9534F" style={styles.heartIcon} />
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Options for ${song.title}`}
                  hitSlop={8}
                  style={styles.optionsButton}
                  onPress={() => openOptionsModal(song)}
                >
                  <Ionicons name="ellipsis-vertical" size={16} color="#A0998B" />
                </Pressable>
              </View>
            ))
          )}
        </View>
      </View>

      {/* 2. Favourite Albums Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Favorite Albums</Text>
          <Text style={styles.sectionCount}>{favoriteAlbums.length} albums</Text>
        </View>

        <View style={styles.albumsGrid}>
          {favoriteAlbums.map((album) => (
            <Pressable
              key={album.id}
              accessibilityRole="button"
              accessibilityLabel={`Album ${album.title} by ${album.artist}`}
              style={({ pressed }) => [
                styles.albumCard,
                Shadows.card,
                pressed && styles.rowPressed,
              ]}
              onPress={() => onSelectAlbum(album)}
            >
              <Image source={album.artwork} style={styles.albumArtwork} resizeMode="cover" />
              <Text style={styles.albumTitle} numberOfLines={1}>
                {album.title}
              </Text>
              <Text style={styles.albumArtist} numberOfLines={1}>
                {album.artist}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* 3. Favourite Artists Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Artists</Text>
        </View>

        <View style={styles.artistsList}>
          {favoriteArtists.map((artist) => (
            <View key={artist.name} style={styles.artistRow}>
              <View style={styles.artistAvatar}>
                <Ionicons name="person" size={16} color={Colors.forest.primary} />
              </View>
              <View style={styles.artistInfo}>
                <Text style={styles.artistName}>{artist.name}</Text>
                <Text style={styles.artistGenre}>{artist.genre}</Text>
              </View>
              <Text style={styles.artistTracks}>{artist.tracks}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: 16,
    paddingBottom: 24,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  sectionTitle: {
    ...Typography.sectionTitle,
    fontSize: 18,
    color: Colors.text.primary,
  },
  sectionCount: {
    ...Typography.bodySmall,
    fontSize: 12,
    color: Colors.text.secondary,
  },
  listContainer: {
    backgroundColor: '#FAF7F0',
    borderRadius: Radius.lg,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(160, 150, 130, 0.15)',
  },
  songRowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 6,
  },
  songRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  rowPressed: {
    opacity: 0.7,
  },
  songArtwork: {
    width: 44,
    height: 44,
    borderRadius: Radius.sm,
    backgroundColor: '#E8E2D6',
  },
  songInfo: {
    flex: 1,
    marginLeft: 12,
    paddingRight: 8,
  },
  songTitle: {
    ...Typography.cardTitle,
    fontSize: 14,
    color: Colors.text.primary,
  },
  songSubtitle: {
    ...Typography.cardSubtitle,
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  heartIcon: {
    marginRight: 6,
  },
  optionsButton: {
    padding: 10,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  albumsGrid: {
    flexDirection: 'row',
    gap: 14,
  },
  albumCard: {
    flex: 1,
    backgroundColor: '#FAF7F0',
    borderRadius: Radius.md,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(160, 150, 130, 0.15)',
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  albumArtwork: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: Radius.sm,
    backgroundColor: '#E8E2D6',
    marginBottom: 8,
  },
  albumTitle: {
    ...Typography.cardTitle,
    fontSize: 13,
    color: Colors.text.primary,
  },
  albumArtist: {
    ...Typography.cardSubtitle,
    fontSize: 11,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  artistsList: {
    backgroundColor: '#FAF7F0',
    borderRadius: Radius.lg,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(160, 150, 130, 0.15)',
  },
  artistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  artistAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(45, 71, 57, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  artistInfo: {
    flex: 1,
    marginLeft: 12,
  },
  artistName: {
    ...Typography.cardTitle,
    fontSize: 14,
    color: Colors.text.primary,
  },
  artistGenre: {
    ...Typography.cardSubtitle,
    fontSize: 11,
    color: Colors.text.secondary,
    marginTop: 1,
  },
  artistTracks: {
    fontSize: 11,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    gap: 6,
  },
  emptyTitle: {
    ...Typography.cardTitle,
    fontSize: 15,
    color: Colors.text.primary,
    marginTop: 4,
  },
  emptySubtitle: {
    fontSize: 12,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 16,
    maxWidth: 240,
  },
});

export default ProfileFavorites;

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
import { mockSongs } from '../../data/mockSongs';
import { mockRecentlyPlayed } from '../../constants/mockData';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius } from '../../constants/spacing';
import { Shadows } from '../../constants/theme';

interface ProfileFavoritesProps {
  onSelectSong: (song: Song) => void;
  onSelectAlbum: (album: AlbumItem) => void;
}

export const ProfileFavorites: React.FC<ProfileFavoritesProps> = ({
  onSelectSong,
  onSelectAlbum,
}) => {
  // Favorite songs filtered from mock catalog
  const favoriteSongs = mockSongs.slice(0, 3);
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
          {favoriteSongs.map((song, index) => (
            <Pressable
              key={song.id}
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
                  {song.artist} • {song.album}
                </Text>
              </View>
              <Ionicons name="heart" size={18} color="#D9534F" style={styles.heartIcon} />
            </Pressable>
          ))}
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
          {favoriteArtists.map((artist, index) => (
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
    width: '100%',
    paddingHorizontal: Spacing.screenPadding,
  },
  section: {
    marginBottom: 22,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  sectionTitle: {
    ...Typography.sectionTitle,
    fontSize: 18,
    lineHeight: 22,
    color: Colors.text.primary,
  },
  sectionCount: {
    ...Typography.cardSubtitle,
    fontSize: 12,
    color: Colors.text.secondary,
  },
  listContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: Radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.85)',
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E6E0D4',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      } as any,
    }),
  },
  songArtwork: {
    width: 44,
    height: 44,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surfaceHover,
  },
  songInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  songTitle: {
    ...Typography.cardTitle,
    fontSize: 13.5,
    lineHeight: 18,
    color: Colors.text.primary,
    fontWeight: '600',
  },
  songSubtitle: {
    ...Typography.cardSubtitle,
    fontSize: 11.5,
    lineHeight: 15,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  heartIcon: {
    paddingLeft: 8,
  },
  albumsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  albumCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: Radius.md,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      } as any,
    }),
  },
  albumArtwork: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: Radius.sm,
    marginBottom: 8,
    backgroundColor: Colors.surfaceHover,
  },
  albumTitle: {
    ...Typography.cardTitle,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  albumArtist: {
    ...Typography.cardSubtitle,
    fontSize: 11,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  artistsList: {
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: Radius.lg,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.85)',
  },
  artistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E6E0D4',
  },
  artistAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#DFE7E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  artistInfo: {
    flex: 1,
  },
  artistName: {
    ...Typography.cardTitle,
    fontSize: 13.5,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  artistGenre: {
    ...Typography.cardSubtitle,
    fontSize: 11,
    color: Colors.text.secondary,
    marginTop: 1,
  },
  artistTracks: {
    ...Typography.cardSubtitle,
    fontSize: 11,
    color: Colors.text.muted,
  },
  rowPressed: {
    opacity: 0.75,
  },
});

export default ProfileFavorites;

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
import { LibraryAlbum } from '../../types/music';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius } from '../../constants/spacing';

interface AlbumRowProps {
  album: LibraryAlbum;
  onSelect: (album: LibraryAlbum) => void;
  onMenuPress: (album: LibraryAlbum) => void;
  showDivider?: boolean;
}

export const AlbumRow: React.FC<AlbumRowProps> = ({
  album,
  onSelect,
  onMenuPress,
  showDivider = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContent}>
        {/* Main Tappable Area: Artwork + Details */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Album ${album.title}, ${album.songCount} songs`}
          style={({ pressed }) => [styles.mainPressable, pressed && styles.rowPressed]}
          onPress={() => onSelect(album)}
        >
          <Image
            source={album.artwork}
            style={styles.artwork}
            resizeMode="cover"
          />

          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {album.title}
            </Text>
            <Text style={styles.songCount} numberOfLines={1}>
              {album.songCount} songs
            </Text>
          </View>
        </Pressable>

        {/* Sibling Contextual Menu Button (Not nested) */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Options for ${album.title}`}
          hitSlop={8}
          style={({ pressed }) => [styles.menuButton, pressed && styles.menuPressed]}
          onPress={() => onMenuPress(album)}
        >
          <Ionicons
            name="ellipsis-vertical"
            size={16}
            color={Colors.text.secondary}
          />
        </Pressable>
      </View>

      {/* Optional Separator */}
      {showDivider && <View style={styles.separator} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.screenPadding,
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  mainPressable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      } as any,
    }),
  },
  artwork: {
    width: 58,
    height: 58,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceHover,
  },
  textContainer: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
    paddingRight: 8,
  },
  title: {
    ...Typography.sectionTitle,
    fontSize: 15.5,
    lineHeight: 20,
    color: Colors.text.primary,
    fontWeight: '600',
  },
  songCount: {
    ...Typography.cardSubtitle,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.text.secondary,
    marginTop: 3,
  },
  menuButton: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      } as any,
    }),
  },
  menuPressed: {
    opacity: 0.5,
  },
  rowPressed: {
    opacity: 0.75,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E7E1D6',
    marginLeft: 72,
  },
});

export default AlbumRow;


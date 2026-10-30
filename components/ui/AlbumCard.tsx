import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AlbumItem } from '../../types';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius } from '../../constants/spacing';

interface AlbumCardProps {
  album: AlbumItem;
  onPress: (album: AlbumItem) => void;
  onMenuPress?: (album: AlbumItem) => void;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({
  album,
  onPress,
  onMenuPress,
}) => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Album ${album.title} by ${album.artist}`}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() => onPress(album)}
    >
      <View style={styles.imageWrapper}>
        <Image source={album.artwork} style={styles.image} resizeMode="cover" />
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.title} numberOfLines={1}>
          {album.title}
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Options for ${album.title}`}
          hitSlop={8}
          style={styles.menuButton}
          onPress={() => onMenuPress && onMenuPress(album)}
        >
          <Ionicons
            name="ellipsis-vertical"
            size={14}
            color={Colors.text.secondary}
          />
        </Pressable>
      </View>

      <Text style={styles.artist} numberOfLines={1}>
        {album.artist}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 108,
    marginRight: Spacing.md,
  },
  imageWrapper: {
    width: 108,
    height: 108,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.surfaceHover,
    marginBottom: Spacing.sm,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  title: {
    ...Typography.cardTitle,
    color: Colors.text.primary,
    flex: 1,
    paddingRight: 2,
  },
  menuButton: {
    padding: 2,
  },
  artist: {
    ...Typography.cardSubtitle,
    color: Colors.text.secondary,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});

export default AlbumCard;


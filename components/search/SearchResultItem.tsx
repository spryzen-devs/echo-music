import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Song } from '../../types/music';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius } from '../../constants/spacing';

interface SearchResultItemProps {
  song: Song;
  onSelectSong: (song: Song) => void;
  onMenuPress: (song: Song) => void;
  showDivider?: boolean;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({
  song,
  onSelectSong,
  onMenuPress,
  showDivider = true,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContent}>
        {/* Main interactive area for song playback */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Play ${song.title} by ${song.artist}`}
          style={({ pressed }) => [styles.songMainPressable, pressed && styles.pressed]}
          onPress={() => onSelectSong(song)}
        >
          {/* Square Album Artwork */}
          <Image
            source={song.artwork}
            style={styles.artwork}
            resizeMode="cover"
          />

          {/* Text Container: Title & Artist • Album */}
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {song.title}
            </Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              {song.artist} <Text style={styles.bullet}>&bull;</Text> {song.album}
            </Text>
          </View>
        </Pressable>

        {/* Sibling Three-Dot Menu Button - not nested! */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Options for ${song.title}`}
          hitSlop={8}
          style={({ pressed }) => [styles.menuButton, pressed && styles.menuPressed]}
          onPress={() => onMenuPress(song)}
        >
          <Ionicons
            name="ellipsis-vertical"
            size={16}
            color={Colors.text.secondary}
          />
        </Pressable>
      </View>

      {/* Subtle Separator */}
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
  songMainPressable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  artwork: {
    width: 52,
    height: 52,
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
    ...Typography.cardTitle,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.text.primary,
    fontWeight: '600',
  },
  subtitle: {
    ...Typography.cardSubtitle,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.text.secondary,
    marginTop: 3,
  },
  bullet: {
    color: Colors.text.muted,
  },
  menuButton: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuPressed: {
    opacity: 0.5,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E7E1D6',
    marginLeft: 66, // Aligns with text start
  },
  pressed: {
    opacity: 0.8,
  },
});

export default SearchResultItem;

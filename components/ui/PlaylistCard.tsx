import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PlaylistItem } from '../../types';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius } from '../../constants/spacing';

interface PlaylistCardProps {
  playlist: PlaylistItem;
  onPress: (playlist: PlaylistItem) => void;
  onPlayPress?: (playlist: PlaylistItem) => void;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({
  playlist,
  onPress,
  onPlayPress,
}) => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Playlist ${playlist.title}, ${playlist.subtitle}`}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() => onPress(playlist)}
    >
      <ImageBackground
        source={playlist.artwork}
        style={styles.imageBackground}
        imageStyle={styles.image}
        resizeMode="cover"
      >
        {/* Dark subtle gradient overlay at bottom for text legibility */}
        <View style={styles.overlay}>
          <View style={styles.content}>
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {playlist.title}
              </Text>
              <Text style={styles.subtitle} numberOfLines={1}>
                {playlist.subtitle}
              </Text>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Play ${playlist.title}`}
              style={({ pressed }) => [
                styles.playButton,
                pressed && styles.playButtonPressed,
              ]}
              onPress={() => {
                if (onPlayPress) {
                  onPlayPress(playlist);
                } else {
                  onPress(playlist);
                }
              }}
            >
              <Ionicons
                name="play"
                size={11}
                color={Colors.text.light}
                style={styles.playIcon}
              />
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 112,
    height: 126,
    marginRight: Spacing.md,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    backgroundColor: Colors.surfaceHover,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  image: {
    borderRadius: Radius.xl,
  },
  overlay: {
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 24,
    backgroundColor: 'rgba(16, 26, 20, 0.45)',
    justifyContent: 'flex-end',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  textContainer: {
    flex: 1,
    paddingRight: 4,
  },
  title: {
    ...Typography.cardTitle,
    color: Colors.text.light,
    fontSize: 13,
    lineHeight: 16,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    ...Typography.cardSubtitle,
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    lineHeight: 14,
    marginTop: 1,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  playButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(42, 66, 52, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  playIcon: {
    marginLeft: 1.5,
  },
  playButtonPressed: {
    backgroundColor: Colors.forest.dark,
    transform: [{ scale: 0.92 }],
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});

export default PlaylistCard;


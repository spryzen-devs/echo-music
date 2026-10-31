import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Song } from '../../types/music';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface SongInformationProps {
  currentTrack: Song;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const SongInformation: React.FC<SongInformationProps> = ({
  currentTrack,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <View style={styles.container}>
      {/* Title & Artist */}
      <View style={styles.textColumn}>
        <Text style={styles.title} numberOfLines={1}>
          {currentTrack.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {currentTrack.artist}
        </Text>
      </View>

      {/* Favorite Button */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        hitSlop={8}
        style={({ pressed }) => [styles.favoriteButton, pressed && styles.pressed]}
        onPress={onToggleFavorite}
      >
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={20}
          color={isFavorite ? '#C8DDB8' : '#FAF6F0'}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screenPadding,
    marginTop: 12,
    marginBottom: 10,
    width: '100%',
  },
  textColumn: {
    flex: 1,
    paddingRight: 16,
  },
  title: {
    ...Typography.heroTitle,
    fontSize: 23,
    lineHeight: 28,
    fontWeight: '600',
    color: '#FAF7F2',
    letterSpacing: -0.4,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  artist: {
    ...Typography.cardSubtitle,
    fontSize: 14,
    lineHeight: 18,
    color: '#D5CFC2',
    marginTop: 3,
    fontWeight: '400',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.22)',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',
      } as any,
    }),
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.95 }],
  },
});

export default SongInformation;


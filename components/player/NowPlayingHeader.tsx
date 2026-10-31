import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface NowPlayingHeaderProps {
  onClose: () => void;
  onMoreOptions: () => void;
}

export const NowPlayingHeader: React.FC<NowPlayingHeaderProps> = ({
  onClose,
  onMoreOptions,
}) => {
  return (
    <View style={styles.container}>
      {/* Downward Chevron on Left */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Collapse Now Playing"
        hitSlop={12}
        style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
        onPress={onClose}
      >
        <Ionicons name="chevron-down" size={24} color="#F4EFE6" />
      </Pressable>

      {/* Centered Now Playing Title with Subtle Accent Bar */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Now Playing</Text>
        <View style={styles.accentBar} />
      </View>

      {/* Options Menu on Right */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Playback options"
        hitSlop={12}
        style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
        onPress={onMoreOptions}
      >
        <Ionicons name="ellipsis-horizontal" size={22} color="#F4EFE6" />
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
    paddingTop: Platform.OS === 'web' ? 24 : 14,
    paddingBottom: 10,
    width: '100%',
    zIndex: 10,
  },
  iconButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    ...Typography.cardSubtitle,
    fontSize: 13,
    lineHeight: 16,
    color: '#E8E2D6',
    fontWeight: '500',
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  accentBar: {
    width: 24,
    height: 2,
    backgroundColor: 'rgba(232, 226, 214, 0.7)',
    borderRadius: 1,
    marginTop: 4,
  },
  pressed: {
    opacity: 0.7,
  },
});

export default NowPlayingHeader;


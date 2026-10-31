import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Radius } from '../../constants/spacing';
import { Shadows } from '../../constants/theme';

interface CloudMusicCardProps {
  onPress: () => void;
}

export const CloudMusicCard: React.FC<CloudMusicCardProps> = ({ onPress }) => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="My Cloud Music, your personal music collection"
      style={({ pressed }) => [
        styles.cardContainer,
        Shadows.card,
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
    >
      {/* Dark Forest-Green Circular Icon Container */}
      <View style={styles.iconCircle}>
        <Ionicons name="cloud" size={20} color="#FFFFFF" />
      </View>

      {/* Text Details */}
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          My Cloud Music
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          Your personal music collection
        </Text>
      </View>

      {/* Right Navigation Arrow */}
      <View style={styles.arrowContainer}>
        <Ionicons
          name="chevron-forward"
          size={16}
          color={Colors.text.secondary}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    borderRadius: Radius.lg + 2,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    maxWidth: 290,
    alignSelf: 'flex-start',
    marginTop: 18,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        backdropFilter: 'blur(16px)',
        userSelect: 'none',
      } as any,
    }),
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.forest.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 6,
  },
  title: {
    ...Typography.sectionTitle,
    fontSize: 15,
    lineHeight: 19,
    color: Colors.text.primary,
    fontWeight: '600',
  },
  subtitle: {
    ...Typography.cardSubtitle,
    fontSize: 11,
    lineHeight: 15,
    color: Colors.text.secondary,
    marginTop: 1,
  },
  arrowContainer: {
    paddingLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CloudMusicCard;


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

interface SettingsRowProps {
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  onPress: () => void;
}

export const SettingsRow: React.FC<SettingsRowProps> = ({
  iconName,
  title,
  description,
  onPress,
}) => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${description}`}
      style={({ pressed }) => [
        styles.container,
        Shadows.card,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      {/* Icon Badge */}
      <View style={styles.iconBadge}>
        <Ionicons name={iconName} size={20} color={Colors.forest.primary} />
      </View>

      {/* Text Details */}
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {description}
        </Text>
      </View>

      {/* Right Navigation Chevron */}
      <Ionicons
        name="chevron-forward"
        size={16}
        color={Colors.text.secondary}
        style={styles.chevron}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.62)',
    borderRadius: Radius.lg + 2,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    marginBottom: 9,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        backdropFilter: 'blur(12px)',
        userSelect: 'none',
      } as any,
    }),
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: '#E0E7E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
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
  description: {
    ...Typography.cardSubtitle,
    fontSize: 11.5,
    lineHeight: 15,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  chevron: {
    opacity: 0.7,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  },
});

export default SettingsRow;

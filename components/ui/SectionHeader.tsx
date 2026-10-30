import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  hasArrowCircle?: boolean;
  onActionPress?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actionText,
  hasArrowCircle,
  onActionPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {actionText && (
        <Pressable
          accessibilityRole="button"
          onPress={onActionPress}
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.actionText}>{actionText}</Text>
          <Ionicons
            name="chevron-forward"
            size={14}
            color={Colors.text.secondary}
            style={styles.chevron}
          />
        </Pressable>
      )}

      {hasArrowCircle && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`More for ${title}`}
          onPress={onActionPress}
          style={({ pressed }) => [
            styles.arrowCircleButton,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons
            name="arrow-forward"
            size={16}
            color={Colors.text.primary}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.screenPadding,
    marginBottom: Spacing.md,
  },
  textContainer: {
    flex: 1,
    paddingRight: Spacing.md,
  },
  title: {
    ...Typography.sectionTitle,
    color: Colors.text.primary,
  },
  subtitle: {
    ...Typography.sectionSubtitle,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  actionText: {
    ...Typography.cardSubtitle,
    color: Colors.text.secondary,
    fontSize: 12.5,
  },
  chevron: {
    marginLeft: 2,
  },
  arrowCircleButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.control.iconCircleBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.65,
  },
});

export default SectionHeader;


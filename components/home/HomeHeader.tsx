import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserProfile } from '../../types';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface HomeHeaderProps {
  user: UserProfile;
  onNotificationPress: () => void;
  onSettingsPress: () => void;
  onProfilePress?: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  user,
  onNotificationPress,
  onSettingsPress,
  onProfilePress,
}) => {
  return (
    <View style={styles.container}>
      {/* Profile & Greeting */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="User Profile"
        style={({ pressed }) => [styles.profileSection, pressed && styles.pressed]}
        onPress={onProfilePress}
      >
        <Image source={user.avatar} style={styles.avatar} resizeMode="cover" />
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>{user.greeting}</Text>
          <Text style={styles.userName}>{user.name}</Text>
        </View>
      </Pressable>

      {/* Action Buttons */}
      <View style={styles.actionsSection}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          onPress={onNotificationPress}
        >
          <Ionicons
            name="notifications-outline"
            size={18}
            color={Colors.text.primary}
          />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Settings"
          style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          onPress={onSettingsPress}
        >
          <Ionicons
            name="settings-outline"
            size={18}
            color={Colors.text.primary}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.surfaceHover,
  },
  greetingContainer: {
    marginLeft: 10,
  },
  greetingText: {
    ...Typography.greetingSubtitle,
    color: Colors.text.secondary,
  },
  userName: {
    ...Typography.greetingName,
    color: Colors.text.primary,
  },
  actionsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.control.iconCircleBg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(231, 226, 215, 0.6)',
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
});

export default HomeHeader;


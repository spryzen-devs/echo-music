import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius } from '../../constants/spacing';

export type ProfileTabType = 'Overview' | 'Favorites' | 'Listening Stats';

interface ProfileTabsProps {
  activeTab: ProfileTabType;
  onTabChange: (tab: ProfileTabType) => void;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs: ProfileTabType[] = ['Overview', 'Favorites', 'Listening Stats'];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <Pressable
            key={tab}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`${tab} tab`}
            style={({ pressed }) => [
              styles.tabPill,
              isActive ? styles.tabPillActive : styles.tabPillInactive,
              pressed && styles.tabPressed,
            ]}
            onPress={() => onTabChange(tab)}
          >
            <Text
              style={[
                styles.tabText,
                isActive ? styles.tabTextActive : styles.tabTextInactive,
              ]}
            >
              {tab}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: 16,
    paddingBottom: 14,
    gap: 8,
  },
  tabPill: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        userSelect: 'none',
      } as any,
    }),
  },
  tabPillActive: {
    backgroundColor: Colors.forest.primary,
  },
  tabPillInactive: {
    backgroundColor: '#EAE4D9',
  },
  tabText: {
    ...Typography.cardSubtitle,
    fontSize: 12.5,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  tabTextInactive: {
    color: Colors.text.primary,
  },
  tabPressed: {
    opacity: 0.8,
  },
});

export default ProfileTabs;


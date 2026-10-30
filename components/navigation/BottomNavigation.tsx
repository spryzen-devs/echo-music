import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationTab } from '../../types';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface BottomNavigationProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs: {
    id: NavigationTab;
    label: string;
    iconActive: keyof typeof Ionicons.glyphMap;
    iconInactive: keyof typeof Ionicons.glyphMap;
  }[] = [
    {
      id: 'Home',
      label: 'Home',
      iconActive: 'home',
      iconInactive: 'home-outline',
    },
    {
      id: 'Search',
      label: 'Search',
      iconActive: 'search',
      iconInactive: 'search-outline',
    },
    {
      id: 'Library',
      label: 'Library',
      iconActive: 'library',
      iconInactive: 'library-outline',
    },
    {
      id: 'Profile',
      label: 'Profile',
      iconActive: 'person',
      iconInactive: 'person-outline',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabsRow}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          const color = isActive ? Colors.forest.primary : Colors.control.inactive;

          return (
            <Pressable
              key={tab.id}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={`${tab.label} tab`}
              style={({ pressed }) => [
                styles.tabItem,
                pressed && styles.tabPressed,
              ]}
              onPress={() => onTabChange(tab.id)}
            >
              <Ionicons
                name={isActive ? tab.iconActive : tab.iconInactive}
                size={22}
                color={color}
              />
              <Text
                style={[
                  styles.tabLabel,
                  { color, fontWeight: isActive ? '600' : '400' },
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Home Indicator Bar for Android/iOS bar styling */}
      <View style={styles.homeIndicatorContainer}>
        <View style={styles.homeIndicator} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 4 : 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border.light,
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    minWidth: 60,
  },
  tabLabel: {
    ...Typography.navLabel,
    marginTop: 4,
  },
  tabPressed: {
    opacity: 0.7,
  },
  homeIndicatorContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 2,
  },
  homeIndicator: {
    width: 128,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(24, 36, 29, 0.4)',
  },
});

export default BottomNavigation;

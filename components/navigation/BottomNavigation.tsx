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
    iconType: 'ionicons' | 'libraryBars';
    iconActive?: keyof typeof Ionicons.glyphMap;
    iconInactive?: keyof typeof Ionicons.glyphMap;
  }[] = [
    {
      id: 'Home',
      label: 'Home',
      iconType: 'ionicons',
      iconActive: 'home',
      iconInactive: 'home-outline',
    },
    {
      id: 'Search',
      label: 'Search',
      iconType: 'ionicons',
      iconActive: 'search',
      iconInactive: 'search-outline',
    },
    {
      id: 'Library',
      label: 'Library',
      iconType: 'libraryBars',
    },
    {
      id: 'Profile',
      label: 'Profile',
      iconType: 'ionicons',
      iconActive: 'person',
      iconInactive: 'person-outline',
    },
  ];

  const renderIcon = (tab: typeof tabs[0], isActive: boolean, color: string) => {
    if (tab.iconType === 'libraryBars') {
      // 3 vertical bars representing books/library matching reference screenshot
      return (
        <View style={styles.libraryBarsWrapper}>
          <View style={[styles.libraryBar, { backgroundColor: color }]} />
          <View style={[styles.libraryBar, { backgroundColor: color }]} />
          <View
            style={[
              styles.libraryBar,
              styles.libraryBarSlanted,
              { backgroundColor: color },
            ]}
          />
        </View>
      );
    }

    const iconName = isActive ? tab.iconActive! : tab.iconInactive!;
    return <Ionicons name={iconName} size={22} color={color} />;
  };

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
              <View style={styles.iconContainer}>
                {renderIcon(tab, isActive, color)}
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color,
                    fontWeight: isActive ? '600' : '400',
                  },
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Home Indicator Bar */}
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
    width: '100%',
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
    minWidth: 64,
  },
  iconContainer: {
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  libraryBarsWrapper: {
    width: 20,
    height: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 3,
  },
  libraryBar: {
    width: 2.2,
    height: 16,
    borderRadius: 1,
  },
  libraryBarSlanted: {
    transform: [{ rotate: '18deg' }, { translateY: -1 }],
  },
  tabLabel: {
    ...Typography.navLabel,
    marginTop: 4,
    fontSize: 11,
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
    width: 132,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(24, 36, 29, 0.45)',
  },
});

export default BottomNavigation;

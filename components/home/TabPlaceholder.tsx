import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationTab, UserProfile } from '../../types';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius } from '../../constants/spacing';
import { Shadows } from '../../constants/theme';

interface TabPlaceholderProps {
  tab: NavigationTab;
  user: UserProfile;
  onReturnHome: () => void;
  onTrackSelect?: (title: string, artist: string) => void;
}

export const TabPlaceholder: React.FC<TabPlaceholderProps> = ({
  tab,
  user,
  onReturnHome,
}) => {
  if (tab === 'Search') {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Text style={styles.pageTitle}>Search</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Return to Home"
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
            onPress={onReturnHome}
          >
            <Ionicons name="close" size={20} color={Colors.text.primary} />
          </Pressable>
        </View>

        {/* Mock Search Bar */}
        <View style={[styles.searchBar, Shadows.subtle]}>
          <Ionicons name="search" size={18} color={Colors.text.secondary} />
          <Text style={styles.searchPlaceholder}>
            Artists, songs, or playlists...
          </Text>
        </View>

        {/* Explore Categories */}
        <Text style={styles.sectionHeading}>Browse Categories</Text>
        <View style={styles.categoriesGrid}>
          {[
            { name: 'Ambient & Drone', bg: '#DCE8E0', icon: 'leaf-outline' },
            { name: 'Indie Folk', bg: '#E8E1D5', icon: 'musical-notes-outline' },
            { name: 'Lo-fi Beats', bg: '#DDE3E8', icon: 'headset-outline' },
            { name: 'Acoustic Guitar', bg: '#EAE5D9', icon: 'radio-outline' },
            { name: 'Modern Classical', bg: '#E3DFE8', icon: 'disc-outline' },
            { name: 'Night Drive', bg: '#D5DFD8', icon: 'moon-outline' },
          ].map((cat, idx) => (
            <View
              key={idx}
              style={[
                styles.categoryCard,
                { backgroundColor: cat.bg },
                Shadows.subtle,
              ]}
            >
              <Ionicons
                name={cat.icon as any}
                size={22}
                color={Colors.forest.primary}
                style={styles.categoryIcon}
              />
              <Text style={styles.categoryName}>{cat.name}</Text>
            </View>
          ))}
        </View>

        {/* Phase Info Box */}
        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle-outline"
            size={18}
            color={Colors.forest.primary}
          />
          <Text style={styles.infoText}>
            Full text search and local indexing engine will be introduced in subsequent phases.
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back to Home"
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
          onPress={onReturnHome}
        >
          <Ionicons name="arrow-back" size={16} color={Colors.text.light} />
          <Text style={styles.primaryButtonText}>Back to Home</Text>
        </Pressable>
      </ScrollView>
    );
  }

  if (tab === 'Library') {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Text style={styles.pageTitle}>Your Library</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Return to Home"
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
            onPress={onReturnHome}
          >
            <Ionicons name="close" size={20} color={Colors.text.primary} />
          </Pressable>
        </View>

        {/* Quick Filter Badges */}
        <View style={styles.pillRow}>
          {['Playlists', 'Artists', 'Albums', 'Downloaded'].map((item, idx) => (
            <View
              key={idx}
              style={[
                styles.libraryPill,
                idx === 0 ? styles.libraryPillActive : styles.libraryPillInactive,
              ]}
            >
              <Text
                style={[
                  styles.libraryPillText,
                  idx === 0 && styles.libraryPillTextActive,
                ]}
              >
                {item}
              </Text>
            </View>
          ))}
        </View>

        {/* Summary items */}
        <View style={styles.libraryList}>
          {[
            {
              title: 'Liked Songs',
              desc: '327 tracks • Auto-updated',
              icon: 'heart',
              bg: Colors.sage.light,
            },
            {
              title: 'Your Top Mix',
              desc: '50 tracks • Refreshed weekly',
              icon: 'sparkles',
              bg: '#E8E1D5',
            },
            {
              title: 'Downloaded Tracks',
              desc: '84 songs • Available offline',
              icon: 'download-outline',
              bg: Colors.sage.light,
            },
            {
              title: 'Chill Outpost',
              desc: '12 playlists • Curated',
              icon: 'radio-outline',
              bg: '#DDE3E8',
            },
          ].map((item, idx) => (
            <View key={idx} style={[styles.libraryItemCard, Shadows.subtle]}>
              <View style={[styles.libraryItemIcon, { backgroundColor: item.bg }]}>
                <Ionicons
                  name={item.icon as any}
                  size={18}
                  color={Colors.forest.primary}
                />
              </View>
              <View style={styles.libraryItemText}>
                <Text style={styles.libraryItemTitle}>{item.title}</Text>
                <Text style={styles.libraryItemDesc}>{item.desc}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={Colors.text.secondary}
              />
            </View>
          ))}
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back to Home"
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
          onPress={onReturnHome}
        >
          <Ionicons name="arrow-back" size={16} color={Colors.text.light} />
          <Text style={styles.primaryButtonText}>Back to Home</Text>
        </Pressable>
      </ScrollView>
    );
  }

  // Profile Tab
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerRow}>
        <Text style={styles.pageTitle}>Profile</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Return to Home"
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          onPress={onReturnHome}
        >
          <Ionicons name="close" size={20} color={Colors.text.primary} />
        </Pressable>
      </View>

      {/* User Card */}
      <View style={[styles.profileCard, Shadows.subtle]}>
        <Image source={user.avatar} style={styles.largeAvatar} resizeMode="cover" />
        <Text style={styles.profileName}>{user.name}</Text>
        <View style={styles.badgePill}>
          <Text style={styles.badgeText}>Hi-Res Audio Listener</Text>
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={[styles.statBox, Shadows.subtle]}>
          <Text style={styles.statValue}>38</Text>
          <Text style={styles.statLabel}>Tracks Played</Text>
        </View>
        <View style={[styles.statBox, Shadows.subtle]}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Playlists</Text>
        </View>
        <View style={[styles.statBox, Shadows.subtle]}>
          <Text style={styles.statValue}>84</Text>
          <Text style={styles.statLabel}>Downloaded</Text>
        </View>
      </View>

      {/* Preferences Preview */}
      <View style={[styles.preferencesCard, Shadows.subtle]}>
        <View style={styles.prefRow}>
          <Ionicons name="volume-high-outline" size={18} color={Colors.forest.primary} />
          <Text style={styles.prefLabel}>Playback Quality</Text>
          <Text style={styles.prefValue}>Lossless FLAC</Text>
        </View>
        <View style={styles.prefDivider} />
        <View style={styles.prefRow}>
          <Ionicons name="color-palette-outline" size={18} color={Colors.forest.primary} />
          <Text style={styles.prefLabel}>Appearance</Text>
          <Text style={styles.prefValue}>Warm Ivory</Text>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Back to Home"
        style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
        onPress={onReturnHome}
      >
        <Ionicons name="arrow-back" size={16} color={Colors.text.light} />
        <Text style={styles.primaryButtonText}>Back to Home</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.md,
    paddingBottom: 200, // Ample clearance above mini-player & bottom nav
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  pageTitle: {
    ...Typography.sectionTitle,
    fontSize: 26,
    color: Colors.text.primary,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.control.iconCircleBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceCard,
    borderRadius: Radius.full,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  searchPlaceholder: {
    ...Typography.cardSubtitle,
    marginLeft: 10,
    color: Colors.text.muted,
  },
  sectionHeading: {
    ...Typography.cardTitle,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
    fontSize: 15,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: Spacing.xl,
  },
  categoryCard: {
    width: '47%',
    borderRadius: Radius.lg,
    padding: 14,
    minHeight: 80,
    justifyContent: 'space-between',
  },
  categoryIcon: {
    marginBottom: 8,
  },
  categoryName: {
    ...Typography.cardTitle,
    fontSize: 13,
    color: Colors.text.primary,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.sage.light,
    borderRadius: Radius.md,
    padding: 12,
    marginBottom: Spacing.xl,
    gap: 10,
  },
  infoText: {
    ...Typography.cardSubtitle,
    color: Colors.forest.primary,
    fontSize: 12,
    lineHeight: 16,
    flex: 1,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.forest.primary,
    paddingVertical: 12,
    borderRadius: Radius.full,
    gap: 8,
  },
  primaryButtonText: {
    ...Typography.buttonLabel,
    color: Colors.text.light,
    fontSize: 13.5,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: Spacing.lg,
  },
  libraryPill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: Radius.full,
  },
  libraryPillActive: {
    backgroundColor: Colors.forest.primary,
  },
  libraryPillInactive: {
    backgroundColor: Colors.control.iconCircleBg,
  },
  libraryPillText: {
    ...Typography.filterPill,
    color: Colors.text.secondary,
    fontSize: 12,
  },
  libraryPillTextActive: {
    color: Colors.text.light,
    fontWeight: '600',
  },
  libraryList: {
    gap: 10,
    marginBottom: Spacing.xl,
  },
  libraryItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceCard,
    borderRadius: Radius.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  libraryItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  libraryItemText: {
    flex: 1,
    marginLeft: 12,
  },
  libraryItemTitle: {
    ...Typography.cardTitle,
    color: Colors.text.primary,
    fontSize: 13.5,
  },
  libraryItemDesc: {
    ...Typography.cardSubtitle,
    color: Colors.text.secondary,
    fontSize: 11,
    marginTop: 1,
  },
  profileCard: {
    backgroundColor: Colors.surfaceCard,
    borderRadius: Radius.xl,
    padding: 24,
    alignItems: 'center',
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  largeAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 12,
  },
  profileName: {
    ...Typography.greetingName,
    fontSize: 22,
    color: Colors.text.primary,
    marginBottom: 6,
  },
  badgePill: {
    backgroundColor: Colors.sage.light,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  badgeText: {
    ...Typography.eyebrow,
    color: Colors.forest.primary,
    fontSize: 10,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: Spacing.lg,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.surfaceCard,
    borderRadius: Radius.md,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  statValue: {
    ...Typography.sectionTitle,
    color: Colors.forest.primary,
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    ...Typography.cardSubtitle,
    color: Colors.text.secondary,
    fontSize: 11,
    marginTop: 2,
  },
  preferencesCard: {
    backgroundColor: Colors.surfaceCard,
    borderRadius: Radius.lg,
    padding: 16,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  prefRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefLabel: {
    ...Typography.cardSubtitle,
    flex: 1,
    marginLeft: 10,
    color: Colors.text.primary,
    fontSize: 13,
  },
  prefValue: {
    ...Typography.cardSubtitle,
    color: Colors.text.secondary,
    fontSize: 12,
  },
  prefDivider: {
    height: 1,
    backgroundColor: Colors.border.subtle,
    marginVertical: 12,
  },
  pressed: {
    opacity: 0.8,
  },
});

export default TabPlaceholder;

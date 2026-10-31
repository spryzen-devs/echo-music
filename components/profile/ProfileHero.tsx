import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserProfile } from '../../types';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { ListeningStats } from './ListeningStats';

interface ProfileHeroProps {
  user: UserProfile;
  songsCount?: number;
  albumsCount?: number;
  playlistsCount?: number;
  onEditProfile: () => void;
  onSettingsPress: () => void;
}

export const ProfileHero: React.FC<ProfileHeroProps> = ({
  user,
  songsCount = 127,
  albumsCount = 8,
  playlistsCount = 4,
  onEditProfile,
  onSettingsPress,
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/music/profile/profile_hero_clean.png')}
        style={styles.heroBackground}
        resizeMode="cover"
      >
        <View style={styles.contentOverlay}>
          {/* Top Row: Right Settings Icon */}
          <View style={styles.topRow}>
            <View style={styles.topSpacer} />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Profile settings"
              hitSlop={8}
              style={({ pressed }) => [styles.settingsButton, pressed && styles.pressed]}
              onPress={onSettingsPress}
            >
              <Ionicons name="settings-outline" size={20} color="#F8F6F0" />
            </Pressable>
          </View>

          {/* Avatar with Edit Badge */}
          <View style={styles.avatarSection}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Edit profile photo"
              style={({ pressed }) => [styles.avatarContainer, pressed && styles.pressed]}
              onPress={onEditProfile}
            >
              <Image source={user.avatar} style={styles.avatar} resizeMode="cover" />
              <View style={styles.editBadge}>
                <Ionicons name="pencil" size={12} color="#FFFFFF" />
              </View>
            </Pressable>
          </View>

          {/* Name & Bio */}
          <View style={styles.infoSection}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.bioText}>{user.bio || 'Music for a calmer me.'}</Text>
          </View>

          {/* Listening Stats Panel */}
          <ListeningStats
            songs={songsCount}
            albums={albumsCount}
            playlists={playlistsCount}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 380,
    backgroundColor: Colors.background,
    overflow: 'hidden',
  },
  heroBackground: {
    width: '100%',
    height: '100%',
  },
  contentOverlay: {
    flex: 1,
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Platform.OS === 'web' ? 36 : 28,
    justifyContent: 'flex-start',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  topSpacer: {
    flex: 1,
  },
  settingsButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        backdropFilter: 'blur(12px)',
      } as any,
    }),
  },
  avatarSection: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  avatarContainer: {
    position: 'relative',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      } as any,
    }),
  },
  avatar: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    backgroundColor: Colors.surfaceHover,
  },
  editBadge: {
    position: 'absolute',
    right: 0,
    bottom: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.forest.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  infoSection: {
    alignItems: 'flex-start',
  },
  userName: {
    ...Typography.heroTitle,
    fontSize: 27,
    lineHeight: 32,
    fontWeight: '600',
    color: '#F8F6F0',
    letterSpacing: -0.4,
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  bioText: {
    ...Typography.cardSubtitle,
    color: 'rgba(255, 255, 255, 0.90)',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
    fontWeight: '400',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default ProfileHero;

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
import { UserProfile } from '../../types';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { Colors } from '../../constants/colors';
import { CloudMusicCard } from './CloudMusicCard';

interface LibraryHeroProps {
  user: UserProfile;
  onCloudPress: () => void;
  onProfilePress?: () => void;
}

export const LibraryHero: React.FC<LibraryHeroProps> = ({
  user,
  onCloudPress,
  onProfilePress,
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/music/library/library_hero_clean.png')}
        style={styles.heroBackground}
        resizeMode="cover"
      >
        <View style={styles.contentOverlay}>
          {/* Top Row: Title, Subtitle & Avatar */}
          <View style={styles.topRow}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Library</Text>
              <Text style={styles.subtitle}>Your music, always with you.</Text>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="User profile"
              style={({ pressed }) => [styles.avatarButton, pressed && styles.pressed]}
              onPress={onProfilePress}
            >
              <Image source={user.avatar} style={styles.avatar} resizeMode="cover" />
            </Pressable>
          </View>

          {/* Cloud Music Access Card */}
          <CloudMusicCard onPress={onCloudPress} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 320,
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
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    ...Typography.heroTitle,
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '600',
    color: '#F8F6F0',
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    ...Typography.cardSubtitle,
    color: 'rgba(255, 255, 255, 0.90)',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  avatarButton: {
    marginTop: 4,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      } as any,
    }),
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    backgroundColor: Colors.surfaceHover,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default LibraryHero;


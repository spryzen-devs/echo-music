import React from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserProfile } from '../../types';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius } from '../../constants/spacing';
import { Shadows } from '../../constants/theme';

interface SearchHeaderProps {
  user: UserProfile;
  query: string;
  onChangeQuery: (text: string) => void;
  onClearQuery: () => void;
  onSubmitSearch?: () => void;
  onMicrophonePress: () => void;
  onProfilePress?: () => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  user,
  query,
  onChangeQuery,
  onClearQuery,
  onSubmitSearch,
  onMicrophonePress,
  onProfilePress,
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/music/search/search_hero_clean.png')}
        style={styles.heroBackground}
        resizeMode="cover"
      >
        <View style={styles.contentOverlay}>
          {/* Top Bar: Title & Avatar */}
          <View style={styles.topRow}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Search</Text>
              <Text style={styles.subtitle}>Find the music for your mood.</Text>
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

          {/* Translucent Rounded Search Input Bar */}
          <View style={[styles.searchBar, Shadows.card]}>
            <Ionicons
              name="search"
              size={18}
              color={Colors.text.secondary}
              style={styles.searchIcon}
            />

            <TextInput
              style={styles.textInput}
              value={query}
              onChangeText={onChangeQuery}
              onSubmitEditing={onSubmitSearch}
              placeholder="Artists, songs, albums..."
              placeholderTextColor={Colors.text.muted}
              returnKeyType="search"
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="never"
            />

            {/* Clear Input Button (Visible when text exists) */}
            {query.length > 0 && (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Clear search text"
                hitSlop={8}
                style={({ pressed }) => [styles.clearButton, pressed && styles.pressed]}
                onPress={onClearQuery}
              >
                <Ionicons
                  name="close-circle"
                  size={18}
                  color={Colors.text.secondary}
                />
              </Pressable>
            )}

            {/* Microphone Button */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Voice search"
              hitSlop={8}
              style={({ pressed }) => [styles.micButton, pressed && styles.pressed]}
              onPress={onMicrophonePress}
            >
              <Ionicons
                name="mic-outline"
                size={20}
                color={Colors.forest.primary}
              />
            </Pressable>
          </View>

          {/* Artistic Editorial Motto */}
          <View style={styles.mottoContainer}>
            <Text style={styles.mottoText}>S E A R C H</Text>
            <Text style={styles.mottoText}>L I S T E N</Text>
            <Text style={styles.mottoText}>F E E L</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 340,
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
    paddingTop: Spacing.md,
    justifyContent: 'flex-start',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
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
    color: '#101B14',
    letterSpacing: -0.5,
  },
  subtitle: {
    ...Typography.cardSubtitle,
    color: '#384A3F',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
    fontWeight: '500',
  },
  avatarButton: {
    marginTop: 4,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: Colors.surfaceHover,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderRadius: Radius.full,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    ...Typography.cardTitle,
    fontSize: 13.5,
    color: Colors.text.primary,
    paddingVertical: 0,
    height: '100%',
    fontWeight: '400',
  },
  clearButton: {
    padding: 4,
    marginRight: 4,
  },
  micButton: {
    padding: 4,
    marginLeft: 4,
  },
  mottoContainer: {
    marginTop: 10,
    paddingLeft: 4,
    gap: 4,
  },
  mottoText: {
    fontFamily: Typography.eyebrow.fontFamily,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 3,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  pressed: {
    opacity: 0.7,
  },
});

export default SearchHeader;

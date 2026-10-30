import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FeaturedBannerItem } from '../../types';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius } from '../../constants/spacing';
import { Shadows } from '../../constants/theme';

interface FeaturedBannerProps {
  banners: FeaturedBannerItem[];
  onPlayMix: (banner: FeaturedBannerItem) => void;
}

export const FeaturedBanner: React.FC<FeaturedBannerProps> = ({
  banners,
  onPlayMix,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!banners || banners.length === 0) return null;
  const currentBanner = banners[activeIndex] || banners[0];

  const handleNextBanner = () => {
    setActiveIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Featured banner: ${currentBanner.title.replace('\n', ' ')}`}
        style={[styles.bannerWrapper, Shadows.card]}
        onPress={handleNextBanner}
      >
        <ImageBackground
          source={currentBanner.artwork}
          style={styles.imageBackground}
          imageStyle={styles.image}
          resizeMode="cover"
        >
          {/* Content Overlay */}
          <View style={styles.content}>
            {/* Eyebrow Label */}
            <Text style={styles.eyebrow}>{currentBanner.eyebrow}</Text>

            {/* Editorial Serif Heading */}
            <Text style={styles.title}>{currentBanner.title}</Text>

            {/* Subtitle */}
            <Text style={styles.subtitle}>{currentBanner.subtitle}</Text>

            {/* Play Mix Button */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Play ${currentBanner.buttonText}`}
              style={({ pressed }) => [
                styles.playMixButton,
                pressed && styles.playMixPressed,
              ]}
              onPress={() => onPlayMix(currentBanner)}
            >
              <Ionicons
                name="play"
                size={13}
                color={Colors.text.light}
                style={styles.playIcon}
              />
              <Text style={styles.playMixText}>{currentBanner.buttonText}</Text>
            </Pressable>
          </View>

          {/* Carousel Pagination Indicators */}
          <View style={styles.paginationContainer}>
            {banners.map((_, index) => {
              const isActive = index === activeIndex;
              return (
                <Pressable
                  key={index}
                  hitSlop={6}
                  onPress={() => setActiveIndex(index)}
                  style={[
                    styles.paginationDot,
                    isActive ? styles.paginationDotActive : styles.paginationDotInactive,
                  ]}
                />
              );
            })}
          </View>
        </ImageBackground>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.screenPadding,
    marginBottom: Spacing.sectionGap,
  },
  bannerWrapper: {
    width: '100%',
    height: 242,
    borderRadius: Radius.xxl,
    overflow: 'hidden',
    backgroundColor: Colors.sage.light,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    padding: 20,
  },
  image: {
    borderRadius: Radius.xxl,
  },
  content: {
    width: '58%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  eyebrow: {
    ...Typography.eyebrow,
    color: Colors.forest.primary,
    marginBottom: 8,
    opacity: 0.8,
  },
  title: {
    ...Typography.heroTitle,
    color: Colors.text.primary,
    marginBottom: 8,
    fontSize: 29,
    lineHeight: 34,
  },
  subtitle: {
    ...Typography.cardSubtitle,
    color: Colors.text.accent,
    lineHeight: 18,
    marginBottom: 16,
    opacity: 0.9,
  },
  playMixButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.forest.primary,
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: Radius.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  playMixPressed: {
    backgroundColor: Colors.forest.dark,
    transform: [{ scale: 0.97 }],
  },
  playIcon: {
    marginRight: 6,
  },
  playMixText: {
    ...Typography.buttonLabel,
    color: Colors.text.light,
    fontSize: 12.5,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'center',
    marginBottom: 2,
  },
  paginationDot: {
    height: 3,
    borderRadius: 2,
  },
  paginationDotActive: {
    width: 22,
    backgroundColor: '#FFFFFF',
  },
  paginationDotInactive: {
    width: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
  },
});

export default FeaturedBanner;


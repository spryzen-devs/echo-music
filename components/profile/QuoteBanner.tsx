import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { FontFamily } from '../../constants/typography';
import { Spacing, Radius } from '../../constants/spacing';
import { Shadows } from '../../constants/theme';

export const QuoteBanner: React.FC = () => {
  return (
    <View style={[styles.container, Shadows.card]}>
      <ImageBackground
        source={require('../../assets/images/music/profile/quote_banner_clean.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.content}>
          {/* Quotation Marks */}
          <Text style={styles.quotes}>“ “</Text>

          {/* Quote Text */}
          <Text style={styles.quoteText}>
            Good music{'\n'}makes a quieter mind.
          </Text>

          {/* Subtle Accent Line */}
          <View style={styles.accentLine} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.screenPadding,
    borderRadius: Radius.lg + 2,
    overflow: 'hidden',
    height: 140,
    marginBottom: 16,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'center',
    maxWidth: '75%',
  },
  quotes: {
    fontFamily: FontFamily.serif,
    fontSize: 22,
    lineHeight: 22,
    color: '#34473C',
    fontWeight: '700',
    marginBottom: 2,
  },
  quoteText: {
    fontFamily: FontFamily.serif,
    fontStyle: 'italic',
    fontSize: 18.5,
    lineHeight: 24,
    color: '#16281E',
    fontWeight: '400',
    letterSpacing: -0.2,
  },
  accentLine: {
    width: 28,
    height: 1.5,
    backgroundColor: '#34473C',
    marginTop: 10,
    borderRadius: 1,
    opacity: 0.7,
  },
});

export default QuoteBanner;

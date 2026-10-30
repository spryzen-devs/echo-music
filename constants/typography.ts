import { Platform, TextStyle } from 'react-native';

export const FontFamily = {
  serif: Platform.select({
    ios: 'Georgia',
    android: 'serif',
    web: 'Georgia, "Times New Roman", serif',
  }),
  sans: Platform.select({
    ios: 'System',
    android: 'sans-serif',
    web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  }),
  sansMedium: Platform.select({
    ios: 'System',
    android: 'sans-serif-medium',
    web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  }),
};

export const Typography: Record<string, TextStyle> = {
  // Editorial Serif Headlines
  heroTitle: {
    fontFamily: FontFamily.serif,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '400',
    letterSpacing: -0.5,
  },
  sectionTitle: {
    fontFamily: FontFamily.serif,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '400',
    letterSpacing: -0.3,
  },
  greetingName: {
    fontFamily: FontFamily.serif,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
    letterSpacing: -0.2,
  },

  // Sans-serif UI & Metadata
  eyebrow: {
    fontFamily: FontFamily.sansMedium,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  greetingSubtitle: {
    fontFamily: FontFamily.sans,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '400',
  },
  sectionSubtitle: {
    fontFamily: FontFamily.sans,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
  },
  cardTitle: {
    fontFamily: FontFamily.sansMedium,
    fontSize: 13.5,
    lineHeight: 18,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontFamily: FontFamily.sans,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  buttonLabel: {
    fontFamily: FontFamily.sansMedium,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  filterPill: {
    fontFamily: FontFamily.sansMedium,
    fontSize: 12.5,
    lineHeight: 16,
    fontWeight: '500',
  },
  navLabel: {
    fontFamily: FontFamily.sansMedium,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
  },
};

export default Typography;


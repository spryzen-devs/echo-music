import { Colors } from './colors';
import { Typography, FontFamily } from './typography';
import { Spacing, Radius, Layout } from './spacing';
import { Platform } from 'react-native';

export const Shadows = {
  subtle: Platform.select({
    web: {
      boxShadow: '0 2px 8px rgba(24, 36, 29, 0.04)',
    },
    default: {
      elevation: 1,
      shadowColor: '#18241D',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 4,
    },
  }),
  card: Platform.select({
    web: {
      boxShadow: '0 4px 14px rgba(24, 36, 29, 0.05)',
    },
    default: {
      elevation: 2,
      shadowColor: '#18241D',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
    },
  }),
  floating: Platform.select({
    web: {
      boxShadow: '0 8px 24px rgba(24, 36, 29, 0.12)',
    },
    default: {
      elevation: 5,
      shadowColor: '#18241D',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
    },
  }),
};

export const Theme = {
  colors: Colors,
  typography: Typography,
  fontFamily: FontFamily,
  spacing: Spacing,
  radius: Radius,
  layout: Layout,
  shadows: Shadows,
};

export default Theme;


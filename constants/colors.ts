/**
 * Echo Design System - Color Palette
 * Warm ivory, muted sage-green, and deep forest-green editorial theme
 */
export const Colors = {
  // Backgrounds
  background: '#F5F2EB', // Warm ivory background
  backgroundSecondary: '#EDE8DF', // Slightly deeper warm neutral
  surface: '#FAF8F5', // Card and container surface
  surfaceCard: '#FFFFFF', // Pure white card surfaces for Collections
  surfaceHover: '#EBE6DC',

  // Forest & Sage Greens
  forest: {
    primary: '#243C31', // Deep forest-green primary controls & buttons
    dark: '#1A2E25', // Very deep forest for pressed states
    light: '#314E40', // Slightly lighter forest
    playerBg: '#274134', // Mini player background
  },
  sage: {
    primary: '#4F6C5D', // Mid sage green
    accent: '#5E7D6D',
    light: '#DCE8E0', // Soft sage green for badges and icon backgrounds
    pillBg: '#E9EFEA', // Inactive filter pill background
    border: '#D8E2DC',
  },

  // Typography Colors
  text: {
    primary: '#18241D', // Deep forest-charcoal editorial headings
    secondary: '#5E6F64', // Muted sage-gray body and subtitles
    muted: '#8A998F', // Very soft muted text
    light: '#FFFFFF', // Pure white for buttons and badges
    cream: '#F5F2EB', // Warm ivory text
    accent: '#314E40',
  },

  // Borders & Dividers
  border: {
    light: '#E7E2D7',
    subtle: '#EAE6DC',
    card: '#E2DBD0',
  },

  // Controls & States
  control: {
    active: '#243C31',
    inactive: '#7B8B81',
    pillActiveBg: '#243C31',
    pillActiveText: '#FFFFFF',
    pillInactiveBg: '#E8E3D8',
    pillInactiveText: '#4A5B50',
    iconCircleBg: '#ECE7DD',
  },

  // Legacy compatibility for Phase 1
  cream: {
    background: '#F5F2EB',
    card: '#FFFFFF',
    cardAlt: '#FAF8F5',
    border: '#E7E2D7',
  },
};

export default Colors;

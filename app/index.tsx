import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

export default function WelcomeScreen() {
  const [pressedCount, setPressedCount] = useState(0);

  const handleGetStarted = () => {
    setPressedCount((prev) => prev + 1);
    const message = 'Echo Phase 1 environment is working! Ready for Phase 2.';
    if (Platform.OS === 'web') {
      window.alert(message);
    } else {
      Alert.alert('Echo Music', message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.contentCard}>
          {/* Status Badge */}
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>Phase 1 - Environment Ready</Text>
          </View>

          {/* Music Icon */}
          <View style={styles.iconContainer}>
            <Ionicons name="musical-notes" size={56} color={Colors.sage.primary} />
          </View>

          {/* App Title & Subtitle */}
          <Text style={styles.appName}>Echo</Text>
          <Text style={styles.tagline}>Your music. Your rules.</Text>

          {/* Description */}
          <Text style={styles.description}>
            A personal, clean music experience designed for Android and the web.
          </Text>

          {/* Action Button */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Get Started"
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleGetStarted}
          >
            <Ionicons
              name="play-circle-outline"
              size={20}
              color={Colors.text.light}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Get Started</Text>
          </Pressable>

          {/* Click / Tap Counter Feedback */}
          {pressedCount > 0 && (
            <Text style={styles.feedbackText}>
              Button pressed {pressedCount} {pressedCount === 1 ? 'time' : 'times'} - UI responsive!
            </Text>
          )}

          {/* Target platform indicator */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Running on <Text style={styles.footerPlatform}>{Platform.OS.toUpperCase()}</Text> &bull; Expo SDK 58
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.cream.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  contentCard: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: Colors.cream.card,
    borderRadius: 24,
    paddingHorizontal: 28,
    paddingVertical: 36,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.cream.border,
    ...Platform.select({
      web: {
        boxShadow: '0 8px 30px rgba(45, 62, 53, 0.08)',
      },
      default: {
        elevation: 3,
        shadowColor: Colors.sage.dark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
    }),
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.sage.light,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 28,
  },
  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.sage.primary,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.sage.dark,
    letterSpacing: 0.3,
  },
  iconContainer: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: Colors.sage.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(77, 106, 90, 0.15)',
  },
  appName: {
    fontSize: 38,
    fontWeight: '700',
    color: Colors.text.primary,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.sage.primary,
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.sage.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 14,
    width: '100%',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'background-color 0.15s ease',
      },
      default: {
        elevation: 2,
      },
    }),
  },
  buttonPressed: {
    backgroundColor: Colors.sage.dark,
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: Colors.text.light,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  feedbackText: {
    marginTop: 14,
    fontSize: 12,
    color: Colors.sage.secondary,
    fontWeight: '500',
  },
  footer: {
    marginTop: 28,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.cream.border,
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: Colors.text.muted,
  },
  footerPlatform: {
    fontWeight: '700',
    color: Colors.sage.primary,
  },
});


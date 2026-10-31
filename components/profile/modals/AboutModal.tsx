import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/colors';
import { Typography } from '../../../constants/typography';
import { Radius, Spacing } from '../../../constants/spacing';
import { Shadows } from '../../../constants/theme';

interface AboutModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.card, Shadows.floating]}>
          <View style={styles.header}>
            <View style={styles.appIconBadge}>
              <Ionicons name="musical-notes" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.titleColumn}>
              <Text style={styles.appName}>Echo</Text>
              <Text style={styles.versionText}>Version 1.0.0 (Phase 2.4)</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close"
              hitSlop={8}
              style={({ pressed }) => [styles.closeBtn, pressed && styles.pressed]}
              onPress={onClose}
            >
              <Ionicons name="close" size={20} color={Colors.text.secondary} />
            </Pressable>
          </View>

          <Text style={styles.tagline}>Your music. Your rules.</Text>

          <View style={styles.detailsBox}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Framework</Text>
              <Text style={styles.detailVal}>React Native & Expo</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Language</Text>
              <Text style={styles.detailVal}>TypeScript</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Navigation</Text>
              <Text style={styles.detailVal}>Expo Router</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Design System</Text>
              <Text style={styles.detailVal}>Editorial Warm Ivory</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Future Cloud</Text>
              <Text style={styles.detailVal}>Cloudflare R2</Text>
            </View>
          </View>

          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              style={({ pressed }) => [styles.doneBtn, pressed && styles.pressed]}
              onPress={onClose}
            >
              <Text style={styles.doneText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(20, 30, 24, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.screenPadding,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: Colors.background,
    borderRadius: Radius.xl,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E7E0D3',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  appIconBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.forest.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titleColumn: {
    flex: 1,
  },
  appName: {
    ...Typography.heroTitle,
    fontSize: 22,
    lineHeight: 26,
    color: Colors.text.primary,
  },
  versionText: {
    ...Typography.cardSubtitle,
    fontSize: 11.5,
    color: Colors.text.secondary,
  },
  closeBtn: {
    padding: 4,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  tagline: {
    ...Typography.cardSubtitle,
    fontStyle: 'italic',
    color: Colors.forest.primary,
    fontWeight: '500',
    marginBottom: 16,
    marginTop: 4,
  },
  detailsBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: Radius.md,
    padding: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E4DDD0',
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    ...Typography.cardSubtitle,
    fontSize: 12,
    color: Colors.text.secondary,
  },
  detailVal: {
    ...Typography.cardSubtitle,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  actions: {
    alignItems: 'flex-end',
  },
  doneBtn: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: Radius.full,
    backgroundColor: Colors.forest.primary,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  doneText: {
    ...Typography.cardSubtitle,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  pressed: {
    opacity: 0.75,
  },
});

export default AboutModal;


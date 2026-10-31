import React, { useState } from 'react';
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

interface StorageModalProps {
  visible: boolean;
  onClose: () => void;
}

export const StorageModal: React.FC<StorageModalProps> = ({
  visible,
  onClose,
}) => {
  const [cacheCleared, setCacheCleared] = useState(false);

  const handleClearCache = () => {
    setCacheCleared(true);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.card, Shadows.floating]}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Cloud Storage</Text>
              <Text style={styles.subtitle}>Powered by Cloudflare R2</Text>
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

          {/* Sample Data Disclaimer */}
          <View style={styles.sampleBadge}>
            <Ionicons name="cloud-outline" size={14} color={Colors.forest.primary} />
            <Text style={styles.sampleText}>
              Sample Storage Metrics (Cloudflare R2 integration ready)
            </Text>
          </View>

          {/* Usage Meter */}
          <View style={styles.usageContainer}>
            <View style={styles.usageHeader}>
              <Text style={styles.usageLabel}>Personal Cloud Tier</Text>
              <Text style={styles.usageValue}>2.4 GB / 10.0 GB</Text>
            </View>
            <View style={styles.usageTrack}>
              <View style={[styles.usageFill, { width: '24%' }]} />
            </View>
          </View>

          {/* Breakdown Items */}
          <View style={styles.breakdownList}>
            <View style={styles.breakdownRow}>
              <View style={[styles.dot, { backgroundColor: Colors.forest.primary }]} />
              <Text style={styles.breakdownName}>Lossless Audio (FLAC/ALAC)</Text>
              <Text style={styles.breakdownSize}>2.1 GB</Text>
            </View>
            <View style={styles.breakdownRow}>
              <View style={[styles.dot, { backgroundColor: '#7B9B88' }]} />
              <Text style={styles.breakdownName}>High-Res Artwork & Metadata</Text>
              <Text style={styles.breakdownSize}>240 MB</Text>
            </View>
            <View style={styles.breakdownRow}>
              <View style={[styles.dot, { backgroundColor: '#B8C9BF' }]} />
              <Text style={styles.breakdownName}>Local Cache</Text>
              <Text style={styles.breakdownSize}>
                {cacheCleared ? '0 MB' : '64 MB'}
              </Text>
            </View>
          </View>

          {/* Cloud Info Notice */}
          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={16} color={Colors.forest.primary} />
            <Text style={styles.infoText}>
              Your music library is private. In Phase 3, you can upload lossless tracks directly to your personal Cloudflare R2 bucket with zero egress fees.
            </Text>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            {!cacheCleared && (
              <Pressable
                accessibilityRole="button"
                style={({ pressed }) => [styles.clearBtn, pressed && styles.pressed]}
                onPress={handleClearCache}
              >
                <Text style={styles.clearBtnText}>Clear Cache</Text>
              </Pressable>
            )}
            <Pressable
              accessibilityRole="button"
              style={({ pressed }) => [styles.doneBtn, pressed && styles.pressed]}
              onPress={onClose}
            >
              <Text style={styles.doneText}>Done</Text>
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
    maxWidth: 390,
    backgroundColor: Colors.background,
    borderRadius: Radius.xl,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E7E0D3',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    ...Typography.sectionTitle,
    fontSize: 20,
    color: Colors.text.primary,
  },
  subtitle: {
    ...Typography.cardSubtitle,
    fontSize: 12,
    color: Colors.forest.primary,
    fontWeight: '600',
    marginTop: 1,
  },
  closeBtn: {
    padding: 4,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  sampleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6EFEA',
    borderRadius: Radius.sm,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  sampleText: {
    ...Typography.cardSubtitle,
    fontSize: 11,
    color: Colors.forest.primary,
    marginLeft: 6,
    flex: 1,
  },
  usageContainer: {
    marginBottom: 16,
  },
  usageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  usageLabel: {
    ...Typography.cardSubtitle,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  usageValue: {
    ...Typography.cardSubtitle,
    fontSize: 12,
    color: Colors.text.secondary,
  },
  usageTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5DFD4',
    overflow: 'hidden',
  },
  usageFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: Colors.forest.primary,
  },
  breakdownList: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: Radius.md,
    padding: 12,
    gap: 8,
    marginBottom: 14,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  breakdownName: {
    ...Typography.cardSubtitle,
    fontSize: 12,
    color: Colors.text.primary,
    flex: 1,
  },
  breakdownSize: {
    ...Typography.cardSubtitle,
    fontSize: 12,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#F3EFE7',
    padding: 10,
    borderRadius: Radius.sm,
    marginBottom: 18,
    gap: 8,
  },
  infoText: {
    ...Typography.cardSubtitle,
    fontSize: 11,
    lineHeight: 15,
    color: Colors.text.secondary,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  clearBtn: {
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: Radius.full,
    backgroundColor: '#EAE4D8',
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  clearBtnText: {
    ...Typography.cardSubtitle,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  doneBtn: {
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: Radius.full,
    backgroundColor: Colors.forest.primary,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  doneText: {
    ...Typography.cardSubtitle,
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  pressed: {
    opacity: 0.75,
  },
});

export default StorageModal;


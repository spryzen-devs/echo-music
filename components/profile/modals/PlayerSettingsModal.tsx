import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Switch,
  Modal,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/colors';
import { Typography } from '../../../constants/typography';
import { Radius, Spacing } from '../../../constants/spacing';
import { Shadows } from '../../../constants/theme';

interface PlayerSettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export const PlayerSettingsModal: React.FC<PlayerSettingsModalProps> = ({
  visible,
  onClose,
}) => {
  const [quality, setQuality] = useState<'lossless' | 'high' | 'normal'>('lossless');
  const [gapless, setGapless] = useState<boolean>(true);
  const [crossfade, setCrossfade] = useState<boolean>(false);
  const [autoResume, setAutoResume] = useState<boolean>(true);

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
            <Text style={styles.title}>Player Settings</Text>
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

          {/* Audio Quality Section */}
          <Text style={styles.sectionHeading}>Streaming & Download Quality</Text>
          <View style={styles.qualityGroup}>
            {[
              { id: 'lossless', label: 'Lossless Hi-Fi', desc: 'FLAC 24-bit / 96kHz' },
              { id: 'high', label: 'High Quality', desc: 'AAC 320 kbps' },
              { id: 'normal', label: 'Standard', desc: 'AAC 192 kbps' },
            ].map((item) => {
              const isSelected = quality === item.id;
              return (
                <Pressable
                  key={item.id}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                  style={({ pressed }) => [
                    styles.qualityOption,
                    isSelected && styles.qualityOptionActive,
                    pressed && styles.pressed,
                  ]}
                  onPress={() => setQuality(item.id as any)}
                >
                  <View style={styles.qualityText}>
                    <Text style={styles.qualityLabel}>{item.label}</Text>
                    <Text style={styles.qualityDesc}>{item.desc}</Text>
                  </View>
                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={18} color={Colors.forest.primary} />
                  )}
                </Pressable>
              );
            })}
          </View>

          {/* Playback Toggles */}
          <Text style={styles.sectionHeading}>Playback Behavior</Text>
          <View style={styles.togglesGroup}>
            <View style={styles.toggleRow}>
              <View style={styles.toggleText}>
                <Text style={styles.toggleLabel}>Gapless Playback</Text>
                <Text style={styles.toggleDesc}>Seamless transitions between album tracks</Text>
              </View>
              <Switch
                value={gapless}
                onValueChange={setGapless}
                trackColor={{ false: '#D9D3C7', true: Colors.forest.primary }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.toggleRow}>
              <View style={styles.toggleText}>
                <Text style={styles.toggleLabel}>Crossfade (3s)</Text>
                <Text style={styles.toggleDesc}>Fade out current track as next one starts</Text>
              </View>
              <Switch
                value={crossfade}
                onValueChange={setCrossfade}
                trackColor={{ false: '#D9D3C7', true: Colors.forest.primary }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.toggleRow}>
              <View style={styles.toggleText}>
                <Text style={styles.toggleLabel}>Auto-Resume</Text>
                <Text style={styles.toggleDesc}>Resume playback on app launch</Text>
              </View>
              <Switch
                value={autoResume}
                onValueChange={setAutoResume}
                trackColor={{ false: '#D9D3C7', true: Colors.forest.primary }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          {/* Action Button */}
          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              style={({ pressed }) => [styles.doneBtn, pressed && styles.pressed]}
              onPress={onClose}
            >
              <Text style={styles.doneText}>Save Preferences</Text>
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
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    ...Typography.sectionTitle,
    fontSize: 20,
    color: Colors.text.primary,
  },
  closeBtn: {
    padding: 4,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  sectionHeading: {
    ...Typography.eyebrow,
    color: Colors.text.secondary,
    marginBottom: 8,
    marginTop: 6,
  },
  qualityGroup: {
    gap: 6,
    marginBottom: 16,
  },
  qualityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: Radius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    borderColor: '#E4DDD0',
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  qualityOptionActive: {
    borderColor: Colors.forest.primary,
    backgroundColor: '#FFFFFF',
  },
  qualityText: {
    flex: 1,
  },
  qualityLabel: {
    ...Typography.cardTitle,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  qualityDesc: {
    ...Typography.cardSubtitle,
    fontSize: 11,
    color: Colors.text.secondary,
  },
  togglesGroup: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: Radius.md,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#E4DDD0',
    marginBottom: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  toggleText: {
    flex: 1,
    paddingRight: 12,
  },
  toggleLabel: {
    ...Typography.cardTitle,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  toggleDesc: {
    ...Typography.cardSubtitle,
    fontSize: 10.5,
    color: Colors.text.secondary,
    marginTop: 1,
  },
  actions: {
    alignItems: 'flex-end',
  },
  doneBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
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

export default PlayerSettingsModal;

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

interface AppearanceModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AppearanceModal: React.FC<AppearanceModalProps> = ({
  visible,
  onClose,
}) => {
  const [selectedTheme, setSelectedTheme] = useState('warm-ivory');

  const themes = [
    {
      id: 'warm-ivory',
      name: 'Warm Ivory',
      description: 'Default organic editorial palette',
      bgHex: '#F6F1EA',
      accentHex: '#243C31',
    },
    {
      id: 'sage-mist',
      name: 'Sage Mist',
      description: 'Muted natural botanical tones',
      bgHex: '#EAF0EC',
      accentHex: '#3D5E4D',
    },
    {
      id: 'forest-twilight',
      name: 'Forest Twilight',
      description: 'Deep woodland calming ambiance',
      bgHex: '#E2EBE5',
      accentHex: '#1B3026',
    },
  ];

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
            <Text style={styles.title}>Appearance</Text>
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

          <Text style={styles.subtitle}>Choose your preferred aesthetic style:</Text>

          <View style={styles.themeList}>
            {themes.map((theme) => {
              const isSelected = selectedTheme === theme.id;
              return (
                <Pressable
                  key={theme.id}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                  style={({ pressed }) => [
                    styles.themeOption,
                    isSelected && styles.themeOptionActive,
                    pressed && styles.pressed,
                  ]}
                  onPress={() => setSelectedTheme(theme.id)}
                >
                  <View style={[styles.colorPreview, { backgroundColor: theme.bgHex }]}>
                    <View style={[styles.accentDot, { backgroundColor: theme.accentHex }]} />
                  </View>
                  <View style={styles.themeInfo}>
                    <Text style={styles.themeName}>{theme.name}</Text>
                    <Text style={styles.themeDesc}>{theme.description}</Text>
                  </View>
                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={20} color={Colors.forest.primary} />
                  )}
                </Pressable>
              );
            })}
          </View>

          <View style={styles.actions}>
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
    maxWidth: 380,
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
    marginBottom: 8,
  },
  title: {
    ...Typography.sectionTitle,
    fontSize: 20,
    color: Colors.text.primary,
  },
  subtitle: {
    ...Typography.cardSubtitle,
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 16,
  },
  closeBtn: {
    padding: 4,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  themeList: {
    gap: 10,
    marginBottom: 20,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: Radius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    borderColor: '#E4DDD0',
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  themeOptionActive: {
    borderColor: Colors.forest.primary,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  colorPreview: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  accentDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  themeInfo: {
    flex: 1,
  },
  themeName: {
    ...Typography.cardTitle,
    fontSize: 13.5,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  themeDesc: {
    ...Typography.cardSubtitle,
    fontSize: 11,
    color: Colors.text.secondary,
    marginTop: 1,
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

export default AppearanceModal;

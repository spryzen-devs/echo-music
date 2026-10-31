import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Modal,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Radius, Spacing } from '../../constants/spacing';
import { Shadows } from '../../constants/theme';

interface CreatePlaylistModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => void;
}

export const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({
  visible,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate(name.trim(), description.trim());
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <Pressable style={styles.scrim} onPress={onClose} />

        <View style={[styles.container, Shadows.floating]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>New Playlist</Text>
            <Pressable hitSlop={10} style={styles.closeIcon} onPress={onClose}>
              <Ionicons name="close" size={22} color={Colors.text.primary} />
            </Pressable>
          </View>

          <Text style={styles.subtitle}>
            Give your playlist a name and create a dedicated calm space for your soundscapes.
          </Text>

          {/* Input Fields */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Playlist Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. Morning Calm, Late Reading"
              placeholderTextColor="#9A9589"
              value={name}
              onChangeText={setName}
              autoFocus
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Description (Optional)</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="A few words describing this mood..."
              placeholderTextColor="#9A9589"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.createButton,
                !name.trim() && styles.createButtonDisabled,
                pressed && styles.pressed,
              ]}
              onPress={handleCreate}
              disabled={!name.trim()}
            >
              <Text style={styles.createText}>Create</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(24, 32, 22, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.screenPadding,
  },
  scrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FAF7F0',
    borderRadius: Radius.lg,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    ...Typography.sectionTitle,
    fontSize: 20,
    color: Colors.text.primary,
  },
  closeIcon: {
    padding: 4,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  subtitle: {
    ...Typography.bodySmall,
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 18,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.forest.primary,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  textInput: {
    backgroundColor: 'rgba(160, 150, 130, 0.1)',
    borderRadius: Radius.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: 'rgba(160, 150, 130, 0.25)',
  },
  textArea: {
    height: 72,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 12,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: Radius.md,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  createButton: {
    backgroundColor: Colors.forest.primary,
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: Radius.md,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.75,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.secondary,
  },
  createText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FAF5ED',
  },
});

export default CreatePlaylistModal;

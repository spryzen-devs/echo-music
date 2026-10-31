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
import { UserProfile } from '../../../types';
import { Colors } from '../../../constants/colors';
import { Typography } from '../../../constants/typography';
import { Radius, Spacing } from '../../../constants/spacing';
import { Shadows } from '../../../constants/theme';

interface EditProfileModalProps {
  visible: boolean;
  user: UserProfile;
  onSave: (updated: Partial<UserProfile>) => void;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  user,
  onSave,
  onClose,
}) => {
  const [name, setName] = useState(user.name);
  const [greeting, setGreeting] = useState(user.greeting);
  const [bio, setBio] = useState(user.bio || 'Music for a calmer me.');

  const handleSave = () => {
    onSave({
      name: name.trim() || user.name,
      greeting: greeting.trim() || user.greeting,
      bio: bio.trim(),
    });
    onClose();
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
            <Text style={styles.title}>Edit Profile</Text>
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

          {/* Form Fields */}
          <View style={styles.form}>
            <Text style={styles.label}>Display Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Your Name"
              placeholderTextColor={Colors.text.muted}
            />

            <Text style={styles.label}>Greeting</Text>
            <TextInput
              style={styles.input}
              value={greeting}
              onChangeText={setGreeting}
              placeholder="e.g. Good morning,"
              placeholderTextColor={Colors.text.muted}
            />

            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              value={bio}
              onChangeText={setBio}
              placeholder="Write a short bio..."
              placeholderTextColor={Colors.text.muted}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              style={({ pressed }) => [styles.cancelBtn, pressed && styles.pressed]}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              style={({ pressed }) => [styles.saveBtn, pressed && styles.pressed]}
              onPress={handleSave}
            >
              <Text style={styles.saveText}>Save Changes</Text>
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
    marginBottom: 16,
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
  form: {
    marginBottom: 20,
  },
  label: {
    ...Typography.eyebrow,
    color: Colors.text.secondary,
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radius.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: '#E0DACD',
    ...Platform.select({
      web: {
        outlineStyle: 'none',
        outlineWidth: 0,
      } as any,
    }),
  },
  bioInput: {
    height: 64,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: Radius.full,
    backgroundColor: '#EAE4D8',
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  cancelText: {
    ...Typography.cardSubtitle,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  saveBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: Radius.full,
    backgroundColor: Colors.forest.primary,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  saveText: {
    ...Typography.cardSubtitle,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  pressed: {
    opacity: 0.75,
  },
});

export default EditProfileModal;


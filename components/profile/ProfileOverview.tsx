import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Spacing } from '../../constants/spacing';
import { QuoteBanner } from './QuoteBanner';
import { SettingsRow } from './SettingsRow';

export type SettingsModalType =
  | 'edit-profile'
  | 'appearance'
  | 'storage'
  | 'player-settings'
  | 'about';

interface ProfileOverviewProps {
  onOpenSettings: (type: SettingsModalType) => void;
}

export const ProfileOverview: React.FC<ProfileOverviewProps> = ({
  onOpenSettings,
}) => {
  return (
    <View style={styles.container}>
      {/* 1. Inspirational Quote Banner */}
      <QuoteBanner />

      {/* 2. Settings Rows */}
      <View style={styles.rowsContainer}>
        <SettingsRow
          iconName="person-outline"
          title="Edit Profile"
          description="Change your name, photo and bio"
          onPress={() => onOpenSettings('edit-profile')}
        />

        <SettingsRow
          iconName="color-palette-outline"
          title="Appearance"
          description="Theme, colours and visual style"
          onPress={() => onOpenSettings('appearance')}
        />

        <SettingsRow
          iconName="cloud-outline"
          title="Storage"
          description="Manage your cloud music collection"
          onPress={() => onOpenSettings('storage')}
        />

        <SettingsRow
          iconName="options-outline"
          title="Player Settings"
          description="Audio quality, playback and behavior"
          onPress={() => onOpenSettings('player-settings')}
        />

        <SettingsRow
          iconName="information-circle-outline"
          title="About"
          description="App version and information"
          onPress={() => onOpenSettings('about')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  rowsContainer: {
    paddingHorizontal: Spacing.screenPadding,
  },
});

export default ProfileOverview;

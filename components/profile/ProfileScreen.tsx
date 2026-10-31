import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { UserProfile, AlbumItem } from '../../types';
import { Song } from '../../types/music';
import { Colors } from '../../constants/colors';
import { ProfileHero } from './ProfileHero';
import { ProfileTabs, ProfileTabType } from './ProfileTabs';
import { ProfileOverview, SettingsModalType } from './ProfileOverview';
import { ProfileFavorites } from './ProfileFavorites';
import { ProfileListeningStatsView } from './ProfileListeningStatsView';

// Modals
import { EditProfileModal } from './modals/EditProfileModal';
import { AppearanceModal } from './modals/AppearanceModal';
import { StorageModal } from './modals/StorageModal';
import { PlayerSettingsModal } from './modals/PlayerSettingsModal';
import { AboutModal } from './modals/AboutModal';

interface ProfileScreenProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onSelectSong: (song: Song) => void;
  onSelectAlbum: (album: AlbumItem) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onUpdateUser,
  onSelectSong,
  onSelectAlbum,
}) => {
  const [activeTab, setActiveTab] = useState<ProfileTabType>('Overview');
  const [activeModal, setActiveModal] = useState<SettingsModalType | null>(null);

  return (
    <View style={styles.outerWrapper}>
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Large Photographic Hero Section with Stats Panel */}
        <ProfileHero
          user={user}
          songsCount={127}
          albumsCount={8}
          playlistsCount={4}
          onEditProfile={() => setActiveModal('edit-profile')}
          onSettingsPress={() => setActiveModal('player-settings')}
        />

        {/* 2. Ivory Sheet Container */}
        <View style={styles.sheetContainer}>
          {/* Profile Interactive Tabs */}
          <ProfileTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Active Tab View */}
          {activeTab === 'Overview' && (
            <ProfileOverview onOpenSettings={(type) => setActiveModal(type)} />
          )}

          {activeTab === 'Favorites' && (
            <ProfileFavorites
              onSelectSong={onSelectSong}
              onSelectAlbum={onSelectAlbum}
            />
          )}

          {activeTab === 'Listening Stats' && (
            <ProfileListeningStatsView />
          )}

          {/* Bottom Spacer guarantees clearance above MiniPlayer and BottomNavigation */}
          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>

      {/* Interactive Settings Modals */}
      <EditProfileModal
        visible={activeModal === 'edit-profile'}
        user={user}
        onSave={onUpdateUser}
        onClose={() => setActiveModal(null)}
      />

      <AppearanceModal
        visible={activeModal === 'appearance'}
        onClose={() => setActiveModal(null)}
      />

      <StorageModal
        visible={activeModal === 'storage'}
        onClose={() => setActiveModal(null)}
      />

      <PlayerSettingsModal
        visible={activeModal === 'player-settings'}
        onClose={() => setActiveModal(null)}
      />

      <AboutModal
        visible={activeModal === 'about'}
        onClose={() => setActiveModal(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    flex: 1,
    width: '100%',
  },
  scrollArea: {
    flex: 1,
    width: '100%',
    minHeight: 0,
    backgroundColor: Colors.background,
    ...Platform.select({
      web: {
        overflowY: 'auto' as any,
      },
    }),
  },
  scrollContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  sheetContainer: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -20, // Seamless curved overlap onto hero background
    flex: 1,
    minHeight: 520,
  },
  bottomSpacer: {
    height: 180, // Clearance above floating mini-player & bottom nav dock
  },
});

export default ProfileScreen;

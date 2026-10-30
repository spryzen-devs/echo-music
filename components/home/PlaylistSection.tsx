import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { PlaylistItem } from '../../types';
import { SectionHeader } from '../ui/SectionHeader';
import { PlaylistCard } from '../ui/PlaylistCard';
import { Spacing } from '../../constants/spacing';

interface PlaylistSectionProps {
  playlists: PlaylistItem[];
  onPlaylistPress: (playlist: PlaylistItem) => void;
  onPlayPress?: (playlist: PlaylistItem) => void;
  onMorePress?: () => void;
}

export const PlaylistSection: React.FC<PlaylistSectionProps> = ({
  playlists,
  onPlaylistPress,
  onPlayPress,
  onMorePress,
}) => {
  return (
    <View style={styles.container}>
      <SectionHeader
        title="For You"
        subtitle="Playlists made for your taste"
        hasArrowCircle
        onActionPress={onMorePress}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            onPress={onPlaylistPress}
            onPlayPress={onPlayPress}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.sectionGap,
  },
  scrollContent: {
    paddingLeft: Spacing.screenPadding,
    paddingRight: Spacing.screenPadding - Spacing.md,
  },
});

export default PlaylistSection;


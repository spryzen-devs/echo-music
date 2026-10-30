import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { AlbumItem } from '../../types';
import { SectionHeader } from '../ui/SectionHeader';
import { AlbumCard } from '../ui/AlbumCard';
import { Spacing } from '../../constants/spacing';

interface RecentlyPlayedProps {
  albums: AlbumItem[];
  onAlbumPress: (album: AlbumItem) => void;
  onSeeAllPress?: () => void;
  onAlbumMenuPress?: (album: AlbumItem) => void;
}

export const RecentlyPlayed: React.FC<RecentlyPlayedProps> = ({
  albums,
  onAlbumPress,
  onSeeAllPress,
  onAlbumMenuPress,
}) => {
  return (
    <View style={styles.container}>
      <SectionHeader
        title="Recently Played"
        actionText="See all"
        onActionPress={onSeeAllPress}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            album={album}
            onPress={onAlbumPress}
            onMenuPress={onAlbumMenuPress}
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

export default RecentlyPlayed;


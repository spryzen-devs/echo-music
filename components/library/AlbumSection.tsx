import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LibraryAlbum } from '../../types/music';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { AlbumRow } from './AlbumRow';

interface AlbumSectionProps {
  albums: LibraryAlbum[];
  onSelectAlbum: (album: LibraryAlbum) => void;
  onMenuPress: (album: LibraryAlbum) => void;
}

export const AlbumSection: React.FC<AlbumSectionProps> = ({
  albums,
  onSelectAlbum,
  onMenuPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Albums</Text>
      </View>

      {/* Album Rows */}
      <View style={styles.list}>
        {albums.map((album, index) => (
          <AlbumRow
            key={album.id}
            album={album}
            onSelect={onSelectAlbum}
            onMenuPress={onMenuPress}
            showDivider={index < albums.length - 1}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    paddingBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    marginBottom: 8,
  },
  heading: {
    ...Typography.sectionTitle,
    fontSize: 21,
    lineHeight: 26,
    color: Colors.text.primary,
  },
  list: {
    width: '100%',
  },
});

export default AlbumSection;

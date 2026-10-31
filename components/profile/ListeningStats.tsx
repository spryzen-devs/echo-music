import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '../../constants/typography';
import { Radius } from '../../constants/spacing';
import { Shadows } from '../../constants/theme';

interface ListeningStatsProps {
  songs: number;
  albums: number;
  playlists: number;
}

export const ListeningStats: React.FC<ListeningStatsProps> = ({
  songs,
  albums,
  playlists,
}) => {
  return (
    <View style={[styles.container, Shadows.card]}>
      {/* 1. Songs Stat */}
      <View style={styles.statItem}>
        <Ionicons
          name="musical-notes-outline"
          size={18}
          color="#F8F6F0"
          style={styles.statIcon}
        />
        <View style={styles.textColumn}>
          <Text style={styles.countText}>{songs}</Text>
          <Text style={styles.labelText}>Songs</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* 2. Albums Stat */}
      <View style={styles.statItem}>
        <Ionicons
          name="disc-outline"
          size={18}
          color="#F8F6F0"
          style={styles.statIcon}
        />
        <View style={styles.textColumn}>
          <Text style={styles.countText}>{albums}</Text>
          <Text style={styles.labelText}>Albums</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* 3. Playlists Stat */}
      <View style={styles.statItem}>
        <Ionicons
          name="heart-outline"
          size={18}
          color="#F8F6F0"
          style={styles.statIcon}
        />
        <View style={styles.textColumn}>
          <Text style={styles.countText}>{playlists}</Text>
          <Text style={styles.labelText}>Playlists</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.20)',
    borderRadius: Radius.lg + 2,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    marginTop: 20,
    width: '100%',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(16px)',
      } as any,
    }),
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIcon: {
    marginRight: 8,
    opacity: 0.9,
  },
  textColumn: {
    alignItems: 'flex-start',
  },
  countText: {
    ...Typography.heroTitle,
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  labelText: {
    ...Typography.cardSubtitle,
    fontSize: 11,
    lineHeight: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '500',
    marginTop: 1,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.30)',
  },
});

export default ListeningStats;

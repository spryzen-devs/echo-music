import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius } from '../../constants/spacing';
import { Shadows } from '../../constants/theme';

export const ProfileListeningStatsView: React.FC = () => {
  const topArtists = [
    { rank: '01', name: 'Frank Ocean', hours: '14.2 hrs', percentage: 38 },
    { rank: '02', name: 'Joji', hours: '11.8 hrs', percentage: 31 },
    { rank: '03', name: 'Radiohead', hours: '9.4 hrs', percentage: 25 },
    { rank: '04', name: 'Tame Impala', hours: '7.1 hrs', percentage: 19 },
  ];

  const timeBreakdown = [
    { period: 'Morning (6am - 12pm)', hours: '8.4 hrs', icon: 'sunny-outline' as const },
    { period: 'Afternoon (12pm - 6pm)', hours: '11.2 hrs', icon: 'partly-sunny-outline' as const },
    { period: 'Evening (6pm - 10pm)', hours: '14.6 hrs', icon: 'cloudy-night-outline' as const },
    { period: 'Late Night (10pm - 2am)', hours: '18.3 hrs', icon: 'moon-outline' as const },
  ];

  return (
    <View style={styles.container}>
      {/* Informational Sample Notice */}
      <View style={styles.noticeBanner}>
        <Ionicons name="information-circle-outline" size={16} color={Colors.forest.primary} />
        <Text style={styles.noticeText}>
          Sample data preview. Real playback analytics will be recorded in a future update.
        </Text>
      </View>

      {/* 1. Monthly Overview Card */}
      <View style={[styles.card, Shadows.card]}>
        <Text style={styles.cardHeader}>October Listening</Text>
        <View style={styles.metricsRow}>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>52.5</Text>
            <Text style={styles.metricLabel}>Hours listened</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>127</Text>
            <Text style={styles.metricLabel}>Tracks played</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>23</Text>
            <Text style={styles.metricLabel}>Active days</Text>
          </View>
        </View>
      </View>

      {/* 2. Most-Played Artists */}
      <View style={[styles.card, Shadows.card]}>
        <Text style={styles.cardHeader}>Most-Played Artists</Text>
        {topArtists.map((artist) => (
          <View key={artist.rank} style={styles.artistRow}>
            <Text style={styles.artistRank}>{artist.rank}</Text>
            <View style={styles.artistDetails}>
              <View style={styles.artistNameRow}>
                <Text style={styles.artistName}>{artist.name}</Text>
                <Text style={styles.artistHours}>{artist.hours}</Text>
              </View>
              <View style={styles.progressBarTrack}>
                <View style={[styles.progressBarFill, { width: `${artist.percentage}%` }]} />
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* 3. Time of Day Listening Habit */}
      <View style={[styles.card, Shadows.card]}>
        <Text style={styles.cardHeader}>Listening Habits</Text>
        {timeBreakdown.map((item, index) => (
          <View key={item.period} style={styles.habitRow}>
            <Ionicons name={item.icon} size={18} color={Colors.forest.primary} style={styles.habitIcon} />
            <Text style={styles.habitPeriod}>{item.period}</Text>
            <Text style={styles.habitHours}>{item.hours}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: Spacing.screenPadding,
  },
  noticeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6EFEA',
    borderRadius: Radius.md,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#D4E2D9',
  },
  noticeText: {
    ...Typography.cardSubtitle,
    fontSize: 11.5,
    lineHeight: 15,
    color: Colors.forest.primary,
    marginLeft: 8,
    flex: 1,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.68)',
    borderRadius: Radius.lg,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.85)',
  },
  cardHeader: {
    ...Typography.sectionTitle,
    fontSize: 16,
    lineHeight: 20,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricValue: {
    ...Typography.heroTitle,
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '700',
    color: Colors.forest.primary,
  },
  metricLabel: {
    ...Typography.cardSubtitle,
    fontSize: 11,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  metricDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E0DACD',
  },
  artistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  artistRank: {
    ...Typography.eyebrow,
    fontSize: 12,
    color: Colors.text.muted,
    width: 26,
  },
  artistDetails: {
    flex: 1,
  },
  artistNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  artistName: {
    ...Typography.cardTitle,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  artistHours: {
    ...Typography.cardSubtitle,
    fontSize: 11,
    color: Colors.text.secondary,
  },
  progressBarTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5DFD4',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: Colors.forest.primary,
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  habitIcon: {
    marginRight: 10,
  },
  habitPeriod: {
    ...Typography.cardSubtitle,
    fontSize: 12,
    color: Colors.text.primary,
    flex: 1,
  },
  habitHours: {
    ...Typography.cardSubtitle,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.forest.primary,
  },
});

export default ProfileListeningStatsView;


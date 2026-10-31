import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Song } from '../../types/music';
import { FontFamily } from '../../constants/typography';

interface LyricsPanelProps {
  currentTrack: Song;
}

export const LyricsPanel: React.FC<LyricsPanelProps> = ({ currentTrack }) => {
  const lyrics = currentTrack.lyrics;

  if (!lyrics || lyrics.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Lyrics Unavailable</Text>
        <Text style={styles.emptySubtitle}>
          Synchronized lyrics for &ldquo;{currentTrack.title}&rdquo; will be available when cloud streaming is connected.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sampleBadge}>Sample Preview Lyrics</Text>

      <View style={styles.lyricsList}>
        {lyrics.map((line, index) => {
          // Highlight current active verse (index 4 or 5)
          const isCurrentVerse = index === 4 || index === 5;

          return (
            <Text
              key={`${line}-${index}`}
              style={[
                styles.lyricLine,
                isCurrentVerse && styles.lyricLineActive,
              ]}
            >
              {line}
            </Text>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  sampleBadge: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: 'rgba(200, 221, 184, 0.7)',
    marginBottom: 16,
    fontWeight: '600',
  },
  lyricsList: {
    alignItems: 'center',
    gap: 12,
    paddingBottom: 20,
  },
  lyricLine: {
    fontFamily: FontFamily.serif,
    fontSize: 15.5,
    lineHeight: 22,
    color: 'rgba(235, 230, 220, 0.45)',
    textAlign: 'center',
    fontWeight: '400',
  },
  lyricLineActive: {
    fontSize: 18,
    lineHeight: 26,
    color: '#FAF5ED',
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  emptyContainer: {
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontFamily: FontFamily.serif,
    fontSize: 16,
    color: '#E8E2D6',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#A0998B',
    textAlign: 'center',
    lineHeight: 16,
    maxWidth: 260,
  },
});

export default LyricsPanel;

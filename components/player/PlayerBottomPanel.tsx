import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { Song, PlayerPanelTab } from '../../types/music';
import { QueueList } from './QueueList';
import { LyricsPanel } from './LyricsPanel';
import { RelatedSongs } from './RelatedSongs';

interface PlayerBottomPanelProps {
  currentTrack: Song;
  queue: Song[];
  allSongs: Song[];
  onSelectSong: (song: Song) => void;
  onOptionsPress: (song: Song) => void;
}

const TABS: PlayerPanelTab[] = ['Up Next', 'Lyrics', 'Related'];

export const PlayerBottomPanel: React.FC<PlayerBottomPanelProps> = ({
  currentTrack,
  queue,
  allSongs,
  onSelectSong,
  onOptionsPress,
}) => {
  const [activeTab, setActiveTab] = useState<PlayerPanelTab>('Up Next');

  return (
    <View style={styles.container}>
      {/* Top Drag Handle Indicator */}
      <View style={styles.handleContainer}>
        <View style={styles.handle} />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabBar}>
        {TABS.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <Pressable
              key={tab}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={`${tab} tab`}
              style={({ pressed }) => [styles.tabButton, pressed && styles.tabPressed]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab}
              </Text>
              {isActive && <View style={styles.tabIndicator} />}
            </Pressable>
          );
        })}
      </View>

      {/* Tab Content */}
      <View style={styles.content}>
        {activeTab === 'Up Next' && (
          <QueueList
            queue={queue}
            currentTrack={currentTrack}
            onSelectSong={onSelectSong}
            onOptionsPress={onOptionsPress}
          />
        )}

        {activeTab === 'Lyrics' && (
          <LyricsPanel currentTrack={currentTrack} />
        )}

        {activeTab === 'Related' && (
          <RelatedSongs
            currentTrack={currentTrack}
            allSongs={allSongs}
            onSelectSong={onSelectSong}
            onOptionsPress={onOptionsPress}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(28, 36, 24, 0.78)',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      } as any,
    }),
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  handle: {
    width: 38,
    height: 3.5,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
    marginBottom: 10,
  },
  tabButton: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    position: 'relative',
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  tabPressed: {
    opacity: 0.7,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#8E9584',
    letterSpacing: 0.2,
  },
  tabTextActive: {
    color: '#EDE8DF',
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -2,
    width: 22,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#D1DFC7',
  },
  content: {
    paddingTop: 6,
  },
});

export default PlayerBottomPanel;


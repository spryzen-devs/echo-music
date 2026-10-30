import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius } from '../../constants/spacing';

interface RecentSearchesProps {
  searches: string[];
  onSelectSearch: (query: string) => void;
  onClearAll: () => void;
}

export const RecentSearches: React.FC<RecentSearchesProps> = ({
  searches,
  onSelectSearch,
  onClearAll,
}) => {
  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Recent Searches</Text>
        {searches.length > 0 && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear all recent searches"
            hitSlop={8}
            style={({ pressed }) => [styles.clearButton, pressed && styles.pressed]}
            onPress={onClearAll}
          >
            <Text style={styles.clearText}>Clear all</Text>
          </Pressable>
        )}
      </View>

      {/* Horizontal Scroll Chips */}
      {searches.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {searches.map((item, index) => (
            <Pressable
              key={`${item}-${index}`}
              accessibilityRole="button"
              accessibilityLabel={`Search for ${item}`}
              style={({ pressed }) => [
                styles.chip,
                pressed && styles.chipPressed,
              ]}
              onPress={() => onSelectSearch(item)}
            >
              <Ionicons
                name="time-outline"
                size={14}
                color={Colors.text.secondary}
                style={styles.chipIcon}
              />
              <Text style={styles.chipText}>{item}</Text>
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No recent searches</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    marginBottom: 12,
  },
  heading: {
    ...Typography.sectionTitle,
    fontSize: 21,
    lineHeight: 26,
    color: Colors.text.primary,
  },
  clearText: {
    ...Typography.cardSubtitle,
    color: Colors.text.secondary,
    fontSize: 12,
  },
  scrollContent: {
    paddingLeft: Spacing.screenPadding,
    paddingRight: Spacing.screenPadding - 8,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAE4D9',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: Radius.full,
    borderWidth: 0.5,
    borderColor: 'rgba(232, 226, 216, 0.7)',
  },
  chipIcon: {
    marginRight: 6,
  },
  chipText: {
    ...Typography.cardSubtitle,
    color: Colors.text.primary,
    fontSize: 12.5,
    fontWeight: '500',
  },
  chipPressed: {
    backgroundColor: Colors.sage.light,
    transform: [{ scale: 0.98 }],
  },
  clearButton: {
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  emptyContainer: {
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: 6,
  },
  emptyText: {
    ...Typography.cardSubtitle,
    color: Colors.text.muted,
    fontSize: 12,
    fontStyle: 'italic',
  },
  pressed: {
    opacity: 0.65,
  },
});

export default RecentSearches;

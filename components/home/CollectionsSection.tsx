import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { CollectionItem, CollectionCategory } from '../../types';
import { SectionHeader } from '../ui/SectionHeader';
import { CollectionCard } from '../ui/CollectionCard';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius } from '../../constants/spacing';

interface CollectionsSectionProps {
  collections: CollectionItem[];
  categories: CollectionCategory[];
  onCollectionPress: (collection: CollectionItem) => void;
  onMorePress?: () => void;
}

export const CollectionsSection: React.FC<CollectionsSectionProps> = ({
  collections,
  categories,
  onCollectionPress,
  onMorePress,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CollectionCategory>('All');

  const filteredCollections = collections.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <View style={styles.container}>
      <SectionHeader
        title="Your Collections"
        subtitle="Curated spaces for your music"
        hasArrowCircle
        onActionPress={onMorePress}
      />

      {/* Category Filter Pills */}
      <View style={styles.filtersWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScroll}
        >
          {categories.map((cat) => {
            const isSelected = cat === selectedCategory;
            return (
              <Pressable
                key={cat}
                accessibilityRole="button"
                accessibilityLabel={`Filter by ${cat}`}
                style={({ pressed }) => [
                  styles.filterPill,
                  isSelected ? styles.filterPillActive : styles.filterPillInactive,
                  pressed && styles.pressed,
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text
                  style={[
                    styles.filterText,
                    isSelected ? styles.filterTextActive : styles.filterTextInactive,
                  ]}
                >
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Collection Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsScroll}
      >
        {filteredCollections.map((col) => (
          <CollectionCard
            key={col.id}
            collection={col}
            onPress={onCollectionPress}
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
  filtersWrapper: {
    marginBottom: Spacing.md,
  },
  filtersScroll: {
    paddingLeft: Spacing.screenPadding,
    paddingRight: Spacing.screenPadding - Spacing.sm,
    gap: 8,
  },
  filterPill: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  filterPillActive: {
    backgroundColor: Colors.forest.primary,
    borderColor: Colors.forest.primary,
  },
  filterPillInactive: {
    backgroundColor: Colors.control.iconCircleBg,
    borderColor: 'transparent',
  },
  filterText: {
    ...Typography.filterPill,
  },
  filterTextActive: {
    color: Colors.text.light,
    fontWeight: '600',
  },
  filterTextInactive: {
    color: Colors.text.secondary,
    fontWeight: '400',
  },
  cardsScroll: {
    paddingLeft: Spacing.screenPadding,
    paddingRight: Spacing.screenPadding - Spacing.md,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default CollectionsSection;


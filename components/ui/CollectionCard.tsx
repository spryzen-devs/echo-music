import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CollectionItem } from '../../types';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, Radius } from '../../constants/spacing';
import { Shadows } from '../../constants/theme';

interface CollectionCardProps {
  collection: CollectionItem;
  onPress: (collection: CollectionItem) => void;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  collection,
  onPress,
}) => {
  const renderVisual = () => {
    switch (collection.type) {
      case 'icon':
        return (
          <View
            style={[
              styles.iconBadge,
              { backgroundColor: collection.bgColor || Colors.sage.light },
            ]}
          >
            <Ionicons
              name={
                collection.iconName === 'heart'
                  ? 'heart'
                  : collection.iconName === 'arrow-down'
                  ? 'arrow-down'
                  : collection.iconName === 'person'
                  ? 'person'
                  : 'disc'
              }
              size={15}
              color={collection.iconColor || Colors.forest.primary}
            />
          </View>
        );

      case 'bubbles':
        return (
          <View style={styles.bubblesContainer}>
            {(collection.bubbleColors || ['#C5B8A5', '#A5B5A8', '#8E9EA5']).map(
              (color, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.bubble,
                    {
                      backgroundColor: color,
                      marginLeft: idx === 0 ? 0 : -8,
                      zIndex: 3 - idx,
                    },
                  ]}
                />
              )
            )}
          </View>
        );

      case 'grid':
        return collection.gridImage ? (
          <Image
            source={collection.gridImage}
            style={styles.gridThumb}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.iconBadge}>
            <Ionicons name="grid" size={15} color={Colors.forest.primary} />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Collection ${collection.title}, ${collection.subtitle}`}
      style={({ pressed }) => [
        styles.card,
        Shadows.subtle,
        pressed && styles.pressed,
      ]}
      onPress={() => onPress(collection)}
    >
      <View style={styles.topRow}>
        {renderVisual()}
        <Ionicons
          name="chevron-forward"
          size={14}
          color={Colors.text.muted}
          style={styles.chevron}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {collection.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {collection.subtitle}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 112,
    height: 98,
    backgroundColor: Colors.surfaceCard,
    borderRadius: Radius.lg,
    padding: 10,
    marginRight: Spacing.md,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBadge: {
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubblesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
  },
  bubble: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.surfaceCard,
  },
  gridThumb: {
    width: 30,
    height: 30,
    borderRadius: 6,
  },
  chevron: {
    opacity: 0.6,
  },
  textContainer: {
    marginTop: 6,
  },
  title: {
    ...Typography.cardTitle,
    fontSize: 12.5,
    lineHeight: 16,
    color: Colors.text.primary,
  },
  subtitle: {
    ...Typography.cardSubtitle,
    fontSize: 10.5,
    lineHeight: 14,
    color: Colors.text.secondary,
    marginTop: 1,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});

export default CollectionCard;


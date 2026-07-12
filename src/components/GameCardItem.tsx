import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  Animated,
  Pressable,
  View,
} from 'react-native';
import { Game } from '../data/mockData';
import { COLORS } from '../theme/colors';

interface GameCardItemProps {
  game: Game;
  onPress?: () => void;
  width?: number;
  height?: number;
  showDetailsBelow?: boolean;
}

export const GameCardItem: React.FC<GameCardItemProps> = ({
  game,
  onPress,
  width = 110,
  height = 150,
  showDetailsBelow = true,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.85,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.pressable}
    >
      <Animated.View
        style={[
          styles.container,
          {
            width: width,
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        {/* Cover Art Container */}
        <View style={[styles.imageContainer, { width: width, height: height }]}>
          <Image
            source={{ uri: game.coverUrl }}
            style={styles.coverImage}
            resizeMode="cover"
          />
          
          {/* Game Pass Badge (Bottom-Left) */}
          {game.isGamePass && (
            <View style={styles.gpBadge}>
              <Text style={styles.gpBadgeText}>GAME</Text>
              <Text style={styles.gpBadgeTextSec}>PASS</Text>
            </View>
          )}

          {/* Discount Tag (Top-Right) */}
          {game.discountPercentage && (
            <View style={styles.discountTag}>
              <Text style={styles.discountText}>{game.discountPercentage}</Text>
            </View>
          )}

          {/* Platforms/Playability Icons (Bottom-Right) */}
          {(game.hasConsoleIcon || game.hasCloudIcon || game.hasPcIcon) && (
            <View style={styles.platformIconsContainer}>
              {game.hasConsoleIcon && <Text style={styles.platformIcon}>🎮</Text>}
              {game.hasCloudIcon && <Text style={styles.platformIcon}>☁️</Text>}
              {game.hasPcIcon && <Text style={styles.platformIcon}>💻</Text>}
            </View>
          )}
        </View>

        {/* Details Below */}
        {showDetailsBelow && (
          <View style={styles.details}>
            {/* Store pricing display */}
            {game.priceDeal ? (
              <View style={styles.priceRow}>
                {game.priceOriginal && (
                  <Text style={styles.priceOriginal}>{game.priceOriginal}</Text>
                )}
                <Text
                  style={[
                    styles.priceDeal,
                    game.discountPercentage ? styles.priceDealHighlight : null,
                  ]}
                >
                  {game.priceDeal}
                </Text>
              </View>
            ) : (
              <>
                <Text numberOfLines={1} style={styles.title}>
                  {game.title}
                </Text>
                <Text numberOfLines={1} style={styles.subtitle}>
                  {game.friendsPlayText || game.publisher}
                </Text>
              </>
            )}
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    marginRight: 12,
  },
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#222',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  gpBadge: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: COLORS.white,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
    alignItems: 'center',
  },
  gpBadgeText: {
    color: COLORS.black,
    fontSize: 7,
    fontWeight: '900',
    lineHeight: 7,
  },
  gpBadgeTextSec: {
    color: COLORS.black,
    fontSize: 6,
    fontWeight: '800',
    lineHeight: 6,
  },
  discountTag: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#FEB800', // Gold/yellow discount tag
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: COLORS.black,
    fontSize: 10,
    fontWeight: 'bold',
  },
  platformIconsContainer: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    alignItems: 'center',
  },
  platformIcon: {
    color: COLORS.white,
    fontSize: 9,
    marginLeft: 3,
  },
  details: {
    marginTop: 6,
    paddingHorizontal: 2,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 2,
  },
  priceOriginal: {
    color: COLORS.textSecondary,
    fontSize: 11,
    textDecorationLine: 'line-through',
    marginRight: 6,
  },
  priceDeal: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: 'bold',
  },
  priceDealHighlight: {
    color: '#FEB800', // Gold/yellow active price matching deals screenshot
  },
});

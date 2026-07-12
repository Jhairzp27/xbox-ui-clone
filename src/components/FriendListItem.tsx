import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Pressable,
} from 'react-native';
import { Friend } from '../data/mockData';
import { COLORS } from '../theme/colors';

interface FriendListItemProps {
  friend: Friend;
  onPress?: () => void;
}

export const FriendListItem: React.FC<FriendListItemProps> = ({
  friend,
  onPress,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.97,
      duration: 80,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 120,
      useNativeDriver: true,
    }).start();
  };

  const getStatusColor = () => {
    switch (friend.status) {
      case 'online':
        return COLORS.online;
      case 'away':
        return COLORS.away;
      case 'offline':
      default:
        return COLORS.offline;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.avatarContainer}>
          <Image source={{ uri: friend.avatarUrl }} style={styles.avatar} />
          <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.gamertag}>{friend.gamertag}</Text>
          <Text numberOfLines={1} style={styles.activity}>
            {friend.activity}
          </Text>
        </View>

        <View style={styles.scoreContainer}>
          <Text style={styles.score}>G</Text>
          <Text style={styles.scoreVal}>{friend.gamerscore.toLocaleString()}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
  },
  statusDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  gamertag: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  activity: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  score: {
    color: COLORS.xboxGreen,
    fontWeight: 'bold',
    fontSize: 12,
    marginRight: 4,
  },
  scoreVal: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
});

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Game } from '../data/mockData';
import { COLORS } from '../theme/colors';

interface AchievementListItemProps {
  game: Game;
}

export const AchievementListItem: React.FC<AchievementListItemProps> = ({ game }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: game.coverUrl }} style={styles.thumbnail} />
      
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text numberOfLines={1} style={styles.title}>
            {game.title}
          </Text>
          <View style={styles.scoreRow}>
            <Text style={styles.gLogo}>G</Text>
            <Text style={styles.scoreText}>
              {game.gamerscoreUnlocked} / {game.gamerscoreMax}
            </Text>
          </View>
        </View>
        
        <Text style={styles.publisher}>{game.publisher}</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBg}>
            <View 
              style={[
                styles.progressBarFill, 
                { width: `${game.achievementPercentage}%` }
              ]} 
            />
          </View>
          <Text style={styles.percentageText}>
            {game.achievementPercentage}%
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  thumbnail: {
    width: 50,
    height: 65,
    borderRadius: 4,
    backgroundColor: '#333',
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gLogo: {
    color: COLORS.xboxGreen,
    fontWeight: 'bold',
    fontSize: 11,
    marginRight: 3,
  },
  scoreText: {
    color: COLORS.textPrimary,
    fontSize: 11,
    fontWeight: '600',
  },
  publisher: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.background,
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.xboxGreen,
    borderRadius: 3,
  },
  percentageText: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: 'bold',
    width: 30,
    textAlign: 'right',
  },
});

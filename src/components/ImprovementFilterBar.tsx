import React, { useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  Animated,
} from 'react-native';
import { COLORS } from '../theme/colors';

interface ImprovementFilterBarProps {
  selectedFilter: string;
  onFilterSelect: (filter: string) => void;
}

const FILTERS = ['All', 'Co-Op', 'Crossplay', 'RPG', 'Cloud Gaming'];

export const ImprovementFilterBar: React.FC<ImprovementFilterBarProps> = ({
  selectedFilter,
  onFilterSelect,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {FILTERS.map(filter => {
        const isActive = selectedFilter === filter;
        return (
          <FilterChip
            key={filter}
            label={filter}
            isActive={isActive}
            onPress={() => onFilterSelect(filter)}
          />
        );
      })}
    </ScrollView>
  );
};

interface FilterChipProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, isActive, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.94,
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

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.chip,
          isActive ? styles.chipActive : styles.chipInactive,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Text style={[styles.label, isActive ? styles.labelActive : styles.labelInactive]}>
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: COLORS.xboxGreen,
    borderColor: COLORS.xboxGreen,
  },
  chipInactive: {
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.border,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  labelActive: {
    color: COLORS.white,
  },
  labelInactive: {
    color: COLORS.textSecondary,
  },
});

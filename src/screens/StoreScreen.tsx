import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { STORE_DEALS_DATA, STORE_NEW_DATA, USER_PROFILE } from '../data/mockData';
import { GameCardItem } from '../components/GameCardItem';

export const StoreScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header matching Screenshot 4 */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={{ uri: USER_PROFILE.avatarUrl }} style={styles.gamerpic} />
          <Text style={styles.headerTitle}>Store</Text>
        </View>
        <View style={styles.headerIcons}>
          <Pressable style={styles.iconButton}>
            <Text style={styles.iconText}>❤️</Text>
          </Pressable>
          <Pressable style={styles.iconButton}>
            <Text style={styles.iconText}>🔍</Text>
          </Pressable>
        </View>
      </View>

      {/* Featured Banner matching Screenshot 4 */}
      <View style={styles.featuredContainer}>
        <Image
          source={{ uri: 'https://shared.akamai.steamstatic.com/store_images_shared/app/242050/header.jpg' }}
          style={styles.featuredImage}
        />
        <View style={styles.featuredOverlay}>
          <Text style={styles.featuredTitle}>Assassin's Creed Black Flag Resynced</Text>
          <Text style={styles.featuredSubtitle}>Raise the Black Flag again</Text>
        </View>
      </View>

      {/* Game Deals Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Game deals</Text>
          <Pressable>
            <Text style={styles.seeAllText}>See all</Text>
          </Pressable>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={STORE_DEALS_DATA}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCardItem
              game={item}
              width={120}
              height={160}
              showDetailsBelow={true}
            />
          )}
          contentContainerStyle={styles.horizontalList}
        />
      </View>

      {/* New Games Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New games</Text>
          <Pressable>
            <Text style={styles.seeAllText}>See all</Text>
          </Pressable>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={STORE_NEW_DATA}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCardItem
              game={item}
              width={120}
              height={160}
              showDetailsBelow={true}
            />
          )}
          contentContainerStyle={styles.horizontalList}
        />
      </View>

      {/* Spacing */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gamerpic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.xboxGreen,
    backgroundColor: '#333',
    marginRight: 12,
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 22,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 18,
    padding: 2,
  },
  iconText: {
    fontSize: 18,
    color: COLORS.white,
  },
  featuredContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    height: 190,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#222',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
    padding: 16,
  },
  featuredTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  featuredSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  sectionContainer: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  horizontalList: {
    paddingHorizontal: 16,
  },
});

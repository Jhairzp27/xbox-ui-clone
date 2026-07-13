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
import {
  GAMES_DATA,
  FRIENDS_DATA,
  OFFICIAL_PUBLISHERS,
  USER_PROFILE,
} from '../data/mockData';
import { GameCardItem } from '../components/GameCardItem';

interface HomeScreenProps {
  onNavigate: (tab: 'Home' | 'Social' | 'Library' | 'Store' | 'Profile') => void;
  userData: typeof USER_PROFILE;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, userData }) => {
  // Sort friends to show favorites first
  const activeFriends = FRIENDS_DATA.filter(f => f.isFavorite);

  // Jump Back In covers (UFC 4, FC 26, Minecraft)
  const jumpBackInGames = GAMES_DATA.filter(g =>
    ['UFC 4', 'EA SPORTS FC 26', 'Minecraft'].includes(g.title)
  );

  // Popular with Friends covers (Red Dead, Fortnite, Roblox)
  const popularGames = GAMES_DATA.filter(g =>
    ['Red Dead Redemption 2', 'Fortnite', 'Roblox'].includes(g.title)
  );

  const renderActiveFriendCard = ({ item }: { item: typeof FRIENDS_DATA[0] }) => (
    <View style={styles.friendCard}>
      <View style={styles.friendAvatarContainer}>
        <Image source={{ uri: item.avatarUrl }} style={styles.friendCardAvatar} />
        {item.isFavorite && (
          <View style={styles.favoriteBadge}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-filled/100/ffffff/star.png' }}
              style={styles.favoriteStarIcon}
            />
          </View>
        )}
      </View>
      <Text numberOfLines={1} style={styles.friendCardGamertag}>
        {item.gamertag}
      </Text>
      <Text numberOfLines={1} style={styles.friendCardStatus}>
        {item.activity.split(':')[0]}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* 1. Header matching Screenshot 1 & 2 */}
      <View style={styles.header}>
        <Pressable 
          style={styles.profileSummary}
          onPress={() => onNavigate('Profile')}
        >
          <Image source={{ uri: userData.avatarUrl }} style={styles.topAvatar} />
          <View style={styles.profileTexts}>
            <View style={styles.gamertagRow}>
              <Text style={styles.topGamertag}>{userData.gamertag}</Text>
              <View style={styles.ultimateBadge}>
                <Text style={styles.ultimateBadgeText}>{userData.tier}</Text>
              </View>
            </View>
            <View style={styles.scoreRow}>
              <View style={styles.gLogoContainer}>
                <Text style={styles.gLogoText}>G</Text>
              </View>
              <Text style={styles.scoreValue}>{userData.gamerscore}</Text>
            </View>
          </View>
        </Pressable>

        <View style={styles.headerIcons}>
          <Pressable style={styles.headerIconButton}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-filled/100/ffffff/xbox.png' }}
              style={styles.headerIconImage}
            />
          </Pressable>
          <Pressable style={styles.headerIconButton}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-filled/100/ffffff/alarm.png' }}
              style={styles.headerIconImage}
            />
            <View style={styles.notifBadge}>
              <Text style={styles.notifBadgeText}>11</Text>
            </View>
          </Pressable>
        </View>
      </View>

      {/* 2. Search Capsule matching Screenshot 1 - Tapping navigates to Library Search */}
      <Pressable 
        style={styles.searchSection}
        onPress={() => onNavigate('Library')}
      >
        <View style={styles.searchCapsule}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/100/ffffff/search.png' }}
            style={styles.searchIconImage}
          />
          <Text style={styles.searchPlaceholderText}>
            Search for games, people, and more
          </Text>
        </View>
      </Pressable>

      {/* 3. Featured Card (Assassin's Creed IV) matching Screenshot 1 */}
      <View style={styles.featuredContainer}>
        <Image
          source={require('../assets/ac_black_flag_header.jpg')}
          style={styles.featuredImage}
        />
        <View style={styles.featuredOverlay}>
          <Text style={styles.featuredTitle}>AC Black Flag Resynced</Text>
          <Text style={styles.featuredDesc}>Raise the Black Flag again</Text>
        </View>
      </View>

      {/* 4. Active Friends Section matching Screenshot 1 */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active friends</Text>
          <Pressable onPress={() => onNavigate('Social')}>
            <Text style={styles.seeAllText}>See all</Text>
          </Pressable>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={activeFriends}
          keyExtractor={item => item.id}
          renderItem={renderActiveFriendCard}
          contentContainerStyle={styles.horizontalList}
        />
      </View>

      {/* 5. Jump Back In Section matching Screenshot 2 */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitleOnly}>Jump back in</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={jumpBackInGames}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCardItem
              game={item}
              width={105}
              height={140}
              showDetailsBelow={false} // Covers only
            />
          )}
          contentContainerStyle={styles.horizontalList}
        />
      </View>

      {/* 6. Official Posts From Games Section matching Screenshot 2 */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitleOnly}>Official posts from games</Text>
        <View style={styles.officialPublishersRow}>
          {OFFICIAL_PUBLISHERS.map(pub => (
            <View key={pub.id} style={styles.publisherCircleContainer}>
              <View style={styles.publisherAvatarWrapper}>
                <Image 
                  source={typeof pub.avatarUrl === 'string' ? { uri: pub.avatarUrl } : pub.avatarUrl} 
                  style={styles.publisherAvatar} 
                />
                {pub.verified && (
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedCheck}>✓</Text>
                  </View>
                )}
              </View>
              <Text numberOfLines={1} style={styles.publisherName}>
                {pub.name}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* 7. Popular With Friends Section matching Screenshot 2 */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitleOnly}>Popular with friends</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={popularGames}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCardItem
              game={item}
              width={110}
              height={150}
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
    paddingTop: 16,
    paddingBottom: 12,
  },
  profileSummary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: COLORS.xboxGreen,
    backgroundColor: '#333',
  },
  profileTexts: {
    marginLeft: 12,
  },
  gamertagRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topGamertag: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  ultimateBadge: {
    backgroundColor: '#1E1E1E',
    borderColor: '#3A3A3A',
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 6,
  },
  ultimateBadgeText: {
    color: COLORS.white,
    fontSize: 8,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  gLogoContainer: {
    width: 13,
    height: 13,
    borderRadius: 6.5,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  gLogoText: {
    color: COLORS.black,
    fontSize: 8,
    fontWeight: '900',
  },
  scoreValue: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconButton: {
    marginLeft: 14,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  headerIconImage: {
    width: 18,
    height: 18,
    tintColor: COLORS.white,
  },
  notifBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: COLORS.xboxGreen,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    minWidth: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadgeText: {
    color: COLORS.white,
    fontSize: 8,
    fontWeight: 'bold',
  },
  searchSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchCapsule: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#2D2D2D',
  },
  searchIconImage: {
    width: 14,
    height: 14,
    tintColor: COLORS.textSecondary,
  },
  searchPlaceholderText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginLeft: 10,
  },
  featuredContainer: {
    marginHorizontal: 16,
    height: 250,
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  featuredDesc: {
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
  sectionTitleOnly: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  seeAllText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  horizontalList: {
    paddingHorizontal: 16,
  },
  
  // Active Friends Card layout
  friendCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    padding: 12,
    width: 105,
    marginRight: 10,
    alignItems: 'center',
  },
  friendAvatarContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  friendCardAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#333',
  },
  favoriteBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#252525',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444',
  },
  favoriteStarIcon: {
    width: 10,
    height: 10,
    tintColor: '#FEB800',
  },
  friendCardGamertag: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  friendCardStatus: {
    color: COLORS.textSecondary,
    fontSize: 9,
    marginTop: 2,
    textAlign: 'center',
  },

  // Official publishers circles
  officialPublishersRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  publisherCircleContainer: {
    alignItems: 'center',
    marginRight: 20,
    width: 75,
  },
  publisherAvatarWrapper: {
    position: 'relative',
    marginBottom: 6,
  },
  publisherAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: COLORS.xboxGreen,
    backgroundColor: '#333',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.white,
    width: 14,
    height: 14,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedCheck: {
    color: COLORS.black,
    fontSize: 8,
    fontWeight: 'bold',
  },
  publisherName: {
    color: COLORS.textSecondary,
    fontSize: 11,
    textAlign: 'center',
  },
});

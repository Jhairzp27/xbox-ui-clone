import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import { COLORS } from '../theme/colors';
import {
  FRIENDS_DATA,
  SUGGESTED_FRIENDS,
  CHATS_DATA,
  USER_PROFILE,
  Friend,
} from '../data/mockData';

type SubTab = 'friends' | 'parties' | 'chats';

export const SocialScreen: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('friends');
  const [suggestions, setSuggestions] = useState<Friend[]>(SUGGESTED_FRIENDS);

  const handleRemoveSuggestion = (id: string) => {
    setSuggestions(prev => prev.filter(item => item.id !== id));
  };

  const handleAddFriend = (gamertag: string) => {
    // Simulated add action
    alert(`Friend request sent to ${gamertag}!`);
  };

  const renderFriendsContent = () => {
    const favorites = FRIENDS_DATA.filter(f => f.isFavorite);
    const online = FRIENDS_DATA.filter(f => f.status === 'online');

    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>
        {/* Friend Requests Banner matching Screenshot 3 */}
        <Pressable style={styles.requestBanner}>
          <Text style={styles.requestBannerText}>Friend requests</Text>
          <View style={styles.requestBannerRight}>
            <View style={styles.requestBadge}>
              <Text style={styles.requestBadgeText}>1</Text>
            </View>
            <Text style={styles.chevron}>❯</Text>
          </View>
        </Pressable>

        {/* Favorites Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Favorites</Text>
        </View>
        {favorites.map(friend => (
          <View key={friend.id} style={styles.friendRow}>
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: friend.avatarUrl }} style={styles.friendAvatar} />
              {friend.isFavorite && (
                <View style={styles.favBadgeSmall}>
                  <Text style={styles.favStarSmall}>⭐</Text>
                </View>
              )}
            </View>
            <View style={styles.friendInfo}>
              <View style={styles.gamertagRow}>
                <Text style={styles.gamertag}>{friend.gamertag}</Text>
                {friend.realName && (
                  <Text style={styles.realName}> {friend.realName}</Text>
                )}
              </View>
              <Text numberOfLines={1} style={styles.activityText}>
                {friend.activity}
              </Text>
            </View>
          </View>
        ))}

        {/* Online Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Online</Text>
        </View>
        {online.length > 0 ? (
          online.map(friend => (
            <View key={friend.id} style={styles.friendRow}>
              <View style={styles.avatarWrapper}>
                <Image source={{ uri: friend.avatarUrl }} style={styles.friendAvatar} />
                <View style={[styles.statusDot, { backgroundColor: COLORS.online }]} />
              </View>
              <View style={styles.friendInfo}>
                <Text style={styles.gamertag}>{friend.gamertag}</Text>
                <Text numberOfLines={1} style={styles.activityText}>
                  {friend.activity}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptySectionText}>No friends online</Text>
        )}

        {/* We found friends for you Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>We found friends for you</Text>
        </View>

        {/* Steam / Social Networks Button matching Screenshot 3 */}
        <Pressable style={styles.socialSyncButton}>
          <View style={styles.socialSyncLeft}>
            <View style={styles.steamIconContainer}>
              {/* Steam logo representation */}
              <Text style={styles.steamLogo}>🎮</Text>
            </View>
            <Text style={styles.socialSyncText}>
              Find more friends from your social networks
            </Text>
          </View>
          <Text style={styles.chevron}>❯</Text>
        </Pressable>

        {/* Suggested Friends List matching Screenshot 3 */}
        <View style={styles.suggestionsContainer}>
          {suggestions.map(suggest => (
            <View key={suggest.id} style={styles.suggestedRow}>
              <Image source={{ uri: suggest.avatarUrl }} style={styles.suggestAvatar} />
              
              <View style={styles.suggestInfo}>
                <Text style={styles.suggestGamertag}>{suggest.gamertag}</Text>
                {suggest.realName && (
                  <Text style={styles.suggestRealName}>{suggest.realName}</Text>
                )}
                <Text style={styles.suggestLabel}>{suggest.activity}</Text>
              </View>

              <View style={styles.suggestActions}>
                <Pressable
                  style={styles.addButton}
                  onPress={() => handleAddFriend(suggest.gamertag)}
                >
                  <Text style={styles.addButtonIcon}>➕</Text>
                </Pressable>
                
                <Pressable
                  style={styles.dismissButton}
                  onPress={() => handleRemoveSuggestion(suggest.id)}
                >
                  <Text style={styles.dismissButtonIcon}>✕</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>

        {/* Bottom spacer */}
        <View style={{ height: 40 }} />
      </ScrollView>
    );
  };

  const renderChatsContent = () => (
    <FlatList
      data={CHATS_DATA}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Pressable style={styles.chatRow}>
          <Image source={{ uri: item.avatarUrl }} style={styles.chatAvatar} />
          <View style={styles.chatInfo}>
            <View style={styles.chatHeader}>
              <Text style={styles.chatGamertag}>{item.gamertag}</Text>
              <Text style={styles.chatTime}>{item.time}</Text>
            </View>
            <Text
              numberOfLines={1}
              style={[styles.chatSnippet, item.unread ? styles.chatSnippetUnread : null]}
            >
              {item.lastMessage}
            </Text>
          </View>
          {item.unread && <View style={styles.unreadDot} />}
        </Pressable>
      )}
      contentContainerStyle={styles.listPadding}
    />
  );

  return (
    <View style={styles.container}>
      {/* Header matching Screenshot 3 */}
      <View style={styles.mainHeader}>
        <View style={styles.headerTitleContainer}>
          <Image source={{ uri: USER_PROFILE.avatarUrl }} style={styles.headerGamerpic} />
          <Text style={styles.headerTitle}>Social</Text>
        </View>
        <View style={styles.headerIcons}>
          <Pressable style={styles.headerIcon}>
            <Text style={styles.headerIconText}>➕</Text>
          </Pressable>
          <Pressable style={styles.headerIcon}>
            <Text style={styles.headerIconText}>🔍</Text>
          </Pressable>
        </View>
      </View>

      {/* Sub tabs matching Screenshot 3 */}
      <View style={styles.subTabsContainer}>
        <Pressable
          style={[styles.subTab, activeSubTab === 'friends' && styles.subTabActive]}
          onPress={() => setActiveSubTab('friends')}
        >
          <Text style={[styles.subTabLabel, activeSubTab === 'friends' && styles.subTabLabelActive]}>
            Friends (1)
          </Text>
        </Pressable>

        <Pressable
          style={[styles.subTab, activeSubTab === 'parties' && styles.subTabActive]}
          onPress={() => setActiveSubTab('parties')}
        >
          <Text style={[styles.subTabLabel, activeSubTab === 'parties' && styles.subTabLabelActive]}>
            Parties
          </Text>
        </Pressable>

        <Pressable
          style={[styles.subTab, activeSubTab === 'chats' && styles.subTabActive]}
          onPress={() => setActiveSubTab('chats')}
        >
          <Text style={[styles.subTabLabel, activeSubTab === 'chats' && styles.subTabLabelActive]}>
            Chats
          </Text>
        </Pressable>
      </View>

      {/* Conditional Content */}
      {activeSubTab === 'friends' && renderFriendsContent()}
      {activeSubTab === 'chats' && renderChatsContent()}
      {activeSubTab === 'parties' && (
        <View style={styles.emptyPartiesContainer}>
          <Text style={styles.emptyPartiesText}>No active parties.</Text>
          <Pressable style={styles.startPartyButton}>
            <Text style={styles.startPartyButtonText}>Start a Party</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  mainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerGamerpic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.xboxGreen,
    marginRight: 12,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 18,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.06)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIconText: {
    color: COLORS.white,
    fontSize: 14,
  },
  subTabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 16,
  },
  subTab: {
    paddingVertical: 12,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  subTabActive: {
    borderBottomColor: COLORS.white,
  },
  subTabLabel: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  subTabLabelActive: {
    color: COLORS.white,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  requestBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  requestBannerText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  requestBannerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requestBadge: {
    backgroundColor: COLORS.xboxGreen,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 1,
    marginRight: 10,
  },
  requestBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  chevron: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  sectionHeader: {
    marginBottom: 12,
    marginTop: 6,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptySectionText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginBottom: 20,
  },
  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 12,
  },
  friendAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#333',
  },
  favBadgeSmall: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#252525',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444',
  },
  favStarSmall: {
    fontSize: 8,
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  friendInfo: {
    flex: 1,
  },
  gamertagRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  gamertag: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  realName: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  activityText: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  socialSyncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cardBackground,
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  socialSyncLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 12,
  },
  steamIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0F2C59',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  steamLogo: {
    fontSize: 14,
  },
  socialSyncText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  suggestionsContainer: {
    marginBottom: 16,
  },
  suggestedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  suggestAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#333',
    marginRight: 12,
  },
  suggestInfo: {
    flex: 1,
  },
  suggestGamertag: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: 'bold',
  },
  suggestRealName: {
    color: COLORS.textSecondary,
    fontSize: 10,
    marginTop: 1,
  },
  suggestLabel: {
    color: COLORS.textSecondary,
    fontSize: 10,
    marginTop: 2,
  },
  suggestActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: COLORS.xboxGreen,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  addButtonIcon: {
    color: COLORS.white,
    fontSize: 12,
  },
  dismissButton: {
    backgroundColor: COLORS.cardBackground,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dismissButtonIcon: {
    color: COLORS.textSecondary,
    fontSize: 10,
  },

  // Chats View Styling
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  chatAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#333',
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatGamertag: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  chatTime: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  chatSnippet: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  chatSnippetUnread: {
    color: COLORS.white,
    fontWeight: '600',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.xboxGreen,
    marginLeft: 8,
  },
  listPadding: {
    paddingBottom: 24,
  },

  // Parties View Styling
  emptyPartiesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyPartiesText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginBottom: 16,
  },
  startPartyButton: {
    backgroundColor: COLORS.xboxGreen,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  startPartyButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 13,
  },
});

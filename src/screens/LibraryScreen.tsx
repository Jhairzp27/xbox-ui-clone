import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  Pressable,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { GAMES_DATA, FRIENDS_DATA, Game } from '../data/mockData';
import { ImprovementFilterBar } from '../components/ImprovementFilterBar';

export const LibraryScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  
  // Modal for quick invite (Phase C Improvement)
  const [selectedGameForInvite, setSelectedGameForInvite] = useState<Game | null>(null);

  // Filter games based on search and selected filter chip
  const filteredGames = GAMES_DATA.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === 'All' || game.categories.includes(selectedFilter);
    return matchesSearch && matchesFilter;
  });

  const handleInviteFriend = (friendName: string) => {
    if (!selectedGameForInvite) return;
    
    Alert.alert(
      'Party Invited',
      `Sent party invitation to ${friendName} to play ${selectedGameForInvite.title}!`,
      [{ text: 'OK', onPress: () => setSelectedGameForInvite(null) }]
    );
  };

  const renderGameItem = ({ item }: { item: Game }) => (
    <Pressable 
      style={styles.gameItem}
      onLongPress={() => setSelectedGameForInvite(item)}
      onPress={() => setSelectedGameForInvite(item)}
    >
      <Image 
        source={typeof item.coverUrl === 'string' ? { uri: item.coverUrl } : item.coverUrl} 
        style={styles.coverImage} 
      />
      <View style={styles.gameInfo}>
        <Text style={styles.gameTitle}>{item.title}</Text>
        <Text style={styles.gameDetail}>{item.publisher} • {item.size}</Text>
        <View style={styles.categoryBadgeContainer}>
          {item.categories.slice(0, 3).map(cat => (
            <View key={cat} style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{cat}</Text>
            </View>
          ))}
        </View>
      </View>
      <Pressable 
        style={styles.inviteActionButton}
        onPress={() => setSelectedGameForInvite(item)}
      >
        <Text style={styles.inviteActionButtonText}>Invite</Text>
      </Pressable>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search games..."
          placeholderTextColor={COLORS.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Phase C UX Improvement Filter Chips */}
      <ImprovementFilterBar
        selectedFilter={selectedFilter}
        onFilterSelect={setSelectedFilter}
      />

      {/* Game Library List */}
      <FlatList
        data={filteredGames}
        keyExtractor={item => item.id}
        renderItem={renderGameItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No games found matching criteria.</Text>
          </View>
        }
      />

      {/* Phase C: Quick Party Invitation Modal */}
      <Modal
        visible={!!selectedGameForInvite}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedGameForInvite(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Quick Party Invite</Text>
              <Text style={styles.modalSubtitle}>
                Invite active friends to play {selectedGameForInvite?.title}
              </Text>
            </View>

            <ScrollView style={styles.friendsInviteList}>
              {FRIENDS_DATA.filter(f => f.status === 'online').map(friend => (
                <Pressable
                  key={friend.id}
                  style={styles.inviteFriendRow}
                  onPress={() => handleInviteFriend(friend.gamertag)}
                >
                  <Image source={{ uri: friend.avatarUrl }} style={styles.inviteAvatar} />
                  <Text style={styles.inviteFriendName}>{friend.gamertag}</Text>
                  <View style={styles.inviteSendBadge}>
                    <Text style={styles.inviteSendBadgeText}>Send</Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>

            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setSelectedGameForInvite(null)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: COLORS.background,
  },
  searchInput: {
    backgroundColor: COLORS.inputBackground,
    color: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 14,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  gameItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  coverImage: {
    width: 50,
    height: 70,
    borderRadius: 4,
    backgroundColor: '#333',
    marginRight: 12,
  },
  gameInfo: {
    flex: 1,
  },
  gameTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  gameDetail: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  categoryBadgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  categoryBadge: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  categoryText: {
    color: COLORS.textSecondary,
    fontSize: 9,
    fontWeight: '600',
  },
  inviteActionButton: {
    backgroundColor: COLORS.xboxGreen,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  inviteActionButtonText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },

  // Modal Styling (UX Improvement Flow)
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.cardBackground,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: '60%',
  },
  modalHeader: {
    marginBottom: 16,
  },
  modalTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  friendsInviteList: {
    marginBottom: 16,
  },
  inviteFriendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  inviteAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#333',
    marginRight: 12,
  },
  inviteFriendName: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  inviteSendBadge: {
    backgroundColor: COLORS.xboxGreen,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  inviteSendBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  modalCloseButton: {
    backgroundColor: COLORS.inputBackground,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

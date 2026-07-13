import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { USER_PROFILE } from '../data/mockData';

type ProfileTab = 'posts' | 'achievements' | 'about';

interface ProfileScreenProps {
  onNavigate: (tab: 'Home' | 'Social' | 'Library' | 'Store' | 'Profile') => void;
  userData: typeof USER_PROFILE;
  setUserData: React.Dispatch<React.SetStateAction<typeof USER_PROFILE>>;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onNavigate,
  userData,
  setUserData,
}) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('posts');
  const [statusState, setStatusState] = useState<'offline' | 'online'>('offline');
  
  // Settings Modal State
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [tempGamertag, setTempGamertag] = useState(userData.gamertag);
  const [tempGamerscore, setTempGamerscore] = useState(userData.gamerscore.toString());

  const handleSaveSettings = () => {
    const parsedScore = parseInt(tempGamerscore, 10);
    if (!tempGamertag.trim()) {
      Alert.alert('Validation Error', 'Gamertag cannot be empty.');
      return;
    }
    if (isNaN(parsedScore)) {
      Alert.alert('Validation Error', 'Gamerscore must be a number.');
      return;
    }

    setUserData(prev => ({
      ...prev,
      gamertag: tempGamertag,
      gamerscore: parsedScore,
    }));
    setSettingsVisible(false);
    Alert.alert('Profile Saved', 'Your Xbox profile details have been updated.');
  };

  const renderPosts = () => (
    <View style={styles.postsList}>
      {/* Achievement Card matching Screenshot 5 */}
      <View style={styles.postCard}>
        {/* Post Author Row */}
        <View style={styles.authorRow}>
          <View style={styles.authorLeft}>
            <Image source={{ uri: userData.avatarUrl }} style={styles.authorAvatar} />
            <View style={styles.authorInfo}>
              <View style={styles.gamertagVerifiedRow}>
                <Text style={styles.authorGamertag}>{userData.gamertag}</Text>
                <View style={styles.greenVerifyCheck}>
                  <Text style={styles.verifyCheckText}>✓</Text>
                </View>
              </View>
            </View>
          </View>
          <Pressable style={styles.authorMoreButton}>
            <Text style={styles.moreButtonText}>•••</Text>
          </Pressable>
        </View>

        {/* Achievement Unlock Card Body */}
        <View style={styles.achievementUnlockCard}>
          {/* Top layout with Gamerscore G 30 badge */}
          <View style={styles.achievementGraphicContainer}>
            <View style={styles.graphicOverlay} />
            <View style={styles.gBadgeContainer}>
              <Text style={styles.gBadgeLetter}>G</Text>
              <Text style={styles.gBadgeValue}>30</Text>
            </View>
          </View>
          
          {/* Bottom Game details inside achievement card */}
          <View style={styles.achievementDetailsCard}>
            <View style={styles.gameCoverRow}>
              {/* EA FC 26 Cover representation */}
              <Image
                source={require('../assets/fc_26.jpg')}
                style={styles.achievementGameCover}
              />
              <View style={styles.achievementTextInfo}>
                <Text style={styles.achievementTitle}>PlayStyles+</Text>
                <Text numberOfLines={1} style={styles.achievementGameTitle}>
                  EA SPORTS FC™ 26 Xbox One
                </Text>
              </View>
            </View>
            <Text style={styles.achievementDesc}>
              Score a goal with an active PlayStyle.
            </Text>
          </View>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Backdrop Header matching Screenshot 5 */}
        <View style={styles.backdropContainer}>
          {/* Banner with mascot image */}
          <Image
            source={{ uri: userData.avatarUrl }}
            style={styles.backdropImage}
          />
          <View style={styles.backdropOverlay} />
          
          {/* Back and Settings Header */}
          <View style={styles.navBar}>
            <Pressable 
              style={styles.navButton}
              onPress={() => onNavigate('Home')}
            >
              <Image
                source={{ uri: 'https://img.icons8.com/ios-filled/100/ffffff/left.png' }}
                style={styles.navIconImage}
              />
            </Pressable>
            <Text style={styles.headerTitle}>{userData.gamertag}</Text>
            <Pressable 
              style={styles.navButton}
              onPress={() => {
                setTempGamertag(userData.gamertag);
                setTempGamerscore(userData.gamerscore.toString());
                setSettingsVisible(true);
              }}
            >
              <Image
                source={{ uri: 'https://img.icons8.com/ios-filled/100/ffffff/settings.png' }}
                style={styles.navIconImage}
              />
            </Pressable>
          </View>

          {/* Profile Card Overlay details */}
          <View style={styles.profileDetails}>
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: userData.avatarUrl }} style={styles.gamerpic} />
              <View style={styles.editPencilBadge}>
                <Image
                  source={{ uri: 'https://img.icons8.com/ios-filled/100/ffffff/edit.png' }}
                  style={styles.pencilIcon}
                />
              </View>
              <View style={styles.verifiedCheckBadge}>
                <Text style={styles.checkText}>✓</Text>
              </View>
            </View>

            {/* Gamertag name & status indicator */}
            <View style={styles.gamertagWrapper}>
              <Text style={styles.gamertagText}>{userData.gamertag}</Text>
              <View style={styles.greenVerifyCheckBig}>
                <Text style={styles.verifyCheckTextBig}>✓</Text>
              </View>
            </View>
            <Text style={styles.subtitleText}>Xbox App</Text>

            {/* Link Social Accounts */}
            <Pressable 
              style={styles.socialLinkButton}
              onPress={() => Alert.alert('Social Integration', 'Linking social accounts accounts...')}
            >
              <Text style={styles.socialLinkButtonText}>➕ Link social accounts</Text>
            </Pressable>

            {/* Stats count row (Friends, Following, Followers) */}
            <View style={styles.statsRow}>
              <Pressable style={styles.statCol} onPress={() => onNavigate('Social')}>
                <Text style={styles.statNum}>{userData.friendsCount}</Text>
                <Text style={styles.statLabel}>Friends ❯</Text>
              </Pressable>
              <Pressable style={styles.statCol}>
                <Text style={styles.statNum}>{userData.followingCount}</Text>
                <Text style={styles.statLabel}>Following ❯</Text>
              </Pressable>
              <Pressable style={styles.statCol}>
                <Text style={styles.statNum}>{userData.followersCount}</Text>
                <Text style={styles.statLabel}>Followers ❯</Text>
              </Pressable>
            </View>

            {/* Status selection buttons */}
            <View style={styles.statusButtonsContainer}>
              <Pressable
                style={styles.statusPrimaryButton}
                onPress={() => setStatusState(statusState === 'offline' ? 'online' : 'offline')}
              >
                <Text style={styles.statusPrimaryButtonText}>
                  {statusState === 'offline' ? 'Appear offline' : 'Appear online'}
                </Text>
              </Pressable>
              <Pressable 
                style={styles.statusDotsButton}
                onPress={() => Alert.alert('More Options', 'Opening profile context menu...')}
              >
                <Text style={styles.statusDotsText}>•••</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Tabs list matching Screenshot 5 */}
        <View style={styles.tabsContainer}>
          <Pressable
            style={[styles.tab, activeTab === 'posts' && styles.tabActive]}
            onPress={() => setActiveTab('posts')}
          >
            <Text style={[styles.tabLabel, activeTab === 'posts' && styles.tabLabelActive]}>
              Posts
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'achievements' && styles.tabActive]}
            onPress={() => setActiveTab('achievements')}
          >
            <Text style={[styles.tabLabel, activeTab === 'achievements' && styles.tabLabelActive]}>
              Achievements
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'about' && styles.tabActive]}
            onPress={() => setActiveTab('about')}
          >
            <Text style={[styles.tabLabel, activeTab === 'about' && styles.tabLabelActive]}>
              About
            </Text>
          </Pressable>
        </View>

        {/* Conditional rendering of tabs content */}
        {activeTab === 'posts' && renderPosts()}
        
        {activeTab === 'achievements' && (
          <View style={styles.achievementsPlaceholder}>
            <Text style={styles.placeholderText}>Total Gamerscore: {userData.gamerscore} G</Text>
          </View>
        )}

        {activeTab === 'about' && (
          <View style={styles.aboutPlaceholder}>
            <Text style={styles.placeholderText}>Xbox Live Member since 2020.</Text>
          </View>
        )}
      </ScrollView>

      {/* Settings Modal (MVP Feature) */}
      <Modal
        visible={settingsVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSettingsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Settings (Customize Profile)</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Gamertag</Text>
              <TextInput
                style={styles.textInput}
                value={tempGamertag}
                onChangeText={setTempGamertag}
                placeholder="Enter gamertag"
                placeholderTextColor={COLORS.textSecondary}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Gamerscore</Text>
              <TextInput
                style={styles.textInput}
                value={tempGamerscore}
                onChangeText={setTempGamerscore}
                keyboardType="numeric"
                placeholder="Enter gamerscore"
                placeholderTextColor={COLORS.textSecondary}
              />
            </View>

            <View style={styles.modalButtonsRow}>
              <Pressable
                style={[styles.modalBtn, styles.modalBtnCancel]}
                onPress={() => setSettingsVisible(false)}
              >
                <Text style={styles.modalBtnTextCancel}>Cancel</Text>
              </Pressable>
              
              <Pressable
                style={[styles.modalBtn, styles.modalBtnSave]}
                onPress={handleSaveSettings}
              >
                <Text style={styles.modalBtnTextSave}>Save</Text>
              </Pressable>
            </View>
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
  backdropContainer: {
    position: 'relative',
    paddingBottom: 24,
    backgroundColor: COLORS.background,
  },
  backdropImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 250,
    width: '100%',
    opacity: 0.15,
  },
  backdropOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 250,
    backgroundColor: 'rgba(18,18,18,0.7)',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  navButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.06)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIconImage: {
    width: 14,
    height: 14,
    tintColor: COLORS.white,
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  profileDetails: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 24,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  gamerpic: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 2,
    borderColor: COLORS.xboxGreen,
    backgroundColor: '#333',
  },
  editPencilBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#2A2A2A',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.background,
  },
  pencilIcon: {
    width: 11,
    height: 11,
    tintColor: COLORS.white,
  },
  verifiedCheckBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.xboxGreen,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.background,
  },
  checkText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  gamertagWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gamertagText: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  greenVerifyCheckBig: {
    backgroundColor: COLORS.xboxGreen,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  verifyCheckTextBig: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: 'bold',
  },
  subtitleText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },
  socialLinkButton: {
    marginTop: 10,
    paddingVertical: 4,
  },
  socialLinkButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 20,
  },
  statCol: {
    alignItems: 'center',
  },
  statNum: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  statLabel: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  statusButtonsContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 8,
  },
  statusPrimaryButton: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  statusPrimaryButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 13,
  },
  statusDotsButton: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  statusDotsText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,
  },
  tab: {
    paddingVertical: 12,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: COLORS.white,
  },
  tabLabel: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  tabLabelActive: {
    color: COLORS.white,
  },
  postsList: {
    padding: 16,
  },
  postCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  authorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
    backgroundColor: '#333',
  },
  authorInfo: {
    justifyContent: 'center',
  },
  gamertagVerifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorGamertag: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: 'bold',
  },
  greenVerifyCheck: {
    backgroundColor: COLORS.xboxGreen,
    width: 12,
    height: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  verifyCheckText: {
    color: COLORS.white,
    fontSize: 7,
    fontWeight: 'bold',
  },
  authorMoreButton: {
    paddingHorizontal: 4,
  },
  moreButtonText: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  achievementUnlockCard: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  achievementGraphicContainer: {
    height: 130,
    backgroundColor: '#1E293B',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphicOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(16, 124, 16, 0.1)',
  },
  gBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: COLORS.xboxGreen,
  },
  gBadgeLetter: {
    color: COLORS.xboxGreen,
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 6,
  },
  gBadgeValue: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  achievementDetailsCard: {
    padding: 12,
  },
  gameCoverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementGameCover: {
    width: 32,
    height: 44,
    borderRadius: 3,
    backgroundColor: '#333',
    marginRight: 10,
  },
  achievementTextInfo: {
    flex: 1,
  },
  achievementTitle: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: 'bold',
  },
  achievementGameTitle: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  achievementDesc: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
  achievementsPlaceholder: {
    padding: 32,
    alignItems: 'center',
  },
  aboutPlaceholder: {
    padding: 32,
    alignItems: 'center',
  },
  placeholderText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },

  // Modal Styling for Settings
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: COLORS.background,
    color: COLORS.white,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalBtnCancel: {
    backgroundColor: '#2A2A2A',
    marginRight: 10,
  },
  modalBtnSave: {
    backgroundColor: COLORS.xboxGreen,
    marginLeft: 10,
  },
  modalBtnTextCancel: {
    color: COLORS.textSecondary,
    fontWeight: 'bold',
  },
  modalBtnTextSave: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

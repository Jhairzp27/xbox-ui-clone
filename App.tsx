import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Pressable,
  Image,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from './src/theme/colors';
import { USER_PROFILE as initialProfile } from './src/data/mockData';

// Screens
import { HomeScreen } from './src/screens/HomeScreen';
import { SocialScreen } from './src/screens/SocialScreen';
import { LibraryScreen } from './src/screens/LibraryScreen';
import { StoreScreen } from './src/screens/StoreScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';

type Tab = 'Home' | 'Social' | 'Library' | 'Store' | 'Profile';

function AppContent() {
  const [activeTab, setActiveTab] = useState<Tab>('Home');
  
  // Shared user profile state for live MVP updates
  const [userData, setUserData] = useState(initialProfile);

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen onNavigate={setActiveTab} userData={userData} />;
      case 'Social':
        return <SocialScreen userData={userData} />;
      case 'Library':
        return <LibraryScreen />;
      case 'Store':
        return <StoreScreen userData={userData} />;
      case 'Profile':
        return (
          <ProfileScreen
            onNavigate={setActiveTab}
            userData={userData}
            setUserData={setUserData}
          />
        );
      default:
        return <HomeScreen onNavigate={setActiveTab} userData={userData} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      {/* Main Active Screen */}
      <View style={styles.screenContainer}>
        {renderActiveScreen()}
      </View>

      {/* 5-Tab Custom Bottom Navigation Bar matching user screenshots */}
      <View style={styles.tabBar}>
        {/* Tab 1: Home */}
        <Pressable
          style={styles.tabItem}
          onPress={() => setActiveTab('Home')}
        >
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/100/ffffff/home.png' }}
            style={[
              styles.tabIcon,
              { tintColor: activeTab === 'Home' ? COLORS.xboxGreen : COLORS.textSecondary },
            ]}
          />
          {activeTab === 'Home' && <View style={styles.tabDotActive} />}
        </Pressable>

        {/* Tab 2: Social with Green Badge 1 */}
        <Pressable
          style={styles.tabItem}
          onPress={() => setActiveTab('Social')}
        >
          <View style={styles.iconBadgeWrapper}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-filled/100/ffffff/conference-call.png' }}
              style={[
                styles.tabIcon,
                { tintColor: activeTab === 'Social' ? COLORS.xboxGreen : COLORS.textSecondary },
              ]}
            />
            {/* Green Badge for pending requests */}
            <View style={styles.notifBadge}>
              <Text style={styles.notifBadgeText}>1</Text>
            </View>
          </View>
          {activeTab === 'Social' && <View style={styles.tabDotActive} />}
        </Pressable>

        {/* Tab 3: Library */}
        <Pressable
          style={styles.tabItem}
          onPress={() => setActiveTab('Library')}
        >
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/100/ffffff/books.png' }}
            style={[
              styles.tabIcon,
              { tintColor: activeTab === 'Library' ? COLORS.xboxGreen : COLORS.textSecondary },
            ]}
          />
          {activeTab === 'Library' && <View style={styles.tabDotActive} />}
        </Pressable>

        {/* Tab 4: Store */}
        <Pressable
          style={styles.tabItem}
          onPress={() => setActiveTab('Store')}
        >
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/100/ffffff/shopping-bag.png' }}
            style={[
              styles.tabIcon,
              { tintColor: activeTab === 'Store' ? COLORS.xboxGreen : COLORS.textSecondary },
            ]}
          />
          {activeTab === 'Store' && <View style={styles.tabDotActive} />}
        </Pressable>

        {/* Tab 5: Profile (Circular Mascot) */}
        <Pressable
          style={styles.tabItem}
          onPress={() => setActiveTab('Profile')}
        >
          <Image
            source={{ uri: userData.avatarUrl }}
            style={[
              styles.profileTabIcon,
              activeTab === 'Profile' ? styles.profileTabIconActive : null,
            ]}
          />
          {activeTab === 'Profile' && <View style={styles.tabDotActive} />}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// Inline fallback for Text since it's used inside subcomponents but not explicitly in parent except for badge text.
// Adding React Native Text to imports.
import { Text } from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screenContainer: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: COLORS.cardBackground,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: 4,
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    position: 'relative',
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
  iconBadgeWrapper: {
    position: 'relative',
  },
  notifBadge: {
    position: 'absolute',
    top: -5,
    right: -7,
    backgroundColor: COLORS.xboxGreen,
    borderRadius: 7,
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifBadgeText: {
    color: COLORS.white,
    fontSize: 8,
    fontWeight: 'bold',
  },
  profileTabIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#555',
  },
  profileTabIconActive: {
    borderColor: COLORS.xboxGreen,
    borderWidth: 2,
  },
  tabDotActive: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.xboxGreen,
  },
});

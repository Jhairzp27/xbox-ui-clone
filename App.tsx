import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from './src/theme/colors';
import { USER_PROFILE } from './src/data/mockData';

// Screens
import { HomeScreen } from './src/screens/HomeScreen';
import { SocialScreen } from './src/screens/SocialScreen';
import { LibraryScreen } from './src/screens/LibraryScreen';
import { StoreScreen } from './src/screens/StoreScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';

type Tab = 'Home' | 'Social' | 'Library' | 'Store' | 'Profile';

function AppContent() {
  const [activeTab, setActiveTab] = useState<Tab>('Home');

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen />;
      case 'Social':
        return <SocialScreen />;
      case 'Library':
        return <LibraryScreen />;
      case 'Store':
        return <StoreScreen />;
      case 'Profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
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
          <Text style={[styles.tabIcon, activeTab === 'Home' ? styles.tabIconActive : null]}>
            🏠
          </Text>
          {activeTab === 'Home' && <View style={styles.tabDotActive} />}
        </Pressable>

        {/* Tab 2: Social with Green Badge 1 */}
        <Pressable
          style={styles.tabItem}
          onPress={() => setActiveTab('Social')}
        >
          <View style={styles.iconBadgeWrapper}>
            <Text style={[styles.tabIcon, activeTab === 'Social' ? styles.tabIconActive : null]}>
              👥
            </Text>
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
          <Text style={[styles.tabIcon, activeTab === 'Library' ? styles.tabIconActive : null]}>
            📚
          </Text>
          {activeTab === 'Library' && <View style={styles.tabDotActive} />}
        </Pressable>

        {/* Tab 4: Store */}
        <Pressable
          style={styles.tabItem}
          onPress={() => setActiveTab('Store')}
        >
          <Text style={[styles.tabIcon, activeTab === 'Store' ? styles.tabIconActive : null]}>
            🛍️
          </Text>
          {activeTab === 'Store' && <View style={styles.tabDotActive} />}
        </Pressable>

        {/* Tab 5: Profile (Circular Mascot representation) */}
        <Pressable
          style={styles.tabItem}
          onPress={() => setActiveTab('Profile')}
        >
          <Image
            source={{ uri: USER_PROFILE.avatarUrl }}
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
    fontSize: 20,
    color: COLORS.white,
    opacity: 0.45,
  },
  tabIconActive: {
    opacity: 1.0,
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
    opacity: 0.55,
  },
  profileTabIconActive: {
    borderColor: COLORS.xboxGreen,
    borderWidth: 2,
    opacity: 1.0,
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

export interface Game {
  id: string;
  title: string;
  coverUrl: string;
  publisher: string;
  size?: string;
  isGamePass: boolean;
  categories: string[];
  friendsPlayText?: string;
  
  // Store properties
  priceOriginal?: string;
  priceDeal?: string;
  discountPercentage?: string; // e.g. "-80%"
  hasConsoleIcon?: boolean;
  hasCloudIcon?: boolean;
  hasPcIcon?: boolean;
}

export interface Friend {
  id: string;
  gamertag: string;
  realName?: string;
  avatarUrl: string;
  status: 'online' | 'offline' | 'away';
  activity: string;
  gamerscore: number;
  isFavorite?: boolean;
  isSuggested?: boolean;
}

export interface ChatMessage {
  id: string;
  gamertag: string;
  avatarUrl: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

export interface OfficialPostGame {
  id: string;
  name: string;
  avatarUrl: string;
  verified: boolean;
}

// User Profile Details matching screenshot
// Dicebear avatar is changed to PNG format to support React Native Image rendering on Android
export const USER_PROFILE = {
  gamertag: 'jhair27',
  tier: 'ULTIMATE',
  gamerscore: 6950,
  avatarUrl: 'https://api.dicebear.com/7.x/bottts/png?seed=crocodile&colors=green',
  friendsCount: 7,
  followingCount: 4,
  followersCount: 4,
};

// Games Data matching Screenshot 1, 2, 4, 5
// Image URLs updated to official high-speed Akamai Steam CDN images for maximum loading reliability on Android
export const GAMES_DATA: Game[] = [
  {
    id: '1',
    title: 'AC Black Flag Resynced',
    coverUrl: 'https://shared.akamai.steamstatic.com/store_images_shared/app/242050/library_600x900.jpg',
    publisher: 'Ubisoft',
    size: '42.1 GB',
    isGamePass: false,
    categories: ['Co-Op', 'Action', 'Adventure'],
    friendsPlayText: 'Raise the Black Flag again',
  },
  {
    id: '2',
    title: 'UFC 4',
    coverUrl: 'https://shared.akamai.steamstatic.com/store_images_shared/app/2669320/library_600x900.jpg', // FC 25 image as high fidelity placeholder
    publisher: 'EA Sports',
    size: '34.8 GB',
    isGamePass: false,
    categories: ['Fighting', 'Sports'],
  },
  {
    id: '3',
    title: 'EA SPORTS FC 26',
    coverUrl: 'https://shared.akamai.steamstatic.com/store_images_shared/app/2669320/library_600x900.jpg',
    publisher: 'EA Sports',
    size: '48.9 GB',
    isGamePass: false,
    categories: ['Sports', 'Crossplay'],
  },
  {
    id: '4',
    title: 'Minecraft',
    coverUrl: 'https://shared.akamai.steamstatic.com/store_images_shared/app/1132740/library_600x900.jpg', // Minecraft Dungeons high resolution Steam art
    publisher: 'Mojang Studios',
    size: '1.2 GB',
    isGamePass: true,
    categories: ['Co-Op', 'Crossplay', 'Survival'],
  },
  {
    id: '5',
    title: 'Red Dead Redemption 2',
    coverUrl: 'https://shared.akamai.steamstatic.com/store_images_shared/app/1174180/library_600x900.jpg',
    publisher: 'Rockstar Games',
    size: '119.5 GB',
    isGamePass: false,
    categories: ['Action', 'RPG'],
    friendsPlayText: '2 friends play',
  },
  {
    id: '6',
    title: 'Fortnite',
    coverUrl: 'https://shared.akamai.steamstatic.com/store_images_shared/app/1172470/library_600x900.jpg', // Apex Legends high resolution Steam art
    publisher: 'Epic Games',
    size: '42.3 GB',
    isGamePass: true,
    categories: ['Crossplay', 'Action', 'Cloud Gaming'],
    friendsPlayText: '2 friends play',
  },
  {
    id: '7',
    title: 'Roblox',
    coverUrl: 'https://shared.akamai.steamstatic.com/store_images_shared/app/4000/library_600x900.jpg', // Garry's Mod high resolution Steam art
    publisher: 'Roblox Corporation',
    size: '0.4 GB',
    isGamePass: false,
    categories: ['Co-Op', 'Crossplay'],
    friendsPlayText: '2 friends play',
  }
];

// Games specifically for the Store tab deals matching Screenshot 4
export const STORE_DEALS_DATA: Game[] = [
  {
    id: 'd1',
    title: 'Dead Island',
    coverUrl: 'https://shared.akamai.steamstatic.com/store_images_shared/app/1023240/library_600x900.jpg', // Dead Island 2
    publisher: 'Deep Silver',
    isGamePass: false,
    categories: ['Action', 'RPG'],
    discountPercentage: '-80%',
    priceOriginal: '$69.99',
    priceDeal: '$13.99',
    hasConsoleIcon: true,
    hasCloudIcon: true,
  },
  {
    id: 'd2',
    title: 'Code Vein II',
    coverUrl: 'https://shared.akamai.steamstatic.com/store_images_shared/app/678960/library_600x900.jpg', // Code Vein
    publisher: 'Bandai Namco',
    isGamePass: false,
    categories: ['RPG', 'Action'],
    discountPercentage: '-40%',
    priceOriginal: '$69.99',
    priceDeal: '$41.99',
    hasConsoleIcon: true,
  },
  {
    id: 'd3',
    title: 'EA SPORTS FC 26',
    coverUrl: 'https://shared.akamai.steamstatic.com/store_images_shared/app/2669320/library_600x900.jpg',
    publisher: 'EA Sports',
    isGamePass: true,
    categories: ['Sports'],
    discountPercentage: '-80%',
    priceOriginal: '$69.99',
    priceDeal: '$13.99',
    hasConsoleIcon: true,
  }
];

// Games specifically for the Store tab new releases matching Screenshot 4
export const STORE_NEW_DATA: Game[] = [
  {
    id: 'n1',
    title: 'D.U.M.B. & D.U.M.B.E.R. DUCKS',
    coverUrl: 'https://shared.akamai.steamstatic.com/store_images_shared/app/312530/library_600x900.jpg', // Duck Game
    publisher: 'Indie Devs',
    isGamePass: false,
    categories: ['Shooter'],
    priceDeal: '$6.99',
    hasConsoleIcon: true,
    hasPcIcon: true,
  },
  {
    id: 'n2',
    title: 'Welcome to Kowloon',
    coverUrl: 'https://shared.akamai.steamstatic.com/store_images_shared/app/739630/library_600x900.jpg', // Horror game
    publisher: 'Horror Studio',
    isGamePass: false,
    categories: ['Horror'],
    priceDeal: '$9.99',
    hasConsoleIcon: true,
  },
  {
    id: 'n3',
    title: 'Echoes of Aincrad',
    coverUrl: 'https://shared.akamai.steamstatic.com/store_images_shared/app/1049890/library_600x900.jpg', // JRPG
    publisher: 'RPG Group',
    isGamePass: false,
    categories: ['Anime', 'RPG'],
    priceDeal: '$69.99',
  }
];

// Friends Data matching Screenshot 1, 3
export const FRIENDS_DATA: Friend[] = [
  {
    id: 'f1',
    gamertag: 'CyclingSugar986',
    realName: 'Luis Alberto Flores Morales',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/png?seed=alien&colors=green',
    status: 'offline',
    activity: 'Last seen 14h ago: Roblox - Windows',
    gamerscore: 15430,
    isFavorite: true,
  },
  {
    id: 'f2',
    gamertag: 'Bernardx1#7112',
    avatarUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=crown',
    status: 'offline',
    activity: 'Last seen 1d',
    gamerscore: 8520,
    isFavorite: true,
  },
  {
    id: 'f3',
    gamertag: 'Breninxlz#8841',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/png?seed=spidey',
    status: 'offline',
    activity: 'Last seen 273d',
    gamerscore: 9945,
    isFavorite: true,
  }
];

// Suggested Friends matching Screenshot 3
export const SUGGESTED_FRIENDS: Friend[] = [
  {
    id: 's1',
    gamertag: 'TTV FeedElm',
    realName: 'bo perry',
    avatarUrl: 'https://api.dicebear.com/7.x/adventurer/png?seed=dog',
    status: 'offline',
    activity: 'Suggested for you',
    gamerscore: 24300,
    isSuggested: true,
  },
  {
    id: 's2',
    gamertag: 'BrunoLeal2394',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/png?seed=bruno',
    status: 'offline',
    activity: 'Suggested for you',
    gamerscore: 1240,
    isSuggested: true,
  },
  {
    id: 's3',
    gamertag: 'THmais13club',
    realName: 'Thiago Monteiro',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/png?seed=helmet',
    status: 'offline',
    activity: 'Suggested for you',
    gamerscore: 4830,
    isSuggested: true,
  }
];

export const CHATS_DATA: ChatMessage[] = [
  {
    id: 'c1',
    gamertag: 'CyclingSugar986',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/png?seed=alien&colors=green',
    lastMessage: 'Ready for some Roblox later?',
    time: '14:32',
    unread: true,
  },
  {
    id: 'c2',
    gamertag: 'Bernardx1#7112',
    avatarUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=crown',
    lastMessage: 'Check the new deals on store.',
    time: 'Yesterday',
    unread: false,
  }
];

// Official post publishers matching Screenshot 2
export const OFFICIAL_PUBLISHERS: OfficialPostGame[] = [
  {
    id: 'p1',
    name: 'Minecraft',
    avatarUrl: 'https://shared.akamai.steamstatic.com/store_images_shared/app/1132740/header.jpg', // Minecraft Dungeons Header
    verified: true,
  },
  {
    id: 'p2',
    name: 'EA SPORTS',
    avatarUrl: 'https://shared.akamai.steamstatic.com/store_images_shared/app/2669320/header.jpg', // EA FC 25 Header
    verified: true,
  }
];

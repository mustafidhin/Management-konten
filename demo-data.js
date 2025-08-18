// Demo data untuk AI Content Manager
// File ini berisi data contoh untuk testing dan demo

const demoContent = [
  {
    id: "1",
    title: "Beautiful Sunset Photography",
    description: "Amazing sunset captured during golden hour",
    platform: "instagram",
    tags: ["photography", "sunset", "nature", "golden hour"],
    mediaUrl: "/uploads/demo-sunset.jpg",
    originalFilename: "sunset.jpg",
    createdAt: "2024-01-15T10:30:00.000Z",
    status: "published",
    aiCaption: "Golden hour magic! 🌅 This sunset took my breath away. Nature never fails to amaze me with its beauty. #photography #sunset #nature #goldenhour #beautiful #capture #moment",
    optimizedCaption: "Golden hour magic! 🌅\n\nThis sunset took my breath away. Nature never fails to amaze me with its beauty.\n\n#photography #sunset #nature #goldenhour #beautiful #capture #moment #instagood #photooftheday",
    analytics: {
      views: 2500,
      likes: 180,
      comments: 25,
      shares: 12
    }
  },
  {
    id: "2",
    title: "Quick Recipe Tutorial",
    description: "Easy 5-minute breakfast recipe",
    platform: "tiktok",
    tags: ["recipe", "breakfast", "quick", "tutorial"],
    mediaUrl: "/uploads/demo-recipe.mp4",
    originalFilename: "recipe.mp4",
    createdAt: "2024-01-14T08:15:00.000Z",
    status: "published",
    aiCaption: "5-minute breakfast hack! 🍳 Quick and delicious #recipe #breakfast #quick #tutorial #food #hack",
    optimizedCaption: "5-minute breakfast hack! 🍳 Quick and delicious #recipe #breakfast #quick #tutorial #food #hack #fyp #viral",
    analytics: {
      views: 15000,
      likes: 1200,
      comments: 89,
      shares: 45
    }
  },
  {
    id: "3",
    title: "Tech Review: Latest Smartphone",
    description: "Comprehensive review of the newest smartphone",
    platform: "youtube",
    tags: ["tech", "review", "smartphone", "gadgets"],
    mediaUrl: "/uploads/demo-tech-review.mp4",
    originalFilename: "tech-review.mp4",
    createdAt: "2024-01-13T14:20:00.000Z",
    status: "published",
    aiCaption: "The most comprehensive review of the latest smartphone! 📱 From camera quality to performance, I cover everything you need to know. Don't forget to subscribe for more tech reviews! 🔔\n\n#tech #review #smartphone #gadgets #technology #youtube #subscribe",
    optimizedCaption: "The most comprehensive review of the latest smartphone! 📱\n\nFrom camera quality to performance, I cover everything you need to know.\n\nDon't forget to subscribe for more tech reviews! 🔔\n\n#tech #review #smartphone #gadgets #technology #youtube #subscribe #newvideo #youtuber",
    analytics: {
      views: 45000,
      likes: 3200,
      comments: 156,
      shares: 89
    }
  },
  {
    id: "4",
    title: "Breaking News Update",
    description: "Latest breaking news in technology",
    platform: "twitter",
    tags: ["news", "breaking", "tech", "update"],
    mediaUrl: "/uploads/demo-news.jpg",
    originalFilename: "news.jpg",
    createdAt: "2024-01-12T16:45:00.000Z",
    status: "published",
    aiCaption: "BREAKING: Major tech announcement that will change everything! 🚀 #breaking #news #tech #update",
    optimizedCaption: "BREAKING: Major tech announcement that will change everything! 🚀 #breaking #news #tech #update",
    analytics: {
      views: 8500,
      likes: 450,
      comments: 67,
      shares: 23
    }
  },
  {
    id: "5",
    title: "Fashion Lookbook",
    description: "Spring fashion collection showcase",
    platform: "instagram",
    tags: ["fashion", "spring", "lookbook", "style"],
    mediaUrl: "/uploads/demo-fashion.jpg",
    originalFilename: "fashion.jpg",
    createdAt: "2024-01-11T12:00:00.000Z",
    status: "draft",
    aiCaption: "Spring vibes are here! 🌸 New collection dropping soon. Which look is your favorite? Comment below! 👇\n\n#fashion #spring #lookbook #style #newcollection #trending #fashionista",
    optimizedCaption: "Spring vibes are here! 🌸\n\nNew collection dropping soon. Which look is your favorite? Comment below! 👇\n\n#fashion #spring #lookbook #style #newcollection #trending #fashionista #instagood #photooftheday",
    analytics: {
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0
    }
  },
  {
    id: "6",
    title: "Travel Vlog: Paris Adventure",
    description: "Exploring the beautiful city of Paris",
    platform: "youtube",
    tags: ["travel", "paris", "vlog", "adventure"],
    mediaUrl: "/uploads/demo-paris.mp4",
    originalFilename: "paris.mp4",
    createdAt: "2024-01-10T09:30:00.000Z",
    status: "scheduled",
    aiCaption: "Paris, je t'aime! 🇫🇷 Exploring the most beautiful city in the world. From the Eiffel Tower to hidden cafes, this vlog has it all. Like and subscribe for more travel content! ✈️\n\n#travel #paris #vlog #adventure #france #eiffeltower #travelvlog",
    optimizedCaption: "Paris, je t'aime! 🇫🇷\n\nExploring the most beautiful city in the world. From the Eiffel Tower to hidden cafes, this vlog has it all.\n\nLike and subscribe for more travel content! ✈️\n\n#travel #paris #vlog #adventure #france #eiffeltower #travelvlog #youtube #subscribe",
    analytics: {
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0
    }
  }
];

const demoPlatforms = {
  instagram: {
    captionLength: { min: 125, max: 2200 },
    hashtagCount: { min: 5, max: 30 },
    engagementKeywords: ['like', 'comment', 'share', 'save', 'follow'],
    bestPostingTimes: ['09:00', '12:00', '15:00', '18:00', '21:00'],
    hashtagStrategy: 'mix_popular_niche'
  },
  tiktok: {
    captionLength: { min: 50, max: 150 },
    hashtagCount: { min: 3, max: 8 },
    engagementKeywords: ['duet', 'stitch', 'follow', 'like', 'comment'],
    bestPostingTimes: ['12:00', '15:00', '18:00', '21:00'],
    hashtagStrategy: 'trending_focused'
  },
  youtube: {
    captionLength: { min: 100, max: 5000 },
    hashtagCount: { min: 3, max: 15 },
    engagementKeywords: ['subscribe', 'like', 'comment', 'share', 'bell'],
    bestPostingTimes: ['14:00', '17:00', '20:00'],
    hashtagStrategy: 'seo_focused'
  },
  twitter: {
    captionLength: { min: 50, max: 280 },
    hashtagCount: { min: 1, max: 3 },
    engagementKeywords: ['retweet', 'like', 'follow', 'thread'],
    bestPostingTimes: ['08:00', '12:00', '17:00', '19:00'],
    hashtagStrategy: 'trending_minimal'
  }
};

// Function untuk populate demo data
function populateDemoData() {
  // Simpan demo content ke localStorage atau database
  if (typeof window !== 'undefined') {
    localStorage.setItem('demoContent', JSON.stringify(demoContent));
    localStorage.setItem('demoPlatforms', JSON.stringify(demoPlatforms));
  }
  
  return {
    content: demoContent,
    platforms: demoPlatforms
  };
}

// Function untuk get demo data
function getDemoData() {
  if (typeof window !== 'undefined') {
    const content = localStorage.getItem('demoContent');
    const platforms = localStorage.getItem('demoPlatforms');
    
    if (content && platforms) {
      return {
        content: JSON.parse(content),
        platforms: JSON.parse(platforms)
      };
    }
  }
  
  return {
    content: demoContent,
    platforms: demoPlatforms
  };
}

// Export untuk Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    demoContent,
    demoPlatforms,
    populateDemoData,
    getDemoData
  };
}

// Export untuk browser
if (typeof window !== 'undefined') {
  window.demoData = {
    demoContent,
    demoPlatforms,
    populateDemoData,
    getDemoData
  };
}
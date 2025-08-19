const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Logging
app.use(morgan('combined'));

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|webm/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed!'));
    }
  }
});

// Serve static files
app.use('/uploads', express.static(uploadsDir));

// Demo data
const { demoContent, demoPlatforms } = require('./demo-data');

// In-memory storage for content (in production, use a database)
let contentStore = demoContent;
let platformAlgorithms = demoPlatforms;

// API Routes

// Get all content
app.get('/api/content', (req, res) => {
  res.json(contentStore);
});

// Upload media and create content
app.post('/api/content', upload.single('media'), (req, res) => {
  try {
    const { title, description, platform, tags } = req.body;
    const mediaFile = req.file;

    if (!mediaFile) {
      return res.status(400).json({ error: 'Media file is required' });
    }

    const newContent = {
      id: Date.now().toString(),
      title: title || 'Untitled Content',
      description: description || '',
      platform: platform || 'instagram',
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      mediaUrl: `/uploads/${mediaFile.filename}`,
      originalFilename: mediaFile.originalname,
      createdAt: new Date().toISOString(),
      status: 'draft',
      aiCaption: '',
      optimizedCaption: '',
      analytics: {
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0
      }
    };

    contentStore.push(newContent);
    res.status(201).json(newContent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate AI Caption
app.post('/api/generate-caption', async (req, res) => {
  try {
    const { contentId, platform, style, tone, keywords } = req.body;
    
    const content = contentStore.find(c => c.id === contentId);
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    const algorithm = platformAlgorithms[platform] || platformAlgorithms.instagram;
    
    // Simulate AI caption generation (replace with actual OpenAI API call)
    const aiCaption = await generateAICaption(content, platform, algorithm, style, tone, keywords);
    
    // Update content with AI caption
    content.aiCaption = aiCaption;
    content.optimizedCaption = optimizeCaptionForPlatform(aiCaption, platform, algorithm);
    
    res.json({
      aiCaption: content.aiCaption,
      optimizedCaption: content.optimizedCaption,
      platform: platform,
      algorithm: algorithm
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get platform algorithms
app.get('/api/platforms', (req, res) => {
  res.json(platformAlgorithms);
});

// Update content
app.put('/api/content/:id', (req, res) => {
  const { id } = req.params;
  const contentIndex = contentStore.findIndex(c => c.id === id);
  
  if (contentIndex === -1) {
    return res.status(404).json({ error: 'Content not found' });
  }

  contentStore[contentIndex] = { ...contentStore[contentIndex], ...req.body };
  res.json(contentStore[contentIndex]);
});

// Delete content
app.delete('/api/content/:id', (req, res) => {
  const { id } = req.params;
  const contentIndex = contentStore.findIndex(c => c.id === id);
  
  if (contentIndex === -1) {
    return res.status(404).json({ error: 'Content not found' });
  }

  // Delete associated media file
  const content = contentStore[contentIndex];
  const mediaPath = path.join(__dirname, content.mediaUrl);
  if (fs.existsSync(mediaPath)) {
    fs.unlinkSync(mediaPath);
  }

  contentStore.splice(contentIndex, 1);
  res.json({ message: 'Content deleted successfully' });
});

// Reset demo data
app.post('/api/reset-demo', (req, res) => {
  contentStore = [...demoContent];
  res.json({ message: 'Demo data reset successfully', content: contentStore });
});

// AI Caption Generation Function
async function generateAICaption(content, platform, algorithm, style, tone, keywords) {
  // This is a simulation - replace with actual OpenAI API call
  const baseCaption = `Amazing content about ${content.title}! `;
  const engagement = algorithm.engagementKeywords.join(', ');
  const hashtags = generateHashtags(content.tags, algorithm.hashtagCount.max, algorithm.hashtagStrategy);
  
  let caption = baseCaption;
  
  if (style === 'engaging') {
    caption += `🔥 Don't miss this! ${engagement} below! 👇`;
  } else if (style === 'professional') {
    caption += `Check out this professional content. ${engagement} appreciated.`;
  } else {
    caption += `Hope you enjoy this! ${engagement} if you like it! ❤️`;
  }
  
  if (keywords) {
    caption += `\n\nKeywords: ${keywords}`;
  }
  
  caption += `\n\n${hashtags}`;
  
  // Ensure caption length is within platform limits
  if (caption.length > algorithm.captionLength.max) {
    caption = caption.substring(0, algorithm.captionLength.max - 3) + '...';
  }
  
  return caption;
}

// Optimize caption for specific platform
function optimizeCaptionForPlatform(caption, platform, algorithm) {
  let optimized = caption;
  
  // Platform-specific optimizations
  switch (platform) {
    case 'instagram':
      // Add line breaks for better readability
      optimized = optimized.replace(/\. /g, '.\n\n');
      break;
    case 'tiktok':
      // Keep it short and punchy
      optimized = optimized.split('\n')[0]; // Take first line only
      break;
    case 'youtube':
      // Add call-to-action
      optimized += '\n\n🔔 Subscribe for more content!';
      break;
    case 'twitter':
      // Ensure it fits in character limit
      if (optimized.length > 280) {
        optimized = optimized.substring(0, 277) + '...';
      }
      break;
  }
  
  return optimized;
}

// Generate hashtags based on strategy
function generateHashtags(tags, maxCount, strategy) {
  const popularHashtags = {
    instagram: ['#love', '#instagood', '#photooftheday', '#beautiful', '#fashion', '#happy', '#cute', '#followme', '#picoftheday', '#me'],
    tiktok: ['#fyp', '#foryou', '#viral', '#trending', '#funny', '#dance', '#music', '#comedy', '#love', '#fashion'],
    youtube: ['#youtube', '#viral', '#trending', '#subscribe', '#newvideo', '#youtuber', '#video', '#funny', '#music', '#gaming'],
    twitter: ['#trending', '#viral', '#news', '#breaking', '#follow', '#retweet', '#like', '#twitter', '#social', '#media']
  };
  
  let hashtags = [];
  
  // Add content-specific hashtags
  tags.forEach(tag => {
    hashtags.push(`#${tag.replace(/\s+/g, '')}`);
  });
  
  // Add platform-specific hashtags based on strategy
  const platformTags = popularHashtags[Object.keys(popularHashtags).find(p => p === strategy.split('_')[0])] || popularHashtags.instagram;
  
  if (strategy.includes('popular')) {
    hashtags = hashtags.concat(platformTags.slice(0, Math.floor(maxCount / 2)));
  } else if (strategy.includes('trending')) {
    hashtags = hashtags.concat(platformTags.slice(0, Math.floor(maxCount / 3)));
  }
  
  // Limit to max count
  return hashtags.slice(0, maxCount).join(' ');
}

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 AI Content Manager Server running on port ${PORT}`);
  console.log(`📱 API available at http://localhost:${PORT}/api`);
  console.log(`🌐 Frontend available at http://localhost:${PORT}`);
  console.log(`📊 Demo data loaded: ${contentStore.length} content items`);
});
# 🚀 Quick Start Guide - AI Content Manager

## ⚡ Super Quick Start

### Option 1: One-Command Setup (Recommended)
```bash
# Clone and run in one command
git clone <repository-url> && cd ai-content-manager && ./run-demo.sh
```

### Option 2: Manual Setup
```bash
# 1. Install dependencies
npm install && cd client && npm install && cd ..

# 2. Start the application
npm run dev
```

### Option 3: Docker Setup
```bash
# Run with Docker
docker-compose up --build
```

## 🌐 Access the Application

Once running, access the application at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🎯 What You'll See

### 📊 Dashboard
- Overview statistics
- Platform distribution
- Recent content
- Quick actions

### 📱 Content Manager
- Upload media files
- Organize content by platform
- Add tags and descriptions
- Edit and delete content

### 🤖 AI Caption Generator
- Select content to generate captions
- Choose platform (Instagram, TikTok, YouTube, Twitter)
- Customize style and tone
- View platform algorithm analysis
- Get optimized captions

### 📈 Analytics
- Real-time performance metrics
- Platform comparison charts
- Engagement tracking
- Top performing content

## 🎮 Demo Features

The application comes with **6 sample content items**:
1. **Beautiful Sunset Photography** (Instagram)
2. **Quick Recipe Tutorial** (TikTok)
3. **Tech Review: Latest Smartphone** (YouTube)
4. **Breaking News Update** (Twitter)
5. **Fashion Lookbook** (Instagram - Draft)
6. **Travel Vlog: Paris Adventure** (YouTube - Scheduled)

## 🔧 Platform Algorithms

### Instagram
- Caption length: 125-2200 characters
- Hashtags: 5-30
- Best times: 09:00, 12:00, 15:00, 18:00, 21:00

### TikTok
- Caption length: 50-150 characters
- Hashtags: 3-8
- Best times: 12:00, 15:00, 18:00, 21:00

### YouTube
- Caption length: 100-5000 characters
- Hashtags: 3-15
- Best times: 14:00, 17:00, 20:00

### Twitter
- Caption length: 50-280 characters
- Hashtags: 1-3
- Best times: 08:00, 12:00, 17:00, 19:00

## 🎨 Try These Features

### 1. Upload Content
1. Go to **Content Manager**
2. Click **"Add Content"**
3. Fill in title, description, platform
4. Add tags (comma-separated)
5. Upload an image or video
6. Click **"Create"**

### 2. Generate AI Caption
1. Go to **AI Generator**
2. Select content from the list
3. Choose platform and style
4. Add keywords if desired
5. Click **"Generate AI Caption"**
6. View both AI and optimized captions

### 3. View Analytics
1. Go to **Analytics**
2. See real-time metrics
3. Explore different charts
4. Filter by time range and platform

### 4. Platform Analysis
1. Scroll down in **AI Generator**
2. View algorithm analysis for each platform
3. See engagement keywords and best posting times

## 🔄 Reset Demo Data

If you want to reset to original demo data:
```bash
# Via API
curl -X POST http://localhost:5000/api/reset-demo

# Or restart the application
```

## 🛠️ Customization

### Environment Variables
Create `.env` file:
```env
PORT=5000
NODE_ENV=development
OPENAI_API_KEY=your_openai_key_here
```

### Add Real AI Integration
Replace the simulation in `server.js` with actual OpenAI API calls:
```javascript
// In generateAICaption function
const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: `Generate a ${style} caption for ${platform}...`
    },
    {
      role: "user", 
      content: `Content: ${content.title} - ${content.description}`
    }
  ]
});
```

## 🚨 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Dependencies Issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### File Upload Issues
```bash
# Check uploads directory permissions
chmod 755 uploads/

# Ensure directory exists
mkdir -p uploads
```

## 📚 Next Steps

1. **Read the full documentation**: [README.md](README.md)
2. **Learn about contributing**: [CONTRIBUTING.md](CONTRIBUTING.md)
3. **Check version history**: [CHANGELOG.md](CHANGELOG.md)
4. **Explore the code**: Start with `server.js` and `client/src/App.js`

## 🆘 Need Help?

- 📧 Email: support@aicontentmanager.com
- 🐛 Issues: GitHub Issues
- 📚 Docs: README.md
- 💬 Community: GitHub Discussions

---

**Happy Content Managing! 🚀**
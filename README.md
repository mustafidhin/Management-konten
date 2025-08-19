# AI Content Manager

Aplikasi website untuk management konten dengan kemampuan AI untuk generate caption yang optimal berdasarkan algoritma platform sosial media.

## 🚀 Fitur Utama

### 📊 Dashboard Management Konten
- **Overview Statistik**: Total konten, AI generated, views, dan engagement
- **Platform Distribution**: Distribusi konten berdasarkan platform
- **Content Status**: Status konten (published, draft, scheduled)
- **Recent Content**: Daftar konten terbaru dengan quick actions

### 🤖 AI Caption Generator
- **Multi-Platform Support**: Instagram, YouTube, TikTok, Twitter
- **Algorithm Analysis**: Analisis algoritma setiap platform
- **Style & Tone Customization**: Pilihan style dan tone caption
- **Keyword Integration**: Integrasi keyword untuk SEO
- **Platform Optimization**: Optimasi caption sesuai algoritma platform

### 📱 Content Management
- **Media Upload**: Upload gambar dan video dengan drag & drop
- **Content Organization**: Organisasi konten berdasarkan platform
- **Tag Management**: Sistem tagging untuk kategorisasi
- **Status Tracking**: Tracking status konten (draft, published, scheduled)

### 📈 Analytics & Performance
- **Real-time Analytics**: Analisis performa konten real-time
- **Platform Performance**: Perbandingan performa antar platform
- **Engagement Metrics**: Metrics engagement (views, likes, comments, shares)
- **Top Performing Content**: Konten dengan performa terbaik

## 🛠️ Teknologi yang Digunakan

### Backend
- **Node.js** dengan Express.js
- **Multer** untuk file upload
- **Helmet** untuk security
- **CORS** untuk cross-origin requests
- **Rate Limiting** untuk API protection

### Frontend
- **React.js** dengan hooks
- **Material-UI** untuk UI components
- **React Router** untuk navigation
- **Axios** untuk API calls
- **Chart.js** untuk visualisasi data
- **Framer Motion** untuk animasi
- **React Dropzone** untuk file upload

### AI & Optimization
- **Platform Algorithm Analysis**: Analisis algoritma Instagram, YouTube, TikTok, Twitter
- **Caption Optimization**: Optimasi caption berdasarkan platform
- **Hashtag Strategy**: Strategi hashtag yang optimal
- **Engagement Keywords**: Keywords untuk meningkatkan engagement

## 📋 Platform Algorithm Analysis

### Instagram
- **Caption Length**: 125-2200 karakter
- **Hashtag Count**: 5-30 hashtags
- **Engagement Keywords**: like, comment, share, save, follow
- **Best Posting Times**: 09:00, 12:00, 15:00, 18:00, 21:00
- **Strategy**: Mix popular dan niche hashtags

### TikTok
- **Caption Length**: 50-150 karakter
- **Hashtag Count**: 3-8 hashtags
- **Engagement Keywords**: duet, stitch, follow, like, comment
- **Best Posting Times**: 12:00, 15:00, 18:00, 21:00
- **Strategy**: Trending-focused hashtags

### YouTube
- **Caption Length**: 100-5000 karakter
- **Hashtag Count**: 3-15 hashtags
- **Engagement Keywords**: subscribe, like, comment, share, bell
- **Best Posting Times**: 14:00, 17:00, 20:00
- **Strategy**: SEO-focused hashtags

### Twitter
- **Caption Length**: 50-280 karakter
- **Hashtag Count**: 1-3 hashtags
- **Engagement Keywords**: retweet, like, follow, thread
- **Best Posting Times**: 08:00, 12:00, 17:00, 19:00
- **Strategy**: Trending minimal hashtags

## 🚀 Cara Menjalankan Aplikasi

### Prerequisites
- Node.js (v14 atau lebih baru)
- npm atau yarn

### Installation

1. **Clone repository**
```bash
git clone <repository-url>
cd ai-content-manager
```

2. **Install dependencies**
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

3. **Setup environment variables**
```bash
# Create .env file in root directory
cp .env.example .env
```

4. **Configure environment variables**
```env
PORT=5000
NODE_ENV=development
# Add OpenAI API key if using real AI generation
OPENAI_API_KEY=your_openai_api_key_here
```

5. **Run the application**
```bash
# Development mode (runs both backend and frontend)
npm run dev

# Or run separately:
# Backend only
npm start

# Frontend only (in client directory)
cd client
npm start
```

6. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Struktur Project

```
ai-content-manager/
├── server.js                 # Main server file
├── package.json             # Backend dependencies
├── uploads/                 # Media upload directory
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Dashboard.js
│   │   │   ├── ContentManager.js
│   │   │   ├── AIGenerator.js
│   │   │   ├── Analytics.js
│   │   │   ├── Sidebar.js
│   │   │   └── Header.js
│   │   ├── App.js          # Main App component
│   │   └── index.js        # Entry point
│   └── package.json        # Frontend dependencies
└── README.md              # Documentation
```

## 🔧 API Endpoints

### Content Management
- `GET /api/content` - Get all content
- `POST /api/content` - Create new content
- `PUT /api/content/:id` - Update content
- `DELETE /api/content/:id` - Delete content

### AI Generation
- `POST /api/generate-caption` - Generate AI caption
- `GET /api/platforms` - Get platform algorithms

## 🎯 Fitur AI Caption Generator

### Platform-Specific Optimization
- **Instagram**: Optimized untuk engagement dan hashtag strategy
- **TikTok**: Short, punchy captions dengan trending hashtags
- **YouTube**: SEO-focused dengan call-to-action
- **Twitter**: Character-limited dengan trending topics

### Customization Options
- **Style**: Engaging, Professional, Casual, Humorous
- **Tone**: Casual, Formal, Friendly, Enthusiastic
- **Keywords**: Custom keywords untuk SEO
- **Platform**: Multi-platform optimization

## 📊 Analytics Features

### Real-time Metrics
- Total views, likes, comments, shares
- Platform-specific performance
- Engagement trends over time
- Top performing content

### Visualizations
- Line charts untuk time series data
- Bar charts untuk platform comparison
- Doughnut charts untuk engagement distribution
- Progress bars untuk content performance

## 🔒 Security Features

- **Helmet.js**: Security headers
- **Rate Limiting**: API protection
- **File Upload Validation**: Secure file handling
- **CORS Configuration**: Cross-origin security
- **Input Validation**: Data sanitization

## 🚀 Deployment

### Production Build
```bash
# Build frontend
cd client
npm run build

# Start production server
npm start
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
OPENAI_API_KEY=your_production_openai_key
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini atau hubungi tim development.

---

**AI Content Manager** - Optimize your content with AI-powered captions! 🚀
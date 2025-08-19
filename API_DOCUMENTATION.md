# API Documentation - AI Content Manager

## Base URL
```
http://localhost:5000/api
```

## Authentication
Currently, the API doesn't require authentication. In production, implement JWT or OAuth2.

## Content Management

### Get All Content
```http
GET /api/content
```

**Response:**
```json
[
  {
    "id": "1",
    "title": "Beautiful Sunset Photography",
    "description": "Amazing sunset captured during golden hour",
    "platform": "instagram",
    "tags": ["photography", "sunset", "nature"],
    "mediaUrl": "/uploads/media-123.jpg",
    "originalFilename": "sunset.jpg",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "status": "published",
    "aiCaption": "Generated AI caption...",
    "optimizedCaption": "Optimized caption...",
    "analytics": {
      "views": 2500,
      "likes": 180,
      "comments": 25,
      "shares": 12
    }
  }
]
```

### Create New Content
```http
POST /api/content
Content-Type: multipart/form-data
```

**Form Data:**
- `title` (string): Content title
- `description` (string): Content description
- `platform` (string): Target platform (instagram, youtube, tiktok, twitter)
- `tags` (string): Comma-separated tags
- `media` (file): Image or video file

**Response:**
```json
{
  "id": "1234567890",
  "title": "New Content",
  "description": "Content description",
  "platform": "instagram",
  "tags": ["tag1", "tag2"],
  "mediaUrl": "/uploads/media-123.jpg",
  "originalFilename": "original.jpg",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "status": "draft",
  "aiCaption": "",
  "optimizedCaption": "",
  "analytics": {
    "views": 0,
    "likes": 0,
    "comments": 0,
    "shares": 0
  }
}
```

### Update Content
```http
PUT /api/content/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "platform": "youtube",
  "tags": ["new", "tags"],
  "status": "published"
}
```

**Response:**
```json
{
  "id": "1234567890",
  "title": "Updated Title",
  "description": "Updated description",
  "platform": "youtube",
  "tags": ["new", "tags"],
  "status": "published",
  // ... other fields
}
```

### Delete Content
```http
DELETE /api/content/:id
```

**Response:**
```json
{
  "message": "Content deleted successfully"
}
```

## AI Caption Generation

### Generate AI Caption
```http
POST /api/generate-caption
Content-Type: application/json
```

**Request Body:**
```json
{
  "contentId": "1234567890",
  "platform": "instagram",
  "style": "engaging",
  "tone": "casual",
  "keywords": "photography, nature, beautiful"
}
```

**Parameters:**
- `contentId` (string, required): ID of the content
- `platform` (string, required): Target platform
- `style` (string, optional): Caption style (engaging, professional, casual, humorous)
- `tone` (string, optional): Caption tone (casual, formal, friendly, enthusiastic)
- `keywords` (string, optional): Additional keywords

**Response:**
```json
{
  "aiCaption": "Generated AI caption with hashtags...",
  "optimizedCaption": "Platform-optimized caption...",
  "platform": "instagram",
  "algorithm": {
    "captionLength": { "min": 125, "max": 2200 },
    "hashtagCount": { "min": 5, "max": 30 },
    "engagementKeywords": ["like", "comment", "share"],
    "bestPostingTimes": ["09:00", "12:00", "15:00"],
    "hashtagStrategy": "mix_popular_niche"
  }
}
```

## Platform Algorithms

### Get Platform Algorithms
```http
GET /api/platforms
```

**Response:**
```json
{
  "instagram": {
    "captionLength": { "min": 125, "max": 2200 },
    "hashtagCount": { "min": 5, "max": 30 },
    "engagementKeywords": ["like", "comment", "share", "save", "follow"],
    "bestPostingTimes": ["09:00", "12:00", "15:00", "18:00", "21:00"],
    "hashtagStrategy": "mix_popular_niche"
  },
  "tiktok": {
    "captionLength": { "min": 50, "max": 150 },
    "hashtagCount": { "min": 3, "max": 8 },
    "engagementKeywords": ["duet", "stitch", "follow", "like", "comment"],
    "bestPostingTimes": ["12:00", "15:00", "18:00", "21:00"],
    "hashtagStrategy": "trending_focused"
  },
  "youtube": {
    "captionLength": { "min": 100, "max": 5000 },
    "hashtagCount": { "min": 3, "max": 15 },
    "engagementKeywords": ["subscribe", "like", "comment", "share", "bell"],
    "bestPostingTimes": ["14:00", "17:00", "20:00"],
    "hashtagStrategy": "seo_focused"
  },
  "twitter": {
    "captionLength": { "min": 50, "max": 280 },
    "hashtagCount": { "min": 1, "max": 3 },
    "engagementKeywords": ["retweet", "like", "follow", "thread"],
    "bestPostingTimes": ["08:00", "12:00", "17:00", "19:00"],
    "hashtagStrategy": "trending_minimal"
  }
}
```

## Demo Management

### Reset Demo Data
```http
POST /api/reset-demo
```

**Response:**
```json
{
  "message": "Demo data reset successfully",
  "content": [
    // Array of demo content items
  ]
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Media file is required"
}
```

### 404 Not Found
```json
{
  "error": "Content not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Error message description"
}
```

## File Upload

### Supported Formats
- **Images**: JPEG, JPG, PNG, GIF
- **Videos**: MP4, MOV, AVI, WEBM

### File Size Limit
- Maximum: 50MB per file

### Upload Endpoint
```
POST /api/content
```

## Rate Limiting

- **Limit**: 100 requests per 15 minutes per IP
- **Headers**: Rate limit information included in response headers

## CORS

The API supports cross-origin requests from:
- `http://localhost:3000` (development)
- Any origin in production (configurable)

## Examples

### cURL Examples

**Get all content:**
```bash
curl -X GET http://localhost:5000/api/content
```

**Create new content:**
```bash
curl -X POST http://localhost:5000/api/content \
  -F "title=My Content" \
  -F "description=Content description" \
  -F "platform=instagram" \
  -F "tags=photography,nature" \
  -F "media=@/path/to/image.jpg"
```

**Generate AI caption:**
```bash
curl -X POST http://localhost:5000/api/generate-caption \
  -H "Content-Type: application/json" \
  -d '{
    "contentId": "1234567890",
    "platform": "instagram",
    "style": "engaging",
    "tone": "casual"
  }'
```

### JavaScript Examples

**Fetch all content:**
```javascript
const response = await fetch('http://localhost:5000/api/content');
const content = await response.json();
```

**Upload content:**
```javascript
const formData = new FormData();
formData.append('title', 'My Content');
formData.append('description', 'Content description');
formData.append('platform', 'instagram');
formData.append('tags', 'photography,nature');
formData.append('media', fileInput.files[0]);

const response = await fetch('http://localhost:5000/api/content', {
  method: 'POST',
  body: formData
});
```

**Generate caption:**
```javascript
const response = await fetch('http://localhost:5000/api/generate-caption', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    contentId: '1234567890',
    platform: 'instagram',
    style: 'engaging',
    tone: 'casual'
  })
});
```

## Versioning

Current API version: v1.0.0

Future versions will include versioning in the URL:
```
/api/v1/content
/api/v2/content
```

## Support

For API support:
- 📧 Email: api@aicontentmanager.com
- 📚 Documentation: This file
- 🐛 Issues: GitHub Issues
- 💬 Community: GitHub Discussions

---

**API Documentation** - AI Content Manager v1.0.0 🚀
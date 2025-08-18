import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  LinearProgress,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Visibility,
  ThumbUp,
  Comment,
  Share,
  Instagram,
  YouTube,
  Twitter,
  ContentPaste,
} from '@mui/icons-material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Analytics() {
  const [content, setContent] = useState([]);
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/content');
      setContent(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram': return <Instagram />;
      case 'youtube': return <YouTube />;
      case 'twitter': return <Twitter />;
      default: return <ContentPaste />;
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'instagram': return '#E4405F';
      case 'youtube': return '#FF0000';
      case 'tiktok': return '#000000';
      case 'twitter': return '#1DA1F2';
      default: return '#6366f1';
    }
  };

  // Calculate analytics data
  const totalViews = content.reduce((sum, item) => sum + item.analytics.views, 0);
  const totalLikes = content.reduce((sum, item) => sum + item.analytics.likes, 0);
  const totalComments = content.reduce((sum, item) => sum + item.analytics.comments, 0);
  const totalShares = content.reduce((sum, item) => sum + item.analytics.shares, 0);

  const platformData = content.reduce((acc, item) => {
    if (!acc[item.platform]) {
      acc[item.platform] = {
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        count: 0,
      };
    }
    acc[item.platform].views += item.analytics.views;
    acc[item.platform].likes += item.analytics.likes;
    acc[item.platform].comments += item.analytics.comments;
    acc[item.platform].shares += item.analytics.shares;
    acc[item.platform].count += 1;
    return acc;
  }, {});

  // Chart data
  const engagementData = {
    labels: ['Views', 'Likes', 'Comments', 'Shares'],
    datasets: [
      {
        label: 'Engagement Metrics',
        data: [totalViews, totalLikes, totalComments, totalShares],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const platformChartData = {
    labels: Object.keys(platformData).map(p => p.charAt(0).toUpperCase() + p.slice(1)),
    datasets: [
      {
        label: 'Views',
        data: Object.values(platformData).map(p => p.views),
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
      },
      {
        label: 'Likes',
        data: Object.values(platformData).map(p => p.likes),
        backgroundColor: 'rgba(245, 158, 11, 0.8)',
        borderColor: 'rgba(245, 158, 11, 1)',
        borderWidth: 2,
      },
    ],
  };

  const timeSeriesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Views',
        data: [1200, 1900, 3000, 5000, 2000, 3000, 4000],
        borderColor: 'rgba(99, 102, 241, 1)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Engagement',
        data: [800, 1200, 2000, 3000, 1500, 2000, 2500],
        borderColor: 'rgba(245, 158, 11, 1)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const topPerformingContent = content
    .sort((a, b) => (b.analytics.views + b.analytics.likes + b.analytics.comments + b.analytics.shares) - 
                    (a.analytics.views + a.analytics.likes + a.analytics.comments + a.analytics.shares))
    .slice(0, 5);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Analytics Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small">
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="7d">Last 7 Days</MenuItem>
              <MenuItem value="30d">Last 30 Days</MenuItem>
              <MenuItem value="90d">Last 90 Days</MenuItem>
              <MenuItem value="1y">Last Year</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel>Platform</InputLabel>
            <Select
              value={selectedPlatform}
              label="Platform"
              onChange={(e) => setSelectedPlatform(e.target.value)}
            >
              <MenuItem value="all">All Platforms</MenuItem>
              <MenuItem value="instagram">Instagram</MenuItem>
              <MenuItem value="youtube">YouTube</MenuItem>
              <MenuItem value="tiktok">TikTok</MenuItem>
              <MenuItem value="twitter">Twitter</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Total Views
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
                    {totalViews.toLocaleString()}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                    <Typography variant="body2" color="success.main">
                      +12.5%
                    </Typography>
                  </Box>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                  <Visibility />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Total Likes
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
                    {totalLikes.toLocaleString()}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                    <Typography variant="body2" color="success.main">
                      +8.3%
                    </Typography>
                  </Box>
                </Box>
                <Avatar sx={{ bgcolor: 'secondary.main', width: 56, height: 56 }}>
                  <ThumbUp />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Total Comments
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
                    {totalComments.toLocaleString()}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                    <Typography variant="body2" color="success.main">
                      +15.2%
                    </Typography>
                  </Box>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56 }}>
                  <Comment />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Total Shares
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
                    {totalShares.toLocaleString()}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TrendingDown sx={{ fontSize: 16, color: 'error.main', mr: 0.5 }} />
                    <Typography variant="body2" color="error.main">
                      -2.1%
                    </Typography>
                  </Box>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main', width: 56, height: 56 }}>
                  <Share />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Performance Over Time
              </Typography>
              <Line
                data={timeSeriesData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Engagement Distribution
              </Typography>
              <Doughnut
                data={engagementData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Platform Performance */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Platform Performance
              </Typography>
              <Bar
                data={platformChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Top Performing Content
              </Typography>
              <List>
                {topPerformingContent.map((item, index) => {
                  const totalEngagement = item.analytics.views + item.analytics.likes + 
                                        item.analytics.comments + item.analytics.shares;
                  const maxEngagement = Math.max(...topPerformingContent.map(c => 
                    c.analytics.views + c.analytics.likes + c.analytics.comments + c.analytics.shares
                  ));
                  const percentage = (totalEngagement / maxEngagement) * 100;

                  return (
                    <ListItem key={item.id} sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: getPlatformColor(item.platform) }}>
                          {getPlatformIcon(item.platform)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.title}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {item.platform} • {totalEngagement.toLocaleString()} engagement
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={percentage}
                              sx={{ mt: 1, height: 4, borderRadius: 2 }}
                            />
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Chip
                          label={`#${index + 1}`}
                          size="small"
                          color={index === 0 ? 'primary' : 'default'}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Analytics;
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Avatar,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import {
  TrendingUp,
  ContentPaste,
  AutoAwesome,
  Visibility,
  ThumbUp,
  Comment,
  Share,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Instagram,
  YouTube,
  Twitter,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';

const StatCard = ({ title, value, icon, color, trend }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="text.secondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
              {value}
            </Typography>
            {trend && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                <Typography variant="body2" color="success.main">
                  {trend}
                </Typography>
              </Box>
            )}
          </Box>
          <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  </motion.div>
);

const PlatformCard = ({ platform, count, color, icon }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ bgcolor: color, mr: 2 }}>
          {icon}
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {platform}
        </Typography>
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        {count}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Content pieces
      </Typography>
    </CardContent>
  </Card>
);

function Dashboard() {
  const [content, setContent] = useState([]);
  const [stats, setStats] = useState({
    totalContent: 0,
    aiGenerated: 0,
    totalViews: 0,
    engagement: 0,
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/content');
      const contentData = response.data;
      setContent(contentData);
      
      // Calculate stats
      setStats({
        totalContent: contentData.length,
        aiGenerated: contentData.filter(c => c.aiCaption).length,
        totalViews: contentData.reduce((sum, c) => sum + c.analytics.views, 0),
        engagement: contentData.reduce((sum, c) => sum + c.analytics.likes + c.analytics.comments + c.analytics.shares, 0),
      });
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

  const recentContent = content.slice(0, 5);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Dashboard Overview
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Content"
            value={stats.totalContent}
            icon={<ContentPaste />}
            color="primary.main"
            trend="+12% this week"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="AI Generated"
            value={stats.aiGenerated}
            icon={<AutoAwesome />}
            color="secondary.main"
            trend="+25% this week"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Views"
            value={stats.totalViews.toLocaleString()}
            icon={<Visibility />}
            color="success.main"
            trend="+8% this week"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Engagement"
            value={stats.engagement.toLocaleString()}
            icon={<ThumbUp />}
            color="warning.main"
            trend="+15% this week"
          />
        </Grid>
      </Grid>

      {/* Platform Distribution */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Platform Distribution
              </Typography>
              <Grid container spacing={2}>
                {['instagram', 'youtube', 'tiktok', 'twitter'].map((platform) => {
                  const count = content.filter(c => c.platform === platform).length;
                  return (
                    <Grid item xs={6} sm={3} key={platform}>
                      <PlatformCard
                        platform={platform.charAt(0).toUpperCase() + platform.slice(1)}
                        count={count}
                        color={getPlatformColor(platform)}
                        icon={getPlatformIcon(platform)}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Content Status
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Published</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {content.filter(c => c.status === 'published').length}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(content.filter(c => c.status === 'published').length / Math.max(content.length, 1)) * 100}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Draft</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {content.filter(c => c.status === 'draft').length}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(content.filter(c => c.status === 'draft').length / Math.max(content.length, 1)) * 100}
                  sx={{ height: 8, borderRadius: 4, bgcolor: 'grey.200' }}
                  color="secondary"
                />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Scheduled</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {content.filter(c => c.status === 'scheduled').length}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(content.filter(c => c.status === 'scheduled').length / Math.max(content.length, 1)) * 100}
                  sx={{ height: 8, borderRadius: 4, bgcolor: 'grey.200' }}
                  color="info"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Content */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Recent Content
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => window.location.href = '/content'}
            >
              Add Content
            </Button>
          </Box>

          {recentContent.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No content yet. Start by adding your first piece of content!
              </Typography>
            </Box>
          ) : (
            <List>
              {recentContent.map((item, index) => (
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
                          {item.description}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                          <Chip
                            label={item.platform}
                            size="small"
                            sx={{ bgcolor: getPlatformColor(item.platform), color: 'white' }}
                          />
                          <Chip
                            label={item.status}
                            size="small"
                            variant="outlined"
                            color={item.status === 'published' ? 'success' : 'default'}
                          />
                        </Box>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Dashboard;
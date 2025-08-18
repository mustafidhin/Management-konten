import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Alert,
  Snackbar,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Paper,
} from '@mui/material';
import {
  AutoAwesome,
  ExpandMore,
  ContentPaste,
  Instagram,
  YouTube,
  Twitter,
  TrendingUp,
  Psychology,
  Speed,
  Visibility,
  ThumbUp,
  Comment,
  Share,
  CheckCircle,
  Info,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';

function AIGenerator() {
  const [content, setContent] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [platforms, setPlatforms] = useState({});
  const [generationSettings, setGenerationSettings] = useState({
    platform: 'instagram',
    style: 'engaging',
    tone: 'casual',
    keywords: '',
  });
  const [generatedCaptions, setGeneratedCaptions] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchContent();
    fetchPlatforms();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/content');
      setContent(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const fetchPlatforms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/platforms');
      setPlatforms(response.data);
    } catch (error) {
      console.error('Error fetching platforms:', error);
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleGenerateCaption = async () => {
    if (!selectedContent) {
      showSnackbar('Please select content first', 'warning');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await axios.post('http://localhost:5000/api/generate-caption', {
        contentId: selectedContent.id,
        ...generationSettings,
      });

      setGeneratedCaptions({
        ...generatedCaptions,
        [selectedContent.id]: response.data,
      });

      showSnackbar('Caption generated successfully!');
    } catch (error) {
      console.error('Error generating caption:', error);
      showSnackbar('Error generating caption', 'error');
    } finally {
      setIsGenerating(false);
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

  const AlgorithmAnalysis = ({ platform, algorithm }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: getPlatformColor(platform), mr: 2 }}>
            {getPlatformIcon(platform)}
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {platform.charAt(0).toUpperCase() + platform.slice(1)} Algorithm Analysis
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Caption Length
            </Typography>
            <Typography variant="body2">
              {algorithm.captionLength.min} - {algorithm.captionLength.max} characters
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Hashtag Count
            </Typography>
            <Typography variant="body2">
              {algorithm.hashtagCount.min} - {algorithm.hashtagCount.max} hashtags
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Engagement Keywords
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {algorithm.engagementKeywords.map((keyword, index) => (
                <Chip key={index} label={keyword} size="small" variant="outlined" />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Best Posting Times
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {algorithm.bestPostingTimes.map((time, index) => (
                <Chip key={index} label={time} size="small" color="primary" />
              ))}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        AI Caption Generator
      </Typography>

      <Grid container spacing={3}>
        {/* Content Selection */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Select Content
              </Typography>
              <List>
                {content.map((item) => (
                  <ListItem
                    key={item.id}
                    button
                    selected={selectedContent?.id === item.id}
                    onClick={() => setSelectedContent(item)}
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      '&.Mui-selected': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: selectedContent?.id === item.id ? 'white' : getPlatformColor(item.platform),
                      }}
                    >
                      {getPlatformIcon(item.platform)}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      secondary={item.platform}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Generation Settings */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Generation Settings
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Platform</InputLabel>
                    <Select
                      value={generationSettings.platform}
                      label="Platform"
                      onChange={(e) => setGenerationSettings({
                        ...generationSettings,
                        platform: e.target.value,
                      })}
                    >
                      <MenuItem value="instagram">Instagram</MenuItem>
                      <MenuItem value="youtube">YouTube</MenuItem>
                      <MenuItem value="tiktok">TikTok</MenuItem>
                      <MenuItem value="twitter">Twitter</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Style</InputLabel>
                    <Select
                      value={generationSettings.style}
                      label="Style"
                      onChange={(e) => setGenerationSettings({
                        ...generationSettings,
                        style: e.target.value,
                      })}
                    >
                      <MenuItem value="engaging">Engaging</MenuItem>
                      <MenuItem value="professional">Professional</MenuItem>
                      <MenuItem value="casual">Casual</MenuItem>
                      <MenuItem value="humorous">Humorous</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Tone</InputLabel>
                    <Select
                      value={generationSettings.tone}
                      label="Tone"
                      onChange={(e) => setGenerationSettings({
                        ...generationSettings,
                        tone: e.target.value,
                      })}
                    >
                      <MenuItem value="casual">Casual</MenuItem>
                      <MenuItem value="formal">Formal</MenuItem>
                      <MenuItem value="friendly">Friendly</MenuItem>
                      <MenuItem value="enthusiastic">Enthusiastic</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Additional Keywords"
                    value={generationSettings.keywords}
                    onChange={(e) => setGenerationSettings({
                      ...generationSettings,
                      keywords: e.target.value,
                    })}
                    placeholder="Enter keywords separated by commas"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<AutoAwesome />}
                    onClick={handleGenerateCaption}
                    disabled={!selectedContent || isGenerating}
                    fullWidth
                  >
                    {isGenerating ? 'Generating...' : 'Generate AI Caption'}
                  </Button>
                </Grid>
              </Grid>

              {isGenerating && (
                <Box sx={{ mt: 2 }}>
                  <LinearProgress />
                  <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                    Analyzing content and generating optimized caption...
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Generated Captions */}
          {selectedContent && generatedCaptions[selectedContent.id] && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Generated Captions
                </Typography>

                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      AI Generated Caption
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                        {generatedCaptions[selectedContent.id].aiCaption}
                      </Typography>
                    </Paper>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Platform Optimized Caption
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Paper sx={{ p: 2, bgcolor: 'primary.50' }}>
                      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                        {generatedCaptions[selectedContent.id].optimizedCaption}
                      </Typography>
                    </Paper>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Platform Algorithm Analysis */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Platform Algorithm Analysis
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(platforms).map(([platform, algorithm]) => (
            <Grid item xs={12} md={6} key={platform}>
              <AlgorithmAnalysis platform={platform} algorithm={algorithm} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AIGenerator;
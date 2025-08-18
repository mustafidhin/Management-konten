import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import Dashboard from './components/Dashboard';
import ContentManager from './components/ContentManager';
import AIGenerator from './components/AIGenerator';
import Analytics from './components/Analytics';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
  },
});

function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: 'background.default' }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/content" element={<ContentManager />} />
                <Route path="/ai-generator" element={<AIGenerator />} />
                <Route path="/analytics" element={<Analytics />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;

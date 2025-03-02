import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import theme from './theme';
import SideMenu from './components/SideMenu';
import SellPage from './pages/SellPage';
import BuyPage from './pages/BuyPage';

function App() {
  const [open, setOpen] = useState(window.innerWidth > 900);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          display: 'flex', 
          minHeight: '100vh',
          bgcolor: 'background.default'
        }}>
          <SideMenu open={open} toggleDrawer={toggleDrawer} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              width: { xs: '100%', sm: `calc(100% - ${240}px)` },
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pt: { xs: 8, sm: 15 },
              pb: { xs: 4, sm: 6 },
              px: { xs: 1, sm: 2, md: 3 },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/sell" />} />
              <Route path="/sell" element={<SellPage />} />
              <Route path="/buy" element={<BuyPage />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
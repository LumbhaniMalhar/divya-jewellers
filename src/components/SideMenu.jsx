// src/components/SideMenu.jsx
import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { ListItemText } from '@mui/material';

const drawerWidth = 240;

function SideMenu({ open, toggleDrawer }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    if (!isDesktop) {
      toggleDrawer();
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { md: open ? `calc(100% - ${drawerWidth}px)` : '100%' },
          ml: { md: open ? `${drawerWidth}px` : 0 },
          backgroundColor: theme.palette.background.paper,
          backdropFilter: 'blur(8px)',
          borderBottom: `1px solid ${theme.palette.divider}`,
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out'
        }}
      >
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ 
              mr: 2, 
              display: isDesktop && open ? 'none' : 'flex',
              '&:hover': {
                bgcolor: 'rgba(100, 181, 246, 0.08)'
              }
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            noWrap 
            component="div"
            sx={{
              fontWeight: 500,
              color: 'text.primary',
            }}
          >
            Divya Jewellers
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: theme.palette.background.paper,
            borderRight: `1px solid ${theme.palette.divider}`,
            transition: 'all 0.2s ease-in-out'
          },
        }}
        variant={isDesktop ? "persistent" : "temporary"}
        anchor="left"
        open={open}
        onClose={toggleDrawer}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          padding: 2, 
          justifyContent: 'space-between'
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              flexGrow: 1,
              color: 'text.primary',
              fontWeight: 500
            }}
          >
            Menu
          </Typography>
          <IconButton 
            onClick={toggleDrawer}
            sx={{
              '&:hover': {
                bgcolor: 'rgba(100, 181, 246, 0.08)'
              }
            }}
          >
            <ChevronLeftIcon color="primary" />
          </IconButton>
        </Box>
        
        <Divider />
        
        <List sx={{ pt: 1 }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleNavigation('/sell')}
              sx={{
                borderRadius: 1,
                mx: 1,
                '&:hover': {
                  bgcolor: 'rgba(100, 181, 246, 0.08)'
                }
              }}
            >
              <ListItemIcon>
                <SellIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Sell Jewellery" 
                primaryTypographyProps={{
                  color: 'text.primary',
                  fontWeight: 500
                }}
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleNavigation('/buy')}
              sx={{
                borderRadius: 1,
                mx: 1,
                '&:hover': {
                  bgcolor: 'rgba(100, 181, 246, 0.08)'
                }
              }}
            >
              <ListItemIcon>
                <ShoppingCartIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Buy Jewellery"
                primaryTypographyProps={{
                  color: 'text.primary',
                  fontWeight: 500
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default SideMenu;
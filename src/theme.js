import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#64B5F6',
      light: '#90CAF9',
      dark: '#42A5F5',
      contrastText: '#000000',
    },
    secondary: {
      main: '#4DB6AC',
      light: '#80CBC4',
      dark: '#26A69A',
      contrastText: '#000000',
    },
    background: {
      default: '#0A1929',
      paper: '#132F4C',
    },
    error: {
      main: '#EF5350',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
    },
    h5: {
      fontWeight: 500,
      letterSpacing: 0.5,
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
        margin: 'normal',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              '& fieldset': {
                borderColor: '#64B5F6',
              },
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '12px 24px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          '&:hover': {
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
  },
});

export default theme;
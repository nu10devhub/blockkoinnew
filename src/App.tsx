import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout/Layout';
import AppRoutes from './routes/AppRoutes';
import { MenuProvider } from './context/MenuContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0fae80',
      light: '#4cd0a5',
      dark: '#088f68',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f5f5f5',
      light: '#ffffff',
      dark: '#e0e0e0',
      contrastText: '#333333',
    },
    background: {
      default: '#f5f7f9',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#6b7280',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.2,
    },
    h6: {
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.2,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td, &:last-child th': {
            border: 0,
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MenuProvider>
        <Router>
          <Layout>
            <AppRoutes />
          </Layout>
        </Router>
      </MenuProvider>
    </ThemeProvider>
  );
}

export default App;
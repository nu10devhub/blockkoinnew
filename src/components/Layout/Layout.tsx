import { useState } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          transition: theme => theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: {
            xs: 0,
            sm: sidebarOpen ? '240px' : '72px'
          },
          width: {
            xs: '100%',
            sm: `calc(100% - ${sidebarOpen ? '240px' : '72px'})`
          }
        }}
      >
        <Header sidebarOpen={sidebarOpen} />
        <Box 
          sx={{ 
            flexGrow: 1, 
            p: 3, 
            overflow: 'auto',
            backgroundColor: 'background.default'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  useTheme,
  Divider,
  Typography,
  Tooltip
} from '@mui/material';
import { 
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Dashboard as DashboardIcon,
  AssessmentOutlined as ReportsIcon,
  ListAltOutlined as UnallocatedIcon,
  CheckCircleOutline as AllocatedIcon,
  AccountBalanceWalletOutlined as WithdrawIcon,
  PersonOutline as ProfilesIcon,
  AccountBalanceOutlined as BanksIcon,
  MonetizationOnOutlined as FeesIcon,
  SecurityOutlined as RightsIcon,
  SettingsOutlined as SettingsIcon,
  ArchiveOutlined as ArchiveIcon,
  ContactsOutlined as BeneficiariesIcon
} from '@mui/icons-material';
import { useMenu } from '../../context/MenuContext';
// import logo from "../Assets/Logo.png";
// import LogoCollapsed from "../Assets/LogoCollapsed.png";

const sidebarItems = [
  { name: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { name: 'Reports', icon: <ReportsIcon />, path: '/reports' },
  { name: 'Unallocated', icon: <UnallocatedIcon />, path: '/unallocated' },
  { name: 'Allocated', icon: <AllocatedIcon />, path: '/allocated' },
  { name: 'Withdraw', icon: <WithdrawIcon />, path: '/withdraw' },
  { name: 'Profiles', icon: <ProfilesIcon />, path: '/profiles' },
  { name: 'Beneficiaries', icon: <BeneficiariesIcon />, path: '/beneficiaries' },
  { name: 'Banks', icon: <BanksIcon />, path: '/banks' },
  { name: 'Fees', icon: <FeesIcon />, path: '/fees' },
  { name: 'Rights', icon: <RightsIcon />, path: '/rights' },
  { name: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  { name: 'Archive', icon: <ArchiveIcon />, path: '/archive' },
];

interface SidebarProps {
  open: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ open, toggleSidebar }: SidebarProps) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { setSelectedMenu } = useMenu();

  const drawerWidth = 240;
  const closedDrawerWidth = 72;

  const handleNavigation = (path: string, name: string) => {
    navigate(path);
    setSelectedMenu(name);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        flexShrink: 0,
        position: 'relative',
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : closedDrawerWidth,
          boxSizing: 'border-box',
          borderRight: `1px solid ${theme.palette.divider}`,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
          backgroundColor: 'background.paper',
          position: 'fixed',
          height: '100vh',
          zIndex: theme.zIndex.drawer,
        },
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: open ? 'space-between' : 'center',
          padding: theme.spacing(1, 1),
          minHeight: 64,
          position: 'relative'
        }}
      >
        {open ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
              <img 
                src={'logo'} 
                alt="Logo"
                style={{ height: 45, width: 'auto', marginRight: theme.spacing(1) }}
              />
            </Box>
            <IconButton onClick={toggleSidebar}>
              <ChevronLeftIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
              <img 
                src={'LogoCollapsed'} 
                alt="Logo" 
                style={{ height: 28, width: 'auto' }}
              />
              <IconButton onClick={toggleSidebar} sx={{ mt: 'auto' }}>
                <ChevronRightIcon />
              </IconButton>
            </Box>
          </>
        )}
      </Box>
      <Divider />
      <List>
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
              <Tooltip title={open ? "" : item.name} placement="right">
                <ListItemButton
                  onClick={() => handleNavigation(item.path, item.name)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    backgroundColor: isActive ? 'rgba(15, 174, 128, 0.08)' : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive ? 'rgba(15, 174, 128, 0.12)' : 'rgba(0, 0, 0, 0.04)',
                    },
                    borderLeft: isActive ? '4px solid' : '4px solid transparent',
                    borderLeftColor: isActive ? 'primary.main' : 'transparent',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : 'auto',
                      justifyContent: 'center',
                      color: isActive ? 'primary.main' : 'text.secondary',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && (
                    <ListItemText 
                      primary={item.name} 
                      sx={{ 
                        opacity: open ? 1 : 0,
                        color: isActive ? 'primary.main' : 'text.primary',
                        '& .MuiListItemText-primary': {
                          fontWeight: isActive ? 500 : 400,
                        }
                      }} 
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import MonetizationOn from '@mui/icons-material/MonetizationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link, useLocation } from 'react-router-dom';

const ROLES = {
  ADMIN: 'admin',
  INVESTOR: 'investor',
  BACKOFFICE: 'backoffice'
};



const menuItems = [
  { 
    text: 'Home', 
    icon: <HomeRoundedIcon />, 
    url: '/dashboard',
    roles: [ROLES.ADMIN, ROLES.BACKOFFICE] // Everyone can see home
  },
  { 
    text: 'Home', 
    icon: <HomeRoundedIcon />, 
    url: '/investor-landing',
    roles: [ROLES.INVESTOR] // Everyone can see home
  },
  { 
    text: 'Investors', 
    icon: <PeopleRoundedIcon />, 
    url: '/investors',
    roles: [ROLES.ADMIN, ROLES.BACKOFFICE] // Only admin and backoffice can see investors
  },
  { 
    text: 'Investments', 
    icon: <AssignmentRoundedIcon />, 
    url: '/investments',
    roles: [ROLES.ADMIN, ROLES.BACKOFFICE] // Only admin and investors can see investments
  },
  { 
    text: 'Manage Earnings', 
    icon: <AssignmentRoundedIcon />, 
    url: '/earnings',
    roles: [ROLES.ADMIN, ROLES.BACKOFFICE] // Only admin and backoffice can manage earnings
  },
  { 
    text: 'Price Oracle', 
    icon: <MonetizationOn />, 
    url: '/price-oracle',
    roles: [ROLES.ADMIN] // Everyone can see price oracle
  }
];

// Custom hook to get user role from token
const useUserRole = () => {
  const getUserRole = () => {
    const userDetailStr = localStorage.getItem('userDetail');
    if (!userDetailStr) return null;
    
    try {
      const userDetail = JSON.parse(userDetailStr);
      const token = userDetail.token;
      
      if (!token) return null;
      
      // Decode the JWT token
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    } catch (error) {
      console.error('Error getting user role:', error);
      return null;
    }
  };

  return getUserRole();
};

export default function MenuContent() {
  const location = useLocation();
  const userRole = useUserRole();

  // Filter menu items based on user role
  const visibleMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {visibleMenuItems.map((item, index) => (
          <Link 
            key={item.url} 
            to={item.url} 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton 
                selected={location.pathname === item.url}
                sx={{
                  margin: "5px 0px",
                  padding: "8px 10px !important",
                  backgroundColor: location.pathname === item.url 
                    ? "#dc00ff !important" 
                    : "transparent",
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Stack>
  );
}
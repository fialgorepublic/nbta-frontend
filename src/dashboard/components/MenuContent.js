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
import { Link, useLocation } from 'react-router-dom';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, url: '/dashboard' },
  { text: 'Investors', icon: <PeopleRoundedIcon />, url: '/investors' },
  { text: 'Investments', icon: <AssignmentRoundedIcon />, url: '/investments' },
  { text: 'Manage Earnings', icon: <AssignmentRoundedIcon />, url: '/earnings' }
];

export default function MenuContent() {
  const location = useLocation();
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
              <Link to={item.url} style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={location.pathname === item.url} sx={{margin:"5px 0px",padding:"8px 10px !important",  backgroundColor: location.pathname === item.url ? "#dc00ff !important" : "transparent",}}>
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

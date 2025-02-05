import {Typography, Stack, Divider, Box ,Avatar} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import darkHeaderImage from '../../Primary_Logo_White.png';
import lightHeaderImage from '../../Primary_Logo_Color.png';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../../contextStore/userContext";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {
  const theme = useTheme();
  const { userDetail } = useContext(UserContext);

  const headerImage = theme.palette.mode === 'dark' ? darkHeaderImage : lightHeaderImage;

  const full_name = (user) => {
    return user.first_name + " "+ user.last_name
  }
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Link to='/dashboard'>
      <Box
        sx={{
          display: 'flex',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: '30px 10px',
        }}
      >
        <Box
          component="img"
          src={headerImage}
          alt="Header Image"
          width={'130px'} style={{margin: 'auto'}} 
        />
      </Box>
        </Link>
      <Divider />
      <MenuContent />
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          sizes="small"
          alt="Riley Carter"
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
          {
            userDetail ? (
              <>
                <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
          { full_name(userDetail) }
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {userDetail.email}
          </Typography>
              </>
            ) : ''
          }
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}

import { alpha } from '@mui/material/styles';
import {Box, Stack } from '@mui/material';
import Header from '../dashboard/components/Header';
import SideMenu from '../dashboard/components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '../dashboard/theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props) {
  let token = localStorage.getItem('token')
  const navigate = useNavigate()
  // useEffect(() => {
  //   if (!token) {
  //     // navigate("/login");
  //     // toast.error('You need to login first')
  //   }
  // }, []);
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <div id="detail" style={{width: '100%'}}>
               <Outlet />
             </div>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}

import React, { useState, useEffect } from 'react';
import { 
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  Alert,
  AlertTitle,
  Card,
  CardContent,
  CardHeader
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const InvestorLanding = () => {
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    const userDetailStr = localStorage.getItem('userDetail');
    if (userDetailStr) {
      setUserDetail(JSON.parse(userDetailStr));
    }
  }, []);

  if (!userDetail) {
    return (
      <Box p={4}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Unable to load user details
        </Alert>
      </Box>
    );
  }

  const getKycStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'success.main';
      case 'NotStarted':
        return 'warning.main';
      case 'Pending':
        return 'info.main';
      default:
        return 'error.main';
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 'lg', mx: 'auto' }}>
      {/* Welcome Section */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {userDetail.first_name} {userDetail.last_name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Your Investment Dashboard
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              avatar={
                userDetail.profile_picture ? (
                  <Avatar src={userDetail.profile_picture} />
                ) : (
                  <AccountCircleIcon sx={{ width: 40, height: 40 }} />
                )
              }
              title="Profile Details"
              subheader={userDetail.email}
            />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2">
                  <strong>Account ID:</strong>{' '}
                  <Box component="span" sx={{ fontFamily: 'monospace' }}>
                    {userDetail._id}
                  </Box>
                </Typography>
                <Typography variant="body2">
                  <strong>KYC Status:</strong>{' '}
                  <Box
                    component="span"
                    sx={{ color: getKycStatusColor(userDetail.kyc_status) }}
                  >
                    {userDetail.kyc_status}
                  </Box>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Balance Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Account Balance" />
            <CardContent>
              <Typography variant="h3" component="div">
                ${userDetail.balance.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Available for investment
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* KYC Alerts */}
      <Box mt={3}>
        {userDetail.kyc_status === 'NotStarted' && (
          <Alert 
            severity="warning"
            icon={<WarningIcon />}
          >
            <AlertTitle>Complete Your KYC</AlertTitle>
            Please complete your KYC verification to unlock all investment features.
          </Alert>
        )}

        {userDetail.kyc_status === 'Approved' && (
          <Alert 
            severity="success"
            icon={<CheckCircleIcon />}
          >
            <AlertTitle>KYC Verified</AlertTitle>
            Your account is fully verified. You have access to all investment features.
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default InvestorLanding;
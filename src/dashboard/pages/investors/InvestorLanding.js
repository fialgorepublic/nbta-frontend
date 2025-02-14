import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Alert,
  AlertTitle,
  Card,
  CardContent,
  CardHeader,
  Skeleton
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import toast from "react-hot-toast";
import axios from "axios";
import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Paper, Chip } from '@mui/material';

const InvestorLanding = () => {
  const [userDetail, setUserDetail] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(true);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userDetail');
    localStorage.removeItem('token');
    navigate('/');
  };

  const getToken = () => {
    const userDetail = localStorage.getItem('userDetail');
    console.log('Retrieved userDetail from localStorage:', userDetail);
    if (userDetail) {
      const parsed = JSON.parse(userDetail);
      return parsed.token;
    }
    return null;
  };

  const fetchTokenBalance = async () => {
    console.log('Fetching token balance...');
    try {
      //const connection = new Connection(import.meta.env.REACT_APP_SOLANA_RPC_URL);
      const connection = new Connection('https://api.devnet.solana.com');
      //console.log('Connected to Solana at:', import.meta.env.REACT_APP_SOLANA_RPC_URL);

      const ownerPublicKey = new PublicKey('5nrmn87MudnZa2VGVoyFVbAEaU1RMZQbnjaU9XrDMqs4');
      const tokenMint = new PublicKey('9dMjXyr6CC2mZjkgabVv4cQ1upkzEGpjYywsndcU8qzA');

      console.log('Fetching token accounts for owner:', ownerPublicKey.toString());
      const tokenAccounts = await connection.getTokenAccountsByOwner(
        ownerPublicKey,
        { programId: TOKEN_PROGRAM_ID }
      );


      console.log('Token accounts received:', tokenAccounts);

      const tokenAccount = tokenAccounts.value.find(account => {
        const accountData = account.account.data;
        const mint = new PublicKey(accountData.slice(0, 32));
        return mint.toString() === tokenMint.toString();
      });

      if (tokenAccount) {
        console.log('Token account found:', tokenAccount.pubkey.toString());
        const balance = await connection.getTokenAccountBalance(tokenAccount.pubkey);
        console.log('Balance received:', balance);
        setTokenBalance(balance.value.uiAmount);
      } else {
        console.log('No token account found');
        setTokenBalance(0);
      }
    } catch (error) {
      console.error('Error fetching token balance:', error);
      toast.error("Failed to fetch token balance");
      setTokenBalance(0);
    } finally {
      setIsLoadingBalance(false);
    }
  };

  const fetchCurrentPrice = async () => {
    const token = getToken();
    console.log('Fetching current price with token:', token);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/priceOracle/current`,
        {
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setCurrentPrice(response.data.data);
    } catch (error) {
      console.error('Error fetching price:', error);
      toast.error("Failed to fetch current price");
    }
  };

  useEffect(() => {
    console.log('Component mounted');
    const userDetailStr = localStorage.getItem('userDetail');
    if (userDetailStr) {
      console.log('User details found in localStorage');
      setUserDetail(JSON.parse(userDetailStr));
      fetchCurrentPrice();
      fetchTokenBalance();
    } else {
      console.log('No user details found in localStorage');
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
    <Box sx={{ p: 4, maxWidth: 'lg', mx: 'auto', bgcolor: 'background.default' }}>


      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: 'background.paper',
          borderRadius: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{ width: 56, height: 56 }}
            src={userDetail.profile_picture}
          >
            {!userDetail.profile_picture && (
              <AccountCircleIcon sx={{ width: 40, height: 40 }} />
            )}
          </Avatar>
          <Box>
            <Typography variant="h4" gutterBottom sx={{ mb: 1 }}>
              {userDetail.first_name} {userDetail.last_name}
            </Typography>
            
          </Box>
        </Box>

        <Button
          variant="outlined"
          color="primary"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 3
          }}
        >
          Logout
        </Button>
      </Paper>
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



      {/* Welcome Section */}
      <Box mb={4}>


        {/* Token Information Cards */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* NBTA Price Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardHeader
                avatar={<MonetizationOnIcon color="primary" />}
                title="NBTA Price"
              />
              <CardContent>
                {currentPrice ? (
                  <>
                    <Typography variant="h4" sx={{ color: 'primary.main' }}>
                      ${currentPrice.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Last updated: {new Date(currentPrice.createdAt).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </Typography>
                  </>
                ) : (
                  <Skeleton variant="rectangular" height={60} />
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Token Balance Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardHeader
                avatar={<AccountBalanceWalletIcon color="primary" />}
                title="Token Balance"
              />
              <CardContent>
                {!isLoadingBalance ? (
                  <>
                    <Typography variant="h4" sx={{ color: 'primary.main' }}>
                      {tokenBalance?.toLocaleString('en-US', { maximumFractionDigits: 2 })} NBTA
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Your total token holdings
                    </Typography>
                  </>
                ) : (
                  <Skeleton variant="rectangular" height={60} />
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Total Value Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardHeader
                avatar={<MonetizationOnIcon color="primary" />}
                title="Total Value"
              />
              <CardContent>
                {currentPrice && tokenBalance ? (
                  <>
                    <Typography variant="h4" sx={{ color: 'primary.main' }}>
                      ${(currentPrice.price * tokenBalance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Total value of your tokens
                    </Typography>
                  </>
                ) : (
                  <Skeleton variant="rectangular" height={60} />
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>




    </Box>
  );
};

export default InvestorLanding;
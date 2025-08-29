import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Divider,
} from '@mui/material';
import { ArrowLeft as ArrowLeftIcon } from '@mui/icons-material';
import { RiShieldCheckFill } from 'react-icons/ri';
import TradingDialog from '../../components/Dialogs/TradingDialog';
import MoneySendDialog from '../../components/Dialogs/MoneySendDialog';
import CreateInternationalAccountDialog from '../../components/Dialogs/CreateInternationalAccountDialog';
import ViewInternationalAccountDialog from '../../components/Dialogs/ViewInternationalAccountDialog';

interface Transaction {
  id: string;
  date: string;
  type: string;
  source: string;
  reference: string;
  amount: string;
  status: 'Pending' | 'Approved' | 'Processing' | 'Rejected';
  reason: string;
}

const recentTransactions: Transaction[] = [
  {
    id: '1',
    date: '15/12/2024',
    type: 'Deposit',
    source: 'FNB',
    reference: 'Assigned Ref',
    amount: '5000.00',
    status: 'Pending',
    reason: 'XXXXX',
  },
  {
    id: '2',
    date: '14/12/2024',
    type: 'Trade',
    source: 'BK',
    reference: 'BK Ref',
    amount: '2500.00',
    status: 'Approved',
    reason: 'XXXXX',
  },
  {
    id: '3',
    date: '13/12/2024',
    type: 'Cash-Out',
    source: 'BK',
    reference: 'BK Ref',
    amount: '1200.00',
    status: 'Processing',
    reason: 'XXXXX',
  },
  {
    id: '4',
    date: '12/12/2024',
    type: 'Withdrawal',
    source: 'BK',
    reference: 'BK Ref',
    amount: '800.00',
    status: 'Rejected',
    reason: 'XXXXX',
  },
  {
    id: '5',
    date: '11/12/2024',
    type: 'Cash-Out',
    source: 'BK',
    reference: 'BK Ref',
    amount: '3000.00',
    status: 'Processing',
    reason: 'XXXXX',
  },
];

const ClientProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useParams();
  
  // Get client data from location state or use default
  const client = location.state?.client || {
    clientId: username,
    otherName: 'John Michael',
    surname: 'Smith',
    dob: '15/03/1990',
    idPassport: 'ID123456789',
    mobile: '+27123456789',
  };

  const [profileData, setProfileData] = useState({
    // Individual fields
    firstName: client.otherName || 'Text Field',
    lastName: client.surname || 'Text Field',
    dateOfBirth: client.dob || 'Text Field',
    depositReferenceCode: 'XXXXXXXXX',
    emailId: 'Text Field',
    mobile: client.mobile || 'XXXXXXXXXX',
    passportNumber: client.idPassport || 'Text Field',
    idNumber: 'Text Field',
    addressLine1: 'Address Line 1',
    addressLine2: 'Address Line 2',
    city: 'City',
    postCode: 'Post code',
    state: 'State',
    country: 'Country',
    
    // Business fields
    companyName: 'Text Field',
    position: 'XXXXXXXXX',
    registrationNumber: 'Text Field',
    employmentStatus: 'XXXXXXXXX',
    sameAsOwnerAddress: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tradingDialogOpen, setTradingDialogOpen] = useState(false);
  const [moneySendDialogOpen, setMoneySendDialogOpen] = useState(false);
  const [createAccountDialogOpen, setCreateAccountDialogOpen] = useState(false);
  const [viewAccountDialogOpen, setViewAccountDialogOpen] = useState(false);
  const [hasInternationalAccount, setHasInternationalAccount] = useState(false);
  const [internationalAccountData, setInternationalAccountData] = useState(null);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleViewAll = () => {
    navigate(`/profiles/${username}/transactionhistory`);
  };

  const handleTrade = () => {
    setTradingDialogOpen(true);
  };

  const handleMoneySend = () => {
    setMoneySendDialogOpen(true);
  };

  const handleCreateInternationalAccount = () => {
    setCreateAccountDialogOpen(true);
  };

  const handleViewInternationalAccount = () => {
    setViewAccountDialogOpen(true);
  };

  const checkInternationalAccountStatus = async () => {
    // Replace with actual API call
    // const response = await fetch(`/api/clients/${client.clientId}/international-account`);
    // const data = await response.json();
    
    // Mock API response - set to true to test active state
    const mockAccountExists = Math.random() > 0.5; // Random for demo
    setHasInternationalAccount(mockAccountExists);
    
    if (mockAccountExists) {
      setInternationalAccountData({
        bankName: 'Standard Chartered International',
        accountNumber: 'INT123456789',
        iban: 'GB29NWBK60161331926819',
        swift: 'SCBLGB2L',
        currency: 'GBP',
        status: 'Active',
        createdAt: '2024-01-15',
      });
    }
  };

  const handleCreateAccountSubmit = async (accountData: any) => {
    // Replace with actual API call
    // const response = await fetch(`/api/clients/${client.clientId}/international-account`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ ...accountData, clientData: client }),
    // });
    
    console.log('Creating international account:', { ...accountData, clientData: client });
    
    // Mock success - update state
    setHasInternationalAccount(true);
    setInternationalAccountData({
      bankName: 'Standard Chartered International',
      accountNumber: 'INT' + Math.floor(Math.random() * 1000000000),
      iban: 'GB29NWBK60161331926819',
      swift: 'SCBLGB2L',
      currency: accountData.currency,
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0],
    });
    
    setCreateAccountDialogOpen(false);
  };

  // Check account status on component mount
  React.useEffect(() => {
    checkInternationalAccountStatus();
  }, []);

  const handleTradeSubmit = (tradeData: any) => {
    console.log('Trade submitted:', tradeData);
    // Implement trade submission logic
  };

  const handleMoneySendSubmit = (moneySendData: any) => {
    console.log('Money Send submitted:', moneySendData);
    // Implement money send submission logic
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return { backgroundColor: '#E8F5E8', color: '#2E7D32' };
      case 'Pending':
        return { backgroundColor: '#E3F2FD', color: '#1976D2' };
      case 'Processing':
        return { backgroundColor: '#FFF3E0', color: '#F57C00' };
      case 'Rejected':
        return { backgroundColor: '#FFEBEE', color: '#D32F2F' };
      default:
        return { backgroundColor: '#F5F5F5', color: '#757575' };
    }
  };

  const renderIndividualProfile = () => (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            Client Profile
          </Typography>
          <Chip
            label="Individual"
            size="small"
            sx={{
              backgroundColor: 'primary.light',
              color: 'primary.dark',
              fontWeight: 500,
            }}
          />
          <Chip
            label="KYC Verified"
            size="small"
            sx={{
              backgroundColor: 'success.light',
              color: 'success.dark',
              fontWeight: 500,
            }}
          />
          <Chip
            label="Admin"
            size="small"
            sx={{
              backgroundColor: 'warning.light',
              color: 'warning.dark',
              fontWeight: 500,
            }}
          />
        </Box>
        <Button
          variant="outlined"
          onClick={handleEdit}
          sx={{
            borderColor: 'primary.main',
            color: 'primary.main',
            textTransform: 'none',
            fontWeight: 500,
            px: 3,
            '&:hover': {
              borderColor: 'primary.dark',
              backgroundColor: 'primary.light',
            },
          }}
        >
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Row 1 */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            First Name
          </Typography>
          <TextField
            fullWidth
            value={profileData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            disabled={!isEditing}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: isEditing ? 'white' : 'grey.100',
                '& fieldset': { border: 'none' },
                '&:hover fieldset': { border: 'none' },
                '&.Mui-focused fieldset': {
                  border: '2px solid',
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Last Name
          </Typography>
          <TextField
            fullWidth
            value={profileData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            disabled={!isEditing}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: isEditing ? 'white' : 'grey.100',
                '& fieldset': { border: 'none' },
                '&:hover fieldset': { border: 'none' },
                '&.Mui-focused fieldset': {
                  border: '2px solid',
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Date of Birth
          </Typography>
          <TextField
            fullWidth
            value={profileData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            disabled={!isEditing}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: isEditing ? 'white' : 'grey.100',
                '& fieldset': { border: 'none' },
                '&:hover fieldset': { border: 'none' },
                '&.Mui-focused fieldset': {
                  border: '2px solid',
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Deposit Reference Code
          </Typography>
          <TextField
            fullWidth
            value={profileData.depositReferenceCode}
            onChange={(e) => handleInputChange('depositReferenceCode', e.target.value)}
            disabled={!isEditing}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: isEditing ? 'white' : 'grey.100',
                '& fieldset': { border: 'none' },
                '&:hover fieldset': { border: 'none' },
                '&.Mui-focused fieldset': {
                  border: '2px solid',
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </Grid>

        {/* Row 2 */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Email ID
          </Typography>
          <TextField
            fullWidth
            value={profileData.emailId}
            onChange={(e) => handleInputChange('emailId', e.target.value)}
            disabled={!isEditing}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: isEditing ? 'white' : 'grey.100',
                '& fieldset': { border: 'none' },
                '&:hover fieldset': { border: 'none' },
                '&.Mui-focused fieldset': {
                  border: '2px solid',
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Mobile
          </Typography>
          <TextField
            fullWidth
            value={profileData.mobile}
            onChange={(e) => handleInputChange('mobile', e.target.value)}
            disabled={!isEditing}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: isEditing ? 'white' : 'grey.100',
                '& fieldset': { border: 'none' },
                '&:hover fieldset': { border: 'none' },
                '&.Mui-focused fieldset': {
                  border: '2px solid',
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Passport Number
          </Typography>
          <TextField
            fullWidth
            value={profileData.passportNumber}
            onChange={(e) => handleInputChange('passportNumber', e.target.value)}
            disabled={!isEditing}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: isEditing ? 'white' : 'grey.100',
                '& fieldset': { border: 'none' },
                '&:hover fieldset': { border: 'none' },
                '&.Mui-focused fieldset': {
                  border: '2px solid',
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            ID Number
          </Typography>
          <TextField
            fullWidth
            value={profileData.idNumber}
            onChange={(e) => handleInputChange('idNumber', e.target.value)}
            disabled={!isEditing}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: isEditing ? 'white' : 'grey.100',
                '& fieldset': { border: 'none' },
                '&:hover fieldset': { border: 'none' },
                '&.Mui-focused fieldset': {
                  border: '2px solid',
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </Grid>

        {/* Address Section */}
        <Grid item xs={12}>
          <Typography variant="body2" sx={{ mb: 2, fontWeight: 500 }}>
            Address
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                placeholder="Address Line 1"
                value={profileData.addressLine1}
                onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                disabled={!isEditing}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isEditing ? 'white' : 'grey.100',
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': {
                      border: '2px solid',
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                placeholder="Address Line 2"
                value={profileData.addressLine2}
                onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                disabled={!isEditing}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isEditing ? 'white' : 'grey.100',
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': {
                      border: '2px solid',
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small" disabled={!isEditing}>
                <Select
                  value={profileData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  displayEmpty
                  sx={{
                    backgroundColor: isEditing ? 'white' : 'grey.100',
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: '2px solid',
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <MenuItem value="City">City</MenuItem>
                  <MenuItem value="Cape Town">Cape Town</MenuItem>
                  <MenuItem value="Johannesburg">Johannesburg</MenuItem>
                  <MenuItem value="Durban">Durban</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                placeholder="Post code"
                value={profileData.postCode}
                onChange={(e) => handleInputChange('postCode', e.target.value)}
                disabled={!isEditing}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isEditing ? 'white' : 'grey.100',
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': {
                      border: '2px solid',
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small" disabled={!isEditing}>
                <Select
                  value={profileData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  displayEmpty
                  sx={{
                    backgroundColor: isEditing ? 'white' : 'grey.100',
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: '2px solid',
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <MenuItem value="State">State</MenuItem>
                  <MenuItem value="Western Cape">Western Cape</MenuItem>
                  <MenuItem value="Gauteng">Gauteng</MenuItem>
                  <MenuItem value="KwaZulu-Natal">KwaZulu-Natal</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small" disabled={!isEditing}>
                <Select
                  value={profileData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  displayEmpty
                  sx={{
                    backgroundColor: isEditing ? 'white' : 'grey.100',
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: '2px solid',
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <MenuItem value="Country">Country</MenuItem>
                  <MenuItem value="South Africa">South Africa</MenuItem>
                  <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                  <MenuItem value="United States">United States</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );

  const renderBusinessProfile = () => (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            Owner Profile
          </Typography>
          <Chip
            label="Business"
            size="small"
            sx={{
              backgroundColor: 'secondary.light',
              color: 'secondary.dark',
              fontWeight: 500,
            }}
          />
          <Chip
            label="KYC Verified"
            size="small"
            sx={{
              backgroundColor: 'success.light',
              color: 'success.dark',
              fontWeight: 500,
            }}
          />
          <Chip
            label="Admin"
            size="small"
            sx={{
              backgroundColor: 'warning.light',
              color: 'warning.dark',
              fontWeight: 500,
            }}
          />
        </Box>
        <Button
          variant="outlined"
          onClick={handleEdit}
          sx={{
            borderColor: 'primary.main',
            color: 'primary.main',
            textTransform: 'none',
            fontWeight: 500,
            px: 3,
            '&:hover': {
              borderColor: 'primary.dark',
              backgroundColor: 'primary.light',
            },
          }}
        >
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Owner Details - Left Column */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                First Name
              </Typography>
              <TextField
                fullWidth
                value={profileData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                disabled={!isEditing}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isEditing ? 'white' : 'grey.100',
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': {
                      border: '2px solid',
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Last Name
              </Typography>
              <TextField
                fullWidth
                value={profileData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                disabled={!isEditing}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isEditing ? 'white' : 'grey.100',
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': {
                      border: '2px solid',
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Email ID
              </Typography>
              <TextField
                fullWidth
                value={profileData.emailId}
                onChange={(e) => handleInputChange('emailId', e.target.value)}
                disabled={!isEditing}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isEditing ? 'white' : 'grey.100',
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': {
                      border: '2px solid',
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Mobile
              </Typography>
              <TextField
                fullWidth
                value={profileData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                disabled={!isEditing}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isEditing ? 'white' : 'grey.100',
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': {
                      border: '2px solid',
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Date of Birth
              </Typography>
              <TextField
                fullWidth
                value={profileData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                disabled={!isEditing}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isEditing ? 'white' : 'grey.100',
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': {
                      border: '2px solid',
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Deposit Reference Code
              </Typography>
              <TextField
                fullWidth
                value={profileData.depositReferenceCode}
                onChange={(e) => handleInputChange('depositReferenceCode', e.target.value)}
                disabled={!isEditing}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isEditing ? 'white' : 'grey.100',
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': {
                      border: '2px solid',
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                ID Number
              </Typography>
              <TextField
                fullWidth
                value={profileData.idNumber}
                onChange={(e) => handleInputChange('idNumber', e.target.value)}
                disabled={!isEditing}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isEditing ? 'white' : 'grey.100',
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': {
                      border: '2px solid',
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Passport Number
              </Typography>
              <TextField
                fullWidth
                value={profileData.passportNumber}
                onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                disabled={!isEditing}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isEditing ? 'white' : 'grey.100',
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': {
                      border: '2px solid',
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>

            {/* Owner Address */}
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 2, fontWeight: 500 }}>
                Address
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    placeholder="Address Line 1"
                    value={profileData.addressLine1}
                    onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                    disabled={!isEditing}
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: isEditing ? 'white' : 'grey.100',
                        '& fieldset': { border: 'none' },
                        '&:hover fieldset': { border: 'none' },
                        '&.Mui-focused fieldset': {
                          border: '2px solid',
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    placeholder="Address Line 2"
                    value={profileData.addressLine2}
                    onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                    disabled={!isEditing}
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: isEditing ? 'white' : 'grey.100',
                        '& fieldset': { border: 'none' },
                        '&:hover fieldset': { border: 'none' },
                        '&.Mui-focused fieldset': {
                          border: '2px solid',
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="small" disabled={!isEditing}>
                    <Select
                      value={profileData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      displayEmpty
                      sx={{
                        backgroundColor: isEditing ? 'white' : 'grey.100',
                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          border: '2px solid',
                          borderColor: 'primary.main',
                        },
                      }}
                    >
                      <MenuItem value="City">City</MenuItem>
                      <MenuItem value="Cape Town">Cape Town</MenuItem>
                      <MenuItem value="Johannesburg">Johannesburg</MenuItem>
                      <MenuItem value="Durban">Durban</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    placeholder="Post code"
                    value={profileData.postCode}
                    onChange={(e) => handleInputChange('postCode', e.target.value)}
                    disabled={!isEditing}
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: isEditing ? 'white' : 'grey.100',
                        '& fieldset': { border: 'none' },
                        '&:hover fieldset': { border: 'none' },
                        '&.Mui-focused fieldset': {
                          border: '2px solid',
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="small" disabled={!isEditing}>
                    <Select
                      value={profileData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      displayEmpty
                      sx={{
                        backgroundColor: isEditing ? 'white' : 'grey.100',
                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          border: '2px solid',
                          borderColor: 'primary.main',
                        },
                      }}
                    >
                      <MenuItem value="State">State</MenuItem>
                      <MenuItem value="Western Cape">Western Cape</MenuItem>
                      <MenuItem value="Gauteng">Gauteng</MenuItem>
                      <MenuItem value="KwaZulu-Natal">KwaZulu-Natal</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="small" disabled={!isEditing}>
                    <Select
                      value={profileData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      displayEmpty
                      sx={{
                        backgroundColor: isEditing ? 'white' : 'grey.100',
                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          border: '2px solid',
                          borderColor: 'primary.main',
                        },
                      }}
                    >
                      <MenuItem value="Country">Country</MenuItem>
                      <MenuItem value="South Africa">South Africa</MenuItem>
                      <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                      <MenuItem value="United States">United States</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Company Details - Right Column */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
            Company Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Company Name
              </Typography>
              <TextField
                fullWidth
                value={profileData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                disabled={!isEditing}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isEditing ? 'white' : 'grey.100',
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': {
                      border: '2px solid',
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Position
              </Typography>
              <TextField
                fullWidth
                value={profileData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                disabled={!isEditing}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isEditing ? 'white' : 'grey.100',
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': {
                      border: '2px solid',
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Registration Number
              </Typography>
              <TextField
                fullWidth
                value={profileData.registrationNumber}
                onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                disabled={!isEditing}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isEditing ? 'white' : 'grey.100',
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': {
                      border: '2px solid',
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Employment Status
              </Typography>
              <TextField
                fullWidth
                value={profileData.employmentStatus}
                onChange={(e) => handleInputChange('employmentStatus', e.target.value)}
                disabled={!isEditing}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isEditing ? 'white' : 'grey.100',
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': {
                      border: '2px solid',
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>

            {/* Company Address */}
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Address
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={profileData.sameAsOwnerAddress}
                    onChange={(e) => handleInputChange('sameAsOwnerAddress', e.target.checked)}
                    disabled={!isEditing}
                    size="small"
                  />
                }
                label="Same as owner address"
                sx={{ mb: 2 }}
              />
              
              {!profileData.sameAsOwnerAddress && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      placeholder="Address Line 1"
                      value={profileData.addressLine1}
                      onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                      disabled={!isEditing}
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: isEditing ? 'white' : 'grey.100',
                          '& fieldset': { border: 'none' },
                          '&:hover fieldset': { border: 'none' },
                          '&.Mui-focused fieldset': {
                            border: '2px solid',
                            borderColor: 'primary.main',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      placeholder="Address Line 2"
                      value={profileData.addressLine2}
                      onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                      disabled={!isEditing}
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: isEditing ? 'white' : 'grey.100',
                          '& fieldset': { border: 'none' },
                          '&:hover fieldset': { border: 'none' },
                          '&.Mui-focused fieldset': {
                            border: '2px solid',
                            borderColor: 'primary.main',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small" disabled={!isEditing}>
                      <Select
                        value={profileData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        displayEmpty
                        sx={{
                          backgroundColor: isEditing ? 'white' : 'grey.100',
                          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                          '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: '2px solid',
                            borderColor: 'primary.main',
                          },
                        }}
                      >
                        <MenuItem value="City">City</MenuItem>
                        <MenuItem value="Cape Town">Cape Town</MenuItem>
                        <MenuItem value="Johannesburg">Johannesburg</MenuItem>
                        <MenuItem value="Durban">Durban</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      placeholder="Post code"
                      value={profileData.postCode}
                      onChange={(e) => handleInputChange('postCode', e.target.value)}
                      disabled={!isEditing}
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: isEditing ? 'white' : 'grey.100',
                          '& fieldset': { border: 'none' },
                          '&:hover fieldset': { border: 'none' },
                          '&.Mui-focused fieldset': {
                            border: '2px solid',
                            borderColor: 'primary.main',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small" disabled={!isEditing}>
                      <Select
                        value={profileData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        displayEmpty
                        sx={{
                          backgroundColor: isEditing ? 'white' : 'grey.100',
                          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                          '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: '2px solid',
                            borderColor: 'primary.main',
                          },
                        }}
                      >
                        <MenuItem value="State">State</MenuItem>
                        <MenuItem value="Western Cape">Western Cape</MenuItem>
                        <MenuItem value="Gauteng">Gauteng</MenuItem>
                        <MenuItem value="KwaZulu-Natal">KwaZulu-Natal</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small" disabled={!isEditing}>
                      <Select
                        value={profileData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        displayEmpty
                        sx={{
                          backgroundColor: isEditing ? 'white' : 'grey.100',
                          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                          '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: '2px solid',
                            borderColor: 'primary.main',
                          },
                        }}
                      >
                        <MenuItem value="Country">Country</MenuItem>
                        <MenuItem value="South Africa">South Africa</MenuItem>
                        <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                        <MenuItem value="United States">United States</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowLeftIcon />}
          onClick={() => navigate('/profiles')}
          sx={{
            color: 'text.primary',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: 'transparent',
              color: 'primary.main',
            }
          }}
        >
          Back to Profiles
        </Button>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={handleTrade}
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              textTransform: 'none',
              fontWeight: 500,
              px: 3,
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Trade
          </Button>
          <Button
            variant="outlined"
            onClick={handleMoneySend}
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              textTransform: 'none',
              fontWeight: 500,
              px: 3,
              '&:hover': {
                borderColor: 'primary.dark',
                backgroundColor: 'primary.light',
              },
            }}
          >
            Money Send
          </Button>
          {hasInternationalAccount ? (
            <Button
              variant="contained"
              onClick={handleViewInternationalAccount}
              startIcon={<RiShieldCheckFill />}
              sx={{
                backgroundColor: 'success.main',
                color: 'white',
                textTransform: 'none',
                fontWeight: 500,
                px: 3,
                '&:hover': {
                  backgroundColor: 'success.dark',
                },
              }}
            >
              International Account Active
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={handleCreateInternationalAccount}
              sx={{
                borderColor: 'secondary.main',
                color: 'secondary.main',
                textTransform: 'none',
                fontWeight: 500,
                px: 3,
                '&:hover': {
                  borderColor: 'secondary.dark',
                  backgroundColor: 'secondary.light',
                },
              }}
            >
              Create International Bank Account
            </Button>
          )}
        </Box>
      </Box>

      {/* Client Profile Form */}
      {client.accountType === 'business' ? renderBusinessProfile() : renderIndividualProfile()}

      {/* Transaction History Section */}
      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ p: 3, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: 'primary.main',
            }}
          >
            Transaction History
          </Typography>
          <Button
            variant="text"
            onClick={handleViewAll}
            sx={{
              color: 'primary.main',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'primary.light',
              },
            }}
          >
            View All
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Source</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Reference</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Reason</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id} hover>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.source}</TableCell>
                  <TableCell>{transaction.reference}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>
                    <Chip
                      label={transaction.status}
                      size="small"
                      sx={{
                        ...getStatusColor(transaction.status),
                        fontWeight: 500,
                        borderRadius: 1,
                      }}
                    />
                  </TableCell>
                  <TableCell>{transaction.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Trading Dialog */}
      <TradingDialog
        open={tradingDialogOpen}
        onClose={() => setTradingDialogOpen(false)}
        client={client}
        onSubmit={handleTradeSubmit}
      />

      {/* Money Send Dialog */}
      <MoneySendDialog
        open={moneySendDialogOpen}
        onClose={() => setMoneySendDialogOpen(false)}
        client={client}
        onSubmit={handleMoneySendSubmit}
      />

      {/* Create International Account Dialog */}
      <CreateInternationalAccountDialog
        open={createAccountDialogOpen}
        onClose={() => setCreateAccountDialogOpen(false)}
        client={client}
        onSubmit={handleCreateAccountSubmit}
      />

      {/* View International Account Dialog */}
      <ViewInternationalAccountDialog
        open={viewAccountDialogOpen}
        onClose={() => setViewAccountDialogOpen(false)}
        accountData={internationalAccountData}
      />
    </Box>
  );
};

export default ClientProfile;
import { useState } from 'react';
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
} from '@mui/material';
import { ArrowLeft as ArrowLeftIcon } from '@mui/icons-material';

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
    name: client.otherName || 'Text Field',
    otherNames: 'Text Field',
    mobile: client.mobile || 'XXXXXXXXXX',
    profileStatus: 'Text Field',
    activeSince: 'Text Field',
    agent: 'XXXXXXXXXX',
    idType: 'Text Field',
    addressType: 'Text Field',
    employmentStatus: 'XXXXXXXXXX',
    street: 'Street',
    suburb: 'Suburb',
    city: 'City',
    postCode: 'Post code',
    province: 'Province',
    country: 'Country',
    userRole: 'Text Field',
  });

  const [isEditing, setIsEditing] = useState(false);

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

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
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
      </Box>

      {/* Client Profile Form */}
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
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: 'primary.main',
            }}
          >
            Client Profile
          </Typography>
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
              Name
            </Typography>
            <TextField
              fullWidth
              value={profileData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
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
              Other Names
            </Typography>
            <TextField
              fullWidth
              value={profileData.otherNames}
              onChange={(e) => handleInputChange('otherNames', e.target.value)}
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

          {/* Row 2 */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Profile Status
            </Typography>
            <TextField
              fullWidth
              value={profileData.profileStatus}
              onChange={(e) => handleInputChange('profileStatus', e.target.value)}
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
              Active Since
            </Typography>
            <TextField
              fullWidth
              value={profileData.activeSince}
              onChange={(e) => handleInputChange('activeSince', e.target.value)}
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
              Agent
            </Typography>
            <TextField
              fullWidth
              value={profileData.agent}
              onChange={(e) => handleInputChange('agent', e.target.value)}
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

          {/* Row 3 */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              ID Type
            </Typography>
            <TextField
              fullWidth
              value={profileData.idType}
              onChange={(e) => handleInputChange('idType', e.target.value)}
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
              Address Type
            </Typography>
            <TextField
              fullWidth
              value={profileData.addressType}
              onChange={(e) => handleInputChange('addressType', e.target.value)}
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

          {/* Address Row */}
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ mb: 2, fontWeight: 500 }}>
              Address
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  fullWidth
                  placeholder="Street"
                  value={profileData.street}
                  onChange={(e) => handleInputChange('street', e.target.value)}
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
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  fullWidth
                  placeholder="Suburb"
                  value={profileData.suburb}
                  onChange={(e) => handleInputChange('suburb', e.target.value)}
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
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  fullWidth
                  placeholder="City"
                  value={profileData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
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
              <Grid item xs={12} sm={6} md={2}>
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
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  fullWidth
                  placeholder="Province"
                  value={profileData.province}
                  onChange={(e) => handleInputChange('province', e.target.value)}
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
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  fullWidth
                  placeholder="Country"
                  value={profileData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
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
            </Grid>
          </Grid>

          {/* User Role */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              User Role
            </Typography>
            <TextField
              fullWidth
              value={profileData.userRole}
              onChange={(e) => handleInputChange('userRole', e.target.value)}
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
        </Grid>
      </Paper>

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
    </Box>
  );
};

export default ClientProfile;
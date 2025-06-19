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

interface ClientData {
  id: string;
  clientId: string;
  otherName: string;
  surname: string;
  dob: string;
  idPassport: string;
  mobile: string;
  name: string;
  profileStatus: string;
  activeSince: string;
  agent: string;
  idType: string;
  addressType: string;
  employmentStatus: string;
  address: {
    street: string;
    suburb: string;
    city: string;
    postCode: string;
    province: string;
    country: string;
  };
  userRole: string;
}

const mockTransactions: Transaction[] = [
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
  const [isEditing, setIsEditing] = useState(false);

  // Get client data from navigation state or use default
  const initialClientData: ClientData = location.state?.client ? {
    ...location.state.client,
    name: location.state.client.otherName,
    profileStatus: 'Active',
    activeSince: '01/01/2020',
    agent: 'Agent001',
    idType: 'National ID',
    addressType: 'Residential',
    employmentStatus: 'Employed',
    address: {
      street: '123 Main Street',
      suburb: 'Suburb Name',
      city: 'City Name',
      postCode: '12345',
      province: 'Province Name',
      country: 'South Africa',
    },
    userRole: 'Standard User',
  } : {
    id: '1',
    clientId: username || 'CL001',
    name: 'John Michael',
    otherName: 'John Michael',
    surname: 'Smith',
    dob: '15/03/1990',
    idPassport: 'ID123456789',
    mobile: '+27123456789',
    profileStatus: 'Active',
    activeSince: '01/01/2020',
    agent: 'Agent001',
    idType: 'National ID',
    addressType: 'Residential',
    employmentStatus: 'Employed',
    address: {
      street: '123 Main Street',
      suburb: 'Suburb Name',
      city: 'City Name',
      postCode: '12345',
      province: 'Province Name',
      country: 'South Africa',
    },
    userRole: 'Standard User',
  };

  const [clientData, setClientData] = useState<ClientData>(initialClientData);

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('address.')) {
      const addressField = field.split('.')[1];
      setClientData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setClientData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Saving client data:', clientData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setClientData(initialClientData);
  };

  const handleViewAll = () => {
    navigate(`/profiles/${username}/transactionhistory`, {
      state: { client: clientData }
    });
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

      {/* Client Profile Section */}
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
          {!isEditing ? (
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
              Edit
            </Button>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{
                  borderColor: 'grey.400',
                  color: 'grey.600',
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                sx={{
                  backgroundColor: 'primary.main',
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                Save
              </Button>
            </Box>
          )}
        </Box>

        <Grid container spacing={3}>
          {/* Row 1 */}
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Name
            </Typography>
            <TextField
              fullWidth
              value={clientData.name}
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

          <Grid item xs={12} sm={4}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Other Names
            </Typography>
            <TextField
              fullWidth
              value={clientData.otherName}
              onChange={(e) => handleInputChange('otherName', e.target.value)}
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
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Mobile
            </Typography>
            <TextField
              fullWidth
              value={clientData.mobile}
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
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Profile Status
            </Typography>
            <TextField
              fullWidth
              value={clientData.profileStatus}
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

          <Grid item xs={12} sm={4}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Active Since
            </Typography>
            <TextField
              fullWidth
              value={clientData.activeSince}
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

          <Grid item xs={12} sm={4}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Agent
            </Typography>
            <TextField
              fullWidth
              value={clientData.agent}
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
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              ID Type
            </Typography>
            <TextField
              fullWidth
              value={clientData.idType}
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

          <Grid item xs={12} sm={4}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Address Type
            </Typography>
            <TextField
              fullWidth
              value={clientData.addressType}
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

          <Grid item xs={12} sm={4}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Employment Status
            </Typography>
            <TextField
              fullWidth
              value={clientData.employmentStatus}
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
              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  placeholder="Street"
                  value={clientData.address.street}
                  onChange={(e) => handleInputChange('address.street', e.target.value)}
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
              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  placeholder="Suburb"
                  value={clientData.address.suburb}
                  onChange={(e) => handleInputChange('address.suburb', e.target.value)}
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
              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  placeholder="City"
                  value={clientData.address.city}
                  onChange={(e) => handleInputChange('address.city', e.target.value)}
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
              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  placeholder="Post code"
                  value={clientData.address.postCode}
                  onChange={(e) => handleInputChange('address.postCode', e.target.value)}
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
              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  placeholder="Province"
                  value={clientData.address.province}
                  onChange={(e) => handleInputChange('address.province', e.target.value)}
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
              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  placeholder="Country"
                  value={clientData.address.country}
                  onChange={(e) => handleInputChange('address.country', e.target.value)}
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
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              User Role
            </Typography>
            <TextField
              fullWidth
              value={clientData.userRole}
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3, pb: 2 }}>
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
              {mockTransactions.slice(0, 5).map((transaction) => (
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
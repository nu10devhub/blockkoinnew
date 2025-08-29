import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
} from '@mui/material';
import { User as UserIcon, Edit as EditIcon, Save as SaveIcon } from 'lucide-react';

interface Client {
  clientId: string;
  otherName: string;
  surname: string;
  dob: string;
  idPassport: string;
  mobile: string;
  accountType?: string;
}

interface IndividualProfileProps {
  client: Client;
  onUpdate?: (updatedData: any) => void;
}

const IndividualProfile = ({ client, onUpdate }: IndividualProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: client.otherName || '',
    lastName: client.surname || '',
    dateOfBirth: client.dob || '',
    depositReferenceCode: 'XXXXXXXXXX',
    emailId: '',
    mobile: client.mobile || '',
    passportNumber: '',
    idNumber: client.idPassport || '',
    addressLine1: '',
    addressLine2: '',
    postCode: '',
    city: '',
    state: '',
    country: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(profileData);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original data
    setProfileData({
      firstName: client.otherName || '',
      lastName: client.surname || '',
      dateOfBirth: client.dob || '',
      depositReferenceCode: 'XXXXXXXXXX',
      emailId: '',
      mobile: client.mobile || '',
      passportNumber: '',
      idNumber: client.idPassport || '',
      addressLine1: '',
      addressLine2: '',
      postCode: '',
      city: '',
      state: '',
      country: '',
    });
    setIsEditing(false);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        overflow: 'hidden',
        backgroundColor: 'background.paper',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          pb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'grey.50',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              backgroundColor: 'primary.main',
              color: 'white',
            }}
          >
            <UserIcon size={24} />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              Client Profile
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
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
          </Box>
        </Box>
        
        <Button
          variant={isEditing ? "outlined" : "contained"}
          startIcon={isEditing ? <SaveIcon size={16} /> : <EditIcon size={16} />}
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          sx={{
            backgroundColor: isEditing ? 'transparent' : 'primary.main',
            color: isEditing ? 'primary.main' : 'white',
            borderColor: isEditing ? 'primary.main' : 'transparent',
            textTransform: 'none',
            fontWeight: 500,
            px: 3,
            py: 1,
            borderRadius: 2,
            '&:hover': {
              backgroundColor: isEditing ? 'primary.light' : 'primary.dark',
            },
          }}
        >
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </Box>

      {/* Form Content */}
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* First Row */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              First Name
            </Typography>
            <TextField
              fullWidth
              placeholder="Text Field"
              size="small"
              value={profileData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              disabled={!isEditing}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: isEditing ? 'white' : 'grey.100',
                  borderRadius: 1,
                  height: 40,
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
              placeholder="Text Field"
              size="small"
              value={profileData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              disabled={!isEditing}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: isEditing ? 'white' : 'grey.100',
                  borderRadius: 1,
                  height: 40,
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
              placeholder="Text Field"
              size="small"
              value={profileData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              disabled={!isEditing}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: isEditing ? 'white' : 'grey.100',
                  borderRadius: 1,
                  height: 40,
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
              placeholder="XXXXXXXXXX"
              size="small"
              value={profileData.depositReferenceCode}
              onChange={(e) => handleInputChange('depositReferenceCode', e.target.value)}
              disabled={!isEditing}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: isEditing ? 'white' : 'grey.100',
                  borderRadius: 1,
                  height: 40,
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

          {/* Second Row */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Email ID
            </Typography>
            <TextField
              fullWidth
              placeholder="Text Field"
              size="small"
              value={profileData.emailId}
              onChange={(e) => handleInputChange('emailId', e.target.value)}
              disabled={!isEditing}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: isEditing ? 'white' : 'grey.100',
                  borderRadius: 1,
                  height: 40,
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
              placeholder="XXXXXXXXXX"
              size="small"
              value={profileData.mobile}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              disabled={!isEditing}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: isEditing ? 'white' : 'grey.100',
                  borderRadius: 1,
                  height: 40,
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
              placeholder="Text Field"
              size="small"
              value={profileData.passportNumber}
              onChange={(e) => handleInputChange('passportNumber', e.target.value)}
              disabled={!isEditing}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: isEditing ? 'white' : 'grey.100',
                  borderRadius: 1,
                  height: 40,
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
              placeholder="Text Field"
              size="small"
              value={profileData.idNumber}
              onChange={(e) => handleInputChange('idNumber', e.target.value)}
              disabled={!isEditing}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: isEditing ? 'white' : 'grey.100',
                  borderRadius: 1,
                  height: 40,
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
                  size="small"
                  value={profileData.addressLine1}
                  onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                  disabled={!isEditing}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: isEditing ? 'white' : 'grey.100',
                      borderRadius: 1,
                      height: 40,
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
                  size="small"
                  value={profileData.addressLine2}
                  onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                  disabled={!isEditing}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: isEditing ? 'white' : 'grey.100',
                      borderRadius: 1,
                      height: 40,
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
                <FormControl fullWidth disabled={!isEditing}>
                  <Select
                    value={profileData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    displayEmpty
                    size="small"
                    sx={{
                      backgroundColor: isEditing ? 'white' : 'grey.100',
                      borderRadius: 1,
                      height: 40,
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: '2px solid',
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    <MenuItem value="">
                      <Typography sx={{ color: 'text.secondary' }}>City</Typography>
                    </MenuItem>
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
                  size="small"
                  value={profileData.postCode}
                  onChange={(e) => handleInputChange('postCode', e.target.value)}
                  disabled={!isEditing}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: isEditing ? 'white' : 'grey.100',
                      borderRadius: 1,
                      height: 40,
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
                <FormControl fullWidth disabled={!isEditing}>
                  <Select
                    value={profileData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    displayEmpty
                    size="small"
                    sx={{
                      backgroundColor: isEditing ? 'white' : 'grey.100',
                      borderRadius: 1,
                      height: 40,
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: '2px solid',
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    <MenuItem value="">
                      <Typography sx={{ color: 'text.secondary' }}>State</Typography>
                    </MenuItem>
                    <MenuItem value="Western Cape">Western Cape</MenuItem>
                    <MenuItem value="Gauteng">Gauteng</MenuItem>
                    <MenuItem value="KwaZulu-Natal">KwaZulu-Natal</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth disabled={!isEditing}>
                  <Select
                    value={profileData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    displayEmpty
                    size="small"
                    sx={{
                      backgroundColor: isEditing ? 'white' : 'grey.100',
                      borderRadius: 1,
                      height: 40,
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: '2px solid',
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    <MenuItem value="">
                      <Typography sx={{ color: 'text.secondary' }}>Country</Typography>
                    </MenuItem>
                    <MenuItem value="South Africa">South Africa</MenuItem>
                    <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                    <MenuItem value="United States">United States</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Cancel Button for Edit Mode */}
        {isEditing && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{
                borderColor: 'error.main',
                color: 'error.main',
                textTransform: 'none',
                fontWeight: 500,
                px: 3,
                py: 1,
                borderRadius: 2,
                '&:hover': {
                  borderColor: 'error.dark',
                  backgroundColor: 'error.light',
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default IndividualProfile;
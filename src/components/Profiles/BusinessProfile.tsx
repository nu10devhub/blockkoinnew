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
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { Building2 as BusinessIcon, Edit as EditIcon, Save as SaveIcon } from 'lucide-react';

interface Client {
  clientId: string;
  otherName: string;
  surname: string;
  dob: string;
  idPassport: string;
  mobile: string;
  accountType?: string;
}

interface BusinessProfileProps {
  client: Client;
  onUpdate?: (updatedData: any) => void;
}

const BusinessProfile = ({ client, onUpdate }: BusinessProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [sameAsOwnerAddress, setSameAsOwnerAddress] = useState(false);
  const [profileData, setProfileData] = useState({
    // Owner Profile
    firstName: client.otherName || '',
    lastName: client.surname || '',
    emailId: '',
    mobile: client.mobile || '',
    dateOfBirth: client.dob || '',
    depositReferenceCode: 'XXXXXXXXXX',
    idNumber: client.idPassport || '',
    passportNumber: '',
    ownerAddressLine1: '',
    ownerAddressLine2: '',
    ownerCity: '',
    ownerPostCode: '',
    ownerState: '',
    ownerCountry: '',
    
    // Company Details
    companyName: '',
    position: 'XXXXXXXXXX',
    registrationNumber: '',
    employmentStatus: 'XXXXXXXXXX',
    companyAddressLine1: '',
    companyAddressLine2: '',
    companyCity: '',
    companyPostCode: '',
    companyState: '',
    companyCountry: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSameAddressChange = (checked: boolean) => {
    setSameAsOwnerAddress(checked);
    if (checked) {
      setProfileData(prev => ({
        ...prev,
        companyAddressLine1: prev.ownerAddressLine1,
        companyAddressLine2: prev.ownerAddressLine2,
        companyCity: prev.ownerCity,
        companyPostCode: prev.ownerPostCode,
        companyState: prev.ownerState,
        companyCountry: prev.ownerCountry,
      }));
    }
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
      emailId: '',
      mobile: client.mobile || '',
      dateOfBirth: client.dob || '',
      depositReferenceCode: 'XXXXXXXXXX',
      idNumber: client.idPassport || '',
      passportNumber: '',
      ownerAddressLine1: '',
      ownerAddressLine2: '',
      ownerCity: '',
      ownerPostCode: '',
      ownerState: '',
      ownerCountry: '',
      companyName: '',
      position: 'XXXXXXXXXX',
      registrationNumber: '',
      employmentStatus: 'XXXXXXXXXX',
      companyAddressLine1: '',
      companyAddressLine2: '',
      companyCity: '',
      companyPostCode: '',
      companyState: '',
      companyCountry: '',
    });
    setSameAsOwnerAddress(false);
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
            <BusinessIcon size={24} />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              Owner Profile
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
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
        <Grid container spacing={4}>
          {/* Left Column - Owner Profile */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              {/* Owner Details */}
              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
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

              {/* Owner Address */}
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ mb: 2, fontWeight: 500 }}>
                  Address
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      placeholder="Address Line 1"
                      size="small"
                      value={profileData.ownerAddressLine1}
                      onChange={(e) => handleInputChange('ownerAddressLine1', e.target.value)}
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

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      placeholder="Address Line 2"
                      size="small"
                      value={profileData.ownerAddressLine2}
                      onChange={(e) => handleInputChange('ownerAddressLine2', e.target.value)}
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

                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth disabled={!isEditing}>
                      <Select
                        value={profileData.ownerCity}
                        onChange={(e) => handleInputChange('ownerCity', e.target.value)}
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

                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      placeholder="Post code"
                      size="small"
                      value={profileData.ownerPostCode}
                      onChange={(e) => handleInputChange('ownerPostCode', e.target.value)}
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

                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth disabled={!isEditing}>
                      <Select
                        value={profileData.ownerState}
                        onChange={(e) => handleInputChange('ownerState', e.target.value)}
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

                  <Grid item xs={12}>
                    <FormControl fullWidth disabled={!isEditing}>
                      <Select
                        value={profileData.ownerCountry}
                        onChange={(e) => handleInputChange('ownerCountry', e.target.value)}
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
          </Grid>

          {/* Right Column - Company Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'primary.main' }}>
              Company Details
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Company Name
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Text Field"
                  size="small"
                  value={profileData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
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

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Position
                </Typography>
                <TextField
                  fullWidth
                  placeholder="XXXXXXXXXX"
                  size="small"
                  value={profileData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
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

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Registration Number
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Text Field"
                  size="small"
                  value={profileData.registrationNumber}
                  onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
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

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Employment Status
                </Typography>
                <TextField
                  fullWidth
                  placeholder="XXXXXXXXXX"
                  size="small"
                  value={profileData.employmentStatus}
                  onChange={(e) => handleInputChange('employmentStatus', e.target.value)}
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

              {/* Company Address */}
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ mb: 2, fontWeight: 500 }}>
                  Address
                </Typography>
                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={sameAsOwnerAddress}
                      onChange={(e) => handleSameAddressChange(e.target.checked)}
                      disabled={!isEditing}
                      size="small"
                      sx={{
                        color: 'primary.main',
                        '&.Mui-checked': {
                          color: 'primary.main',
                        },
                      }}
                    />
                  }
                  label="Same as owner address"
                  sx={{
                    mb: 2,
                    '& .MuiFormControlLabel-label': {
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    },
                  }}
                />

                {!sameAsOwnerAddress && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        placeholder="Address Line 1"
                        size="small"
                        value={profileData.companyAddressLine1}
                        onChange={(e) => handleInputChange('companyAddressLine1', e.target.value)}
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

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        placeholder="Address Line 2"
                        size="small"
                        value={profileData.companyAddressLine2}
                        onChange={(e) => handleInputChange('companyAddressLine2', e.target.value)}
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

                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth disabled={!isEditing}>
                        <Select
                          value={profileData.companyCity}
                          onChange={(e) => handleInputChange('companyCity', e.target.value)}
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

                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        placeholder="Post code"
                        size="small"
                        value={profileData.companyPostCode}
                        onChange={(e) => handleInputChange('companyPostCode', e.target.value)}
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

                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth disabled={!isEditing}>
                        <Select
                          value={profileData.companyState}
                          onChange={(e) => handleInputChange('companyState', e.target.value)}
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

                    <Grid item xs={12}>
                      <FormControl fullWidth disabled={!isEditing}>
                        <Select
                          value={profileData.companyCountry}
                          onChange={(e) => handleInputChange('companyCountry', e.target.value)}
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
                )}
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

export default BusinessProfile;
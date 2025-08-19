import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Box,
  Typography,
  Avatar,
  Chip,
  Switch,
  FormControlLabel,
  Divider,
} from '@mui/material';
import {
  X as CloseIcon,
  AccountBalance as BankIcon,
  PhoneAndroid as MobileIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from '@mui/icons-material';

interface Beneficiary {
  id: string;
  name: string;
  type: 'bank' | 'mobile';
  country: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  
  // Bank specific fields
  accountType?: 'individual' | 'business';
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  iban?: string;
  swift?: string;
  
  // Mobile money specific fields
  provider?: string;
  mobileNumber?: string;
  countryCode?: string;
}

interface ViewBeneficiaryDialogProps {
  open: boolean;
  onClose: () => void;
  beneficiary: Beneficiary | null;
  onUpdate: (id: string, beneficiaryData: Partial<Beneficiary>) => void;
}

const ViewBeneficiaryDialog = ({ open, onClose, beneficiary, onUpdate }: ViewBeneficiaryDialogProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Beneficiary>>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (beneficiary) {
      setFormData({ ...beneficiary });
    }
  }, [beneficiary]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (formData.type === 'bank') {
      if (!formData.bankName?.trim()) {
        newErrors.bankName = 'Bank name is required';
      }
      if (!formData.accountNumber?.trim()) {
        newErrors.accountNumber = 'Account number is required';
      }
      if (!formData.accountName?.trim()) {
        newErrors.accountName = 'Account name is required';
      }
    } else {
      if (!formData.provider?.trim()) {
        newErrors.provider = 'Provider is required';
      }
      if (!formData.mobileNumber?.trim()) {
        newErrors.mobileNumber = 'Mobile number is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm() && beneficiary) {
      onUpdate(beneficiary.id, formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...beneficiary });
    setErrors({});
    setIsEditing(false);
  };

  const handleClose = () => {
    setIsEditing(false);
    setFormData({});
    setErrors({});
    onClose();
  };

  const getCountryFlag = (country: string): string => {
    const flagMap: { [key: string]: string } = {
      'South Africa': '🇿🇦',
      'United Kingdom': '🇬🇧',
      'United States': '🇺🇸',
      'Kenya': '🇰🇪',
      'Nigeria': '🇳🇬',
      'Uganda': '🇺🇬',
      'Tanzania': '🇹🇿',
      'Ghana': '🇬🇭',
    };
    return flagMap[country] || '🌐';
  };

  if (!beneficiary) return null;

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          textAlign: 'center',
          fontSize: '1.5rem',
          fontWeight: 600,
          color: 'primary.main',
          pt: 3,
          pb: 2,
          position: 'relative',
        }}
      >
        Beneficiary Details
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: 'grey.500',
            backgroundColor: 'grey.100',
            '&:hover': {
              backgroundColor: 'grey.200',
            },
          }}
        >
          <CloseIcon size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 4, pb: 2 }}>
        {/* Header with Avatar and Basic Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              backgroundColor: beneficiary.type === 'bank' ? 'primary.light' : 'secondary.light',
              fontSize: '1.5rem',
            }}
          >
            {beneficiary.type === 'bank' ? (
              <BankIcon fontSize="large" />
            ) : (
              <MobileIcon fontSize="large" />
            )}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              {beneficiary.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Chip
                label={beneficiary.type === 'bank' ? 'Bank Account' : 'Mobile Money'}
                size="small"
                sx={{
                  backgroundColor: beneficiary.type === 'bank' ? 'primary.light' : 'secondary.light',
                  color: beneficiary.type === 'bank' ? 'primary.dark' : 'secondary.dark',
                  fontWeight: 500,
                }}
              />
              <Chip
                label={beneficiary.isActive ? 'Active' : 'Inactive'}
                size="small"
                sx={{
                  backgroundColor: beneficiary.isActive ? 'success.light' : 'error.light',
                  color: beneficiary.isActive ? 'success.dark' : 'error.dark',
                  fontWeight: 500,
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: '1.2rem' }}>
                {getCountryFlag(beneficiary.country)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {beneficiary.country}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Basic Information
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Beneficiary Name
            </Typography>
            <TextField
              fullWidth
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={!isEditing}
              error={!!errors.name}
              helperText={errors.name}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: isEditing ? 'white' : 'grey.50',
                  borderRadius: 2,
                  height: 56,
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
              Status
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive || false}
                  onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  disabled={!isEditing}
                  color="primary"
                />
              }
              label={formData.isActive ? 'Active' : 'Inactive'}
              sx={{ mt: 1 }}
            />
          </Grid>

          {/* Bank Account Details */}
          {beneficiary.type === 'bank' && (
            <>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Bank Account Details
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Account Type
                </Typography>
                <FormControl fullWidth disabled={!isEditing}>
                  <Select
                    value={formData.accountType || 'individual'}
                    onChange={(e) => handleInputChange('accountType', e.target.value)}
                    sx={{
                      backgroundColor: isEditing ? 'white' : 'grey.50',
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: '2px solid',
                        borderColor: 'primary.main',
                      },
                      borderRadius: 2,
                      height: 56,
                    }}
                  >
                    <MenuItem value="individual">Individual</MenuItem>
                    <MenuItem value="business">Business</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Bank Name
                </Typography>
                <TextField
                  fullWidth
                  value={formData.bankName || ''}
                  onChange={(e) => handleInputChange('bankName', e.target.value)}
                  disabled={!isEditing}
                  error={!!errors.bankName}
                  helperText={errors.bankName}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: isEditing ? 'white' : 'grey.50',
                      borderRadius: 2,
                      height: 56,
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
                  Account Number
                </Typography>
                <TextField
                  fullWidth
                  value={formData.accountNumber || ''}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  disabled={!isEditing}
                  error={!!errors.accountNumber}
                  helperText={errors.accountNumber}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: isEditing ? 'white' : 'grey.50',
                      borderRadius: 2,
                      height: 56,
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
                  Account Name
                </Typography>
                <TextField
                  fullWidth
                  value={formData.accountName || ''}
                  onChange={(e) => handleInputChange('accountName', e.target.value)}
                  disabled={!isEditing}
                  error={!!errors.accountName}
                  helperText={errors.accountName}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: isEditing ? 'white' : 'grey.50',
                      borderRadius: 2,
                      height: 56,
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
                  IBAN (Optional)
                </Typography>
                <TextField
                  fullWidth
                  value={formData.iban || ''}
                  onChange={(e) => handleInputChange('iban', e.target.value)}
                  disabled={!isEditing}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: isEditing ? 'white' : 'grey.50',
                      borderRadius: 2,
                      height: 56,
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
                  SWIFT Code (Optional)
                </Typography>
                <TextField
                  fullWidth
                  value={formData.swift || ''}
                  onChange={(e) => handleInputChange('swift', e.target.value)}
                  disabled={!isEditing}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: isEditing ? 'white' : 'grey.50',
                      borderRadius: 2,
                      height: 56,
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
            </>
          )}

          {/* Mobile Money Details */}
          {beneficiary.type === 'mobile' && (
            <>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Mobile Money Details
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Provider
                </Typography>
                <TextField
                  fullWidth
                  value={formData.provider || ''}
                  onChange={(e) => handleInputChange('provider', e.target.value)}
                  disabled={!isEditing}
                  error={!!errors.provider}
                  helperText={errors.provider}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: isEditing ? 'white' : 'grey.50',
                      borderRadius: 2,
                      height: 56,
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
                  Mobile Number
                </Typography>
                <TextField
                  fullWidth
                  value={formData.mobileNumber || ''}
                  onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                  disabled={!isEditing}
                  error={!!errors.mobileNumber}
                  helperText={errors.mobileNumber}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: isEditing ? 'white' : 'grey.50',
                      borderRadius: 2,
                      height: 56,
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
            </>
          )}

          {/* Metadata */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Information
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Created At
            </Typography>
            <Typography variant="body1">
              {new Date(beneficiary.createdAt).toLocaleDateString()}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Last Updated
            </Typography>
            <Typography variant="body1">
              {new Date(beneficiary.updatedAt).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 4, pb: 4, pt: 2, gap: 2 }}>
        {!isEditing ? (
          <>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{
                borderColor: 'grey.400',
                color: 'grey.600',
                borderRadius: 2,
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 500,
              }}
            >
              Close
            </Button>
            <Button
              onClick={() => setIsEditing(true)}
              variant="contained"
              startIcon={<EditIcon />}
              sx={{
                backgroundColor: 'primary.main',
                borderRadius: 2,
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 500,
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  boxShadow: '0 4px 12px rgba(15, 174, 128, 0.3)',
                },
              }}
            >
              Edit
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={handleCancel}
              variant="outlined"
              sx={{
                borderColor: 'error.main',
                color: 'error.main',
                borderRadius: 2,
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  borderColor: 'error.dark',
                  backgroundColor: 'error.light',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{
                backgroundColor: 'primary.main',
                borderRadius: 2,
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 500,
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  boxShadow: '0 4px 12px rgba(15, 174, 128, 0.3)',
                },
              }}
            >
              Save Changes
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ViewBeneficiaryDialog;
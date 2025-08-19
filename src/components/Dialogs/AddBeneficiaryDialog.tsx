import { useState } from 'react';
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
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
} from '@mui/material';
import { X as CloseIcon } from 'lucide-react';

interface Country {
  code: string;
  name: string;
  flag: string;
  mobileMoneyProviders: string[];
}

interface AddBeneficiaryDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (beneficiaryData: any) => void;
}

// Countries with their mobile money providers
const countries: Country[] = [
  { 
    code: 'ZA', 
    name: 'South Africa', 
    flag: '🇿🇦', 
    mobileMoneyProviders: [] // No mobile money for South Africa
  },
  { 
    code: 'KE', 
    name: 'Kenya', 
    flag: '🇰🇪', 
    mobileMoneyProviders: ['M-Pesa', 'Airtel Money']
  },
  { 
    code: 'UG', 
    name: 'Uganda', 
    flag: '🇺🇬', 
    mobileMoneyProviders: ['MTN Mobile Money', 'Airtel Money']
  },
  { 
    code: 'TZ', 
    name: 'Tanzania', 
    flag: '🇹🇿', 
    mobileMoneyProviders: ['M-Pesa', 'Tigo Pesa', 'Airtel Money']
  },
  { 
    code: 'GH', 
    name: 'Ghana', 
    flag: '🇬🇭', 
    mobileMoneyProviders: ['MTN Mobile Money', 'Vodafone Cash', 'AirtelTigo Money']
  },
  { 
    code: 'NG', 
    name: 'Nigeria', 
    flag: '🇳🇬', 
    mobileMoneyProviders: ['MTN Mobile Money', 'Airtel Money']
  },
  { 
    code: 'GB', 
    name: 'United Kingdom', 
    flag: '🇬🇧', 
    mobileMoneyProviders: [] // No mobile money for UK
  },
  { 
    code: 'US', 
    name: 'United States', 
    flag: '🇺🇸', 
    mobileMoneyProviders: [] // No mobile money for US
  },
];

const AddBeneficiaryDialog = ({ open, onClose, onAdd }: AddBeneficiaryDialogProps) => {
  const [beneficiaryType, setBeneficiaryType] = useState<'bank' | 'mobile'>('bank');
  const [formData, setFormData] = useState({
    name: '',
    country: 'ZA',
    // Bank fields
    accountType: 'individual',
    bankName: '',
    accountNumber: '',
    accountName: '',
    iban: '',
    swift: '',
    // Mobile money fields
    provider: '',
    mobileNumber: '',
    countryCode: '+27',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const selectedCountry = countries.find(c => c.code === formData.country);
  const availableProviders = selectedCountry?.mobileMoneyProviders || [];
  const isMobileMoneyAvailable = availableProviders.length > 0;

  const handleInputChange = (field: string, value: string) => {
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

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    const countryCodeMap: { [key: string]: string } = {
      'ZA': '+27',
      'KE': '+254',
      'UG': '+256',
      'TZ': '+255',
      'GH': '+233',
      'NG': '+234',
      'GB': '+44',
      'US': '+1',
    };
    
    setFormData(prev => ({
      ...prev,
      country: countryCode,
      countryCode: countryCodeMap[countryCode] || '+27',
      provider: '', // Reset provider when country changes
    }));

    // If mobile money not available for this country, switch to bank
    if (beneficiaryType === 'mobile' && (!country || country.mobileMoneyProviders.length === 0)) {
      setBeneficiaryType('bank');
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (beneficiaryType === 'bank') {
      if (!formData.bankName.trim()) {
        newErrors.bankName = 'Bank name is required';
      }
      if (!formData.accountNumber.trim()) {
        newErrors.accountNumber = 'Account number is required';
      }
      if (!formData.accountName.trim()) {
        newErrors.accountName = 'Account name is required';
      }
    } else {
      if (!formData.provider) {
        newErrors.provider = 'Provider is required';
      }
      if (!formData.mobileNumber.trim()) {
        newErrors.mobileNumber = 'Mobile number is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const beneficiaryData = {
        name: formData.name,
        type: beneficiaryType,
        country: selectedCountry?.name || '',
        ...(beneficiaryType === 'bank' ? {
          accountType: formData.accountType,
          bankName: formData.bankName,
          accountNumber: formData.accountNumber,
          accountName: formData.accountName,
          iban: formData.iban,
          swift: formData.swift,
        } : {
          provider: formData.provider,
          mobileNumber: formData.mobileNumber,
          countryCode: formData.countryCode,
        })
      };
      
      onAdd(beneficiaryData);
      handleClose();
    }
  };

  const handleClose = () => {
    setBeneficiaryType('bank');
    setFormData({
      name: '',
      country: 'ZA',
      accountType: 'individual',
      bankName: '',
      accountNumber: '',
      accountName: '',
      iban: '',
      swift: '',
      provider: '',
      mobileNumber: '',
      countryCode: '+27',
    });
    setErrors({});
    onClose();
  };

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
        Add New Beneficiary
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
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Basic Information
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
              Beneficiary Name
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter beneficiary name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'grey.50',
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
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
              Country
            </Typography>
            <FormControl fullWidth>
              <Select
                value={formData.country}
                onChange={(e) => handleCountryChange(e.target.value)}
                displayEmpty
                sx={{
                  backgroundColor: 'grey.50',
                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: '2px solid',
                    borderColor: 'primary.main',
                  },
                  borderRadius: 2,
                  height: 56,
                }}
                renderValue={(value) => {
                  const country = countries.find(c => c.code === value);
                  return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography sx={{ fontSize: '1.2rem' }}>
                        {country?.flag}
                      </Typography>
                      <Typography sx={{ fontWeight: 500 }}>
                        {country?.name}
                      </Typography>
                    </Box>
                  );
                }}
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography sx={{ fontSize: '1.2rem' }}>
                        {country.flag}
                      </Typography>
                      <Typography sx={{ fontWeight: 500 }}>
                        {country.name}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          {/* Beneficiary Type Selection */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Beneficiary Type
            </Typography>
            <RadioGroup
              value={beneficiaryType}
              onChange={(e) => setBeneficiaryType(e.target.value as 'bank' | 'mobile')}
              sx={{ mb: 2 }}
            >
              <FormControlLabel
                value="bank"
                control={<Radio />}
                label="Bank Account (Individual/Business)"
              />
              <FormControlLabel
                value="mobile"
                control={<Radio />}
                label="Mobile Money Service"
                disabled={!isMobileMoneyAvailable}
              />
            </RadioGroup>
            {!isMobileMoneyAvailable && beneficiaryType === 'mobile' && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Mobile money services are not available for {selectedCountry?.name}
              </Typography>
            )}
          </Grid>

          {/* Bank Account Fields */}
          {beneficiaryType === 'bank' && (
            <>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                  Account Type
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={formData.accountType}
                    onChange={(e) => handleInputChange('accountType', e.target.value)}
                    sx={{
                      backgroundColor: 'grey.50',
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
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                  Bank Name
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter bank name"
                  value={formData.bankName}
                  onChange={(e) => handleInputChange('bankName', e.target.value)}
                  error={!!errors.bankName}
                  helperText={errors.bankName}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'grey.50',
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
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                  Account Number
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter account number"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  error={!!errors.accountNumber}
                  helperText={errors.accountNumber}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'grey.50',
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
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                  Account Name
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter account holder name"
                  value={formData.accountName}
                  onChange={(e) => handleInputChange('accountName', e.target.value)}
                  error={!!errors.accountName}
                  helperText={errors.accountName}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'grey.50',
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
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                  IBAN (Optional)
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter IBAN"
                  value={formData.iban}
                  onChange={(e) => handleInputChange('iban', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'grey.50',
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
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                  SWIFT Code (Optional)
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter SWIFT code"
                  value={formData.swift}
                  onChange={(e) => handleInputChange('swift', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'grey.50',
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

          {/* Mobile Money Fields */}
          {beneficiaryType === 'mobile' && isMobileMoneyAvailable && (
            <>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                  Provider
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={formData.provider}
                    onChange={(e) => handleInputChange('provider', e.target.value)}
                    displayEmpty
                    error={!!errors.provider}
                    sx={{
                      backgroundColor: 'grey.50',
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
                    <MenuItem value="">Select Provider</MenuItem>
                    {availableProviders.map((provider) => (
                      <MenuItem key={provider} value={provider}>
                        {provider}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors.provider && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                    {errors.provider}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                  Mobile Number
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter mobile number"
                  value={formData.mobileNumber}
                  onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                  error={!!errors.mobileNumber}
                  helperText={errors.mobileNumber || `Format: ${formData.countryCode}XXXXXXXXX`}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'grey.50',
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
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 4, pb: 4, pt: 2, gap: 2 }}>
        <Button
          onClick={handleClose}
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
          onClick={handleSubmit}
          variant="contained"
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
          Add Beneficiary
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBeneficiaryDialog;
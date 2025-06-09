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
  Avatar,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { X as CloseIcon, ChevronDown } from 'lucide-react';

interface Country {
  code: string;
  name: string;
  flag: string;
  type: 'domestic' | 'international';
}

interface AddBankDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (bankData: any) => void;
}

const countries: Country[] = [
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', type: 'domestic' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧', type: 'international' },
  { code: 'INTL', name: 'International Bank', flag: '🌐', type: 'international' },
];

const currencies = {
  ZA: ['ZAR'],
  UK: ['GBP'],
  INTL: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'],
};

const AddBankDialog = ({ open, onClose, onAdd }: AddBankDialogProps) => {
  const [formData, setFormData] = useState({
    country: 'ZA',
    bankName: '',
    bankAddress: '',
    accountNumber: '',
    ibanNumber: '',
    currency: 'ZAR',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const selectedCountry = countries.find(c => c.code === formData.country);
  const availableCurrencies = currencies[formData.country as keyof typeof currencies] || [];

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    const defaultCurrency = currencies[countryCode as keyof typeof currencies]?.[0] || '';
    
    setFormData({
      ...formData,
      country: countryCode,
      currency: defaultCurrency,
    });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Bank name is required';
    }
    if (!formData.bankAddress.trim()) {
      newErrors.bankAddress = 'Bank address is required';
    }
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
    }
    if (!formData.ibanNumber.trim()) {
      newErrors.ibanNumber = 'IBAN number is required';
    }
    if (!formData.currency) {
      newErrors.currency = 'Currency is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const country = countries.find(c => c.code === formData.country);
      onAdd({
        ...formData,
        type: country?.type || 'domestic',
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      country: 'ZA',
      bankName: '',
      bankAddress: '',
      accountNumber: '',
      ibanNumber: '',
      currency: 'ZAR',
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
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
          fontSize: '2rem',
          fontWeight: 600,
          color: 'primary.main',
          pt: 4,
          pb: 2,
          position: 'relative',
        }}
      >
        Add New Bank
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
          {/* Country Selection */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 1, 
                  fontWeight: 500,
                  color: 'text.primary' 
                }}
              >
                Country
              </Typography>
              <Select
                value={formData.country}
                onChange={(e) => handleCountryChange(e.target.value)}
                displayEmpty
                sx={{
                  backgroundColor: 'grey.50',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: '2px solid',
                    borderColor: 'primary.main',
                  },
                  borderRadius: 2,
                  height: 56,
                }}
                IconComponent={ChevronDown}
                renderValue={(value) => {
                  const country = countries.find(c => c.code === value);
                  return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography sx={{ fontSize: '1.5rem' }}>
                        {country?.flag}
                      </Typography>
                      <Typography sx={{ fontWeight: 500 }}>
                        {country?.name} ({country?.code})
                      </Typography>
                    </Box>
                  );
                }}
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Typography sx={{ fontSize: '1.5rem' }}>
                        {country.flag}
                      </Typography>
                    </ListItemIcon>
                    <ListItemText>
                      <Typography sx={{ fontWeight: 500 }}>
                        {country.name} ({country.code})
                      </Typography>
                    </ListItemText>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Bank Name */}
          <Grid item xs={12}>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 1, 
                fontWeight: 500,
                color: 'text.primary' 
              }}
            >
              Bank Name
            </Typography>
            <TextField
              fullWidth
              placeholder="Text Field"
              value={formData.bankName}
              onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
              error={!!errors.bankName}
              helperText={errors.bankName}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'grey.50',
                  borderRadius: 2,
                  height: 56,
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: '2px solid',
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          </Grid>

          {/* Bank Address */}
          <Grid item xs={12}>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 1, 
                fontWeight: 500,
                color: 'text.primary' 
              }}
            >
              Bank Address
            </Typography>
            <TextField
              fullWidth
              placeholder="Text Field"
              value={formData.bankAddress}
              onChange={(e) => setFormData({ ...formData, bankAddress: e.target.value })}
              error={!!errors.bankAddress}
              helperText={errors.bankAddress}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'grey.50',
                  borderRadius: 2,
                  height: 56,
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: '2px solid',
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          </Grid>

          {/* Account Number */}
          <Grid item xs={12}>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 1, 
                fontWeight: 500,
                color: 'text.primary' 
              }}
            >
              Account Number
            </Typography>
            <TextField
              fullWidth
              placeholder="XXXXXXXXX"
              value={formData.accountNumber}
              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
              error={!!errors.accountNumber}
              helperText={errors.accountNumber}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'grey.50',
                  borderRadius: 2,
                  height: 56,
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: '2px solid',
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          </Grid>

          {/* IBAN Number */}
          <Grid item xs={12}>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 1, 
                fontWeight: 500,
                color: 'text.primary' 
              }}
            >
              IBAN Number
            </Typography>
            <TextField
              fullWidth
              placeholder="XXXXXXXXX"
              value={formData.ibanNumber}
              onChange={(e) => setFormData({ ...formData, ibanNumber: e.target.value })}
              error={!!errors.ibanNumber}
              helperText={errors.ibanNumber}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'grey.50',
                  borderRadius: 2,
                  height: 56,
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: '2px solid',
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          </Grid>

          {/* Currency */}
          <Grid item xs={12}>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 1, 
                fontWeight: 500,
                color: 'text.primary' 
              }}
            >
              Currency
            </Typography>
            <TextField
              fullWidth
              placeholder="XXXXXXXXXXX"
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              error={!!errors.currency}
              helperText={errors.currency}
              select
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'grey.50',
                  borderRadius: 2,
                  height: 56,
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: '2px solid',
                    borderColor: 'primary.main',
                  },
                },
              }}
            >
              {availableCurrencies.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 4, pb: 4, pt: 2, gap: 2 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderColor: 'error.main',
            color: 'error.main',
            borderRadius: 3,
            px: 4,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '1rem',
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
            borderRadius: 3,
            px: 4,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '1rem',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: 'primary.dark',
              boxShadow: '0 4px 12px rgba(15, 174, 128, 0.3)',
            },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBankDialog;
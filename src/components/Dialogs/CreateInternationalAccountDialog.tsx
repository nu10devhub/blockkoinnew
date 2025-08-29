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
  Paper,
  Avatar,
  Divider,
} from '@mui/material';
import { X as CloseIcon, User as UserIcon } from 'lucide-react';

interface Client {
  clientId: string;
  otherName: string;
  surname: string;
  dob: string;
  idPassport: string;
  mobile: string;
}

interface CreateInternationalAccountDialogProps {
  open: boolean;
  onClose: () => void;
  client: Client;
  onSubmit: (accountData: any) => void;
}

const currencies = ['GBP', 'USD', 'EUR', 'JPY', 'CAD', 'AUD'];
const accountTypes = ['Individual', 'Business'];

const CreateInternationalAccountDialog = ({ 
  open, 
  onClose, 
  client, 
  onSubmit 
}: CreateInternationalAccountDialogProps) => {
  const [formData, setFormData] = useState({
    accountType: 'Individual',
    currency: 'GBP',
    purpose: '',
    expectedMonthlyVolume: '',
    sourceOfFunds: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Purpose is required';
    }
    if (!formData.expectedMonthlyVolume.trim()) {
      newErrors.expectedMonthlyVolume = 'Expected monthly volume is required';
    }
    if (!formData.sourceOfFunds.trim()) {
      newErrors.sourceOfFunds = 'Source of funds is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      accountType: 'Individual',
      currency: 'GBP',
      purpose: '',
      expectedMonthlyVolume: '',
      sourceOfFunds: '',
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
        Create International Bank Account
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
        {/* Client Information Display */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            backgroundColor: 'primary.light',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'primary.main',
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.dark' }}>
            Client Information
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
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
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.dark' }}>
                {client.otherName} {client.surname}
              </Typography>
              <Typography variant="body2" sx={{ color: 'primary.dark', opacity: 0.8 }}>
                Client ID: {client.clientId}
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ color: 'primary.dark', opacity: 0.8 }}>
                Date of Birth
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'primary.dark' }}>
                {client.dob}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ color: 'primary.dark', opacity: 0.8 }}>
                ID/Passport
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'primary.dark' }}>
                {client.idPassport}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ color: 'primary.dark', opacity: 0.8 }}>
                Mobile
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'primary.dark' }}>
                {client.mobile}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Divider sx={{ mb: 3 }} />

        {/* Account Creation Form */}
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Account Details
        </Typography>

        <Grid container spacing={3}>
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
                {accountTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
              Currency
            </Typography>
            <FormControl fullWidth>
              <Select
                value={formData.currency}
                onChange={(e) => handleInputChange('currency', e.target.value)}
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
                {currencies.map((currency) => (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
              Purpose of Account
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Describe the purpose of this international account..."
              value={formData.purpose}
              onChange={(e) => handleInputChange('purpose', e.target.value)}
              error={!!errors.purpose}
              helperText={errors.purpose}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'grey.50',
                  borderRadius: 2,
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
              Expected Monthly Volume
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter expected monthly transaction volume"
              value={formData.expectedMonthlyVolume}
              onChange={(e) => handleInputChange('expectedMonthlyVolume', e.target.value)}
              error={!!errors.expectedMonthlyVolume}
              helperText={errors.expectedMonthlyVolume}
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
              Source of Funds
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter source of funds"
              value={formData.sourceOfFunds}
              onChange={(e) => handleInputChange('sourceOfFunds', e.target.value)}
              error={!!errors.sourceOfFunds}
              helperText={errors.sourceOfFunds}
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
          Create Account
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateInternationalAccountDialog;
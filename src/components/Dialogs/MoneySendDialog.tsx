import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Box,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  Paper,
} from '@mui/material';
import { X as CloseIcon } from 'lucide-react';

interface Client {
  clientId: string;
  otherName: string;
  surname: string;
  dob: string;
  idPassport: string;
  mobile: string;
}

interface MoneySendDialogProps {
  open: boolean;
  onClose: () => void;
  client: Client;
  onSubmit: (moneySendData: any) => void;
}

interface OTPDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (otp: string) => void;
}

const currencies = ['ZAR', 'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];
const countries = [
  'South Africa', 'United States', 'United Kingdom', 'Germany', 'France', 
  'Japan', 'Canada', 'Australia', 'Nigeria', 'Kenya', 'Ghana', 'Uganda'
];

const mobileMoneyProviders = [
  'M-Pesa', 'MTN Mobile Money', 'Airtel Money', 'Orange Money', 'Vodacom M-Pesa'
];

const OTPDialog = ({ open, onClose, onSubmit }: OTPDialogProps) => {
  const [otp, setOtp] = useState('');

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
  };

  const handleSubmit = () => {
    onSubmit(otp);
    setOtp('');
    onClose();
  };

  const handleClose = () => {
    setOtp('');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
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
        OTP Verification
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

      <DialogContent sx={{ px: 4, pb: 2, textAlign: 'center' }}>
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
          Please enter the 6-digit OTP to confirm your money transfer
        </Typography>
        
        <TextField
          fullWidth
          value={otp}
          onChange={handleOtpChange}
          placeholder="000000"
          inputProps={{
            maxLength: 6,
            style: {
              textAlign: 'center',
              fontSize: '2rem',
              letterSpacing: '0.5rem',
              fontWeight: 600,
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              height: 80,
              '& fieldset': {
                borderColor: 'primary.main',
                borderWidth: 2,
              },
              '&:hover fieldset': {
                borderColor: 'primary.dark',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
        />
        
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
          {otp.length}/6 digits entered
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 4, pb: 4, pt: 2 }}>
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
            flex: 1,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={otp.length !== 6}
          sx={{
            backgroundColor: 'primary.main',
            borderRadius: 2,
            px: 4,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 500,
            flex: 1,
            ml: 2,
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
            '&:disabled': {
              backgroundColor: 'grey.300',
              color: 'grey.500',
            },
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const MoneySendDialog = ({ open, onClose, client, onSubmit }: MoneySendDialogProps) => {
  const [step, setStep] = useState<'quote' | 'receiver'>('quote');
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  
  // Quote step state
  const [quoteData, setQuoteData] = useState({
    fromCurrency: 'ZAR',
    toCurrency: 'USD',
    toCountry: 'United States',
    amount: '',
  });
  
  // Quote results
  const [quoteResults, setQuoteResults] = useState({
    price: '',
    quoteValue: '',
    showResults: false,
  });
  
  // Receiver details state
  const [receiverType, setReceiverType] = useState<'bank' | 'mobile'>('bank');
  const [receiverData, setReceiverData] = useState({
    // Bank account fields
    bankName: '',
    accountName: '',
    accountNumber: '',
    accountType: '',
    ibanSwift: '',
    // Mobile money fields
    provider: '',
    mobileNumber: '',
  });

  const handleQuoteInputChange = (field: string, value: string) => {
    setQuoteData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleReceiverInputChange = (field: string, value: string) => {
    setReceiverData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGetQuote = async () => {
    // Mock quote API call - replace with actual API
    console.log('Getting quote for:', quoteData);
    
    // Simulate API response
    setQuoteResults({
      price: '15.50',
      quoteValue: (parseFloat(quoteData.amount || '0') * 15.50).toFixed(2),
      showResults: true,
    });
  };

  const handleVerify = () => {
    setStep('receiver');
  };

  const handleSubmitReceiver = () => {
    if (receiverType === 'mobile') {
      setOtpDialogOpen(true);
    } else {
      // For bank account, submit directly
      handleFinalSubmit('');
    }
  };

  const handleOtpSubmit = (otp: string) => {
    handleFinalSubmit(otp);
  };

  const handleFinalSubmit = (otp: string) => {
    const moneySendData = {
      client,
      quote: quoteData,
      quoteResults,
      receiverType,
      receiverData,
      otp,
      timestamp: new Date().toISOString(),
    };
    
    onSubmit(moneySendData);
    handleClose();
  };

  const handleClose = () => {
    setStep('quote');
    setQuoteData({
      fromCurrency: 'ZAR',
      toCurrency: 'USD',
      toCountry: 'United States',
      amount: '',
    });
    setQuoteResults({
      price: '',
      quoteValue: '',
      showResults: false,
    });
    setReceiverData({
      bankName: '',
      accountName: '',
      accountNumber: '',
      accountType: '',
      ibanSwift: '',
      provider: '',
      mobileNumber: '',
    });
    setReceiverType('bank');
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: '90vh',
          }
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {step === 'quote' ? 'Money Send - Get Quote' : 'Money Send - Receiver Details'}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon size={20} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ px: 3 }}>
          {step === 'quote' && (
            <Box>
              {/* Quote Form */}
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>From Currency</InputLabel>
                    <Select
                      value={quoteData.fromCurrency}
                      label="From Currency"
                      onChange={(e) => handleQuoteInputChange('fromCurrency', e.target.value)}
                    >
                      {currencies.map((currency) => (
                        <MenuItem key={currency} value={currency}>
                          {currency}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>To Currency</InputLabel>
                    <Select
                      value={quoteData.toCurrency}
                      label="To Currency"
                      onChange={(e) => handleQuoteInputChange('toCurrency', e.target.value)}
                    >
                      {currencies.map((currency) => (
                        <MenuItem key={currency} value={currency}>
                          {currency}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>To Country</InputLabel>
                    <Select
                      value={quoteData.toCountry}
                      label="To Country"
                      onChange={(e) => handleQuoteInputChange('toCountry', e.target.value)}
                    >
                      {countries.map((country) => (
                        <MenuItem key={country} value={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Amount"
                    type="number"
                    value={quoteData.amount}
                    onChange={(e) => handleQuoteInputChange('amount', e.target.value)}
                    placeholder="Enter amount"
                  />
                </Grid>

                <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Button
                    variant="contained"
                    onClick={handleGetQuote}
                    disabled={!quoteData.amount}
                    fullWidth
                    sx={{
                      backgroundColor: 'primary.main',
                      py: 1.5,
                      textTransform: 'none',
                      fontWeight: 500,
                    }}
                  >
                    Get Quote
                  </Button>
                </Grid>
              </Grid>

              {/* Quote Results */}
              {quoteResults.showResults && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    backgroundColor: 'primary.light',
                    borderRadius: 2,
                    mb: 3,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Quote Results
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Exchange Rate
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {quoteResults.price}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Recipient Will Receive
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {quoteData.toCurrency} {quoteResults.quoteValue}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              )}
            </Box>
          )}

          {step === 'receiver' && (
            <Box>
              {/* Receiver Type Selection */}
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Select Receiver Type
              </Typography>
              
              <RadioGroup
                value={receiverType}
                onChange={(e) => setReceiverType(e.target.value as 'bank' | 'mobile')}
                sx={{ mb: 3 }}
              >
                <FormControlLabel
                  value="bank"
                  control={<Radio />}
                  label="Bank Account"
                />
                <FormControlLabel
                  value="mobile"
                  control={<Radio />}
                  label="Mobile Money Service"
                />
              </RadioGroup>

              <Divider sx={{ mb: 3 }} />

              {/* Bank Account Fields */}
              {receiverType === 'bank' && (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Bank Name"
                      value={receiverData.bankName}
                      onChange={(e) => handleReceiverInputChange('bankName', e.target.value)}
                      placeholder="Enter bank name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Account Name"
                      value={receiverData.accountName}
                      onChange={(e) => handleReceiverInputChange('accountName', e.target.value)}
                      placeholder="Enter account holder name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Account Number"
                      value={receiverData.accountNumber}
                      onChange={(e) => handleReceiverInputChange('accountNumber', e.target.value)}
                      placeholder="Enter account number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Account Type"
                      value={receiverData.accountType}
                      onChange={(e) => handleReceiverInputChange('accountType', e.target.value)}
                      placeholder="e.g., Savings, Checking"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="IBAN/SWIFT (Optional)"
                      value={receiverData.ibanSwift}
                      onChange={(e) => handleReceiverInputChange('ibanSwift', e.target.value)}
                      placeholder="Enter IBAN or SWIFT code"
                    />
                  </Grid>
                </Grid>
              )}

              {/* Mobile Money Fields */}
              {receiverType === 'mobile' && (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Provider</InputLabel>
                      <Select
                        value={receiverData.provider}
                        label="Provider"
                        onChange={(e) => handleReceiverInputChange('provider', e.target.value)}
                      >
                        {mobileMoneyProviders.map((provider) => (
                          <MenuItem key={provider} value={provider}>
                            {provider}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Mobile Number"
                      value={receiverData.mobileNumber}
                      onChange={(e) => handleReceiverInputChange('mobileNumber', e.target.value)}
                      placeholder="Enter mobile number"
                    />
                  </Grid>
                </Grid>
              )}
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 2 }}>
          {step === 'quote' && quoteResults.showResults && (
            <Button
              variant="contained"
              onClick={handleVerify}
              fullWidth
              sx={{
                backgroundColor: 'primary.main',
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              Verify
            </Button>
          )}

          {step === 'receiver' && (
            <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
              <Button
                variant="outlined"
                onClick={() => setStep('quote')}
                sx={{
                  flex: 1,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmitReceiver}
                disabled={
                  receiverType === 'bank' 
                    ? !receiverData.bankName || !receiverData.accountName || !receiverData.accountNumber
                    : !receiverData.provider || !receiverData.mobileNumber
                }
                sx={{
                  flex: 1,
                  backgroundColor: 'primary.main',
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                Submit
              </Button>
            </Box>
          )}
        </DialogActions>
      </Dialog>

      {/* OTP Dialog */}
      <OTPDialog
        open={otpDialogOpen}
        onClose={() => setOtpDialogOpen(false)}
        onSubmit={handleOtpSubmit}
      />
    </>
  );
};

export default MoneySendDialog;
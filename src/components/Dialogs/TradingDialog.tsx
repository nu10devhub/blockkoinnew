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
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  InputAdornment,
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

interface TradingDialogProps {
  open: boolean;
  onClose: () => void;
  client: Client;
  onSubmit: (tradeData: any) => void;
}

// UUID generator function
function uuid() {
  return 'xxxxxxxxxxxxxxxxyxxxyxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(24);
  });
}

const currencies = ['ZAR', 'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];
const TradingDialog = ({ open, onClose, client, onSubmit }: TradingDialogProps) => {
  const [ticketNumber, setTicketNumber] = useState('');
  const [enterAmount, setEnterAmount] = useState('');
  const [enterCurrency, setEnterCurrency] = useState('ZAR');
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const [targetAmount, setTargetAmount] = useState('0');
  const [guaranteedRate, setGuaranteedRate] = useState('0');
  const [totalAmountConvert, setTotalAmountConvert] = useState('0');
  const [addCashHandling, setAddCashHandling] = useState(false);
  const [cashHandlingFee, setCashHandlingFee] = useState('2.5');
  const [brokerFee, setBrokerFee] = useState('1');
  const [timeToHoldFunds, setTimeToHoldFunds] = useState('1');
  const [expirationTime, setExpirationTime] = useState<Date | null>(null);
  
  const [formData, setFormData] = useState({
    broker: '',
    service: 'OTC',
    dueTime: 'OTC',
    email: '',
    cellphoneNumber: client.mobile || '',
    description: '',
    confirmProcessing: false,
  });

  // Generate ticket number on component mount
  useEffect(() => {
    if (open) {
      const fullUuid = uuid();
      const shortTicket = fullUuid.substring(0, 10); // First part of UUID
      setTicketNumber(shortTicket);
    }
  }, [open]);

  // Calculate total amount we'll convert
  useEffect(() => {
    if (enterAmount) {
      const amount = parseFloat(enterAmount) || 0;
      const brokerFeePercent = parseFloat(brokerFee) || 1;
      const bkFee = 2.5; // 2.5%
      const cashHandlingFeePercent = addCashHandling ? (parseFloat(cashHandlingFee) || 2.5) : 0;
      
      const totalFeePercentage = brokerFeePercent + bkFee + cashHandlingFeePercent;
      const totalFeeAmount = (amount * totalFeePercentage) / 100;
      const convertAmount = amount - totalFeeAmount;
      
      setTotalAmountConvert(convertAmount.toFixed(4));
    } else {
      setTotalAmountConvert('0');
    }
  }, [enterAmount, addCashHandling, brokerFee, cashHandlingFee]);

  // Calculate expiration time based on time to hold funds
  useEffect(() => {
    const days = parseFloat(timeToHoldFunds) || 1;
    const expiration = new Date();
    expiration.setTime(expiration.getTime() + (days * 24 * 60 * 60 * 1000));
    setExpirationTime(expiration);
  }, [timeToHoldFunds]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    const tradeData = {
      ticketNumber,
      enterAmount,
      enterCurrency,
      targetCurrency,
      targetAmount,
      guaranteedRate,
      totalAmountConvert,
      addCashHandling,
      cashHandlingFee,
      brokerFee,
      timeToHoldFunds,
      expirationTime,
      ...formData,
      dueDate: expirationTime?.toISOString().split('T')[0] || '',
      clientData: client,
    };
    
    onSubmit(tradeData);
    onClose();
  };

  const handleClose = () => {
    // Reset form
    setEnterAmount('');
    setEnterCurrency('ZAR');
    setTargetAmount('0');
    setGuaranteedRate('0');
    setTotalAmountConvert('0');
    setAddCashHandling(false);
    setCashHandlingFee('2.5');
    setBrokerFee('1');
    setTimeToHoldFunds('1');
    setExpirationTime(null);
    setFormData({
      broker: '',
      service: 'OTC',
      dueTime: 'OTC',
      email: '',
      cellphoneNumber: client.mobile || '',
      description: '',
      confirmProcessing: false,
    });
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
          Customer
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3 }}>
        {/* Enter Amount Section */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography variant="body1" sx={{ minWidth: 120 }}>
              Enter Amount
            </Typography>
            <TextField
              value={enterAmount}
              onChange={(e) => setEnterAmount(e.target.value)}
              placeholder="999,999.00"
              size="small"
              sx={{ width: 150 }}
            />
            <FormControl size="small" sx={{ minWidth: 80 }}>
              <Select 
                value={enterCurrency} 
                onChange={(e) => setEnterCurrency(e.target.value)}
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Fee Breakdown */}
          <Box sx={{ ml: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
              <Typography variant="body2">Broker Fee</Typography>
              <TextField
                value={brokerFee}
                onChange={(e) => setBrokerFee(e.target.value)}
                size="small"
                type="number"
                sx={{ width: 60 }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
              />
              <Typography variant="body2">+</Typography>
              <Typography variant="body2">BK Fee 2.5%</Typography>
              <Typography variant="body2">+</Typography>
              <Typography variant="body2">Time to hold Funds</Typography>
              <TextField
                value={timeToHoldFunds}
                onChange={(e) => setTimeToHoldFunds(e.target.value)}
                size="small"
                type="number"
                sx={{ width: 60 }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">Days</InputAdornment>,
                }}
              />
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Checkbox
                checked={addCashHandling}
                onChange={(e) => setAddCashHandling(e.target.checked)}
                size="small"
              />
              <Typography variant="body2">Add Cash handling fee</Typography>
              <TextField
                value={cashHandlingFee}
                onChange={(e) => setCashHandlingFee(e.target.value)}
                size="small"
                type="number"
                disabled={!addCashHandling}
                sx={{ width: 60 }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
              />
            </Box>
          </Box>

          {/* Amount Breakdown */}
          <Box sx={{ ml: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'primary.main' }} />
              <Typography variant="body2">{enterCurrency} {enterAmount || '0'}</Typography>
              <Typography variant="body2">
                {(parseFloat(brokerFee) + 2.5 + (addCashHandling ? parseFloat(cashHandlingFee) : 0)).toFixed(1)}% Total Fee
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'primary.main' }} />
              <Typography variant="body2">{enterCurrency} {totalAmountConvert}</Typography>
              <Typography variant="body2">Total amount we'll convert</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'primary.main' }} />
              <Typography variant="body2">{guaranteedRate}</Typography>
              <Typography variant="body2">Guaranteed Rate (15 min)</Typography>
            </Box>
          </Box>
        </Box>

        {/* Target Currency Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Radio checked disabled />
          <Typography variant="body1">Target Currency</Typography>
          <TextField
            value={targetAmount}
            placeholder="R 999,999.00"
            size="small"
            disabled
            sx={{ width: 150 }}
          />
          <FormControl size="small" sx={{ minWidth: 80 }}>
            <Select
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Fill out the Quote Section */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Fill out the Quote
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Broker"
              placeholder="Text Field"
              size="small"
              value={formData.broker}
              onChange={(e) => handleInputChange('broker', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Ticket Number"
              value={ticketNumber}
              size="small"
              disabled
              sx={{ backgroundColor: 'grey.100' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Service</InputLabel>
              <Select
                value={formData.service}
                label="Service"
                onChange={(e) => handleInputChange('service', e.target.value)}
              >
                <MenuItem value="OTC">OTC</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Client Name"
              value={`${client.otherName} ${client.surname}`}
              size="small"
              disabled
              sx={{ backgroundColor: 'grey.100' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Due Date"
              value={expirationTime?.toISOString().split('T')[0] || ''}
              size="small"
              disabled
              sx={{ backgroundColor: 'grey.100' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Cellphone Number"
              value={formData.cellphoneNumber}
              size="small"
              onChange={(e) => handleInputChange('cellphoneNumber', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Due Time</InputLabel>
              <Select
                value={formData.dueTime}
                label="Due Time"
                onChange={(e) => handleInputChange('dueTime', e.target.value)}
              >
                <MenuItem value="OTC">OTC</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              placeholder="Text Field"
              size="small"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Describe your trade in 50 words or less"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.confirmProcessing}
                  onChange={(e) => handleInputChange('confirmProcessing', e.target.checked)}
                />
              }
              label="Please confirm if this quote should be processed by our team"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          sx={{
            backgroundColor: 'primary.main',
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'none',
          }}
        >
          Quote
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TradingDialog;
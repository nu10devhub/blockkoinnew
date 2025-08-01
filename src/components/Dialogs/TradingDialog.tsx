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

const TradingDialog = ({ open, onClose, client, onSubmit }: TradingDialogProps) => {
  const [ticketNumber, setTicketNumber] = useState('');
  const [enterAmount, setEnterAmount] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const [targetAmount, setTargetAmount] = useState('0');
  const [guaranteedRate, setGuaranteedRate] = useState('0');
  const [totalAmountConvert, setTotalAmountConvert] = useState('0');
  const [addCashHandling, setAddCashHandling] = useState(false);
  const [isLinkedDeal, setIsLinkedDeal] = useState('Yes');
  
  const [formData, setFormData] = useState({
    broker: '',
    service: 'OTC',
    dueDate: '',
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
      const brokerFee = 2.5; // 2.5%
      const bkFee = 2.5; // 2.5%
      const cashHandlingFee = addCashHandling ? 2.5 : 0; // 2.5% if checked
      
      const totalFeePercentage = brokerFee + bkFee + cashHandlingFee;
      const totalFeeAmount = (amount * totalFeePercentage) / 100;
      const convertAmount = amount - totalFeeAmount;
      
      setTotalAmountConvert(convertAmount.toFixed(4));
    } else {
      setTotalAmountConvert('0');
    }
  }, [enterAmount, addCashHandling]);

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
      targetCurrency,
      targetAmount,
      guaranteedRate,
      totalAmountConvert,
      addCashHandling,
      isLinkedDeal,
      ...formData,
      clientData: client,
    };
    
    onSubmit(tradeData);
    onClose();
  };

  const handleClose = () => {
    // Reset form
    setEnterAmount('');
    setTargetAmount('0');
    setGuaranteedRate('0');
    setTotalAmountConvert('0');
    setAddCashHandling(false);
    setIsLinkedDeal('Yes');
    setFormData({
      broker: '',
      service: 'OTC',
      dueDate: '',
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
              placeholder="R 999,999.00"
              size="small"
              sx={{ width: 150 }}
              InputProps={{
                startAdornment: <InputAdornment position="start">R</InputAdornment>,
              }}
            />
            <FormControl size="small" sx={{ minWidth: 80 }}>
              <Select value="ZAR" disabled>
                <MenuItem value="ZAR">ZAR</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Fee Breakdown */}
          <Box sx={{ ml: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Typography variant="body2" sx={{ minWidth: 80 }}>Broker Fee</Typography>
              <Typography variant="body2">2.5%</Typography>
              <Typography variant="body2">+</Typography>
              <Typography variant="body2">BK Fee</Typography>
              <Typography variant="body2">2.5%</Typography>
              <Typography variant="body2">+</Typography>
              <Typography variant="body2">Time to hold Funds</Typography>
              <Typography variant="body2">1 Day(s)</Typography>
            </Box>
            
            <FormControlLabel
              control={
                <Checkbox
                  checked={addCashHandling}
                  onChange={(e) => setAddCashHandling(e.target.checked)}
                  size="small"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2">Add Cash handling fee (1%)</Typography>
                  <Typography variant="body2">2.5%</Typography>
                </Box>
              }
            />
          </Box>

          {/* Amount Breakdown */}
          <Box sx={{ ml: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'primary.main' }} />
              <Typography variant="body2">ZAR {enterAmount || '0'}</Typography>
              <Typography variant="body2">
                {addCashHandling ? '7.5%' : '5%'} Total Fee
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'primary.main' }} />
              <Typography variant="body2">ZAR {totalAmountConvert}</Typography>
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
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="GBP">GBP</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Fill out the Quote Section */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Fill out the Quote
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">Is this trade linked to an existing deal?</Typography>
            <RadioGroup
              row
              value={isLinkedDeal}
              onChange={(e) => setIsLinkedDeal(e.target.value)}
            >
              <FormControlLabel value="Yes" control={<Radio size="small" />} label="Yes" />
              <FormControlLabel value="No" control={<Radio size="small" />} label="No" />
            </RadioGroup>
          </Box>
        </Box>

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
              placeholder="Text Field"
              size="small"
              value={formData.dueDate}
              onChange={(e) => handleInputChange('dueDate', e.target.value)}
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
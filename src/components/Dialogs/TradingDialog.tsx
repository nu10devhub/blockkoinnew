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
  InputAdornment,
  Paper,
} from '@mui/material';
import { X as CloseIcon } from 'lucide-react';

interface Currency {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  color: string;
}

interface TradingDialogProps {
  open: boolean;
  onClose: () => void;
  tradingType: 'buy' | 'sell';
  onSubmit: (tradeData: any) => void;
}

// Mock currencies - replace with API call
const mockCurrencies: Currency[] = [
  {
    id: 'xrp',
    name: 'Ripple',
    symbol: 'XRP',
    icon: 'R',
    color: '#23292F',
  },
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: 'B',
    color: '#F7931A',
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: 'E',
    color: '#627EEA',
  },
  {
    id: 'usdt',
    name: 'Tether',
    symbol: 'USDT',
    icon: 'T',
    color: '#26A17B',
  },
];

const TradingDialog = ({ open, onClose, tradingType, onSubmit }: TradingDialogProps) => {
  const [sellCurrency, setSellCurrency] = useState<Currency>(mockCurrencies[0]);
  const [buyCurrency, setBuyCurrency] = useState<Currency>(mockCurrencies[1]);
  const [amount, setAmount] = useState('');
  const [availableBalance, setAvailableBalance] = useState('0.00');
  const [lastTradedPrice, setLastTradedPrice] = useState('2332.00');
  const [estimatedPrice, setEstimatedPrice] = useState('0.245');
  const [youWillReceive, setYouWillReceive] = useState('0.245');

  // API integration functions
  const fetchCurrencies = async (): Promise<Currency[]> => {
    // Replace with actual API call
    // const response = await fetch('/api/currencies');
    // return response.json();
    return mockCurrencies;
  };

  const fetchTradingData = async (fromCurrency: string, toCurrency: string) => {
    // Replace with actual API call
    // const response = await fetch(`/api/trading/price?from=${fromCurrency}&to=${toCurrency}`);
    // const data = await response.json();
    
    // Mock data
    setLastTradedPrice('2332.00');
    setEstimatedPrice('0.245');
    setAvailableBalance('0.00');
  };

  useEffect(() => {
    if (open) {
      fetchTradingData(sellCurrency.symbol, buyCurrency.symbol);
    }
  }, [open, sellCurrency, buyCurrency]);

  useEffect(() => {
    // Calculate estimated receive amount
    if (amount && estimatedPrice) {
      const receiveAmount = (parseFloat(amount) * parseFloat(estimatedPrice)).toFixed(3);
      setYouWillReceive(receiveAmount);
    } else {
      setYouWillReceive('0.000');
    }
  }, [amount, estimatedPrice]);

  const handleSellCurrencyChange = (currencyId: string) => {
    const currency = mockCurrencies.find(c => c.id === currencyId);
    if (currency) {
      setSellCurrency(currency);
    }
  };

  const handleBuyCurrencyChange = (currencyId: string) => {
    const currency = mockCurrencies.find(c => c.id === currencyId);
    if (currency) {
      setBuyCurrency(currency);
    }
  };

  const handleSubmit = () => {
    const tradeData = {
      type: tradingType,
      sellCurrency: sellCurrency,
      buyCurrency: buyCurrency,
      amount: parseFloat(amount),
      estimatedPrice: parseFloat(estimatedPrice),
      youWillReceive: parseFloat(youWillReceive),
      timestamp: new Date().toISOString(),
    };
    
    onSubmit(tradeData);
  };

  const handleClose = () => {
    setAmount('');
    setYouWillReceive('0.000');
    onClose();
  };

  const CurrencySelector = ({ 
    currency, 
    onChange, 
    label 
  }: { 
    currency: Currency; 
    onChange: (currencyId: string) => void;
    label: string;
  }) => (
    <FormControl fullWidth>
      <Select
        value={currency.id}
        onChange={(e) => onChange(e.target.value)}
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
        renderValue={() => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              sx={{
                width: 24,
                height: 24,
                backgroundColor: currency.color,
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              {currency.icon}
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {currency.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {currency.symbol}
              </Typography>
            </Box>
          </Box>
        )}
      >
        {mockCurrencies.map((curr) => (
          <MenuItem key={curr.id} value={curr.id}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  backgroundColor: curr.color,
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                {curr.icon}
              </Avatar>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {curr.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {curr.symbol}
                </Typography>
              </Box>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

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
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Trading
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3 }}>
        {/* Buy/Sell Toggle */}
        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          <Button
            variant={tradingType === 'sell' ? 'contained' : 'outlined'}
            onClick={() => {}} // Read-only based on props
            disabled
            sx={{
              backgroundColor: tradingType === 'sell' ? 'primary.main' : 'transparent',
              borderColor: 'primary.main',
              color: tradingType === 'sell' ? 'white' : 'primary.main',
              textTransform: 'none',
              fontWeight: 500,
              px: 4,
              py: 1,
              borderRadius: 2,
              flex: 1,
            }}
          >
            Sell
          </Button>
          <Button
            variant={tradingType === 'buy' ? 'contained' : 'outlined'}
            onClick={() => {}} // Read-only based on props
            disabled
            sx={{
              backgroundColor: tradingType === 'buy' ? 'primary.main' : 'transparent',
              borderColor: 'primary.main',
              color: tradingType === 'buy' ? 'white' : 'primary.main',
              textTransform: 'none',
              fontWeight: 500,
              px: 4,
              py: 1,
              borderRadius: 2,
              flex: 1,
            }}
          >
            Buy
          </Button>
        </Box>

        {/* Sell Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            {tradingType === 'sell' ? 'Sell' : 'Spend'}
          </Typography>
          
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={5}>
              <CurrencySelector
                currency={sellCurrency}
                onChange={handleSellCurrencyChange}
                label="From Currency"
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Amount
                </Typography>
                <TextField
                  fullWidth
                  placeholder="XXXXXX"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    {availableBalance} Available
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    sx={{
                      color: 'primary.main',
                      textTransform: 'none',
                      fontSize: '0.75rem',
                      minWidth: 'auto',
                      p: 0,
                    }}
                  >
                    Add Funds
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* For Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            For
          </Typography>
          
          <CurrencySelector
            currency={buyCurrency}
            onChange={handleBuyCurrencyChange}
            label="To Currency"
          />
        </Box>

        {/* Trading Information */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            backgroundColor: 'grey.50',
            borderRadius: 2,
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Last Traded Price :
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {lastTradedPrice} {sellCurrency.symbol}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Estimated Price :
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {estimatedPrice} {buyCurrency.symbol}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              You will receive :
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>
              {youWillReceive} {buyCurrency.symbol}
            </Typography>
          </Box>
        </Paper>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!amount || parseFloat(amount) <= 0}
          fullWidth
          sx={{
            backgroundColor: 'primary.main',
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
            '&:disabled': {
              backgroundColor: 'grey.300',
              color: 'grey.500',
            },
          }}
        >
          {tradingType === 'sell' ? 'Sell' : 'Buy'} {sellCurrency.symbol}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TradingDialog;
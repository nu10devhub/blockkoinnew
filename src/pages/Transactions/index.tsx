import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  useTheme,
  alpha,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import TransactionTable, { TransactionColumn, TransactionRow } from '../../components/Table/TransactionTable';

// Types for API integration
interface Transaction {
  id: string;
  date: string;
  description: string;
  payment: number;
  depositWithdraw: number;
  balance: number;
  type: 'deposit' | 'withdraw';
}

interface SearchFilters {
  amount: string;
  dateFrom: Dayjs | null;
  dateTo: Dayjs | null;
  buy: boolean;
  sell: boolean;
}

// Mock data for demonstration
const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '15/12/2024',
    description: 'Bank Transfer',
    payment: 100000.00,
    depositWithdraw: 100000.00,
    balance: 145000.00,
    type: 'deposit',
  },
  {
    id: '2',
    date: '14/12/2024',
    description: 'Bank Transfer',
    payment: 100000.00,
    depositWithdraw: -100000.00,
    balance: 145000.00,
    type: 'withdraw',
  },
  {
    id: '3',
    date: '13/12/2024',
    description: 'Bank Transfer',
    payment: 100000.00,
    depositWithdraw: 100000.00,
    balance: 145000.00,
    type: 'deposit',
  },
  {
    id: '4',
    date: '12/12/2024',
    description: 'Bank Transfer',
    payment: 100000.00,
    depositWithdraw: 100000.00,
    balance: 145000.00,
    type: 'deposit',
  },
  {
    id: '5',
    date: '11/12/2024',
    description: 'Bank Transfer',
    payment: 100000.00,
    depositWithdraw: 100000.00,
    balance: 145000.00,
    type: 'deposit',
  },
  {
    id: '6',
    date: '10/12/2024',
    description: 'Bank Transfer',
    payment: 100000.00,
    depositWithdraw: 100000.00,
    balance: 145000.00,
    type: 'deposit',
  },
  {
    id: '7',
    date: '09/12/2024',
    description: 'Bank Transfer',
    payment: 100000.00,
    depositWithdraw: -100000.00,
    balance: 145000.00,
    type: 'withdraw',
  },
  {
    id: '8',
    date: '08/12/2024',
    description: 'Bank Transfer',
    payment: 100000.00,
    depositWithdraw: 100000.00,
    balance: 145000.00,
    type: 'deposit',
  },
  {
    id: '9',
    date: '07/12/2024',
    description: 'Bank Transfer',
    payment: 100000.00,
    depositWithdraw: 100000.00,
    balance: 145000.00,
    type: 'deposit',
  },
  {
    id: '10',
    date: '06/12/2024',
    description: 'Bank Transfer',
    payment: 100000.00,
    depositWithdraw: -100000.00,
    balance: 145000.00,
    type: 'withdraw',
  },
];

const Transactions = () => {
  const theme = useTheme();
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    amount: '',
    dateFrom: null,
    dateTo: null,
    buy: false,
    sell: false,
  });

  // API integration functions
  const fetchTransactions = async (searchFilters: SearchFilters): Promise<Transaction[]> => {
    // Replace with actual API call
    // const response = await fetch('/api/transactions', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(searchFilters),
    // });
    // return response.json();
    
    // Mock API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Filter mock data based on search criteria
    let filtered = mockTransactions;
    
    if (searchFilters.amount) {
      filtered = filtered.filter(t => 
        t.payment.toString().includes(searchFilters.amount) ||
        Math.abs(t.depositWithdraw).toString().includes(searchFilters.amount)
      );
    }
    
    if (searchFilters.dateFrom) {
      filtered = filtered.filter(t => 
        dayjs(t.date, 'DD/MM/YYYY').isAfter(searchFilters.dateFrom?.subtract(1, 'day'))
      );
    }
    
    if (searchFilters.dateTo) {
      filtered = filtered.filter(t => 
        dayjs(t.date, 'DD/MM/YYYY').isBefore(searchFilters.dateTo?.add(1, 'day'))
      );
    }
    
    if (searchFilters.buy && !searchFilters.sell) {
      filtered = filtered.filter(t => t.type === 'deposit');
    }
    
    if (searchFilters.sell && !searchFilters.buy) {
      filtered = filtered.filter(t => t.type === 'withdraw');
    }
    
    return filtered;
  };

  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);
      try {
        const data = await fetchTransactions(filters);
        setTransactions(data);
      } catch (error) {
        console.error('Failed to load transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const handleFilterChange = (field: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await fetchTransactions(filters);
      setTransactions(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      amount: '',
      dateFrom: null,
      dateTo: null,
      buy: false,
      sell: false,
    });
  };

  // Define table columns
  const columns: TransactionColumn[] = [
    {
      id: 'date',
      label: 'Date',
      width: '120px',
    },
    {
      id: 'description',
      label: 'Description',
      width: '200px',
    },
    {
      id: 'payment',
      label: 'Payment',
      width: '150px',
      align: 'right',
      format: (value: number) => `R ${value.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`,
    },
    {
      id: 'depositWithdraw',
      label: 'Deposit / Withdraw',
      width: '180px',
      align: 'right',
      format: (value: number) => (
        <Typography
          variant="body2"
          sx={{
            color: value >= 0 ? 'success.main' : 'error.main',
            fontWeight: 500,
          }}
        >
          {value >= 0 ? '+' : ''} R {Math.abs(value).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
        </Typography>
      ),
    },
    {
      id: 'balance',
      label: 'Balance',
      width: '150px',
      align: 'right',
      format: (value: number) => `R ${value.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`,
    },
  ];

  // Convert transactions to table rows
  const tableRows: TransactionRow[] = transactions.map(transaction => ({
    id: transaction.id,
    date: transaction.date,
    description: transaction.description,
    payment: transaction.payment,
    depositWithdraw: transaction.depositWithdraw,
    balance: transaction.balance,
  }));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        {/* Page Header */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              mb: 1,
            }}
          >
            Transactions
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: '1rem',
            }}
          >
            Make a Payout to an external account or Make an Internal Transfer to another account within our system.
          </Typography>
        </Box>

        {/* Search Form */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            backgroundColor: 'background.paper',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            Search
          </Typography>

          <Grid container spacing={3} alignItems="flex-end">
            {/* Amount Field */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="body1"
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  color: 'text.primary',
                }}
              >
                Amount
              </Typography>
              <TextField
                fullWidth
                placeholder="Text Field"
                size="small"
                value={filters.amount}
                onChange={(e) => handleFilterChange('amount', e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'grey.50',
                    borderRadius: 2,
                    height: 48,
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

            {/* Date Range */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="body1"
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  color: 'text.primary',
                }}
              >
                From
              </Typography>
              <DatePicker
                value={filters.dateFrom}
                onChange={(newValue) => handleFilterChange('dateFrom', newValue)}
                slotProps={{
                  textField: {
                    size: 'small',
                    placeholder: 'dd/mm/yyyy',
                    sx: {
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'grey.50',
                        borderRadius: 2,
                        height: 48,
                        '& fieldset': { border: 'none' },
                        '&:hover fieldset': { border: 'none' },
                        '&.Mui-focused fieldset': {
                          border: '2px solid',
                          borderColor: 'primary.main',
                        },
                      },
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="body1"
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  color: 'text.primary',
                }}
              >
                To
              </Typography>
              <DatePicker
                value={filters.dateTo}
                onChange={(newValue) => handleFilterChange('dateTo', newValue)}
                slotProps={{
                  textField: {
                    size: 'small',
                    placeholder: 'dd/mm/yyyy',
                    sx: {
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'grey.50',
                        borderRadius: 2,
                        height: 48,
                        '& fieldset': { border: 'none' },
                        '&:hover fieldset': { border: 'none' },
                        '&.Mui-focused fieldset': {
                          border: '2px solid',
                          borderColor: 'primary.main',
                        },
                      },
                    },
                  },
                }}
              />
            </Grid>

            {/* Buy/Sell Checkboxes and Search Button */}
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filters.buy}
                        onChange={(e) => handleFilterChange('buy', e.target.checked)}
                        size="small"
                        sx={{
                          color: 'primary.main',
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                        }}
                      />
                    }
                    label="Buy"
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        fontSize: '0.875rem',
                        fontWeight: 500,
                      },
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filters.sell}
                        onChange={(e) => handleFilterChange('sell', e.target.checked)}
                        size="small"
                        sx={{
                          color: 'primary.main',
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                        }}
                      />
                    }
                    label="Sell"
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        fontSize: '0.875rem',
                        fontWeight: 500,
                      },
                    }}
                  />
                </Box>
                <Button
                  variant="contained"
                  onClick={handleSearch}
                  disabled={loading}
                  sx={{
                    backgroundColor: 'primary.main',
                    borderRadius: 2,
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 500,
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                      boxShadow: '0 4px 12px rgba(15, 174, 128, 0.3)',
                    },
                    '&:disabled': {
                      backgroundColor: 'grey.300',
                      color: 'grey.500',
                    },
                  }}
                >
                  {loading ? 'Searching...' : 'Search'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Transaction History Table */}
        <TransactionTable
          columns={columns}
          rows={tableRows}
          title="Transaction History"
          showViewAll={true}
          onViewAll={() => console.log('View all transactions')}
          pagination={true}
          maxHeight="calc(100vh - 400px)"
        />

        {/* Loading Overlay */}
        {loading && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: alpha(theme.palette.common.white, 0.8),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
            }}
          >
            <Typography variant="h6" sx={{ color: 'primary.main' }}>
              Loading transactions...
            </Typography>
          </Box>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default Transactions;
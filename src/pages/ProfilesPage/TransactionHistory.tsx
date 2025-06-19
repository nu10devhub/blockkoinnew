import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import { ArrowLeft as ArrowLeftIcon } from '@mui/icons-material';

interface Transaction {
  id: string;
  date: string;
  type: string;
  source: string;
  reference: string;
  amount: string;
  status: 'Pending' | 'Approved' | 'Processing' | 'Rejected';
  reason: string;
}

const allTransactions: Transaction[] = [
  {
    id: '1',
    date: '15/12/2024',
    type: 'Deposit',
    source: 'FNB',
    reference: 'Assigned Ref',
    amount: '5000.00',
    status: 'Pending',
    reason: 'XXXXX',
  },
  {
    id: '2',
    date: '14/12/2024',
    type: 'Trade',
    source: 'BK',
    reference: 'BK Ref',
    amount: '2500.00',
    status: 'Approved',
    reason: 'XXXXX',
  },
  {
    id: '3',
    date: '13/12/2024',
    type: 'Cash-Out',
    source: 'BK',
    reference: 'BK Ref',
    amount: '1200.00',
    status: 'Processing',
    reason: 'XXXXX',
  },
  {
    id: '4',
    date: '12/12/2024',
    type: 'Withdrawal',
    source: 'BK',
    reference: 'BK Ref',
    amount: '800.00',
    status: 'Rejected',
    reason: 'XXXXX',
  },
  {
    id: '5',
    date: '11/12/2024',
    type: 'Cash-Out',
    source: 'BK',
    reference: 'BK Ref',
    amount: '3000.00',
    status: 'Processing',
    reason: 'XXXXX',
  },
  {
    id: '6',
    date: '10/12/2024',
    type: 'Deposit',
    source: 'FNB',
    reference: 'Assigned Ref',
    amount: '1500.00',
    status: 'Approved',
    reason: 'XXXXX',
  },
  {
    id: '7',
    date: '09/12/2024',
    type: 'Trade',
    source: 'BK',
    reference: 'BK Ref',
    amount: '4200.00',
    status: 'Approved',
    reason: 'XXXXX',
  },
  {
    id: '8',
    date: '08/12/2024',
    type: 'Cash-Out',
    source: 'BK',
    reference: 'BK Ref',
    amount: '900.00',
    status: 'Processing',
    reason: 'XXXXX',
  },
  {
    id: '9',
    date: '07/12/2024',
    type: 'Cash-Out',
    source: 'BK',
    reference: 'BK Ref',
    amount: '2100.00',
    status: 'Processing',
    reason: 'XXXXX',
  },
  {
    id: '10',
    date: '06/12/2024',
    type: 'Withdrawal',
    source: 'BK',
    reference: 'BK Ref',
    amount: '1800.00',
    status: 'Rejected',
    reason: 'XXXXX',
  },
  {
    id: '11',
    date: '05/12/2024',
    type: 'Withdrawal',
    source: 'BK',
    reference: 'BK Ref',
    amount: '3500.00',
    status: 'Rejected',
    reason: 'XXXXX',
  },
  {
    id: '12',
    date: '04/12/2024',
    type: 'Deposit',
    source: 'FNB',
    reference: 'Assigned Ref',
    amount: '6000.00',
    status: 'Pending',
    reason: 'XXXXX',
  },
  {
    id: '13',
    date: '03/12/2024',
    type: 'Trade',
    source: 'BK',
    reference: 'BK Ref',
    amount: '2800.00',
    status: 'Approved',
    reason: 'XXXXX',
  },
  {
    id: '14',
    date: '02/12/2024',
    type: 'Cash-Out',
    source: 'BK',
    reference: 'BK Ref',
    amount: '1100.00',
    status: 'Processing',
    reason: 'XXXXX',
  },
];

const TransactionHistory = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  
  const [filters, setFilters] = useState({
    status: '',
    dateFrom: '',
    dateTo: '',
    currency: '',
    reference: '',
  });
  
  const [filteredTransactions, setFilteredTransactions] = useState(allTransactions);

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    let filtered = allTransactions;

    if (filters.status) {
      filtered = filtered.filter(t => t.status.toLowerCase().includes(filters.status.toLowerCase()));
    }
    if (filters.reference) {
      filtered = filtered.filter(t => t.reference.toLowerCase().includes(filters.reference.toLowerCase()));
    }
    // Add more filter logic as needed

    setFilteredTransactions(filtered);
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      dateFrom: '',
      dateTo: '',
      currency: '',
      reference: '',
    });
    setFilteredTransactions(allTransactions);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return { backgroundColor: '#E8F5E8', color: '#2E7D32' };
      case 'Pending':
        return { backgroundColor: '#E3F2FD', color: '#1976D2' };
      case 'Processing':
        return { backgroundColor: '#FFF3E0', color: '#F57C00' };
      case 'Rejected':
        return { backgroundColor: '#FFEBEE', color: '#D32F2F' };
      default:
        return { backgroundColor: '#F5F5F5', color: '#757575' };
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowLeftIcon />}
          onClick={() => navigate(`/profiles/${username}`)}
          sx={{
            color: 'text.primary',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: 'transparent',
              color: 'primary.main',
            }
          }}
        >
          Back to Profiles
        </Button>
      </Box>

      {/* Search Filters */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Status
            </Typography>
            <TextField
              fullWidth
              placeholder="Text Field"
              size="small"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'grey.100',
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

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Date Range
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                placeholder="From"
                size="small"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                sx={{
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'grey.100',
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': {
                      border: '2px solid',
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <Typography sx={{ alignSelf: 'center', mx: 1 }}>To</Typography>
              <TextField
                placeholder="To"
                size="small"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                sx={{
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'grey.100',
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': {
                      border: '2px solid',
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Currency
            </Typography>
            <TextField
              fullWidth
              placeholder="XXXXXX"
              size="small"
              value={filters.currency}
              onChange={(e) => handleFilterChange('currency', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'grey.100',
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

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Reference
            </Typography>
            <TextField
              fullWidth
              placeholder="XXXXXXXX"
              size="small"
              value={filters.reference}
              onChange={(e) => handleFilterChange('reference', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'grey.100',
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

          <Grid item xs={12} sm={6} md={2}>
            <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                onClick={handleClearFilters}
                sx={{
                  borderColor: 'grey.400',
                  color: 'grey.600',
                  textTransform: 'none',
                  fontWeight: 500,
                  flex: 1,
                }}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                  backgroundColor: 'primary.main',
                  textTransform: 'none',
                  fontWeight: 500,
                  flex: 1,
                }}
              >
                Search
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Transaction History Table */}
      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ p: 3, pb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: 'primary.main',
            }}
          >
            Transaction History
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Source</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Reference</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Reason</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id} hover>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.source}</TableCell>
                  <TableCell>{transaction.reference}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>
                    <Chip
                      label={transaction.status}
                      size="small"
                      sx={{
                        ...getStatusColor(transaction.status),
                        fontWeight: 500,
                        borderRadius: 1,
                      }}
                    />
                  </TableCell>
                  <TableCell>{transaction.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {'< Page 1 of 22 >'}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default TransactionHistory;
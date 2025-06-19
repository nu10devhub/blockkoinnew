import { useState, useEffect } from 'react';
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
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  alpha,
  Chip,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

// Types for API integration
interface ArchiveTransaction {
  id: string;
  date: string;
  source: string;
  name: string;
  reference: string;
  amount: string;
  batchNo: string;
  transactionType: string;
  clientName: string;
  idPassport: string;
  dob: string;
}

interface SearchFilters {
  transactionType: string;
  idPassport: string;
  clientName: string;
  dob: string;
  amountFrom: string;
  amountTo: string;
  dateFrom: Dayjs | null;
  dateTo: Dayjs | null;
}

// Mock data for demonstration
const mockTransactions: ArchiveTransaction[] = [
  {
    id: '1',
    date: '15/12/2024',
    source: 'Bank Transfer Deposit',
    name: 'John Michael Smith',
    reference: 'REF-001234',
    amount: 'R 5,000.00',
    batchNo: 'BTH-2024001',
    transactionType: 'Deposit',
    clientName: 'John Michael Smith',
    idPassport: 'ID123456789',
    dob: '15/03/1990',
  },
  {
    id: '2',
    date: '14/12/2024',
    source: 'Bank Transfer Withdrawal',
    name: 'Sarah Jane Johnson',
    reference: 'REF-001235',
    amount: 'R 3,200.00',
    batchNo: 'BTH-2024002',
    transactionType: 'Withdrawal',
    clientName: 'Sarah Jane Johnson',
    idPassport: 'ID987654321',
    dob: '22/07/1985',
  },
  {
    id: '3',
    date: '13/12/2024',
    source: 'Card Payment',
    name: 'Michael David Brown',
    reference: 'REF-001236',
    amount: 'R 1,500.00',
    batchNo: 'BTH-2024003',
    transactionType: 'Payment',
    clientName: 'Michael David Brown',
    idPassport: 'ID456789123',
    dob: '10/11/1992',
  },
  {
    id: '4',
    date: '12/12/2024',
    source: 'Card Deposit',
    name: 'Emma Louise Davis',
    reference: 'REF-001237',
    amount: 'R 2,800.00',
    batchNo: 'BTH-2024004',
    transactionType: 'Deposit',
    clientName: 'Emma Louise Davis',
    idPassport: 'ID789123456',
    dob: '05/09/1988',
  },
  {
    id: '5',
    date: '11/12/2024',
    source: 'BlockPIN Deposit',
    name: 'James Robert Wilson',
    reference: 'REF-001238',
    amount: 'R 4,100.00',
    batchNo: 'BTH-2024005',
    transactionType: 'Deposit',
    clientName: 'James Robert Wilson',
    idPassport: 'ID321654987',
    dob: '18/12/1987',
  },
  {
    id: '6',
    date: '10/12/2024',
    source: 'Bank Transfer Withdrawal',
    name: 'Lisa Marie Anderson',
    reference: 'REF-001239',
    amount: 'R 2,300.00',
    batchNo: 'BTH-2024006',
    transactionType: 'Withdrawal',
    clientName: 'Lisa Marie Anderson',
    idPassport: 'ID654321098',
    dob: '28/04/1991',
  },
  {
    id: '7',
    date: '09/12/2024',
    source: 'Card Payment',
    name: 'Robert Thomas Clark',
    reference: 'REF-001240',
    amount: 'R 1,750.00',
    batchNo: 'BTH-2024007',
    transactionType: 'Payment',
    clientName: 'Robert Thomas Clark',
    idPassport: 'ID098765432',
    dob: '14/06/1989',
  },
  {
    id: '8',
    date: '08/12/2024',
    source: 'Card Deposit',
    name: 'Jennifer Anne White',
    reference: 'REF-001241',
    amount: 'R 3,600.00',
    batchNo: 'BTH-2024008',
    transactionType: 'Deposit',
    clientName: 'Jennifer Anne White',
    idPassport: 'ID567890123',
    dob: '02/01/1993',
  },
  {
    id: '9',
    date: '07/12/2024',
    source: 'BlockPIN Deposit',
    name: 'David Paul Martinez',
    reference: 'REF-001242',
    amount: 'R 2,950.00',
    batchNo: 'BTH-2024009',
    transactionType: 'Deposit',
    clientName: 'David Paul Martinez',
    idPassport: 'ID234567890',
    dob: '19/08/1986',
  },
  {
    id: '10',
    date: '06/12/2024',
    source: 'Bank Transfer Withdrawal',
    name: 'Michelle Susan Taylor',
    reference: 'REF-001243',
    amount: 'R 1,850.00',
    batchNo: 'BTH-2024010',
    transactionType: 'Withdrawal',
    clientName: 'Michelle Susan Taylor',
    idPassport: 'ID345678901',
    dob: '11/12/1990',
  },
  {
    id: '11',
    date: '05/12/2024',
    source: 'Card Payment',
    name: 'Christopher Lee Garcia',
    reference: 'REF-001244',
    amount: 'R 4,200.00',
    batchNo: 'BTH-2024011',
    transactionType: 'Payment',
    clientName: 'Christopher Lee Garcia',
    idPassport: 'ID456789012',
    dob: '07/05/1988',
  },
  {
    id: '12',
    date: '04/12/2024',
    source: 'BlockPIN Deposit',
    name: 'Amanda Grace Rodriguez',
    reference: 'REF-001245',
    amount: 'R 3,400.00',
    batchNo: 'BTH-2024012',
    transactionType: 'Deposit',
    clientName: 'Amanda Grace Rodriguez',
    idPassport: 'ID678901234',
    dob: '25/09/1992',
  },
];

const transactionTypes = [
  'Deposit',
  'Withdrawal', 
  'Payment',
  'Transfer',
  'Card Transaction',
  'BlockPIN Transaction',
];

const Archive = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<ArchiveTransaction[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const [filters, setFilters] = useState<SearchFilters>({
    transactionType: '',
    idPassport: '',
    clientName: '',
    dob: '',
    amountFrom: '',
    amountTo: '',
    dateFrom: null,
    dateTo: null,
  });

  // API integration functions
  const searchArchiveTransactions = async (searchFilters: SearchFilters): Promise<ArchiveTransaction[]> => {
    // Replace with actual API call
    // const response = await fetch('/api/archive/search', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(searchFilters),
    // });
    // return response.json();
    
    // Mock API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Filter mock data based on search criteria
    let filtered = mockTransactions;
    
    if (searchFilters.transactionType) {
      filtered = filtered.filter(t => 
        t.transactionType.toLowerCase().includes(searchFilters.transactionType.toLowerCase())
      );
    }
    
    if (searchFilters.clientName) {
      filtered = filtered.filter(t => 
        t.clientName.toLowerCase().includes(searchFilters.clientName.toLowerCase())
      );
    }
    
    if (searchFilters.idPassport) {
      filtered = filtered.filter(t => 
        t.idPassport.toLowerCase().includes(searchFilters.idPassport.toLowerCase())
      );
    }
    
    if (searchFilters.dob) {
      filtered = filtered.filter(t => 
        t.dob.includes(searchFilters.dob)
      );
    }
    
    return filtered;
  };

  const exportArchiveData = async (searchFilters: SearchFilters): Promise<void> => {
    // Replace with actual API call
    // const response = await fetch('/api/archive/export', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(searchFilters),
    // });
    // const blob = await response.blob();
    // const url = window.URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'archive-data.csv';
    // a.click();
    
    console.log('Exporting archive data with filters:', searchFilters);
    // Mock export functionality
    alert('Export functionality will be implemented with actual API integration');
  };

  const handleFilterChange = (field: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await searchArchiveTransactions(filters);
      setSearchResults(results);
      setShowResults(true);
      setPage(0);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      transactionType: '',
      idPassport: '',
      clientName: '',
      dob: '',
      amountFrom: '',
      amountTo: '',
      dateFrom: null,
      dateTo: null,
    });
    setShowResults(false);
    setSearchResults([]);
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      await exportArchiveData(filters);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getSourceChip = (source: string) => {
    const getColor = () => {
      if (source.includes('Bank Transfer')) return { bg: '#E3F2FD', color: '#1976D2' };
      if (source.includes('Card')) return { bg: '#F3E5F5', color: '#7B1FA2' };
      if (source.includes('BlockPIN')) return { bg: '#E8F5E8', color: '#2E7D32' };
      return { bg: '#FFF3E0', color: '#F57C00' };
    };
    
    const colors = getColor();
    return (
      <Chip
        label={source}
        size="small"
        sx={{
          backgroundColor: colors.bg,
          color: colors.color,
          fontWeight: 500,
          fontSize: '0.75rem',
        }}
      />
    );
  };

  const visibleRows = searchResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
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
              color: 'primary.main',
            }}
          >
            Client
          </Typography>

          <Grid container spacing={3}>
            {/* First Row */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="body1"
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  color: 'text.primary',
                }}
              >
                Transaction Type
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={filters.transactionType}
                  onChange={(e) => handleFilterChange('transactionType', e.target.value)}
                  displayEmpty
                  size="small"
                  sx={{
                    backgroundColor: 'grey.50',
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: '2px solid',
                      borderColor: 'primary.main',
                    },
                    borderRadius: 2,
                    height: 48,
                  }}
                >
                  <MenuItem value="">
                    <Typography sx={{ color: 'text.secondary' }}>Text Field</Typography>
                  </MenuItem>
                  {transactionTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                ID/Passport
              </Typography>
              <TextField
                fullWidth
                placeholder="Text Field"
                size="small"
                value={filters.idPassport}
                onChange={(e) => handleFilterChange('idPassport', e.target.value)}
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

            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="body1"
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  color: 'text.primary',
                }}
              >
                Client Name
              </Typography>
              <TextField
                fullWidth
                placeholder="dd/mm/yyyy"
                size="small"
                value={filters.clientName}
                onChange={(e) => handleFilterChange('clientName', e.target.value)}
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

            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="body1"
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  color: 'text.primary',
                }}
              >
                DOB
              </Typography>
              <TextField
                fullWidth
                placeholder="XXXXXXXXX"
                size="small"
                value={filters.dob}
                onChange={(e) => handleFilterChange('dob', e.target.value)}
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

            {/* Second Row */}
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
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 'auto' }}>
                  From
                </Typography>
                <TextField
                  placeholder="Number Field"
                  size="small"
                  value={filters.amountFrom}
                  onChange={(e) => handleFilterChange('amountFrom', e.target.value)}
                  sx={{
                    flex: 1,
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
                <Typography variant="body2" sx={{ color: 'text.secondary', mx: 1 }}>
                  To
                </Typography>
                <TextField
                  placeholder="Number Field"
                  size="small"
                  value={filters.amountTo}
                  onChange={(e) => handleFilterChange('amountTo', e.target.value)}
                  sx={{
                    flex: 1,
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
              </Box>
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
                Date Range
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 'auto' }}>
                  From
                </Typography>
                <DatePicker
                  value={filters.dateFrom}
                  onChange={(newValue) => handleFilterChange('dateFrom', newValue)}
                  slotProps={{
                    textField: {
                      size: 'small',
                      placeholder: 'Number Field',
                      sx: {
                        flex: 1,
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
                <Typography variant="body2" sx={{ color: 'text.secondary', mx: 1 }}>
                  To
                </Typography>
                <DatePicker
                  value={filters.dateTo}
                  onChange={(newValue) => handleFilterChange('dateTo', newValue)}
                  slotProps={{
                    textField: {
                      size: 'small',
                      placeholder: 'Number Field',
                      sx: {
                        flex: 1,
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
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleClearFilters}
                  disabled={loading}
                  sx={{
                    borderColor: 'grey.400',
                    color: 'grey.600',
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 500,
                    '&:hover': {
                      borderColor: 'grey.600',
                      backgroundColor: 'grey.50',
                    },
                  }}
                >
                  Clear
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSearch}
                  disabled={loading}
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
                  {loading ? 'Searching...' : 'Search'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Results Table */}
        {showResults && (
          <Paper
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              overflow: 'hidden',
              backgroundColor: 'background.paper',
            }}
          >
            <TableContainer>
              <Table sx={{ minWidth: 1000 }}>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: alpha(theme.palette.grey[50], 0.8),
                      '& .MuiTableCell-head': {
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        color: 'text.primary',
                        py: 2.5,
                        borderBottom: '2px solid',
                        borderBottomColor: 'divider',
                      },
                    }}
                  >
                    <TableCell sx={{ width: '120px' }}>Date</TableCell>
                    <TableCell sx={{ width: '200px' }}>Source</TableCell>
                    <TableCell sx={{ width: '180px' }}>Name</TableCell>
                    <TableCell sx={{ width: '140px' }}>Reference</TableCell>
                    <TableCell sx={{ width: '120px', textAlign: 'right' }}>Amount</TableCell>
                    <TableCell sx={{ width: '140px' }}>Batch No</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visibleRows.map((transaction) => (
                    <TableRow
                      key={transaction.id}
                      hover
                      sx={{
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.04),
                        },
                        '& .MuiTableCell-root': {
                          py: 2,
                          borderBottom: '1px solid',
                          borderBottomColor: alpha(theme.palette.divider, 0.5),
                        },
                      }}
                    >
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            fontSize: '0.875rem',
                          }}
                        >
                          {transaction.date}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {getSourceChip(transaction.source)}
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            fontSize: '0.875rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {transaction.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            fontSize: '0.875rem',
                          }}
                        >
                          {transaction.reference}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ textAlign: 'right' }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.primary',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                          }}
                        >
                          {transaction.amount}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            fontSize: '0.875rem',
                          }}
                        >
                          {transaction.batchNo}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                  {visibleRows.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          No archive records found matching your search criteria.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination and Download */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={searchResults.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  '& .MuiTablePagination-toolbar': {
                    minHeight: 'auto',
                  },
                  '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                  },
                }}
              />
              
              <Button
                variant="contained"
                onClick={handleDownload}
                disabled={loading || searchResults.length === 0}
                sx={{
                  backgroundColor: 'primary.main',
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '0.875rem',
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
                {loading ? 'Exporting...' : 'Download'}
              </Button>
            </Box>
          </Paper>
        )}

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
              {loading ? 'Loading...' : ''}
            </Typography>
          </Box>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default Archive;
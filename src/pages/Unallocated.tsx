import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  TextField, 
  Button, 
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  IconButton,
  Chip,
  Tooltip,
  useTheme
} from '@mui/material';
import { 
  Search as SearchIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

// Generate sample data
const createData = (
  id: number,
  date: string,
  referenceNumber: string,
  recipient: string,
  currency: string,
  grossAmount: number,
  fees: string,
  status: 'Pending' | 'Completed' | 'Failed'
) => {
  return { id, date, referenceNumber, recipient, currency, grossAmount, fees, status };
};

const rows = Array.from({ length: 50 }, (_, index) => 
  createData(
    index + 1,
    `${Math.floor(Math.random() * 28) + 1}/${Math.floor(Math.random() * 12) + 1}/2023`,
    `REF-${Math.floor(100000 + Math.random() * 900000)}`,
    `Recipient ${index + 1}`,
    ['USD', 'EUR', 'GBP', 'JPY'][Math.floor(Math.random() * 4)],
    Math.floor(100 + Math.random() * 9900),
    `${Math.floor(Math.random() * 100)}.00`,
    ['Pending', 'Completed', 'Failed'][Math.floor(Math.random() * 3)] as 'Pending' | 'Completed' | 'Failed'
  )
);

type Order = 'asc' | 'desc';
type OrderBy = keyof Omit<typeof rows[0], 'id'>;

const Unallocated = () => {
  const theme = useTheme();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<OrderBy>('date');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [referenceFilter, setReferenceFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [amountFilter, setAmountFilter] = useState('');
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<number | string>('');

  // Handle sorting
  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Handle pagination
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle editing
  const handleEditStart = (id: number, value: number) => {
    setEditingRow(id);
    setEditValue(value);
  };

  const handleEditCancel = () => {
    setEditingRow(null);
  };

  const handleEditSave = (id: number) => {
    console.log(`Saving value ${editValue} for row ${id}`);
    setEditingRow(null);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  // Filtering and sorting
  const getFilteredRows = () => {
    return rows
      .filter((row) => {
        const matchesReference = referenceFilter ? row.referenceNumber.toLowerCase().includes(referenceFilter.toLowerCase()) : true;
        const matchesName = nameFilter ? row.recipient.toLowerCase().includes(nameFilter.toLowerCase()) : true;
        const matchesAmount = amountFilter ? row.grossAmount.toString().includes(amountFilter) : true;
        const matchesStartDate = startDate ? dayjs(row.date, 'DD/MM/YYYY').isAfter(startDate) || dayjs(row.date, 'DD/MM/YYYY').isSame(startDate) : true;
        const matchesEndDate = endDate ? dayjs(row.date, 'DD/MM/YYYY').isBefore(endDate) || dayjs(row.date, 'DD/MM/YYYY').isSame(endDate) : true;
        
        return matchesReference && matchesName && matchesAmount && matchesStartDate && matchesEndDate;
      })
      .sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        
        if (orderBy === 'date') {
          return order === 'asc' 
            ? dayjs(a.date, 'DD/MM/YYYY').unix() - dayjs(b.date, 'DD/MM/YYYY').unix()
            : dayjs(b.date, 'DD/MM/YYYY').unix() - dayjs(a.date, 'DD/MM/YYYY').unix();
        }
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return order === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        
        return 0;
      });
  };

  const filteredRows = getFilteredRows();
  const visibleRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleSearch = () => {
    console.log("Search with filters:", { 
      startDate, 
      endDate, 
      referenceFilter, 
      nameFilter, 
      amountFilter 
    });
    // Search logic would go here in a real implementation
    setPage(0);
  };

  const clearFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setReferenceFilter('');
    setNameFilter('');
    setAmountFilter('');
    setPage(0);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Unallocated Transactions
        </Typography>
        
        {/* Search Form */}
        <Paper 
          elevation={0} 
          sx={{ p: 3, mb: 3, border: '1px solid', borderColor: 'divider' }}
        >
          <Typography variant="h6" gutterBottom>
            Search & Filter
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="From Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{ textField: { fullWidth: true, size: 'small' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="To Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{ textField: { fullWidth: true, size: 'small' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Reference Number"
                variant="outlined"
                size="small"
                value={referenceFilter}
                onChange={(e) => setReferenceFilter(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Recipient Name"
                variant="outlined"
                size="small"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Amount"
                variant="outlined"
                size="small"
                value={amountFilter}
                onChange={(e) => setAmountFilter(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                sx={{ mr: 1 }}
              >
                Search
              </Button>
              <Button 
                variant="outlined"
                onClick={clearFilters}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Table */}
        <Paper 
          elevation={0} 
          sx={{ 
            width: '100%', 
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <TableContainer sx={{ maxHeight: 'calc(100vh - 340px)' }}>
            <Table stickyHeader aria-label="transactions table">
              <TableHead>
                <TableRow>
                  {[
                    { id: 'date', label: 'Date' },
                    { id: 'referenceNumber', label: 'Reference Number' },
                    { id: 'recipient', label: 'Recipient' },
                    { id: 'currency', label: 'Currency' },
                    { id: 'grossAmount', label: 'Gross Amount' },
                    { id: 'fees', label: 'Fees' },
                    { id: 'status', label: 'Status' },
                    { id: 'actions', label: 'Action' }
                  ].map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.id === 'grossAmount' || column.id === 'fees' ? 'right' : 'left'}
                      sx={{ 
                        fontWeight: 600,
                        backgroundColor: theme.palette.background.default 
                      }}
                      sortDirection={orderBy === column.id ? order : false}
                    >
                      {column.id === 'actions' ? (
                        column.label
                      ) : (
                        <TableSortLabel
                          active={orderBy === column.id}
                          direction={orderBy === column.id ? order : 'asc'}
                          onClick={() => handleRequestSort(column.id as OrderBy)}
                          disabled={column.id === 'actions'}
                        >
                          {column.label}
                        </TableSortLabel>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.referenceNumber}</TableCell>
                    <TableCell sx={{ color: 'primary.main' }}>{row.recipient}</TableCell>
                    <TableCell>{row.currency}</TableCell>
                    <TableCell align="right">
                      {editingRow === row.id ? (
                        <TextField
                          size="small"
                          value={editValue}
                          onChange={handleEditChange}
                          autoFocus
                          variant="outlined"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleEditSave(row.id)}
                                  color="primary"
                                >
                                  <SaveIcon fontSize="small" />
                                </IconButton>
                                <IconButton 
                                  size="small" 
                                  onClick={handleEditCancel}
                                  color="default"
                                >
                                  <CloseIcon fontSize="small" />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={{ width: 150 }}
                        />
                      ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                          {row.grossAmount.toFixed(2)}
                          <Tooltip title="Edit Amount">
                            <IconButton
                              size="small"
                              onClick={() => handleEditStart(row.id, row.grossAmount)}
                              sx={{ ml: 1 }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )}
                    </TableCell>
                    <TableCell align="right">{row.fees}</TableCell>
                    <TableCell>
                      <Chip 
                        label={row.status} 
                        size="small"
                        sx={{
                          backgroundColor: 
                            row.status === 'Completed' ? 'success.light' : 
                            row.status === 'Failed' ? 'error.light' : 
                            'warning.light',
                          color: 
                            row.status === 'Completed' ? 'success.dark' : 
                            row.status === 'Failed' ? 'error.dark' : 
                            'warning.dark',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="contained" 
                        size="small"
                        color="primary"
                      >
                        Match
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {visibleRows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1" color="text.secondary">
                        No matching records found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};

export default Unallocated;
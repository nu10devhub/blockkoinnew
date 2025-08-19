import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Avatar,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Add as AddIcon,
  AccountBalance as BankIcon,
  PhoneAndroid as MobileIcon,
} from '@mui/icons-material';
import AddBeneficiaryDialog from '../../components/Dialogs/AddBeneficiaryDialog';
import ViewBeneficiaryDialog from '../../components/Dialogs/ViewBeneficiaryDialog';

// Types for API integration
interface Beneficiary {
  id: string;
  name: string;
  type: 'bank' | 'mobile';
  country: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  
  // Bank specific fields
  accountType?: 'individual' | 'business';
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  iban?: string;
  swift?: string;
  
  // Mobile money specific fields
  provider?: string;
  mobileNumber?: string;
  countryCode?: string;
}

// Mock data for demonstration
const mockBeneficiaries: Beneficiary[] = [
  {
    id: '1',
    name: 'John Smith',
    type: 'bank',
    country: 'South Africa',
    isActive: true,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    accountType: 'individual',
    bankName: 'FNB',
    accountNumber: '1234567890',
    accountName: 'John Smith',
    iban: 'ZA123456789012345678',
  },
  {
    id: '2',
    name: 'ABC Company Ltd',
    type: 'bank',
    country: 'United Kingdom',
    isActive: true,
    createdAt: '2024-01-14T15:20:00Z',
    updatedAt: '2024-01-14T15:20:00Z',
    accountType: 'business',
    bankName: 'Barclays',
    accountNumber: '9876543210',
    accountName: 'ABC Company Ltd',
    swift: 'BARCGB22',
  },
  {
    id: '3',
    name: 'Mary Wanjiku',
    type: 'mobile',
    country: 'Kenya',
    isActive: true,
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z',
    provider: 'M-Pesa',
    mobileNumber: '254712345678',
    countryCode: '+254',
  },
  {
    id: '4',
    name: 'David Okonkwo',
    type: 'mobile',
    country: 'Nigeria',
    isActive: false,
    createdAt: '2024-01-12T14:45:00Z',
    updatedAt: '2024-01-12T14:45:00Z',
    provider: 'MTN Mobile Money',
    mobileNumber: '2348012345678',
    countryCode: '+234',
  },
  {
    id: '5',
    name: 'Sarah Johnson',
    type: 'bank',
    country: 'United States',
    isActive: true,
    createdAt: '2024-01-11T11:30:00Z',
    updatedAt: '2024-01-11T11:30:00Z',
    accountType: 'individual',
    bankName: 'Chase Bank',
    accountNumber: '5555666677',
    accountName: 'Sarah Johnson',
    swift: 'CHASUS33',
  },
];

const Beneficiaries = () => {
  const theme = useTheme();
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(mockBeneficiaries);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null);

  // API integration functions
  const fetchBeneficiaries = async (): Promise<Beneficiary[]> => {
    // Replace with actual API call
    // const response = await fetch('/api/beneficiaries');
    // return response.json();
    return mockBeneficiaries;
  };

  const createBeneficiary = async (beneficiaryData: Partial<Beneficiary>): Promise<Beneficiary> => {
    // Replace with actual API call
    // const response = await fetch('/api/beneficiaries', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(beneficiaryData),
    // });
    // return response.json();
    
    const newBeneficiary: Beneficiary = {
      id: Date.now().toString(),
      name: beneficiaryData.name || '',
      type: beneficiaryData.type || 'bank',
      country: beneficiaryData.country || '',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...beneficiaryData,
    };
    return newBeneficiary;
  };

  const updateBeneficiary = async (id: string, beneficiaryData: Partial<Beneficiary>): Promise<Beneficiary> => {
    // Replace with actual API call
    // const response = await fetch(`/api/beneficiaries/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(beneficiaryData),
    // });
    // return response.json();
    
    const existingBeneficiary = beneficiaries.find(b => b.id === id);
    if (!existingBeneficiary) throw new Error('Beneficiary not found');
    
    return {
      ...existingBeneficiary,
      ...beneficiaryData,
      updatedAt: new Date().toISOString(),
    };
  };

  useEffect(() => {
    const loadBeneficiaries = async () => {
      setLoading(true);
      try {
        const data = await fetchBeneficiaries();
        setBeneficiaries(data);
      } catch (error) {
        console.error('Failed to load beneficiaries:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBeneficiaries();
  }, []);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddBeneficiary = async (beneficiaryData: Partial<Beneficiary>) => {
    setLoading(true);
    try {
      const newBeneficiary = await createBeneficiary(beneficiaryData);
      setBeneficiaries(prev => [...prev, newBeneficiary]);
      setAddDialogOpen(false);
    } catch (error) {
      console.error('Failed to create beneficiary:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBeneficiary = async (id: string, beneficiaryData: Partial<Beneficiary>) => {
    setLoading(true);
    try {
      const updatedBeneficiary = await updateBeneficiary(id, beneficiaryData);
      setBeneficiaries(prev => prev.map(b => b.id === id ? updatedBeneficiary : b));
      setViewDialogOpen(false);
      setSelectedBeneficiary(null);
    } catch (error) {
      console.error('Failed to update beneficiary:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (beneficiary: Beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setViewDialogOpen(true);
  };

  const getCountryFlag = (country: string): string => {
    const flagMap: { [key: string]: string } = {
      'South Africa': '🇿🇦',
      'United Kingdom': '🇬🇧',
      'United States': '🇺🇸',
      'Kenya': '🇰🇪',
      'Nigeria': '🇳🇬',
      'Uganda': '🇺🇬',
      'Tanzania': '🇹🇿',
      'Ghana': '🇬🇭',
    };
    return flagMap[country] || '🌐';
  };

  const visibleRows = beneficiaries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Beneficiaries
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAddDialogOpen(true)}
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            textTransform: 'none',
            fontWeight: 500,
            px: 3,
            py: 1.5,
            borderRadius: 2,
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: 'primary.dark',
              boxShadow: '0 4px 12px rgba(15, 174, 128, 0.3)',
            },
          }}
        >
          Add Beneficiary
        </Button>
      </Box>

      {/* Beneficiaries Table */}
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
          <Table sx={{ minWidth: 800 }}>
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
                <TableCell sx={{ width: '250px' }}>Name</TableCell>
                <TableCell sx={{ width: '120px' }}>Type</TableCell>
                <TableCell sx={{ width: '150px' }}>Country</TableCell>
                <TableCell sx={{ width: '200px' }}>Details</TableCell>
                <TableCell sx={{ width: '100px' }}>Status</TableCell>
                <TableCell sx={{ width: '120px', textAlign: 'center' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((beneficiary) => (
                <TableRow
                  key={beneficiary.id}
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          backgroundColor: beneficiary.type === 'bank' ? 'primary.light' : 'secondary.light',
                          fontSize: '1rem',
                        }}
                      >
                        {beneficiary.type === 'bank' ? (
                          <BankIcon fontSize="small" />
                        ) : (
                          <MobileIcon fontSize="small" />
                        )}
                      </Avatar>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                          color: 'text.primary',
                        }}
                      >
                        {beneficiary.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={beneficiary.type === 'bank' ? 'Bank' : 'Mobile'}
                      size="small"
                      sx={{
                        backgroundColor: beneficiary.type === 'bank' ? 'primary.light' : 'secondary.light',
                        color: beneficiary.type === 'bank' ? 'primary.dark' : 'secondary.dark',
                        fontWeight: 500,
                        textTransform: 'capitalize',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography sx={{ fontSize: '1.2rem' }}>
                        {getCountryFlag(beneficiary.country)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontSize: '0.875rem',
                        }}
                      >
                        {beneficiary.country}
                      </Typography>
                    </Box>
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
                      {beneficiary.type === 'bank' 
                        ? `${beneficiary.bankName} - ${beneficiary.accountNumber}`
                        : `${beneficiary.provider} - ${beneficiary.mobileNumber}`
                      }
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={beneficiary.isActive ? 'Active' : 'Inactive'}
                      size="small"
                      sx={{
                        backgroundColor: beneficiary.isActive ? 'success.light' : 'error.light',
                        color: beneficiary.isActive ? 'success.dark' : 'error.dark',
                        fontWeight: 500,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => handleViewDetails(beneficiary)}
                      sx={{
                        color: 'primary.main',
                        textTransform: 'none',
                        fontWeight: 500,
                        minWidth: 'auto',
                        px: 2,
                        py: 0.5,
                        borderRadius: 1.5,
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.08),
                        },
                      }}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={beneficiaries.length}
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
      </Paper>

      {/* Add Beneficiary Dialog */}
      <AddBeneficiaryDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onAdd={handleAddBeneficiary}
      />

      {/* View Beneficiary Dialog */}
      <ViewBeneficiaryDialog
        open={viewDialogOpen}
        onClose={() => {
          setViewDialogOpen(false);
          setSelectedBeneficiary(null);
        }}
        beneficiary={selectedBeneficiary}
        onUpdate={handleUpdateBeneficiary}
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
            Loading...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Beneficiaries;
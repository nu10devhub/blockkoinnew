import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Avatar,
  Chip,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';

// Types for API integration
interface FeeStructure {
  id: string;
  bank: string;
  bankLogo?: string;
  description: string;
  bankFees: string;
  feesToClient: string;
  category: 'deposit' | 'transfer' | 'platform' | 'card';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Bank {
  id: string;
  name: string;
  logo: string;
  code: string;
}

// Mock data - replace with actual API calls
const mockBanks: Bank[] = [
  { id: '1', name: 'FNB', logo: '🏦', code: 'FNB' },
  { id: '2', name: 'Standard Bank', logo: '🏛️', code: 'SB' },
  { id: '3', name: 'ABSA', logo: '🏢', code: 'ABSA' },
  { id: '4', name: 'FlexiPin', logo: '💳', code: 'FP' },
  { id: '5', name: 'CC', logo: '💰', code: 'CC' },
];

const mockFeeStructures: FeeStructure[] = [
  {
    id: '1',
    bank: 'FNB',
    description: 'Cash Deposit @ ATM',
    bankFees: 'R15.00',
    feesToClient: 'R20.00',
    category: 'deposit',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '2',
    bank: 'FNB',
    description: 'Cash Deposit @ Branch',
    bankFees: 'R10.00',
    feesToClient: 'R15.00',
    category: 'deposit',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '3',
    bank: 'FNB',
    description: 'EFT In',
    bankFees: 'R5.00',
    feesToClient: 'R8.00',
    category: 'transfer',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '4',
    bank: 'FNB',
    description: 'EFT Out',
    bankFees: 'R8.00',
    feesToClient: 'R12.00',
    category: 'transfer',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '5',
    bank: 'Standard Bank',
    description: 'Cash Deposit @ ATM',
    bankFees: 'R18.00',
    feesToClient: 'R25.00',
    category: 'deposit',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '6',
    bank: 'Standard Bank',
    description: 'Cash Deposit @ Branch',
    bankFees: 'R12.00',
    feesToClient: 'R18.00',
    category: 'deposit',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '7',
    bank: 'Standard Bank',
    description: 'EFT In',
    bankFees: 'R6.00',
    feesToClient: 'R10.00',
    category: 'transfer',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '8',
    bank: 'Standard Bank',
    description: 'EFT Out',
    bankFees: 'R10.00',
    feesToClient: 'R15.00',
    category: 'transfer',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '9',
    bank: 'ABSA',
    description: 'Cash Deposit @ ATM',
    bankFees: 'R16.00',
    feesToClient: 'R22.00',
    category: 'deposit',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '10',
    bank: 'ABSA',
    description: 'Cash Deposit @ Branch',
    bankFees: 'R11.00',
    feesToClient: 'R16.00',
    category: 'deposit',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '11',
    bank: 'ABSA',
    description: 'EFT In',
    bankFees: 'R5.50',
    feesToClient: 'R9.00',
    category: 'transfer',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '12',
    bank: 'ABSA',
    description: 'EFT Out',
    bankFees: 'R9.00',
    feesToClient: 'R13.50',
    category: 'transfer',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '13',
    bank: 'FlexiPin',
    description: 'In',
    bankFees: 'R3.00',
    feesToClient: 'R5.00',
    category: 'platform',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '14',
    bank: 'FlexiPin',
    description: 'Out',
    bankFees: 'R4.00',
    feesToClient: 'R7.00',
    category: 'platform',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '15',
    bank: 'CC',
    description: 'In',
    bankFees: 'R2.50',
    feesToClient: 'R4.50',
    category: 'platform',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '16',
    bank: 'CC',
    description: 'Out',
    bankFees: 'R3.50',
    feesToClient: 'R6.00',
    category: 'platform',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '17',
    bank: 'S/O',
    description: 'On Platform Transaction transfer to card',
    bankFees: 'R12.00',
    feesToClient: 'R18.00',
    category: 'card',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '18',
    bank: 'S/O',
    description: 'On Platform Transaction transfer to other wallet',
    bankFees: 'R8.00',
    feesToClient: 'R12.00',
    category: 'platform',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '19',
    bank: 'S/O',
    description: 'Automatic Card Load',
    bankFees: 'R15.00',
    feesToClient: 'R22.00',
    category: 'card',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
];

const FeePage = () => {
  const theme = useTheme();
  const [feeStructures, setFeeStructures] = useState<FeeStructure[]>(mockFeeStructures);
  const [banks, setBanks] = useState<Bank[]>(mockBanks);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editingFee, setEditingFee] = useState<FeeStructure | null>(null);
  const [selectedFee, setSelectedFee] = useState<FeeStructure | null>(null);
  const [formData, setFormData] = useState({
    bank: '',
    description: '',
    bankFees: '',
    feesToClient: '',
    category: 'deposit' as 'deposit' | 'transfer' | 'platform' | 'card',
  });

  // API integration functions
  const fetchFeeStructures = async (): Promise<FeeStructure[]> => {
    // Replace with actual API call
    // const response = await fetch('/api/fees');
    // return response.json();
    return mockFeeStructures;
  };

  const fetchBanks = async (): Promise<Bank[]> => {
    // Replace with actual API call
    // const response = await fetch('/api/banks');
    // return response.json();
    return mockBanks;
  };

  const createFeeStructure = async (feeData: Partial<FeeStructure>): Promise<FeeStructure> => {
    // Replace with actual API call
    // const response = await fetch('/api/fees', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(feeData),
    // });
    // return response.json();
    
    const newFee: FeeStructure = {
      id: Date.now().toString(),
      bank: feeData.bank || '',
      description: feeData.description || '',
      bankFees: feeData.bankFees || '',
      feesToClient: feeData.feesToClient || '',
      category: feeData.category || 'deposit',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return newFee;
  };

  const updateFeeStructure = async (id: string, feeData: Partial<FeeStructure>): Promise<FeeStructure> => {
    // Replace with actual API call
    // const response = await fetch(`/api/fees/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(feeData),
    // });
    // return response.json();
    
    const existingFee = feeStructures.find(f => f.id === id);
    if (!existingFee) throw new Error('Fee not found');
    
    return {
      ...existingFee,
      ...feeData,
      updatedAt: new Date().toISOString(),
    };
  };

  const deleteFeeStructure = async (id: string): Promise<void> => {
    // Replace with actual API call
    // await fetch(`/api/fees/${id}`, { method: 'DELETE' });
    console.log('Deleting fee:', id);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [feesData, banksData] = await Promise.all([
          fetchFeeStructures(),
          fetchBanks(),
        ]);
        setFeeStructures(feesData);
        setBanks(banksData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getBankLogo = (bankName: string): string => {
    const bank = banks.find(b => b.name === bankName);
    return bank?.logo || '🏦';
  };

  const groupedFees = feeStructures.reduce((acc, fee) => {
    if (!acc[fee.bank]) {
      acc[fee.bank] = [];
    }
    acc[fee.bank].push(fee);
    return acc;
  }, {} as Record<string, FeeStructure[]>);

  const handleAddFee = () => {
    setEditingFee(null);
    setFormData({
      bank: '',
      description: '',
      bankFees: '',
      feesToClient: '',
      category: 'deposit',
    });
    setDialogOpen(true);
  };

  const handleEditFee = (fee: FeeStructure) => {
    setEditingFee(fee);
    setFormData({
      bank: fee.bank,
      description: fee.description,
      bankFees: fee.bankFees,
      feesToClient: fee.feesToClient,
      category: fee.category,
    });
    setDialogOpen(true);
  };

  const handleViewDetails = (fee: FeeStructure) => {
    setSelectedFee(fee);
    setViewDialogOpen(true);
  };

  const handleSaveFee = async () => {
    setLoading(true);
    try {
      if (editingFee) {
        // Update existing fee
        const updatedFee = await updateFeeStructure(editingFee.id, formData);
        setFeeStructures(prev => prev.map(f => f.id === editingFee.id ? updatedFee : f));
      } else {
        // Create new fee
        const newFee = await createFeeStructure(formData);
        setFeeStructures(prev => [...prev, newFee]);
      }
      setDialogOpen(false);
    } catch (error) {
      console.error('Failed to save fee:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFee = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this fee structure?')) {
      setLoading(true);
      try {
        await deleteFeeStructure(id);
        setFeeStructures(prev => prev.filter(f => f.id !== id));
      } catch (error) {
        console.error('Failed to delete fee:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Fees
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddFee}
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
          Add fee item
        </Button>
      </Box>

      {/* Fees Table */}
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
                <TableCell sx={{ width: '200px' }}>Bank</TableCell>
                <TableCell sx={{ width: '300px' }}>Description</TableCell>
                <TableCell sx={{ width: '150px', textAlign: 'center' }}>Bank Fees</TableCell>
                <TableCell sx={{ width: '150px', textAlign: 'center' }}>Fees To Client</TableCell>
                <TableCell sx={{ width: '120px', textAlign: 'center' }}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(groupedFees).map(([bankName, fees]) => (
                fees.map((fee, index) => (
                  <TableRow
                    key={fee.id}
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
                      {index === 0 && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              backgroundColor: 'primary.light',
                              fontSize: '1rem',
                            }}
                          >
                            {getBankLogo(bankName)}
                          </Avatar>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 500,
                              color: 'text.primary',
                            }}
                          >
                            {bankName}
                          </Typography>
                        </Box>
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.4,
                        }}
                      >
                        {fee.description}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Chip
                        label={fee.bankFees}
                        size="small"
                        sx={{
                          backgroundColor: alpha(theme.palette.info.main, 0.1),
                          color: 'info.dark',
                          fontWeight: 500,
                          borderRadius: 1.5,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Chip
                        label={fee.feesToClient}
                        size="small"
                        sx={{
                          backgroundColor: alpha(theme.palette.success.main, 0.1),
                          color: 'success.dark',
                          fontWeight: 500,
                          borderRadius: 1.5,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => handleViewDetails(fee)}
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
                ))
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add/Edit Fee Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          },
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
          {editingFee ? 'Edit Fee Structure' : 'Add New Fee Structure'}
          <IconButton
            onClick={() => setDialogOpen(false)}
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
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                Bank
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={formData.bank}
                  onChange={(e) => handleInputChange('bank', e.target.value)}
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
                >
                  <MenuItem value="">Select Bank</MenuItem>
                  {banks.map((bank) => (
                    <MenuItem key={bank.id} value={bank.name}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ fontSize: '1.2rem' }}>{bank.logo}</Typography>
                        <Typography>{bank.name}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                Category
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
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
                  <MenuItem value="deposit">Deposit</MenuItem>
                  <MenuItem value="transfer">Transfer</MenuItem>
                  <MenuItem value="platform">Platform</MenuItem>
                  <MenuItem value="card">Card</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                Description
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter fee description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
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
                Bank Fees
              </Typography>
              <TextField
                fullWidth
                placeholder="R0.00"
                value={formData.bankFees}
                onChange={(e) => handleInputChange('bankFees', e.target.value)}
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
                Fees To Client
              </Typography>
              <TextField
                fullWidth
                placeholder="R0.00"
                value={formData.feesToClient}
                onChange={(e) => handleInputChange('feesToClient', e.target.value)}
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
            onClick={() => setDialogOpen(false)}
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
            onClick={handleSaveFee}
            variant="contained"
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
            {loading ? 'Saving...' : editingFee ? 'Update Fee' : 'Add Fee'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          },
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
          Fee Details
          <IconButton
            onClick={() => setViewDialogOpen(false)}
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
          {selectedFee && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      backgroundColor: 'primary.light',
                      fontSize: '1.5rem',
                    }}
                  >
                    {getBankLogo(selectedFee.bank)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {selectedFee.bank}
                    </Typography>
                    <Chip
                      label={selectedFee.category}
                      size="small"
                      sx={{
                        backgroundColor: 'primary.light',
                        color: 'primary.dark',
                        textTransform: 'capitalize',
                        fontWeight: 500,
                      }}
                    />
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Description
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {selectedFee.description}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Bank Fees
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'info.main' }}>
                  {selectedFee.bankFees}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Fees To Client
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                  {selectedFee.feesToClient}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Status
                </Typography>
                <Chip
                  label={selectedFee.isActive ? 'Active' : 'Inactive'}
                  size="small"
                  sx={{
                    backgroundColor: selectedFee.isActive ? 'success.light' : 'error.light',
                    color: selectedFee.isActive ? 'success.dark' : 'error.dark',
                    fontWeight: 500,
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Last Updated
                </Typography>
                <Typography variant="body2">
                  {new Date(selectedFee.updatedAt).toLocaleDateString()}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 4, pb: 4, pt: 2, gap: 2 }}>
          <Button
            onClick={() => setViewDialogOpen(false)}
            variant="outlined"
            sx={{
              borderColor: 'grey.400',
              color: 'grey.600',
              borderRadius: 2,
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Close
          </Button>
          <Button
            onClick={() => {
              setViewDialogOpen(false);
              if (selectedFee) handleEditFee(selectedFee);
            }}
            variant="contained"
            startIcon={<EditIcon />}
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
            Edit Fee
          </Button>
        </DialogActions>
      </Dialog>

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

export default FeePage;
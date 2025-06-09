import { useState } from 'react';
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
  Switch,
  Radio,
  Button,
  IconButton,
  Chip,
  Avatar,
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
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { Building2, Globe } from 'lucide-react';

interface Bank {
  id: number;
  rank: number;
  name: string;
  accountNo: string;
  ibanNo: string;
  currency: string;
  active: boolean;
  isDefault: boolean;
  isIntlDefault: boolean;
  logo?: string;
  type: 'domestic' | 'international';
}

const initialBanks: Bank[] = [
  {
    id: 1,
    rank: 1,
    name: 'FNB',
    accountNo: 'XXXXXXXXXX',
    ibanNo: 'XXXXXXXXXX',
    currency: 'ZAR',
    active: true,
    isDefault: true,
    isIntlDefault: false,
    type: 'domestic',
  },
  {
    id: 2,
    rank: 2,
    name: 'Standard Bank',
    accountNo: 'XXXXXXXXXX',
    ibanNo: 'XXXXXXXXXX',
    currency: 'ZAR',
    active: true,
    isDefault: false,
    isIntlDefault: false,
    type: 'domestic',
  },
  {
    id: 3,
    rank: 3,
    name: 'ABSA',
    accountNo: 'XXXXXXXXXX',
    ibanNo: 'XXXXXXXXXX',
    currency: 'ZAR',
    active: false,
    isDefault: false,
    isIntlDefault: false,
    type: 'domestic',
  },
  {
    id: 4,
    rank: 1,
    name: 'Sample',
    accountNo: 'XXXXXXXXXX',
    ibanNo: 'XXXXXXXXXX',
    currency: 'GBP',
    active: true,
    isDefault: true,
    isIntlDefault: false,
    type: 'international',
  },
  {
    id: 5,
    rank: 2,
    name: 'Sample',
    accountNo: 'XXXXXXXXXX',
    ibanNo: 'XXXXXXXXXX',
    currency: 'USD',
    active: true,
    isDefault: true,
    isIntlDefault: false,
    type: 'international',
  },
  {
    id: 6,
    rank: 3,
    name: 'Sample',
    accountNo: 'XXXXXXXXXX',
    ibanNo: 'XXXXXXXXXX',
    currency: 'EUR',
    active: true,
    isDefault: true,
    isIntlDefault: false,
    type: 'international',
  },
];

const Banks = () => {
  const [banks, setBanks] = useState<Bank[]>(initialBanks);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    accountNo: '',
    ibanNo: '',
    currency: '',
    type: 'domestic' as 'domestic' | 'international',
  });

  const domesticBanks = banks.filter(bank => bank.type === 'domestic');
  const internationalBanks = banks.filter(bank => bank.type === 'international');

  const handleToggleActive = (id: number) => {
    setBanks(banks.map(bank => 
      bank.id === id ? { ...bank, active: !bank.active } : bank
    ));
  };

  const handleSetDefault = (id: number, type: 'domestic' | 'international') => {
    setBanks(banks.map(bank => {
      if (bank.type === type) {
        return { ...bank, isDefault: bank.id === id };
      }
      return bank;
    }));
  };

  const handleSetIntlDefault = (id: number) => {
    setBanks(banks.map(bank => 
      bank.type === 'international' 
        ? { ...bank, isIntlDefault: bank.id === id }
        : bank
    ));
  };

  const handleAddBank = () => {
    const newBank: Bank = {
      id: Math.max(...banks.map(b => b.id)) + 1,
      rank: banks.filter(b => b.type === formData.type).length + 1,
      name: formData.name,
      accountNo: formData.accountNo,
      ibanNo: formData.ibanNo,
      currency: formData.currency,
      active: true,
      isDefault: false,
      isIntlDefault: false,
      type: formData.type,
    };
    setBanks([...banks, newBank]);
    setAddDialogOpen(false);
    setFormData({ name: '', accountNo: '', ibanNo: '', currency: '', type: 'domestic' });
  };

  const handleEditBank = () => {
    if (selectedBank) {
      setBanks(banks.map(bank => 
        bank.id === selectedBank.id 
          ? { ...bank, ...formData }
          : bank
      ));
      setEditDialogOpen(false);
      setSelectedBank(null);
    }
  };

  const handleViewDetails = (bank: Bank) => {
    setSelectedBank(bank);
    setViewDialogOpen(true);
  };

  const handleEditClick = (bank: Bank) => {
    setSelectedBank(bank);
    setFormData({
      name: bank.name,
      accountNo: bank.accountNo,
      ibanNo: bank.ibanNo,
      currency: bank.currency,
      type: bank.type,
    });
    setEditDialogOpen(true);
  };

  const getBankLogo = (bankName: string) => {
    const logoMap: { [key: string]: string } = {
      'FNB': '🏦',
      'Standard Bank': '🏛️',
      'ABSA': '🏢',
      'Sample': '🌐',
    };
    return logoMap[bankName] || '🏦';
  };

  const BankTable = ({ banks: bankList, title, type }: { 
    banks: Bank[], 
    title: string, 
    type: 'domestic' | 'international' 
  }) => (
    <Paper elevation={0} sx={{ mb: 4, border: '1px solid', borderColor: 'divider' }}>
      <Box sx={{ p: 2, backgroundColor: 'background.default', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {type === 'domestic' ? (
            <>
              <img 
                src="/api/placeholder/24/16" 
                alt="South Africa" 
                style={{ width: 24, height: 16, borderRadius: 2 }}
              />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
            </>
          ) : (
            <>
              <Globe size={20} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
            </>
          )}
        </Box>
      </Box>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'background.default' }}>
              <TableCell sx={{ fontWeight: 600 }}>Rank</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Bank Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Account No.</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>IBAN No.</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Currency</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Active</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Default</TableCell>
              {type === 'international' && (
                <TableCell sx={{ fontWeight: 600 }}>Intl. Default</TableCell>
              )}
              <TableCell sx={{ fontWeight: 600 }}>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bankList.map((bank) => (
              <TableRow key={bank.id} hover>
                <TableCell>{bank.rank}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 24, height: 24, fontSize: '12px' }}>
                      {getBankLogo(bank.name)}
                    </Avatar>
                    <Typography variant="body2">{bank.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {bank.accountNo}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {bank.ibanNo}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={bank.currency} 
                    size="small" 
                    sx={{ 
                      backgroundColor: 'primary.light',
                      color: 'primary.dark',
                      fontWeight: 500 
                    }} 
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={bank.active}
                    onChange={() => handleToggleActive(bank.id)}
                    color="primary"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Radio
                    checked={bank.isDefault}
                    onChange={() => handleSetDefault(bank.id, bank.type)}
                    color="primary"
                    size="small"
                  />
                </TableCell>
                {type === 'international' && (
                  <TableCell>
                    <Radio
                      checked={bank.isIntlDefault}
                      onChange={() => handleSetIntlDefault(bank.id)}
                      color="primary"
                      size="small"
                    />
                  </TableCell>
                )}
                <TableCell>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => handleViewDetails(bank)}
                    sx={{ 
                      color: 'primary.main',
                      textTransform: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: 'primary.light',
                        color: 'primary.dark',
                      }
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
    </Paper>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Bank Details
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAddDialogOpen(true)}
          sx={{
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
            textTransform: 'none',
            fontWeight: 500,
            px: 3,
          }}
        >
          Add
        </Button>
      </Box>

      <BankTable 
        banks={domesticBanks} 
        title="South Africa (SA)" 
        type="domestic" 
      />
      
      <BankTable 
        banks={internationalBanks} 
        title="International Banks" 
        type="international" 
      />

      {/* Add Bank Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Add New Bank
          <IconButton onClick={() => setAddDialogOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bank Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Account Number"
                value={formData.accountNo}
                onChange={(e) => setFormData({ ...formData, accountNo: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="IBAN Number"
                value={formData.ibanNo}
                onChange={(e) => setFormData({ ...formData, ibanNo: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select
                  value={formData.currency}
                  label="Currency"
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                >
                  <MenuItem value="ZAR">ZAR</MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="GBP">GBP</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={formData.type}
                  label="Type"
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'domestic' | 'international' })}
                >
                  <MenuItem value="domestic">Domestic</MenuItem>
                  <MenuItem value="international">International</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleAddBank}
            disabled={!formData.name || !formData.accountNo || !formData.currency}
          >
            Add Bank
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Bank Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Edit Bank
          <IconButton onClick={() => setEditDialogOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bank Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Account Number"
                value={formData.accountNo}
                onChange={(e) => setFormData({ ...formData, accountNo: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="IBAN Number"
                value={formData.ibanNo}
                onChange={(e) => setFormData({ ...formData, ibanNo: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select
                  value={formData.currency}
                  label="Currency"
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                >
                  <MenuItem value="ZAR">ZAR</MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="GBP">GBP</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={formData.type}
                  label="Type"
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'domestic' | 'international' })}
                >
                  <MenuItem value="domestic">Domestic</MenuItem>
                  <MenuItem value="international">International</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditBank}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Bank Details
          <IconButton onClick={() => setViewDialogOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedBank && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ width: 48, height: 48 }}>
                      {getBankLogo(selectedBank.name)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{selectedBank.name}</Typography>
                      <Chip 
                        label={selectedBank.type === 'domestic' ? 'Domestic' : 'International'} 
                        size="small" 
                        color="primary" 
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Account Number</Typography>
                  <Typography variant="body1">{selectedBank.accountNo}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">IBAN Number</Typography>
                  <Typography variant="body1">{selectedBank.ibanNo}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Currency</Typography>
                  <Typography variant="body1">{selectedBank.currency}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Status</Typography>
                  <Chip 
                    label={selectedBank.active ? 'Active' : 'Inactive'} 
                    size="small" 
                    color={selectedBank.active ? 'success' : 'default'}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Default Bank</Typography>
                  <Typography variant="body1">{selectedBank.isDefault ? 'Yes' : 'No'}</Typography>
                </Grid>
                {selectedBank.type === 'international' && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">International Default</Typography>
                    <Typography variant="body1">{selectedBank.isIntlDefault ? 'Yes' : 'No'}</Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
          <Button 
            variant="contained" 
            startIcon={<EditIcon />}
            onClick={() => {
              setViewDialogOpen(false);
              if (selectedBank) handleEditClick(selectedBank);
            }}
          >
            Edit Bank
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Banks;
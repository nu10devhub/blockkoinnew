import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ArrowLeft as ArrowLeftIcon, X as XIcon } from 'lucide-react';

// Mock data for search results
const mockSearchResults = [
  {
    id: 1,
    referenceNumber: 'REF-123456',
    recipient: 'John Doe',
    surname: 'Doe',
    dob: '15/05/1990',
    idPassport: 'AB123456',
    mobile: '+44123456789',
  },
  {
    id: 2,
    referenceNumber: 'REF-789012',
    recipient: 'Jane Smith',
    surname: 'Smith',
    dob: '23/08/1985',
    idPassport: 'CD789012',
    mobile: '+44987654321',
  },
  // Add more mock data as needed
];

interface TransactionDetails {
  date: string;
  referenceNumber: string;
  recipient: string;
  currency: string;
  amount: number;
}

const Match = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState(mockSearchResults);
  const [selectedResult, setSelectedResult] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [file, setFile] = useState<File | null>(null);

  // Get transaction details from location state
  const transactionDetails = location.state?.transaction as TransactionDetails;

  const handleSearch = () => {
    // In a real implementation, this would make an API call
    // For now, we'll just use the mock data
    setSearchResults(mockSearchResults);
  };

  const handleProceed = () => {
    if (selectedResult) {
      setDialogOpen(true);
    }
  };

  const handleAllocate = () => {
    // Handle allocation logic here
    console.log('Allocating with reason:', reason, 'and file:', file);
    setDialogOpen(false);
    navigate('/unallocated');
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowLeftIcon />}
          onClick={() => navigate('/unallocated')}
          sx={{ mb: 2 }}
        >
          Back to Unallocated
        </Button>
      </Box>

      {/* Transaction Details */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="body2">Date</Typography>
            <Typography variant="body1" fontWeight="500">
              {transactionDetails?.date}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2">Reference Number</Typography>
            <Typography variant="body1" fontWeight="500">
              {transactionDetails?.referenceNumber}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2">Recipient</Typography>
            <Typography variant="body1" fontWeight="500">
              {transactionDetails?.recipient}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="body2">Currency</Typography>
            <Typography variant="body1" fontWeight="500">
              {transactionDetails?.currency}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="body2">Amount</Typography>
            <Typography variant="body1" fontWeight="500">
              {transactionDetails?.amount}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Search Form */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" gutterBottom>
          Search
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Name"
              size="small"
              placeholder="Enter name"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Date of Birth"
              size="small"
              placeholder="dd/mm/yyyy"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="ID/Passport"
              size="small"
              placeholder="Enter ID/Passport"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              fullWidth
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Search Results */}
      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" />
                <TableCell>Reference Number</TableCell>
                <TableCell>Recipient</TableCell>
                <TableCell>Surname</TableCell>
                <TableCell>DOB</TableCell>
                <TableCell>ID/Passport</TableCell>
                <TableCell>Mobile</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <RadioGroup
                value={selectedResult}
                onChange={(e) => setSelectedResult(e.target.value)}
              >
                {searchResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell padding="checkbox">
                      <FormControlLabel
                        value={result.id.toString()}
                        control={<Radio />}
                        label=""
                      />
                    </TableCell>
                    <TableCell>{result.referenceNumber}</TableCell>
                    <TableCell>{result.recipient}</TableCell>
                    <TableCell>{result.surname}</TableCell>
                    <TableCell>{result.dob}</TableCell>
                    <TableCell>{result.idPassport}</TableCell>
                    <TableCell>{result.mobile}</TableCell>
                  </TableRow>
                ))}
              </RadioGroup>
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleProceed}
            disabled={!selectedResult}
          >
            Proceed
          </Button>
        </Box>
      </Paper>

      {/* Allocation Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Client Detail
          <IconButton
            onClick={() => setDialogOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <XIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Reason for Allocation"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            sx={{ mb: 2, mt: 2 }}
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            style={{ display: 'none' }}
            id="pod-upload"
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button variant="outlined" onClick={() => {}}>
            View
          </Button>
          <Button
            variant="contained"
            component="label"
            htmlFor="pod-upload"
            sx={{ mx: 2 }}
          >
            Upload POD
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAllocate}
            disabled={!reason || !file}
          >
            Allocate
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Match;
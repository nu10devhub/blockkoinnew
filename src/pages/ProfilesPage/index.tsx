import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import { ArrowLeft as ArrowLeftIcon } from '@mui/icons-material';

interface Client {
  id: string;
  clientId: string;
  otherName: string;
  surname: string;
  dob: string;
  idPassport: string;
  mobile: string;
}

const mockClients: Client[] = [
  {
    id: '1',
    clientId: 'CL001',
    otherName: 'John Michael',
    surname: 'Smith',
    dob: '15/03/1990',
    idPassport: 'ID123456789',
    mobile: '+27123456789',
  },
  {
    id: '2',
    clientId: 'CL002',
    otherName: 'Sarah Jane',
    surname: 'Johnson',
    dob: '22/07/1985',
    idPassport: 'ID987654321',
    mobile: '+27987654321',
  },
  {
    id: '3',
    clientId: 'CL003',
    otherName: 'Michael David',
    surname: 'Brown',
    dob: '10/11/1992',
    idPassport: 'ID456789123',
    mobile: '+27456789123',
  },
  {
    id: '4',
    clientId: 'CL004',
    otherName: 'Emma Louise',
    surname: 'Davis',
    dob: '05/09/1988',
    idPassport: 'ID789123456',
    mobile: '+27789123456',
  },
  {
    id: '5',
    clientId: 'CL005',
    otherName: 'James Robert',
    surname: 'Wilson',
    dob: '18/12/1987',
    idPassport: 'ID321654987',
    mobile: '+27321654987',
  },
];

const ProfilesPage = () => {
  const navigate = useNavigate();
  const [searchForm, setSearchForm] = useState({
    name: '',
    surname: '',
    dob: '',
    idPassport: '',
    mobile: '',
  });
  const [searchResults, setSearchResults] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    // Filter clients based on search criteria
    const filtered = mockClients.filter(client => {
      const nameMatch = !searchForm.name || 
        client.otherName.toLowerCase().includes(searchForm.name.toLowerCase());
      const surnameMatch = !searchForm.surname || 
        client.surname.toLowerCase().includes(searchForm.surname.toLowerCase());
      const dobMatch = !searchForm.dob || client.dob.includes(searchForm.dob);
      const idMatch = !searchForm.idPassport || 
        client.idPassport.toLowerCase().includes(searchForm.idPassport.toLowerCase());
      const mobileMatch = !searchForm.mobile || client.mobile.includes(searchForm.mobile);

      return nameMatch && surnameMatch && dobMatch && idMatch && mobileMatch;
    });

    setSearchResults(filtered);
    setShowResults(true);
    setSelectedClient('');
  };

  const handleBackToProfiles = () => {
    setShowResults(false);
    setSearchResults([]);
    setSelectedClient('');
  };

  const handleProceed = () => {
    if (selectedClient) {
      const client = searchResults.find(c => c.id === selectedClient);
      if (client) {
        navigate(`/profiles/${client.clientId}`, {
          state: { client }
        });
      }
    }
  };

  return (
    <Box>
      {/* Header with Back Button (only show when results are displayed) */}
      {showResults && (
        <Box sx={{ mb: 3 }}>
          <Button
            startIcon={<ArrowLeftIcon />}
            onClick={handleBackToProfiles}
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
      )}

      {/* Client Search Form */}
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

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Name
            </Typography>
            <TextField
              fullWidth
              placeholder="Text Field"
              size="small"
              value={searchForm.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
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
              Surname
            </Typography>
            <TextField
              fullWidth
              placeholder="Text Field"
              size="small"
              value={searchForm.surname}
              onChange={(e) => handleInputChange('surname', e.target.value)}
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
              DOB
            </Typography>
            <TextField
              fullWidth
              placeholder="dd/mm/yyyy"
              size="small"
              value={searchForm.dob}
              onChange={(e) => handleInputChange('dob', e.target.value)}
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
              ID/Passport
            </Typography>
            <TextField
              fullWidth
              placeholder="XXXXXXXXX"
              size="small"
              value={searchForm.idPassport}
              onChange={(e) => handleInputChange('idPassport', e.target.value)}
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
              Mobile
            </Typography>
            <TextField
              fullWidth
              placeholder="XXXXXXXXXX"
              size="small"
              value={searchForm.mobile}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
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
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 500,
                  px: 4,
                  py: 1,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                }}
              >
                Search
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Search Results Table */}
      {showResults && (
        <Paper
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <TableContainer>
            <Table sx={{ tableLayout: 'fixed' }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableCell 
                    sx={{ 
                      fontWeight: 600, 
                      py: 2,
                      width: '80px',
                      textAlign: 'center'
                    }}
                  >
                    Select
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontWeight: 600, 
                      py: 2,
                      width: '120px'
                    }}
                  >
                    Client ID
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontWeight: 600, 
                      py: 2,
                      width: '150px'
                    }}
                  >
                    Other Name
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontWeight: 600, 
                      py: 2,
                      width: '120px'
                    }}
                  >
                    Surname
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontWeight: 600, 
                      py: 2,
                      width: '120px'
                    }}
                  >
                    DOB
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontWeight: 600, 
                      py: 2,
                      width: '140px'
                    }}
                  >
                    ID/Passport
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontWeight: 600, 
                      py: 2,
                      width: '140px'
                    }}
                  >
                    Mobile
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <RadioGroup
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                >
                  {searchResults.map((client) => (
                    <TableRow key={client.id} hover>
                      <TableCell sx={{ textAlign: 'center', py: 1.5 }}>
                        <FormControlLabel
                          value={client.id}
                          control={<Radio size="small" />}
                          label=""
                          sx={{ m: 0 }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.secondary',
                            fontSize: '0.875rem'
                          }}
                        >
                          {client.clientId}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.secondary',
                            fontSize: '0.875rem'
                          }}
                        >
                          {client.otherName}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.secondary',
                            fontSize: '0.875rem'
                          }}
                        >
                          {client.surname}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.secondary',
                            fontSize: '0.875rem'
                          }}
                        >
                          {client.dob}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.secondary',
                            fontSize: '0.875rem'
                          }}
                        >
                          {client.idPassport}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.secondary',
                            fontSize: '0.875rem'
                          }}
                        >
                          {client.mobile}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </RadioGroup>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Proceed Button */}
          <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={handleProceed}
              disabled={!selectedClient}
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                textTransform: 'none',
                fontWeight: 500,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
                '&:disabled': {
                  backgroundColor: 'grey.300',
                  color: 'grey.500',
                },
              }}
            >
              Proceed
            </Button>
          </Box>
        </Paper>
      )}

      {/* No Results Message */}
      {showResults && searchResults.length === 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: 'center',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
          }}
        >
          <Typography variant="body1" color="text.secondary">
            No clients found matching your search criteria.
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default ProfilesPage;
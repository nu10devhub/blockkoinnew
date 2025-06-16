import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Chip,
  Checkbox,
  FormControlLabel,
  Tabs,
  Tab,
  Collapse,
  Divider,
} from '@mui/material';
import {
  ArrowLeft as ArrowLeftIcon,
} from '@mui/icons-material';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DataTable, { Column } from '../../components/Table/DataTable';

interface WithdrawTransaction {
  id: number;
  date: string;
  source: string;
  reference: string;
  currency: string;
  recipient: string;
  amount: number;
  method: string;
  status: 'Processing' | 'Completed' | 'Failed' | 'Pending';
  selected?: boolean;
}

interface Batch {
  id: number;
  batchNumber: string;
  dateTimestamp: string;
  transactions: WithdrawTransaction[];
  expanded: boolean;
}

// Mock data for batches
const mockBatches: Batch[] = [
  {
    id: 1,
    batchNumber: 'Batch 1 (1/3)',
    dateTimestamp: 'Date & Timestamp',
    expanded: true,
    transactions: [
      {
        id: 1,
        date: '15/12/2024',
        source: 'Bank Transfer',
        reference: 'REF-001234',
        currency: 'ZAR',
        recipient: 'John Doe',
        amount: 5000.00,
        method: 'EFT',
        status: 'Processing',
      },
      {
        id: 2,
        date: '15/12/2024',
        source: 'Bank Transfer',
        reference: 'REF-001235',
        currency: 'USD',
        recipient: 'Jane Smith',
        amount: 2500.00,
        method: 'SWIFT',
        status: 'Processing',
      },
      {
        id: 3,
        date: '15/12/2024',
        source: 'Bank Transfer',
        reference: 'REF-001236',
        currency: 'EUR',
        recipient: 'Mike Johnson',
        amount: 3200.00,
        method: 'SEPA',
        status: 'Processing',
      },
    ],
  },
  {
    id: 2,
    batchNumber: 'Batch No. (No.)',
    dateTimestamp: 'Date & Timestamp',
    expanded: false,
    transactions: [],
  },
  {
    id: 3,
    batchNumber: 'Batch No. (No.)',
    dateTimestamp: 'Date & Timestamp',
    expanded: false,
    transactions: [],
  },
  {
    id: 4,
    batchNumber: 'Batch No. (No.)',
    dateTimestamp: 'Date & Timestamp',
    expanded: false,
    transactions: [],
  },
  {
    id: 5,
    batchNumber: 'Batch No. (No.)',
    dateTimestamp: 'Date & Timestamp',
    expanded: false,
    transactions: [],
  },
  {
    id: 6,
    batchNumber: 'Batch No. (No.)',
    dateTimestamp: 'Date & Timestamp',
    expanded: false,
    transactions: [],
  },
];

const WithdrawPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [batches, setBatches] = useState<Batch[]>(mockBatches);
  const [selectAll, setSelectAll] = useState(false);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleBatchToggle = (batchId: number) => {
    setBatches(batches.map(batch => 
      batch.id === batchId 
        ? { ...batch, expanded: !batch.expanded }
        : batch
    ));
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setBatches(batches.map(batch => ({
      ...batch,
      transactions: batch.transactions.map(transaction => ({
        ...transaction,
        selected: checked
      }))
    })));
  };

  const handleTransactionSelect = (batchId: number, transactionId: number, checked: boolean) => {
    setBatches(batches.map(batch => 
      batch.id === batchId 
        ? {
            ...batch,
            transactions: batch.transactions.map(transaction =>
              transaction.id === transactionId
                ? { ...transaction, selected: checked }
                : transaction
            )
          }
        : batch
    ));
  };

  const handleDecline = () => {
    console.log('Decline selected transactions');
  };

  const handleClose = () => {
    console.log('Close selected transactions');
  };

  const columns: Column[] = [
    { id: 'date', label: 'Date' },
    { id: 'source', label: 'Source' },
    { id: 'reference', label: 'Reference' },
    { id: 'currency', label: 'Currency' },
    { id: 'recipient', label: 'Recipient' },
    { id: 'amount', label: 'Amount', numeric: true },
    { id: 'method', label: 'Method' },
    {
      id: 'status',
      label: 'Status',
      format: (value: string) => (
        <Chip
          label={value}
          size="small"
          sx={{
            backgroundColor: 
              value === 'Completed' ? 'success.light' :
              value === 'Failed' ? 'error.light' :
              value === 'Processing' ? '#FFF3CD' :
              'warning.light',
            color:
              value === 'Completed' ? 'success.dark' :
              value === 'Failed' ? 'error.dark' :
              value === 'Processing' ? '#856404' :
              'warning.dark',
            fontWeight: 500,
          }}
        />
      ),
    },
    {
      id: 'select',
      label: (
        <FormControlLabel
          control={
            <Checkbox
              checked={selectAll}
              onChange={(e) => handleSelectAll(e.target.checked)}
              size="small"
            />
          }
          label="All"
          sx={{ m: 0 }}
        />
      ),
      format: (_, row: WithdrawTransaction) => (
        <Checkbox
          checked={row.selected || false}
          onChange={(e) => handleTransactionSelect(1, row.id, e.target.checked)}
          size="small"
        />
      ),
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowLeftIcon />}
          onClick={() => navigate(-1)}
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
          Back
        </Button>
      </Box>

      {/* Tabs */}
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '1rem',
              color: 'text.secondary',
              '&.Mui-selected': {
                color: 'primary.main',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'primary.main',
              height: 3,
            },
          }}
        >
          <Tab label="Processing Batches" />
          <Tab label="Completed Batches" />
        </Tabs>
      </Box>

      {/* Batches */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {batches.map((batch) => (
          <Paper
            key={batch.id}
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            {/* Batch Header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                backgroundColor: 'background.default',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'grey.50',
                },
              }}
              onClick={() => handleBatchToggle(batch.id)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: 'primary.main',
                  }}
                >
                  {batch.batchNumber}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary' }}
                >
                  {batch.dateTimestamp}
                </Typography>
              </Box>
              <IconButton size="small">
                {batch.expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </IconButton>
            </Box>

            {/* Batch Content */}
            <Collapse in={batch.expanded}>
              {batch.transactions.length > 0 ? (
                <Box>
                  <DataTable
                    columns={columns}
                    rows={batch.transactions}
                    defaultOrderBy="date"
                    defaultOrder="desc"
                  />
                  
                  {/* Action Buttons */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: 2,
                      p: 2,
                      borderTop: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={handleDecline}
                      sx={{
                        borderColor: 'error.main',
                        color: 'error.main',
                        '&:hover': {
                          borderColor: 'error.dark',
                          backgroundColor: 'error.light',
                        },
                      }}
                    >
                      Decline
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleClose}
                      sx={{
                        backgroundColor: 'primary.main',
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                        },
                      }}
                    >
                      Close
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  <Typography variant="body2">
                    No transactions in this batch
                  </Typography>
                </Box>
              )}
            </Collapse>
          </Paper>
        ))}
      </Box>

      {/* Pagination */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 4,
          gap: 2,
        }}
      >
        <Button
          variant="text"
          size="small"
          sx={{ color: 'text.secondary' }}
        >
          <
        </Button>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Page 1 of 22
        </Typography>
        <Button
          variant="text"
          size="small"
          sx={{ color: 'text.secondary' }}
        >
          >
        </Button>
      </Box>
    </Box>
  );
};

export default WithdrawPage;
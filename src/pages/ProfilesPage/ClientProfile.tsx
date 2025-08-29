import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import { ArrowLeft as ArrowLeftIcon } from '@mui/icons-material';
import { RiShieldCheckFill } from 'react-icons/ri';
import IndividualProfile from '../../components/Profiles/IndividualProfile';
import BusinessProfile from '../../components/Profiles/BusinessProfile';
import TradingDialog from '../../components/Dialogs/TradingDialog';
import MoneySendDialog from '../../components/Dialogs/MoneySendDialog';
import CreateInternationalAccountDialog from '../../components/Dialogs/CreateInternationalAccountDialog';
import ViewInternationalAccountDialog from '../../components/Dialogs/ViewInternationalAccountDialog';

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

const recentTransactions: Transaction[] = [
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
];

const ClientProfile = () => {
  const location = useLocation();
  const { username } = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const [tradingDialogOpen, setTradingDialogOpen] = useState(false);
  const [moneySendDialogOpen, setMoneySendDialogOpen] = useState(false);
  const [createAccountDialogOpen, setCreateAccountDialogOpen] = useState(false);
  const [viewAccountDialogOpen, setViewAccountDialogOpen] = useState(false);
  const [hasInternationalAccount, setHasInternationalAccount] = useState(false);
  const [internationalAccountData, setInternationalAccountData] = useState(null);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleProfileUpdate = (updatedData: any) => {
    console.log('Profile updated:', updatedData);
    // Here you would typically make an API call to update the profile
  };

  const handleCreateAccountSubmit = (accountData: any) => {
    setHasInternationalAccount(true);
    setInternationalAccountData({
      accountNumber: 'INT' + Math.floor(Math.random() * 1000000000),
      iban: 'GB29NWBK60161331926819',
      swift: 'SCBLGB2L',
      currency: accountData.currency,
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0],
    });
    
    setCreateAccountDialogOpen(false);
  };

  const checkInternationalAccountStatus = () => {
    // Check account status logic
  };

  // Check account status on component mount
  React.useEffect(() => {
    checkInternationalAccountStatus();
  }, []);

  const handleTradeSubmit = (tradeData: any) => {
    console.log('Trade submitted:', tradeData);
    // Implement trade submission logic
  };

  const handleMoneySendSubmit = (moneySendData: any) => {
    console.log('Money Send submitted:', moneySendData);
    // Implement money send submission logic
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

  const client = {};
  const accountType = 'individual';

  const renderIndividualProfile = () => (
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            Client Profile
          </Typography>
          <Chip
            label="Individual"
            size="small"
            sx={{
              backgroundColor: 'primary.light',
              color: 'primary.dark',
              fontWeight: 500,
            }}
          />
          <Chip
            label="Verified"
            size="small"
            sx={{
              backgroundColor: 'success.light',
              color: 'success.dark',
              fontWeight: 500,
            }}
          />
        </Box>
      </Box>
    </Paper>
  );

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        {accountType === 'business' ? (
          <BusinessProfile client={client} onUpdate={handleProfileUpdate} />
        ) : (
          <IndividualProfile client={client} onUpdate={handleProfileUpdate} />
        )}
      </Box>

      {/* Trading Dialog */}
      <TradingDialog
        open={tradingDialogOpen}
        onClose={() => setTradingDialogOpen(false)}
        client={client}
        onSubmit={handleTradeSubmit}
      />

      {/* Money Send Dialog */}
      <MoneySendDialog
        open={moneySendDialogOpen}
        onClose={() => setMoneySendDialogOpen(false)}
        client={client}
        onSubmit={handleMoneySendSubmit}
      />

      {/* Create International Account Dialog */}
      <CreateInternationalAccountDialog
        open={createAccountDialogOpen}
        onClose={() => setCreateAccountDialogOpen(false)}
        client={client}
        onSubmit={handleCreateAccountSubmit}
      />

      {/* View International Account Dialog */}
      <ViewInternationalAccountDialog
        open={viewAccountDialogOpen}
        onClose={() => setViewAccountDialogOpen(false)}
        accountData={internationalAccountData}
      />
    </Box>
  );
};

export default ClientProfile;
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  IconButton,
  Box,
  Typography,
  Paper,
  Avatar,
  Chip,
} from '@mui/material';
import { X as CloseIcon, Building2 as BankIcon } from 'lucide-react';

interface AccountData {
  bankName: string;
  accountNumber: string;
  iban: string;
  swift: string;
  currency: string;
  status: string;
  createdAt: string;
}

interface ViewInternationalAccountDialogProps {
  open: boolean;
  onClose: () => void;
  accountData: AccountData | null;
}

const ViewInternationalAccountDialog = ({ 
  open, 
  onClose, 
  accountData 
}: ViewInternationalAccountDialogProps) => {
  
  if (!accountData) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        }
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
        International Bank Account Details
        <IconButton
          onClick={onClose}
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
        {/* Header with Bank Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              backgroundColor: 'primary.main',
              color: 'white',
            }}
          >
            <BankIcon size={32} />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              {accountData.bankName}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Chip
                label="International Account"
                size="small"
                sx={{
                  backgroundColor: 'primary.light',
                  color: 'primary.dark',
                  fontWeight: 500,
                }}
              />
              <Chip
                label={accountData.status}
                size="small"
                sx={{
                  backgroundColor: 'success.light',
                  color: 'success.dark',
                  fontWeight: 500,
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Account Details */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: 'text.secondary' }}>
              Account Number
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {accountData.accountNumber}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: 'text.secondary' }}>
              Currency
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {accountData.currency}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: 'text.secondary' }}>
              IBAN
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, fontFamily: 'monospace' }}>
              {accountData.iban}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: 'text.secondary' }}>
              SWIFT Code
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, fontFamily: 'monospace' }}>
              {accountData.swift}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: 'text.secondary' }}>
              Account Status
            </Typography>
            <Chip
              label={accountData.status}
              sx={{
                backgroundColor: 'success.light',
                color: 'success.dark',
                fontWeight: 500,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: 'text.secondary' }}>
              Created Date
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {new Date(accountData.createdAt).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>

        {/* Important Notice */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mt: 3,
            backgroundColor: 'warning.light',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'warning.main',
          }}
        >
          <Typography variant="body2" sx={{ color: 'warning.dark', fontWeight: 500 }}>
            <strong>Important:</strong> This international account is managed by our banking partner. 
            For any account modifications or issues, please contact support.
          </Typography>
        </Paper>
      </DialogContent>

      <DialogActions sx={{ px: 4, pb: 4, pt: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: 'primary.main',
            borderRadius: 2,
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
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewInternationalAccountDialog;
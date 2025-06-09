import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
  SelectChangeEvent,
} from '@mui/material';
import { X as CloseIcon, Upload as UploadIcon } from 'lucide-react';

interface UploadOFXDialogProps {
  open: boolean;
  onClose: () => void;
  onUpload: (bank: string, file: File) => Promise<void>;
}

const banks = [
  { value: 'FNB', label: 'FNB' },
  { value: 'FNBGLOBAL', label: 'FNB Global' },
  { value: 'CAPITEC', label: 'Capitec' },
  { value: 'BIDVEST', label: 'Bidvest' },
  { value: 'ABSA', label: 'Absa' },
];

const UploadOFXDialog = ({ open, onClose, onUpload }: UploadOFXDialogProps) => {
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleBankChange = (event: SelectChangeEvent<string>) => {
    setSelectedBank(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedBank || !selectedFile) return;

    setUploading(true);
    try {
      await onUpload(selectedBank, selectedFile);
      onClose();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setSelectedBank('');
    setSelectedFile(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        Upload OFX File
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="bank-select-label">Select Bank</InputLabel>
            <Select
              labelId="bank-select-label"
              value={selectedBank}
              label="Select Bank"
              onChange={handleBankChange}
            >
              {banks.map((bank) => (
                <MenuItem key={bank.value} value={bank.value}>
                  {bank.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ textAlign: 'center', py: 2, px: 3 }}>
          <input
            accept=".ofx"
            style={{ display: 'none' }}
            id="ofx-file-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="ofx-file-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<UploadIcon />}
              fullWidth
              sx={{ py: 2 }}
            >
              Choose OFX File
            </Button>
          </label>
          {selectedFile && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Selected file: {selectedFile.name}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!selectedBank || !selectedFile || uploading}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadOFXDialog;
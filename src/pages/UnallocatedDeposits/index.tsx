import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  InputAdornment,
  Chip,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import DataTable from "../../components/Table/DataTable";
import UploadOFXDialog from "../../components/Dialogs/UploadOFXDialog";
import React from "react";

// Generate sample data
const createData = (
  id: number,
  date: string,
  referenceNumber: string,
  recipient: string,
  currency: string,
  grossAmount: number,
  fees: string,
  status: "Pending"
) => {
  return {
    id,
    date,
    referenceNumber,
    recipient,
    currency,
    grossAmount,
    fees,
    status,
  };
};

const rows = Array.from({ length: 50 }, (_, index) =>
  createData(
    index + 1,
    `${Math.floor(Math.random() * 28) + 1}/${
      Math.floor(Math.random() * 12) + 1
    }/2024`,
    `${Math.floor(100000 + Math.random() * 900000)}`,
    `Recipient ${index + 1}`,
    ["USD", "EUR", "GBP", "ZAR"][Math.floor(Math.random() * 4)],
    Math.floor(100 + Math.random() * 9900),
    `${Math.floor(Math.random() * 1.5)}.00`,
    "Pending"
  )
);

const Unallocated: React.FC = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [referenceFilter, setReferenceFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [amountFilter, setAmountFilter] = useState("");
  const [orderBy, setOrderBy] = useState<keyof (typeof rows)[0]>("date");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [transactions, setTransactions] = React.useState<any>(rows);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const handleUploadOFX = () => {
    setUploadDialogOpen(true);
  };

  const handleUploadSubmit = async (bank: string, file: File) => {
    try {
      // Simulate API call
      console.log('Uploading file:', file.name, 'for bank:', bank);
      
      // Simulate success response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, just close the dialog
      setUploadDialogOpen(false);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const columns = [
    { id: "serial", label: "S.No" },
    { id: "date", label: "Date" },
    { id: "referenceNumber", label: "Reference Number" },
    { id: "recipient", label: "Recipient" },
    { id: "currency", label: "Currency" },
    { id: "grossAmount", label: "Gross Amount", numeric: true, editable: true },
    { id: "fees", label: "Fees", numeric: true },
    {
      id: "status",
      label: "Status",
      format: (value: string) => (
        <Chip
          label={value}
          size="small"
          sx={{
            backgroundColor:
              value === "Completed"
                ? "success.light"
                : value === "Failed"
                ? "error.light"
                : "#D2E5F9",
            color:
              value === "Completed"
                ? "success.dark"
                : value === "Failed"
                ? "error.dark"
                : "#000000",
            borderRadius: 1,
          }}
        />
      ),
    },
  ];

  // Filtering logic
  const filteredRows = useMemo(() => {
    return transactions.filter(
      (row: {
        referenceNumber: string;
        recipient: string;
        grossAmount: number | string;
        date: string;
      }) => {
        const matchesReference =
          referenceFilter === "" ||
          row.referenceNumber
            .toLowerCase()
            .includes(referenceFilter.toLowerCase());
        const matchesName =
          nameFilter === "" ||
          row.recipient.toLowerCase().includes(nameFilter.toLowerCase());
        const matchesAmount =
          amountFilter === "" ||
          row.grossAmount.toString().includes(amountFilter);
        const matchesStartDate =
          !startDate ||
          dayjs(row.date, "DD/MM/YYYY").isAfter(
            startDate.subtract(1, "day")
          );
        const matchesEndDate =
          !endDate ||
          dayjs(row.date, "DD/MM/YYYY").isBefore(
            endDate.add(1, "day")
          );
        return (
          matchesReference &&
          matchesName &&
          matchesAmount &&
          matchesStartDate &&
          matchesEndDate
        );
      }
    );
  }, [
    transactions,
    referenceFilter,
    nameFilter,
    amountFilter,
    startDate,
    endDate,
  ]);

  // Sorting logic
  const sortedRows = useMemo(() => {
    const sorted = [...filteredRows].sort((a, b) => {
      let aValue = a[orderBy as keyof typeof a];
      let bValue = b[orderBy as keyof typeof b];
      if (orderBy === "date") {
        aValue = dayjs(aValue, "DD/MM/YYYY").toDate().getTime();
        bValue = dayjs(bValue, "DD/MM/YYYY").toDate().getTime();
      }
      if (orderBy === "grossAmount" || orderBy === "fees") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }
      if (aValue < bValue) return order === "asc" ? -1 : 1;
      if (aValue > bValue) return order === "asc" ? 1 : -1;
      return 0;
    });
    return sorted.map((row, idx) => ({
      serial: idx + 1,
      ...row,
    }));
  }, [filteredRows, orderBy, order]);

  const clearFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setReferenceFilter("");
    setNameFilter("");
    setAmountFilter("");
  };

  const handleMatch = (row: any) => {
    navigate("/unallocated/match", {
      state: {
        transaction: {
          date: row.date,
          referenceNumber: row.referenceNumber,
          recipient: row.recipient,
          currency: row.currency,
          amount: row.grossAmount,
        },
      },
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        {/* Search Form */}
        <Paper
          elevation={0}
          sx={{ p: 1, mb: 3, border: "1px solid", borderColor: "divider" }}
        >
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={12} md={2}>
              <DatePicker
                label="From Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{ textField: { fullWidth: true, size: "small" } }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <DatePicker
                label="To Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{ textField: { fullWidth: true, size: "small" } }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Reference Number"
                variant="outlined"
                size="small"
                value={referenceFilter}
                onChange={(e) => setReferenceFilter(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Recipient Name"
                variant="outlined"
                size="small"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Amount"
                variant="outlined"
                size="small"
                value={amountFilter}
                onChange={(e) => setAmountFilter(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} sx={{ display: "flex", gap: 1 }}>
              <Button variant="outlined" onClick={clearFilters}>
                Clear
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUploadOFX}
              >
                Upload OFX
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Table */}
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <DataTable
            columns={columns}
            rows={sortedRows}
            defaultOrderBy={orderBy}
            defaultOrder={order}
            actions={(row: any) => (
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={() => handleMatch(row)}
              >
                Match
              </Button>
            )}
          />
        </Paper>

        <UploadOFXDialog
          open={uploadDialogOpen}
          onClose={() => setUploadDialogOpen(false)}
          onUpload={handleUploadSubmit}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default Unallocated;
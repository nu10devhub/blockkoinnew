import { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  useTheme,
  alpha,
  Button,
} from '@mui/material';

export interface TransactionColumn {
  id: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  format?: (value: any, row: any) => string | JSX.Element;
}

export interface TransactionRow {
  id: string | number;
  [key: string]: any;
}

interface TransactionTableProps {
  columns: TransactionColumn[];
  rows: TransactionRow[];
  title?: string;
  showViewAll?: boolean;
  onViewAll?: () => void;
  pagination?: boolean;
  maxHeight?: string;
}

const TransactionTable = ({
  columns,
  rows,
  title,
  showViewAll = false,
  onViewAll,
  pagination = true,
  maxHeight = '600px',
}: TransactionTableProps) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = pagination 
    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : rows;

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        overflow: 'hidden',
        backgroundColor: 'background.paper',
      }}
    >
      {/* Header */}
      {(title || showViewAll) && (
        <Box
          sx={{
            p: 3,
            pb: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: alpha(theme.palette.grey[50], 0.5),
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          {title && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
              }}
            >
              {title}
            </Typography>
          )}
          {showViewAll && onViewAll && (
            <Button
              variant="text"
              onClick={onViewAll}
              sx={{
                color: 'primary.main',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              View All
            </Button>
          )}
        </Box>
      )}

      {/* Table */}
      <TableContainer sx={{ maxHeight }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: 'text.primary',
                    py: 2.5,
                    backgroundColor: alpha(theme.palette.grey[50], 0.8),
                    borderBottom: '2px solid',
                    borderBottomColor: 'divider',
                    width: column.width,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => (
              <TableRow
                key={row.id}
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
                {columns.map((column) => (
                  <TableCell
                    key={`${row.id}-${column.id}`}
                    align={column.align || 'left'}
                    sx={{ width: column.width }}
                  >
                    {column.format 
                      ? column.format(row[column.id], row)
                      : row[column.id]
                    }
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {visibleRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No transactions found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {pagination && rows.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={rows.length}
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
      )}
    </Box>
  );
};

export default TransactionTable;
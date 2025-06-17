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
  TableSortLabel,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Tooltip,
  useTheme
} from '@mui/material';
import { 
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon
} from '@mui/icons-material';

export type Order = 'asc' | 'desc';

export interface Column {
  id: string;
  label: string | JSX.Element;
  numeric?: boolean;
  width?: number;
  editable?: boolean;
  format?: (value: any, row: any) => string | JSX.Element;
}

interface DataTableProps {
  columns: Column[];
  rows: any[];
  defaultOrderBy?: string;
  defaultOrder?: Order;
  onEditSave?: (id: number | string, field: string, value: any) => void;
  actions?: (row: any) => JSX.Element;
}

const DataTable = ({ 
  columns, 
  rows, 
  defaultOrderBy = 'date',
  defaultOrder = 'asc',
  onEditSave,
  actions 
}: DataTableProps) => {
  const theme = useTheme();
  const [order, setOrder] = useState<Order>(defaultOrder);
  const [orderBy, setOrderBy] = useState<string>(defaultOrderBy);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingCell, setEditingCell] = useState<{id: number | string, field: string} | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditStart = (id: number | string, field: string, value: any) => {
    setEditingCell({ id, field });
    setEditValue(String(value));
  };

  const handleEditCancel = () => {
    setEditingCell(null);
  };

  const handleEditSave = () => {
    if (editingCell && onEditSave) {
      onEditSave(editingCell.id, editingCell.field, editValue);
    }
    setEditingCell(null);
  };

  const sortData = (data: any[]) => {
    return data.sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }

      return 0;
    });
  };

  const sortedRows = sortData([...rows]);
  const visibleRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 340px)' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.numeric ? 'right' : 'left'}
                  width={column.width}
                  sx={{ 
                    fontWeight: 600,
                    backgroundColor: theme.palette.background.default 
                  }}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => handleRequestSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              {actions && (
                <TableCell
                  sx={{ 
                    fontWeight: 600,
                    backgroundColor: theme.palette.background.default 
                  }}
                >
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => (
              <TableRow key={row.id} hover>
                {columns.map((column) => (
                  <TableCell 
                    key={`${row.id}-${column.id}`}
                    align={column.numeric ? 'right' : 'left'}
                  >
                    {editingCell?.id === row.id && editingCell?.field === column.id ? (
                      <TextField
                        size="small"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        autoFocus
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton 
                                size="small" 
                                onClick={handleEditSave}
                                color="primary"
                              >
                                <SaveIcon fontSize="small" />
                              </IconButton>
                              <IconButton 
                                size="small" 
                                onClick={handleEditCancel}
                                color="default"
                              >
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{ width: 150 }}
                      />
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: column.numeric ? 'flex-end' : 'flex-start' }}>
                        {column.format ? column.format(row[column.id], row) : row[column.id]}
                        {column.editable && (
                          <Tooltip title={`Edit ${column.label}`}>
                            <IconButton
                              size="small"
                              onClick={() => handleEditStart(row.id, column.id, row[column.id])}
                              sx={{ ml: 1 }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    )}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell>
                    {actions(row)}
                  </TableCell>
                )}
              </TableRow>
            ))}
            {visibleRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length + (actions ? 1 : 0)} align="center" sx={{ py: 3 }}>
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default DataTable;
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  useTheme,
  alpha,
  Divider,
} from '@mui/material';

// Types for API integration
interface ReportItem {
  id: string;
  name: string;
  description?: string;
  category: 'operational' | 'statuary';
  isAvailable: boolean;
  lastGenerated?: string;
}

interface ReportCategory {
  id: string;
  title: string;
  type: 'operational' | 'statuary';
  reports: ReportItem[];
}

// Mock data for demonstration
const mockReportCategories: ReportCategory[] = [
  {
    id: 'operational',
    title: 'Operational',
    type: 'operational',
    reports: [
      {
        id: 'deposits-fnb',
        name: 'FNB',
        category: 'operational',
        isAvailable: true,
        description: 'Deposits Per Bank (Pending Release)',
        lastGenerated: '2024-01-15T10:30:00Z',
      },
      {
        id: 'deposits-standard',
        name: 'Standard',
        category: 'operational',
        isAvailable: true,
        description: 'Deposits Per Bank (Pending Release)',
        lastGenerated: '2024-01-15T10:30:00Z',
      },
      {
        id: 'deposits-absa',
        name: 'ABSA',
        category: 'operational',
        isAvailable: true,
        description: 'Deposits Per Bank (Pending Release)',
        lastGenerated: '2024-01-15T10:30:00Z',
      },
      {
        id: 'withdrawals-fnb',
        name: 'FNB',
        category: 'operational',
        isAvailable: true,
        description: 'Withdrawals Per Bank (Pending Release)',
        lastGenerated: '2024-01-15T10:30:00Z',
      },
      {
        id: 'withdrawals-standard',
        name: 'Standard',
        category: 'operational',
        isAvailable: true,
        description: 'Withdrawals Per Bank (Pending Release)',
        lastGenerated: '2024-01-15T10:30:00Z',
      },
      {
        id: 'withdrawals-absa',
        name: 'ABSA',
        category: 'operational',
        isAvailable: true,
        description: 'Withdrawals Per Bank (Pending Release)',
        lastGenerated: '2024-01-15T10:30:00Z',
      },
    ],
  },
  {
    id: 'statuary',
    title: 'Statuary',
    type: 'statuary',
    reports: [
      {
        id: 'revenue',
        name: 'Revenue',
        category: 'statuary',
        isAvailable: true,
        lastGenerated: '2024-01-15T10:30:00Z',
      },
      {
        id: 'vat',
        name: 'VAT',
        category: 'statuary',
        isAvailable: true,
        lastGenerated: '2024-01-15T10:30:00Z',
      },
      {
        id: 'revenue-wtd',
        name: 'Revenue WTD',
        category: 'statuary',
        isAvailable: true,
        lastGenerated: '2024-01-15T10:30:00Z',
      },
      {
        id: 'revenue-mtd',
        name: 'Revenue MTD',
        category: 'statuary',
        isAvailable: true,
        lastGenerated: '2024-01-15T10:30:00Z',
      },
      {
        id: 'revenue-custom',
        name: 'Revenue Custom',
        category: 'statuary',
        isAvailable: true,
        lastGenerated: '2024-01-15T10:30:00Z',
      },
      {
        id: 'transaction-status',
        name: 'Transaction Status',
        category: 'statuary',
        isAvailable: true,
        lastGenerated: '2024-01-15T10:30:00Z',
      },
      {
        id: 'cfum',
        name: 'CFUM',
        category: 'statuary',
        isAvailable: true,
        lastGenerated: '2024-01-15T10:30:00Z',
      },
      {
        id: 'agency-commission',
        name: 'Agency Commission',
        category: 'statuary',
        isAvailable: true,
        lastGenerated: '2024-01-15T10:30:00Z',
      },
      {
        id: 'agency-agent-list',
        name: 'Agency Agent List',
        category: 'statuary',
        isAvailable: true,
        lastGenerated: '2024-01-15T10:30:00Z',
      },
    ],
  },
];

const ReportsPage = () => {
  const theme = useTheme();
  const [reportCategories, setReportCategories] = useState<ReportCategory[]>(mockReportCategories);
  const [loading, setLoading] = useState(false);
  const [generatingReport, setGeneratingReport] = useState<string | null>(null);

  // API integration functions
  const fetchReports = async (): Promise<ReportCategory[]> => {
    // Replace with actual API call
    // const response = await fetch('/api/reports');
    // return response.json();
    return mockReportCategories;
  };

  const generateReport = async (reportId: string): Promise<void> => {
    // Replace with actual API call
    // const response = await fetch(`/api/reports/${reportId}/generate`, {
    //   method: 'POST',
    // });
    // const blob = await response.blob();
    // const url = window.URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = `${reportId}-report.pdf`;
    // a.click();
    
    console.log('Generating report:', reportId);
    // Mock generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const viewReport = async (reportId: string): Promise<void> => {
    // Replace with actual API call
    // const response = await fetch(`/api/reports/${reportId}/view`);
    // const blob = await response.blob();
    // const url = window.URL.createObjectURL(blob);
    // window.open(url, '_blank');
    
    console.log('Viewing report:', reportId);
    // Mock view functionality
    alert(`Opening report: ${reportId}`);
  };

  useEffect(() => {
    const loadReports = async () => {
      setLoading(true);
      try {
        const reports = await fetchReports();
        setReportCategories(reports);
      } catch (error) {
        console.error('Failed to load reports:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  const handleViewReport = async (reportId: string) => {
    setGeneratingReport(reportId);
    try {
      await viewReport(reportId);
    } catch (error) {
      console.error('Failed to view report:', error);
    } finally {
      setGeneratingReport(null);
    }
  };

  const ReportSection = ({ category }: { category: ReportCategory }) => {
    // Group reports by description for operational reports
    const groupedReports = category.type === 'operational' 
      ? category.reports.reduce((acc, report) => {
          const key = report.description || 'Other';
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(report);
          return acc;
        }, {} as Record<string, ReportItem[]>)
      : { 'Reports': category.reports };

    return (
      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          overflow: 'hidden',
          backgroundColor: 'background.paper',
          mb: 3,
        }}
      >
        {/* Category Header */}
        <Box
          sx={{
            p: 3,
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: 'primary.main',
              fontSize: '1.5rem',
            }}
          >
            {category.title}
          </Typography>
        </Box>

        {/* Reports Content */}
        <Box sx={{ p: 3 }}>
          {Object.entries(groupedReports).map(([groupName, reports], groupIndex) => (
            <Box key={groupName} sx={{ mb: groupIndex < Object.keys(groupedReports).length - 1 ? 4 : 0 }}>
              {/* Group Title for Operational Reports */}
              {category.type === 'operational' && groupName !== 'Reports' && (
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 2,
                    fontSize: '1.1rem',
                  }}
                >
                  {groupName}
                </Typography>
              )}

              {/* Reports Grid */}
              <Grid container spacing={2}>
                {reports.map((report) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={report.id}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: alpha(theme.palette.grey[50], 0.5),
                        border: '1px solid',
                        borderColor: alpha(theme.palette.divider, 0.5),
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.04),
                          borderColor: alpha(theme.palette.primary.main, 0.3),
                          transform: 'translateY(-1px)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        },
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                          color: 'text.primary',
                          fontSize: '0.95rem',
                        }}
                      >
                        {report.name}
                      </Typography>
                      
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleViewReport(report.id)}
                        disabled={!report.isAvailable || generatingReport === report.id}
                        sx={{
                          borderColor: 'primary.main',
                          color: 'primary.main',
                          textTransform: 'none',
                          fontWeight: 500,
                          fontSize: '0.875rem',
                          px: 2,
                          py: 0.5,
                          borderRadius: 1.5,
                          minWidth: 'auto',
                          '&:hover': {
                            borderColor: 'primary.dark',
                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                          },
                          '&:disabled': {
                            borderColor: 'grey.300',
                            color: 'grey.400',
                          },
                        }}
                      >
                        {generatingReport === report.id ? 'Loading...' : 'View'}
                      </Button>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
      </Paper>
    );
  };

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            mb: 1,
          }}
        >
          Reports
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            fontSize: '1rem',
          }}
        >
          Generate and view operational and statutory reports
        </Typography>
      </Box>

      {/* Report Categories */}
      {reportCategories.map((category) => (
        <ReportSection key={category.id} category={category} />
      ))}

      {/* Loading Overlay */}
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: alpha(theme.palette.common.white, 0.8),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <Typography variant="h6" sx={{ color: 'primary.main' }}>
            Loading reports...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ReportsPage;
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  useTheme,
  alpha,
} from '@mui/material';
import { 
  TrendingUp as TrendingUpIcon,
  Info as InfoIcon 
} from '@mui/icons-material';

// Types for API integration
interface DashboardMetrics {
  totalFundsUnderManagement: number;
  totalCash: number;
  unmatchedFunds: number;
  pendingRelease: number;
  amountDueToTA: number;
  amountFromTA: number;
  revenue: number;
  newClientAccounts: number;
  firstTimeDeposits: number;
}

interface APIStatus {
  name: string;
  status: 'online' | 'warning' | 'offline';
}

// Mock data - replace with actual API calls
const mockMetrics: DashboardMetrics = {
  totalFundsUnderManagement: 999999999999999.99,
  totalCash: 999999999999999.99,
  unmatchedFunds: 999999999999999.99,
  pendingRelease: 999999999999999.99,
  amountDueToTA: 999999999999999.99,
  amountFromTA: 999999999999999.99,
  revenue: 999999999999999.99,
  newClientAccounts: 99999,
  firstTimeDeposits: 99999,
};

const mockAPIStatuses: APIStatus[] = [
  { name: 'Exchange', status: 'online' },
  { name: 'Xero', status: 'online' },
  { name: 'Fireblocks', status: 'warning' },
  { name: 'Referal Factory', status: 'online' },
  { name: 'Payment Gateway', status: 'warning' },
  { name: 'Hubspot', status: 'online' },
  { name: 'OpenPayd', status: 'online' },
  { name: 'Rates', status: 'online' },
  { name: 'Crypto.com', status: 'online' },
  { name: 'iFrame', status: 'online' },
  { name: 'SumSub', status: 'online' },
  { name: 'Webhooks', status: 'online' },
];

const Dashboard = () => {
  const theme = useTheme();
  const [metrics, setMetrics] = useState<DashboardMetrics>(mockMetrics);
  const [apiStatuses, setAPIStatuses] = useState<APIStatus[]>(mockAPIStatuses);
  const [loading, setLoading] = useState(false);

  // API integration functions
  const fetchDashboardMetrics = async (): Promise<DashboardMetrics> => {
    // Replace with actual API call
    // const response = await fetch('/api/dashboard/metrics');
    // return response.json();
    return mockMetrics;
  };

  const fetchAPIStatuses = async (): Promise<APIStatus[]> => {
    // Replace with actual API call
    // const response = await fetch('/api/dashboard/api-status');
    // return response.json();
    return mockAPIStatuses;
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const [metricsData, statusData] = await Promise.all([
          fetchDashboardMetrics(),
          fetchAPIStatuses(),
        ]);
        setMetrics(metricsData);
        setAPIStatuses(statusData);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();

    // Set up auto-refresh every 30 seconds
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return theme.palette.success.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'offline':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[400];
    }
  };

  const MetricCard = ({ 
    title, 
    value, 
    isCurrency = true, 
    color = theme.palette.primary.main,
    showTrend = false 
  }: {
    title: string;
    value: number;
    isCurrency?: boolean;
    color?: string;
    showTrend?: boolean;
  }) => (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: color,
          boxShadow: `0 4px 20px ${alpha(color, 0.1)}`,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography
            variant="body1"
            sx={{
              color: color,
              fontWeight: 600,
              fontSize: '1rem',
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
          {showTrend && (
            <TrendingUpIcon sx={{ color: color, fontSize: 20 }} />
          )}
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: '1.75rem',
            color: 'text.primary',
            lineHeight: 1.2,
            wordBreak: 'break-all',
          }}
        >
          {isCurrency ? formatCurrency(value) : formatNumber(value)}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 0 }}>
      {/* Main Metrics Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Top Row - Large Cards */}
        <Grid item xs={12} md={6}>
          <MetricCard
            title="Total Company Funds Under Management"
            value={metrics.totalFundsUnderManagement}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MetricCard
            title="Total Cash"
            value={metrics.totalCash}
            color={theme.palette.primary.main}
          />
        </Grid>

        {/* Second Row */}
        <Grid item xs={12} md={6}>
          <MetricCard
            title="Unmatched Funds"
            value={metrics.unmatchedFunds}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MetricCard
            title="Pending Release"
            value={metrics.pendingRelease}
            color={theme.palette.primary.main}
          />
        </Grid>

        {/* Third Row */}
        <Grid item xs={12} md={6}>
          <MetricCard
            title="Amount due to TA"
            value={metrics.amountDueToTA}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MetricCard
            title="Amount from to TA"
            value={metrics.amountFromTA}
            color={theme.palette.primary.main}
          />
        </Grid>

        {/* Bottom Row - Smaller Cards */}
        <Grid item xs={12} md={4}>
          <MetricCard
            title="Revenue"
            value={metrics.revenue}
            color={theme.palette.primary.main}
            showTrend
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard
            title="New Client Accounts"
            value={metrics.newClientAccounts}
            isCurrency={false}
            color={theme.palette.primary.main}
            showTrend
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard
            title="1st Time Deposits"
            value={metrics.firstTimeDeposits}
            isCurrency={false}
            color={theme.palette.primary.main}
            showTrend
          />
        </Grid>
      </Grid>

      {/* API Status Panel */}
      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            p: 3,
            backgroundColor: alpha(theme.palette.grey[50], 0.5),
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
              }}
            >
              All API & Webhooks
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                ml: 'auto',
              }}
            >
              Status
            </Typography>
          </Box>
        </Box>

        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            {apiStatuses.map((api, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: alpha(getStatusColor(api.status), 0.05),
                    border: '1px solid',
                    borderColor: alpha(getStatusColor(api.status), 0.2),
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: alpha(getStatusColor(api.status), 0.1),
                      borderColor: getStatusColor(api.status),
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: 'text.primary',
                    }}
                  >
                    {api.name}
                  </Typography>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: getStatusColor(api.status),
                      boxShadow: `0 0 0 2px ${alpha(getStatusColor(api.status), 0.2)}`,
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>

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
            Loading dashboard data...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
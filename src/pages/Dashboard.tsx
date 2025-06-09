import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Welcome to your Blockkoin dashboard overview
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {[1, 2, 3, 4].map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item}>
            <Card elevation={0} sx={{ height: '100%', border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Dashboard Widget {item}
                </Typography>
                <Typography variant="h5" component="div">
                  {item * 1000}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  This is a placeholder dashboard card.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper elevation={0} sx={{ mt: 3, p: 3, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" gutterBottom>
          Activity Overview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is a placeholder for dashboard content. Please go to the Unallocated page to see the implemented table functionality.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Dashboard;
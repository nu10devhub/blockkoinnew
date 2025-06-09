import { Box, Typography, Paper } from '@mui/material';

interface EmptyPageProps {
  title: string;
}

const EmptyPage = ({ title }: EmptyPageProps) => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>
      <Paper 
        elevation={0} 
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          minHeight: 300,
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Typography variant="h6" color="text.secondary" align="center">
          This section is under development
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          The content for this page will be added later as requested.
        </Typography>
      </Paper>
    </Box>
  );
};

export default EmptyPage;
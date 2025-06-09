import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@mui/material',
      '@mui/material/styles',
      '@mui/icons-material',
      '@mui/material/utils',
      'react-router-dom'
    ],
    exclude: ['lucide-react']
  }
  // No resolve.alias for @mui/material or @mui/icons-material
});

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mui/icons-material': '@mui/icons-material/esm',
      '@mui/material': '@mui/material/esm',
    },
  },
})

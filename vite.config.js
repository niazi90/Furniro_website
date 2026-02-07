import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom'],
          
          // Routing
          'router': ['react-router-dom'],
          
          // Icons (large library)
          'icons': ['react-icons', 'lucide-react'],
          
          // Charts (very large)
          'charts': ['recharts'],
          
          // Utilities
          'utils': ['axios', 'date-fns']
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Warning limit barhane ke liye
  }
})
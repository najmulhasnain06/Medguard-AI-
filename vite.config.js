import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Proxy /api requests to the Express backend during development.
  // This means the frontend on :5173 can call /api/analyze
  // and Vite forwards it to the backend on :3001.
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})

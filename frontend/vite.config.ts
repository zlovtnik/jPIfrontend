import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// NOTE: By default the frontend code uses '/api' as the API base.
// In development this will 404 unless you either:
//  - set VITE_API_URL to your backend (e.g. http://localhost:3000)
//  - or proxy /api to your backend via Vite's dev server proxy (configured below)
// Update the proxy target to match your backend dev URL.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // proxy any request starting with /api to the backend server
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        // optional: rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

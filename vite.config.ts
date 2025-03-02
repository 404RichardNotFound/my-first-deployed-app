import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Use polling if HMR is not working
    },
    hmr: {
      overlay: true, // Shows errors without full refresh
    }
  }
})

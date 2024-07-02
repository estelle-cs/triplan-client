import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
   watch: {
    usePolling: true,
   },
   hmr: true,
   host: true,
   port: 4000, 
 }
})

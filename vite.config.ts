import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // With this, fetch('/api') will request to http://localhost:5000/ in development for example.
    proxy: {  // Point to different URL in development mode.
      '/api': {
        target: 'http://localhost:3000',  // Port for backend API.
        changeOrigin: true,  // ensures the Host header matches the target.
        secure: false,  // If using HTTPS with self-signed certs.
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Remove '/api' prefix.
      },
    },
  },
})

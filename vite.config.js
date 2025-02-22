import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        target: 'https://chat-application-backend-znue.onrender.com',
        changeOrigin: true,
        ws: true,
      },
    },
  },
});

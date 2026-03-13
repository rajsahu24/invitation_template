import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  envPrefix: ['VITE_', 'PUBLIC_'],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      external: ['@vercel/og'],
    },
  },
  server: {
    headers: {
      'Cache-Control': 'no-store',
    },
  },
  esbuild: {
    jsx: 'automatic',
  },
})

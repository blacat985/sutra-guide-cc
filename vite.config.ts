import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['iOS >= 11', 'Safari >= 11'],
      modernPolyfills: true,
      renderLegacyChunks: true,
    })
  ],
  base: process.env.GITHUB_ACTIONS ? '/sutra-guide-cc/' : '/',
  server: {
    port: 5173
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['iOS >= 11', 'Safari >= 11'],
      modernPolyfills: false,  // Don't load polyfills in modern browsers
      renderLegacyChunks: true,
    })
  ],
  base: process.env.GITHUB_ACTIONS ? '/sutra-guide-cc/' : '/',
  server: {
    port: 5173
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React and React DOM into separate chunk
          'react-vendor': ['react', 'react-dom', 'react/jsx-runtime'],
          // Split React Router into separate chunk
          'router-vendor': ['react-router-dom'],
          // Split Chakra UI into separate chunk
          'chakra-vendor': ['@chakra-ui/react', '@chakra-ui/icons'],
          // Split YAML parser into separate chunk
          'yaml-vendor': ['js-yaml'],
          // Split Markdown renderer into separate chunk
          'markdown-vendor': ['react-markdown'],
        },
      },
    },
    // Increase chunk size warning limit to 600KB (from 500KB)
    chunkSizeWarningLimit: 600,
  },
})

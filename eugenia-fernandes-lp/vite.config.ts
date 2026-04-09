import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      react: '@preact/compat',
      'react-dom': '@preact/compat',
      'react/jsx-runtime': '@preact/compat/jsx-runtime',
    },
  },
  build: {
    cssMinify: 'lightningcss',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})

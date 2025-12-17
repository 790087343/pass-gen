import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  ssr: {
    resolve: {
      conditions: ['development', 'browser'],
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
    cssCodeSplit: false,
  },
})


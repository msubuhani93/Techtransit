import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages deployment - use repository name as base
// If your repo is: https://github.com/username/tech-transit-portal
// Then base should be: '/tech-transit-portal/'
// For root domain, use: '/'
const base = process.env.NODE_ENV === 'production' ? '/Techtransit/' : '/'

export default defineConfig({
  base: base,
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})

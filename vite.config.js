import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Todo-List-Web-App/',  // set this to your repo name, with leading and trailing slash
  plugins: [react()],
})

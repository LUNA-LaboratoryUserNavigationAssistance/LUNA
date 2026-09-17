import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site: https://<username>.github.io/LUNA/
// If you ever rename the repo, update this to match: '/<repo-name>/'.
export default defineConfig({
  plugins: [react()],
  base: '/LUNA/',
})

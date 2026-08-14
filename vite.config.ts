import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    // gsap, motion e as seções abaixo da dobra já saem em chunks próprios
    // por serem importados dinamicamente — sem manualChunks manual.
  },
})

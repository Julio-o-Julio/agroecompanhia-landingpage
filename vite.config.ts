import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // No GitHub Pages o site é servido em /<nome-do-repo>/, então o workflow
  // injeta VITE_BASE. Em dev e em hosts com domínio próprio, continua em '/'.
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    // gsap, motion e as seções abaixo da dobra já saem em chunks próprios
    // por serem importados dinamicamente — sem manualChunks manual.
  },
})

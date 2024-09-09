import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias para la carpeta src
      '@test': path.resolve(__dirname, './__test__'), // Alias específico para la carpeta components
    },
  },
})

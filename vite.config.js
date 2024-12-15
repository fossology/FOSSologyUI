import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      styles: path.resolve(__dirname, "src/styles"),
      context: path.resolve(__dirname, "src/context"),
      Routes: path.resolve(__dirname, "src/Routes"),
      constants: path.resolve(__dirname, "src/constants"),
      shared: path.resolve(__dirname, "src/shared"),
      pages: path.resolve(__dirname, "src/pages"),
      services: path.resolve(__dirname, "src/services"),
      assets: path.resolve(__dirname, "src/assets"),
      api: path.resolve(__dirname, "src/api"),
      components: path.resolve(__dirname, "src/components"),
      data: path.resolve(__dirname, "src/data"),
      
    },
  },
})

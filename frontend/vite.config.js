import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "./dist", // Ensure the dist folder is inside the frontend directory
    emptyOutDir: true, // Automatically clean the directory before each build
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Backend server
        changeOrigin: true,
        secure: false, // Set to true if your backend uses HTTPS
      },
    },
  },
});

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api/v1": {
        target: "https://api.marketx87.com",
        changeOrigin: true,
        secure: false,
      },
      "/files": {
        target: "https://api.marketx87.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  preview: {
    host: true,
    port: 3000,
  },
  server: {
    host: true,
    port: 3000,
  },
});

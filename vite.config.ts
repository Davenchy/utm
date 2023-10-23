import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import webExtension from "@samrum/vite-plugin-web-extension";
import manifest from "./manifest.json";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  plugins: [
    react(),
    webExtension({
      manifest,
      useDynamicUrlWebAccessibleResources: false
    })
  ]
});

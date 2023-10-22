import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import webExtension from "@samrum/vite-plugin-web-extension";
import manifest from "./manifest.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    webExtension({
      manifest,
      useDynamicUrlWebAccessibleResources: false
    })
  ]
});

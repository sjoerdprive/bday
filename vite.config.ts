import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    manifest: "manifest.json",
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    VitePWA({
      includeAssets: ["box.png"],
      manifest: {
        name: "Verrassing",
        short_name: "Verrassing",
        theme_color: "#ffffff",
        icons: [
          {
            src: "box.png",
            sizes: "192x192",
            type: "image/png",
          },
        
        ],
      },
    }),
  ],
});

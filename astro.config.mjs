import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { fileURLToPath } from "node:url";
import { imageService } from "@unpic/astro/service";

export default defineConfig({
  site: "https://car1.by",
  integrations: [react(), tailwind(), sitemap()],
  server: {
    port: 4321,
    host: true,
    proxy: { "/wp-json": "http://localhost:8080" },
  },
  prefetch: true,
  vite: {
    optimizeDeps: { include: ["intl-tel-input", "intl-tel-input/react"] },
    ssr: { noExternal: ["intl-tel-input"] },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@assets": "/src/assets",
        "@components": "/src/components",
        "@layouts": "/src/layouts",
        "@styles": "/src/styles",
        "@utils": "/src/utils",
        "@stores": "/src/stores",
      },
    },
  },
});

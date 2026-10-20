import { fileURLToPath, URL } from "node:url";

import { defineConfig, Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

import path from "node:path";
import { readFileSync } from "node:fs";

// https://vite.dev/config/
export default defineConfig((ctx) => ({
  plugins: [vue(), vueDevTools(), copyConfigPlugin(ctx.mode)],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
}));

function copyConfigPlugin(mode: string): Plugin {
  const configPath = path.resolve(process.cwd(), `config/config-${mode}.json`);

  const configName = "app-config.json";

  return {
    name: "config-copy",
    configureServer(server) {
      server.middlewares.use(`/${configName}`, (_, res) => {
        const content = readFileSync(configPath, "utf-8");

        res.setHeader("Content-Type", "application/json");

        res.end(content);
      });
    },
    generateBundle() {
      const content = readFileSync(configPath, "utf-8");

      this.emitFile({
        type: "asset",
        fileName: configName,
        source: content,
      });
    },
  };
}

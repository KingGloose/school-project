import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import { viteElectronDev } from "./config/vite.electron.dev";
import { viteElectronBuild } from "./config/vite.electron.build";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteElectronDev(),
    viteElectronBuild(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  base: "./",
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/css/variables.scss";`
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
});

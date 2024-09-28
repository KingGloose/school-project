// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["normalize.css", "@/assets/style/global.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@use '@/assets/style/variable.scss' as *;",
        },
      },
    },
  },
});

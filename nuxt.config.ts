// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt'],
  css: ['@/assets/css/main.css'],
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY
  },
  plugins: [{src: '~/plugins/piniaPersist.client.js'}],
  app: {
    head: {
      title: 'Řecepty',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/webp', href: '/favicon.ico' },
      ]
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})

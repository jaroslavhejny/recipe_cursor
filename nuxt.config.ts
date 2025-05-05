// https://nuxt.com/docs/api/configuration/nuxt-config
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
  app: {
    head: {
      title: 'Recipe App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  build: {
    transpile: ['@vueuse/core'],
  },
})

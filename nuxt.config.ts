// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  
  // Suppress Node.js deprecation warnings
  nitro: {
    experimental: {
      wasm: true
    }
  },
  
  // Handle punycode deprecation warning
  vite: {
    define: {
      global: 'globalThis'
    }
  }
})

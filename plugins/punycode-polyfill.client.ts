// plugins/punycode-polyfill.client.ts
// This plugin provides a polyfill for the deprecated punycode module

declare global {
  interface Window {
    punycode?: any;
  }
}

export default defineNuxtPlugin(() => {
  // Only run on client side
  if (process.client) {
    // Polyfill for punycode if needed
    if (typeof window !== 'undefined' && !window.punycode) {
      try {
        // Use the userland punycode package as a fallback
        const punycode = require('punycode/')
        window.punycode = punycode
      } catch (e) {
        // Fallback if punycode package is not available
        console.warn('Punycode polyfill not available')
      }
    }
  }
})

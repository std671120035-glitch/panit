export default defineNuxtConfig({
  ssr: false,
  devServer: {
    port: 5173,
    host: 'localhost'
  },
  css: ['~/assets/css/tailwind.css'],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:3000'
    }
  },
  modules: [
    '@nuxt/devtools'
  ],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {}
    }
  }

})

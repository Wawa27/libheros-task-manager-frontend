// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    modules: [
        '@nuxtjs/tailwindcss',
        'pinia-plugin-persistedstate/nuxt',
        '@pinia/nuxt'
    ],
    pinia: {
        storesDirs: ['./stores/**'],
    },
    ssr: false
})

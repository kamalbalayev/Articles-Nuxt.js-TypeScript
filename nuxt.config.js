export default {
  head: {
    title: 'Growix',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
  ],

  plugins: [
  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
  ],

  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/universal-storage',
    'nuxt-i18n',
  ],

  axios: {
      https: true,
      baseURL: 'https://jsonplaceholder.typicode.com/',
      retry: {retries: 3},
      headers: {
          "content-type": "application/json",
          "accept": "application/json",
      }
  },

  i18n: {
    defaultLocale: 'en',
    locale: 'en',
    locales: [
      {code: 'en', iso: 'en', file: 'en_US.js', name: 'English'},
      {code: 'ru', iso: 'ru', file: 'ru_RU.js', name: 'Русский'},
    ],
    lazy: true,
    langDir: 'lang/',
    vuex: {
      syncLocale: true,
    },
    seo: true,
    detectBrowserLanguage: false,
    intervalPlural: true,
    parsePages: false,
    pages: {
      'posts/index': {
        en: '/posts',
        ru: '/stati',
      }
    }
  },

  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  build: {
  }
}

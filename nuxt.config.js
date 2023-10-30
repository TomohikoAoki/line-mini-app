export default {
  target: "static",
  head: {
    title: "LIFF Starter",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~assets/css/destyle.css", "~assets/css/common.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/liff-init.client.js", // add liff.init() plugin
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/dotenv"],
  dotenv: {
    path: process.cwd(),
  },

  //loading component
  loading: "./components/Loading.vue",

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  axios: {
    proxy: true
  },

  proxy: {
    '/api3/': {
      target: 'https://sysf.heartful.work/epoints/',   //APIのURL
      pathRewrite: { '^/api/': '' }
    },
    '/api2/': {
      target: 'https://uranai.heartf.com/Public/',   //APIのURL
      pathRewrite: { '^/api/': '' }
    }
  },

  env: {
    LIFF_ID: process.env.LIFF_ID,
  },
};

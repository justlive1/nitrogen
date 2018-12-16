module.exports = {
  baseUrl: '',
  runtimeCompiler: true,
  css: {
    modules: true,
    sourceMap: false
  },
  configureWebpack: {
    externals: {
      "vue": "Vue",
      "vuex": "Vuex",
      "axios": "axios"
    }
  }
}
module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/token': {
        target: process.env.VUE_APP_KKBOX_OAUTH,
        ws: true,
        changeOrigin: true
      }
    }
  }
}

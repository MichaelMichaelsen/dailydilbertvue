module.exports = {
  "devServer": {
    "proxy": {
      "/strip": {
        "target": "https://dilbert.com"
      },
      "/image": {
        "target": "http://assets.amuniversal.com",
        "pathRewrite": {
          "^/image": ""
        }
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}
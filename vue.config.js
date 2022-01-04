// vue.config.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  // 添加全局样式
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach((type) => addStyleResource(config.module.rule('scss').oneOf(type)))
  },
  configureWebpack: {
    module: {
      unknownContextCritical: false
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        ws: true,
        pathRewrite:{
          '^/api': ''
        }
      },
      '^/app': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        ws: true
      }
    }
  }
}

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/styles/GLOBAL_VARIABLE.scss'), path.resolve(__dirname, './src/styles/GLOBAL_STYLE.scss')]
    })
}

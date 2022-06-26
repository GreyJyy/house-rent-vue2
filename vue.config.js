const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true, //自定义样式第二步
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            // 'nav-bar-background-color': '#007bff',
            // 'nav-bar-title-text-color': '#fff',
            // 'nav-bar-icon-color': '#fff'
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${path.resolve('src/styles/cover.less')}";`
          }
        }
      }
    }
  },
  publicPath: './'
})

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap:false,
  lintOnSave:true,
  devServer: {
    proxy:{
      '/api':{
        target:"http://gmall-h5-api.atguigu.cn"
      }
    }
  }
})

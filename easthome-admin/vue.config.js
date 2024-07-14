const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    // 配置开发服务器
    devServer: {
        // 端口号
        port: 8001,
        // 启动后打开浏览器
        open: true
    },
    chainWebpack: config => {
        // 修改标签页标题
        config.plugin('html').tap(args => {
            args[0].title = '后台管理'
            return args
        });
    }
})

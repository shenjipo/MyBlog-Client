module.exports = {
    lintOnSave: false,
    publicPath: '/Blog/',
    devServer: {
        proxy: {
            '/api': {
                target:'http://localhost:3000',
                changeOrigin:'true', // 允许跨域

            }
        }
    }
}
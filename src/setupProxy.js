const {createProxyMiddleware} = require('http-proxy-middleware')
module.exports = function (app) {
    //ces
    app.use(createProxyMiddleware('/api',{
        target:'http://localhost:4000',
        // changeOrigin:false,
        pathRewrite:{
            '^/api':''
        }
    }))
}
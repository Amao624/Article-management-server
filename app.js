// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()
// 导入 cors 中间件
const cors = require('cors')

// 将 cors 注册为全局中间件------------中间件要配置在路由之前
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))
// app.use(express.static('./build'))

//设置跨域访问
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

//封装一个自定义的中间件,res.event函数
app.use(function (req, res, next) {
    res.event = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

//导入解析token的中间件
const expressJwt = require('express-jwt')
const tokenKey = require('./router_handler/config')
app.use(expressJwt({ secret: tokenKey.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))  //unless设置哪些接口不需要访问权限

// 导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
//导入并使用用户信息的路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)
//导入获取文章分类列表数据路由模块
const getArtcateRouter = require('./router/artcate')
app.use('/my/artcate', getArtcateRouter)
//导入文章数据路由模块
const getArticlesRouter = require('./router/articles')
app.use('/my/articles', getArticlesRouter)


//定义全局错误的中间件
const joi = require('joi')
app.use(function (err, req, res, next) {
    // 表单数据验证失败
    if (err instanceof joi.ValidationError) return res.event(err)
    // 身份认证失败后的错误
    if (err.name === 'UnauthorizedError') return res.event('身份认证失败！')
    //未知的错误
    res.event(err)
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(8888, function () {
    console.log('api server running at port=8888')
})
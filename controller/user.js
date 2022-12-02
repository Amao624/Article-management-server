/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
//引入加密处理
const bcrypt = require('bcryptjs')
//引入数据库
const db = require('../db/index')
//导入生成token的包
const jwt = require('jsonwebtoken')
//导入加密的密钥
const tokenKey = require('./config')


// 注册用户的处理函数
exports.regUser = (req, res) => {
    //获取客户端提交到服务器的信息
    const userinfo = req.body
    // 判断数据是否合法
    // if (!userinfo.username || !userinfo.password) return res.event('用户名或密码不能为空！')
    //SQL 查询语句并根据结果判断用户名是否被占用
    const sqlSelect = `select * from userinfo where username=?`

    // 执行 SQL 语句在数据库里搜索数据
    db.query(sqlSelect, userinfo.username, function (err, results) {
        // 判断执行 SQL 语句失败
        if (err) return res.event(err)
        // 用户名被占用
        if (results.length > 0) return res.event('用户名被占用，请更换其他用户名！')

        // TODO: 用户名可用，继续后续流程...
        //调用bcrypt.hashSync()对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        // SQL 插入语句并根据结果判断用户名是否被占用
        const sqlInsert = `insert into userinfo set ?`
        //执行 SQL 插入语句
        db.query(sqlInsert, { username: userinfo.username, password: userinfo.password }, (err, result) => {
            // 判断执行 SQL 语句失败
            if (err) return res.event(err)
            //判断影响行数是否为1
            if (result.affectedRows !== 1) return res.event('注册用户失败')
            //注册用户成功
            res.event('注册成功', 0)
        })
    })
}

// 登录的处理函数
exports.login = (req, res) => {
    //获取客户端提交到服务器的信息
    const userinfo = req.body
    //执行 SQL 查询语句并根据结果判断用户名是否被占用
    const sqlSelect = `select * from userinfo where username=?`
    db.query(sqlSelect, userinfo.username, function (err, result) {
        // 判断执行 SQL 语句失败
        if (err) return res.event(err)
        //执行 SQL 语句成功，但是获取到的数据条数不等于1
        if (result.length !== 1) return res.event('登陆失败！')
        // TODO: 登陆成功，继续后续流程...
        //拿着用户输入的密码，跟数据库的数据进行比对，调用bcrypt.compareSync(用户提交的密码，服务器里存储的密码)
        const compareResult = bcrypt.compareSync(userinfo.password, result[0].password)
        //比较结果，判断密码是否正确
        if (!compareResult) return res.event('登录失败！')

        //（JWT）Token 在生成Token字符串的时候，一定要剔除密码和头像的信息
        const user = { ...result[0], password: '', user_pic: '' }
        //生成Token字符串
        const tokenStr = jwt.sign(user, tokenKey.jwtSecretKey, { expiresIn: '1h' })
        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + tokenStr
        })
    })
}

// 退出登录的处理函数
exports.logout = (req, res) => {
    res.event('退出登录成功', 200)
}

// 获取文章信息的处理函数(标题，内容，发布时间)
exports.getArticles = (req, res) => {
    // 定义SQL查询语句
    const sqlSelect = `select title,content,pub_date from articles where is_delete = 0`
    db.query(sqlSelect, (err, results) => {
        //SQL语句执行失败
        if (err) return res.event(err)
        // 执行SQL语句成功，但是可能查询的结果为空
        if (results.length === 0) return res.event('获取文章信息失败！')
        res.send({
            status: 0,
            message: '获取文章信息成功',
            data: results,
        })
    })
}

// 根据文章id获取文章信息处理函数
exports.getArticlesById = (req, res) => {
    // 根据id查询文章数据库语句
    const sql = `select * from articles where id = ?`
    db.query(sql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.event(err)
        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.length === 0) return res.event('获取文章信息失败！')
        res.send({
            status: 0,
            message: '查询成功',
            data: results
        })
    })
}
/* 
    此处写文章的处理函数
*/

//导入数据库
const db = require('../db')
// 导入处理路径的 path 核心模块
// const path = require('path')
const moment = require('moment')
// const { send } = require('process')

// 获取文章信息的处理函数
exports.getArticles = (req, res) => {
    // 定义SQL查询语句
    const sqlSelect = `select * from articles where is_delete = 0`
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

// 发布文章的处理函数
exports.addArticles = (req, res) => {
    // 手动判断是否上传了文章封面
    // if (!req.file || req.file.fieldname !== 'cover_img') return res.event('文章封面是必选参数！')
    const articleInfo = {
        // 标题、内容、状态、所属的分类Id
        ...req.body,
        // 文章封面在服务器端的存放路径
        // cover_img: path.join('/uploads', req.file.filename),
        // 文章发布时间
        pub_date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        // 文章作者的Id
        author_id: req.user.id,
    }
    const sql = `insert into articles set ?`
    // 执行 SQL 语句
    db.query(sql, articleInfo, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.event(err)
        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.event('发布文章失败！')
        // 发布文章成功
        res.event('发布文章成功', 0)
    })
}

// 修改文章的处理函数
exports.changeArticles = (req, res) => {
    // 从req.body解构赋值
    const { title, id, content } = req.body
    // 定义查询语句
    const sql = `select * from articles where title = ?`
    db.query(sql, title, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.event(err)
        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.length === 1) return res.event('修改标题重复!')
        const sqlUpdate = `update articles set title=? , content=? where id = ?`
        db.query(sqlUpdate, [title, content, id], (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.event(err)
            // 执行 SQL 语句成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.event('修改文章失败!')
            res.event('修改文章成功', 0)
        })
    })
}

// 删除文章的处理函数
exports.deleteArticles = (req, res) => {
    const sql = `update articles set is_delete=1 where id=?`
    db.query(sql, req.body.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.event(err)
        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.event('删除文章失败！')
        res.event('删除文章成功', 0)
    })
}
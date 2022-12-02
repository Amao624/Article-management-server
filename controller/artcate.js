/* 
    此处写文章分类的处理函数
*/

//导入数据库
const db = require('../db')

//获取文章分类的处理函数
exports.getArtcate = (req, res) => {
    //文章分类表 SQL 查询语句
    const sqlSelect = `select * from article_cate where is_delete=0 order by id asc`
    db.query(sqlSelect, (err, results) => {
        //SQL语句执行失败
        if (err) return res.event(err)
        //SQL语句执行成功，但是可能查询的结果为空
        if (results.length === 0) return res.event('查询失败')
        res.send({
            status: 0,
            msg: '获取分类数据成功',
            data: results,
        })
    })
}

//根据id获取文章分类数据
exports.getArtcateById = (req, res) => {
    // SQL 查询语句
    const sqlSelect = `select * from article_cate where id=? and is_delete=0`
    db.query(sqlSelect, req.params.id, (err, results) => {
        // SQL语句执行失败
        if (err) return res.event(err)
        if (results.length === 0) return res.event('未查询到数据！')
        res.send({
            status: 0,
            msg: '数据查询成功',
            body: results
        })
    })
}

//增加文章分类的处理函数
exports.addArtcate = (req, res) => {
    //解构req.body
    const { name, alias } = req.body
    //查询分类名称是否已经存在
    const sqlSelect = `select * from article_cate where name=? or alias=?`
    db.query(sqlSelect, [name, alias], (err, results) => {
        //SQL语句执行失败
        if (err) return res.event(err)
        //SQL语句执行成功，查询到重复的数据
        if (results.length === 2) return res.event('该名称和别名都已存在！')
        if (results.length === 1 && results[0].name === name) return res.event('该名称已存在！')
        if (results.length === 1 && results[0].name === name && results[0].alias === alias) return res.event('该名称和别名都已存在！')
        if (results.length === 1 && results[0].alias === alias) return res.event('分类别名重复了！')

        //查询没有重复的分类名称，再执行下面的流程
        //插入新的分类名称 SQL 语句 
        const sqlInsert = `insert into article_cate set ?`
        db.query(sqlInsert, { name, alias }, (err, results) => {
            //SQL语句执行失败
            if (err) return res.event(err)
            if (results.affectedRows !== 1) return res.event('新增分类失败!')
            res.send({
                status: 0,
                message: '新建分类成功！',
            })
        })
    })
}

//删除文章分类的处理函数
exports.deleteArtcate = (req, res) => {
    //删除SQL语句
    const sqlDelete = `update article_cate set is_delete=1 where id=?`
    db.query(sqlDelete, req.body.id, (err, results) => {
        //SQL语句执行失败
        if (err) return res.event(err)
        //SQL语句执行成功，但是未删除数据
        if (results.affectedRows !== 1) return res.event('数据删除失败！')
        res.event('数据删除成功', 0)
    })
}

//更新文章分类的处理函数
exports.updateArtcate = (req, res) => {
    const { name, alias, id } = req.body
    // 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
    const sqlSelect = `select * from article_cate where id<>? and (name=? or alias=?) and is_delete=0`
    db.query(sqlSelect, [id, name, alias], (err, results) => {
        //SQL语句执行失败
        if (err) return res.event(err)
        //SQL语句执行成功，查询到重复的数据
        if (results.length === 2) return res.event('该名称和别名都被占用！')
        if (results.length === 1 && results[0].name === name && results[0].alias === alias) return res.event('该名称和别名都被占用！')
        if (results.length === 1 && results[0].name === name) return res.event('分类名称被占用了！')
        if (results.length === 1 && results[0].alias === alias) return res.event('分类别名被占用了！')

        // SQL 更新语句
        const sqlUpdate = `update article_cate set ? where id=?`
        db.query(sqlUpdate, [req.body, id], (err, results) => {
            //SQL语句执行失败
            if (err) return res.event(err)
            if (results.affectedRows !== 1) return res.event('更新数据失败')
            res.event('更新数据成功', 0)
        })
    })
}


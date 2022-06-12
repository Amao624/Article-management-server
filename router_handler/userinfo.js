/* 
    这是获取用户基本信息的处理函数
*/
//导入数据库
const db = require('../db')
// 加密算法
const bcrypt = require('bcryptjs')

//获取用户信息函数
exports.getUserInfo = (req, res) => {
    //获取用户信息的SQL查询语句
    const sqlSelect = `select id,username,nickname,email,user_pic from userinfo`
    //req.user.id是token解析成功，express-jwt中间件帮我们挂载上去的,只要身份认证成功了就会有该属性
    db.query(sqlSelect, req.user.id, (err, results) => {
        //SQL语句执行失败
        if (err) return res.event(err)
        //执行SQL语句成功，但是可能查询的结果为空
        if (results.length === 0) return res.event('获取用户信息失败！')
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results,
        })
    })
}

//更新用户信息函数
exports.updateUserInfo = (req, res) => {
    //获取到用户更新的信息
    const userUpdateInfo = [req.body, req.body.id]
    //更新用户信息的SQL查询语句
    const sqlUpdate = `update userinfo set ? where id=?`
    db.query(sqlUpdate, userUpdateInfo, (err, results) => {
        //SQL语句执行失败
        if (err) return res.event(err)
        //执行SQL语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.event('更新用户信息失败！')
        res.send({
            status: 0,
            msg: '用户信息更新成功',
        })
    })
}

//用户修改密码函数
exports.updatePassword = (req, res) => {
    //获取用户信息的SQL查询语句
    const sqlSelect = `select * from userinfo where id=?`
    db.query(sqlSelect, req.user.id, (err, results) => {
        //SQL语句执行失败
        if (err) return res.event(err)
        //执行SQL语句成功，但是可能查询的结果为空
        if (results.length !== 1) return res.event('用户不存在！')

        // TODO：判断提交的旧密码是否正确 compareSync() 来比较
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) return res.event('原密码错误！')

        //旧密码正确后,对新密码进行 bcrypt ，hashSync()方法加密之后，更新到数据库中：
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

        //根据到id查询到用户的信息，接下来再更新用户信息
        const sqlUpdate = `update userinfo set password=? where id=?`
        db.query(sqlUpdate, [newPwd, req.user.id], (err, results) => {
            // SQL 语句执行失败
            if (err) return res.event(err)
            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.event('更新密码失败！')
            // 更新密码成功
            res.send({
                status: 0,
                msg: '更新密码成功',
            })
        })
    })
}

//修改用户头像的函数
exports.updateAvater = (req, res) => {
    //更新用户信息
    const sqlUpdate = `update userinfo set user_pic=? where id=?`
    //req.user.id是token解析成功，express-jwt中间件帮我们挂载上去的,只要身份认证成功了就会有该属性
    db.query(sqlUpdate, [req.body.avatar, req.user.id], (err, results) => {
        // SQL 语句执行失败
        if (err) return res.event(err)
        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.event('更新头像失败！')
        // 更新密码成功
        res.send({
            status: 0,
            msg: '更新头像成功',
        })
    })
}
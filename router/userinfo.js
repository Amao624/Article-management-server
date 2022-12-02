const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入用户路由处理函数模块
const userHandler = require('../controller/userinfo')

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')

//获取用户信息的路由
router.get('/userinfo', userHandler.getUserInfo)
// 获取用户权限的路由
router.post('/userinfo/auth', userHandler.getAuth)
//更新用户信息的路由
router.post('/userinfo', expressJoi(update_userinfo_schema), userHandler.updateUserInfo)
//用户修改密码的路由
router.post('/updatepwd', expressJoi(update_password_schema), userHandler.updatePassword)
//更新用户头像
router.post('/update/avater', expressJoi(update_avatar_schema), userHandler.updateAvater)

module.exports = router
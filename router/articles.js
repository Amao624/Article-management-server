const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入用户路由处理函数模块
const article_handler = require('../router_handler/articles')
//文章的校验规则
const { add_articles_schema, change_articles_schema, get_articles_schema } = require('../schema/articles')
const expressJoi = require('@escook/express-joi')
// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })

//获取文章信息接口
router.get('/list', article_handler.getArticles)

// 更具文章id获取文章数据接口
router.get('/find/:id', expressJoi(get_articles_schema), article_handler.getArticlesById)

//发布新文章接口
router.post('/add', upload.single('cover_img'), expressJoi(add_articles_schema), article_handler.addArticles)

// 修改文章接口
router.post('/change', expressJoi(change_articles_schema), article_handler.changeArticles)

// 删除文章接口
router.post('/delete', article_handler.deleteArticles)


module.exports = router
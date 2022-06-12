const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入用户路由处理函数模块
const artcateHandler = require('../router_handler/artcate')
//
const expressJoi = require('@escook/express-joi')

const { add_cates_schema, delete_cates_schema, get_cates_schema, update_cates_schema } = require('../schema/artcates')

// 获取文章分类接口
router.get('/cates', artcateHandler.getArtcate)
// 通过id获取具体的分类数据接口
router.get('/cates/:id', expressJoi(get_cates_schema), artcateHandler.getArtcateById)
// 增加文章分类名称接口
router.post('/addcates', expressJoi(add_cates_schema), artcateHandler.addArtcate)
// 删除文章分类名称接口
router.post('/deletecates', expressJoi(delete_cates_schema), artcateHandler.deleteArtcate)
// 更新文章分类信息接口
router.post('/updatecates', expressJoi(update_cates_schema), artcateHandler.updateArtcate)


module.exports = router

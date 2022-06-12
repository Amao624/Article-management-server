const joi = require('joi')


// 定义 标题、分类Id、内容、发布状态 的验证规则
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
// const state = joi.string().valid('已发布', '草稿').required()
const id = joi.number().integer().min(1).required()

// 添加文章内容的校验规则
exports.add_articles_schema = {
    body: {
        title,
        cate_id,
        content,
        // state,
    }
}

// 根据id获取文章数据的校验规则
exports.get_articles_schema = {
    params: {
        id
    }
}

// 修改文章的校验规则
exports.change_articles_schema = {
    body: {
        title,
        id,
        content,
    }
}
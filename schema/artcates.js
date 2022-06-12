const joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 * email()，符合邮件的验证规则
 */

const name = joi.string().required()
const alias = joi.string().required()
const id = joi.number().integer().min(1).required()

// 增加文章名称的校验规则
exports.add_cates_schema = {
    body: {
        name,
        alias
    }
}

// 根据id删除文章名称的校验规则
exports.delete_cates_schema = {
    body: {
        id
    }
}

// 根据id获取文章名称数据的校验规则
exports.get_cates_schema = {
    params: {
        id
    }
}

// 更新文章名称数据的校验规则
exports.update_cates_schema = {
    body: {
        id,
        name,
        alias
    }
}
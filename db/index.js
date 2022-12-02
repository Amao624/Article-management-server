const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'articles',
    multipleStatements: true, //  允许执行多条语句
})

module.exports = db
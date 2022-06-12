const mysql = require('mysql')

const db = mysql.createPool({
    // host: '124.220.208.21',
    // user: 'root',
    // password: 'root',
    // database: 'community'
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'community',
    multipleStatements: true, //  允许执行多条语句
})

module.exports = db
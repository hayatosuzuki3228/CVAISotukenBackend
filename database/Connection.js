function pool() {
    const mysql = require("mysql2");

    // コネクションプールの作成
    const pool = mysql.createPool({
        connectionLimit : 10,
        host: "localhost",
        user: "user",
        password: "user",
        database: "sotsuken",
    });

    return pool;
}

exports.pool = pool;
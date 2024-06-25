mysql = require("mysql2");

class Connection{
    // コネクションプールの作成
    static pool = mysql.createPool({
        connectionLimit : 10,
        host: "localhost",
        user: "user",
        password: require("KeyVault"),
        database: "sotsuken",
    });
};

exports.Connection = Connection.pool;
mysql = require("mysql2");

class Connection{
    // コネクションプールの作成
    static pool = mysql.createPool({
        connectionLimit : 10,
        host: "localhost",
        user: "user",
        password: require("./KeyVault"),
//        password: "pass",
        database: "sotsuken",
    });
};

exports.Connection = Connection.pool;
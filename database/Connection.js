mysql = require("mysql2");

async function main() {
    const password = await require("./KeyVault").password;
    // コネクションプールの作成
    const pool = await mysql.createPool({
        connectionLimit : 10,
        host: "localhost",
        user: "user",
        password: password,
        database: "sotsuken",
    });

    return pool;
}

const pool = main();

exports.connection = pool;
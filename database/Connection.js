mysql = require("mysql2");

async function main() {
    const password = await require("./KeyVault");
    // コネクションプールの作成
    pool = mysql.createPool({
        connectionLimit : 10,
        host: "localhost",
        user: "user",
        password: password,
        database: "sotsuken",
    });
    
    exports.connection = pool;
}

main();
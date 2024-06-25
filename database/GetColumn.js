const connect = require("../database/Connection.js").Connection;

const getcolumnSql = "DESC companies;";

connect.getConnection((err, connection) => {
    if (err) {
        throw new Error("Failed to get database connection");
    }

    connection.execute(
        getcolumnSql, 
        (error, result) => {
        if (error) {
            connection.release();  // 接続を解放
            throw new Error("Failed to execute SQL query");
        }
        
        // 結果を resolve で返す
        for(let i = 1; i < result.length; i ++){
            console.log(result[i].Field);
        }
        connection.release();  // 接続を解放
    });
});

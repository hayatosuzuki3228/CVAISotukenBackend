const connect = require("../database/Connection.js");

async function sample(args) {
    // 必要な値が与えられなければエラーを返す
    const requiredArgs = [
    ]

    for (const arg of requiredArgs) {
        if (arg === undefined || arg === "") {
            throw new Error("Invalid arguments.");
        }
    }

    return new Promise((resolve, reject) => {
        // sqlと接続
        const connection = connect.connect("user");

        const sql = "SELECT * FROM authentication";
        
        const data = [];

        // 送信
        connection.execute(
            sql,
            (error, results) => {
                // 送信失敗時にエラーを送信
                if (error) {
                    reject(error); // エラーがあればrejectする
                    return;
                }
                
                results.forEach(result => {
                    data.push([
                        result.id,
                        result.mailaddress,
                        result.password,
                        result.salt,
                    ]);
                });

                // データの取得が終了したらresolveする
                resolve(data);
            }
        );
    });
}

exports.sample = sample;
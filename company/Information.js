async function information(connect, args) {
    
    // 必要な値が与えられなければエラーを返す
    const requiredArgs = [
        args.id,
    ]
    
    for (const arg of requiredArgs) {
        if (arg === undefined || arg === "") {
            throw new Error("Invalid arguments.");
        }
    }

    return new Promise((resolve, reject) => {
        // sqlと接続
        connect.getConnection((err, connection) => {

            const sql = "SELECT * FROM companies WHERE id = (?)";

            // 送信
            connection.execute(
                sql,
                [args.id],
                (error, results) => {
                    // 送信失敗時にエラーを送信
                    if (error) {
                        connection.rollback(() => {
                            reject(error); // エラーがあればrejectする
                            });
                            return;
                    }

                    if (results.length === 0) {
                        resolve({"status": false, "result": "Company is not found :( "});
                        return;
                    } else {
                        resolve({"status": true, "result": results[0]});
                    }
                }
            );
            connection.release();
        });
    });
}

exports.information = information;
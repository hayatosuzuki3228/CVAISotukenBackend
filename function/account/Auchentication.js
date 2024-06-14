const connect = require("../database/Connection.js");
const encryption = require("../database/Encryption.js");

async function authentication(args) {
    
    // 必要な値が与えられなければエラーを返す
    const requiredArgs = [
        args.email,
        args.password,
    ]

    for (const arg of requiredArgs) {
        if (arg === undefined || arg === "") {
            throw new Error("Invalid arguments.");
        }
    }

    return new Promise((resolve, reject) => {
        const sql = "SELECT email, password, salt, active FROM authentication WHERE email = (?)";

        // 送信
        connect.getConnection((err, connection) => {
            connection.execute(
                sql,
                [args.email],
                (error, results) => {
                    // 送信失敗時にエラーを送信
                    if (error) {
                        connection.rollback(() => {
                            reject(error); // エラーがあればrejectする
                            });
                            return;
                    }

                    if (results.length === 0) {
                        resolve({"status": false, "result": "User not found :( "}); // ユーザーが見つからない場合はfalseを返す
                        return;
                    }

                    // 入力されたパスワードをハッシュ化
                    const hashedPassword = encryption.encryption(args.password, results[0].salt);

                    // データベースのものと一致したアクティブなアカウントがあった場合trueを返す
                    if(results[0].active && results[0].password === hashedPassword) {
                        resolve({"status": true, "result": "User is active :)"});
                    } else {
                        resolve({"status": false, "result": "User is not active"});
                    }

                    connection.release();
                }
            );
        });
    });
}

exports.authentication = authentication;
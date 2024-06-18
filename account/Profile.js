const connect = require("../database/Connection.js");

async function profile(args) {
    
    // 必要な値が与えられなければエラーを返す
    const requiredArgs = [
        args.email,
    ]
    
    for (const arg of requiredArgs) {
        if (arg === undefined || arg === "") {
            throw new Error("Invalid arguments.");
        }
    }

    return new Promise((resolve, reject) => {
        // sqlと接続
        const connection = connect.connect();

        const sql = "SELECT user_profile.* FROM user_profile JOIN authentication ON user_profile.id = authentication.id WHERE email = (?)";

        // 送信
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
                } else {
                    resolve({"status": true, "result": results[0]});
                }
            }
        );
    });
}

exports.profile = profile;
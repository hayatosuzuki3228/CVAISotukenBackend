const connect = require("../database/Connection.js").Connection;

async function search(args) {
    // 必要な値が与えられなければエラーを返す
    const requiredArgs = [
        args.subject,
        args.keyword,
    ]

    for (const arg of requiredArgs) {
        if (arg === undefined || arg === "") {
            throw new Error("Invalid arguments.");
        }
    }

    // 得られた検索キーワードを整形
    const keywords = args.keyword.split(/\s+/);

    for(let i = 0; i < keywords.length; i ++) {
        keywords[i] = `%${keywords[i]}%`;
    }

    // sql文の作成
    let sql = "SELECT ?? FROM companies WHERE "
    const colmuns = ['id', 'name']
    if(args.subject != "name") {
        colmuns.unshift(args.subject);
    }

    for(let i = 0; i < Object.keys(keywords).length; i ++) {
        if(i !== 0) {
            sql += " AND ";
        }
        sql += args.subject + " LIKE ?";
    }
    sql += ";";
    
    return new Promise((resolve, reject) => {
        // sqlと接続
        connect.getConnection((err, connection) => {
        
            // 送信
            connection.query(
                sql,
                [colmuns, ...keywords],
                (error, results) => {
                    // 送信失敗時にエラーを送信
                    if (error) {
                        connection.rollback(() => {
                            reject(error); // エラーがあればrejectする
                            });
                            return;
                    }

                    // データの取得が終了したらresolveする
                    resolve({"status": true, "result":results});
                }
            );
            connection.release();
        });
    });
}

exports.search = search;
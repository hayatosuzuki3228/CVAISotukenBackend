const connect = require("../database/Connection.js");

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

    // 渡された検索対象を許可されたもの以外はじく
    const allowedSubject = ["name", "code", "category", "office", "qualification"]
    if(!(allowedSubject.includes(args.subject))) {
        return({"status": false, "result": "Invalid subject."});
    }

    // 得られた検索キーワードを整形
    const keywords = args.keyword.split(/\s+/);

    for(let i = 0; i < keywords.length; i ++) {
        keywords[i] = `%${keywords[i]}%`;
    }

    // sql文の作成
    let sql = "SELECT id, name"
    if(args.subject != "name") {
        sql += ", " + args.subject;
    }

    sql += " FROM companies WHERE "

    for(let i = 0; i < Object.keys(keywords).length; i ++) {
        if(i !== 0) {
            sql += " AND ";
        }
        sql += args.subject + " LIKE ?";
    }
    sql += ";";
    console.log(sql);
    
    return new Promise((resolve, reject) => {
        // sqlと接続
        const connection = connect.connect("user");
        
        // 送信
        connection.execute(
            sql,
            keywords,
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
    });
}

exports.search = search;
// const connect = require("../database/Connection.js");
const connect = require("../database/Connection.js").Connection;


async function updateprofile(args) {
    // user_idが入力されてないときにエラーを吐く
    if (args.companyId === undefined || args.companyId === "") {
        throw new Error("Invalid arguments.");
    }

    // 連想配列のkeyの取得
    const keys = [];
    let count = 0;
    for(const Column of Object.keys(args)){
        if((count != 0) && (count != (Object.keys(args).length - 1))){
            keys.push(Column);
        }
        count++;
    }

    // SQLの作成(SETまで)
    let sql = "UPDATE companies SET";

    // SQLを作成(SETからWHEREの間)
    let i;
    let updatedFields = [];
    const keywords = [];
    for (i=0;i<keys.length;i++) {
        if(args !== undefined && args !== "") {
            if(i !== 0){
                updatedFields += ",";
            }
            updatedFields += keys[i] + " = ?";
            keywords.push(args[keys[i]]);
        }
    }
    console.log(keywords);

    // 更新対象のフィールドが存在しない場合はエラーをスロー
    if (updatedFields.length === 0) {
        throw new Error("No valid fields to update.");
    }

    // SQLを完成させる
    const updateSql = `${sql} ${updatedFields} WHERE id = ?;`;
    console.log(args.companyId)
    console.log(updateSql);

    return new Promise((resolve, reject) => {
        // sqlと接続
        connect.getConnection((err, connection) => {
            // 送信
            connection.execute(
                updateSql,
                [...keywords, args.companyId],
                (error, results) => {
                    // 送信失敗時にエラーを送信
                    if (error) {
                        connection.rollback(() => {
                        reject(error); // エラーがあればrejectする
                        });
                        return;
                    }

                    // データの取得が終了したらresolveする
                    resolve(results);
                }
            );
            // コネクションの返却
            connection.release();
        });
    });
}

exports.updateprofile = updateprofile;


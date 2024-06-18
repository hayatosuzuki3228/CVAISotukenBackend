// const connect = require("../database/Connection.js");
const connect = require("../database/Pool.js").pool();


async function updateprofile(args) {
    // user_idが入力されてないときにエラーを吐く
    if (args.userId === undefined || args.userId === "") {
        throw new Error("Invalid arguments.");
    }

    // SQLの作成(SETまで)
    let sql = "UPDATE user_profile SET";


    // 更新対象のフィールドのみを選択し、SQLクエリを構築
    const data = {
        name: args.name,
        furigana: args.furigana,
        sex: args.sex,
        birthday: args.birthday,
        residence: args.residence,
        qualification: args.qualification,
    }

    // SQLを作成(SETからWHEREの間)
    let cnt = 0;
    let updatedFields = [];
    const keywords = [];
    for (let key of Object.keys(data)) {
        if(data[key] !== undefined && data[key] !== "") {
            console.log(key);
            if(cnt !== 0){
                updatedFields += ",";
            }
            updatedFields += key + " = ?";
            keywords.push(data[key]);
            cnt++;
        }
    }
    console.log(updatedFields);
    console.log(keywords);

    // 更新対象のフィールドが存在しない場合はエラーをスロー
    if (updatedFields.length === 0) {
        throw new Error("No valid fields to update.");
    }

    // SQLを完成させる
    const updateSql = `${sql} ${updatedFields} WHERE id = ?;`;
    

    return new Promise((resolve, reject) => {
        // sqlと接続
        connect.getConnection((err, connection) => {
            // 送信
            connection.execute(
                updateSql,
                [...keywords, args.userId],
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


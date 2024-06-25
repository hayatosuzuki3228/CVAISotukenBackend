// もろもろインポート
const connect = require("../database/Connection.js").Connection;

async function registration(args) {
    console.log(args)
    // 必要な値が与えられなければエラーを返す
    const requiredArgs = [
        args.name
    ];

    // 全ての項目が入力されているかの判定
    for (const arg of requiredArgs) {
        if (arg === undefined || arg === "") {
            throw new Error("Invalid arguments");
        }
    }
    
    // 連想配列のkeyの取得
    const insertFields = [];
    let count = 0;
    for(const Column of Object.keys(args)){
        if(count != 0){
            insertFields.push(Column);
        }
        count++;
    }

    // 連想配列のvalueの取得
    const params = [];
    count = 0;
    for(const param of Object.values(args)){
        if(count != 0){
            params.push(param);
        }
        count++;
    }
    console.log(params);

    // SQLを記述(INSERT ~ name)
    const Sql = "INSERT INTO companies(" ;
    
    // SQLを作成(name ~ value)
    let insertFieldsSql = [];
    let j;
    for (j=0;j<insertFields.length;j++) {
        if(j !== 0){
            insertFieldsSql += ",";
        }
        insertFieldsSql += insertFields[j];
        
    }
    console.log(insertFields);
    // 挿入対象のフィールドが存在しない場合はエラーをスロー
    if (insertFields.length === 0) {
        throw new Error("No valid fields to insert.");
    }

    let valueField = [];
    // SQL作成(最後まで)

    for(let i = 0;i<j;i++){
        if(i !== 0){
            valueField += ","
        }
        valueField += "?"
    }

    //  SQL完成
    const insertSql = `${Sql}${insertFieldsSql}) VALUES(${valueField});`
    console.log(insertSql);

    return new Promise(async(resolve, reject) => {
        // sqlと接続
        connect.getConnection((err, connection) => {
            connection.beginTransaction(function(err) {
                connection.execute(
                    insertSql,
                    params,
                    (error, result) => {
                        if(error) {
                            connection.rollback(() => {
                            reject(new Error("The process ended unsually"));
                            });
                            return;
                        }
                        // コミット
                        connection.commit((error) => {
                        if(error) {
                            connection.rollback(() => {
                                reject(error);
                            });
                            resolve({"status":false, "message":"The process ended unsually"});
                            return;
                        }
                        
                        resolve({"status":true, "message":"The process successfully completed"});           
                    }); 
                });
            });
            // コネクションの返却
            connection.release();
        });
    });          
};

exports.registration =  registration;
// もろもろインポート
const crypto = require("crypto");

// const connect = require("../database/Connection.js");
const connect = require("../database/Pool.js").pool();
const encryption = require("../database/Encryption.js");

async function registration(args) {
    // 必要な値が与えられなければエラーを返す
    const requiredArgs = [
        args.password,
        args.name,
        args.email,
        args.furigana,
        args.sex,
        args.birthday,
        args.residence,
        args.qualification
    ];

    // 全ての項目が入力されているかの判定
    for (const arg of requiredArgs) {
        if (arg === undefined || arg === "") {
            throw new Error("Invalid arguments");
        }
    }

    // パスワードが8~14文字かつ不正な文字が使われていないかの判定
    if (!((/^[A-Za-z\d]{8,14}$/).test(args.password))) {
        console.log("Please enter between 8 and 14 characters.");
        return {"status:":false, "message": "Please enter the password between 8 and 14 characters."};
    }

    // saltを生成し暗号化
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = encryption.encryption(args.password, salt)

    // 計算が成功しているのであればデータベースに送信
    if(!hashedPassword) return {"status" : false, "value": "unsuccessfully password hash"};
    

    // SQLを記述
    const checkEmailSql = "SELECT COUNT(*) AS count FROM authentication WHERE email = ?";
    const authSql = "INSERT INTO authentication(email, password, salt, active) VALUES(?, ?, ?, true)";
    const profileSql = "INSERT INTO user_profile(name, furigana, sex, birthday, residence, qualification) VALUES(?, ?, ?, ?, ?, ?)";
    
    
    return new Promise(async(resolve, reject) => {
        // sqlと接続
        connect.getConnection((err, connection) => {
            connection.beginTransaction(function(err) {
                connection.execute(
                    checkEmailSql,
                    [args.email],
                    (error, result) => {
                        console.log(result);
                        if (result[0].count > 0) {
                            connection.rollback(() => {
                                reject(new Error("The email address has already been used"));
                            });
                            return;
                        }
                        connection.execute(
                            authSql,
                            [args.email, hashedPassword, salt],
                            (error, result) => {
                                if(error) {
                                    connection.rollback(() => {
                                        reject(new Error("The process ended unsually"));
                                    });
                                    return;
                                }
                                connection.execute(
                                    profileSql,
                                    [args.name, args.furigana, args.sex, args.birthday, args.residence, args.qualification],
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
                    });
            });
            
            // コネクションの返却
            connection.release();
        });
    });       
}

exports.registration =  registration;
// ライブラリ等読み込み
const express = require("express");
const cors = require("cors");
const { Connection } = require("./database/Connection");
const server = express();

// ポート番号の指定
const port = 6666;
 
// CORSを全てのリクエストで許可する
server.use(cors());

// フォームデータの解析
server.use(express.urlencoded({ extended: false }));
server.use(express.json()); // JSONデータのパースも許可
  
// リクエストに対して応答する関数を指定
const requests = {
  user_registration: require("./account/Registration").registration,
  user_authentication: require("./account/Auchentication").authentication,
  user_profile: require("./account/Profile").profile,
  user_update: require("./account/UpdateProfile").updateprofile,
  company_information: require("./company/Information").information,
  company_registration: require("./company/Registration").registration,
  company_search: require("./company/Search").search,
  company_update: require("./company/UpdateProfile").updateprofile
};
 
// /apiに対するpostリクエストに応答
server.post("/api", async (req, res) => {
  console.log("リクエストだよ♡");
  try {
    // postされたうち、requestに設定された値の関数を実行
    const connection = await require("./database/Connection").connection;
    const result = await requests[req.body.request](connection, { ...req.body });
 
    // 結果を返す
    console.log("API Request successful: ", result);
    res.send(result);
  } catch (e) {
    // エラー発生時にログに表示しエラーを返す
    console.log("API Request failed: ", e);
    res.status(500).send(e.message); // HTTPステータスコードを500に設定
  }
});
 
// リクエストの受付を開始
server.listen(port, () => {
  console.log("Server is now waiting connection on port " + port);
});
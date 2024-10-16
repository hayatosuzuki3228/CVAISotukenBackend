import { PrismaClient } from "@prisma/client";
import express, { Request, Response, NextFunction } from "express";

const app = express();
export const prisma = new PrismaClient();

// ポート番号の指定
const port = 6666;
 

// フォームデータの解析
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // JSONデータのパースも許可

app.use((req: Request, res: Response, next: NextFunction) => {
    // ログ出力
    console.log(`Request recieved from ${req.ip} to ${req.path}`);
    next();
});

// ルーティング
app.use("/user", require("./routes/user"));
app.use("/company", require("./routes/company"))

// エラー処理
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500);
    res.json({message: err.message});
})

// リクエストの受付を開始
app.listen(port, () => {
    console.log("Server is now waiting connection on port " + port);
});
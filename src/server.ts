import { PrismaClient } from "@prisma/client";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { init } from "./utils/Init";
import { UserCategory } from "./utils/UserCategory";


declare module 'express-session' {
    export interface SessionData {
        userCategory: UserCategory;
        userId: number;
    }
}

const app = express();
export const prisma = new PrismaClient();

// ポート番号の指定
const port = 8000;

// 初回起動処理
init();

// cors許可設定
app.use(cors());

// 簡単なセキュリティ対策
app.use(helmet());

// セッション管理
app.use(
    expressSession({
        name: "sotsuken.sid",
        cookie: {
            maxAge: 1000 * 60 * 60
        },
        secret: String(process.env.SECRET),
        unset: "destroy",
        resave: true,
        saveUninitialized: true,
        store: new PrismaSessionStore(
               new PrismaClient(),
               {
                    checkPeriod: 2 * 60 * 1000,
                    dbRecordIdIsSessionId: true,
                    dbRecordIdFunction: undefined,
               } 
            )
        }
    )
);

// フォームデータの解析
// app.use(express.urlencoded({ extended: false }));

// JSONデータのパースも許可
app.use(express.json());

// アクセスログ出力
app.use((req: Request, res: Response, next: NextFunction) => {
    const date = new Date();
    console.log(`${date.toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })} : Request recieved from ${req.ip} to ${req.path}`);
    next();
});

// ルーティング
app.use("/admin", require("./routes/Admin"));
app.use("/registration", require("./routes/Registration"));
app.use("/authentication", require("./routes/Authentication"));
app.use("/user", require("./routes/User"));
app.use("/company", require("./routes/Company"));
app.use("/echo", require("./routes/Echo"))

// エラー処理
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500);
    res.json({message: err.message});
})

// リクエストの受付を開始
app.listen(port, () => {
    console.log(`ポート番号${port}番でサーバーを起動しました。`);
});
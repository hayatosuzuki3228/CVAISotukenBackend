import { PrismaClient } from "@prisma/client";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

declare module 'express-session' {
    export interface SessionData {
        userId: number;
    }
}

const app = express();
export const prisma = new PrismaClient();

// ポート番号の指定
const port = 6666;

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
        secret: "secret",
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
app.use(express.urlencoded({ extended: false }));

// JSONデータのパースも許可
app.use(express.json());

// アクセスログ出力
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Request recieved from ${req.ip} to ${req.path}`);
    next();
});

// ルーティング
app.use("/registration", require("./routes/registration"))
app.use("/authentication", require("./routes/authentication"))
app.use("/user", require("./routes/user"));
app.use("/company", require("./routes/company"));

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
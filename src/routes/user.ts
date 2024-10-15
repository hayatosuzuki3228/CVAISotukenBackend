// import { authentications } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { encryption, authentication} from "../common/Encryption";
import { exist } from "../common/Validation";
import { prisma } from "../server";

// ルーティングモジュールを呼び出し
var router = require("express").Router();

router.post("/registration", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.email, req.body.password);
        
        if (await prisma.authentications.findFirst({
            where: {
                email: req.body.email
            }
        })) {
            // メールアドレスが登録済みの場合はじく
            throw new Error("Mail address is already used");
        } else {
            // 登録
            const user = await prisma.authentications.create({
                data: {
                    email: req.body.email,
                    password: await encryption(req.body.password),
                    active: true,
                },
            });

            // ログ出力
            console.log(`A user account has been created with id: ${user.id}, email: ${user.email}, password: ${user.password}`);

            // レスポンスを返す
            res.json(
                {message: "A user account has been created"}
            );
        }

    } catch(e) {
        next(e);
    }
});

router.post("/authentication", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.email, req.body.password);

        // ハッシュ化パスワードとアカウントの有効性を取得
        const accountData: {password: string, active: boolean} | null = (await prisma.authentications.findFirst({
            select: {
                password: true,
                active: true
            },
            where: {
                email: req.body.email
            }
        }));

        if (accountData == null) {
            throw new Error("Can't find account data");
        } else if (!accountData.active) {
            throw new Error("Account is not active");
        } else if (accountData.password) {
            // エラー処理等
            if (await authentication(req.body.password, accountData.password)) {
                // パスワードが正しかった場合レスポンスを返す
                res.json({message: "Authentication was successful"});
            } else {
                // パスワードが間違っていた場合
                throw new Error("Password is incorrect");
            }
        } else {
            // それ以外のエラー
            throw new Error("Something wrong");
        }

    } catch(e) {
        next(e);
    }
});


module.exports = router;
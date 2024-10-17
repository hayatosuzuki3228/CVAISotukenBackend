import { Request, Response, NextFunction } from "express";
import { encryption } from "../common/Encryption";
import { exist } from "../common/Validation";
import { prisma } from "../server";

// ルーティングモジュールを呼び出し
const router = require("express").Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
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

module.exports = router;

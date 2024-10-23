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
            throw new Error("そのメールアドレスはすでに使われています");
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
            console.log(`ユーザアカウントの作成が完了しました。ユーザID: ${user.id}, Eメール: ${user.email}, パスワード: ${user.password}`);

            // レスポンスを返す
            res.json(
                {message: "ユーザアカウントの作成が完了しました"}
            );
        }

    } catch(e) {
        next(e);
    }
});

router.post("/all", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.email, req.body.password);
        exist(req.body.name, req.body.furigana, req.body.gender, req.body.birthday, req.body.residence, req.body.graduation_year, req.body.qualification);
        
        if (await prisma.authentications.findFirst({
            where: {
                email: req.body.email
            }
        })) {
            // メールアドレスが登録済みの場合はじく
            throw new Error("そのメールアドレスは使われています");
        } else {

            // 登録
            const user = await prisma.authentications.create({
                data: {
                    email: req.body.email,
                    password: await encryption(req.body.password),
                    active: true,
                    user_profiles: {
                        create: {
                                name: req.body.name,
                                furigana: req.body.furigana,
                                gender: req.body.gender,
                                birthday: new Date(req.body.birthday),
                                residence: req.body.residence,
                                graduation_year: Number(req.body.graduation_year),
                                qualification: Number(req.body.qualification),
                        },
                    },
                },
                include: {
                    user_profiles: true,
                }
            });

            console.log(req.body)

            // ログ出力
            console.log(`ユーザアカウントの作成が完了しました。ユーザID: ${user.id}, Eメール: ${user.email}, パスワード: ${user.password}`);

            // レスポンスを返す
            res.json(
                {message: "ユーザアカウントの作成が完了しました"}
            );
        }

    } catch(e) {
        next(e);
    }
});

module.exports = router;

import { Request, Response, NextFunction } from "express";
import { encryption } from "../common/Encryption";
import { exist } from "../common/Validation";
import { prisma } from "../server";
import { create } from "ts-node";

// ルーティングモジュールを呼び出し
const router = require("express").Router();



router.post("/find", async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.session.userId) {
            const data = await prisma.authentications.findFirst({
                where: {
                    id: req.session.userId
                }
            });

            res.json(data);
        } else {
            throw new Error("sesssion data not found");
        }
    } catch(e) {
        next(e);
    }
});

router.post("/registration", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.email, req.body.password);
        exist(req.body.name, req.body.furigana, req.body.gender, req.body.birthday, req.body.residence, req.body.graduation_year, req.body.qualification);
        
        if (await prisma.authentications.findFirst({
            where: {
                email: req.body.email
            }
        })) {
            // メールアドレスが登録済みの場合はじく
            throw new Error("Mail address is already used");
        } else {
            // パスワードが8~14文字で英数混合である判別
            if(!((/^(?=.*[a-zA-Z])(?=.*[0-9/-])[a-zA-Z0-9.?/-]{8,24}$/).test(req.body.password))){
                throw new Error("This password is incorrect")
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
                                    graduation_year: (Number)(req.body.graduation_year),
                                    qualification: (Number)(req.body.qualification),
                            },
                        },
                    },
                    include: {
                        user_profiles: true,
                    }
                });

                console.log(req.body)

                // ログ出力
                console.log(`A user account has been created with id: ${user.id}, email: ${user.email}, password: ${user.password}`);

                // レスポンスを返す
                res.json(
                    {message: "A user account and profile has been created"}
                );
            }
        }

    } catch(e) {
        next(e);
    }
});


router.post("/user_search", async (req: Request, res: Response, next: NextFunction) => {
    try{
        exist(req.body.email);

        // Eメールを元にユーザプロフィールを表示
        const disp_profile = await prisma.authentications.findMany({
            where: {
                email: req.body.email
            },
            include: {
                user_profiles: true
            }
        }).then(console.log);
        res.json({message: "Profile information is displayed", result: disp_profile});
    } catch(e) {
        next(e);
    }
});

module.exports = router;

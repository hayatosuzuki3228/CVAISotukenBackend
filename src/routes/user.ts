import { Request, Response, NextFunction } from "express";
import { exist } from "../common/Validation";
import { prisma } from "../server";

// ルーティングモジュールを呼び出し
const router = require("express").Router();

/* session test
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
});*/

router.post("/profile/get", async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.session.userId) {
            const data = await prisma.user_profiles.findFirst({
                where: {
                    id: req.session.userId
                }
            });

            res.json({message: "情報の取得に成功しました。", result: data});
        } else {
            throw new Error("sesssion data not found");
        }
    } catch(e) {
        next(e);
    }
});

router.post("/profile/set", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.name, req.body.furigana, req.body.gender, req.body.birthday, req.body.residence, req.body.graduation_year, req.body.qualification);

        if(req.session.userId)
        {
            if (await prisma.user_profiles.findFirst({
                where:{
                    authentication_id: Number(req.session.userId)
                }
            }))
            {
                // プロフィールが存在する場合
                await prisma.user_profiles.update({
                    where: {
                        authentication_id: req.session.userId
                    },
                    data: {
                        name: req.body.name,
                        furigana: req.body.furigana,
                        gender: req.body.gender,
                        birthday: new Date(req.body.birthday),
                        residence: req.body.residence,
                        graduation_year: Number(req.body.graduation_year),
                        qualification: Number(req.body.qualification)
                    }
                })
            } else {
                // プロフィールが存在しない場合
                await prisma.authentications.update({
                    where: {
                        id: req.session.userId
                    },
                    data: {
                        user_profiles: {
                            create: {
                                name: req.body.name,
                                furigana: req.body.furigana,
                                gender: req.body.gender,
                                birthday: new Date(req.body.birthday),
                                residence: req.body.residence,
                                graduation_year: Number(req.body.graduation_year),
                                qualification: Number(req.body.qualification)
                            }
                        }
                    },
                    include: {
                        user_profiles: true
                    }
                });
            }
        }

        res.json({message: "プロフィールの変更に成功しました。"})
    } catch (e) {
        next(e)
    }
});

module.exports = router;

import { Request, Response, NextFunction } from "express";
import { exist } from "../common/Validation";
import { prisma } from "../server";

// ルーティングモジュールを呼び出し
const router = require("express").Router();

router.post("/profile/get", async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.session.userId) {
            const data = await prisma.studentProfiles.findFirst({
                where: {
                    id: req.session.userId
                }
            });

            res.json({message: "情報の取得に成功しました。", result: data});
        } else {
            throw new Error("セッションデータが見つかりませんでした");
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
            if (await prisma.studentProfiles.findFirst({
                where:{
                    id: Number(req.session.userId)
                }
            }))
            {
                // プロフィールが存在する場合
                await prisma.studentProfiles.update({
                    where: {
                        id: req.session.userId
                    },
                    data: {
                        name: req.body.name,
                        furigana: req.body.furigana,
                        gender: req.body.gender,
                        birthday: new Date(req.body.birthday),
                        residence: req.body.residence,
                        graduation_year: Number(req.body.graduation_year),
                        // qualification: Number(req.body.qualification)
                    }
                })
            } else {
                // プロフィールが存在しない場合
                await prisma.studentAuthentications.update({
                    where: {
                        id: req.session.userId
                    },
                    data: {
                        studentprofiles: {
                            create: {
                                name: req.body.name,
                                furigana: req.body.furigana,
                                gender: req.body.gender,
                                birthday: new Date(req.body.birthday),
                                residence: req.body.residence,
                                graduation_year: Number(req.body.graduation_year),
                                // qualification: Number(req.body.qualification)
                            }
                        }
                    },
                    include: {
                        studentprofiles: true
                    }
                });
            }
        } 

        res.json({message: "プロフィールの変更に成功しました。"})
    } catch (e) {
        next(e)
    }
});

router.post('/qualifications/set/', async (req: Request, res: Response, next: NextFunction) => {
    exist(req.body.qualificationId);

    try {
        /*const studentQualifications = await prisma.studentQualification.createMany({
            data: req.body.qualificationId.map((qualificationId: number) => (
            {
                userId: req.session.userId,// userIdを整数に変換
                qualificationId: qualificationId
            }))
        });*/
        await prisma.studentProfiles.update({
            where: {
                id: req.session.userId
            },
            data: {
                studentqualifications: {
                    create: [
                        {
                            qualificationmaster: {
                                connect: {id: 0}
                            }
                        },
                        {
                            qualificationmaster: {
                                connect: {id: 1}
                            }
                        }
                    ]
                }
            },
            include: {
                studentqualifications: true
            }
        })

        res.json();
        
    } catch (e) {
        next(e);
    }
});

module.exports = router;

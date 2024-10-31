import { Request, Response, NextFunction } from "express";
import { exist } from "../common/Validation";
import { prisma } from "../server";
import { verify, verifyCompany, verifyStudent } from "../common/Verify";
import { UserCategory } from "../common/UserCategory";

// ルーティングモジュールを呼び出し
const router = require("express").Router();

// /studentから始まる場合、セッション情報がstudentであることを検証する
router.use("/student", async (req: Request, res: Response, next: NextFunction) => {
    try {
        verifyStudent(req.session.userCategory);
        next();
    }
    catch (e) {
        next(e);
    }
});

// /companyから始まる場合、セッション情報がcompnyであることを検証する
router.use("/company", async (req: Request, res: Response, next: NextFunction) => {
    try {
        verifyCompany(req.session.userCategory);
        next();
    }
    catch (e) {
        next(e);
    }
});

router.post("/profile/get", async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 認証情報が
        verify(req.session.userCategory, UserCategory.student, UserCategory.student);

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
        verify(req.session.userCategory, UserCategory.student, UserCategory.student);
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

router.post("/company/message/new", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.title, req.body.content);

        // メッセージの作成
        await prisma.companyMessage.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                publicshed: req.body.published == undefined ? true : req.body.published,
                company: {
                    connect: {
                        id: req.session.userId
                    }
                }
            }
        });

        res.json({message: "メッセージの送信に成功しました"});

    } catch (e) {
        next(e);
    }
});

router.post("/company/message/list", async (req: Request, res: Response, next: NextFunction) => {
    try {
        // セッションに格納されているuserIdからメッセージを全て取得
        const messages = await prisma.companyMessage.findMany({
            where: {
                companyId: req.session.userId
            }
        });

        res.json({message: "メッセージの取得に成功しました", result: messages});

    } catch (e) {
        next(e);
    }
});

router.post("/company/message/edit", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.id);

        // パラメータから取得したIDのメッセージのタイトル、コンテンツの更新
        await prisma.companyMessage.update({
            where: {
                companyId: req.session.userId,
                id: req.body.id
            },
            data: {
                title: req.body.title,
                content: req.body.content
            }
        });

        res.json({message: "メッセージの更新に成功しました"});

    } catch (e) {
        next(e);
    }
});

router.post("/company/message/delete", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.id);

        // パラメータから取得したIDのメッセージを削除
        await prisma.companyMessage.delete({
            where: {
                companyId: req.session.userId,
                id: req.body.id
            }
        });

        res.json({message: "メッセージの更新に削除に成功しました"});

    } catch (e) {
        next(e);
    }
});

router.post("/company/message/publish", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.id);

        // パラメータから取得したIDのメッセージを公開
        await prisma.companyMessage.update({
            where: {
                companyId: req.session.userId,
                id: req.body.id
            },
            data: {
                publicshed: true
            }
        });

        res.json({message: "メッセージの公開に成功しました"});

    } catch (e) {
        next(e);
    }
});

router.post("/company/message/private", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.id);

        // パラメータから取得したメッセージを非公開
        await prisma.companyMessage.update({
            where: {
                companyId: req.session.userId,
                id: req.body.id
            },
            data: {
                publicshed: false
            }
        });

        res.json({message: "メッセージの非公開に成功しました"});

    } catch (e) {
        next(e);
    }
});


module.exports = router;

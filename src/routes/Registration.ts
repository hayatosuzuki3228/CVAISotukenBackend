import { Request, Response, NextFunction } from "express";
import { encryption } from "../utils/Encryption";
import { exist } from "../utils/Validation";
import { prisma } from "../server";
import { verifyAdmin } from "../utils/Verify";
import { Prisma } from "@prisma/client";

// ルーティングモジュールを呼び出し
const router = require("express").Router();

router.post("/student", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.email, req.body.password);
        
        if (await prisma.student.findFirst({
            where: {
                email: req.body.email
            }
        })) {
            // メールアドレスが登録済みの場合はじく
            throw new Error("そのメールアドレスはすでに使われています");
        } else {
            // 登録
            const user = await prisma.student.create({
                data: {
                    email: req.body.email,
                    password: await encryption(req.body.password)
                },
            });

            // ログ出力
            console.log(`ユーザアカウントの作成が完了しました。ユーザID: ${user.id}, Eメール: ${user.email}`);

            // レスポンスを返す
            res.json(
                {message: "ユーザアカウントの作成が完了しました"}
            );
        }

    } catch(e) {
        next(e);
    }
});

router.post("/student/qulification", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.email, req.body.password, req.body.qualificationId);

        const data: Prisma.StudentQualificationCreateManyStudentInputEnvelope = {
            data: req.body.qualificationId.map((id: any) => ({
                qualificationId: id
            }))
        };

        // ユーザのauthenticationと資格情報を追加
        await prisma.student.create({
            data: {
                email: req.body.email,
                password: await encryption(req.body.password),
                active: true,
                qualifications: {
                    createMany: data
                }
            }
        });

        console.log("ユーザアカウントおよび資格情報の作成が完了しました");

        // レスポンスを返す
        res.json({message: "ユーザアカウントおよび資格情報の作成が完了しました"});        

    } catch (e) {
        next(e);
    }
});

router.post("/student/status", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.email, req.body.password);
        exist(req.body.name, req.body.furigana, req.body.gender, req.body.birthday, req.body.residence, req.body.graduation_year, req.body.class);

        if (await prisma.student.findFirst({
            where: {
                email: req.body.email
            }
        })) {
            // メールアドレスが登録済みの場合はじく
            throw new Error("そのメールアドレスはすでに使われています");
        } else {

            // 登録
            const user = await prisma.student.create({
                data: {
                    email: req.body.email,
                    password: await encryption(req.body.password),
                    active: true,
                    profile: {
                        create: {
                            name: req.body.name,
                            furigana: req.body.furigana,
                            gender: req.body.gender,
                            birthday: new Date(req.body.birthday),
                            residence: req.body.residence,
                            graduation_year: Number(req.body.graduation_year),
                            class: req.body.class
                        },
                    },
                },
                include: {
                    profile: true,
                }
            });

            console.log(req.body)

            // ログ出力
            console.log(`ユーザアカウントおよびプロフィールの作成が完了しました。ユーザID: ${user.id}, Eメール: ${user.email}`);

            // レスポンスを返す
            res.json(
                {message: "ユーザアカウントの作成が完了しました"}
            );
        }

    } catch(e) {
        next(e);
    }
});

router.post("/student/all", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.email, req.body.password, req.body.qualificationId);
        exist(req.body.name, req.body.furigana, req.body.gender, req.body.birthday, req.body.residence, req.body.graduation_year, req.body.class);

        const data: Prisma.StudentQualificationCreateManyStudentInputEnvelope = {
            data: req.body.qualificationId.map((id: any) => ({
                qualificationId: id
            }))
        };

        if (await prisma.student.findFirst({
            where: {
                email: req.body.email
            }
        })) {
            // メールアドレスが登録済みの場合はじく
            throw new Error("そのメールアドレスはすでに使われています");
        } else {

            // 登録
            const user = await prisma.student.create({
                data: {
                    email: req.body.email,
                    password: await encryption(req.body.password),
                    active: true,
                    qualifications: {
                        createMany: data
                    },
                    profile: {
                        create: {
                            name: req.body.name,
                            furigana: req.body.furigana,
                            gender: req.body.gender,
                            birthday: new Date(req.body.birthday),
                            residence: req.body.residence,
                            graduation_year: Number(req.body.graduation_year),
                            class: req.body.class
                        },
                    },
                },
                include: {
                    profile: true,
                }
            });

            console.log(req.body)

            // ログ出力
            console.log(`ユーザアカウントおよびプロフィールの作成が完了しました。ユーザID: ${user.id}, Eメール: ${user.email}`);

            // レスポンスを返す
            res.json(
                {message: "ユーザアカウントの作成が完了しました"}
            );
        }

    } catch(e) {
        next(e);
    }
});

router.post("/company", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.email, req.body.password);

        if(await prisma.company.findFirst({
            where: {
                email: req.body.email
            },
        })) {
            throw new Error("そのメールアドレスはすでに使われています")
        } else {
            // 登録
            const company = await prisma.company.create({
                data: {
                    email: req.body.email,
                    password: await encryption(req.body.password)
                },
            });

            // ログ出力
            console.log(`企業用アカウントの作成が完了しました。ユーザID: ${company.id}, Eメール: ${company.email}`);

            // レスポンスを返す
            res.json(
                {message: "企業用アカウントの作成が完了しました"}
            );
        }
    } catch (e) {
        next (e)       
    }
});


router.post("/company/all", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.email, req.body.password);
        exist(req.body.code);
        
        if (await prisma.company.findFirst({
            where: {
                email: req.body.email
            }
        })) {
            // メールアドレスが登録済みの場合はじく
            throw new Error("そのメールアドレスはすでに使われています");
        } else {

            // 登録
            const company = await prisma.company.create({
                data: {
                    email: req.body.email,
                    password: await encryption(req.body.password),
                    active: true,
                    profile: {
                        create: {
                            code: Number (req.body.code),
                        },
                    },
                },
                include: {
                    profile: true,
                }
            });

            console.log(req.body)

            // ログ出力
            console.log(`企業用アカウントおよびプロフィールの作成が完了しました。ユーザID: ${company.id}, Eメール: ${company.email}`);

            // レスポンスを返す
            res.json(
                {message: "企業用アカウントの作成が完了しました"}
            );
        }

    } catch(e) {
        next(e);
    }
});


router.post("/admin", async (req: Request, res: Response, next: NextFunction) => {
    try {
        verifyAdmin(req.session.userCategory);
        exist(req.body.email, req.body.password);
        
        if (await prisma.admin.findFirst({
            where: {
                email: req.body.email
            }
        })) {
            // メールアドレスが登録済みの場合はじく
            throw new Error("そのメールアドレスはすでに使われています");
        } else {
            // 登録
            const user = await prisma.admin.create({
                data: {
                    email: req.body.email,
                    password: await encryption(req.body.password)
                },
            });

            // ログ出力
            console.log(`管理者アカウントの作成が完了しました。ユーザID: ${user.id}, Eメール: ${user.email}`);

            // レスポンスを返す
            res.json(
                {message: "管理者アカウントの作成が完了しました"}
            );
        }

    } catch(e) {
        next(e);
    }
});

module.exports = router;

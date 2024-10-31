import { Request, Response, NextFunction } from "express";
import { encryption } from "../common/Encryption";
import { exist } from "../common/Validation";
import { prisma } from "../server";
import { verifyAdmin } from "../common/Verify";

// ルーティングモジュールを呼び出し
const router = require("express").Router();

router.post("/student", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.email, req.body.password);
        
        if (await prisma.studentAuthentications.findFirst({
            where: {
                email: req.body.email
            }
        })) {
            // メールアドレスが登録済みの場合はじく
            throw new Error("そのメールアドレスはすでに使われています");
        } else {
            // 登録
            const user = await prisma.studentAuthentications.create({
                data: {
                    email: req.body.email,
                    password: await encryption(req.body.password),
                    active: true,
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

router.post("/student/all", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.email, req.body.password);
        exist(req.body.name, req.body.furigana, req.body.gender, req.body.birthday, req.body.residence, req.body.graduation_year);

        if (await prisma.studentAuthentications.findFirst({
            where: {
                email: req.body.email
            }
        })) {
            // メールアドレスが登録済みの場合はじく
            throw new Error("そのメールアドレスはすでに使われています");
        } else {

            // 登録
            const user = await prisma.studentAuthentications.create({
                data: {
                    email: req.body.email,
                    password: await encryption(req.body.password),
                    active: true,
                    studentprofiles: {
                        create: {
                            name: req.body.name,
                            furigana: req.body.furigana,
                            gender: req.body.gender,
                            birthday: new Date(req.body.birthday),
                            residence: req.body.residence,
                            graduation_year: Number(req.body.graduation_year),
                        },
                    },
                },
                include: {
                    studentprofiles: true,
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

        if(await prisma.companyAuthentications.findFirst({
            where: {
                email: req.body.email
            },
        })) {
            throw new Error("そのメールアドレスはすでに使われています")
        } else {
            // 登録
            const company = await prisma.companyAuthentications.create({
                data: {
                    email: req.body.email,
                    password: await encryption(req.body.password),
                    active: true,
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
        
        if (await prisma.companyAuthentications.findFirst({
            where: {
                email: req.body.email
            }
        })) {
            // メールアドレスが登録済みの場合はじく
            throw new Error("そのメールアドレスはすでに使われています");
        } else {

            // 登録
            const company = await prisma.companyAuthentications.create({
                data: {
                    email: req.body.email,
                    password: await encryption(req.body.password),
                    active: true,
                    companyprofiles: {
                        create: {
                            code: Number (req.body.code),
                        },
                    },
                },
                include: {
                    companyprofiles: true,
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
        
        if (await prisma.adminAuthentications.findFirst({
            where: {
                email: req.body.email
            }
        })) {
            // メールアドレスが登録済みの場合はじく
            throw new Error("そのメールアドレスはすでに使われています");
        } else {
            // 登録
            const user = await prisma.adminAuthentications.create({
                data: {
                    email: req.body.email,
                    password: await encryption(req.body.password),
                    active: true,
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

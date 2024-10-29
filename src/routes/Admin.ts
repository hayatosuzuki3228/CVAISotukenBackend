import { Request, Response, NextFunction } from "express";
import { exist } from "../common/Validation";
import { prisma } from "../server";
import { authentication, encryption } from "../common/Encryption";
import { UserCategory } from "../common/UserCategory";

// ルーティングモジュールを呼び出し
const router = require("express").Router();

router.post("/registration", async (req: Request, res: Response, next: NextFunction) => {
    try {
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

router.post("/authentication", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.email, req.body.password);

        // ハッシュ化パスワードとアカウントの有効性を取得
        const accountData = (await prisma.adminAuthentications.findFirst({
            where: {
                email: req.body.email
            }
        }));

        if (accountData == null) {
            throw new Error("アカウントデータが見つかりません");
        } else if (!accountData.active) {
            throw new Error("アカウントデータがアクティブではありません");
        } else if (accountData.password) {
            // エラー処理等
            if (await authentication(req.body.password, accountData.password)) {
                // パスワードが正しかった場合セッションにユーザデータを登録
                req.session.userCategory = UserCategory.admin;
                req.session.userId = accountData.id;
                res.json({message: "認証が成功しました"});
            } else {
                // パスワードが間違っていた場合
                throw new Error("パスワードが正しくありません");
            }
        } else {
            // それ以外のエラー
            throw new Error("エラーが発生しました");
        }

    } catch(e) {
        next(e);
    }
});

router.post("/logout", async (req: Request, res: Response, next: NextFunction) => {
    if (req.session.userCategory != UserCategory.admin) throw new Error("認証情報が不正です");
    try {
        if(req.session.userId) {
            req.session.destroy((err) => {
                if(!err) {
                    res.json({message: "ログアウトに成功しました"}).send();
                } else {
                    throw new Error("情報の破棄に失敗しました");
                }
            });
        } else {
            throw new Error("セッションデータが見つかりません");
        }
    
    } catch(e) {
        next(e);
    }
});

router.post("/student/get", async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.session.userCategory != UserCategory.admin) throw new Error("認証情報が不正です");
        const result = await prisma.studentAuthentications.findMany({
            select: {
                id: true,
                studentprofiles: {select: {name: true},},
                active: true,
            }
        }).then((result) => 
            result.map((result) => 
                ({
                    id: result.id,
                    name: result.studentprofiles?.name,
                    active: result.active
                })
            )
        );

        res.json({message: "データの取得に成功しました", result: result});

    } catch(e) {
        next(e);
    }
});

router.post("/student/activate", async (req: Request, res: Response, next: NextFunction) => {
    exist(req.body.id);
    try {
        if (req.session.userCategory != UserCategory.admin) throw new Error("認証情報が不正です");
        await prisma.studentAuthentications.update({
            where: {
                id: req.body.id
            },
            data: {
                active: true
            }
        });

        res.json({message: "データの更新に成功しました"});
    } catch(e) {
        next(e);
    }
});

router.post("/student/deactivate", async (req: Request, res: Response, next: NextFunction) => {
    exist(req.body.id);
    try {
        if (req.session.userCategory != UserCategory.admin) throw new Error("認証情報が不正です");
        await prisma.studentAuthentications.update({
            where: {
                id: req.body.id
            },
            data: {
                active: false
            }
        });

        res.json({message: "データの更新に成功しました"});
    } catch(e) {
        next(e);
    }
});

router.post("/company/get", async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.session.userCategory != UserCategory.admin) throw new Error("認証情報が不正です");
        const result = await prisma.companyAuthentications.findMany({
            select: {
                id: true,
                companyprofiles: {select: {name: true},},
                active: true,
            }
        }).then((result) => 
            result.map((result) => 
                ({
                    id: result.id,
                    name: result.companyprofiles?.name,
                    active: result.active
                })
            )
        );

        res.json({message: "データの取得に成功しました", result: result});

    } catch(e) {
        next(e);
    }
});

router.post("/company/activate", async (req: Request, res: Response, next: NextFunction) => {
    exist(req.body.id);
    try {
        if (req.session.userCategory != UserCategory.admin) throw new Error("認証情報が不正です");
        await prisma.companyAuthentications.update({
            where: {
                id: req.body.id
            },
            data: {
                active: true
            }
        });

        res.json({message: "データの更新に成功しました"});
    } catch(e) {
        next(e);
    }
});

router.post("/company/deactivate", async (req: Request, res: Response, next: NextFunction) => {
    exist(req.body.id);
    try {
        if (req.session.userCategory != UserCategory.admin) throw new Error("認証情報が不正です");
        await prisma.companyAuthentications.update({
            where: {
                id: req.body.id
            },
            data: {
                active: false
            }
        });

        res.json({message: "データの更新に成功しました"});
    } catch(e) {
        next(e);
    }
});

module.exports = router;
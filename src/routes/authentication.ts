import { Request, Response, NextFunction } from "express";
import { authentication } from "../common/Encryption";
import { exist } from "../common/Validation";
import { prisma } from "../server";
import { UserCategory } from "../common/UserCategory";

// ルーティングモジュールを呼び出し
const router = require("express").Router();

router.post("/student", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.email, req.body.password);

        // ハッシュ化パスワードとアカウントの有効性を取得
        const accountData = (await prisma.studentAuthentications.findFirst({
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
                req.session.userCategory = UserCategory.student;
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

router.post("/company", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.email, req.body.password);

        // ハッシュ化パスワードとアカウントの有効性を取得
        const accountData = (await prisma.companyAuthentications.findFirst({
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
                req.session.userCategory = UserCategory.company;
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

router.post("/logout/student", async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.session.userId) {
            await prisma.studentProfiles.delete({
                where: {
                    id: req.session.userId
                }
            });

            res.json({message: "ログアウトに成功しました"});
        } else {
            throw new Error("セッションデータが見つかりません");
        }
    } catch(e) {
        next(e);
    }
});

router.post("/logout/company", async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.session.userId) {
            await prisma.companyProfiles.delete({
                where: {
                    id: req.session.userId
                }
            });

            res.json({message: "ログアウトに成功しました"});
        } else {
            throw new Error("セッションデータが見つかりません");
        }
    } catch(e) {
        next(e);
    }
});

module.exports = router;

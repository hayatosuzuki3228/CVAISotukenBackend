import { Request, Response, NextFunction } from "express";
import { exist } from "../common/Validation";
import { prisma } from "../server";
import { authentication, encryption } from "../common/Encryption";
import { UserCategory } from "../common/UserCategory";
import { verifyAdmin } from "../common/Verify";

// ルーティングモジュールを呼び出し
const router = require("express").Router();

// セッション情報がadminであることの確認
router.use(async (req: Request, res: Response, next: NextFunction) => {
    try {
        verifyAdmin(req.session.userCategory);
        next();
    }
    catch (e) {
        next(e);
    }
});

router.post("/student/list", async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 学生の一覧を取得
        const result = await prisma.studentAuthentications.findMany({
            select: {
                id: true,
                studentprofiles: {select: {name: true},},
                active: true,
            }
        }).then((result) =>
            // データを整形
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
        // 学生ユーザーアカウントを有効化
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
        // 学生ユーザアカウントを無効化
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

router.post("/company/list", async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 会社の一覧を取得
        const result = await prisma.companyAuthentications.findMany({
            select: {
                id: true,
                companyprofiles: {select: {name: true},},
                active: true,
            }
        }).then((result) =>
            // データを整形
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
    try {
        exist(req.body.id);
        // 会社ユーザーアカウントを有効化
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
    try {
        exist(req.body.id);
        // 企業ユーザーアカウントを無効化
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
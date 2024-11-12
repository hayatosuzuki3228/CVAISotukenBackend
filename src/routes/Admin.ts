import { Request, Response, NextFunction } from "express";
import { exist } from "../utils/Validation";
import { prisma } from "../server";
import { verifyAdmin } from "../utils/Verify";

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
        // 取得する情報量の制御
        const skip = (req.body.perPage ? req.body.perPage : 10) * (req.body.page ? req.body.page : 0);
        const take = (req.body.perPage ? req.body.perPage : 10) * (req.body.page ? req.body.page + 1 : 1);

        // 学生の一覧を取得
        const result = await prisma.student.findMany({
            select: {
                id: true,
                profile: {select: {name: true},},
                active: true,
            },
            skip: skip,
            take: take
        }).then((result) =>
            // データを整形
            result.map((result) => 
                ({
                    id: result.id,
                    name: result.profile?.name,
                    active: result.active
                })
            )
        );

        res.json({message: "データの取得に成功しました", result: result});

    } catch(e) {
        next(e);
    }
});

router.post("/student/count", async(req: Request, res: Response, next: NextFunction) => {
    try {

        // 生徒の総数を取得
        const total = await prisma.student.count();

        res.json({message: "生徒アカウントの総数を取得しました", result: total});

    } catch (e) {
        next(e)
    }
});

router.post("/student/count/pages", async(req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.perPage);

        // 総ページ数を計算(切り上げ)
        const total = await prisma.student.count();
        const result = Math.ceil(total / req.body.perPage);

        res.json({message: "総ページ数を取得しました", result: result});

    } catch (e) {
        next(e)
    }
});

router.post("/student/activate", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.id);
        // 学生ユーザーアカウントを有効化
        await prisma.student.update({
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
    try {
        exist(req.body.id);
        // 学生ユーザアカウントを無効化
        await prisma.student.update({
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
        // 取得する情報量の制御
        const skip = (req.body.perPage ? req.body.perPage : 10) * (req.body.page ? req.body.page : 0);
        const take = (req.body.perPage ? req.body.perPage : 10) * (req.body.page ? req.body.page + 1 : 1);

        // 会社の一覧を取得
        const result = await prisma.company.findMany({
            select: {
                id: true,
                profile: {select: {name: true},},
                active: true,
            },
            skip: skip,
            take: take
        }).then((result) =>
            // データを整形
            result.map((result) => 
                ({
                    id: result.id,
                    name: result.profile?.name,
                    active: result.active
                })
            )
        );

        res.json({message: "データの取得に成功しました", result: result});

    } catch(e) {
        next(e);
    }
});

router.post("/company/count", async(req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.perPage);

        const total = await prisma.company.count();

        res.json({message: "企業アカウントの総数を取得しました", result: total});

    } catch (e) {
        next(e)
    }
});

router.post("/company/count/pages", async(req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.perPage);

        const total = await prisma.company.count();
        const result = Math.ceil(total / req.body.perPage);

        res.json({message: "総ページ数を取得しました", result: result});

    } catch (e) {
        next(e)
    }
});


router.post("/company/activate", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.id);

        // 会社ユーザーアカウントを有効化
        await prisma.company.update({
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
        await prisma.company.update({
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

router.post("/list", async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 取得する情報量の制御
        const skip = (req.body.perPage ? req.body.perPage : 10) * (req.body.page ? req.body.page : 0);
        const take = (req.body.perPage ? req.body.perPage : 10) * (req.body.page ? req.body.page + 1 : 1);

        // 会社の一覧を取得
        const result = await prisma.admin.findMany({
            select: {
                id: true,
                active: true,
            },
            skip: skip,
            take: take
        });

        res.json({message: "データの取得に成功しました", result: result});

    } catch(e) {
        next(e);
    }
});

router.post("/count", async(req: Request, res: Response, next: NextFunction) => {
    try {

        const total = await prisma.admin.count();

        res.json({message: "管理者アカウントの総数を取得しました", result: total});

    } catch (e) {
        next(e)
    }
});

router.post("/count/pages", async(req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.perPage);

        const total = await prisma.admin.count();
        const result = Math.ceil(total / req.body.perPage);

        res.json({message: "総ページ数を取得しました", result: result});

    } catch (e) {
        next(e)
    }
});

router.post("/activate", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.id);

        // 会社ユーザーアカウントを有効化
        await prisma.admin.update({
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

router.post("/deactivate", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.id);
        
        // 企業ユーザーアカウントを無効化
        await prisma.admin.update({
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

router.post("/qualification/list", async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 取得する情報の制御
        const skip = (req.body.perPage ? req.body.perPage : 10) * (req.body.page ? req.body.page : 0);
        const take = (req.body.perPage ? req.body.perPage : 10) * (req.body.page ? req.body.page + 1 : 1);

        // 資格マスタのリストを取得
        const qualifications = await prisma.qualificationMaster.findMany({
            skip: skip,
            take: take
        });

        res.json({message: "データの取得に成功しました", result: qualifications});
    } catch (e) {
        next(e);
    }
});

router.post("/qualification/add", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.name);
        
        // 資格マスタのリストを取得
        await prisma.qualificationMaster.create({
            data: {
                name: req.body.name
            }
        });

        res.json({message: "データの追加に成功しました"});
    } catch (e) {
        next(e);
    }
});

router.post("/qualification/edit", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.id, req.body.name);
        
        // 資格マスタのリストを取得
        await prisma.qualificationMaster.update({
            where: {
                id: req.body.id
            },
            data: {
                name: req.body.name
            }
        });

        res.json({message: "データの変更に成功しました"});
    } catch (e) {
        next(e);
    }
});

router.post("/qualification/delete", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.id);
        
        // 資格マスタのリストを取得
        await prisma.qualificationMaster.delete({
            where: {
                id: req.body.id
            }
        });

        res.json({message: "データの削除に成功しました"});
    } catch (e) {
        next(e);
    }
});

router.post("/qualification/count", async(req: Request, res: Response, next: NextFunction) => {
    try {

        const total = await prisma.qualificationMaster.count();

        res.json({message: "資格情報の総数を取得しました", result: total});

    } catch (e) {
        next(e)
    }
});

router.post("/qualification/count/pages", async(req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.perPage);

        const total = await prisma.qualificationMaster.count();
        const result = Math.ceil(total / req.body.perPage);

        res.json({message: "総ページ数を取得しました", result: result});

    } catch (e) {
        next(e)
    }
});

module.exports = router;
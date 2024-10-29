import { Request, Response, NextFunction } from "express";
import { exist } from "../common/Validation";
import { prisma } from "../server";

// ルーティングモジュールを呼び出し
const router = require("express").Router();

router.post("/student/get", async (req: Request, res: Response, next: NextFunction) => {
    try {
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
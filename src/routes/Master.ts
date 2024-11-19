import { Request, Response, NextFunction } from "express";
import { prisma } from "../server";

// ルーティングモジュールを呼び出し
const router = require("express").Router();

router.post("/qualification", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const qualifications = await prisma.qualificationMaster.findMany();

        res.json({message: "情報の取得に成功しました", result: qualifications});
    } catch (e) {
        next(e);
    }
});

router.post("/class", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const classes = await prisma.classMaster.findMany();

        res.json({message: "情報の取得に成功しました", result: classes});
    } catch (e) {
        next(e);
    }
})

module.exports = router;
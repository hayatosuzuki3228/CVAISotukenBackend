import { NextFunction, Request, Response } from "express";
import { prisma } from "../server";
import { exist } from "../common/Validation";

// ルーティングモジュールを呼び出し
const router = require("express").Router();

router.post("/information", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.id);

        // idから企業の情報を取得
        const data = await prisma.companies.findFirst({
            where: {
                id: (Number)(req.body.id)
            }
        });

        if (data) {
            // データが存在した場合、取得したデータを返す
            res.json({message: "Correct request", result: data})
        } else {
            // 見つからなかった場合エラー
            throw new Error("Company is not found");
        }
        
    } catch(e) {
        next(e);
    }

});

router.post("/search", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.subject, req.body.keyword);

        // キーワードを整形
        let keywords: Object[] = [];

        for (const keyword of req.body.keyword.split(/\s+/)) {
            keywords.push({[req.body.subject]: {contains: keyword}});
        }

        // 一致するものを全て取得
        const data = await prisma.companies.findMany({
            select: {
                id: true,
                name: true,
                [req.body.subject]: true
            },
            where: {
                AND: keywords
            }
        });

        res.json({message: "Request is correct", result: data});
    } catch (e) {
        next(e);
    }
});

module.exports = router;

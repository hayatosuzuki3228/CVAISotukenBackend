import { NextFunction, Request, Response } from "express";
import { prisma } from "../server";
import { exist } from "../common/Validation";
import { isAwaitKeyword } from "typescript";

// ルーティングモジュールを呼び出し
const router = require("express").Router();

router.post("/information", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.id);

        // idから企業の情報を取得
        const data = await prisma.companyProfiles.findFirst({
            where: {
                id: Number(req.body.id)
            }
        });

        if (data) {
            // データが存在した場合、取得したデータを返す
            res.json({message: "リクエストが成功しました", result: data})
        } else {
            // 見つからなかった場合エラー
            throw new Error("会社が見つかりませんでした");
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
        const data = await prisma.companyProfiles.findMany({
            select: {
                id: true,
                name: true,
                [req.body.subject]: true
            },
            where: {
                AND: keywords
            }
        });

        res.json({message: "リクエストが成功しました", result: data});
    } catch (e) {
        next(e);
    }
});

router.post("/message/list", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.companyId);

        const messages = await prisma.companyMessage.findMany(
            {
                select:{
                    id: true,
                    title: true,
                    content: true
                },
                where: {
                    companyId: req.body.companyId,
                    publicshed: true
                }
            }
        );

        res.json({message: "メッセージの取得に成功しました", result: messages});

    } catch (e) {
        next(e);
    }
});

module.exports = router;

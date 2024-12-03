import { NextFunction, Request, Response } from "express";
import { prisma } from "../server";
import { exist } from "../utils/Validation";

// ルーティングモジュールを呼び出し
const router = require("express").Router();

router.post("/information", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.id);

        // idから企業の情報を取得
        const data = await prisma.companyProfile.findFirst({
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

        // 取得する情報量を制御
        const skip = (req.body.perPage ? req.body.perPage : 10) * (req.body.page ? req.body.page : 0);
        const take = (req.body.perPage ? req.body.perPage : 10) * (req.body.page ? req.body.page + 1 : 1);        

        // キーワードを整形
        let keywords: Object[] = [];

        for (const keyword of req.body.keyword.split(/\s+/)) {
            keywords.push({[req.body.subject]: {contains: keyword}});
        }

        // 一致するものを全て取得
        const data = await prisma.companyProfile.findMany({
            select: {
                id: true,
                name: true,
                [req.body.subject]: true
            },
            where: {
                AND: keywords
            },
            skip: skip,
            take: take
        });

        res.json({message: "リクエストが成功しました", result: data});
    } catch (e) {
        next(e);
    }
});

router.post("/search/count", async(req: Request, res: Response, next: NextFunction) => {
    try {
        // キーワードを整形
        let keywords: Object[] = [];

        for (const keyword of req.body.keyword.split(/\s+/)) {
            keywords.push({[req.body.subject]: {contains: keyword}});
        }

        const total = await prisma.companyProfile.count({
            where: {
                AND: keywords
            }
        });

        res.json({message: "企業情報の総数を取得しました", result: total});

    } catch (e) {
        next(e)
    }
});

router.post("/search/count/pages", async(req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.perPage);

        // キーワードを整形
        let keywords: Object[] = [];

        for (const keyword of req.body.keyword.split(/\s+/)) {
            keywords.push({[req.body.subject]: {contains: keyword}});
        }

        const total = await prisma.companyProfile.count({
            where: {
                AND: keywords
            }
        });
        const result = Math.ceil(total / req.body.perPage);

        res.json({message: "総ページ数を取得しました", result: result});

    } catch (e) {
        next(e)
    }
});

module.exports = router;

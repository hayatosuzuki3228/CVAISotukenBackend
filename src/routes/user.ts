import { Request, Response, NextFunction } from "express";
import { exist } from "../common/Validation";
import { prisma } from "../server";

// ルーティングモジュールを呼び出し
const router = require("express").Router();

router.post("/find", async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.session.userId) {
            const data = await prisma.authentications.findFirst({
                where: {
                    id: req.session.userId
                }
            });

            res.json(data);
        } else {
            throw new Error("sesssion data not found");
        }
    } catch(e) {
        next(e);
    }
});

router.post("/profile", async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.session.userId) {
            const data = await prisma.user_profiles.findFirst({
                where: {
                    id: req.session.userId
                }
            });

            res.json(data);
        } else {
            throw new Error("sesssion data not found");
        }
    } catch(e) {
        next(e);
    }
});

router.post("/user_search", async (req: Request, res: Response, next: NextFunction) => {
    try{
        exist(req.body.email);

        // Eメールを元にユーザプロフィールを表示
        const disp_profile = await prisma.authentications.findMany({
            where: {
                email: req.body.email
            },
            include: {
                user_profiles: true
            }
        }).then(console.log);
        res.json({message: "Profile information is displayed", result: disp_profile});
    } catch(e) {
        next(e);
    }
});

router.post("/create_profiles", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_profiles = await prisma.user_profiles.findMany({
            
        });
    } catch (e) {
        next(e)
    }
});

module.exports = router;

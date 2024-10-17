import { Request, Response, NextFunction } from "express";
import { encryption } from "../common/Encryption";
import { exist } from "../common/Validation";
import { prisma } from "../server";

// ルーティングモジュールを呼び出し
const router = require("express").Router();

router.post("/find", async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.session.userId)
        {
            const data = await prisma.authentications.findFirst({
                where: {
                    id: req.session.userId
                }
            });
    
            res.json(data);
        } else {
            throw new Error("session data not found");
        }  
    } catch (e) {
        next(e);
    }
});

router.post("profile", async (req: Request, res: Response, next: NextFunction) => {
    try {
        prisma.authentications.create({
            data: {
                email: req.body.email,
                password: await encryption(req.body.password),
                active: true,
                user_profiles: {
                    create: {
                        name: req.body.name,
                        furigana: req.body.furigana,
                        gender: req.body.gender,
                        birthday: req.body.birtyday,
                        residence: req.body.residence,
                        graduation_year: req.body.graduation_year,
                        qualification: req.body.ruqlification
                    }
                }
            }
        });
        
    } catch (e) {
        next(e);
    }
});

router.post("user_search", async (req: Request, res: Response, next: NextFunction) => {
    try{
        exist(req.body.email);

        // Eメールを元にユーザプロフィールを表示
        const disp_profile = await prisma.authentications.findMany({
            where: {
                email: req.body.email,
            },
            include: {
                user_profiles: true
            }
        });

    } catch(e) {
        next(e);
    }
});

module.exports = router;

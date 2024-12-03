import { Request, Response, NextFunction } from "express";
import { exist } from "../utils/Validation";
import { prisma } from "../server";
import { verifyAdmin } from "../utils/Verify";
import { encryption } from "../utils/Encryption";
import { Result } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";

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

router.post("/student/batch/registration", async (req: Request, res: Response, next: NextFunction) => {
    try {
        for(const student of req.body){
        exist(student.email, student.password, student.qualificationId);
        exist(student.name, student.furigana, student.gender, student.birthday, student.residence, student.graduation_year, student.classId, student.work_location);
        }

        const studentData = req.body;

        // 登録処理
        for(const student of studentData){
            const qualificationdata: Prisma.StudentQualificationCreateManyStudentInputEnvelope = {
                data: student.qualificationId.map((id: any) => ({
                    qualificationId: id
                }))
            };

            await prisma.student.create({
                data: {
                    email: student.email,
                    password: await encryption(student.password),
                    active: true,
                    profile: {
                        create: {
                            name: student.name,
                            furigana: student.furigana,
                            gender: student.gender,
                            birthday: new Date(student.birthday),
                            residence: student.residence,
                            graduation_year: Number(student.graduation_year),
                            classId: student.classId,
                            work_location: student.work_location
                        },
                    },
                    qualifications: {
                        createMany: qualificationdata
                    }
                },
                include: {
                    profile: true,
                }
            });
        };

        res.json({message: "生徒の一括登録が完了しました"});

    } catch (e) {
        next(e);
    }
})

router.post("/student/batch/update", async (req: Request, res: Response, next: NextFunction) =>{
    try {
        exist(req.body.classId)
        
        await prisma.studentProfile.updateMany({
            where: {
                classId: req.body.classId
            },
            data:{
                classId: req.body.update_classId,
                
            }
        });

        res.json({message: "クラス情報が一括更新されました"});
    } catch (e) {
      next(e);  
    }
})

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

        res.json({message: "情報の取得に成功しました", result: result});

    } catch(e) {
        next(e);
    }
});

router.post("/student/count", async(req: Request, res: Response, next: NextFunction) => {
    try {

        // 生徒の総数を取得
        const total = await prisma.student.count();

        res.json({message: "情報の取得に成功しました", result: total});

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

        res.json({message: "情報の取得に成功しました", result: result});

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

        res.json({message: "情報の更新に成功しました"});
    } catch(e) {
        next(e);
    }
});

router.post("/student/batch/activate", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.classId);
        // 学生ユーザーアカウントを有効化
        await prisma.student.updateMany({
            where: {
                profile: {
                    classId: req.body.classId
                }
            },
            data: {
                active: true
            }
        });

        res.json({message: "情報の更新に成功しました"});
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

        res.json({message: "情報の更新に成功しました"});
    } catch(e) {
        next(e);
    }
});

router.post("/student/batch/deactivate", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.classId);
        // 学生ユーザーアカウントを有効化
        await prisma.student.updateMany({
            where: {
                profile: {
                    classId: req.body.classId
                }
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

router.post("/student/password/reset", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.id, req.body.password);

        // IDに合致したユーザのパスワードを更新
        await prisma.student.update({
            where: {
                id: req.body.id
            },
            data:{
                password: await encryption(req.body.password),
            }
        });

        res.json({message: "パスワードが更新されました。"});

    } catch (e) {
        next(e);
    }
})

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

        res.json({message: "情報の取得に成功しました", result: result});

    } catch(e) {
        next(e);
    }
});

router.post("/company/count", async(req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.perPage);

        const total = await prisma.company.count();

        res.json({message: "情報の取得に成功しました", result: total});

    } catch (e) {
        next(e)
    }
});

router.post("/company/count/pages", async(req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.perPage);

        const total = await prisma.company.count();
        const result = Math.ceil(total / req.body.perPage);

        res.json({message: "情報の取得に成功しました", result: result});

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

        res.json({message: "情報の更新に成功しました"});
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

        res.json({message: "情報の更新に成功しました"});
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

        res.json({message: "情報の取得に成功しました", result: result});

    } catch(e) {
        next(e);
    }
});

router.post("/count", async(req: Request, res: Response, next: NextFunction) => {
    try {

        const total = await prisma.admin.count();

        res.json({message: "情報の取得に成功しました", result: total});

    } catch (e) {
        next(e)
    }
});

router.post("/count/pages", async(req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.perPage);

        const total = await prisma.admin.count();
        const result = Math.ceil(total / req.body.perPage);

        res.json({message: "情報の取得に成功しました", result: result});

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

        res.json({message: "情報の更新に成功しました"});
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

        res.json({message: "情報の更新に成功しました"});
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

        res.json({message: "情報の取得に成功しました", result: qualifications});
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

        res.json({message: "情報の追加に成功しました"});
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

        res.json({message: "情報の変更に成功しました"});
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

        res.json({message: "情報の削除に成功しました"});
    } catch (e) {
        next(e);
    }
});

router.post("/qualification/count", async(req: Request, res: Response, next: NextFunction) => {
    try {

        const total = await prisma.qualificationMaster.count();

        res.json({message: "情報の取得に成功しました", result: total});

    } catch (e) {
        next(e)
    }
});

router.post("/qualification/count/pages", async(req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.perPage);

        const total = await prisma.qualificationMaster.count();
        const result = Math.ceil(total / req.body.perPage);

        res.json({message: "情報の取得に成功しました", result: result});

    } catch (e) {
        next(e)
    }
});

router.post("/class/list", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.name);

        // 取得する情報の制御
        const skip = (req.body.perPage ? req.body.perPage : 10) * (req.body.page ? req.body.page : 0);
        const take = (req.body.perPage ? req.body.perPage : 10) * (req.body.page ? req.body.page + 1 : 1);

        const data = await prisma.classMaster.findMany({
            skip: skip,
            take: take
        });

        res.json({message: "情報の追加に成功しました", result: data})

    } catch (e) {
        next(e);
    }
});

router.post("/class/add", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.name, req.body.abbreviation);

        await prisma.classMaster.create({
            data: {
                name: req.body.name,
                abbreviation: req.body.abbreviation
            }
        });

        res.json({message: "情報の追加に成功しました"})

    } catch (e) {
        next(e);
    }
});

router.post("/class/delete", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.id);

        await prisma.classMaster.delete({
            where: {
                id: req.body.id
            }
        });

        res.json({message: "情報の削除に成功しました"})

    } catch (e) {
        next(e);
    }
});

router.post("/class/count", async(req: Request, res: Response, next: NextFunction) => {
    try {

        const total = await prisma.classMaster.count();

        res.json({message: "情報の取得に成功しました", result: total});

    } catch (e) {
        next(e)
    }
});

router.post("/class/count/pages", async(req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.perPage);

        const total = await prisma.classMaster.count();
        const result = Math.ceil(total / req.body.perPage);

        res.json({message: "情報の取得に成功しました", result: result});

    } catch (e) {
        next(e)
    }
});

module.exports = router;
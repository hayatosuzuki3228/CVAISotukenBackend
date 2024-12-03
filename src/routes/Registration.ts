import { Request, Response, NextFunction } from "express";
import { encryption } from "../utils/Encryption";
import { exist } from "../utils/Validation";
import { prisma } from "../server";
import { verifyAdmin } from "../utils/Verify";
import { Prisma } from "@prisma/client";

// ルーティングモジュールを呼び出し
const router = require("express").Router();

router.post("/student", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.email, req.body.password);
        
        if (await prisma.student.findFirst({
            where: {
                email: req.body.email
            }
        })) {
            // メールアドレスが登録済みの場合はじく
            throw new Error("そのメールアドレスはすでに使われています");
        } else {
            // 登録
            const user = await prisma.student.create({
                data: {
                    email: req.body.email,
                    password: await encryption(req.body.password)
                },
            });

            // ログ出力
            console.log(`ユーザアカウントの作成が完了しました。ユーザID: ${user.id}, Eメール: ${user.email}`);

            // レスポンスを返す
            res.json(
                {message: "ユーザアカウントの作成が完了しました"}
            );
        }

    } catch(e) {
        next(e);
    }
});

router.post("/student/qulification", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.email, req.body.password, req.body.qualificationId);

        const data: Prisma.StudentQualificationCreateManyStudentInputEnvelope = {
            data: req.body.qualificationId.map((id: any) => ({
                qualificationId: id
            }))
        };

        // ユーザのauthenticationと資格情報を追加
        await prisma.student.create({
            data: {
                email: req.body.email,
                password: await encryption(req.body.password),
                active: true,
                qualifications: {
                    createMany: data
                }
            }
        });

        console.log("ユーザアカウントおよび資格情報の作成が完了しました");

        // レスポンスを返す
        res.json({message: "ユーザアカウントおよび資格情報の作成が完了しました"});        

    } catch (e) {
        next(e);
    }
});

router.post("/student/status", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.email, req.body.password);
        exist(req.body.name, req.body.furigana, req.body.gender, req.body.birthday, req.body.residence, req.body.graduation_year, req.body.classId, req.body.work_location);

        if (await prisma.student.findFirst({
            where: {
                email: req.body.email
            }
        })) {
            // メールアドレスが登録済みの場合はじく
            throw new Error("そのメールアドレスはすでに使われています");
        } else {

            // 登録
            const user = await prisma.student.create({
                data: {
                    email: req.body.email,
                    password: await encryption(req.body.password),
                    active: true,
                    profile: {
                        create: {
                            name: req.body.name,
                            furigana: req.body.furigana,
                            gender: req.body.gender,
                            birthday: new Date(req.body.birthday),
                            residence: req.body.residence,
                            graduation_year: Number(req.body.graduation_year),
                            classId: req.body.classId,
                            work_location: req.body.work_location
                        },
                    },
                },
                include: {
                    profile: true,
                }
            });

            console.log(req.body)

            // ログ出力
            console.log(`ユーザアカウントおよびプロフィールの作成が完了しました。ユーザID: ${user.id}, Eメール: ${user.email}`);

            // レスポンスを返す
            res.json(
                {message: "ユーザアカウントの作成が完了しました"}
            );
        }

    } catch(e) {
        next(e);
    }
});

router.post("/student/all", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.email, req.body.password, req.body.qualificationId);
        exist(req.body.name, req.body.furigana, req.body.gender, req.body.birthday, req.body.residence, req.body.graduation_year, req.body.classId, req.body.work_location);

        const data: Prisma.StudentQualificationCreateManyStudentInputEnvelope = {
            data: req.body.qualificationId.map((id: any) => ({
                qualificationId: id
            }))
        };

        if (await prisma.student.findFirst({
            where: {
                email: req.body.email
            }
        })) {
            // メールアドレスが登録済みの場合はじく
            throw new Error("そのメールアドレスはすでに使われています");
        } else {

            // 登録
            const user = await prisma.student.create({
                data: {
                    email: req.body.email,
                    password: await encryption(req.body.password),
                    active: true,
                    qualifications: {
                        createMany: data
                    },
                    profile: {
                        create: {
                            name: req.body.name,
                            furigana: req.body.furigana,
                            gender: req.body.gender,
                            birthday: new Date(req.body.birthday),
                            residence: req.body.residence,
                            graduation_year: Number(req.body.graduation_year),
                            classId: req.body.classId,
                            work_location: req.body.work_location
                        },
                    },
                },
                include: {
                    profile: true,
                }
            });

            console.log(req.body)

            // ログ出力
            console.log(`ユーザアカウントおよびプロフィールの作成が完了しました。ユーザID: ${user.id}, Eメール: ${user.email}`);

            // レスポンスを返す
            res.json(
                {message: "ユーザアカウントの作成が完了しました"}
            );
        }

    } catch(e) {
        next(e);
    }
});

router.post("/company", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.email, req.body.password);

        if(await prisma.company.findFirst({
            where: {
                email: req.body.email
            },
        })) {
            throw new Error("そのメールアドレスはすでに使われています")
        } else {
            // 登録
            const company = await prisma.company.create({
                data: {
                    email: req.body.email,
                    password: await encryption(req.body.password)
                },
            });

            // ログ出力
            console.log(`企業用アカウントの作成が完了しました。ユーザID: ${company.id}, Eメール: ${company.email}`);

            // レスポンスを返す
            res.json(
                {message: "企業用アカウントの作成が完了しました"}
            );
        }
    } catch (e) {
        next (e)       
    }
});


router.post("/company/all", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.email, req.body.password);
        
        if (await prisma.company.findFirst({
            where: {
                email: req.body.email
            }
        })) {
            // メールアドレスが登録済みの場合はじく
            throw new Error("そのメールアドレスはすでに使われています");
        } else {

            // 登録
            const company = await prisma.company.create({
                data: {
                    email: req.body.email,
                    password: await encryption(req.body.password),
                    active: true,
                    profile: {
                        create: {
                            code: Number (req.body.code),
                            name: req.body.name,
                            website:  req.body.website,
                            furigana:  req.body.furigana,
                            category:  req.body.category,
                            detail:  req.body.detail,
                            office:  req.body.office,
                            representative:  req.body.representative,
                            foundation_date:  req.body.foundation_date,
                            capital:  req.body.capital,
                            amount_of_sales:  req.body.amount_of_sales,
                            number_of_employees:  req.body.number_of_employees,
                            phone_number:  req.body.phone_number,
                            email:  req.body.email,
                            recruitment_numbers:  req.body.recruitment_numbers,
                            this_year_graduate_recruitment_results:  req.body.this_year_graduate_recruitment_results,
                            last_year_graduate_recruitment_results:  req.body.last_year_graduate_recruitment_results,
                            recruitment_grade:  req.body.recruitment_grade,
                            qualification:  req.body.qualification,
                            ideal_candidate_profile:  req.body.ideal_candidate_profile,
                            work_location:  req.body.work_location,
                            working_hours:  req.body.working_hours,
                            holiday:  req.body.holiday,
                            four_year_course_basic_salary:  req.body.four_year_course_basic_salary,
                            four_year_course_allowances:  req.body.four_year_course_allowances,
                            four_year_course_salary_total:  req.body.four_year_course_salary_total,
                            three_year_course_basic_salary:  req.body.three_year_course_basic_salary,
                            three_year_course_allowances:  req.body.three_year_course_allowances,
                            three_year_course_salary_total:  req.body.three_year_course_salary_total,
                            two_year_course_basic_salary:  req.body.two_year_course_basic_salary,
                            two_year_course_allowances:  req.body.two_year_course_allowances,
                            two_year_course_salary_total:  req.body.two_year_course_salary_total,
                            one_year_course_basic_salary:  req.body.one_year_course_basic_salary,
                            one_year_course_allowances:  req.body.one_year_course_allowances,
                            one_year_course_salary_total:  req.body.one_year_course_salary_total,
                            others:  req.body.others,
                            allowances:  req.body.allowances,
                            welfare:  req.body.welfare,
                            corporate_philosophy:  req.body.corporate_philosophy,
                            appeal:  req.body.appeal
                        },
                    },
                },
                include: {
                    profile: true,
                }
            });

            console.log(req.body)

            // ログ出力
            console.log(`企業用アカウントおよびプロフィールの作成が完了しました。ユーザID: ${company.id}, Eメール: ${company.email}`);

            // レスポンスを返す
            res.json(
                {message: "企業用アカウントの作成が完了しました"}
            );
        }

    } catch(e) {
        next(e);
    }
});

router.post("/admin", async (req: Request, res: Response, next: NextFunction) => {
    try {
        verifyAdmin(req.session.userCategory);
        exist(req.body.email, req.body.password);
        
        if (await prisma.admin.findFirst({
            where: {
                email: req.body.email
            }
        })) {
            // メールアドレスが登録済みの場合はじく
            throw new Error("そのメールアドレスはすでに使われています");
        } else {
            // 登録
            const user = await prisma.admin.create({
                data: {
                    email: req.body.email,
                    password: await encryption(req.body.password)
                },
            });

            // ログ出力
            console.log(`管理者アカウントの作成が完了しました。ユーザID: ${user.id}, Eメール: ${user.email}`);

            // レスポンスを返す
            res.json(
                {message: "管理者アカウントの作成が完了しました"}
            );
        }

    } catch(e) {
        next(e);
    }
});

module.exports = router;

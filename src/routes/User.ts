import { Request, Response, NextFunction } from "express";
import { prisma } from "../server";
import { verify, verifyCompany, verifyStudent } from "../utils/Verify";
import { UserCategory } from "../utils/UserCategory";
import { exist } from "../utils/Validation";


// ルーティングモジュールを呼び出し
const router = require("express").Router();

// /studentから始まる場合、セッション情報がstudentであることを検証する
router.use("/student", async (req: Request, res: Response, next: NextFunction) => {
    try {
        verifyStudent(req.session.userCategory);
        next();
    }
    catch (e) {
        next(e);
    }
});

// /companyから始まる場合、セッション情報がcompnyであることを検証する
router.use("/company", async (req: Request, res: Response, next: NextFunction) => {
    try {
        verifyCompany(req.session.userCategory);
        next();
    }
    catch (e) {
        next(e);
    }
});

router.post("/profile/get", async (req: Request, res: Response, next: NextFunction) => {
    try {
        verify(req.session.userCategory, UserCategory.student, UserCategory.company);

        let data;
        switch(req.session.userCategory) {
            case UserCategory.student: 
                data = await prisma.studentProfiles.findFirst({
                    where: {
                        id: req.session.userId
                    }
                });
                break;
            
            case UserCategory.company:
                data = await prisma.companyProfiles.findFirst({
                    where: {
                        companyId: req.session.userId
                    }
                })

                break;
        }
        res.json({message: "情報の取得に成功しました。", result: data});
        
    } catch(e) {
        next(e);
    }
});

router.post("/profile/set", async (req: Request, res: Response, next: NextFunction) => {
    try {
        verify(req.session.userCategory, UserCategory.student, UserCategory.company);

        switch(req.session.userCategory) {
            case UserCategory.student:
                // ユーザが生徒アカウントの場合
                if (await prisma.studentProfiles.findFirst({
                    where:{
                        id: Number(req.session.userId)
                    }
                }))
                {
                    // プロフィールが存在する場合
                    await prisma.studentProfiles.update({
                        where: {
                            id: req.session.userId
                        },
                        data: {
                            name: req.body.name,
                            furigana: req.body.furigana,
                            gender: req.body.gender,
                            birthday: (req.body.birthday ? new Date(req.body.birthday) : undefined),
                            residence: req.body.residence,
                            graduation_year: (req.body.graduation_year ? Number(req.body.graduation_year) : undefined),
                            // qualification: Number(req.body.qualification)
                        }
                    })
                } else {
                    // プロフィールが存在しない場合
                    exist(req.body.name, req.body.furigana, req.body.gender, req.body.birthday, req.body.residence, req.body.graduation_year);
                    await prisma.studentAuthentications.update({
                        where: {
                            id: req.session.userId
                        },
                        data: {
                            studentprofiles: {
                                create: {
                                    name: req.body.name,
                                    furigana: req.body.furigana,
                                    gender: req.body.gender,
                                    birthday: new Date(req.body.birthday),
                                    residence: req.body.residence,
                                    graduation_year: Number(req.body.graduation_year),
                                    // qualification: Number(req.body.qualification)
                                }
                            }
                        },
                        include: {
                            studentprofiles: true
                        }
                    });
                }
                break;

            case UserCategory.company:
                // ユーザが企業アカウントの場合
                if (await prisma.companyProfiles.findFirst({
                    where:{
                        companyId: Number(req.session.userId)
                    }
                }))
                {
                    // プロフィールが存在する場合
                    await prisma.companyProfiles.update({
                        where: {
                            companyId: req.session.userId
                        },
                        data: {
                            code: req.body.code,
                            name: req.body.name,
                            furigana: req.body.furigana,
                            website: req.body.website,
                            category: req.body.category,
                            detail: req.body.detail,
                            office: req.body.office,
                            representative: req.body.representative,
                            foundation_date: req.body.foundation_date,
                            capital: req.body.capital,
                            amount_of_sales: req.body.amount_of_sales,
                            number_of_employees: req.body.number_of_employees,
                            phone_number: req.body.phone_number,
                            email: req.body.email,
                            recruitment_numbers: req.body.recruitment_numbers,
                            this_year_graduate_recruitment_results: req.body.this_year_graduate_recruitment_results,
                            last_year_graduate_recruitment_results: req.body.last_year_graduate_recruitment_results,
                            recruitment_grade: req.body.recruitment_grade,
                            qualification: req.body.qualification,
                            ideal_candidate_profile: req.body.ideal_candidate_profile,
                            work_location: req.body.work_location,
                            working_hours: req.body.working_hours,
                            holiday: req.body.holiday,
                            four_year_course_basic_salary: req.body.four_year_course_basic_salary,
                            four_year_course_allowances: req.body.four_year_course_allowances,
                            four_year_course_salary_total: req.body.four_year_course_salary_total,
                            three_year_course_basic_salary: req.body.three_year_course_basic_salary,
                            three_year_course_allowances: req.body.three_year_course_allowances,
                            three_year_course_salary_total: req.body.three_year_course_salary_total,
                            two_year_course_basic_salary: req.body.two_year_course_basic_salary,
                            two_year_course_allowances: req.body.two_year_course_allowances,
                            two_year_course_salary_total: req.body.two_year_course_salary_total,
                            one_year_course_basic_salary: req.body.one_year_course_basic_salary,
                            one_year_course_allowances: req.body.one_year_course_allowances,
                            one_year_course_salary_total: req.body.one_year_course_salary_total,
                            others: req.body.others,
                            allowances: req.body.allowances,
                            welfare: req.body.welfare,
                            corporate_philosophy: req.body.corporate_philosophy,
                            appeal: req.body.appeal
                        }
                    });
                } else {
                    // プロフィールが存在しない場合
                    exist(req.body.code);
                    await prisma.companyAuthentications.update({
                        where: {
                            id: req.session.userId
                        },
                        data: {
                            companyprofiles: {
                                create: {
                                    code: req.body.code,
                                    name: req.body.name,
                                    furigana: req.body.furigana,
                                    website: req.body.website,
                                    category: req.body.category,
                                    detail: req.body.detail,
                                    office: req.body.office,
                                    representative: req.body.representative,
                                    foundation_date: req.body.foundation_date,
                                    capital: req.body.capital,
                                    amount_of_sales: req.body.amount_of_sales,
                                    number_of_employees: req.body.number_of_employees,
                                    phone_number: req.body.phone_number,
                                    email: req.body.email,
                                    recruitment_numbers: req.body.recruitment_numbers,
                                    this_year_graduate_recruitment_results: req.body.this_year_graduate_recruitment_results,
                                    last_year_graduate_recruitment_results: req.body.last_year_graduate_recruitment_results,
                                    recruitment_grade: req.body.recruitment_grade,
                                    qualification: req.body.qualification,
                                    ideal_candidate_profile: req.body.ideal_candidate_profile,
                                    work_location: req.body.work_location,
                                    working_hours: req.body.working_hours,
                                    holiday: req.body.holiday,
                                    four_year_course_basic_salary: req.body.four_year_course_basic_salary,
                                    four_year_course_allowances: req.body.four_year_course_allowances,
                                    four_year_course_salary_total: req.body.four_year_course_salary_total,
                                    three_year_course_basic_salary: req.body.three_year_course_basic_salary,
                                    three_year_course_allowances: req.body.three_year_course_allowances,
                                    three_year_course_salary_total: req.body.three_year_course_salary_total,
                                    two_year_course_basic_salary: req.body.two_year_course_basic_salary,
                                    two_year_course_allowances: req.body.two_year_course_allowances,
                                    two_year_course_salary_total: req.body.two_year_course_salary_total,
                                    one_year_course_basic_salary: req.body.one_year_course_basic_salary,
                                    one_year_course_allowances: req.body.one_year_course_allowances,
                                    one_year_course_salary_total: req.body.one_year_course_salary_total,
                                    others: req.body.others,
                                    allowances: req.body.allowances,
                                    welfare: req.body.welfare,
                                    corporate_philosophy: req.body.corporate_philosophy,
                                    appeal: req.body.appeal
                                }
                            }
                        },
                        include: {
                            companyprofiles: true
                        }
                    });
                }

            res.json({message: "情報の更新に成功しました"});
        }
        
    } catch (e) {
        next(e);
    }
});

router.post("/company/message/new", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.title, req.body.content);

        // メッセージの作成
        await prisma.companyMessage.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                publicshed: req.body.published == undefined ? true : req.body.published,
                company: {
                    connect: {
                        id: req.session.userId
                    }
                }
            }
        });

        res.json({message: "メッセージの送信に成功しました"});

    } catch (e) {
        next(e);
    }
});

router.post("/company/message/list", async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 取得する情報の制御
        const skip = (req.body.perPage ? req.body.perPage : 10) * (req.body.page ? req.body.page : 0);
        const take = (req.body.perPage ? req.body.perPage : 10) * (req.body.page ? req.body.page + 1 : 1);

        // セッションに格納されているuserIdからメッセージを全て取得
        const messages = await prisma.companyMessage.findMany({
            where: {
                companyId: req.session.userId
            },
            skip: skip,
            take: take,
            orderBy: {
                postAt: 'asc'
            }
        });

        res.json({message: "メッセージの取得に成功しました", result: messages});

    } catch (e) {
        next(e);
    }
});

router.post("/company/message/edit", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.id);

        // パラメータから取得したIDのメッセージのタイトル、コンテンツの更新
        await prisma.companyMessage.update({
            where: {
                companyId: req.session.userId,
                id: req.body.id
            },
            data: {
                title: req.body.title,
                content: req.body.content
            }
        });

        res.json({message: "メッセージの更新に成功しました"});

    } catch (e) {
        next(e);
    }
});

router.post("/company/message/delete", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.id);

        // パラメータから取得したIDのメッセージを削除
        await prisma.companyMessage.delete({
            where: {
                companyId: req.session.userId,
                id: req.body.id
            }
        });

        res.json({message: "メッセージの更新に削除に成功しました"});

    } catch (e) {
        next(e);
    }
});

router.post("/company/message/publish", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.id);

        // パラメータから取得したIDのメッセージを公開
        await prisma.companyMessage.update({
            where: {
                companyId: req.session.userId,
                id: req.body.id
            },
            data: {
                publicshed: true
            }
        });

        res.json({message: "メッセージの公開に成功しました"});

    } catch (e) {
        next(e);
    }
});

router.post("/company/message/private", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.id);

        // パラメータから取得したメッセージを非公開
        await prisma.companyMessage.update({
            where: {
                companyId: req.session.userId,
                id: req.body.id
            },
            data: {
                publicshed: false
            }
        });

        res.json({message: "メッセージの非公開に成功しました"});

    } catch (e) {
        next(e);
    }
});


module.exports = router;

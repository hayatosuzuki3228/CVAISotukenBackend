import { Request, Response, NextFunction } from "express";
import { prisma } from "../server";
import { verify, verifyCompany, verifyStudent } from "../utils/Verify";
import { UserCategory } from "../utils/UserCategory";
import { exist } from "../utils/Validation";
import { Prisma } from "@prisma/client";

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
                data = await prisma.studentProfile.findFirst({
                    where: {
                        id: req.session.userId
                    }
                })
                break;
            
            case UserCategory.company:
                data = await prisma.companyProfile.findFirst({
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
                if (await prisma.studentProfile.findFirst({
                    where:{
                        id: Number(req.session.userId)
                    }
                }))
                {
                    // プロフィールが存在する場合
                    await prisma.studentProfile.update({
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
                    exist(req.body.name, req.body.furigana, req.body.gender, req.body.birthday, req.body.residence, req.body.graduation_year, req.body.classId);
                    await prisma.student.update({
                        where: {
                            id: req.session.userId
                        },
                        data: {
                            profile: {
                                create: {
                                    name: req.body.name,
                                    furigana: req.body.furigana,
                                    gender: req.body.gender,
                                    birthday: new Date(req.body.birthday),
                                    residence: req.body.residence,
                                    graduation_year: Number(req.body.graduation_year),
                                    class: req.body.classId,
                                    work_location: req.body.work_location
                                    // qualification: Number(req.body.qualification)
                                }
                            }
                        },
                        include: {
                            profile: true
                        }
                    });
                }
                break;

            case UserCategory.company:
                // ユーザが企業アカウントの場合
                await prisma.companyProfile.upsert({
                    where: {
                        id: req.session.userId
                    },
                    update:{
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
                    },
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
                        appeal: req.body.appeal,
                        company: {
                            connect: {
                                id: req.session.userId
                            }
                        }
                    }
                });
                break;
        }

        res.json({message: "情報の更新に成功しました"});
        
    } catch (e) {
        next(e);
    }
});

router.post("/student/qualification/list", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await prisma.studentQualification.findMany({
            where: {
                userId: req.session.userId
            },
            select: {
                id: true,
                qualificationId: true,
                qualificationmaster: {
                    select: {
                        name: true
                    }
                }
            }
        }).then((result) =>
            // データを整形
            result.map((result) =>  
                ({
                    id: result.id,
                    qualificationId: result.qualificationId,
                    name: result.qualificationmaster?.name
                })
            )
        );

        res.json({message: "情報の取得に成功しました", result: result});
    } catch (e) {
        next(e);
    }
});

router.post("/student/qualification/add", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.id);

        const existIdObject = await prisma.studentQualification.findMany({
            where: {
                userId: req.session.userId
            },
            select: {
                qualificationId: true
            }
        }).then((result) => 
            result.map((result) =>
                result.qualificationId
            )
        );

        const data: Prisma.StudentQualificationCreateWithoutStudentInput[] = [];
        for(let qualificationId of req.body.id){
            if(!(existIdObject.includes(qualificationId))) {
                data.push({
                    qualificationmaster: {
                        connect: {
                            id: qualificationId
                        }
                    }
                })
            };
        };

        // 資格の種類とユーザIDの追加
        await prisma.student.update({
            where: {
                id: req.session.userId
            },
            data: {
                qualifications: {
                    create: data
                }
            }
        });

        res.json({message: "情報の追加に成功しました"});
    } catch (e) {
        next(e);
    }    
});

router.post("/student/qualification/delete", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await prisma.studentQualification.deleteMany({
            where: {
                userId: req.session.userId,
                qualificationId: {
                    in: req.body.id
                }
            }
        });

        res.json({message: "情報の削除に成功しました"});
    } catch (e) {
        next(e);
    }
});

router.post("/student/bookmark/list", async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 取得する情報量を制御
        const skip = (req.body.perPage ? req.body.perPage : 10) * (req.body.page ? req.body.page : 0);
        const take = (req.body.perPage ? req.body.perPage : 10) * (req.body.page ? req.body.page + 1 : 1);        


        const result = await prisma.studentBookmark.findMany({
            select:{
                id: true,
                companyId: true,
                addedAt: true
            },
            where: {
                userId: req.session.userId,
            },
            skip: skip,
            take: take,
            orderBy: {
                addedAt: "asc"
            }
        });

        res.json({message: "情報の取得に成功しました", result: result})

        } catch (e) {
        next(e);
    }
});

router.post("/student/bookmark/add", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.id);

        await prisma.student.update({
            where: {
                id: req.session.userId
            },
            data: {
                bookmarks: {
                    create: {
                        company: {
                            connect: {
                                id: req.body.id
                            }
                        }
                    }
                }
            }
        });

        res.json({message: "情報の追加に成功しました"});

        } catch (e) {
        next(e);
    }
});

router.post("/student/bookmark/delete", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.id);

        await prisma.studentBookmark.deleteMany({
            where: {
                userId: req.session.userId,
                companyId: req.body.id
            }
        });

        res.json({message: "情報の削除に成功しました"});

        } catch (e) {
        next(e);
    }
});

router.post("/student/bookmark/count", async(req: Request, res: Response, next: NextFunction) => {
    try {

        const total = await prisma.studentBookmark.count();

        res.json({message: "情報を取得しました", result: total});

    } catch (e) {
        next(e)
    }
});

router.post("/student/bookmark/count/pages", async(req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.perPage);

        const total = await prisma.studentBookmark.count();
        const result = Math.ceil(total / req.body.perPage);

        res.json({message: "情報を取得しました", result: result});

    } catch (e) {
        next(e)
    }
});

router.post("/company/message/new", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.title, req.body.content);

        let sendTo: Prisma.CompanyMessageToCreateManyCompanyMessageInput[]
        if (req.body.classId ) {
            const classes: number[] = req.body.class;

            sendTo = classes.map(id => ({
                classId: id
            }));
        } else {
            sendTo = []
        }
        
        // メッセージの作成
        await prisma.companyMessage.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                published: req.body.published == undefined ? true : req.body.published,
                link: req.body.link,
                company: {
                    connect: {
                        id: req.session.userId
                    }
                },
                class: {
                    createMany: {
                        data: sendTo
                    }
                }
            }
        });

        res.json({message: "情報の送信に成功しました"});

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
            select:{
                id: true,
                postAt: true,
                updateAt: true,
                published: true,
                title: true,
                content: true,
                link: true,
                class: {
                    select: {
                        class: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            },
            where: {
                companyId: req.session.userId
            },
            skip: skip,
            take: take,
            orderBy: {
                postAt: 'asc'
            }
        }).then(data => data.map(data => ({
            id: data.id,
            postAt: data.postAt,
            updateAt: data.updateAt,
            published: data.published,
            title: data.title,
            content: data.content,
            link: data.link,
            class: data.class.map(data => (data.class.name))
        })));

        res.json({message: "情報の取得に成功しました", result: messages});

    } catch (e) {
        next(e);
    }
});

router.post("/company/message/count", async(req: Request, res: Response, next: NextFunction) => {
    try {

        const total = await prisma.companyMessage.count();

        res.json({message: "情報の取得に成功しました", result: total});

    } catch (e) {
        next(e)
    }
});

router.post("/company/message/count/pages", async(req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.perPage);

        const total = await prisma.companyMessage.count();
        const result = Math.ceil(total / req.body.perPage);

        res.json({message: "情報の取得に成功しました", result: result});

    } catch (e) {
        next(e)
    }
});

router.post("/company/message/edit", async (req: Request, res: Response, next: NextFunction) => {
    try {
        exist(req.body.id);

        let classes: number[];
        let sendTo: Prisma.CompanyMessageToCreateManyCompanyMessageInput[];

        if (req.body.classId) {
            await prisma.companyMessageTo.deleteMany();

            classes = req.body.classId;

            sendTo = classes?.map(id => ({
                    classId: id
                }));
        } else {
            sendTo = [];
        }

        // パラメータから取得したIDのメッセージのタイトル、コンテンツの更新
        await prisma.companyMessage.update({
            where: {
                companyId: req.session.userId,
                id: req.body.id
            },
            data: {
                title: req.body.title,
                content: req.body.content,
                published: req.body.published,
                link: req.body.link,
                class: {
                    createMany: {
                        data: sendTo
                    }
                }
            }
        });

        res.json({message: "情報の更新に成功しました"});

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

        await prisma.companyMessageTo.deleteMany();

        res.json({message: "情報の更新に削除に成功しました"});

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
                published: true
            }
        });

        res.json({message: "情報の公開に成功しました"});

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
                published: false
            }
        });

        res.json({message: "情報の非公開に成功しました"});

    } catch (e) {
        next(e);
    }
});

module.exports = router;

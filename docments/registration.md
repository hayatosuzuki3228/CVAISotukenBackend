## リンク
1. [Echo](echo.md)
1. [Authenticaiton](authenticaiton.md)
1. [Registration](registration.md)
1. [User](user.md)
1. [Company](company.md)
1. [Admin](admin.md)
1. [Master](master.md)

## 目次
1. [/registration/student](#registrationstudent)
1. [/registration/student/qualification](#registrationstudentqualification)
1. [/registration/student/status](#registrationstudentstatus)
1. [/registration/student/all](#registrationstudentall)
1. [/registration/company](#registrationcompany)
1. [/registration/admin](#registrationadmin-)

## Registration
ユーザーアカウントを作成します。
- ### ./registration/student  
    パスワードとメールアドレスから学生ユーザーアカウントを作成します
    - パラメータ  
        ```
        email: string,                              // メールアドレス  
        password: string                            // 8-24文字、英数字によるパスワード
        ```
    - 戻り値  
        ```
        {
            "message": string                       // 応答結果
        }
        ```

- ### ./registration/student/qualification
    学生ユーザーアカウントを資格情報と共に作成します
    - パラメータ
        ```
        email: string,                              // メールアドレス  
        password: string,                           // 8-24文字、英数字によるパスワード
        qualificationId: int[]                      // 資格IDリスト
        ```
    - 戻り値
        ```
            {
                "message": string                   // 応答結果
            }
        ```

- ### ./registration/student/status  
    学生ユーザーアカウントをプロフィールと共に作成します
    - パラメータ
        ```
        email: string,                              // メールアドレス  
        password: string,                           // 8-24文字、英数字によるパスワード
        name: string,                               // 名前
        furigana: string,                           // ふりがな
        gender: string,                             // 性別 (0: 男性, 1: 女性, 9: その他)
        birthday: date,                             // 誕生年月日 format: yyyy-mm-dd or yyyy/mm/dd
        residence: string,                          // 居住地
        classId: number,                            // クラスID
        graduation_year: number,                    // 卒業年 format: yyyy
        ```
    - 戻り値
        ```
            {
                "message": string                   // 応答結果
            }
        ```

- ### ./registration/student/all  
    学生ユーザーアカウントをプロフィール、資格情報と共に作成します
    - パラメータ
        ```
        email: string,                              // メールアドレス  
        password: string,                           // 8-24文字、英数字によるパスワード
        name: string,                               // 名前
        furigana: string,                           // ふりがな
        gender: string,                             // 性別 (0: 男性, 1: 女性, 9: その他)
        birthday: date,                             // 誕生年月日 format: yyyy-mm-dd or yyyy/mm/dd
        residence: string,                          // 居住地
        classId: number,                            // クラスID
        graduation_year: number,                    // 卒業年 format: yyyy
        qualificationId: number[]                   // 資格ID
        ```
    - 戻り値
        ```
            {
                "message": string                   // 応答結果
            }
        ```

- ### ./registration/company  
    パスワードとメールアドレスから企業ユーザアカウントを作成します
    - パラメータ  
        ```
        email: string,                              // メールアドレス  
        password: string                            // 8-24文字、英数字によるパスワード
        ```
    - 戻り値  
        ```
        {
            "message": string                       // 応答結果
        }
        ```

- ### ./registration/company/all  
    企業ユーザアカウントを全企業データ作成します
    - パラメータ  
        ```
        email: string,                                                  // メールアドレス  
        password: string,                                               // 8-24文字、英数字によるパスワード
        "code": number | null,                                          // 会社コード
        "name": string | null,                                          // 会社名
        "website": string | null,                                       // 会社ウェブサイトURL
        "furigana": string | null,                                      // ふりがな
        "category": string | null,                                      // 業種
        "detail": string | null,                                        // 事業内容
        "office": string | null,                                        // 事業所
        "representative": string | null,                                // 代表者名
        "foundation_date": string | null,                               // 設立年月日
        "capital": string | null,                                       // 資本金
        "amount_of_sales": string | null,                               // 売上高
        "number_of_employees": string | null,                           // 従業員数
        "phone_number": string | null,                                  // 採用関連連絡先電話番号
        "email": string | null,                                         // 採用関連連絡先メールアドレス
        "recruitment_numbers": string | null,                           // 募集予定人数
        "this_year_graduate_recruitment_results": string | null,        // 今年度卒業生採用実績
        "last_year_graduate_recruitment_results": string | null,        // 昨年度卒業生採用実績
        "recruitment_grade": string | null,                             // 募集学科
        "qualification": string | null,                                 // 資格募集要項
        "ideal_candidate_profile": string | null,                       // 望む人物像
        "work_location": string | null,                                 // 勤務地
        "working_hours": string | null,                                 // 勤務時間
        "holiday": string | null,                                       // 休日・休暇
        "four_year_course_basic_salary": string | null,                 // 4年課程基本給給与実績
        "four_year_course_allowances": string | null,                   // 4年課程諸手当給与実績
        "four_year_course_salary_total": string | null,                 // 4年課程合計給与実績
        "three_year_course_basic_salary": string | null,                // 3年課程基本給給与実績
        "three_year_course_allowances": string | null,                  // 3年課程諸手当給与実績
        "three_year_course_salary_total": string | null,                // 3年課程合計給与実績
        "two_year_course_basic_salary": string | null,                  // 2年課程基本給給与実績
        "two_year_course_allowances": string | null,                    // 2年課程諸手当給与実績
        "two_year_course_salary_total": string | null,                  // 2年課程合計給与実績
        "one_year_course_basic_salary": string | null,                  // 1年課程基本給給与実績
        "one_year_course_allowances": string | null,                    // 1年課程諸手当給与実績
        "one_year_course_salary_total": string | null,                  // 1年課程合計給与実績
        "others": string | null,                                        // その他（昇給・賞与等）
        "allowances": string | null,                                    // 諸手当
        "welfare": string | null,                                       // 福利厚生
        "corporate_philosophy": string | null,                          // 経営理念
        "appeal": string | null                                         // アピール
        ```
    - 戻り値  
        ```
        {
            "message": string                       // 応答結果
        }
        ```

- ### ./registration/admin *  
    パスワードとメールアドレスから管理者アカウントを作成します
    管理者アカウントの認証状態でのみ実行できます
    - パラメータ  
        ```
        email: string,                              // メールアドレス  
        password: string                            // 8-24文字、英数字によるパスワード
        ```
    - 戻り値  
        ```
        {
            "message": string                       // 応答結果
        }
        ```
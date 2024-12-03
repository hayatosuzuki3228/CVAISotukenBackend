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
        name: string?,                              // 名前
        furigana: string?,                          // ふりがな
        gender: string?,                            // 性別 (0: 男性, 1: 女性, 9: その他)
        birthday: date?,                            // 誕生年月日 format: yyyy-mm-dd or yyyy/mm/dd
        residence: string?,                         // 居住地
        work_location: string?,                     // 希望勤務地
        classId: number?,                           // クラスID
        graduation_year: number?,                   // 卒業年 format: yyyy
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
        name: string?,                              // 名前
        furigana: string?,                          // ふりがな
        gender: string?,                            // 性別 (0: 男性, 1: 女性, 9: その他)
        birthday: date?,                            // 誕生年月日 format: yyyy-mm-dd or yyyy/mm/dd
        residence: string?,                         // 居住地
        classId: number?,                           // クラスID
        graduation_year: number?,                   // 卒業年 format: yyyy
        work_location: string?                      // 希望勤務地
        qualificationId: number[]?                  // 資格ID
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
    企業ユーザアカウントを作成します
    - パラメータ  
        ```
        email: string,                                          // メールアドレス  
        password: string,                                       // 8-24文字、英数字によるパスワード
        "code": number?,                                        // 会社コード
        "name": string?,                                        // 会社名
        "website": string?,                                     // 会社ウェブサイトURL
        "furigana": string?,                                    // ふりがな
        "category": string?,                                    // 業種
        "detail": string?,                                      // 事業内容
        "office": string?,                                      // 事業所
        "representative": string?,                              // 代表者名
        "foundation_date": string?,                             // 設立年月日
        "capital": string?,                                     // 資本金
        "amount_of_sales": string?,                             // 売上高
        "number_of_employees": string?,                         // 従業員数
        "phone_number": string?,                                // 採用関連連絡先電話番号
        "email": string?,                                       // 採用関連連絡先メールアドレス
        "recruitment_numbers": string?,                         // 募集予定人数
        "this_year_graduate_recruitment_results": string?,      // 今年度卒業生採用実績
        "last_year_graduate_recruitment_results": string?,      // 昨年度卒業生採用実績
        "recruitment_grade": string?,                           // 募集学科
        "qualification": string?,                               // 資格募集要項
        "ideal_candidate_profile": string?,                     // 望む人物像
        "work_location": string?,                               // 勤務地
        "working_hours": string?,                               // 勤務時間
        "holiday": string?,                                     // 休日・休暇
        "four_year_course_basic_salary": string?,               // 4年課程基本給給与実績
        "four_year_course_allowances": string?,                 // 4年課程諸手当給与実績
        "four_year_course_salary_total": string?,               // 4年課程合計給与実績
        "three_year_course_basic_salary": string?,              // 3年課程基本給給与実績
        "three_year_course_allowances": string?,                // 3年課程諸手当給与実績
        "three_year_course_salary_total": string?,              // 3年課程合計給与実績
        "two_year_course_basic_salary": string?,                // 2年課程基本給給与実績
        "two_year_course_allowances": string?,                  // 2年課程諸手当給与実績
        "two_year_course_salary_total": string?,                // 2年課程合計給与実績
        "one_year_course_basic_salary": string?,                // 1年課程基本給給与実績
        "one_year_course_allowances": string?,                  // 1年課程諸手当給与実績
        "one_year_course_salary_total": string?,                // 1年課程合計給与実績
        "others": string?,                                      // その他（昇給・賞与等）
        "allowances": string?,                                  // 諸手当
        "welfare": string?,                                     // 福利厚生
        "corporate_philosophy": string?,                        // 経営理念
        "appeal": string?                                       // アピール
        ```
    - 戻り値  
        ```
        {
            "message": string                                   // 応答結果
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
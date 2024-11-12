## リンク
1. [Echo](echo.md)
1. [Authenticaiton](authenticaiton.md)
1. [Registration](registration.md)
1. [User](user.md)
1. [Company](company.md)
1. [Admin](admin.md)

## 目次
1. [/user/profile/get](#userprofileget-)
1. [/user/profile/set](#userprofileset-)
1. [/user/student/qualification/list](#userstudentqualificationlist-)
1. [/user/student/qualification/add](#userstudentqualificationadd-)
1. [/user/student/qualification/delete](#userstudentqualificationdelete-)
1. [/user/student/bookmark/list](#userstudentbookmarklist-)
1. [/user/student/bookmark/count](#userstudentbookmarkcount-)
1. [/user/student/bookmark/count/pages](#userstudentbookmarkcountpages-)
1. [/user/student/bookmark/add](#userstudentbookmarkadd-)
1. [/user/student/bookmark/delete](#userstudentbookmarkdelete-)
1. [/user/company/message/new](#usercompanymessagenew-)
1. [/user/company/message/list](#usercompanymessagelist-)
1. [/user/company/message/count](#userstudentmessagecount-)
1. [/user/company/message/count/pages](#userstudentmessagecountpages-)
1. [/user/company/message/edit](#usercompanymessageedit-)
1. [/user/company/message/delete](#usercompanymessagedelete-)
1. [/user/company/message/publish](#usercompanymessagepublish-)
1. [/user/company/message/private](#usercompanymessageprivate-)

## User
ユーザーアカウント操作を行います
- ### ./user/profile/get *  
    保持されている認証情報からユーザー情報を取得します
    - パラメータ
        ```
        無し
        ```
    - 戻り値
        ```
        // 認証が学生ユーザーの場合
        {
            "message": string,                                                  // 応答結果
            "result": null | {
                "id": number,                                                   // ユーザID
                "name": string,                                                 // ユーザ名
                "furigana": string,                                             // ふりがな
                "gender": string,                                               // 性別 0: 男性, 1: 女性, 9: その他
                "birthday": date,                                               // 誕生日 format: yyyy-mm-dd or yyyy/mm/dd
                "residence": string,                                            // 居住地
                "graduation_year": number,                                      // 卒業年 format: yyyy
                "qualification": int                                            // 資格
            }
        }

        // 認証が企業ユーザの場合
        {
            "message": "情報の取得に成功しました",
            "result": null | {
                "id": number,                                                   // 会社ID
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
            }
        }
        ```

- ### ./user/profile/set *  
    認証しているユーザーのプロフィールを作成若しくは上書きします
    - パラメータ
        ```
        // 認証が学生ユーザーの場合
        name: string,                                           // 名前
        furigana: string,                                       // ふりがな
        gender: string,                                         // 性別 0: 男性, 1: 女性, 9: その他
        birthday: date,                                         // 誕生日 format: yyyy-mm-dd or yyyy/mm/dd
        residence: string,                                      // 居住地
        graduation_year: number,                                // 卒業年 format: yyyy
        qualification: number                                   // 資格

        // 認証が企業ユーザーの場合
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
        "one_year_course_basic_salary": string?                 // 1年課程基本給給与実績
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
            "message": string                       // 応答結果
        }
        ```

- ### ./user/student/qualification/list *
    学生ユーザーアカウントでの認証状態でのみ利用可能です  
    認証された学生ユーザーが設定している資格情報を取得します
    - パラメータ
        ```
        無し
        ```
    - 戻り値
        ```
        "message": string                           // 応答結果
        "result": [
            {
                "id": number,                       // 資格情報ID
                "qualificationId": number           // 資格ID
                "name": string                      // 資格名
            }
        ]
        ```

- ### ./user/student/qualification/add *
    学生ユーザーアカウントでの認証状態でのみ利用可能です  
    認証された学生ユーザーに資格情報を追加します
    - パラメータ
        ```
        id: string[]                                // 資格ID
        ```
    - 戻り値
        ```
        "message": string                           // 応答結果
        ```

- ### ./user/student/qualification/delete *
    学生ユーザーアカウントでの認証状態でのみ利用可能です  
    認証された学生ユーザーの資格情報を削除します
    - パラメータ
        ```
        id: string[]                                // 資格ID
        ```
    - 戻り値
        ```
        "message": string                           // 応答結果
        ```

- ### ./user/student/bookmark/list *  
    学生ユーザーアカウントでの認証状態でのみ利用可能です
    認証された学生ユーザーのブックマーク情報を取得します
    - パラメータ
        ```
        perPage?: number,                           // ページごとの取得コンテンツ数
        page?: number                               // 開始ページ数
        ```
    - 戻り値
        ```
        "message": string,                          // 応答結果
        "result":                                   // ブックマークリスト
        [
            "id": string,                           // ブックマークID
            "companyId": number                     // 会社ID
            "addedAt": Date                         // 追加日時
        ]
        ```

- ### ./user/student/bookmark/count *
    ユーザーに登録されているブックマーク数を取得します
    - パラメータ
        ```
        無し
        ```
    - 戻り値
        ```
        {
            "message": string,                      // 応答結果
            "result": number                        // ブックマーク数
        }
        ```

- ### ./user/student/bookmark/count/pages *
    ユーザーに登録されているブックマークをページ数として取得します
    - パラメータ
        ```
        perPage: number                             // ページごとのブックマーク数
        ```
    - 戻り値
        ```
        {
            "message": string,                      // 応答結果
            "result": number                        // ページ数
        }
        ```

- ### ./user/student/bookmark/add *
    学生ユーザーアカウントでの認証状態でのみ利用可能です
    認証された学生ユーザーにブックマークを追加します
    - パラメータ
        ```
        id: number                                  // ブックマークする会社ID
        ```
    - 戻り値
        ```
        {
            "message": string                       // 応答結果
        }
        ```

- ### ./user/student/bookmark/delete *
    学生ユーザーアカウントでの認証状態でのみ利用可能です
    認証された学生ユーザーのブックマークを削除します
    - パラメータ
        ```
        id: number                                  // ブックマークする会社ID
        ```
    - 戻り値
        ```
        {
            "message": string                       // 応答結果
        }
        ```

- ### ./user/company/message/new *  
    企業ユーザーアカウントでの認証状態でのみ利用可能です
    認証された企業アカウントに紐づいたメッセージを作成します
    - パラメータ
        ```
        title: string,                              // メッセージタイトル
        content: string,                            // メッセージ内容
        published: boolean?                         // 公開状況　省略した場合true 
        ```
    - 戻り値
        ```
        {
            "message": string                       // 応答結果
        }
        ```

- ### ./user/company/message/list *  
    企業ユーザーアカウントでの認証状態でのみ利用可能です
    認証された企業アカウントに紐づいたメッセージを取得します
    - パラメータ
        ```
        perPage?: number,                           // ページごとの取得コンテンツ数
        page?: number                               // 取得開始ページ数
        ```
    - 戻り値
        ```
        {
            "message": string,                      // 応答結果
            "result":                               // メッセージリスト
            [
                "id": string,                       // メッセージID
                "postAt": Date,                     // 投稿日時
                "updateAt": Date,                   // 編集日時
                "published": boolean,               // 公開状況
                "title": string,                    // メッセージタイトル
            ]
        }
        ```
    
- ### ./user/student/message/count *
    ユーザーに登録されているメッセージ数を取得します
    - パラメータ
        ```
        無し
        ```
    - 戻り値
        ```
        {
            "message": string,                      // 応答結果
            "result": number                        // メッセージ数
        }
        ```

- ### ./user/student/message/count/pages *
    ユーザーに登録されているメッセージをページ数として取得します
    - パラメータ
        ```
        perPage: number                             // ページごとのメッセージ数
        ```
    - 戻り値
        ```
        {
            "message": string,                      // 応答結果
            "result": number                        // ページ数
        }
        ```

- ### ./user/company/message/edit *  
    企業ユーザーアカウントでの認証状態でのみ利用可能です
    認証された企業アカウントに紐づいたメッセージを更新します
    - パラメータ
        ```
        id: string,                                 // メッセージUUID
        title: string?,                             // メッセージタイトル
        content: string?,                           // メッセージ内容 
        ```
    - 戻り値
        ```
        {
            "message": string                       // 応答結果
        }
        ```

- ### ./user/company/message/delete *  
    企業ユーザーアカウントでの認証状態でのみ利用可能です
    認証された企業アカウントに紐づいたメッセージを削除します
    - パラメータ
        ```
        id: string,                                 // メッセージUUID
        ```
    - 戻り値
        ```
        {
            "message": string                       // 応答結果
        }
        ```

- ### ./user/company/message/publish *  
    企業ユーザーアカウントでの認証状態でのみ利用可能です
    企業アカウントに紐づいたメッセージを公開します
    - パラメータ
        ```
        id: string,                                 // メッセージUUID
        ```
    - 戻り値
        ```
        {
            "message": string                       // 応答結果
        }
        ```

- ### ./user/company/message/private *  
    企業ユーザーアカウントでの認証状態でのみ利用可能です
    認証された企業アカウントに紐づいたメッセージを非公開にします
    - パラメータ
        ```
        id: string,                                 // メッセージUUID
        ```
    - 戻り値
        ```
        {
            "message": string                       // 応答結果
        }
        ```
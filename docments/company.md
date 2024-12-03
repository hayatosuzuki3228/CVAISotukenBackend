## リンク
1. [Echo](echo.md)
1. [Authenticaiton](authenticaiton.md)
1. [Registration](registration.md)
1. [User](user.md)
1. [Company](company.md)
1. [Admin](admin.md)
1. [Master](master.md)

## 目次
1. [/company/information](#companyinformation)
1. [/company/search](#companysearch)
1. [/company/search/count](#companysearchcount)
1. [/company/search/count/pages](#companysearchcountpages)

## Company
会社情報操作を行います。
- ### ./company/information  
    idから会社の詳細情報を取得します
    - パラメータ  
        ```
        id: int                                                         // 連番で割り振られているid
        ```
    - 戻り値  
        ```
        {
            "message": string,                                          // 応答結果
            "result":                                                   // 取得内容
            {
                "id": number,                                           // 会社ID
                "code": number,                                         // 会社コード
                "name": string,                                         // 会社名
                "website": string,                                      // 会社ウェブサイトURL
                "furigana": string,                                     // ふりがな
                "category": string,                                     // 業種
                "detail": string,                                       // 事業内容
                "office": string,                                       // 事業所
                "representative": string,                               // 代表者名
                "foundation_date": string,                              // 設立年月日
                "capital": string,                                      // 資本金
                "amount_of_sales": string,                              // 売上高
                "number_of_employees": string,                          // 従業員数
                "phone_number": string,                                 // 採用関連連絡先電話番号
                "email": string,                                        // 採用関連連絡先メールアドレス
                "recruitment_numbers": string,                          // 募集予定人数
                "this_year_graduate_recruitment_results": string,       // 今年度卒業生採用実績
                "last_year_graduate_recruitment_results": string,       // 昨年度卒業生採用実績
                "recruitment_grade": string,                            // 募集学科
                "qualification": string,                                // 資格募集要項
                "ideal_candidate_profile": string,                      // 望む人物像
                "work_location": string,                                // 勤務地
                "working_hours": string,                                // 勤務時間
                "holiday": string,                                      // 休日・休暇
                "four_year_course_basic_salary": string,                // 4年課程基本給給与実績
                "four_year_course_allowances": string,                  // 4年課程諸手当給与実績
                "four_year_course_salary_total": string,                // 4年課程合計給与実績
                "three_year_course_basic_salary": string,               // 3年課程基本給給与実績
                "three_year_course_allowances": string,                 // 3年課程諸手当給与実績
                "three_year_course_salary_total": string,               // 3年課程合計給与実績
                "two_year_course_basic_salary": string,                 // 2年課程基本給給与実績
                "two_year_course_allowances": string,                   // 2年課程諸手当給与実績
                "two_year_course_salary_total": string,                 // 2年課程合計給与実績
                "one_year_course_basic_salary": string,                 // 1年課程基本給給与実績
                "one_year_course_allowances": string,                   // 1年課程諸手当給与実績
                "one_year_course_salary_total": string,                 // 1年課程合計給与実績
                "others": string,                                       // その他（昇給・賞与等）
                "allowances": string,                                   // 諸手当
                "welfare": string,                                      // 福利厚生
                "corporate_philosophy": string,                         // 経営理念
                "appeal": string                                        // アピール
            }
        }
        ```
- ### ./company/search  
    検索対象とキーワードから会社を検索します  
    検索対象は会社情報スキーマのカラム名から選択できます  
    キーワードはスペース区切りにすることで、複数のキーワードをAND検索できます
    - パラメータ  
        ```
        subject: string,                            // 検索対象
        keyword: string,                            // 検索キーワード  
        perPage: number?,                           // ページごとの取得コンテンツ数
        page: number?                               // 取得開始ページ数
        ```
    - 戻り値  
        ```
        {
            "message": string,                      // 応答結果
            "result":                               // 会社リスト
            [
                {
                    "id": number,                   // 会社ID
                    "name": string,                 // 会社名
                    [subject]: string               // 検索対象
                }, ...
            ]
        }
        ```

- ### ./company/search/count
    検索対象とキーワードから会社を検索し、総数を取得します   
    検索対象は会社情報スキーマのカラム名から選択できます  
    キーワードはスペース区切りにすることで、複数のキーワードをAND検索できます
    - パラメータ  
        ```
        subject: string,                            // 検索対象
        keyword: string,                            // 検索キーワード  
        perPage: number?,                           // ページごとの取得コンテンツ数
        page: number?                               // 取得開始ページ数
        ```
    - 戻り値  
        ```
        {
            "message": string,                      // 応答結果
            "result": number                        // 総数
        }
        ```

- ### ./company/search/count/pages
    検索対象とキーワードから会社を検索し、ページ数を取得します   
    検索対象は会社情報スキーマのカラム名から選択できます  
    キーワードはスペース区切りにすることで、複数のキーワードをAND検索できます
    - パラメータ  
        ```
        subject: string,                            // 検索対象
        keyword: string,                            // 検索キーワード  
        perPage: number                             // ページごとのコンテンツ数
        ```
    - 戻り値  
        ```
        {
            "message": string,                      // 応答結果
            "result": number                        // ページ数
        }
        ```
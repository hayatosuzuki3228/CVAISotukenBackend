# API利用ドキュメント
APIサーバー用ソフトウェアを起動したサーバーのIPアドレスのポート8000番に対し、POSTメソッドでリクエストを送信してください。   
リクエストパラメータはJSON形式で送信してください。   
ステータスが200の場合、リクエストが成功しており、500の場合、何らかの理由で失敗しています。  
パラメータに?が付いている場合、必須ではありません。  
リクエストURLの末尾に*が付いている場合、認証が必須です。

## 目次
1. [Echo](#echo)
1. [Authenticaiton](#authentication)
1. [Registration](#registration)
1. [User](#user)
1. [Company](#company)
1. [Admin](#admin)

## Echo
サーバーの起動及び動作確認を行います。
- ./echo
    - パラメータ
        ```
        無し
        ```
    - 戻り値
        ```
        {
            "message": string                       // 応答結果
        }
        ```

## Authentication
認証を行います。  
- ./authentication/student  
    学生ユーザーの認証を行い、サーバーに認証情報を保持します。  
    認証情報は1時間保持されます。
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

- ./authentication/company  
    企業の認証を行い、サーバーに認証情報を保持します。  
    認証情報は1時間保持されます。
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

- ./authentication/admin  
    企業の認証を行い、サーバーに認証情報を保持します。  
    認証情報は1時間保持されます。
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

- ./authentication/logout *  
    ユーザーの認証状態を解除します。
    - パラメータ  
        ```
        無し
        ```
    - 戻り値  
        ```
        {
            "message": string                       // 応答結果
        }
        ```

## Registration
ユーザーアカウントを作成します。
- ./registration/student  
    パスワードとメールアドレスから学生ユーザーアカウントを作成します。
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

- ./registration/student/all  
    学生ユーザーアカウントと同時にプロフィールを設定します。
    - パラメータ
        ```
        email: string,                              // メールアドレス  
        password: string,                           // 8-24文字、英数字によるパスワード
        name: string,                               // 名前
        furigana: string,                           // ふりがな
        gender: string,                             // 性別 (0: 男性, 1: 女性, 9: その他)
        birthday: date,                             // 誕生年月日 format: yyyy-mm-dd or yyyy/mm/dd
        residence: string,                          // 居住地
        graduation_year: number,                    // 卒業年 format: yyyy
        qualification: number,                      // 資格
        ```
    - 戻り値
        ```
            {
                "message": string                   // 応答結果
            }
        ```

- ./registration/company  
    パスワードとメールアドレスから企業ユーザアカウントを作成します。
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

- ./registration/admin *  
    パスワードとメールアドレスから管理者アカウントを作成します。
    管理者アカウントの認証状態でのみ実行できます。
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

## User
ユーザーアカウント操作を行います。
- ./user/profile/get *  
    保持されている認証情報からユーザ情報を取得します。
    - パラメータ
        ```
        無し
        ```
    - 戻り値
        ```
        {
            "message": string
            "result": {
                "id": number,                       // ユーザID
                "name": string,                     // ユーザ名
                "furigana": string,                 // ふりがな
                "gender": string,                   // 性別 0: 男性, 1: 女性, 9: その他
                "birthday": date,                   // 誕生日 format: yyyy-mm-dd or yyyy/mm/dd
                "residence": string,                // 居住地
                "graduation_year": number,          // 卒業年 format: yyyy
                "qualification": int                // 資格
            }
        }
        ```

- ./user/profile/set *  
    認証しているユーザのプロフィールを作成若しくは上書きします。
    - パラメータ
        ```
        name: string,                               // 名前
        furigana: string,                           // ふりがな
        gender: string,                             // 性別 0: 男性, 1: 女性, 9: その他
        birthday: date,                             // 誕生日 format: yyyy-mm-dd or yyyy/mm/dd
        residence: string,                          // 居住地
        graduation_year: number,                    // 卒業年 format: yyyy
        qualification: number                       // 資格
        ```
    - 戻り値
        ```
        {
            "message": string                       // 応答結果
        }
        ```

- ./user/company/message/new *  
    企業ユーザアカウントでの認証状態でのみ利用可能です。
    企業アカウントに紐づいたメッセージを作成します。
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
            "result":                               // メッセージリスト
            [
                {
                    "id": string,                   // メッセージUUID
                    "companyId": number,            // 企業ID
                    "publicshed": boolean,          // 公開状況
                    "title": string,                // メッセージタイトル
                    "content": string,              // メッセージ内容
                }, ...
            ]
        }
        ```

- ./user/company/message/list *  
    企業ユーザアカウントでの認証状態でのみ利用可能です。
    企業アカウントに紐づいたメッセージを取得します。
    - パラメータ
        ```
        perPage?: number,                           // ページごとの取得コンテンツ数
        page?: number                               // 取得開始ページ数
        ```
    - 戻り値
        ```
        {
            "message": string                       // 応答結果
        }
        ```

- ./user/company/message/edit *  
    企業ユーザアカウントでの認証状態でのみ利用可能です。
    企業アカウントに紐づいたメッセージを更新します。
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

- ./user/company/message/delete *  
    企業ユーザアカウントでの認証状態でのみ利用可能です。
    企業アカウントに紐づいたメッセージを削除します。
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

- ./user/company/message/publish *  
    企業ユーザアカウントでの認証状態でのみ利用可能です。
    企業アカウントに紐づいたメッセージを公開します。
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

- ./user/company/message/private *  
    企業ユーザアカウントでの認証状態でのみ利用可能です。
    企業アカウントに紐づいたメッセージを非公開にします。
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

## Company
会社情報操作を行います。
- ./company/information  
    idから会社の詳細情報を取得します。
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
- ./company/search  
    検索対象とキーワードから会社を検索します。  
    検索対象は会社情報スキーマのカラム名から選択できます。  
    キーワードはスペース区切りにすることで、複数のキーワードをAND検索できます。
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

- ./company/message/list  
    会社のIDから公開されているメッセージを取得します。
    - パラメータ  
        ```
        id: number,                                 // 会社ID
        perPage: number?,                           // ページごとの取得コンテンツ数
        page: number?                               // 取得開始ページ数
        ```
    - 戻り値  
        ```
        {
            "message": string,                      // 応答結果
            "result":                               // メッセージリスト
            [
                {
                    "id": number,                   // メッセージID
                    "title": string,                // メッセージタイトル
                    "content": string               // 内容
                }, ...
            ]
        }
        ```

## Admin
管理者による操作を行います。
全ての操作に管理者アカウントによる認証が必要になります。
- ./admin/student/list *  
    登録されている生徒の一覧を取得します
    - パラメータ  
        ```
        perPage?: number,                           // ページごとの取得コンテンツ数
        page?: number                               // 取得開始ページ数
        ```
    - 戻り値  
        ```
        {
            "message": string,                      // 応答結果
            "result":                               // 生徒リスト
            [
                {
                    "id": number,                   // 生徒ユーザID
                    "name": string,                 // 生徒名
                    "active": boolean               // 生徒アカウントの有効性
                }, ...
            ]
        }
        ```

- ./admin/student/activate *  
    登録されている生徒のアカウントを有効にします
    - パラメータ  
        ```
        id: number                                  // 生徒ユーザID
        ```
    - 戻り値  
        ```
        {
            "message": string                       // 応答結果
        }
        ```

- ./admin/student/deactivate *  
    登録されている生徒のアカウントを無効にします
    - パラメータ  
        ```
        id: number                                  // 生徒ユーザID
        ```
    - 戻り値  
        ```
        {
            "message": string                       // 応答結果
        }
        ```

- ./admin/company/list *  
    登録されている企業の一覧を取得します
    - パラメータ  
        ```
        perPage?: number                            // ページごとの取得コンテンツ数
        page?: number                               // 取得開始ページ数
        ```
    - 戻り値  
        ```
        {
            "message": string,                      // 応答結果
            "result":                               // 企業リスト
            [
                {
                    "id": number,                   // 企業ユーザID
                    "name": string,                 // 企業名
                    "active": boolean               // 企業アカウントの有効性
                }, ...
            ]
        }
        ```

- ./admin/company/activate *  
    登録されている企業のアカウントを有効にします
    - パラメータ  
        ```
        id: number                                  // 企業ユーザID
        ```
    - 戻り値  
        ```
        {
            "message": string                       // 応答結果
        }
        ```

- ./admin/company/deactivate *  
    登録されている企業のアカウントを無効にします
    - パラメータ  
        ```
        id: number                                  // 企業ユーザID
        ```
    - 戻り値  
        ```
        {
            "message": string                       // 応答結果
        }
        ```

- ./admin/list *  
    登録されている管理者の一覧を取得します
    - パラメータ  
        ```
        perPage?: number                            // ページごとの取得コンテンツ数
        page?: number                               // 取得開始ページ数
        ```
    - 戻り値  
        ```
        {
            "message": string,                      // 応答結果
            "result":                               // 管理者リスト
            [
                {
                    "id": number,                   // 管理者ID
                    "active": boolean               // 管理者アカウントの有効性
                }, ...
            ]
        }
        ```

- ./admin/activate *  
    登録されている管理者のアカウントを有効にします
    - パラメータ  
        ```
        id: number                                  // 管理者ID
        ```
    - 戻り値  
        ```
        {
            "message": string                       // 応答結果
        }
        ```

- ./admin/deactivate *  
    登録されている管理者のアカウントを無効にします
    - パラメータ  
        ```
        id: number                                  // 管理者ID
        ```
    - 戻り値  
        ```
        {
            "message": string                       // 応答結果
        }
        ```
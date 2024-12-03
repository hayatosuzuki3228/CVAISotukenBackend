## リンク
1. [Echo](echo.md)
1. [Authenticaiton](authenticaiton.md)
1. [Registration](registration.md)
1. [User](user.md)
1. [Company](company.md)
1. [Admin](admin.md)
1. [Master](master.md)

## 目次
1. [/admin/student/batch/registaration](#adminstudentbatchregistartion-)
1. [/admin/student/batch/update](#adminstudentbatchupdate-)
1. [/admin/student/list](#adminstudentlist-)
1. [/admin/student/count](#adminstudentlist-)
1. [/admin/student/count/pages](#adminstudentcountpages-)
1. [/admin/student/activate](#adminstudentactivate-)
1. [/admin/student/batch/activate](#adminstudentbatchactivate-)
1. [/admin/student/deactivate](#adminstudentdeactivate-)
1. [/admin/student/deactivate](#adminstudentbatchdeactivate-)
1. [/admin/student/password/reset](#adminstudentpasswordreset-)
1. [/admin/company/list](#adminstudentlist-)
1. [/admin/company/count](#admincompanycount-)
1. [/admin/company/count/pages](#admincompanycountpages-)
1. [/admin/company/activate](#admincompanyactivate-)
1. [/admin/company/deactivate](#admincompanydeactivate-)
1. [/admin/list](#adminlist-)
1. [/admin/count](#admincount-)
1. [/admin/count/pages](#admincountpages-)
1. [/admin/activate](#adminactivate-)
1. [/admin/deactivate](#admindeactivate-)
1. [/admin/qualification/list](#adminqualificationlist-)
1. [/admin/qualification/count](#adminqualificationcount-)
1. [/admin/qualification/count/pages](#adminqualificationcountpages-)
1. [/admin/qualification/add](#adminqualificationadd-)
1. [/admin/qualification/edit](#adminqualificationedit-)
1. [/admin/qualification/delete](#adminqualificationdelete-)
1. [/admin/class/list](#adminclasslist-)
1. [/admin/class/count](#adminclasscount-)
1. [/admin/class/count/pages](#adminclasscountpages-)
1. [/admin/class/add](#adminclassadd-)
1. [/admin/class/edit](#adminclassedit-)
1. [/admin/class/delete](#adminclassdelete-)

## Admin
管理者による操作を行います。
全ての操作に管理者アカウントによる認証が必要になります

- ### ./admin/student/batch/registration *
    生徒の情報を一括で登録します
    - パラメータ
        ```
        email: string,                              // メールアドレス
        password: string,                           // パスワード
        qualificationId: int[],                     // 資格IDリスト
        name: string,                               // 名前
        furigana: string,                           // ふりがな
        gender: string,                             // 性別(0: 男性, 1: 女性, 9: その他)
        birthday: date,                             // 誕生年月日(format: yyyy-mm-dd もしくは yyyy/mm/dd)
        residence: string                           // 居住地
        graduation_year: number,                    // 卒業年(format: yyyy)
        classId: number,                            // クラスID
        work_location: string                       // 希望勤務地
        ```
    - 戻り値
        ```
        {
            "message": string,                      // 応答結果
        }
        ```

- ### ./admin/student/batch/update *
    登録されている生徒のクラスIDを一括で更新します
    - パラメータ
        ```
        classId: number,                            // 更新前のクラスID
        update_classId?: number                     // 更新後のクラスID
        ```
    - 戻り値
        ```
        {
            "message": string,                      // 応答結果
        }
        ```

- ### ./admin/student/list *  
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
- ### ./admin/student/count *
    登録されている生徒数を取得します
    - パラメータ
        ```
        無し
        ```
    - 戻り値
        ```
        {
            "message": string,                      // 応答結果
            "result": number                        // 生徒数
        }
        ```

- ### ./admin/student/count/pages *
    登録されている生徒をページ数として取得します
    - パラメータ
        ```
        perPage: number                             // ページごとの生徒数
        ```
    - 戻り値
        ```
        {
            "message": string,                      // 応答結果
            "result": number                        // ページ数
        }
        ```

- ### ./admin/student/activate *  
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

- ### ./admin/student/batch/activate *  
    登録されている生徒のアカウントを一括で有効にします
    - パラメータ  
        ```
        classId: number                                  // クラスID
        ```
    - 戻り値  
        ```
        {
            "message": string                       // 応答結果
        }
        ```

- ### ./admin/student/deactivate *  
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

- ### ./admin/student/batch/deactivate *  
    登録されている生徒のアカウントを一括で無効にします
    - パラメータ  
        ```
        classId: number                                  // クラスID
        ```
    - 戻り値  
        ```
        {
            "message": string                       // 応答結果
        }
        ```

- ### ./admin/student/password/reset *
    登録されている生徒のパスワードを更新します
    - パラメータ
        ```
        id: number,                                 // 生徒ユーザID
        password: string,                           // パスワード
        ```
    - 戻り値
        ```
        {
            "message": string                       // 応答結果
        }
        ```

- ### ./admin/company/list *  
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

- ### ./admin/company/count *
    登録されている企業数を取得します
    - パラメータ
        ```
        無し
        ```
    - 戻り値
        ```
        {
            "message": string,                      // 応答結果
            "result": number                        // 企業数
        }
        ```

- ### ./admin/company/count/pages *
    登録されている企業をページ数として取得します
    - パラメータ
        ```
        perPage: number                             // ページごとの企業数
        ```
    - 戻り値
        ```
        {
            "message": string,                      // 応答結果
            "result": number                        // ページ数
        }
        ```

- ### ./admin/company/activate *  
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

- ### ./admin/company/deactivate *  
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

- ### ./admin/list *  
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

- ### ./admin/count *
    登録されている管理者数を取得します
    - パラメータ
        ```
        無し
        ```
    - 戻り値
        ```
        {
            "message": string,                      // 応答結果
            "result": number                        // 管理者数
        }
        ```

- ### ./admin/count/pages *
    登録されている管理者をページ数として取得します
    - パラメータ
        ```
        perPage: number                             // ページごとの管理者数
        ```
    - 戻り値
        ```
        {
            "message": string,                      // 応答結果
            "result": number                        // ページ数
        }
        ```

- ### ./admin/activate *  
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

- ### ./admin/deactivate *  
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

- ### ./admin/qualification/list *
    登録されている資格マスタの一覧を取得します
    - パラメータ
        ```
        perPage?: number                            // ページごとの取得コンテンツ数
        page?: number                               // 取得開始ページ数
        ```
    - 戻り値
        ```
        {
            "message": string,                      // 応答結果
            "result":                               // 資格リスト
            [
                "id": number,                       // 資格ID
                "name": string                      // 資格名
            ]
        }
        ```

- ### ./admin/qualification/count *
    登録されている資格数を取得します
    - パラメータ
        ```
        無し
        ```
    - 戻り値
        ```
        {
            "message": string,                      // 応答結果
            "result": number                        // 資格数
        }
        ```

- ### ./admin/qualification/count/pages *
    登録されている資格をページ数として取得します
    - パラメータ
        ```
        perPage: number                             // ページごとの資格数
        ```
    - 戻り値
        ```
        {
            "message": string,                      // 応答結果
            "result": number                        // ページ数
        }
        ```

- ### ./admin/qualification/add *
    資格マスタに新しい資格を追加します
    - パラメータ
        ```
        "name": string                              // 資格名
        ```
    - 戻り値
        ```
        {
            "message": string                       // 応答結果
        }
        ```

- ### ./admin/qualification/edit *
    資格マスタに登録されている情報を編集します
    - パラメータ
        ```
        "id": number,                               // 資格ID
        "name": string                              // 資格名
        ```
    - 戻り値
        ```
        {
            "message": string                       // 応答結果
        }
        ```

- ### ./admin/qualification/delete *
    資格マスタから資格を削除します
    - パラメータ
        ```
        "id": number                                // 資格名
        ```
    - 戻り値
        ```
        {
            "message": string                       // 応答結果
        }
        ```

- ### ./admin/class/list *
    登録されているクラスマスタの一覧を取得します
    - パラメータ
        ```
        perPage?: number                            // ページごとの取得コンテンツ数
        page?: number                               // 取得開始ページ数
        ```
    - 戻り値
        ```
        {
            "message": string,                      // 応答結果
            "result":                               // クラスリスト
            [
                "id": number,                       // クラスID
                "name": string                      // クラス名
            ]
        }
        ```

- ### ./admin/class/count *
    登録されているクラス数を取得します
    - パラメータ
        ```
        無し
        ```
    - 戻り値
        ```
        {
            "message": string,                      // 応答結果
            "result": number                        // クラス数
        }
        ```

- ### ./admin/class/count/pages *
    登録されているクラスをページ数として取得します
    - パラメータ
        ```
        perPage: number                             // ページごとのクラス数
        ```
    - 戻り値
        ```
        {
            "message": string,                      // 応答結果
            "result": number                        // ページ数
        }
        ```

- ### ./admin/class/add *
    クラスマスタに新しいクラスを追加します
    - パラメータ
        ```
        "name": string                              // クラス名
        ```
    - 戻り値
        ```
        {
            "message": string                       // 応答結果
        }
        ```

- ### ./admin/class/edit *
    クラスマスタに登録されている情報を編集します
    - パラメータ
        ```
        "id": number,                               // クラスID
        "name": string                              // クラス名
        ```
    - 戻り値
        ```
        {
            "message": string                       // 応答結果
        }
        ```

- ### ./admin/class/delete *
    クラスマスタから資格を削除します
    - パラメータ
        ```
        "id": number                                // クラス名
        ```
    - 戻り値
        ```
        {
            "message": string                       // 応答結果
        }
        ```
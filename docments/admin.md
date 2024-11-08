## リンク
1. [Echo](echo.md)
1. [Authenticaiton](authenticaiton.md)
1. [Registration](registration.md)
1. [User](user.md)
1. [Company](company.md)
1. [Admin](admin.md)

## 目次
1. [/admin/student/list](#adminstudentlist-)
1. [/admin/student/activate](#adminstudentactivate-)
1. [/admin/student/deactivate](#adminstudentdeactivate-)
1. [/admin/company/list](#adminstudentlist-)
1. [/admin/company/activate](#admincompanyactivate-)
1. [/admin/company/deactivate](#admincompanydeactivate-)
1. [/admin/list](#adminlist-)
1. [/admin/activate](#adminactivate-)
1. [/admin/deactivate](#admindeactivate-)
1. [/admin/qualification/list](#adminqualificationlist-)
1. [/admin/qualification/add](#adminqualificationadd-)
1. [/admin/qualification/edit](#adminqualificationedit-)
1. [/admin/qualification/delete](#adminqualificationdelete-)

## Admin
管理者による操作を行います。
全ての操作に管理者アカウントによる認証が必要になります
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

- ## ./admin/student/activate *  
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

- ## ./admin/student/deactivate *  
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

- ## ./admin/company/list *  
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

- ## ./admin/company/activate *  
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

- ## ./admin/company/deactivate *  
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

- ## ./admin/list *  
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

- ## ./admin/activate *  
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

- ## ./admin/deactivate *  
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

- ## ./admin/qualification/list *
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

- ## ./admin/qualification/add *
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

- ## ./admin/qualification/edit *
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

- ## ./admin/qualification/delete *
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
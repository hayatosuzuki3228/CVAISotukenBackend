## リンク
1. [Echo](echo.md)
1. [Authenticaiton](authenticaiton.md)
1. [Registration](registration.md)
1. [User](user.md)
1. [Company](company.md)
1. [Admin](admin.md)

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
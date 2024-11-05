## リンク
1. [Echo](echo.md)
1. [Authenticaiton](authenticaiton.md)
1. [Registration](registration.md)
1. [User](user.md)
1. [Company](company.md)
1. [Admin](admin.md)

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
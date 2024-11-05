## リンク
1. [Echo](echo.md)
1. [Authenticaiton](authenticaiton.md)
1. [Registration](registration.md)
1. [User](user.md)
1. [Company](company.md)
1. [Admin](admin.md)

## 目次
1. [./authentication/student](#authenticationstudent)
1. [./authentication/company](#authenticationcompany)
1. [./authentication/admin](#authenticationadmin)

## Authentication
認証を行います。  
- ### ./authentication/student  
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

- ### ./authentication/company  
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

- ### ./authentication/admin  
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
# API利用ドキュメント
POSTメソッドを用い、APIサーバー用ソフトウェアを起動したサーバーのIPアドレスのポート6666番に対し、POSTメソッドでリクエストを送信してください。  
ステータスが200の場合、リクエストが成功しており、500の場合、何らかの理由で失敗しています。

## 目次
1. [Authenticaiton](#authentication)
1. [Registration](#registration)
1. [User](#user)
1. [Company](#company)

## Authentication
認証を行います。  
以下、*が記述されているリクエストはこの認証が必要になります。
- ./authentication/  
    - 引数  
        ```
        email: メールアドレス  
        password: 8-12文字、英数字によるパスワード
        ```
    - 戻り値  
        ```
        {
            "message": string
        }
        ```

## Registration
ユーザーアカウントを作成します。
- ./registration/  
    - 引数  
        ```
        email: メールアドレス  
        password: 8-12文字、英数字によるパスワード
        ```
    - 戻り値  
        ```
        {
            "message": string
        }
        ```

## User
ユーザーアカウント操作を行います。

## Company
会社情報操作を行います。
- ./company/information/  
    - 引数  
        ```
        id: 連番で割り振られているid
        ```
    - 戻り値  
        ```
        {
            "message": string,
            "result": 
            {
                ...会社情報
            }
        }
        ```
- ./company/search/  
    - 引数  
        ```
        subject: 検索対象,
        keyword: 検索キーワード  
        ```
    - 戻り値  
        ```
        {
            "message": string,
            "result": {
                "id": number,
                "name": string,
                [subject]: string
            }
        }
        ```

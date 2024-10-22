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
        password: 8-24文字、英数字によるパスワード
        ```
    - 戻り値  
        ```
        {
            "message": string
        }
        ```
- ./authentication/logout *
    - 引数  
        ```
        無し
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
        password: 8-24文字、英数字によるパスワード
        ```
    - 戻り値  
        ```
        {
            "message": string
        }
        ```
- ./registration/all
    - 引数
        ```
        email: メールアドレス  
        password: 8-24文字、英数字によるパスワード
        name: 名前
        furigana: ふりがな
        gender: 性別 (0: 男性, 1: 女性, 9: その他)
        birthday:　誕生年月日
        residence: 居住地
        graduation_year: 卒業年
        qualification: 資格
        ```
    - 戻り値
        ```
            {
                "message": string
            }
        ```

## User
ユーザーアカウント操作を行います。
- ./user/profile *
    - 引数
        ```
        無し
        ```
    - 戻り値
        ```
        {
            "message": string
            "result": {
                "id": number,
                "name": string,
                "furigana": string,
                "gender": number,
                "birthday": date,
                "residence": string,
                "graduation_year": date,
                "qualification": int
            }
        }
        ```

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

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
    認証を行い、サーバーに認証情報を保持します。  
    認証情報は1時間保持されます。
    - パラメータ  
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
    認証状態を解除します。
    - パラメータ  
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
    パスワードとメールアドレスからユーザーアカウントを作成します。
    - パラメータ  
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
    ユーザアカウントと同時にプロフィールを設定します。
    - パラメータ
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

- ./user/profile/set *  
    認証しているユーザのプロフィールを作成若しくは上書きします。
    - パラメータ
        ```
            name: 名前,
            furigana: ふりがな,
            gender: 性別 0: 男性　1: 女性 9: その他,
            birthday: 誕生日,
            residence: 居住地,
            graduation_year: 卒業年,
            qualification: 資格
        ```
## Company
会社情報操作を行います。
- ./company/information/  
    idから会社の詳細情報を取得します。
    - パラメータ  
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
    検索対象とキーワードから会社を検索します。  
    検索対象は会社情報スキーマのカラム名から選択できます。  
    キーワードはスペース区切りにすることで、複数のキーワードをAND検索できます。
    - パラメータ  
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

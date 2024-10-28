# API利用ドキュメント
POSTメソッドを用い、APIサーバー用ソフトウェアを起動したサーバーのIPアドレスのポート8000番に対し、POSTメソッドでリクエストを送信してください。  
ステータスが200の場合、リクエストが成功しており、500の場合、何らかの理由で失敗しています。

## 目次
1. [Authenticaiton](#authentication)
1. [Registration](#registration)
1. [User](#user)
1. [Company](#company)

## Authentication
認証を行います。  
以下、*が記述されているリクエストはこの認証が必要になります。
- ./authentication/student  
    学生ユーザーの認証を行い、サーバーに認証情報を保持します。  
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

- ./authentication/company  
    企業の認証を行い、サーバーに認証情報を保持します。  
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
    ユーザーの認証状態を解除します。
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
- ./registration/student  
    パスワードとメールアドレスから学生ユーザーアカウントを作成します。
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
- ./registration/student/all  
    学生ユーザーアカウントと同時にプロフィールを設定します。
    - パラメータ
        ```
        email: メールアドレス  
        password: 8-24文字、英数字によるパスワード
        name: 名前
        furigana: ふりがな
        gender: 性別 (0: 男性, 1: 女性, 9: その他)
        birthday: 誕生年月日
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

- ./registration/company  
    パスワードとメールアドレスから企業ユーザアカウントを作成します。
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
- ./registration/company/all  
    企業ユーザアカウントと同時にプロフィールを設定します。
    - パラメータ
        ```
        email: メールアドレス  
        password: 8-24文字、英数字によるパスワード
        name: 名前
        furigana: ふりがな
        gender: 性別 (0: 男性, 1: 女性, 9: その他)
        birthday: 誕生年月日
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
            gender: 性別 0: 男性 1: 女性 9: その他,
            birthday: 誕生日 format: yyyy-mm-dd,
            residence: 居住地,
            graduation_year: 卒業年 format: yyyy,
            qualification: 資格
        ```
    - 戻り値
        ```
            {
                "message": string
            }
        ```
## Company
会社情報操作を行います。
- ./company/information  
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
                "id": number,
                "code": number,
                "name": string,
                "website": string,
                "furigana": string,
                "category": string,
                "detail": string,
                "office": string,
                "representative": string,
                "foundation_date": string,
                "capital": string,
                "amount_of_sales": string,
                "number_of_employees": string,
                "phone_number": string,
                "email": string,
                "recruitment_numbers": string,
                "this_year_graduate_recruitment_results": string,
                "last_year_graduate_recruitment_results": string,
                "recruitment_grade": string,
                "qualification": string,
                "ideal_candidate_profile": string,
                "work_location": string,
                "working_hours": string,
                "holiday": string,
                "four_year_course_basic_salary": string,
                "four_year_course_allowances": string,
                "four_year_course_salary_total": string,
                "three_year_course_basic_salary": string,
                "three_year_course_allowances": string,
                "three_year_course_salary_total": string,
                "two_year_course_basic_salary": string,
                "two_year_course_allowances": string,
                "two_year_course_salary_total": string,
                "one_year_course_basic_salary": string,
                "one_year_course_allowances": string,
                "one_year_course_salary_total": string,
                "others": string,
                "allowances": string,
                "welfare": string,
                "corporate_philosophy": string,
                "appeal": string
            }
        }
        ```
- ./company/search  
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

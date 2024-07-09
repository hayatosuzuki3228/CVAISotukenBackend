# CVAIバックエンド用卒研repository
2024年、CVクラスAIクラス合同卒業研究における、バックエンドプログラムのリポジトリです。

## 利用方法
* `node Server.js`として、サーバーを起動してください。
* [フロントエンド](https://github.com/suzukihaya/CVAISotuken)から、ipアドレス:6666/apiに対して、POSTにて以下に記述するパラメータを用いて処理を要求してください。（権限設定等を用いることで、フロントエンド以外からもアクセス可能にすることはできますが、セキュリティ上推奨されません。）

## 機能
*は必須であることを表します。
### 学生ユーザアカウントに対する機能
* アカウント作成  
*request : 'user_registration'  
*password : パスワード  
*email : メールアドレス  
*name : 氏名  
*furigana : フリガナ
*sex : 性別  
*birthday : 誕生日  
*residence : 居住地  
*qualification : 資格
* ユーザ認証  
*request : 'user_authentication'  
*email : メールアドレス  
passowrd : パスワード
* ユーザプロフィール取得  
*request : 'user_profile'  
*email : メールアドレス  
* ユーザ情報更新
*request : 'user_update'  
*userId : ユーザID  
name : 名前  
furigana : フリガナ  
sex : 性別  
birthday : 誕生日  
residence : 居住地  
qualification : 資格
### 企業データに対する機能
* 企業情報取得
*request : 'company_information'  
*id : 企業ID
* 企業情報登録
*request : 'company_registration'  
*name : 名前  
code : 企業コード  
website : ウェブサイト(url)  
furigana : フリガナ  
category : 業種  
detail : 事業内容  
office : 事業所  
representatie : 代表者名  
foundation_date : 設立年月日  
capital : 資本金  
amount_of_sales : 売上高  
number_of_employees : 従業員数  
phone_number : 採用関連連絡先電話番号  
email : 採用関連連絡先メールアドレス  
recruitment_numbers : 募集予定人数  
this_year_graduate_recruitment_results : 卒業生採用実績 今年度  
last_year_graduate_recruitment_results : 卒業生採用実績 昨年度  
recrutiment_grade : 募集学科  
qualification : 必要な資格  
ideal_candidate_profile : 望む人物像  
work_location : 勤務地  
working_hours : 勤務時間  
holiday : 休日・休暇  
four_year_course_basic_salary : 給与実績 4年課程 基本給  
four_year_course_allowances : 給与実績 4年課程 諸手当  
four_year_course_salary_total : 給与実績 4年課程 合計  
three_year_course_basic_salary : 給与実績 3年課程 基本給  
three_year_course_allowances : 給与実績 3年課程 諸手当  
three_year_course_salary_total : 給与実績 3年課程 合計  
two_year_course_basic_salary : 給与実績 2年課程 基本給  
two_year_course_allowances : 給与実績 2年課程 諸手当  
two_year_course_salary_total : 給与実績 2年課程 合計  
one_year_course_basic_salary : 給与実績 1年課程 基本給  
one_year_course_allowances : 給与実績 1年課程 諸手当  
one_year_course_salary_total : 給与実績 1年課程 合計  
others : その他  
allowances : 諸手当  
welfare : 福利厚生  
corporate_philosophy : 経営理念  
appeal : アピール  
* 企業検索
*request : 'company_search'  
keyword : str  
subject : (以下のうちいずれか一つ)
    * 'name'  
    * 'code'  
    * 'website'  
    * 'furigana'  
    * 'category'  
    * 'detail'  
    * 'office'  
    * 'representatie'  
    * 'foundation_date'  
    * 'capital : str'  
    * 'amount_of_sales'  
    * 'number_of_employees'  
    * 'phone_number'  
    * 'email'  
    * 'recruitment_numbers'  
    * 'this_year_graduate_recruitment_results'  
    * 'last_year_graduate_recruitment_results'  
    * 'recrutiment_grade'  
    * 'qualification'  
    * 'ideal_candidate_profile'  
    * 'work_location'  
    * 'working_hours'  
    * 'holiday'  
    * 'four_year_course_basic_salary'  
    * 'four_year_course_allowances'  
    * 'four_year_course_salary_total'  
    * 'three_year_course_basic_salary'  
    * 'three_year_course_allowances'  
    * 'three_year_course_salary_total'  
    * 'two_year_course_basic_salary'  
    * 'two_year_course_allowances'  
    * 'two_year_course_salary_total'  
    * 'one_year_course_basic_salary'  
    * 'one_year_course_allowances'  
    * 'one_year_course_salary_total'  
    * 'others'  
    * 'allowances'  
    * 'welfare'  
    * 'corporate_philosophy'  
    * 'appeal'  
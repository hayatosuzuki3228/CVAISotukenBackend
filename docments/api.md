# API利用ドキュメント
APIサーバー用ソフトウェアを起動したサーバーのIPアドレスのポート8000番に対し、POSTメソッドでリクエストを送信してください。   
リクエストパラメータはJSON形式で送信してください。   
ステータスが200の場合、リクエストが成功しており、500の場合、何らかの理由で失敗しています。  
パラメータに?が付いている場合、必須ではありません。  
リクエストURLの末尾に*が付いている場合、認証が必須です。

## リンク
1. [Echo](echo.md)
1. [Authenticaiton](authenticaiton.md)
1. [Registration](registration.md)
1. [User](user.md)
1. [Company](company.md)
1. [Admin](admin.md)

## 目次
### echo
1. [/echo](echo.md#echo-1)
### authentication
1. [/authentication/student](authenticaiton.md#authenticationstudent)
1. [/authentication/company](authenticaiton.md#authenticationcompany)
1. [/authentication/admin](authenticaiton.md#authenticationadmin)

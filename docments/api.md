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
### [echo](echo.md)
1. [/echo](echo.md#echo-1)

### [authentication](authenticaiton.md)
1. [/authentication/student](authenticaiton.md#authenticationstudent)
1. [/authentication/company](authenticaiton.md#authenticationcompany)
1. [/authentication/admin](authenticaiton.md#authenticationadmin)

### [registration](registration.md)
1. [/registration/student](registration.md#registrationstudent)
1. [/registration/student/all](registration.md#registrationstudentall)
1. [/registration/company](registration.md#registrationcompany)
1. [/registration/admin](registration.md#registrationadmin-)

### [user](user.md)
1. [/user/profile/get](user.md#userprofileget-)
1. [/user/profile/set](user.md#userprofileset-)
1. [/user/student/qualification/list](user.md#userstudentqualificationlist-)
1. [/user/student/qualification/add](user.md#userstudentqualificationadd-)
1. [/user/student/qualification/delete](user.md#userstudentqualificationdelete-)
1. [/user/student/bookmark/list](user.md#userstudentbookmarklist-)
1. [/user/student/bookmark/count](user.md#userstudentbookmarkcount-)
1. [/user/student/bookmark/count/pages](user.md#userstudentbookmarkcountpages-)
1. [/user/student/bookmark/add](#userstudentbookmarkadd-)
1. [/user/student/bookmark/delete](#userstudentbookmarkdelete-)
1. [/user/company/message/new](user.md#usercompanymessagenew-)
1. [/user/company/message/list](user.md#usercompanymessagelist-)
1. [/user/company/message/count](user.md#userstudentmessagecount-)
1. [/user/company/message/count/pages](user.md#userstudentmessagecountpages-)
1. [/user/company/message/edit](user.md#usercompanymessageedit-)
1. [/user/company/message/delete](user.md#usercompanymessagedelete-)
1. [/user/company/message/publish](user.md#usercompanymessagepublish-)
1. [/user/company/message/private](user.md#usercompanymessageprivate-)

### [company](company.md)
1. [/company/information](company.md#companyinformation)
1. [/company/search](company.md#companysearch)
1. [/company/message/list](company.md#companymessagelist)

### [admin](admin.md)
1. [/admin/student/list](admin.md#adminstudentlist-)
1. [/admin/student/count](admin.md#adminstudentcount-)
1. [/admin/student/count/pages](admin.md#adminstudentcountpages-)
1. [/admin/student/activate](admin.md#adminstudentactivate-)
1. [/admin/student/deactivate](admin.md#adminstudentdeactivate-)
1. [/admin/company/list](admin.md#adminstudentlist-)
1. [/admin/company/count](admin.md#admincompanycount-)
1. [/admin/company/count/pages](admin.md#admincompanycountpages-)
1. [/admin/company/activate](admin.md#admincompanyactivate-)
1. [/admin/company/deactivate](admin.md#admincompanydeactivate-)
1. [/admin/list](admin.md#adminlist-)
1. [/admin/count](admin.md#admincount-)
1. [/admin/count/pages](admin.md#admincountpages-)
1. [/admin/activate](admin.md#adminactivate-)
1. [/admin/deactivate](admin.md#admindeactivate-)
1. [/admin/qualification/list](admin.md#adminqualificationlist-)
1. [/admin/qualification/count](admin.md#adminqualificationcount-)
1. [/admin/qualification/count](admin.md#adminqualificationcountpages-)
1. [/admin/qualification/add](admin.md#adminqualificationadd-)
1. [/admin/qualification/edit](admin.md#adminqualificationedit-)
1. [/admin/qualification/delete](admin.md#adminqualificationdelete-)
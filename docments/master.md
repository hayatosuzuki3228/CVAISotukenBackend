## リンク
1. [Echo](echo.md)
1. [Authenticaiton](authenticaiton.md)
1. [Registration](registration.md)
1. [User](user.md)
1. [Company](company.md)
1. [Admin](admin.md)
1. [Master](master.md)

## 目次
1. [/master/qualification](#masterqualification)
1. [/master/class](#masterclass)

## Master
マスタデータを取得します
- ### ./master/qualification  
    資格マスタを取得します
    - パラメータ  
        ```
        無し
        ```
    - 戻り値  
        ```
        {
            "message": string                       // 応答結果
            "result": [                             // 資格情報リスト
                "id": number,                       // 資格ID
                "name": string                      // 資格名
            ]
        }
        ```

- ### ./master/class  
    クラスマスタを取得します
    - パラメータ  
        ```
        無し
        ```
    - 戻り値  
        ```
        {
            "message": string                       // 応答結果
            "result": [                             // クラス情報リスト
                "id": number,                       // クラスID
                "name": string,                     // クラス名
                "abbreviation": string              // 略称名
            ]
        }
        ```
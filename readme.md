# CVAI合同卒研バックエンド
マッチングアプリのバックエンドAPIサーバ用ソフトウェア

## 目次
1. [使用技術一覧](#使用技術一覧)
1. [開発環境構築](#開発環境構築)
1. [実行](#実行)

## 使用技術一覧
### フレームワーク
<div>
    <img alt="nodejs" src="https://img.shields.io/badge/-Node.js-339933.svg?logo=node.js">
</div>

### ミドルウェア
<div>
    <img alt="mysql" src="https://img.shields.io/badge/-Mysql-4479A1.svg?logo=mysql">
</div>

### 言語
<div>
    <img alt="typescript" src="https://img.shields.io/badge/-Typescript-007ACC.svg?logo=typescript">
</div>

### ライブラリ
<div>
    <img alt="tsnode" src="https://img.shields.io/badge/-tsnode-3178C6.svg?logo=tsnode">
    <img alt="nodmeon" src="https://img.shields.io/badge/-nodemon-76D04B.svg?logo=nodemon">
    <img alt="express" src="https://img.shields.io/badge/-Express-000000.svg?logo=express">
    <img alt="prisma" src="https://img.shields.io/badge/-Prisma-2D3748.svg?logo=prisma">
</div>
and more...

## 開発環境構築
1. node-js, npm, mysqlのインストール
1. mysqlのユーザ作成
1. このリポジトリからgit clone
1. 「npm i」コマンドを実行
1. 「.env」ファイルに作成したmysqlユーザ情報に合わせて「DATABSE_URL」を記述
    - ユーザ名: user, パスワード: userの例 「DATABASE_URL="mysql://user:user@localhost:3306/sotsuken"」
1. 「.env」ファイルに「SECRET=任意の文字列」を記述
1. 「.env」ファイルに「ORIGINS=許可したいオリジン（複数指定したい場合はスペース区切り）」を記述
1. 「npx prisma migrate dev」コマンドを実行

## 実行
1. 上記と同様の環境を構築
1. 「npm run server」コマンドを実行

## ドキュメント
[API利用ドキュメント](docments/api.md)
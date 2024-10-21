# CVAI合同卒研バックエンド
マッチングアプリのバックエンドAPIサーバ用ソフトウェア

## 目次
1. [仕様技術一覧](#仕様技術一覧)
1. [開発環境構築](#開発環境構築)
1. [実行](#実行)

## 仕様技術一覧
### フレームワーク
<img src="https://img.shields.io/badge/-Node.js-339933.svg?logo=node.js">

### ミドルウェア
<img src="https://img.shields.io/badge/-Mysql-4479A1.svg?logo=mysql">

### 言語
<img src="https://img.shields.io/badge/-Typescript-007ACC.svg?logo=typescript">

### ライブラリ
<img src="https://img.shields.io/badge/-Prisma-2D3748.svg?logo=prisma">
<img src="https://img.shields.io/badge/-Express-000000.svg?logo=express">

## 開発環境構築
1. node-js, npm, mysqlのインストール
1. mysqlのユーザ作成
1. このリポジトリからgit clone
1. 「npm i」コマンドを実行
1. 「.env」ファイルに作成したmysqlユーザ情報に合わせて「DATABSE_URL」を記述
    - ユーザ名: user, パスワード: userの例 「DATABASE_URL="mysql://user:user@localhost:3306/sotsuken"」
1. 「.env」ファイルに「SECRET=任意の文字列」を記述
1. 「npx prisma migrate dev」コマンドを実行

## 実行
1. 上記と同様の環境を構築
1. 「npm run server」コマンドを実行

## ドキュメント
[API利用ドキュメント](docments/api.md)
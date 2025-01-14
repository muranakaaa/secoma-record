# セコマレコード / セイコーマート訪問記録管理サービス
セコマレコードは、「すべてのセイコーマートの店舗に行きたい」という想いから作られた、無料のセイコーマート訪問記録管理サービスです。会員登録せずに、セコマの店舗検索システムとして使用することもできます。セイコーマート非公式。

▼ 開発者X<br>
https://x.com/wage790<br>
何かあれば、こちらまでお気軽にご連絡ください。

## 使用技術一覧

バックエンド: Ruby / Rails

- コード解析 / フォーマッター: Rubocop
- テストフレームワーク: RSpec

フロントエンド: TypeScript / Next.js

- コード解析: ESLint
- フォーマッター: Prettier
- テストフレームワーク: Jest / React Testing Library
- CSSフレームワーク: Tailwind CSS
- 主要パッケージ: shadcn / Axios / react-paginate / React Toastify

DB: PostgreSQL

インフラ: Vercel / fly.io / Cloudflare

CI / CD: GitHub Actions

環境構築: Docker / Docker Compose

認証: Firebase Authentication

API: 

- Google Maps JavaScript API（地図上で店舗の位置を表示するために使用）
- Google Places API（店舗情報の取得に使用）
- Google Photos API（店舗外観画像の取得に使用）

## 機能

### ユーザー向け

機能

- メールアドレスを利用したユーザー登録 / ログイン機能
- Googleアカウントを利用したユーザー登録 / ログイン機能
- 退会機能
- ユーザー情報変更機能
- パスワード再設定機能
- 訪問記録の作成 / 更新 / 削除
- セイコーマートの検索機能

画面

- ローディング画面
- レスポンシブデザイン

### 非ユーザー向け

システム / インフラ

- Next.jsのImage / Linkコンポーネントなどの活用によるサービス全体の高速化
- Dockerによる開発環境のコンテナ化
- Cloudflareによる独自ドメイン + SSL化
- GitHub ActionsによるCI / CDパイプラインの構築
    - バックエンド
        - CI: Rubocop / RSpec
        - CD: fly.io
    - フロントエンド
        - CI: ESLint / Prettier / Jest / Codecov
        - CD: Vercel

テスト / セキュリティ

- クロスブラウザテスト
    - PC
        - Windows10 / 11: Google Chrome / Firefox / Microsoft Edge
        - Mac: Google Chrome / Firefox / Safari
    - スマートフォン
        - Android: Google Chrome
        - iOS: Safari
- Codecovによるコードカバレッジの分析と可視化
- 脆弱性対応(Dependabot Alerts / Code Scanning Alerts / GitGuardian)

## ER図
![image](https://github.com/user-attachments/assets/6e6beab9-8efa-4c69-9ee1-2bae8b05dc82)

## URL一覧

| URL | 説明 |
| --- | --- |
| / | セイコーマート店舗一覧画面 |
| /shop/:id | セイコーマート店舗詳細画面 |
| /record | セイコーマート訪問記録の作成・編集画面 |
| /login | ログイン画面 |
| /signup | ユーザー登録画面 |
| /password_reset | パスワードリセット画面 |
| /mypage | マイページ（訪問履歴と統計情報の確認・編集） |
| /search | 検索結果表示画面 |

## APIエンドポイント一覧

| HTTPメソッド | エンドポイント | 説明 |
| --- | --- | --- |
| GET | /shops | 店舗一覧を取得（クエリパラメータで絞り込み・ページネーション対応） |
| GET | /shop/:id | 店舗の詳細情報を取得 |
| GET | /users/:id/visits | 特定ユーザーの訪問履歴を取得 |
| POST | /users/:id/visits | 訪問記録を新規作成 |
| PUT | /users/:id/visits/:visit_id	 | 訪問記録を更新 |
| DELETE | /users/:id/visits/:visit_id	 | 訪問記録を削除 |
| GET | /users/:id/stats | ユーザーの訪問統計情報を取得（訪問済み店舗数、未訪問店舗数など） |
| POST | /auth/login | ユーザーのログイン処理 |
| POST | /auth/signup | 新規ユーザー登録処理 |
| POST | /auth/password_reset | パスワードリセットメール送信 |
| POST | /auth/password_update | パスワード更新処理（リセット後） |
| GET | /cities | 都道府県と市町村データを取得（絞り込み条件のドロップダウン用） |

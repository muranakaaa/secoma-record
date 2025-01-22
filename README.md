# セコマレコード / セイコーマート訪問記録管理サービス
セコマレコードは、「すべてのセイコーマートの店舗に行きたい」という想いから作られた、無料のセイコーマート訪問記録管理サービスです。会員登録せずに、セコマの店舗検索システムとして使用することもできます。セイコーマート非公式。

▼ 開発者X<br>
https://x.com/wage790

何かあれば、こちらまでお気軽にご連絡ください。

## 使用技術一覧
バックエンド: Ruby / Rails
- コード解析 / フォーマッター: Rubocop
- テストフレームワーク: RSpec（Model, Request Test）

フロントエンド: TypeScript / Next.js
- コード解析: ESLint
- フォーマッター: Prettier
- CSSフレームワーク: Tailwind CSS
- 主要パッケージ: shadcn / Axios / react-hook-form

DB: PostgreSQL

インフラ: Vercel / fly.io / Cloudflare

CI / CD: GitHub Actions

環境構築: Docker / Docker Compose

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
        - CI: ESLint / Prettier
        - CD: Vercel

テスト / セキュリティ
- クロスブラウザテスト
    - PC
        - Windows10 / 11: Google Chrome / Firefox / Microsoft Edge
        - Mac: Google Chrome / Firefox / Safari / Microsoft Edge
    - スマートフォン
        - Android: Google Chrome
        - iOS: Safari / Google Chrome
- Codecovによるコードカバレッジの分析と可視化
- 脆弱性対応(Dependabot Alerts / Code Scanning Alerts / GitGuardian)

## ER図
![image](https://github.com/user-attachments/assets/6e6beab9-8efa-4c69-9ee1-2bae8b05dc82)

## 画面遷移図

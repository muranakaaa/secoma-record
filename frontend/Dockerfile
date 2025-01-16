# ベースイメージ
FROM node:18

# 作業ディレクトリ
WORKDIR /app

# パッケージファイルをコピーして依存関係をインストール
COPY package*.json ./
RUN npm install

# 環境変数をビルド時に渡す
ARG NEXT_PUBLIC_GOOGLE_API_KEY
ENV NEXT_PUBLIC_GOOGLE_API_KEY=$NEXT_PUBLIC_GOOGLE_API_KEY

# ソースコードをすべてコピー
COPY . .

# サーバーを起動
CMD ["npm", "run", "dev"]

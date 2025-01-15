# frontend/Dockerfile
FROM node:18
WORKDIR /app

# パッケージファイルをコピーして依存関係をインストール
COPY package*.json ./
RUN npm install

# ソースコードをすべてコピー
COPY . .

# サーバーを起動
CMD ["npm", "run", "dev"]
